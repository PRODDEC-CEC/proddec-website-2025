import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import TechEffects from './components/TechEffects/TechEffects'
import CodeSection from './components/CodeSection/CodeSection'

function App() {

  return (
    <>
      <TechEffects />
      <Navbar />
      <Hero />
      <About />
      <CodeSection />
    </>
  )
}

export default App
