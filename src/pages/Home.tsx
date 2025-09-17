import Hero from '../sections/Hero/Hero'
import About from '../sections/About/About'
import Projects from '../sections/Projects/Projects'
import CodeSection from '../components/CodeSection/CodeSection'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <CodeSection />
    </>
  )
}

export default Home