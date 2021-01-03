import React from 'react'
import axios from 'axios'

import { Button } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'

const LocationSetter = () => {
  const { user, setUser } = useAuth()

  const canGeolocate = !!navigator.geolocation

  const getGeolocationAutomatically = () => {
    const success = async position => {
      const { data } = await axios.patch(
        `/users/${user._id}`,
        {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }
      )

      setUser(data)
    }

    const failure = () => console.log("Can't get location, should show error message")

    navigator.geolocation.getCurrentPosition(success, failure)
  }

  return (
    <div>
      {canGeolocate &&
        <>
          <p className="text-center my-2">or</p>
          <div className="w-full flex justify-center">
            <Button
              size="sm"
              type="primary"
              onClick={getGeolocationAutomatically}>
              Get location
          </Button>
          </div>
        </>
      }
    </div>
  )
}

export default LocationSetter
