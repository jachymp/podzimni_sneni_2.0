import axios from "axios"
import { useEffect, useState } from "react";

export default function BandList({formValues, places})
{
    // STATE FOR BAND LIST
    const [bandList, setBandList] = useState([]);

    // STATE FOR BAND CHANGES
    const [updateBand, setUpdateBand] = useState(null);

    // STATE FOR DELETE/UPDATE
    const [isChanged, setIsChanged] = useState(false);

    // STATE FOR MESSAGES
    const [successMessage, setSuccessMessage] = useState(null);
    const [failtureMessage, setFailtureMessage] = useState(null);

    // GET DATA FROM DB
    const getBandData = async() => {
        const response = await axios.get('/api/admin/bands');
        setBandList(response.data);
    }

    // DELETE DATA FROM DB
    const deleteBandData = async(id) => {
        try {
            const response = await axios.delete(`/api/admin/band/${id}`);
            if(!isChanged) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
            setSuccessMessage('Interpret smazán!');
        } catch (error) {
            setFailtureMessage('Hmm, něco se pokazilo!');
        }

    }

    // UPDATE DATA IN DB
    const updateBandData = async(id) => {
        try {
            const response = await axios.put(`/api/admin/band/${updateBand.id}`, {...updateBand});
            if(!isChanged) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
            setSuccessMessage('Interpret aktualizován!');
        } catch (error) {
            setFailtureMessage('Hmm, něco se pokazilo!');
        }

    }

    const handleChange = (i,e) => {
        let elementName = e.target.name;
        let elementValue = e.target.value;

        places.filter(place => {
            if(place.name == e.target.value) {
                elementValue = place.id;
            }
        })

        setUpdateBand({...bandList[i],
            [elementName]: elementValue});
    }

    // DISPLAYING MESSAGES
    const displayMessage = () => {
        const message = document.querySelector('.message-band-list');
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

    useEffect(()=> {
        getBandData();
    },[isChanged]);

    return(
        <div className="band-list">
            <h2>Seznam interpretů</h2>
            <div className="message-band-list">
                {displayMessage()}
            </div>
            {
                bandList &&
                bandList.map((band, index) => (
                    <div key={index} className="band-list--content">

                        <div className="band-list--inputs">
                            <label>Jméno:</label>
                            <input name="name" type="text" defaultValue={band.name} onChange={(e) => handleChange(index, e)}/>
                        </div>
                        <div className="band-list--inputs">
                            <label>Datum:</label>
                            <input name="date" type="date" defaultValue={band.date} onChange={(e) => handleChange(index, e)}/>
                        </div>
                        <div className="band-list--inputs">
                            <label>Začátek:</label>
                            <input name="time_from" type="time" defaultValue={band.time_from} onChange={(e) => handleChange(index, e)}/>
                        </div>
                        <div className="band-list--inputs">
                            <label>Konec:</label>
                            <input name="time_to" type="time" defaultValue={band.time_to} onChange={(e) => handleChange(index, e)}/>
                        </div>

                        <div className="band-list--inputs">
                            <label>Stage:</label>
                            {!band.place ?
                                <select name="place_id" className="stage" onChange={(e) => handleChange(index, e)}>
                                    <option defaultValue>-- vyber stage --</option>
                                    {
                                        places &&
                                        places.map((place, index) => (
                                            <option key={index} value={place.id}>{place.name}</option>
                                        ))
                                    }
                                </select>
                                :

                                band.place && Object.keys(band.place).map((value, i) => (
                                    value == 'name' ?
                                        <>
                                            <input list="places_list" name="place_id" type="text" key={i} defaultValue={band.place[value]  || ""} onChange={(e) => handleChange(index, e)}/>
                                            <datalist id="places_list">
                                                {places && places.map((place, index) => (
                                                    <option key={index} value={place.name}/>
                                                ))}

                                            </datalist>
                                        </>
                                        :
                                        null
                                ))}
                        </div>

                        <div className="band-list--inputs">
                            <label>Popis:</label>
                            <textarea name="description" defaultValue={band.description} onChange={(e) => handleChange(index, e)}></textarea>
                        </div>
                        <div className="band-list--inputs">
                            <label>Odkaz:</label>
                            <input name="link" type="url" defaultValue={band.link} onChange={(e) => handleChange(index, e)}/>
                        </div>
                        <div className="band-list--inputs">
                            <label>Důležitost:</label>
                            <input name="rank" type="number" defaultValue={band.rank} onChange={(e) => handleChange(index, e)}/>
                        </div>

                        <div className="up_del_btns">
                            <button className="up_btn" onClick={updateBandData}>Upravit</button>
                            <button className="del_btn" onClick={() => deleteBandData(band.id)}>Smazat</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
