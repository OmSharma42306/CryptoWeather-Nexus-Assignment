// "use client"
// import CryptoWebsocket from "@/components/CryptoWebsocket"
// import { Layout } from 'lucide-react';
// // adding coincap websocket layer for live price changes.
// import Weather from "./weather/page"
// import CryptoCurrency from "./cryptocurrency/page"
// import CryptoNews from "./cryptonews/page"
// import { updateLivePrice } from "@/redux/slices/cryptoSlice";
// import DisplayCoinCap from "@/components/DisplayCoinCap";
// export default function x(){
//     return <div>
//         hi
        
//         <CryptoWebsocket/>
//         <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Layout className="h-8 w-8 text-indigo-600" />
//               <h1 className="ml-3 text-2xl font-bold text-gray-900">Crypto & Weather Dashboard</h1>
//             </div>
//             <div className="text-sm text-gray-500">
//               Last updated: {new Date().toLocaleString()}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Weather Section */}
//           <section className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Updates</h2>
//               <Weather />
//             </div>
//           </section>

//           {/* Cryptocurrency Section */}
//           <section className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Cryptocurrency Tracker</h2>
//               <CryptoCurrency />
//             </div>
//           </section>

//           {/* News Section - Full Width */}
//           <section className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Crypto News</h2>
//               <CryptoNews />
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
        
//     </div>
// }


"use client"
import CryptoWebsocket from '@/CoinCap/CryptoWebsocket'; 
import { Layout } from 'lucide-react';
// adding coincap websocket layer for live price changes.
import Weather from "./weather/page"
import CryptoCurrency from "./cryptocurrency/page"
import CryptoNews from "./cryptonews/page"

import DisplayCoinCap from '@/CoinCap/DisplayCoinCap';
import { useEffect, useState } from 'react';

export default function x() {
  const [time,setTime] = useState("");
  useEffect(()=>{
    setTime(new Date().toLocaleString())
  },[])
  return (
    <div>
      

      <CryptoWebsocket />

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Layout className="h-8 w-8 text-indigo-600" />
                <h1 className="ml-3 text-2xl font-bold text-gray-900">Crypto & Weather Dashboard</h1>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {time}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weather Section */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Updates</h2>
                <Weather />
              </div>
            </section>

            {/* Tracked Assets Section */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracked Assets</h2>
                <CryptoCurrency />
              </div>
            </section>

            {/* Real-Time Prices from CoinCap */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Prices (CoinCap)</h2>
                <DisplayCoinCap />
              </div>
            </section>

            {/* News Section - Full Width */}
            <section className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Crypto News</h2>
                <CryptoNews />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
