import axios from "axios";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY


// fetch weather data for three cities
interface weatherData{
    conditions:string;
    conditionDescription:string;
}

export async function fetchWeatherData(city:string){

    const responses = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    
    const data = responses.data;
    const humidity = data.main.humidity;
    const temperature = data.main.temp;
    const cityName = city;

    let [{conditions,conditionDescription}]:weatherData|any= data.weather.map((e:{main:string,description:string})=>{
        return{
            conditions:e.main,
            conditionDescription : e.description
        }
    })
    
    
    // return temperature,humidity,conditions.
    return {cityName,humidity,temperature,conditions,conditionDescription}

}

export async function fetchCryptoData(cryptoName:string){
    const responses = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName}`);
    const data = responses.data;
    let [{current_price,price_change_24h,market_cap}]:any = data.map((e:{current_price:string,price_change_24h:string,market_cap:string})=>{
       
        return{
            current_price:e.current_price,
            price_change_24h:e.price_change_24h,
            market_cap:e.market_cap
        }
    })

    return {cryptoName,current_price,price_change_24h,market_cap};    
}


export async function getCryptoRelatedHeadlines(){
    const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=crypto&language=en`;
    const responses = await axios.get(url);
    console.log(responses);
    const newsData:any = [];
    const data = responses.data;
    let [{title,link,description,pubDate}] : any = data.results.map((e:{title:string,link:string,description:string,pubDate:string})=>{
        newsData.push({
            title : e.title,
            link : e.link,
            description : e.description,
            pubDate : e.pubDate
        })
        return {
            title : e.title,
            link : e.link,
            description : e.description,
            pubDate : e.pubDate
        }
    })

    return newsData;
}