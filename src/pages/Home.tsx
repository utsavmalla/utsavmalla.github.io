import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Skills from '../components/Skills/Skills'
import Experience from '../components/Experience/Experience'
import Projects from '../components/Projects/Projects'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

function Home() {
  return (
    <>
      <Helmet>
        <title>Utsav Malla — Front-end Developer</title>
        <meta
          name="description"
          content="Utsav Malla — Front-end developer & UI/UX designer"
        />
        <meta name="author" content="Utsav Malla" />
        <meta
          name="google-site-verification"
          content="b41SegIa-5ajknrh8CdOQpP9-2HBT7bXuL18XyTJNtM"
        />
        <meta property="og:title" content="Utsav Malla — Front-end Developer" />
        <meta
          property="og:description"
          content="Front-end developer & UI/UX designer"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
