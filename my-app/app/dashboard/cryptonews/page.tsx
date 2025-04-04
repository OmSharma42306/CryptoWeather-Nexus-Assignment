"use client"
import { getCryptoRelatedHeadlines } from "@/app/lib/api"
import Link from "next/link";
import { useState } from "react"
export default function CryptoNews(){
    // const [title,setTitle] = useState<string>("");
    // const [link,setLink] = useState<string>("");
    // const [description,setDescription] = useState<string>("");
    // const [pubDate,setPubDate] = useState<string>("");
    const [loading,setLoading] = useState<Boolean>(true);
    const [newsData,setNewsData] = useState([]);



    async function fetchCryptoNews(){
        const news = await getCryptoRelatedHeadlines();
        console.log("dddddddd",news)
        if(news){
            setLoading(false)
            setNewsData(news)
 
        }
    }

    if(loading){
        return <div>
            <h1>Loading....</h1>
            <button onClick={fetchCryptoNews}>click me!</button>
        </div>
    }

    return <div>
        
        {newsData.map((e:any)=>{
                    return <div>
                        <h1>{e.title}</h1>
                        <h1>{e.pubDate}</h1>
                        <h1>{e.link}</h1>
                        <h1>{e.description}</h1>
                
                    </div>
                    
                })}

        <button onClick={fetchCryptoNews}>click me!</button>
    </div>
}