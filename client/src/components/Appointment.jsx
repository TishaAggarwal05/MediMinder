


import { useOutletContext } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

import "../App.css"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from "../Forms/newAppointmentForm";
const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function AppointmentSetter() {
    const { userId } = useOutletContext();
    const [events, setEvents] = useState([]);
    const [currentView, setCurrentView] = useState("month");
    const [calendarDate, setCalendarDate] = useState(new Date());

    // Fetch appointments on load
    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/appointments/${userId}`);

            const mapped = res.data.map(appt => {
                // Sanitize values
                const dateStr = new Date(appt.date).toISOString().split("T")[0]; // 'YYYY-MM-DD'
                const timeStr = appt.time.padStart(5, "0"); // '09:00'

                const start = new Date(`${dateStr}T${timeStr}`);
                const end = new Date(start.getTime() + 60 * 60 * 1000);

                return {
                    title: appt.doctorName,
                    start,
                    end,
                };
            });
            console.log("Mapped events:", mapped);
            setEvents(mapped);
        } catch (err) {
            console.error("Error fetching appointments", err);
        }
    };


    return (
        <div className="p-6 max-w-6xl" style={{ marginLeft: '100px', marginRight: '100px' }}>
            <h2 style={{ color: "#1b403bff" }} className="fw-bold text-center">Appointment Calendar</h2>

            <div
                style={{
                    backgroundColor: "#1b403bff",                     
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "12px", // makes corners rounded
                    border:"solid #1b403bff 4px"
                }}
            >
                <AppointmentForm userId={userId} fetchAppointments={fetchAppointments} />
            </div>
            



            <hr className="my-6" />

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    views={['month', 'week', 'day', 'agenda']}
                    view={currentView}
                    onView={(view) => setCurrentView(view)}
                    date={calendarDate}
                    onNavigate={(newDate) => setCalendarDate(newDate)}
                    defaultDate={new Date()}
                    style={{ border:"solid #1b403bff 15px",height: 600, width: '98%', borderRadius: "12px",backgroundColor: "#f0fff4" }}
                    eventPropGetter={() => ({
                        style: {
                            backgroundColor: '#1b403bff',
                            color: 'white',
                            borderRadius: '4px',
                            
                        }
                    })}
                />





        </div>
    );
}
