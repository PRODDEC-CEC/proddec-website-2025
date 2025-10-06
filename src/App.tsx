import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Projects from './sections/Projects/Projects'
import Footer from './components/Footer/Footer'
import TechEffects from './components/TechEffects/TechEffects'
import CodeSection from './components/CodeSection/CodeSection'
import LatestUpdates from './components/LatestUpdates/latestUpdates'
import Vision from './sections/Vision/Vision'
import Service from './sections/Services/Service'
import Mission from './sections/Mission/Mission'
import Spacer from './components/Spacer/Spacer'
import Join from './sections/JoinCommunity/Join'

function App() {

  return (
    <>
      {/* <TechEffects /> */}
      <LatestUpdates/>
      <Hero />
      <About />
      <Vision/>
      <Spacer/>
      <Mission/>
      <Service/>
      <Projects />
      <Join/>
      {/* <CodeSection /> */}
      <Footer />
    </>
  )
}

export default App
