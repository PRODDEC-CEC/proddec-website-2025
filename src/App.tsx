import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import TechEffects from './components/TechEffects/TechEffects'
import Home from './pages/Home'
import Membership from './pages/Membership'
import Execom2025 from './pages/Execom/Execom'

function App() {

  return (
    <Router>
      <TechEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/execom" element={<Execom2025 />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
