import MainLayout from 'components/layouts/MainLayout'
import SignUpForm from 'components/forms/SignUpForm'

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="mx-auto w-full h-full flex-1 md:w-4/6 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-4">
          <SignUpForm />
        </div>
        <div className="w-full md:w-1/2">
          <img className="w-full h-full" src="/assets/illustrations/girl_laptop_books.svg" style={{ transform: 'scaleX(-1)' }} alt="Girl working" />
        </div>
      </div>
    </MainLayout>
  )
}

export default RegisterPage
