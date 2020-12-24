import React from 'react'
import { useForm } from "react-hook-form"
import { isEmail } from 'validator'
import axios from 'axios'
import { useRouter } from 'next/router'

import styles from './styles/LoginForm.module.scss'
import { Input, Button } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'

const LoginForm = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const { user, setUser, userIsLoading, setUserIsLoading } = useAuth()
  const router = useRouter()

  const onSubmit = async values => {
    const { email, password } = values

    try {
      setUserIsLoading(true)
      const { data } = await axios.post('/users/login', { email, password })
      setUserIsLoading(false)
      setUser(data)
      router.push('/dashboard')
    } catch (error) {
      console.log("ERROR LOGGING IN", error)
      setUserIsLoading(false)
    }
  }

  return (
    <div className={styles['login-form']}>
      <h3 className="text-center font-bold text-2xl mb-4">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="text"
          formRef={register({
            validate: {
              isValidEmail: value => isEmail(value) || 'Provide a valid email'
            }
          })}
          label="Email"
          error={errors.email} />
        <Input
          name="password"
          type="password"
          formRef={register}
          label="Password"
          error={errors.password} />
        <div className="mt-6">
          <Button type="primary" htmlType="submit" fullWidth>Login</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
