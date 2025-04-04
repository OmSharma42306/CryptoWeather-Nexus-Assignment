"use client"
import { fetchCryptoData } from "@/app/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

interface cryptoDataType{
current_price:string;
price_change_24h:string;
market_cap:string;
cryptoName : string;
}[]

export default function CryptoCurrency(){

    const [loading,setLoading] = useState<Boolean>(true);
    const [cryptoData,setCryptoData] = useState<cryptoDataType[]>([]);
    
    //const [cryptoName,setCryptoName] = useState<string>("");
    const params = useParams();
    console.log(params.cryptoname)
    const cryptoName = params.cryptoname;
    useEffect(()=>{
        async function getCryptoData(cryptoname:string){
            if(cryptoName){
               const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCryptoData(cryptoname);
                setCryptoData([{current_price,price_change_24h,market_cap,cryptoName}])
                setLoading(false)
            }
        }
        getCryptoData(cryptoName as string);
        
    },[])

    if(loading){
        <h1>Loading......</h1>
    }

    return <div>
          {cryptoData.map((crypto)=>{
            return <div key={crypto.cryptoName}>
                <h1>Crypto Name : {crypto.cryptoName}</h1>
                <p>Crypto Current Price : {crypto.current_price}</p>
                    <p>price_change_24h : {crypto.price_change_24h}</p>
                    <p> market_cap : {crypto.market_cap}</p>            </div>
          })}
    </div>
}