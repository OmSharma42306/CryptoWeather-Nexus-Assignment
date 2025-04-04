"use client"
import { fetchWeatherData ,fetchCoinData} from "./lib/api";
export default function Home() {

  return (
    <div>
      <button onClick={fetchWeatherData}>Fetch</button>
      <button onClick={fetchCoinData}>Coin</button>
    </div>
  );
}
