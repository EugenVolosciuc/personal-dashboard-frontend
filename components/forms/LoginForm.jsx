import React from 'react'
import { useForm } from "react-hook-form"
import { isEmail } from 'validator'
import axios from 'axios'
import { useRouter } from 'next/router'

import styles from './styles/LoginForm.module.scss'
import { Input, Button } from 'components/ui'
import { useAuth } from 'utils/contexts/auth'
import useErrorHandler from 'utils/hooks/useErrorHandler'

const LoginForm = () => {
  const { register, handleSubmit, errors, setError } = useForm()
  const { setUser, userIsLoading, setUserIsLoading } = useAuth()
  const router = useRouter()
  const errorHandler = useErrorHandler()

  const onSubmit = async values => {
    const { email, password } = values

    try {
      setUserIsLoading(true)
      const { data } = await axios.post('/users/login', { email, password })
      setUserIsLoading(false)
      setUser(data)
      router.push('/dashboard')
    } catch (error) {
      errorHandler(error, setError)
      setUserIsLoading(false)
    }
  }

  return (
    <div className={styles['login-form']}>
      <h3 className="text-center font-bold text-4xl mb-4">Login</h3>
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
          <Button loading={userIsLoading} type="primary" htmlType="submit" fullWidth>Login</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
