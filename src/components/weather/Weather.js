import React, { useEffect,useState,useCallback } from 'react';
import './Weather.css'


const API_URL=`https://api.openweathermap.org/data/2.5`;
const API_KEY=`9c4880ecae80b36c98c2290404578b83`;



export default function Weather(){
const[lat,setLat]=useState();
const[long,setLong]=useState();
const[data,setData]=useState();


 const memoizedFetchWeather=useCallback (()=>{async function fetchWeather(){
navigator.geolocation.getCurrentPosition(function(pos){
setLat(pos.coords.latitude);
setLong(pos.coords.longitude);
console.log('latitude',lat);
console.log('long',long);
}
)
if(lat && long){
await fetch(`${API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(result=>{setData(result);console.log("this is the result",result)});
}
};
fetchWeather();
},[lat,long])

useEffect(()=>{
memoizedFetchWeather();
}
,[lat,long,memoizedFetchWeather])

if(!data){
return(<div className='forecast'>...loading</div>)
}


return (
<div className='forecast'>
<button  onClick={memoizedFetchWeather}>Refresh</button>
<p>city: {data.name}</p>
<p>feels like: {data.main.feels_like}</p>
<p>humidity: {data.main.humidity}</p>
<p>pressure: {data.main.pressure}</p>
<p>temp: {data.main.temp}</p>
<p>temp max: {data.main.temp_max}</p>
<p>temp_min: {data.main.temp_min}</p>
</div>)

}