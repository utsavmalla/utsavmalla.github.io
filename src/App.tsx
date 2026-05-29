import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ManageProjects from './pages/ManageProjects'
import AddProject from './pages/AddProject'
import ManageCv from './pages/ManageCv'
import Login from './components/Login/Login'
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AuthenticatedRoute>
              <Admin />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <AuthenticatedRoute>
              <ManageProjects />
            </AuthenticatedRoute>
          }
        />
        <Route 
          path="/add-project" 
          element={
            <AuthenticatedRoute>
              <AddProject />
            </AuthenticatedRoute>
          } 
        />
        <Route
          path="/admin/cv"
          element={
            <AuthenticatedRoute>
              <ManageCv />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
