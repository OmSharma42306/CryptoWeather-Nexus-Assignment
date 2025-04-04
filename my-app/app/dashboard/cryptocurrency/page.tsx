"use client"
import { fetchCryptoData } from "@/app/lib/api";
import { useEffect, useState } from "react"

const cryptos = ["bitcoin","ethereum","solana"];

export default function CryptoCurrency(){
    const [coinName,setCoinName] = useState<string>("");
    const [cryptoData,setCryptoData] = useState<any>([]);
    const [loading,setLoading] = useState<Boolean>(true);

    useEffect(()=>{
        
        async function getThreeCryptoData(){
            const data:any = [];
            const threeCryptoPromises = cryptos.map(async (crypto)=>{
                console.log("Crypto Names",crypto)
                const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCryptoData(crypto);
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