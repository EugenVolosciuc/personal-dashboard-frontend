import 'config/axios'
import 'styles/tailwind.css'
import 'styles/globals.scss'
import 'styles/package-overrides.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DataProvider from 'utils/contexts/DataProvider'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp
