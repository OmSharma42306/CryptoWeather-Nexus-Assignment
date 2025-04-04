"use client"
import { fetchCoinData } from "@/app/lib/api";
import { useState } from "react"

export default function CryptoCurrency(){

    const [loading,setLoading] = useState<Boolean>(true);
    const [cryptoName,setCryptoName] = useState<string>("");

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