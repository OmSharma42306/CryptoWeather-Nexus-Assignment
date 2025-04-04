import axios from "axios";

const WEATHER_API_KEY = '95c4ba18e01976a327f239031b42a31f';

// fetch weather data for three cities
interface weatherData{
    conditions:string;
    conditionDescription:string;
}
export async function fetchWeatherData(){
    const cities = ["New York","London","Tokyo"];
    const city = "London";

    const responses = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    //console.log(responses);
    const data = responses.data;
    console.log("Data MAIN",data.weather.main)
    const humidity = data.main.humidity;
    const temperature = data.main.temp;
    let [{conditions,conditionDescription}]:weatherData|any= data.weather.map((e:{main:string,description:string})=>{
        console.log(e.description)
        console.log(e.main)
        return{
            conditions:e.main,
            conditionDescription : e.description
        }
    })
    
    console.log("Temperature",temperature);
    console.log("Humidity:",humidity)
    console.log("Conditions")
    console.log(`${conditions}(${conditionDescription})`)
    // return temperature,humidity,conditions.

}

export async function fetchCoinData(){

    const responses = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana");
    const data = responses.data;
    console.log(data);
}
