import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios"
const Login = () => {
    const navigate= useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()
    const onSubmit = async (data) => {
        const res = await axios.post('http://localhost:3000/login', data);
        console.log(res.data.msg);
        navigate('/user/dashboard', { state: { userId:res.data.userId } });
    }




    return (
        <Container className="m-5 pt-5 px-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto border rounded bg-light">
                        <h4>Login</h4>
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('username', { required: 'Username is required' })}
                          
                        />
                        {errors.username && <span style={styles.error}>{errors.username.message}</span>}

                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                          
                        />
                        {errors.email && <span style={styles.error}>{errors.email.message}</span>}

                        <label>Password (optional)</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register('password')}
                          
                        />
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success mt-2" type="submit" disabled={isSubmitting}>Go to Dashboard</button>
                            {isSubmitting && <p className="text-center mt-2 text-muted">Submitting...</p>}

                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login