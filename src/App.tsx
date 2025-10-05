import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import TechEffects from './components/TechEffects/TechEffects'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home'
import Membership from './pages/Membership'
import Form from './pages/Form'
import ExecomTimeline from './pages/Execom/ExecomTimeline'
import Projects from './pages/Projects'

function App() {

  return (
    <Router>
      <ScrollToTop />
      <TechEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/membership/form" element={<Form />} />
        <Route path="/execom" element={<ExecomTimeline />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
