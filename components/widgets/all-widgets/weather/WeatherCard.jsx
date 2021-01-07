import React from 'react'
import axios from 'axios'

import { Card } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'
import WeatherDisplay from 'components/widgets/all-widgets/weather/WeatherDisplay'
import LocationSetter from 'components/widgets/all-widgets/weather/LocationSetter'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const WeatherCard = () => {
  const { user, setUser } = useAuth()
  const errorHandler = useErrorHandler()

  const toggleUnits = async () => {
    try {
      const { data } = await axios.patch(`/users/${user._id}`, { units: user.units === 'metric' ? 'imperial' : 'metric' })
      setUser(data)
    } catch (error) {
      errorHandler(error)
    }
  }

  const unitToggler = (
    <p className="text-sm">
      <span
        onClick={toggleUnits}
        className={`cursor-pointer ${user.units === 'metric' ? 'font-bold' : ''}`}>
        &#176;C
      </span>
      <span> | </span>
      <span
        onClick={toggleUnits}
        className={`cursor-pointer ${user.units === 'imperial' ? 'font-bold' : ''}`}>
        &#176;F
      </span>
    </p>
  )

  return (
    <Card title="Weather" extra={ user?.location && unitToggler }>
      {user?.location
        ? <WeatherDisplay />
        : <LocationSetter />
      }
    </Card>
  )
}

export default WeatherCard
