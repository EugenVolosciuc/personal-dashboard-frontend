import React, { useContext } from 'react'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import { Loader } from 'components/ui'
import { fetcher } from 'config/axios'
import { useAuth } from 'utils/contexts/auth'
import getWeatherIcon from 'utils/functions/getWeatherIcon'
import { widgetPositionContext } from 'components/widgets/WidgetPositioner'

const WeatherDisplay = () => {
  const widgetPosition = useContext(widgetPositionContext)
  const { user, setUser } = useAuth()
  const { data, isValidating } = useSWR([`/weather`, user.units], fetcher)

  const icon = data && getWeatherIcon(data.current)

  const toggleUnits = async () => {
    try {
      const { data } = await axios.patch(`/users/${user._id}`, { units: user.units === 'metric' ? 'imperial' : 'metric' })
      setUser(data)
    } catch (error) {
      console.log("ERROR CHANGING UNITS", error)
    }
  }

  const renderContent = () => {
    const { width, height } = widgetPosition

    if (isValidating) return <div className="w-full h-full flex justify-center items-center"><Loader size="2x" /></div>

    if (!data && !isValidating) return <p className="text-center">Could not load weather data at the moment</p>

    // 1x1
    if (width === 1 && height === 1) return (
      <div className="h-full flex items-center justify-center relative">
        <div className="absolute right-0 top-0">
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
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center text-3xl font-bold ml-2">{Math.round(data.current.temp)}&#176;</p>
          {icon && <FontAwesomeIcon icon={icon} size="2x" className="inline-block mx-auto my-1" />}
          {user.location.city && <p className="text-center font-bold">{user.location.city}</p>}
        </div>
      </div>
    )

    // 2x1
    if (width === 2 && height === 1) return (
      <div className="flex">
        <div className="flex flex-col">
          {icon && <FontAwesomeIcon icon={icon} size="2x" className="inline-block mx-auto my-1" />}
          {}
        </div>
        <div></div>
      </div>
    )

    return null
  }

  return renderContent()
}

export default WeatherDisplay
