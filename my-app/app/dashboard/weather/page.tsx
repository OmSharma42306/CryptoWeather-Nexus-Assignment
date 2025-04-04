"use client"
import { useEffect, useState } from "react";
import { fetchWeatherData} from "@/app/lib/api";
const cities:any =  ["London","New York","Tokyo"];
export default function Weather() {
 
  const [weatherData,setWeatherData] = useState<{[key:string]:any}>({});
  const [searchCity,setSearchCity] = useState<string>("");
  const [searchResult,setSearchResult] = useState<any>();
  useEffect(()=>{
    async function fetchForThreeCities(){
      const data:any = {};
      
      // sequentially fethching the city weather causing the state to update synchrnously
      // so we have to fetch it parellely
      // for(let city of cities){
      //   console.log("ccc",city)
      //   const {humidity,temperature,conditions,conditionDescription} = await fetchWeatherData(city);
      //   data[city] = {humidity,temperature,conditions,conditionDescription};
      //   setWeatherData(data);
      // }
      const weatherPromises = cities.map(async (city:string)=>{
        const {humidity,temperature,conditions,conditionDescription,cityName} = await fetchWeatherData(city);

        return {cityName,humidity,temperature,conditions,conditionDescription}
      });

      // wait for all cities weather to be fethced.
      const results = await Promise.all(weatherPromises);
      console.log("results",results)
      // store the weather data into an data object
      results.forEach((weatherDetails)=>{
        data[weatherDetails.cityName] = weatherDetails;        
      });
      console.log("f",data);
      setWeatherData(data);
    }
    fetchForThreeCities()    
  },[])

  async function handleSearch(){
    if(searchCity){
      const result = await fetchWeatherData(searchCity);
      setSearchResult(result);
    }
  }
  
   // todo add the state into redux store.
   console.log(weatherData)
    
    
  return (
    <div>
      {/* Search Bar */}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
            </div>

        {/* Search Result */}
        {searchResult && (
           <div className="mt-4 p-3 border">
           <h2 className="font-bold">{searchCity}</h2>
           <p>Temperature: {searchResult.temperature}°C</p>
           <p>Humidity: {searchResult.humidity}%</p>
           <p>Conditions is : {searchResult.conditions}-{searchResult.conditionDescription}</p>
           <a href={`/dashboard/weather/${searchCity.toLowerCase()}`} className="text-blue-500">View Details</a> 
       </div>
        )}

          
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