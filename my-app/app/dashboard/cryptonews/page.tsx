"use client"
import { getCryptoRelatedHeadlines } from "@/app/api/api"
import Link from "next/link";
import { useEffect, useState } from "react";


export default function CryptoNews() {
    const [loading, setLoading] = useState<Boolean>(true);
    const [newsData, setNewsData] = useState<{ title: string, pubDate: string, link: string, description: string }[]>([]);

    useEffect(() => {
        async function fetchCryptoNews() {
            const news = await getCryptoRelatedHeadlines();
            if (news) {
                setLoading(false)
                setNewsData(news)
            }
        }

        fetchCryptoNews();
    }, [])

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
            <Link
  href="/dashboard"
  className="inline-block mb-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
>
  ← Back to Dashboard
</Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Crypto News</h1>
                

                <div className="space-y-6">
                    {newsData.map((news, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {news.title}
                            </h2>
                            <p className="text-sm text-gray-500 mb-3">
                                {new Date(news.pubDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {news.description}
                            </p>
                            <Link 
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                                Read more
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}