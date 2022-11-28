import React from 'react' 
import './app.css';
import search from './componets/search/search';
import curentWeather from "./components/curent-weather/curentWeather";
import {weather_API_Url, WEATHER_API_KEY} from "./api";
import {usestate} from "react";


const app = () => {
    return (
        <div>app</div>
    )
}

function app () {
    const [curentWeather, setcurentWeather] = usestate(null);

    const handleonsearchchange = (searchdata) => {
        const [lat, lon] = searchdata.value.split("");

        const curentWeatherfetch = fetch (
                '${weather_API_url}/weather?lat=${lat}&lon=${lon}&appid=$appid=${WEATHER_API_KEY}&units=metric'
        );

        const forecastfetch = fetch (
            '${weather_API_url}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric'
        );

        Promise.all([curentWeatherfetch, forecastfetch])
        .then (async(Response) => {

            const weatherResponse = await Response [0].json();
            const forcastResponse = await Response [1].json();

            setcurentWeather({city: searchdata.label,...weatherResponse});
            setforcast({city: searchdata.label,...forcastResponse});

        })

        .catch((err) => console.log(err));

    }

    console.log(curentWeather);
    console.log(forcast);

    return (
        <div className = "container">
            <search onsearchchange = {handleonsearchchange} />
            {curentWeather && <curentWeather data = {curentWeather} />}
        </div>

    );

}

    export default app;
