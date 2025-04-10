
"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { Toaster } from 'react-hot-toast';

export default function DisplayCoinCap() {
  const livePrices = useSelector((state: RootState) => state.crypto.livePrices);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        📊 Live Crypto Prices
      </h2>

      <ul className="divide-y divide-gray-200">
        {Object.entries(livePrices).map(([id, price]) => (
          <li key={id} className="flex justify-between items-center py-3">
            <span className="text-lg font-medium capitalize text-gray-700">{id}</span>
            <span className="text-lg font-semibold text-green-600">
              ${Number(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
