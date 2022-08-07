import Artist from "../Artist/Artist";
import Description from "../Description/Description";
import LineUp from "../LineUp/LineUp";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation";

export default function App() {

    const [year, setYear] = useState(null);

    const getYear = async() => {
        const response = await axios.get('/api/admin/year');
        setYear(response.data);
    }

    useEffect(() => {
        getYear()
    }, []);

    return(
        <div className="content-container">
            <Navigation/>
            <Description/>
            <Artist/>
            {
                year && year.lineup_public === 1 ?
                    <LineUp/>
                    :
                    null
            }

        </div>
    )
}
