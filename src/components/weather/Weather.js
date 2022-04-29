import React, { useState, useEffect, useCallback } from 'react'

import { request } from 'graphql-request'
import { GET_WEATHER_QUERY } from '../../graphql/Queries'
import { useDispatch, useSelector } from 'react-redux'
import './Weather.css'
import { addWeather } from '../../redux/weatherSlice'
import { GEOLOCATION_ENDPOINT, WEATHER_ENDPOINT } from '../../constant'

function Weather() {
  const [location, setLocation] = useState('')
  const { actual, feelsLike, speed } = useSelector(
    (state) => state.weather.value
  )
  const dispatch = useDispatch()

  async function fetchLocation() {
    return await fetch(`${GEOLOCATION_ENDPOINT}${process.env.API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data)
        return data
      })
  }

  const fetchWeather = useCallback(
    async function () {
      const loc = await fetchLocation()

      const data = await request(WEATHER_ENDPOINT, GET_WEATHER_QUERY, {
        name: loc.city,
      })
      const { temperature, wind } = data.getCityByName.weather

      dispatch(
        addWeather({
          actual: temperature.actual,
          feelsLike: temperature.feelsLike,
          speed: wind.speed,
        })
      )
    },
    [dispatch]
  )

  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  if (!location || !actual || !feelsLike || !speed) {
    return <div className="wrapper">...loading</div>
  }

  function refreshWeather() {
    setLocation(null)
    fetchWeather()
  }

  return (
    <div className="wrapper">
      <button onClick={() => refreshWeather()}>Refresh</button>
      <h1>
        Your location is <span>{location.city}</span>,{' '}
        <span>{location.state}</span>, in <span>{location.country_name}</span>
      </h1>

      <div className="weather">
        <>
          <h1>Temperature: {actual}</h1>
          <h1>Feels like: {feelsLike}</h1>
          <h1>Wind speed: {speed}</h1>
        </>
      </div>
    </div>
  )
}

export default Weather
