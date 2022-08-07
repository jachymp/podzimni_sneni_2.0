import axios from "axios";
import { useState } from "react";

export default function Content({setSuccessMessage, setFailtureMessage})
{

    const [newYear, setNewYear] = useState(null);

    const handleSubmit = async(event) => {
        event.preventDefault()

        try{
            let response = await axios.post('/api/admin/year', {...newYear}, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            setSuccessMessage(`Ohh yeah, vytvořil(a) jsi ročník!`);
            setTimeout(() => {
                window.location.reload(false);
            }, 1000)

        } catch (error) {
            if(error.response.data.errors.name) {
                setFailtureMessage(error.response.data.errors.name);
            } else if(error.response.data.errors.grade) {
                setFailtureMessage(error.response.data.errors.grade);
            }
        }
    }

    const handleChange = (e) => {
        let elementName = e.target.name;
        let elementValue = e.target.value;
        setNewYear({...newYear,
            [elementName]: elementValue});
    }

    return(
        <div className="new-year">
            <h2>Založení nového ročníku</h2>
            <form onSubmit={handleSubmit}>
                <div className="new-year--form">

                    <input className="year" type="text" placeholder="Rok" name="name" onChange={handleChange}/>
                    <input className="grade" type="text" placeholder="Vol." name="grade" onChange={handleChange}/>
                    <input className="from" type="text" placeholder="Od" name="from" onFocus={(e) => (e.target.type = 'date')} onChange={handleChange}/>
                    <input className="to" type="text" placeholder="Do" name="to" onFocus={(e) => (e.target.type = 'date')} onChange={handleChange}/>
                    <input className="fr-nrm" type="number" placeholder="Pá (Kč)" name="fest_price_friday" onChange={handleChange}/>
                    <input className="fr-std" type="number" placeholder="Pá - student (Kč)" name="fest_price_friday_student" onChange={handleChange}/>
                    <input className="sr-nrm" type="number" placeholder="So (Kč)" name="fest_price_saturday" onChange={handleChange}/>
                    <input className="sr-std" type="number" placeholder="So - student (Kč)" name="fest_price_saturday_student" onChange={handleChange}/>
                    <input className="all-nrm" type="number" placeholder="Oba (Kč)" name="fest_price_all" onChange={handleChange}/>
                    <input className="all-std" type="number" placeholder="Oba - student (Kč)" name="fest_price_all_student" onChange={handleChange}/>
                    <textarea className="desc" name="fest_description" placeholder="Popis ročníku" onChange={handleChange}></textarea>
                </div>
                <div className="save-btn"><button>Uložit</button></div>

            </form>
        </div>
    )
}
