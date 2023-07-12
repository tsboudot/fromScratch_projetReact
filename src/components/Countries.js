import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';


const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [selectedRadio, setSelectedRadio] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data))
    }, [])

    return (
        <div className="countries">
            <ul className="radio-container">
                <input type="range"
                    min="1" max="250"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />
                {radios.map((continent) => (
                    <div key={continent}>
                        <input type="radio" value={continent} name="continentRadio"
                            checked={selectedRadio === continent}
                            onChange={(e) => setSelectedRadio(e.target.value)} />
                        <label htmlFor={continent}>{continent}</label>
                    </div>
                ))}
            </ul>
            <ul>
                {data
                    .filter((country) => country.continents[0].includes(selectedRadio))
                    .slice(0, rangeValue).map((country, index) =>
                        (<Card key={index} country={country} />))}
            </ul>
        </div >
    );
};

export default Countries;