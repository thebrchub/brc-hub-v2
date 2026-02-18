import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react'; 
import { scroller } from 'react-scroll';

// --- 1. CRITICAL COMPONENTS (Standard Imports) ---
// We import these normally so the Homepage scrolls instantly without "pop-ins"
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/ui/Cursor';
import { SEO } from './components/SEO';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

// --- 2. HEAVY SEPARATE PAGES (Lazy Load) ---
// These are only downloaded when the user CLICKS on them.
// This saves huge amounts of data on the initial load.
const CaseStudy = lazy(() => import('./pages/CaseStudy').then(module => ({ default: module.CaseStudy })));
const AllProjects = lazy(() => import('./pages/AllProjects').then(module => ({ default: module.AllProjects })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Loading Spinner (Only shows when switching to a NEW page, like Case Study)
const PageLoader = () => (
  <div className="min-h-screen bg-brc-black flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-brc-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

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
      <SEO 
        title="BRC Hub LLP | Premium Tech & Growth Agency"
        description="Premium softwares. Data-driven growth. BRC Hub partners with visionary brands to engineer world-class digital experiences. Web | App | SaaS | Marketing. Based in Toranagallu."
      />
      
      {/* Since these are standard imports, there is NO loading spinner here.
         The user can scroll from top to bottom instantly.
      */}
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
          {/* Wrap Routes in Suspense for transition loading between PAGES only */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Standard Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/contact-us" element={<ContactPage />} />
              
              {/* These will trigger the PageLoader briefly on first click */}
              <Route path="/case-study/:id" element={<CaseStudy />} />
              <Route path="/work" element={<AllProjects />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;