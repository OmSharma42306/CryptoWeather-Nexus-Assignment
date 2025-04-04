"use client"
import { fetchCoinData } from "@/app/lib/api";
import { useEffect, useState } from "react"

const cryptos = ["bitcoin","ethereum","solana"];

export default function CryptoCurrency(){
    const [coinName,setCoinName] = useState<string>("");
    const [cryptoData,setCryptoData] = useState<any>([]);
    const [loading,setLoading] = useState<Boolean>(true);
    //const [render,setRender] = useState<Boolean>(false);
    // const [current_price,setCurrent_price] = useState<string>("");
    // const [price_change_24h,setPrice_change_24h] = useState<string>("");
    // const [market_cap,setMarketCap] = useState<string>("");

    // async function getCoinData(coinName:string){
    //     let coinData = await fetchCoinData(coinName);
    //     console.log(coinData)
    //     if(coinData.current_price && coinData.market_cap && coinData.price_change_24h){
    //         setRender(true)
    //         setCurrent_price(coinData.current_price);
    //         setPrice_change_24h(coinData.price_change_24h);
    //         setMarketCap(coinData.market_cap);
    //     }
    // }

    useEffect(()=>{
        
        async function getThreeCryptoData(){
            const data:any = [];
            const threeCryptoPromises = cryptos.map(async (crypto)=>{
                console.log("Crypto Names",crypto)
                const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCoinData(crypto);
                return {current_price,price_change_24h,market_cap,cryptoName};
            })

            const results = await Promise.all(threeCryptoPromises);
            results.forEach((cryptoData)=>{
            //    data[cryptoData.cryptoName] = cryptoData;
            console.log("rrrr",cryptoData)
                data.push(cryptoData)
            })
            console.log("RESULTS OF CRYPTO",data);
            setCryptoData(data);
            setLoading(false)
        }
        getThreeCryptoData();
    },[])
    if(loading){
       <h1>
        Loading..........
       </h1> 
             
    
    }
    console.log("ffff",cryptoData)

    return <div>
         {
            cryptoData.map((cryptoDetails:any)=>{
                
                return <div key={cryptoDetails.cryptoName} >
                    <h1>Crypto Name : {cryptoDetails.cryptoName}</h1>
                    <p>Crypto Current Price : {cryptoDetails.current_price}</p>
                    <p>price_change_24h : {cryptoDetails.price_change_24h}</p>
                    <p> market_cap : {cryptoDetails.market_cap}</p>
                     
                </div>
            })
            }
       
        <input type="text" placeholder="Enter Coin" onChange={(e)=>{
            setCoinName(e.target.value);
        }} />
        
        

        <button onClick={()=>{
        
        }}>Get Status</button>
        
    </div>
}