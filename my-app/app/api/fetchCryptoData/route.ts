import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cryptoName = searchParams.get('name');
console.log("king",cryptoName)
  if (!cryptoName) {
    return NextResponse.json({ error: 'Missing crypto name' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName}`
  );

  const data = await res.json();
  console.log("hannuman",data)
  const [{ current_price, price_change_24h, market_cap }] = data;
  return NextResponse.json({
    cryptoName,
    current_price,
    price_change_24h,
    market_cap,
  });
}

