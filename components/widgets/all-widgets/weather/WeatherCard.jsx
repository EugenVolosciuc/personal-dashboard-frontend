import React from 'react'

import { Card, Button } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'
import WeatherDisplay from 'components/widgets/all-widgets/weather/WeatherDisplay'
import LocationSetter from 'components/widgets/all-widgets/weather/LocationSetter'

const WeatherCard = () => {
  const { user } = useAuth()


  return (
    <Card title="Weather">
      {user?.location
        ? <WeatherDisplay />
        : <LocationSetter />
      }
    </Card>
  )
}

export default WeatherCard
