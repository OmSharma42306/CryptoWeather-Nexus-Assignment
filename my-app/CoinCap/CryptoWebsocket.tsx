// my logic
// import { useEffect } from "react";
// import { useDispatch } from "react-redux"
// import { updateLivePrice } from "@/redux/slices/cryptoSlice";

// export default function CryptoWebsocket(){
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

//         ws.onmessage = (msg) =>{
//             const data = JSON.parse(msg.data);
//             console.log("live data",data);
//             Object.entries(data).forEach(([id, price]) => {
//                 dispatch(updateLivePrice({ id, price: Number(price) }));
//               });
//         }

//         console.log("i ran")

//         return ()=>{
//             ws.close();
//         }

//     },[])
//     return null

    
// }

// added some extra stuff..
"use client"
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateLivePrice } from '@/redux/slices/cryptoSlice';
import toast from 'react-hot-toast';

export default function CryptoWebsocket() {
  const dispatch = useDispatch();
  const prevPrices = useRef<Record<string, number>>({});

  useEffect(() => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      Object.entries(data).forEach(([id, price]) => {
        const numericPrice = Number(price);
        const prev = prevPrices.current[id];

        // Trigger toast on significant change (>= 5%)
        if (prev && Math.abs((numericPrice - prev) / prev) >= 0.05) {
          const direction = numericPrice > prev ? '📈 Up' : '📉 Down';
          toast(`${id.toUpperCase()} ${direction} to $${numericPrice.toFixed(2)}`, {
            icon: direction === '📈 Up' ? '🚀' : '⚠️',
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          });
        }

        prevPrices.current[id] = numericPrice;
        dispatch(updateLivePrice({ id, price: numericPrice }));
      });
    };

    console.log('📡 WebSocket connected');

    ws.onerror = (e) =>{
      console.log("Sockets Error!",e)
    }

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return null;
}
