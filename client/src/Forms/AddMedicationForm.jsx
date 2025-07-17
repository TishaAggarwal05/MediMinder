import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap';
// import '../App.css'
import { WeekCheckbox,Timefield } from './subutils/AddMedutils';



import { useOutletContext } from 'react-router-dom';

export default function AddMedicationForm() {
    const { User } = useOutletContext();
    let userId=User._id;
    console.log("teri maa ki:",User._id)
//     const context = useOutletContext();
//   console.log("AddMedicationForm context:", context);
    const { register, formState: { errors, isSubmitting }, handleSubmit, watch, control, reset } = useForm({
        defaultValues: {
            times: [{ value: "" }],
            weeklyDays: []
        }
    });

    

    const frequency = watch("frequency");

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            userId,
            times: data.times.map(t => t.value)
        };

        try {
            const res = await axios.post('http://localhost:3000/medicine', payload);
            alert(res.data.message);
            reset(); // Clear form
        } catch (err) {
            console.error(err);
            alert('Error adding medication');
        }
    };

    return (
        <Container className="pt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                <form style={{color:"#1b403bff"}}  onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto border rounded bg-light">
                    <h4>Add Medication</h4>

                    <div className="mb-2">
                        <label>Drug Name</label>
                        <input
                            className="form-control"
                            aria-invalid={errors.drugName ? "true" : "false"}
                            {...register("drugName", {
                                required: "Drug name is required"
                            })}
                        />
                        {errors.drugName && (
                            <p className="inpError">{errors.drugName.message}</p>
                        )}
                    </div>


                    <div className="mb-2">
                        <label>Frequency</label>
                        <select className="form-select" {...register("frequency", { required: true })}>
                            <option value="">Select</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="multiple">Multiple times a day</option>
                        </select>
                    </div>

                    {(frequency === 'weekly') && (
                        <WeekCheckbox register={register}/>
                    )}

                    {(frequency === 'multiple' || frequency === 'daily' || frequency === 'weekly') && (
                        <Timefield control={control} register={register}/>
                    )}

                    <div className="mb-2">
                        <label>Start Date</label>
                        <input className="form-control" type="date" {...register("startDate", { required: true })} />
                    </div>

                    <div className="mb-2">
                        <label>End Date (optional)</label>
                        <input className="form-control" type="date" {...register("endDate")} />
                    </div>

                    <div className="mb-2">
                        <label>Dose (optional)</label>
                        <input className="form-control" {...register("dose")} />
                    </div>

                    <div className="mb-2">
                        <label>Directions (optional)</label>
                        <textarea className="form-control" {...register("direction")} />
                    </div>

                    <button className="btn btn-success  mt-2" type="submit" disabled={isSubmitting}>Add Medication</button>
                </form>

                </Col >
            </Row >
    </Container >
    );
}
