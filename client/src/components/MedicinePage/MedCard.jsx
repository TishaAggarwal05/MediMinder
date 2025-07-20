import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMarker, faTrash, faChartPie, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState, useEffect } from 'react';
import AdherencePie from "./Analytics/AdherencePie"
import { useNavigate } from "react-router-dom";
const MedCard = ({ Meds, handledelete, getAdherenceStats }) => {
    const navigate = useNavigate();

    const [ChartData, setChartData] = useState({ draw: false });

    async function deleteMed() {
        console.log(Meds._id);
        try {
            const res = await axios.delete(`http://localhost:3000/medicine/${Meds._id}`);
            handledelete(Meds._id);
            console.log(res.data.message);
        } catch (err) {
            console.error('Error deleting:', err);
        }
    }


    function editMed() {//incomplete
        console.log(Meds._id)
    }


    async function AnalyseMed() {
        if (ChartData.draw) {
            setChartData({ draw: false });
            return;
        }
        console.log(Meds._id)
        const weekStats = await getAdherenceStats(Meds, 7);
        // const monthStats = await getAdherenceStats(Meds, 30);
        setChartData({ draw: true, take: weekStats.taken, nottake: weekStats.missed })
    }

    return (
        <div  className="container-fluid">
            <section style={{ marginLeft: '100px' }}>
                <div className="row">
                    <div className=" col-sm-10 col-12 mb-2">
                        <div  className="card">
                            <div style={{borderRadius: "12px",border:"solid #1b403bff 3px " ,backgroundColor:'#dcf2e2ff'}}className="card-body">
                                <div className="d-flex justify-content-between p-md-1">
                                    <div  className="d-flex flex-row">
                                        <div className="align-self-center">
                                            <div className="mx-4">
                                                <FontAwesomeIcon icon={faHeart} size="2x" color="#004d40" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4>{Meds.drugName}</h4>
                                            <p className="mb-0">{Meds.frequency}, {Meds.times}</p>
                                            <p className="mb-0">{Meds.dose}</p>
                                            <p className="mb-0">{Meds.description}</p>
                                        </div>
                                    </div>
                                    <div class="align-self-center">
                                        {/* <Button onClick={editMed} variant="outline-success"><FontAwesomeIcon icon={faMarker} /></Button> */}
                                        <Button onClick={deleteMed} className="mx-2" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                        <Button onClick={AnalyseMed} className="mx-2" variant="outline-primary"><FontAwesomeIcon icon={faChartPie} /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {ChartData.draw && (
                <AdherencePie title="Past Week" taken={ChartData.take} missed={7-ChartData.take} />
            )}


        </div>
    );
};

export default MedCard;