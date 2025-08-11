import React from 'react'
import { useForm ,useFieldArray} from "react-hook-form"
import { Container,Row,Col } from 'react-bootstrap';
import { MedicalField } from './subutils/AddMedutils';
import { DocField } from './subutils/DocField';
import axios from 'axios';
// NAVIGATE - Redirect in react / naav link wont work here as it just renders the component on click wont redirect automatically
import { useNavigate } from 'react-router-dom';



const SignupForm = () => {
    const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors ,isSubmitting},
  } = useForm({});

  const navigate = useNavigate();

  const onSubmit= async(data) => {
    try{
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const res= await axios.post(`${backendUrl}/signup`, data );
        console.log(`messsage to signup form :${res.data.msg}`);
        // const userId= res.data.userId;
        // console.log("tomar userwa id:")
        // console.log(userId);
        navigate('/login')        

    }catch(err){
        console.log(err);
        alert('Error adding medication');
    }

  }
  return (

    <Container className="m-5 pt-5 px-5">
            <Row className="justify-content-center">
                <Col md={6}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto border rounded bg-light">
                    <h4>Sign Up</h4>
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <input  
                         className="form-control" id="username"
                         {...register("username",{required:"Name is required field", minlength:{value:3,message: "min length is 3"}})} type="text" />
                        {errors.username && <p style={{color:red}}>errors.username.message</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input 
                         className="form-control" id="age"
                         {...register("age",{required:"age is required field"})} type="text" />
                        {errors.age && <p style={{color:red}}>errors.age.message</p>}
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="email">email</label>
                        <input 
                         className="form-control" id="email"
                         {...register("email",{required:"email is required field"})} type="text" />
                        {errors.email && <p style={{color:red}}>errors.email.message</p>}
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="gender">gender</label>
                        <select name="gender" id="gender" 
                        className="form-control" 
                         {...register("gender",{required:"gender is required field"})}>
                            <option value="">Select</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Others</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role" 
                        className="form-control" 
                         {...register("role",{required:"role is required field"})}>
                            <option value="">Select</option>
                            <option value="patient">patient</option>
                            <option value="caregiver">caregiver</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <MedicalField control={control} register={register} />
                    </div>
                    <div className="mb-2">
                        <DocField control={control} register={register} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success mt-2" type="submit" disabled={isSubmitting}>Sign up</button>
                        {isSubmitting && <p className="text-center mt-2 text-muted">Submitting...</p>}

                    </div>
                </form>
                </Col>
            </Row>
    </Container>
  )
}

export default SignupForm