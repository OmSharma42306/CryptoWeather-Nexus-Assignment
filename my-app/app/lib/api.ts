import axios from "axios";

const WEATHER_API_KEY = '95c4ba18e01976a327f239031b42a31f';
const NEWS_API_KEY = 'pub_78214f7335dd644ec67e66b285ed7d6ef5158';

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
        console.log(e.description)
        console.log(e.main)
        return{
            conditions:e.main,
            conditionDescription : e.description
        }
    })
    
    
    // return temperature,humidity,conditions.
    
    console.log("before return",city)
    return {cityName,humidity,temperature,conditions,conditionDescription}

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

    console.log("newsarray",newsData)

    return newsData;
}