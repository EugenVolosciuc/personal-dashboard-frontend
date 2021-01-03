import React from 'react'
import useSWR from 'swr'

import { fetcher } from 'config/axios'

const WeatherDisplay = () => {
  const { data, isValidating } = useSWR(`/weather`, fetcher)

  console.log("DATA", data)

  return (
    <div>
      
    </div>
  )
}

export default WeatherDisplay
