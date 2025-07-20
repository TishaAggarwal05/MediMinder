#this is python script in case you need notebook because of gpu restrictions it is also available in same folder 

from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import login
import transformers
import torch
import os
import json

# Login to Hugging Face
HF_TOKEN = os.environ.get("HF_TOKEN")
login(token=HF_TOKEN)

# Load the pipeline once at startup
pipeline = transformers.pipeline(
    "text-generation",
    model="meta-llama/Meta-Llama-3-8B-Instruct",
    model_kwargs={"torch_dtype": torch.bfloat16},
    device_map="auto",
)

chat_history = [
    {
        "role": "system",
        "content": """
You are a reliable, friendly healthcare assistant. You must ONLY provide general health-related information and tips — no diagnoses, no emergency advice, and no prescription guidance. Your role is to assist users safely and clearly, using their personal health data, and reply **strictly in JSON format**.

You are provided a JSON user profile with:
- age
- gender
- medical conditions
- medications

Instructions for every response:
1. Be **personalized**: Tailor suggestions based on age, gender, existing conditions, and medications.
2. Be **brief** and **clear**: Use simple, accurate language in under 100 words.
3. Be **safe**: Never suggest a diagnosis or treatment plan. If the query implies a need for diagnosis, add: _"It’s best to consult a doctor for proper medical evaluation."_
4. Be **polite**: If the query is off-topic or unclear, reply with: _"Please ask a clear health-related question so I can assist you better."_
5. Be **context-aware**: Don’t repeat tips already given. Avoid contradictions with their known health profile.
6. Always maintain a **warm, supportive** tone.
EXAMPLE RESPONSE:
{
  "reply": "After a walk, a light snack with protein and fiber—like a boiled egg with whole-grain toast—can help. Since you have diabetes, avoid sugary snacks. Also, stay hydrated!"
}

Reply only in a JSON object:
{
  "reply": "your response text here"
}
"""
    }
]

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Your health assistant is running!"

@app.route("/healthbot", methods=["POST"])
def healthbot():
    data = request.get_json()
    query = data.get("query")

    user_dict = dict(
        age=query["age"],
        gender=query["gender"],
        disease=query["diseases"],
        medications=query["medication"],
        input=query["input"]
    )
    
    chat_history.append({"role": "user", "content": user_dict})
    
    terminators = [
        pipeline.tokenizer.eos_token_id,
        pipeline.tokenizer.convert_tokens_to_ids("<|eot_id|>")
    ]

    outputs = pipeline(
        chat_history,
        max_new_tokens=256,
        eos_token_id=terminators,
        do_sample=True,
        temperature=0.85,
        top_p=0.9,
        top_k=40,
    )

    reply = outputs[0]["generated_text"][-1]["content"]
    chat_history.append({"role": "assistant", "content": reply})

    return jsonify({"reply": reply})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
