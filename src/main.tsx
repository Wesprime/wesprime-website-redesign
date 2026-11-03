import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './features.css'
import './home.css'
import './blog.css'
import './service.css'
import './outcomes.css'
import './outcome-video.css'
import './service-page.css'
import './careers.css'
import './clients.css'
import './backgrounds.css'
import App from './App.tsx'
import { LangProvider } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
