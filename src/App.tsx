import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';

import { Hero } from './components/sections/Hero';
import { Navbar } from './components/layout/Navbar';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/ui/Cursor';
import { About } from './components/sections/About';
import { Testimonials } from './components/sections/Testimonials';
import { CaseStudy } from './pages/CaseStudy';
import { AllProjects } from './pages/AllProjects'; 
import { NotFound } from './pages/NotFound'; 
import { SEO } from './components/SEO'; // <--- 1. Import SEO

// Helper component for the One-Page layout
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetSection = location.state.scrollTo;
      setTimeout(() => {
        scroller.scrollTo(targetSection, {
          duration: 800,
          delay: 0,
          smooth: true,
          offset: -50,
        });
      }, 200);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      {/* 2. Add SEO Component Here for the Home Page */}
      <SEO 
        title="Software Development & Marketing Agency"
        description="BRC Hub is a full-service agency in Ballari providing Web & App Development, SaaS Development and Digital Marketing solutions to scale your business."
      />
      
      <Hero />
      <About />
      <Services />
      <Work />
      <Testimonials />
      <Contact />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brc-black text-white selection:bg-brc-orange selection:text-white">
        <Cursor /> 
        <Navbar />
        
        <main>
          <Routes>
            {/* Standard Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="/work" element={<AllProjects />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;