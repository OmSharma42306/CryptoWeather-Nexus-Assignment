"use client"

import { fetchWeatherData } from "@/app/lib/api";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface weatherData{
humidity:string;
temperature:string;
conditions:string;
conditionDescription:string;
cityName:string;
}

export default function CityDetails(){
    const params = useParams();
    console.log(params.city)
    const city = params.city;
    console.log("Entered City",city)
    const [weatherData,setWeatherData] = useState<weatherData|any>({});
    const [loading,setLoading] = useState<Boolean>(true);
    const historicalData = [
        { date: "2025-04-01", temperature: 13, humidity: 72, conditions: "Clouds" },
        { date: "2025-04-02", temperature: 15, humidity: 68, conditions: "Clear" },
        { date: "2025-04-03", temperature: 11, humidity: 77, conditions: "Rain" },
        { date: "2025-04-04", temperature: 15, humidity: 68, conditions: "Clear" },
        { date: "2025-04-05", temperature: 21, humidity: 67, conditions: "Rain" },
        
      ];
      
    useEffect(()=>{
        if(city){
            console.log(city);
            async function fetchCityWeather(city:string){
                const {humidity,temperature,conditions,conditionDescription,cityName} = await fetchWeatherData(city);
                console.log(humidity);
                setWeatherData({humidity,temperature,conditions,conditionDescription,cityName})
                setLoading(false)
            }

            fetchCityWeather(city as string)

        }
    },[])

    console.log(weatherData)

    if(loading){
        return <div>
            Loading............
        </div>
    }
    
    return <div>
        <h1>City Name : {city}</h1>
        <p>Humidity :  {weatherData.humidity}</p>
        <p>Temperature : {weatherData.temperature}</p>
        <p>Conditions is : {weatherData.conditions}-{weatherData.conditionDescription}</p>
        <h1>{historicalData.map((e)=>{
            return <div>
                <h1>date : {e.date}</h1>
                <h1>temperature:{e.temperature}</h1>
                <h1>Humidity : {e.humidity}</h1>
                <h1>Conditions : {e.conditions}</h1>
            </div>
        })}</h1>
    </div>
}



    
    