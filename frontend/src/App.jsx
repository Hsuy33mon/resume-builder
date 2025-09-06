import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import EditResume from './components/EditResume'
import UserProvider from './context/UserContext'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/resume/:resumeId' element={<EditResume/>}/>
      </Routes>

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize : "13px"
        }
      } }>

      </Toaster>
    </UserProvider>
  )
}

export default App