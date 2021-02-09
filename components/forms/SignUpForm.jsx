import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { isEmail } from 'validator'
import axios from 'axios'
import { useRouter } from 'next/router'

import styles from './styles/SignUpForm.module.scss'
import { Input, Button } from 'components/ui'
import { useAlert } from 'react-alert'

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, watch, errors } = useForm()
  const router = useRouter()
  const alert = useAlert()

  const signUp = async values => {
    const { username, email, password } = values
    try {
      setIsLoading(true)
      await axios.post('/users', { username, email, password })
      alert.success('User created succesfully, you can now log in.')
      setIsLoading(false)
      router.push('/auth/login')
    } catch (error) {
      setIsLoading(false)
      console.log("ERROR creating user", error)
    }
  }

  return (
    <div className={styles['sign-up-form']}>
      <h3 className="text-center font-bold text-4xl mb-4">Register</h3>
      <form onSubmit={handleSubmit(signUp)}>
        <Input
          name="username"
          type="text"
          formRef={register({ required: { value: true, message: 'Username is required' } })}
          label="Username"
          error={errors.username} />
        <Input
          name="email"
          type="text"
          formRef={register({
            required: { value: true, message: 'Email is required' },
            validate: {
              isValidEmail: value => isEmail(value) || 'Provide a valid email'
            }
          })}
          label="Email"
          error={errors.email} />
        <Input
          name="password"
          type="password"
          formRef={register({ required: { value: true, message: 'Password is required' } })}
          label="Password"
          error={errors.password} />
        <Input
          name="confirmPassword"
          type="password"
          formRef={register({
            required: { value: true, message: 'Please confirm your password' },
            validate: {
              passwordsMatch: value => value === watch('password') || 'The passwords do not match'
            }
          })}
          label="Confirm password"
          error={errors.confirmPassword} />
        <div className="mt-6">
          <Button loading={isLoading} type="primary" htmlType="submit" fullWidth>Sign Up</Button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
