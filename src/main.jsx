import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { router } from './Routes/Routes'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster />
  </HelmetProvider>
)
