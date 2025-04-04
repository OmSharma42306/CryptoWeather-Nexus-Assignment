"use client"
import { useState } from "react";
import { fetchWeatherData} from "@/app/lib/api";
export default function c() {
  const [render,setRender] = useState<Boolean>(false);
  const [city,setCity] = useState<string>("");
  const [humidity,setHumidity] = useState<string>("");
  const [temperature,setTemperature] = useState<string>("");
  const [conditions,setConditions] = useState<string>("");
  const [conditionDescription,setConditionDescription] = useState<string>("");

  async function fx(city:string){
    const {humidity,temperature,conditions,conditionDescription}:any  = await fetchWeatherData(city);
    
  if(humidity&&temperature&&conditionDescription&&conditions){
    setHumidity(humidity);
    setRender(true);
    setTemperature(temperature)
    setConditions(conditions);
    setConditionDescription(conditionDescription)
    
    
  }
  }
   // todo add the state into redux store.
  
    
  return (
    <div>
      {
        render?"Successful data loaded.":"Loading...."
      }

      <h1>Humidity is : {humidity}</h1>
      <h1>Temperature is : {temperature}</h1>
      <h1>Conditions is : {conditions}-{conditionDescription}</h1>
      <input type="text" onChange={(e)=>{
        setCity(e.target.value);
      }}/>
      
      <button onClick={()=>{
        fx(city)
      }}>Fetch</button>

    </div>
  );
}



    
    