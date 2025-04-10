"use client"
import { fetchCryptoData } from "@/app/api/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import Link from "next/link";

interface cryptoDataType {
    current_price: string;
    price_change_24h: string;
    market_cap: string;
    cryptoName: string;
}

export default function CryptoCurrency() {
    const [loading, setLoading] = useState<Boolean>(true);
    const [cryptoData, setCryptoData] = useState<cryptoDataType[]>([]);
    
    const params = useParams();
    const cryptoName = params.cryptoname;

    useEffect(() => {
        async function getCryptoData(cryptoname: string) {
            if (cryptoName) {
                const { current_price, price_change_24h, market_cap, cryptoName } = await fetchCryptoData(cryptoname);
                setCryptoData([{ current_price, price_change_24h, market_cap, cryptoName }]);
                setLoading(false);
            }
        }
        getCryptoData(cryptoName as string);
    }, [cryptoName]);
    console.log(cryptoData)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Link href="/dashboard/cryptocurrency" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"/>
            </div>

            <Link
  href="/dashboard"
  className="inline-block mb-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
>
  ← Back to Dashboard
</Link>
            {cryptoData.map((crypto) => {
                const priceChange = parseFloat(crypto.price_change_24h);
                const isPositive = priceChange >= 0;

                return (
                    <div key={crypto.cryptoName} className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {crypto.cryptoName}
                                </h1>
                                <Activity className="w-8 h-8 text-blue-500" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Current Price Card */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-sm font-medium text-gray-500">Current Price</h2>
                                        <DollarSign className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${parseFloat(crypto.current_price).toLocaleString()}
                                    </p>
                                </div>

                                {/* 24h Change Card */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-sm font-medium text-gray-500">24h Change</h2>
                                        {isPositive ? (
                                            <TrendingUp className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>
                                    <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {priceChange.toFixed(2)}%
                                    </p>
                                </div>

                                {/* Market Cap Card */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-sm font-medium text-gray-500">Market Cap</h2>
                                        <DollarSign className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${parseFloat(crypto.market_cap).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Market Statistics
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Trading Volume</span>
                                    <span className="font-medium text-gray-900">Coming Soon</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">All-Time High</span>
                                    <span className="font-medium text-gray-900">Coming Soon</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Circulating Supply</span>
                                    <span className="font-medium text-gray-900">Coming Soon</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Total Supply</span>
                                    <span className="font-medium text-gray-900">Coming Soon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}