import React, { useContext } from 'react'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import get from 'lodash/get'

import { Loader, Tabs } from 'components/ui'
import { fetcher } from 'config/axios'
import { useAuth } from 'utils/contexts/auth'
import getWeatherIcon from 'utils/functions/getWeatherIcon'
import { widgetPositionContext } from 'components/widgets/WidgetPositioner'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const SingleWeatherData = ({ leftSide, rightSide }) => {
  return (
    <div className="flex justify-between items-center border-b border-secondary py-2">
      {leftSide}
      {rightSide}
    </div>
  )
}

const DayTabContent = ({ weatherData }) => {
  return (
    <div>
      {weatherData.map(hour => (
        <SingleWeatherData
          key={hour.dt + '-weather-data'}
          leftSide={<p>{dayjs.unix(hour.dt).format('h a')}</p>}
          rightSide={
            <div className="flex items-center">
              <FontAwesomeIcon icon={getWeatherIcon(hour)} size="lg" />
              <p className="text-2xl font-bold ml-2">{Math.round(hour.temp)}&#176;</p>
            </div>
          }
        />
      ))}
    </div>
  )
}

const NextDaysTabContent = ({ weatherData }) => {
  return (
    <div>
      {weatherData.map(day => (
        <SingleWeatherData
          key={day.dt + '-weather-data'}
          leftSide={<p>{dayjs.unix(day.dt).format('dddd')}</p>}
          rightSide={
            <div className="flex items-center">
              <FontAwesomeIcon icon={getWeatherIcon(day)} size="lg" />
              <p className="text-2xl font-bold ml-2">{Math.round(day.temp.day)}&#176;</p>
            </div>
          }
        />
      ))}
    </div>
  )
}

const WeatherDisplay = () => {
  const widgetPosition = useContext(widgetPositionContext)
  const { user } = useAuth()
  const errorHandler = useErrorHandler()
  const { data, isValidating } = useSWR([`/weather`, user.units, user.location.city], url => fetcher(url, {}, errorHandler))

  const renderContent = () => {
    const { width, height } = widgetPosition

    if (isValidating) return <div className="w-full h-full flex justify-center items-center"><Loader size="2x" /></div>

    if (!data && !isValidating) return <p className="text-center">Could not load weather data at the moment</p>

    const isOneByOne = width === 1 && height === 1
    const heightIsMoreThanOne = height > 1
    const widthIsMoreThanOne = width > 1

    const hourlyData = get(data, 'hourly', [])
    const dailyData = get(data, 'daily', [])

    const tabItems = [
      {
        title: 'Today',
        content: <DayTabContent weatherData={hourlyData.filter(hour => dayjs.unix(hour.dt).isBefore(dayjs().set('hour', 23).set('minute', 30)))} />
      },
      {
        title: 'Tomorrow',
        content: <DayTabContent weatherData={hourlyData.filter(hour => {
          return dayjs.unix(hour.dt).isAfter(dayjs().set('hour', 23).set('minute', 30)) && dayjs.unix(hour.dt).isBefore(dayjs().add(1, 'day').set('hour', 23).set('minute', 30))
        })} />
      },
      {
        title: 'Next 7 Days',
        content: <NextDaysTabContent weatherData={dailyData.filter(day => dayjs.unix(day.dt).isAfter(dayjs()))} />
      }
    ]

    return (
      <>
        {/* <div className="flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <FontAwesomeIcon icon={getWeatherIcon(data.current)} size="2x" />
            <p className="text-center text-4xl font-bold ml-2">{Math.round(data.current.temp)}&#176;</p>
          </div>
          <div className={`w-full flex ${isOneByOne ? '' : 'justify-between'} ${isOneByOne ? 'flex-col' : 'flex-row-reverse'}`}>
            <p className="text-center">Feels like {Math.round(data.current.feels_like)}&#176;</p>
            {user.location.city && <p className="text-center font-bold capitalize">{user.location.city}</p>}
          </div>
        </div> */}
        <div className={`flex flex-col justify-between ${heightIsMoreThanOne ? '' : 'h-full'}`}>
          <div className={`flex ${isOneByOne ? 'justify-center' : 'justify-between'}`}>
            <div className={`items-center ${widthIsMoreThanOne ? 'flex' : 'hidden'}`}>
              <FontAwesomeIcon icon={getWeatherIcon(data.current)} size="2x" />
            </div>
            <div className={`flex ${isOneByOne ? 'flex-col items-center' : ''}`}>
              <div className={`${user.location.city && widthIsMoreThanOne ? 'border-gray-300 border-r pr-2' : ''}`}>
                <p className="text-center text-4xl font-bold ml-2">{Math.round(data.current.temp)}&#176;</p>
                <p className="text-center text-sm">Feels like {Math.round(data.current.feels_like)}&#176;</p>
              </div>
              {user.location.city &&
                <div className={`${isOneByOne ? '' : 'pl-2'} flex items-center`}>
                  <p className="text-left font-bold capitalize">{user.location.city}</p>
                </div>
              }
            </div>
          </div>
          {widthIsMoreThanOne &&
            <div className={`flex justify-between text-center text-gray-400 ${heightIsMoreThanOne ? 'mt-4' : ''}`}>
              <span className="text-sm">Humidity {data.current.humidity}%</span>
              <span className="text-sm">Cloudiness {data.current.clouds}%</span>
              <span className="text-sm">{data.current.wind_speed} {user.units === 'metric' ? 'm/s' : 'm/h'}</span>
            </div>
          }
        </div>
        {widthIsMoreThanOne && heightIsMoreThanOne && <div className="mt-2"><Tabs items={tabItems} align="center" /></div>}
      </>
    )
  }

  return renderContent()
}

export default WeatherDisplay
