import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // install moment for date utils

function TodayMeds({ userId }) {
  const [meds, setMeds] = useState([]);

  const today = moment().format("YYYY-MM-DD");
  const todayDayName = moment().format("dddd"); // e.g., Monday

  useEffect(() => {
    axios.get(`/api/medications/today/${userId}`).then(res => {
      setMeds(res.data);
    });
  }, [userId]);

  const toggleStatus = (medId, time) => {
    axios.patch(`/api/medications/${medId}/toggle`, {
      date: today,
      time
    }).then(res => {
      setMeds(prev =>
        prev.map(m =>
          m._id === medId ? { ...m, status: res.data.status } : m
        )
      );
    });
  };

  const getTodayStatus = (med) => {
    const statusEntry = med.status?.find(s => s.date === today);
    return statusEntry ? statusEntry.timeStatus : {};
  };

  const isValidForToday = (med) => {
    const start = moment(med.startDate);
    const end = med.endDate ? moment(med.endDate) : null;
    const now = moment();

    if (now.isBefore(start)) return false;
    if (end && now.isAfter(end)) return false;

    if (med.frequency === "weekly") {
      return med.weeklyDays?.includes(todayDayName);
    }

    // 'daily' or 'multiple'
    return true;
  };

  return (
    <div>
      <h4>Today’s Medications</h4>
      {meds.filter(isValidForToday).map(med => {
        const todayStatus = getTodayStatus(med);

        return (
          <div key={med._id} className="mb-3 p-3 border rounded bg-light">
            <h5>{med.drugName}</h5>
            <p className="mb-1"><strong>Dose:</strong> {med.dose || "Not specified"}</p>
            <p className="mb-1"><strong>Directions:</strong> {med.direction || "None"}</p>

            {med.times.map(time => (
              <div key={time}>
                <label>
                  <input
                    type="checkbox"
                    checked={todayStatus?.[time] || false}
                    onChange={() => toggleStatus(med._id, time)}
                  />{' '}
                  {time}
                </label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TodayMeds;
