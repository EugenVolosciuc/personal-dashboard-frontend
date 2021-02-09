import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"

import { Button, Input, SingleFormInput } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const LocationSetter = ({ isChangingLocation, setIsChangingLocation }) => {
  const [loadingLocation, setLoadingLocation] = useState(false)
  const { user, setUser } = useAuth()
  const { register, handleSubmit, watch, errors } = useForm()
  const errorHandler = useErrorHandler()

  const canGeolocate = !!navigator.geolocation

  const updateUserLocation = async coordinates => {
    try {
      const { data } = await axios.patch(
        `/users/${user._id}`,
        {
          location: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            ...(coordinates.city && { city: coordinates.city })
          }
        }
      )

      if (isChangingLocation) setIsChangingLocation(!isChangingLocation)

      setUser(data)
    } catch (error) {
      errorHandler(error)
    }
  }

  const getGeolocationAutomatically = async () => {
    const success = async position => await updateUserLocation(position)
    const failure = () => console.log("Can't get location, should show error message")

    navigator.geolocation.getCurrentPosition(
      position => success({ 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }),
      failure
    )
  }

  const getCoordinates = async values => {
    try {
      const { data } = await axios.get('/weather/coordinates', { params: values })

      return data
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleFormSubmit = async values => {
    try {
      const coordinatesData = await getCoordinates(values)
      await updateUserLocation({ latitude: coordinatesData[0].lat, longitude: coordinatesData[0].lon, city: values.search })
    } catch (error) {
      console.error("ERROR!!!", error)
    }
  }

  return (
    <div>
      {canGeolocate &&
        <>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex justify-between items-center">
            <SingleFormInput btnHtmlType="submit" placeholder="City" btnContent="Submit" />
            {/* <Input
              size="sm"
              name="search"
              type="text"
              formRef={register({ required: { value: true, message: 'Location is required' } })}
              placeholder="City"
              error={errors.search} />
            <Button type="primary" htmlType="submit" size="sm">Submit</Button> */}
          </form>
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
