import axios from "axios";

const WEATHER_API_KEY = '95c4ba18e01976a327f239031b42a31f';

// fetch weather data for three cities
interface weatherData{
    conditions:string;
    conditionDescription:string;
}
export async function fetchWeatherData(city:string){
    const cities = ["New York","London","Tokyo"];
    //const city = "London";
    console.log("City",city)
    const responses = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    
    const data = responses.data;
    
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
    
    // return temperature,humidity,conditions.
    console.log("Temperature",temperature);
    console.log("Humidity:",humidity)
    console.log("Conditions")
    console.log(`${conditions}(${conditionDescription})`)
    
    return {humidity,temperature,conditions,conditionDescription}

}

export async function fetchCoinData(coinName:string){
    
    const responses = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName}`);
    const data = responses.data;
    let [{current_price,price_change_24h,market_cap}]:any = data.map((e:{current_price:string,price_change_24h:string,market_cap:string})=>{
        return{
            current_price:e.current_price,
            price_change_24h:e.price_change_24h,
            market_cap:e.market_cap
        }
    })

    return {current_price,price_change_24h,market_cap};

    console.log(data);
}
