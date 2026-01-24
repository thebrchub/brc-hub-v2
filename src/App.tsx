import { BrowserRouter } from 'react-router-dom';
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Work } from "./components/sections/Work";
import { Contact } from "./components/sections/Contact";

function App() {
  return (
    <BrowserRouter>
        {/* ADDED 'selection:bg-brc-orange selection:text-white' HERE vvv */}
        <div className="min-h-screen bg-brc-black text-white font-sans flex flex-col selection:bg-brc-orange selection:text-white">
          <Navbar />
          <main className="flex-grow">
              <Hero />
              <About />
              <Services />
              <Work />
              <Contact />
          </main>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;