import { useFieldArray, useFormContext } from 'react-hook-form';

export function DocField({ control, register }) {
//   const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctor"
  });

  return (
    <div className="mb-3">
      <h5>Doctor Details</h5>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded p-3 mb-2">
          <input
            className="form-control mb-1"
            placeholder="Doctor Name"
            {...register(`doctor.${index}.name`, { required: true })}
          />

          <input
            className="form-control mb-1"
            placeholder="Contact"
            {...register(`doctor.${index}.contact`, { required: true })}
          />

          <input
            className="form-control mb-1"
            placeholder="Clinic Address"
            {...register(`doctor.${index}.clinicAddress`)}
          />

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => remove(index)}
          >
            Remove Doctor
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary btn-sm mt-2"
        onClick={() =>
          append({ name: "", contact: "", clinicAddress: "" })
        }
      >
        + Add Doctor
      </button>
    </div>
  );
}
