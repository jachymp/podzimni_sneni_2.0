import axios from "axios";

export default function Detail({year, setYear, setSuccessMessage, setFailtureMessage})
{
    const handleChange = (e) => {
        let elementName = e.target.name;
        let elementValue = e.target.value;

        if(e.target.type === "checkbox") {
            const checkbox = document.querySelector('.lineup-shared');

            if(checkbox.checked) {
                elementValue = true;
            } else if (!checkbox.checked) {
                elementValue = false;
            }
        }


        setYear({...year,
            [elementName]: elementValue});
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`/api/admin/year/${year.id}/update`, {...year}, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            setSuccessMessage(`Ohh yeah, aktualizoval(a) ročník: ${year.grade}!`);
        } catch (error) {
            if(error.response.data.errors.name) {
                setFailtureMessage(error.response.data.errors.name);
            } else if(error.response.data.errors.grade) {
                setFailtureMessage(error.response.data.errors.grade);
            }
        }
    }

    return(
        <div className="detail-section">
            <h2>Aktualizace údajů</h2>

            <form onSubmit={handleSubmit}>
                <div className="detail-section--form">

                    <input className="year" placeholder="Rok" type="text" name="name" value={year.name} onChange={handleChange}/>
                    <input className="grade" placeholder="Ročník" type="text" name="grade" value={year.grade} onChange={handleChange}/>
                    <input className="from" placeholder="Od" type="text" name="from" value={year.from} onFocus={(e) => (e.target.type = 'date')} onChange={handleChange}/>
                    <input className="to" placeholder="Do" type="text" name="to" value={year.to} onFocus={(e) => (e.target.type = 'date')} onChange={handleChange}/>
                    <input className="fr-nrm" placeholder="Pá (Kč)" type="number" name="fest_price_friday" value={year.fest_price_friday} onChange={handleChange}/>
                    <input className="fr-std" placeholder="Pá - student (Kč)" type="number" name="fest_price_friday_student" value={year.fest_price_friday_student} onChange={handleChange}/>
                    <input className="sr-nrm" placeholder="So (Kč)" type="number" name="fest_price_saturday" value={year.fest_price_saturday} onChange={handleChange}/>
                    <input className="sr-std" placeholder="So - student (Kč)" type="number" name="fest_price_saturday_student" value={year.fest_price_saturday_student} onChange={handleChange}/>
                    <input className="all-nrm" placeholder="Oba (Kč)" type="number" name="fest_price_all" value={year.fest_price_all} onChange={handleChange}/>
                    <input className="all-std" placeholder="Oba - student (Kč)" type="number" name="fest_price_all_student" value={year.fest_price_all_student} onChange={handleChange}/>
                    <textarea className="desc" placeholder="Popis ročníku"  name="fest_description" value={year.fest_description} onChange={handleChange}></textarea>

                    <label htmlFor="lineup_public">Zveřejnit line-up</label>
                    <input className="lineup-shared" type="checkbox" name="lineup_public" id="lineup_public" checked={year.lineup_public ? true : false} onChange={handleChange}/>

                </div>
                <div className="detail-section--btn">
                    <button>Upravit</button>
                </div>
            </form>
        </div>
    )
}
