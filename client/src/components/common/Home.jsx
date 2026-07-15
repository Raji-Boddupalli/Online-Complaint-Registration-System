import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Departments from "./Departments";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Departments />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;