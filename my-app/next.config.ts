import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL,
    WEATHER_API_KEY : process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    NEWS_API_KEY:process.env.NEXT_PUBLIC_NEWS_API_KEY
  }
};

export default nextConfig;
