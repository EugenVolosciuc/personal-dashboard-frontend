import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import DataProvider from 'utils/contexts/DataProvider'
import { SidebarProvider } from 'utils/contexts/sidebarContext'
import AlertTemplate from 'components/misc/AlertTemplate'
import 'config/axios'
import 'styles/tailwind.css'
import 'styles/globals.scss'
import 'styles/package-overrides.scss'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '20px',
  transition: transitions.FADE
}

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <DataProvider>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </DataProvider>
    </AlertProvider>
  )
}

export default MyApp
