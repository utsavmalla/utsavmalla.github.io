import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddProject from './pages/AddProject'
import Login from './components/Login/Login'
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/add-project" 
          element={
            <AuthenticatedRoute>
              <AddProject />
            </AuthenticatedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
