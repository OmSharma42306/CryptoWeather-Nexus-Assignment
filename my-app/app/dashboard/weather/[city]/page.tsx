// "use client"

// import { fetchWeatherData } from "@/app/lib/api";
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react";

// interface weatherData{
// humidity:string;
// temperature:string;
// conditions:string;
// conditionDescription:string;
// cityName:string;
// }

// export default function CityDetails(){
//     const params = useParams();
//     console.log(params.city)
//     const city = params.city;
//     console.log("Entered City",city)
//     const [weatherData,setWeatherData] = useState<weatherData|any>({});
//     const [loading,setLoading] = useState<Boolean>(true);
//     const historicalData = [
//         { date: "2025-04-01", temperature: 13, humidity: 72, conditions: "Clouds" },
//         { date: "2025-04-02", temperature: 15, humidity: 68, conditions: "Clear" },
//         { date: "2025-04-03", temperature: 11, humidity: 77, conditions: "Rain" },
//         { date: "2025-04-04", temperature: 15, humidity: 68, conditions: "Clear" },
//         { date: "2025-04-05", temperature: 21, humidity: 67, conditions: "Rain" },
        
//       ];
      
//     useEffect(()=>{
//         if(city){
//             console.log(city);
//             async function fetchCityWeather(city:string){
//                 const {humidity,temperature,conditions,conditionDescription,cityName} = await fetchWeatherData(city);
//                 console.log(humidity);
//                 setWeatherData({humidity,temperature,conditions,conditionDescription,cityName})
//                 setLoading(false)
//             }

//             fetchCityWeather(city as string)

//         }
//     },[])

//     console.log(weatherData)

//     if(loading){
//         return <div>
//             Loading............
//         </div>
//     }
    
//     return <div>
//         <h1>City Name : {city}</h1>
//         <p>Humidity :  {weatherData.humidity}</p>
//         <p>Temperature : {weatherData.temperature}</p>
//         <p>Conditions is : {weatherData.conditions}-{weatherData.conditionDescription}</p>
//         <h1>{historicalData.map((e)=>{
//             return <div>
//                 <h1>date : {e.date}</h1>
//                 <h1>temperature:{e.temperature}</h1>
//                 <h1>Humidity : {e.humidity}</h1>
//                 <h1>Conditions : {e.conditions}</h1>
//             </div>
//         })}</h1>
//     </div>
// }



    
    
"use client"
import { fetchWeatherData } from "@/app/lib/api";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface weatherData {
  humidity: string;
  temperature: string;
  conditions: string;
  conditionDescription: string;
  cityName: string;
}

export default function CityDetails() {
  const params = useParams();
  const city = params.city;
  const [weatherData, setWeatherData] = useState<weatherData|any>({});
  const [loading, setLoading] = useState<Boolean>(true);
  
  const historicalData = [
    { date: "2025-04-01", temperature: 13, humidity: 72, conditions: "Clouds" },
    { date: "2025-04-02", temperature: 15, humidity: 68, conditions: "Clear" },
    { date: "2025-04-03", temperature: 11, humidity: 77, conditions: "Rain" },
    { date: "2025-04-04", temperature: 15, humidity: 68, conditions: "Clear" },
    { date: "2025-04-05", temperature: 21, humidity: 67, conditions: "Rain" },
  ];

  useEffect(() => {
    if (city) {
      async function fetchCityWeather(city: string) {
        const { humidity, temperature, conditions, conditionDescription, cityName } = await fetchWeatherData(city);
        setWeatherData({ humidity, temperature, conditions, conditionDescription, cityName })
        setLoading(false)
      }
      fetchCityWeather(city as string)
    }
  }, [city])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-2xl font-semibold text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Current Weather Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{city}</h1>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Current Weather
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <p className="text-blue-600 font-medium">Temperature</p>
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-blue-900 mt-2">{weatherData.temperature}°C</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <p className="text-green-600 font-medium">Humidity</p>
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-green-900 mt-2">{weatherData.humidity}%</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <p className="text-purple-600 font-medium">Conditions</p>
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-purple-900 mt-2">{weatherData.conditions}</p>
            </div>
          </div>
          
          <p className="mt-6 text-gray-600 text-lg">{weatherData.conditionDescription}</p>
        </div>

        {/* Historical Data Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Historical Data</h2>
          <div className="space-y-6">
            {historicalData.map((data, index) => (
              <div 
                key={index}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-semibold text-gray-900">{data.date}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.conditions === 'Clear' ? 'bg-yellow-100 text-yellow-800' :
                    data.conditions === 'Clouds' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {data.conditions}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-gray-600">Temperature: <span className="font-medium">{data.temperature}°C</span></p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                    </svg>
                    <p className="text-gray-600">Humidity: <span className="font-medium">{data.humidity}%</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}