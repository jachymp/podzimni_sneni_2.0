import axios from "axios";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";

export default function Description()
{
    const [yearData, setYearData] = useState(null);

    const getYearData = async() => {
        const response = await axios.get('/api/admin/year');
        setYearData(response.data);
    }

    const setPrices = () => {
        const priceCont = document.querySelector('#description-prices');

        // IF TOTAL PRICES ARE NOT DEFINED DISPLAY MESSAGE: we are working on it
        if (priceCont && yearData &&
            (!yearData.fest_price_all || !yearData.fest_price_all_student ||
                !yearData.fest_price_friday || !yearData.fest_price_friday_student ||
                !yearData.fest_price_saturday || !yearData.fest_price_saturday_student)) {

            priceCont.innerHTML = '<p>Ceny vstupného budou brzy zveřejněny.</p>';
        } else if(priceCont) {
            priceCont.innerHTML =   `<div class="description-price-container">
                                    <h4 class="price-head-norm">Normální</h4>
                                    <h4 class="price-head-std">Student</h4>
                                    <h4 class="price-friday-head">Pátek</h4>
                                    <h4 class="price-saturday-head">Sobota</h4>
                                    <h4 class="price-all-head">Celý</h4>
                                    <p class="price-friday-norm">${yearData && yearData.fest_price_friday} Kč</p>
                                    <p class="price-friday-std">${yearData && yearData.fest_price_friday_student} Kč</p>
                                    <p class="price-saturday-norm">${yearData && yearData.fest_price_saturday} Kč</p>
                                    <p class="price-saturday-std">${yearData && yearData.fest_price_saturday_student} Kč</p>
                                    <p class="price-all-norm">${yearData && yearData.fest_price_all} Kč</p>
                                    <p class="price-all-std">${yearData && yearData.fest_price_all_student} Kč</p>
                                    </div>`;
        }

    }

    useEffect(() => {
        getYearData();
    }, []);

    return(
        <div className="fest-description-container">

            {/* GRADE */}
            {yearData && yearData.grade ?
                <h1>Podzimní snění - {yearData.grade}</h1>
                :
                <h1>Podzimní snění</h1>
            }

            {/* DESCRIPTION */}
            {yearData && yearData.fest_description ?
                <div className="fest-description"><p>{yearData.fest_description}</p></div>
                :
                <div className="fest-description"><p>Festival už se chystá. Všechno se včas dozvíš, neboj.</p></div>
            }

            {/* DATES */}
            <div className="description-dates-container">
                {yearData && yearData.from && yearData.to ?
                    <>
                        <p>{yearData.from && dateFormat(yearData.from, "dd.mm.yyyy")}</p>
                        <p>-</p>
                        <p>{yearData.to && dateFormat(yearData.to, "dd.mm.yyyy")}</p>
                    </>
                    :
                    null
                }
            </div>
            <div id="description-prices">
                {setPrices()}
            </div>
        </div>
    )
}
