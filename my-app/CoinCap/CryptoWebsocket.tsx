"use client"
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateLivePrice } from '@/redux/slices/cryptoSlice';
import toast from 'react-hot-toast';
const COINCAP_API_KEY = process.env.NEXT_PUBLIC_COINCAP_API_KEY;
export default function CryptoWebsocket() {
  const dispatch = useDispatch();
  const prevPrices = useRef<Record<string, number>>({});

  useEffect(() => {
    const ws = new WebSocket(`wss://wss.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin&apiKey=${COINCAP_API_KEY}`);
    ws.onmessage = (msg) => {
      console.log("SOCKET MSG DATA",msg.data);
      console.log("Message",msg)
      const data = JSON.parse(msg.data);
      console.log("socket-data",data);
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
