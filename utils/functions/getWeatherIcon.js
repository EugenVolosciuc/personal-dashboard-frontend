import { faSun, faBolt, faCloudRain, faSnowflake, faWind, faCloudSunRain, faCloudMoonRain, faCloudMoon, faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const getWeatherIcon = weather => {
  const isDaytime = weather.dt >= weather.sunrise && weather.dt < weather.sunset

  switch (weather.weather[0].main) {
    case 'Thunderstorm':
      return faBolt
    case 'Drizzle':
      return faCloudRain
    case 'Rain':
      if (weather.weather[0].description === 'freezing rain') return faSnowflake
      if (isDaytime) return faCloudSunRain

      return faCloudMoonRain
    case 'Snow':
      return faSnowflake
    case 'Clear':
      if (isDaytime) return faSun

      return faMoon
    case 'Clouds':
      if (isDaytime) return faCloudSun

      return faCloudMoon
    default:
      return faWind
  }
}

export default getWeatherIcon