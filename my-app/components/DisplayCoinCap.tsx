import React from 'react'
import { useSelector, UseSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'


export default function DisplayCoinCap(){
    const livePrices = useSelector((state:any)=>state.crypto.livePrices)
    
    return (
        <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Live Crypto Prices</h2>
        <ul className="space-y-2">
          {Object.entries(livePrices).map(([id, price]) => (
            <li key={id} className="flex justify-between border-b py-1">
              <span className="capitalize">{id}</span>
               {/* @ts-ignore */}
              <span>${price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    )
}