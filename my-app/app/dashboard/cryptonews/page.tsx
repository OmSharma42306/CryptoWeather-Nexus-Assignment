"use client"
import { getCryptoRelatedHeadlines } from "@/app/lib/api"
import Link from "next/link";
import { useEffect, useState } from "react";
import CryptoWebsocket  from "@/components/CryptoWebsocket";
export default function CryptoNews(){
    const [loading,setLoading] = useState<Boolean>(true);
    const [newsData,setNewsData] = useState<{title:string,pubDate:string,link:string,description:string}[]>([]);

    useEffect(()=>{
        async function fetchCryptoNews(){
            const news = await getCryptoRelatedHeadlines();
            console.log("dddddddd",news)
            if(news){
                setLoading(false)
                setNewsData(news)
     
            }
        }
        
        fetchCryptoNews();
    },[])
    
    if(loading){
        return <div>
            <h1>Loading....</h1>
        </div>
    }

    return <div>
        <CryptoWebsocket/>
        {newsData.map((e:any)=>{
                    return <div>
                        <h1>{e.title}</h1>
                        <h1>{e.pubDate}</h1>
                        <Link href={e.link}>{e.link}</Link>
                        <h1>{e.description}</h1>
                
                    </div>
                    
                })}        
    </div>
}