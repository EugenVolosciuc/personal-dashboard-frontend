import MainLayout from 'components/layouts/MainLayout'
import SignUpForm from 'components/forms/SignUpForm'

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="mx-auto w-full h-full flex-1 md:w-4/6 flex flex-col md:flex-row items-center justify-center pt-4 md:pt-0">
        <div className="w-full px-4 lg:w-1/2 lg:pr-2 mb-4 lg:mb-4">
          <SignUpForm />
        </div>
        <div className="hidden lg:block w-1/2">
          <img className="w-full h-full p-4 md:p-8" src="/assets/illustrations/girl_laptop_books.svg" style={{ transform: 'scaleX(-1)' }} alt="Girl working" />
        </div>
      </div>
    </MainLayout>
  )
}

export default RegisterPage
