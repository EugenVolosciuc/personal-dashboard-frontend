import MainLayout from 'components/layouts/MainLayout'
import LoginForm from 'components/forms/LoginForm'

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="mx-auto my-auto w-full h-full flex-1 md:w-4/6 flex flex-col md:flex-row items-center justify-center px-4 md:px-0">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-4">
          <LoginForm />
        </div>
        <div className="w-full md:w-1/2">
          <img className="w-full h-full p-4 md:p-8" src="/assets/illustrations/girl_laptop_books.svg" style={{ transform: 'scaleX(-1)' }} alt="Girl working" />
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginPage
