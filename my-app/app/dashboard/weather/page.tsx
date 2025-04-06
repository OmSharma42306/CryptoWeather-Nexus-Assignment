// "use client"
// import { useEffect, useState } from "react";
// import { fetchWeatherData} from "@/app/lib/api";
// const cities:any =  ["London","New York","Tokyo"];
// export default function Weather() {
 
//   const [weatherData,setWeatherData] = useState<{[key:string]:any}>({});
//   const [searchCity,setSearchCity] = useState<string>("");
//   const [searchResult,setSearchResult] = useState<any>();
//   useEffect(()=>{
//     async function fetchForThreeCities(){
//       const data:any = {};
      
//       // sequentially fethching the city weather causing the state to update synchrnously
//       // so we have to fetch it parellely
//       // for(let city of cities){
//       //   console.log("ccc",city)
//       //   const {humidity,temperature,conditions,conditionDescription} = await fetchWeatherData(city);
//       //   data[city] = {humidity,temperature,conditions,conditionDescription};
//       //   setWeatherData(data);
//       // }
//       const weatherPromises = cities.map(async (city:string)=>{
//         const {humidity,temperature,conditions,conditionDescription,cityName} = await fetchWeatherData(city);

//         return {cityName,humidity,temperature,conditions,conditionDescription}
//       });

//       // wait for all cities weather to be fethced.
//       const results = await Promise.all(weatherPromises);
//       console.log("results",results)
//       // store the weather data into an data object
//       results.forEach((weatherDetails)=>{
//         data[weatherDetails.cityName] = weatherDetails;        
//       });
//       console.log("f",data);
//       setWeatherData(data);
//     }
//     fetchForThreeCities()    
//   },[])

//   async function handleSearch(){
//     if(searchCity){
//       const result = await fetchWeatherData(searchCity);
//       setSearchResult(result);
//     }
//   }
  
//    // todo add the state into redux store.
//    console.log(weatherData)
    
    
//   return (
//     <div>
//       {/* Search Bar */}
//             <div className="mt-4">
//                 <input
//                     type="text"
//                     placeholder="Enter city name..."
//                     value={searchCity}
//                     onChange={(e) => setSearchCity(e.target.value)}
//                     className="border p-2 mr-2"
//                 />
//                 <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
//             </div>

//         {/* Search Result */}
//         {searchResult && (
//            <div className="mt-4 p-3 border">
//            <h2 className="font-bold">{searchCity}</h2>
//            <p>Temperature: {searchResult.temperature}°C</p>
//            <p>Humidity: {searchResult.humidity}%</p>
//            <p>Conditions is : {searchResult.conditions}-{searchResult.conditionDescription}</p>
//            <a href={`/dashboard/weather/${searchCity.toLowerCase()}`} className="text-blue-500">View Details</a> 
//        </div>
//         )}

          
//       {cities.map((city:string)=>{
//         return <div key={city}>
//         {weatherData[city]?(
//           <div>
//           <h1>City : {city}</h1>
//           <p>WeatherData Temperature : {weatherData[city].temperature}</p>
//           <p>Humidity is : {weatherData[city].humidity}</p>
//           <p>Conditions is : {weatherData[city].conditions}-{weatherData[city].conditionDescription}</p>
//           <a href={`/dashboard/weather/${city.toLowerCase()}`} className="text-blue-500">View Details</a>
//           </div>
//         ):(
//           <p>
//             Loading........
//           </p>
//         )}
//         </div>
//       })}
//     </div>
//   );
// }

"use client"
import { useEffect, useState } from "react";
import { fetchWeatherData } from "@/app/lib/api";

const cities: any = ["London", "New York", "Tokyo"];

export default function Weather() {
  const [weatherData, setWeatherData] = useState<{[key:string]:any}>({});
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>();

  useEffect(() => {
    async function fetchForThreeCities() {
      const data: any = {};
      const weatherPromises = cities.map(async (city: string) => {
        const { humidity, temperature, conditions, conditionDescription, cityName } = await fetchWeatherData(city);
        return { cityName, humidity, temperature, conditions, conditionDescription }
      });

      const results = await Promise.all(weatherPromises);
      results.forEach((weatherDetails) => {
        data[weatherDetails.cityName] = weatherDetails;
      });
      setWeatherData(data);
    }
    fetchForThreeCities()
  }, [])

  async function handleSearch() {
    if (searchCity) {
      const result = await fetchWeatherData(searchCity);
      setSearchResult(result);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Weather Dashboard</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{searchCity}</h2>
            <div className="space-y-2">
              <p className="text-gray-700">Temperature: <span className="font-medium">{searchResult.temperature}°C</span></p>
              <p className="text-gray-700">Humidity: <span className="font-medium">{searchResult.humidity}%</span></p>
              <p className="text-gray-700">Conditions: <span className="font-medium">{searchResult.conditions} - {searchResult.conditionDescription}</span></p>
            </div>
            <a 
              href={`/dashboard/weather/${searchCity.toLowerCase()}`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details →
            </a>
          </div>
        )}

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city: string) => (
            <div key={city} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              {weatherData[city] ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{city}</h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">Temperature: <span className="font-medium">{weatherData[city].temperature}°C</span></p>
                    <p className="text-gray-700">Humidity: <span className="font-medium">{weatherData[city].humidity}%</span></p>
                    <p className="text-gray-700">Conditions: <span className="font-medium">{weatherData[city].conditions} - {weatherData[city].conditionDescription}</span></p>
                  </div>
                  <a 
                    href={`/dashboard/weather/${city.toLowerCase()}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details →
                  </a>
                </>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-pulse text-gray-400">Loading...</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}