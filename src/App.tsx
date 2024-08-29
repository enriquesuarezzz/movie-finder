import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { Header } from './components/molecules/header/header'
import { Layout } from './components/molecules/layout/layout'
import Home from './pages/home'
import { Contact } from './pages/contact'
import ManageMovies from './pages/manage-movies'

function App() {
  const isAuthenticated = true // Replace with actual authentication logic

  return (
    <Router>
      <Layout>
        <Header />
        <div className="px-3 md:px-10">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
              path="/manage-movies"
              element={<ManageMovies />}
              // element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ManageMovies />} />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  )
}

export default App
