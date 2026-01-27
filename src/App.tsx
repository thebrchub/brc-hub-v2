
import { BrowserRouter as Router} from 'react-router-dom';
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/layout/Navbar';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/ui/Cursor'; // <--- IMPORT IT
import { About } from './components/sections/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brc-black text-white selection:bg-brc-orange selection:text-white">
        
        {/* ADD THE CURSOR HERE */}
        <Cursor /> 

        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;