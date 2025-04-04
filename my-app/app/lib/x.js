data={
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 16.29,
        "feels_like": 15.54,
        "temp_min": 16.29,
        "temp_max": 16.29,
        "pressure": 1019,
        "humidity": 60,
        "sea_level": 1019,
        "grnd_level": 1015
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.64,
        "deg": 72,
        "gust": 8.65
    },
    "clouds": {
        "all": 97
    },
    "dt": 1743762497,
    "sys": {
        "country": "GB",
        "sunrise": 1743744522,
        "sunset": 1743791871
    },
    "timezone": 3600,
    "id": 2643743,
    "name": "London",
    "cod": 200
}

//console.log(data.main);
data.weather.map(e=>{
    console.log(e.main)
})