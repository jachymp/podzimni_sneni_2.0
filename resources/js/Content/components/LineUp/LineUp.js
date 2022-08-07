import axios from "axios";
import { useEffect, useState } from "react";

export default function LineUp() {

    const [lineUp, setLineUp] = useState(null);
    const [places, setPlaces] = useState(null);


    // GET DATA
    const getLineUp = async() => {
        const response = await axios.get('/api/admin/bands');
        setLineUp(response.data);
    }

    const getPlaces = async() => {
        const response = await axios.get('/api/admin/places');
        setPlaces(response.data);
    }

    // GET DAY OF WEEK
    const getWeekDay = (dateDB) => {
        const datum = new Date(dateDB);
        return datum.getDay();
    };

    // CREATE DIV ELEMENTS
    const createDOMElements = () => {
        const friday = document.querySelector('.lineup-friday');
        const saturday = document.querySelector('.lineup-saturday');

        if(places){
            places.forEach(place => {

                if(friday) {
                    const stageDivF = document.createElement('div');
                    stageDivF.classList.add(`lineup-friday-${place.id}`);
                    friday.appendChild(stageDivF);
                    document.querySelector(`.lineup-friday-${place.id}`).innerHTML = (`<h4>${place.name}</h4>`);
                }
                if(saturday) {
                    const stageDivS = document.createElement('div');
                    stageDivS.classList.add(`lineup-saturday-${place.id}`);
                    saturday.appendChild(stageDivS);
                    document.querySelector(`.lineup-saturday-${place.id}`).innerHTML = (`<h4>${place.name}</h4>`);
                }

            });
        }
    }


    // GET SORTED DATA PER DAY
    const sortedLineUp = (dateDB, from, to, name, place_id) => {
        const fridayPlace = document.querySelector(`.lineup-friday-${place_id}`);
        const saturdayPlace = document.querySelector(`.lineup-saturday-${place_id}`);

        if(getWeekDay(dateDB) === 5 && fridayPlace) {
            fridayPlace.innerHTML += `<div class="lineup-band">
                                <p>${from ? from.slice(0,-3) : '??'}</p>
                                <p>-</p>
                                <p>${to ? to.slice(0,-3) : '??'}</p>
                                <p>${name}</p>
                                </div>`;
        } else if (getWeekDay(dateDB) === 6 && from < '08:00:00' && fridayPlace) {
            fridayPlace.innerHTML += `<div class="lineup-band">
                                <p>${from ? from.slice(0,-3) : '??'}</p>
                                <p>-</p>
                                <p>${to ? to.slice(0,-3) : '??'}</p>
                                <p>${name}</p>
                                </div>`;
        } else if (getWeekDay(dateDB) === 6 && saturdayPlace) {
            saturdayPlace.innerHTML += `<div class="lineup-band">
                                <p>${from ? from.slice(0,-3) : '??'}</p>
                                <p>-</p>
                                <p>${to ? to.slice(0,-3) : '??'}</p>
                                <p>${name}</p>
                                </div>`;
        } else if (getWeekDay(dateDB) === 0 && from < '08:00:00' && saturdayPlace) {
            saturdayPlace.innerHTML += `<div class="lineup-band">
                                <p>${from ? from.slice(0,-3) : '??'}</p>
                                <p>-</p>
                                <p>${to ? to.slice(0,-3) : '??'}</p>
                                <p>${name}</p>
                                </div>`;
        }
    }

    useEffect(() => {
        getPlaces();
        getLineUp();
    }, []);

    return(
        <>
            <h2>Line up</h2>
            <div id="lineup-container">
                <div className="lineup-friday">
                    <h3>Pátek</h3>
                </div>
                <div className="lineup-saturday">
                    <h3>Sobota</h3>
                </div>

                {createDOMElements()}

                {
                    lineUp &&
                    lineUp.map((band, index) => (
                        <>
                            {sortedLineUp(band.date, band.time_from, band.time_to, band.name, band.place_id)}
                        </>
                    ))
                }
            </div>
        </>
    )
}
