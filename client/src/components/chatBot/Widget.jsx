import React, { useState, useEffect } from 'react';
import './ChatBotWidget.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
const Widget = ({ Userinfo, userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([{ sender: "bot", text: "to use health bot contact aggarwal.tisha05@gmail.com first to start else it wont start :)" }]);
    const [Meds, setMeds] = useState([]);

    useEffect(() => {
        async function getMedicines() {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

                const res = await axios.get(`${backendUrl}/medicine/${userId}`);
                setMeds(res.data.Medlist);
            } catch (err) {
                console.error("Fetch failed:", err);
            }
        }

        getMedicines();
    }, []);

    const CallChatBot = async (input) => {
        const Diseases = Userinfo.medicalConditions.map((condition) => condition.name);

        const medication = Meds.map(item => ({
            name: item.drugName || "",
            dose: item.dose || ""
        }));

        try {
            const query = {
                "age": Userinfo.age,
                "gender": Userinfo.gender,
                "diseases": Diseases,
                "medication": medication,
                "input": input
            };

            const response = await axios.post("https://hamster-stirred-bluejay.ngrok-free.app/healthbot", { query });
            const botReply = response.data.reply;
            setChatHistory(prev => [...prev, { sender: "bot", text: botReply }]);

        } catch (error) {
            console.error("Error sending request to chatbot:", error.message);
            setChatHistory(prev => [...prev, { sender: "bot", text: "Sorry, an error occurred." }]);
        }
    };

    const handleSend = () => {
        if (userInput.trim()) {
            const newMessage = { sender: "user", text: userInput };
            setChatHistory(prev => [...prev, newMessage]);
            CallChatBot(userInput);
            setUserInput('');
        }
    };

    return (
        <>
            {/* Floating Round Chat Button */}
            <div className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
                💬
            </div>

            {/* Popup Chat Dialog */}
            {isOpen && (
                <div className="chatbot-popup">
                    <div style={{backgroundColor:"#1b403bff"}} className="chatbot-header">
                        <h4>Health ChatBot</h4>
                        <Button variant="outline-secondary" onClick={() => setIsOpen(false)}>✖</Button>
                    </div>

                    <div className="chatbot-body">
                        {/* Chat Message History */}
                        <div className="chat-messages">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`chat-message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Ask your health queries :)..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <Button style={{backgroundColor:"#1b403bff"}} onClick={handleSend}>Go</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Widget;
