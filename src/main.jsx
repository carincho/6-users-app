import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { UsersApp } from './UsersApp'
import { LoginPages } from './auth/pages/LoginPages'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> esto se uso para el contexto de react ahora se va a usar redux*/}
      <UsersApp />
      {/* </AuthProvider> */}

    </BrowserRouter>

  </StrictMode>,
)
