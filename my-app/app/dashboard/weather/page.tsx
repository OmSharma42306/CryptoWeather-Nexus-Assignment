"use client"
import { useEffect, useState } from "react";
import { fetchWeatherData} from "@/app/lib/api";

const cities:any =  ["London","New York","Tokyo"];
export default function Weather() {
 
  const [weatherData,setWeatherData] = useState<{[key:string]:any}>({});
  
  useEffect(()=>{
    async function fetchForThreeCities(){
      const data:any = {};
      for(let city of cities){
        console.log("ccc",city)
        const {humidity,temperature,conditions,conditionDescription} = await fetchWeatherData(city);
        data[city] = {humidity,temperature,conditions,conditionDescription};
        setWeatherData(data);
      }
    }
    fetchForThreeCities()
    
  },[])
  
   // todo add the state into redux store.
    
    
  return (
    <div>
      {cities.map((city:string)=>{
        return <div key={city}>
        {weatherData[city]?(
          <div>
          <h1>City : {city}</h1>
          <p>WeatherData Temperature : {weatherData[city].temperature}</p>
          <p>Humidity is : {weatherData[city].humidity}</p>
          <p>Conditions is : {weatherData[city].conditions}-{weatherData[city].conditionDescription}</p>
          <a href={`/dashboard/weather/${city.toLowerCase()}`} className="text-blue-500">View Details</a>
          </div>
        ):(
          <p>
            Loading........
          </p>
        )}
        </div>
      })}

    </div>
  );
}