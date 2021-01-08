import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { Card } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'
import WeatherDisplay from 'components/widgets/all-widgets/weather/WeatherDisplay'
import LocationSetter from 'components/widgets/all-widgets/weather/LocationSetter'
import useErrorHandler from 'utils/hooks/useErrorHandler'
import Dropdown from 'components/ui/Dropdown'

const WeatherCard = () => {
  const [isChangingLocation, setIsChangingLocation] = useState(false)
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

  const optionItems = [
    {
      title: `Switch to ${String.fromCharCode(176)}${user.units === 'metric' ? 'F' : 'C'}`,
      onClick: toggleUnits
    },
    {
      title: isChangingLocation ? 'Close location changer' : 'Change location',
      onClick: () => setIsChangingLocation(!isChangingLocation)
    }
  ]

  return (
    <Card
      title="Weather"
      extra={user?.location && (
        <Dropdown
          toggler={<FontAwesomeIcon icon={faEllipsisV} className="icon-hover icon-hover-primary" />}
          items={optionItems}
        />
      )}>
      {(!user?.location || isChangingLocation)
        && <LocationSetter isChangingLocation={isChangingLocation} setIsChangingLocation={setIsChangingLocation} />
      }
      {user?.location && <WeatherDisplay />}
    </Card>
  )
}

export default WeatherCard
