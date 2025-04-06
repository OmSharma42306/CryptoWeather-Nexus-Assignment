
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { updateLivePrice } from "@/redux/slices/cryptoSlice";

export default function CryptoWebsocket(){
    const dispatch = useDispatch();

    useEffect(()=>{
        const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

        ws.onmessage = (msg) =>{
            const data = JSON.parse(msg.data);
            console.log("live data",data);
            Object.entries(data).forEach(([id, price]) => {
                dispatch(updateLivePrice({ id, price: Number(price) }));
              });
        }

        console.log("i ran")

        return ()=>{
            ws.close();
        }

    },[])
    return null

    
}