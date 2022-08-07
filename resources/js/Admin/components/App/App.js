import { useState, useEffect } from "react";
import axios from "axios";
import BandForm from "../BandForm/BandForm";
import Content from "../Content/Content";
import Detail from "../Detail/Detail";

export default function App()
{

    // STATE FOR MESSAGES
    const [successMessage, setSuccessMessage] = useState(null);
    const [failtureMessage, setFailtureMessage] = useState(null);

    // STATE FOR CREATION NEW YEAR
    const [newYear, setNewYear] = useState(false);

    // STATE FOR STAGE DROPDOWN
    const [places, setPlaces] = useState(null);

    // STATE FOR YEAR DEFINITION
    const [year, setYear] = useState({
        id: "",
        name: "",
        grade: "",
        from: "",
        to: "",
        fest_description: "",
        fest_price_friday: "",
        fest_price_saturday: "",
        fest_price_all: "",
        fest_price_friday_student: "",
        fest_price_saturday_student: "",
        fest_price_all_student: "",
        lineup_public: ""
    });

    // GET LATEST YEAR DATA
    const getYearData = async() => {
        const response = await axios.get('/api/admin/year');
        setYear(response.data);
    }

    // GET PLACES DATA
    const getPlaceData = async() => {
        let response = await axios.get('/api/admin/places');
        setPlaces(response.data);
    }

    // DISPLAYING MESSAGES
    const displayMessage = () => {
        const message = document.querySelector('.message');
        if(successMessage) {
            message.classList.add('success');
            message.innerHTML = `<p className="success">${successMessage}</p>`;
            setTimeout(() => {
                message.innerHTML = '';
                message.classList.remove('success');
                setSuccessMessage(null);
            }, 3000)
        }
        if(failtureMessage) {
            message.classList.add('fail');
            message.innerHTML = `<p className="fail">${failtureMessage}</p>`;
            setTimeout(() => {
                message.innerHTML = '';
                message.classList.remove('fail');
                setFailtureMessage(null);
            }, 3000)
        }
    }

    useEffect(() => {
        getYearData();
        getPlaceData();
    },[successMessage]);

    return(
        <div className="admin-app-container">
            <h1>Obsah stránek pro ročník: {year.grade}</h1>
            <div className="message">
                {displayMessage()}
            </div>

            <div className="admin-app-content">
                <div className="admin-app-detail">
                    <Detail
                        year={year}
                        setYear={setYear}
                        setSuccessMessage={setSuccessMessage}
                        setFailtureMessage={setFailtureMessage}/>
                </div>

                <div className="admin-app-new-year">
                    {
                        !newYear &&
                        <div className="admin-app-question">
                            <h3>Chceš založit nový ročník?</h3>
                            <button onClick={() => setNewYear(true)}>Jasný, pojď mi hop!</button>
                        </div>
                    }


                    {/* DISPLAY FORM JUST IF NEW YEAR IS SET TO TRUES */}
                    {
                        newYear &&
                        <div className="admin-app-form">
                            <Content
                                setSuccessMessage={setSuccessMessage}
                                setFailtureMessage={setFailtureMessage}/>
                        </div>
                    }
                </div>
            </div>

            <div className="admin-app-bands">
                <BandForm
                    year={year}
                    places={places}/>
            </div>
        </div>
    )
}
