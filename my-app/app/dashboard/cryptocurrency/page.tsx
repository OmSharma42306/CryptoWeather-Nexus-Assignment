// "use client"
// import { fetchCryptoData } from "@/app/lib/api";
// import { useEffect, useState } from "react"


// const cryptos = ["bitcoin","ethereum","solana"];

// interface cryptoDataType{
//     current_price:string;
//     price_change_24h:string;
//     market_cap:string;
//     cryptoName : string;
//     }[]

// export default function CryptoCurrency(){
//     const [searchCrypto,setSearchCrypto] = useState<string>("");
//     const [searchResult,setSearchResult] = useState<any >([]);
//     const [cryptoData,setCryptoData] = useState<cryptoDataType[]>([]);
//     const [loading,setLoading] = useState<Boolean>(true);
    
    
    
//     useEffect(()=>{
        
//         async function getThreeCryptoData(){
//             const data:any = [];
//             const threeCryptoPromises = cryptos.map(async (crypto)=>{
//                 console.log("Crypto Names",crypto)
//                 const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCryptoData(crypto);
//                 return {current_price,price_change_24h,market_cap,cryptoName};
//             })

//             const results = await Promise.all(threeCryptoPromises);
//             results.forEach((cryptoData)=>{
//             //    data[cryptoData.cryptoName] = cryptoData;
//             console.log("rrrr",cryptoData)
//                 data.push(cryptoData)
//             })
//             console.log("RESULTS OF CRYPTO",data);
//             setCryptoData(data);
//             setLoading(false)
//         }
//         getThreeCryptoData();

//     },[])



//     async function handleSearch(){
//         if(searchCrypto){
//             const {current_price,price_change_24h,market_cap,cryptoName} = await fetchCryptoData(searchCrypto);
//             setSearchResult([{current_price,price_change_24h,market_cap,cryptoName}]);
//         }
        

//     }
//     if(loading){
//        <h1>
//         Loading..........
//        </h1> 
//     }
//     console.log("ffff",cryptoData)
//     console.log("seeeeeeeeeeeeeeeeee",searchResult)


//     return <div>
//         {/* Search Result */}
//          {searchResult.length>0 && (
//            <div className="mt-4 p-3 border">
//            <h2 className="font-bold">{searchResult[0].cryptoName}</h2>
//            <p>current_price: {searchResult[0].current_price}</p>
//            <p>Price Change 24h : {searchResult[0].price_change_24h}</p>
//             <p>MarketCap : {searchResult[0].market_cap}</p>
            
//            <a href={`/dashboard/weather/${searchResult[0].cryptoName.toLowerCase()}`} className="text-blue-500">View Details</a> 
//        </div>
//         )} 

//          {
//             cryptoData.map((cryptoDetails:any)=>{
                
//                 return <div key={cryptoDetails.cryptoName} >
//                     <h1>Crypto Name : {cryptoDetails.cryptoName}</h1>
//                     <p>Crypto Current Price : {cryptoDetails.current_price}</p>
//                     <p>price_change_24h : {cryptoDetails.price_change_24h}</p>
//                     <p> market_cap : {cryptoDetails.market_cap}</p>
//                     <a href={`/dashboard/cryptocurrency/${cryptoDetails.cryptoName.toLowerCase()}`} className="text-blue-500">View Details</a> 
                     
//                 </div>
//             })
//             }
       
//         <input type="text" placeholder="Enter Coin" onChange={(e)=>{
//             setSearchCrypto(e.target.value);
//         }} />
        
        

//         <button onClick={handleSearch}>Get Status</button>
        
//     </div>
// }


"use client"
import { fetchCryptoData } from "@/app/lib/api";
import { useEffect, useState } from "react"

const cryptos = ["bitcoin", "ethereum", "solana"];

interface cryptoDataType {
    current_price: string;
    price_change_24h: string;
    market_cap: string;
    cryptoName: string;
}[]

export default function CryptoCurrency() {
    const [searchCrypto, setSearchCrypto] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>([]);
    const [cryptoData, setCryptoData] = useState<cryptoDataType[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        async function getThreeCryptoData() {
            const data: any = [];
            const threeCryptoPromises = cryptos.map(async (crypto) => {
                const { current_price, price_change_24h, market_cap, cryptoName } = await fetchCryptoData(crypto);
                return { current_price, price_change_24h, market_cap, cryptoName };
            })

            const results = await Promise.all(threeCryptoPromises);
            results.forEach((cryptoData) => {
                data.push(cryptoData)
            })
            setCryptoData(data);
            setLoading(false)
        }
        getThreeCryptoData();
    }, [])

    async function handleSearch() {
        if (searchCrypto) {
            const { current_price, price_change_24h, market_cap, cryptoName } = await fetchCryptoData(searchCrypto);
            setSearchResult([{ current_price, price_change_24h, market_cap, cryptoName }]);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-2xl font-semibold text-gray-600">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Cryptocurrency Dashboard</h1>

                {/* Search Section */}
                <div className="mb-8">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter cryptocurrency name..."
                            onChange={(e) => setSearchCrypto(e.target.value)}
                            className="flex-1 rounded-lg border-gray-300 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Search Result */}
                {searchResult.length > 0 && (
                    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 capitalize">{searchResult[0].cryptoName}</h2>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                Search Result
                            </span>
                        </div>
                        <div className="space-y-3">
                            <p className="text-gray-700">Current Price: <span className="font-medium">${parseFloat(searchResult[0].current_price).toLocaleString()}</span></p>
                            <p className="text-gray-700">24h Change: <span className={`font-medium ${parseFloat(searchResult[0].price_change_24h) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {parseFloat(searchResult[0].price_change_24h).toFixed(2)}%
                            </span></p>
                            <p className="text-gray-700">Market Cap: <span className="font-medium">${parseFloat(searchResult[0].market_cap).toLocaleString()}</span></p>
                        </div>
                        <a
                            href={`/dashboard/cryptocurrency/${searchResult[0].cryptoName.toLowerCase()}`}
                            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                        >
                            View Details
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* Crypto Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cryptoData.map((cryptoDetails: any) => (
                        <div key={cryptoDetails.cryptoName} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 capitalize">{cryptoDetails.cryptoName}</h2>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    parseFloat(cryptoDetails.price_change_24h) >= 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                    {parseFloat(cryptoDetails.price_change_24h).toFixed(2)}%
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-700">Current Price: <span className="font-medium">${parseFloat(cryptoDetails.current_price).toLocaleString()}</span></p>
                                <p className="text-gray-700">Market Cap: <span className="font-medium">${parseFloat(cryptoDetails.market_cap).toLocaleString()}</span></p>
                            </div>
                            <a
                                href={`/dashboard/cryptocurrency/${cryptoDetails.cryptoName.toLowerCase()}`}
                                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                            >
                                View Details
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}