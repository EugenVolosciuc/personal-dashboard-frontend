import React, { useContext } from 'react'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Loader } from 'components/ui'
import { fetcher } from 'config/axios'
import { useAuth } from 'utils/contexts/auth'
import getWeatherIcon from 'utils/functions/getWeatherIcon'
import { widgetPositionContext } from 'components/widgets/WidgetPositioner'

const WeatherDisplay = () => {
  const widgetPosition = useContext(widgetPositionContext)
  const { user } = useAuth()
  const { data, isValidating } = useSWR(`/weather`, fetcher)

  const icon = data && getWeatherIcon(data.current)

  console.log("data", data)

  const renderContent = () => {
    const { width, height } = widgetPosition

    if (isValidating) return <div className="w-full h-full flex justify-center items-center"><Loader size="2x" /></div>

    if (!data && !isValidating) return <p className="text-center">Could not load weather data at the moment</p>

    if (width === 1 && height === 1) return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center">
          <p className="text-center text-3xl font-bold">{Math.round(data.current.temp)}&#176;</p>
          {icon && <FontAwesomeIcon icon={icon} size="2x" className="inline-block mx-auto my-1" />}
          {user.location.city && <p className="text-center font-bold">{user.location.city}</p>}
        </div>
      </div>
    )

    return null
  }

  return renderContent()
}

export default WeatherDisplay
