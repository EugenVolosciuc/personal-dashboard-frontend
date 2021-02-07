import Link from 'next/link'

import MainLayout from 'components/layouts/MainLayout'
import HomepageHeroArea from 'components/sections/HomepageHeroArea'
import SectionTitle from 'components/sections/SectionTitle'

const Home = () => {
  return (
    <MainLayout>
      <HomepageHeroArea />
      <section className="py-8 md:py-16 flex flex-col md:flex-row items-center justify-center flex-wrap bg-white">
        <SectionTitle
          title={`"So much stuff, so little time"`}
          subtitle={<>This is where <span className="text-accent">planster</span> comes in</>}
        />
        <div className="text-container flex flex-col md:flex-row px-4 mb-8">
          <div className="flex-1 flex flex-col justify-center items-center pr-0 md:pr-4 mb-6 md:mb-0">
            <h5 className="font-bold text-xl mb-4 w-full text-left">Be the master of the widgets</h5>
            <p className="mb-2">Arrange and resize the widgets in your dashboard any way you want. With an easy-to-use drag and drop feature, you can create your own productivity dashboard in seconds.</p>
            <p>Choose between any of the curated widgets, from a simple note taker to an expense manager, or even add your own widgets to the platform.</p>
          </div>
          <div className="flex-1 flex items-center justify-center pl-0 md:pl-4">
            <img style={{ maxWidth: 600 }} src="/assets/illustrations/desktop-workspace-by-oblik-studio.svg" alt="Desktop" />
          </div>
        </div>
        <div className="text-container flex flex-col-reverse md:flex-row px-4 mb-8">
          <div className="flex-1 flex items-center justify-center pr-0 md:pr-4">
            <img className="px-8 md:py-8" style={{ maxWidth: 600 }} src="/assets/illustrations/idea-sheets-of-paper-pencil-coffee-by-oblik-studio.svg" alt="Paper" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center pl-0 md:pl-4 mb-6 md:mb-0">
            <h5 className="font-bold text-xl mb-4 w-full text-left">Bring all your work in one place</h5>
            <p className="mb-2">Be it for your professional needs or just to check on flights for your next vacation, planster has you covered.</p>
          </div>
        </div>
        <section>
          <SectionTitle title="Disclaimer" />
          <p className="text-center mt-8">Not all features above are functional at the moment of writing, this project being a <span className="underline">work in progress</span>. You can see the current state of the project by <Link href="/auth/register"><a>signing up</a></Link> and <Link href="/auth/login"><a>logging in</a></Link>.</p>
        </section>
      </section>
    </MainLayout>
  )
}

export default Home