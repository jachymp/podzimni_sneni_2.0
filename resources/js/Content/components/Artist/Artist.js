import axios from "axios";
import { useEffect, useState } from "react";

export default function Artist()
{
    const [artists, setArtists] = useState(null);

    const getArtists = async() => {
        const response = await axios.get('/api/admin/bands/rank');
        setArtists(response.data);
    }

    // ADD/REMOVE CLASS TO THE BLOCK FOR BAND
    const setClass = (index) => {
        const band = document.querySelectorAll('#band-card');
        if(band[index].classList.contains('band-card--heading')) {
            band[index].classList.remove('band-card--heading');
            band[index].classList.add('band-card--content');
        } else if (band[index].classList.contains('band-card--content')){
            band[index].classList.remove('band-card--content');
            band[index].classList.add('band-card--heading');
        }
    }

    // DATE AND TIME FORMAT
    const setDay = (date) => {
        const datum = new Date(date);
        const day_nbr = datum.getDay();
        let day = null;

        if(day_nbr === 5) {
            day = 'pátek';
        } else if (day_nbr === 6) {
            day = 'sobota';
        } else if (day_nbr === 0) {
            day = 'neděle';
        }
        return day;
    }

    useEffect(() => {
        getArtists();
    },[]);

    return(
        <div className="bands-section">
            <h2>Vystupující</h2>
            <div className="band-cards-container">
                {
                    artists &&
                    artists.map((artist, index) => (
                        <div id="band-card" className="band-card--heading" key={index} onClick={() => setClass(index)}>
                            <h4>{artist.name}</h4>
                            <p>{artist.description}</p>
                            <div className="band-card-icons">

                                <div className="band-card-icon">
                                    <img src="/img/calendar.svg"/>
                                    <p>{setDay(artist.date)}</p>
                                </div>
                                <div className="band-card-icon">
                                    <img src="/img/time.svg"/>
                                    <p>{artist.time_from.slice(0, -3)}</p>
                                </div>
                                <div className="band-card-icon">
                                    <img src="/img/location.svg"/>
                                    <p>{artist.place.name}</p>
                                </div>
                            </div>

                            {
                                artist.link &&
                                <button><a href={artist.link} target="_blank">Poslechni si</a></button>
                            }

                        </div>
                    ))
                }
            </ div>
            <p>Krom hudebního programu se můžete těšit na kino, bazárek oblečení, open mic nebo třeba saunu u rybníka.</p>
        </div>
    )

}
