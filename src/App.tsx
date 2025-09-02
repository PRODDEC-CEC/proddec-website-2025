import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Projects from './sections/Projects/Projects'
import Footer from './components/Footer/Footer'
import TechEffects from './components/TechEffects/TechEffects'
import CodeSection from './components/CodeSection/CodeSection'

function App() {

  return (
    <>
      <TechEffects />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <CodeSection />
      <Footer />
    </>
  )
}

export default App
