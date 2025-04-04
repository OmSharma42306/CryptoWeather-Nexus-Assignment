"use client"
import { getCryptoRelatedHeadlines } from "@/app/lib/api"
import Link from "next/link";
import { useState } from "react"
export default function CryptoNews(){
    const [title,setTitle] = useState<string>("");
    const [link,setLink] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [pubDate,setPubDate] = useState<string>("");
    const [loading,setLoading] = useState<Boolean>(true);


    async function fetchCryptoNews(){
        const news = await getCryptoRelatedHeadlines();
        console.log("NEWS",news)
        if(news.title){
            setLoading(false);
            setTitle(news.title);
            setDescription(news.description);
            setPubDate(news.pubDate)
            setLink(news.link)

        }
    }

    if(loading){
        return <div>
            <h1>Loading....</h1>
            <button onClick={fetchCryptoNews}>click me!</button>
        </div>
    }

    return <div>
        <h1>Title : {title}</h1>
        <Link href={link}>Link : {link}</Link>
        <h1>Description : {description}</h1>
        <h1>Published Date : {pubDate}</h1>
        <h1></h1>


        <button onClick={fetchCryptoNews}>click me!</button>
    </div>
}