import 'config/axios'
import 'styles/tailwind.css'
import 'styles/globals.scss'
import 'styles/package-overrides.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DataProvider from 'utils/contexts/DataProvider'
import { SidebarProvider } from 'utils/contexts/sidebarContext'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </DataProvider>
  )
}

export default MyApp
