"use client"
import { fetchCryptoData } from "@/app/lib/api";
import { useEffect, useState } from "react"


const cryptos = ["bitcoin","ethereum","solana"];

interface cryptoDataType{
    current_price:string;
    price_change_24h:string;
    market_cap:string;
    cryptoName : string;
    }[]

export default function CryptoCurrency(){
    const [searchCrypto,setSearchCrypto] = useState<string>("");
    const [searchResult,setSearchResult] = useState<any >([]);
    const [cryptoData,setCryptoData] = useState<cryptoDataType[]>([]);
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



    async function handleSearch(){
        if(searchCrypto){
            const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCryptoData(searchCrypto);
            setSearchResult([{current_price,price_change_24h,market_cap,cryptoName}]);
        }
        

    }
    if(loading){
       <h1>
        Loading..........
       </h1> 
    }
    console.log("ffff",cryptoData)
    console.log("seeeeeeeeeeeeeeeeee",searchResult)


    return <div>
        {/* Search Result */}
         {searchResult.length>0 && (
           <div className="mt-4 p-3 border">
           <h2 className="font-bold">{searchResult[0].cryptoName}</h2>
           <p>current_price: {searchResult[0].current_price}</p>
           <p>Price Change 24h : {searchResult[0].price_change_24h}</p>
            <p>MarketCap : {searchResult[0].market_cap}</p>
            
           <a href={`/dashboard/weather/${searchResult[0].cryptoName.toLowerCase()}`} className="text-blue-500">View Details</a> 
       </div>
        )} 

         {
            cryptoData.map((cryptoDetails:any)=>{
                
                return <div key={cryptoDetails.cryptoName} >
                    <h1>Crypto Name : {cryptoDetails.cryptoName}</h1>
                    <p>Crypto Current Price : {cryptoDetails.current_price}</p>
                    <p>price_change_24h : {cryptoDetails.price_change_24h}</p>
                    <p> market_cap : {cryptoDetails.market_cap}</p>
                    <a href={`/dashboard/cryptocurrency/${cryptoDetails.cryptoName.toLowerCase()}`} className="text-blue-500">View Details</a> 
                     
                </div>
            })
            }
       
        <input type="text" placeholder="Enter Coin" onChange={(e)=>{
            setSearchCrypto(e.target.value);
        }} />
        
        

        <button onClick={handleSearch}>Get Status</button>
        
    </div>
}