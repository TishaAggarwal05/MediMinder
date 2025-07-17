import React from 'react'
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
import { useForm, useFieldArray } from "react-hook-form"
export function WeekCheckbox({register}) {
    return (
        <div className="mb-2">
            <label>Weekly Days</label>
            <div className="d-flex flex-wrap gap-2">
                {weekDays.map(day => (
                    <label key={day}>
                        <input
                            type="checkbox"
                            value={day}
                            {...register("weeklyDays")}
                        /> {day}
                    </label>
                ))}
            </div>
        </div>
    )
}
export function Timefield({control , register}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "times"
    });
    return (

        <div className="mb-2">
            <label>Time(s)</label>
            {fields.map((field, index) => (
                <div key={field.id} className="d-flex align-items-center mb-1">
                    <input
                        type="time"
                        {...register(`times.${index}.value`, { required: true })}
                        className="form-control me-2"
                    />
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>Remove</button>
                </div>
            ))}
            <button type="button" className="btn btn-primary btn-sm" onClick={() => append({ value: "" })}>
                + Add Time
            </button>
        </div>
    );

}


export function MedicalField({ control, register }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "medicalConditions",
    });
    return (
        <>
        <h5>Medical Conditions</h5>
            

            {
                fields.map((item, index) => (
                    <div key={item.id} className="border p-2 mb-2">
                        <input
                            placeholder="Condition Name"
                            className="form-control mb-1"
                            {...register(`medicalConditions.${index}.name`, { required: true })}
                        />
                        <select
                            className="form-control mb-1"
                            {...register(`medicalConditions.${index}.type`)}
                            defaultValue="other"
                        >
                            <option value="chronic">Chronic</option>
                            <option value="acute">Acute</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="date"
                            className="form-control mb-1"
                            {...register(`medicalConditions.${index}.diagnosedDate`)}
                        />
                        <input
                            placeholder="Notes"
                            className="form-control mb-1"
                            {...register(`medicalConditions.${index}.notes`)}
                        />
                        <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                            Remove
                        </button>
                    </div>
                ))
            }

            <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                    append({ name: "", type: "other", diagnosedDate: "", notes: "" })
                }
            >
                +
            </button>
        </>
    );



}
