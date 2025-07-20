import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




const MedStatus = ({ userId, refreshTrigger, triggerMedStatusRefresh }) => {
    const [medications, setMedications] = useState([]);
    const [today, setToday] = useState(new Date().toISOString().split('T')[0]); // 'YYYY-MM-DD'
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());


    const getDayName = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });
    };
    useEffect(() => {
        const fetchMeds = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/medicine/${userId}`);
                setMedications(res.data.Medlist);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch medications", err);
                setLoading(false);
            }
        };
        fetchMeds();
    }, [userId, refreshTrigger]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 30000); // update every 30 seconds
        return () => clearInterval(interval);
    }, []);


    const isTodayApplicable = (med) => {
        const todayDate = new Date(today);
        const start = med.startDate ? new Date(med.startDate) : null;
        const end = med.endDate ? new Date(med.endDate) : null;

        if (start && todayDate < start) return false;
        if (end && todayDate > end) return false;

        if (med.frequency === 'weekly') {
            const todayName = getDayName(today);
            return med.weeklyDays.includes(todayName);
        }
        return true; // daily and multiple
    };
    const isTimeReached = (medTime) => {
        const [hour, minute] = medTime.split(':').map(Number);
        const scheduledTime = new Date(currentTime);
        scheduledTime.setHours(hour, minute, 0, 0);
        return currentTime >= scheduledTime;
    };



    const handleStatusUpdate = async (medId, time, value) => {
        try {

            
            const res = await axios.patch(`http://localhost:3000/medicine/status/${medId}`, {
                date: today,
                time,
                value
            });

            // Re-fetch 
            triggerMedStatusRefresh();
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    if (loading) return <p>Loading medicines...</p>;

    const todaysMeds = medications.filter(isTodayApplicable);

    return (
        <div>

            {todaysMeds.length === 0 ? (
                <p>No medications scheduled for today.</p>
            ) : (
                todaysMeds.map((med) =>
                    med.times
                        .sort() // sort by time
                        .map((time) => {
                            const statusEntry = med.status.find((s) => s.date === today);
                            const timeStatus = statusEntry?.timeStatus?.[time];

                            return (
                                <Card
                                    key={`${med._id}-${time}`}
                                    className="mb-3 shadow-sm"
                                    style={{
                                        backgroundColor:
                                            timeStatus === true
                                                ? '#66CDAA'
                                                : timeStatus === false
                                                    ? '#F08080' // light coral (optional)
                                                    : '#D3D3D3' // light gray
                                    }}

                                >
                                    <Card.Body>
                                        <Row>
                                            <Col md={8}>
                                                <Card.Title className="mb-1">{med.drugName} <small className="text-muted">({time})</small></Card.Title>
                                                {med.dose && <Card.Text className="mb-1"><strong>Dose:</strong> {med.dose}</Card.Text>}
                                                {med.direction && <Card.Text className="mb-1"><strong>Direction:</strong> {med.direction}</Card.Text>}
                                                <Card.Text className="mb-0">
                                                    <strong>Status:</strong>{' '}
                                                    <span className={
                                                        timeStatus === true ? 'text-success' :
                                                            timeStatus === false ? 'text-danger' : 'text-muted'
                                                    }>
                                                        {timeStatus === true ? "Taken" : timeStatus === false ? "Skipped" : "Pending"}
                                                    </span>
                                                </Card.Text>
                                            </Col>
                                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                                <div className="d-flex flex-column gap-2">
                                                    
                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        onClick={() => handleStatusUpdate(med._id, time, true)}
                                                        disabled={
                                                            timeStatus !== undefined || !isTimeReached(time)
                                                        }
                                                    >
                                                        Taken
                                                    </Button>


                                                    {/* <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleStatusUpdate(med._id, time,false)}
                                                        disabled={timeStatus !== undefined}
                                                    >
                                                        Skipped
                                                    </Button> */}

                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                            );
                        })
                )
            )}
        </div>
    );
};

export default MedStatus;
