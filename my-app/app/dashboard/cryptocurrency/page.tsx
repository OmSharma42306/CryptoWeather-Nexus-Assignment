"use client"
import { fetchCoinData } from "@/app/lib/api";
import { useState } from "react"

export default function CryptoCurrency(){
    const [coinName,setCoinName] = useState<string>("");

    async function getCoinData(coinName:string){
        let coinData = await fetchCoinData(coinName);
        console.log(coinData)
    }

    return <div>
        <input type="text" placeholder="Enter Coin" onChange={(e)=>{
            setCoinName(e.target.value);
        }} />

        <button onClick={()=>{
            getCoinData(coinName)
        }}>Get Status</button>
        
    </div>
}