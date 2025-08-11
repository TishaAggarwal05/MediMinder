import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
const AppointmentForm = ({ userId, fetchAppointments }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const timeSlots = [
        { label: "10:00 AM", value: "10:00" },
        { label: "11:00 AM", value: "11:00" },
        { label: "12:00 PM", value: "12:00" },
        { label: "2:00 PM", value: "14:00" },
        { label: "3:00 PM", value: "15:00" },
        { label: "4:00 PM", value: "16:00" },
    ];

    // In your select:



    const onSubmit = async (data) => {
        if (!selectedDate || !selectedTime) {
            alert("Please select both date and time.");
            return;
        }

        try {
            const payload = {
                doctorName: data.doctorName,
                time: selectedTime,
                date: selectedDate,
                address: data.address,
            };
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
            await axios.post(`${backendUrl}/appointments/${userId}`, payload);
            alert("Appointment saved!");
            reset();
            setSelectedDate("");
            setSelectedTime("");
            fetchAppointments(); // refresh calendar
        } catch (err) {
            console.error(err);
            alert("Failed to save appointment");
        }
    };

    return (



        <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex align-items-center gap-2 flex-wrap p-3 border rounded shadow-sm bg-white"
            style={{ maxWidth: '100%', fontSize: '14px', backgroundColor:"#f0fff4" }}
        >
            {/* Doctor Name */}
            <div className="flex-grow-1">
                <input
                    type="text"
                    {...register('doctorName', { required: 'Doctor name is required' })}
                    className={`form-control ${errors.doctorName ? 'is-invalid' : ''}`}
                    placeholder="Doctor Name"
                />
            </div>

            {/* Clinic Address */}
            <div className="flex-grow-1">
                <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    placeholder="Clinic Address"
                />
            </div>

            {/* Date Picker */}
            <div>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="form-control"
                />
            </div>

            {/* Time Slot Dropdown */}
            <div>
                <select
                    className="form-select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">Select Time</option>
                    {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>
                            {slot.label}
                        </option>
                    ))}

                </select>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: '#00796b', color: 'white' }}
                >
                    Set Appointment
                </button>
            </div>
        </form>

    );
};

export default AppointmentForm;
