import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../../graphql/Queries'
import { useDispatch, useSelector } from 'react-redux'
import './Weather.css'
import { addWeather } from '../../redux/weatherSlice'

function Weather() {
  const [location, setLocation] = useState('')
  const { data, loading } = useQuery(GET_WEATHER_QUERY, {
    variables: { name: location.city || 'Toronto' },
  })

  const { actual, feelsLike, speed } = useSelector(
    (state) => state.weather.value
  )
  const dispatch = useDispatch()

  useEffect(() => {
    fetchLocation()
  }, [])

  useEffect(() => {
    if (data) {
      dispatch(
        addWeather({
          actual: data.getCityByName.weather.temperature.actual,
          feelsLike: data.getCityByName.weather.temperature.feelsLike,
          speed: data.getCityByName.weather.wind.speed,
        })
      )
    }
  }, [data, dispatch])

  async function fetchLocation() {
    await fetch(`https://geolocation-db.com/json/${process.env.API_KEY}`)
      .then((res) => res.json())
      .then((data) => setLocation(data))
  }

  if (!location || loading) {
    return <div className="wrapper">...loading</div>
  }

  return (
    <div className="wrapper">
      <button onClick={fetchLocation}>Refresh</button>
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
