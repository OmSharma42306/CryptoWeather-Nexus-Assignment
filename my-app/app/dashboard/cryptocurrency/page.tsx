"use client"
import { fetchCoinData } from "@/app/lib/api";
import { useState } from "react"

export default function CryptoCurrency(){
    const [coinName,setCoinName] = useState<string>("");
    const [render,setRender] = useState<Boolean>(false);
    const [current_price,setCurrent_price] = useState<string>("");
    const [price_change_24h,setPrice_change_24h] = useState<strign>("");
    const [market_cap,setMarketCap] = useState<string>("");

    async function getCoinData(coinName:string){
        let coinData = await fetchCoinData(coinName);
        console.log(coinData)
        if(coinData.current_price && coinData.market_cap && coinData.price_change_24h){
            setRender(true)
            setCurrent_price(coinData.current_price);
            setPrice_change_24h(coinData.price_change_24h);
            setMarketCap(coinData.market_cap);
        }
    }

    return <div>
        <input type="text" placeholder="Enter Coin" onChange={(e)=>{
            setCoinName(e.target.value);
        }} />
        {render?"Here is the Details":"Loading"}

        <h1>Coin Name : {coinName}</h1>
         <h1>Live Price : {current_price}</h1>
         <h1>Price Change 24 Hours : {price_change_24h}</h1>
         <h1>Market Cap : {market_cap}</h1>
         

        <button onClick={()=>{
            getCoinData(coinName)
        }}>Get Status</button>
        
    </div>
}