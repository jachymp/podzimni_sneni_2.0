import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BandList from "../BandList/BandList";

export default function BandForm({year, places})
{

// STATE FOR IMMEDIATELLY DISPLAY BANDS
    const [isSaved, setIsSaved] = useState(false);

// STATE FOR MESSAGES
    const [successMessage, setSuccessMessage] = useState(null);
    const [failtureMessage, setFailtureMessage] = useState(null);

// STATE FOR INPUTS
    const [formValues, setFormValues] = useState([
        {name: "",
            date: "",
            time_from: "",
            time_to: "",
            place_id: "",
            year_id: "",
            description: ""
        }
    ]);

// STATE FOR INPUTS FOR POST METHOD -> AFTER SAVING VALUES FORN NEEDS TO BE CLEAR
    const [listValues, setListValues] = useState([]);

// WRITE VALUES TO THE STATE
    const handleChange = (i, e) => {
        const newItems = [...formValues];
        const currentYear = [...formValues];
        newItems[i][e.target.name] = e.target.value;
        currentYear[i]['year_id'] = year.id;
        setFormValues(newItems);
        setFormValues(currentYear);
    }

// ADD FIELDS
    const addFormFields = () => {
        setFormValues([...formValues,  {name: "",
            date: "",
            time_from: "",
            time_to: "",
            place_id: "",
            year_id: "",
            description: ""
        }]);
    }

// REMOVE FIELDS
    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

// CHECK IF SAVE BUTTON WAS HIT
    const saveValues = () => {
        if(isSaved == false) {
            setListValues(formValues);
            setFormValues([
                {name: "",
                    date: "",
                    time_from: "",
                    time_to: "",
                    place_id: "",
                    year_id: "",
                    description: ""
                }
            ]);
        }
    }

// POST METHOD AFTER SUBMIT FORM
    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            let response = await axios.post('/api/admin/bands', {...listValues}, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            setSuccessMessage('Super, přidal(a) jsi nové interprety');
            window.location.reload(false);
        } catch (error) {
            setFailtureMessage('Hmm, něco se pokazilo!');
        }

    }

// DISPLAYING MESSAGES
    const displayMessage = () => {
        const message = document.querySelector('.message-band');
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

    return (
        <div className="band-add">
            <h2>Přidání vystupujících</h2>
            <div className="message-band">
                {displayMessage()}
            </div>
            <form onSubmit={handleSubmit}>

                {formValues.map((value, index) => (
                    <div className="band-add--form" key={index}>
                        <input type="text" name="name" value={value.name || ""} placeholder="Jméno kapely" className="name" onChange={(e) => handleChange(index, e)}/>
                        <select name="place_id" className="stage" onChange={(e) => handleChange(index, e)}>
                            <option defaultValue>-- vyber stage --</option>
                            {
                                places &&
                                places.map((place, index) => (
                                    <option key={index} value={place.id}>{place.name}</option>
                                ))
                            }
                        </select>
                        <input type="text" name="date" value={value.date || ""} placeholder="Datum" className="date" onFocus={(e) => e.target.type = 'date'} onChange={(e) => handleChange(index, e)}/>
                        <input type="text" name="time_from" value={value.time_from || ""} placeholder="Začátek" className="time_from" onFocus={(e) => e.target.type = 'time'} onChange={(e) => handleChange(index, e)}/>
                        <input type="text" name="time_to" value={value.time_to || ""} placeholder="Konec" className="time_to" onFocus={(e) => e.target.type = 'time'} onChange={(e) => handleChange(index, e)}/>
                        <input type="url" name="link" value={value.link || ""} placeholder="Odkaz" className="link" onChange={(e) => handleChange(index, e)}/>
                        <textarea name="description" value={value.description || ""} placeholder="Popis kapely" className="desc" onChange={(e) => handleChange(index, e)}></textarea>
                        {
                            index ?
                                <button type="button" className="remove-btn" onClick={() => removeFormFields(index)}>Odebrat</button>
                                :
                                null
                        }
                    </div>
                ))}

                <div className="band-add--btn">
                    <button type="button" className="add-btn" onClick={() => addFormFields()}>Přidat další</button>
                    <button type="submit" className="submit-btn" onClick={saveValues}>Uložit</button>
                </div>
            </form>
            <BandList
                formValues={formValues}
                places={places}/>
        </div>
    )
}
