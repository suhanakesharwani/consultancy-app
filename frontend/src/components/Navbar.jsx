import { Link } from 'react-router-dom';
import { Menu, X, HardHat } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="h-2 w-full bg-construct-yellow"></div>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="text-construct-yellow">
                <HardHat className="h-8 w-8" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-construct-charcoal">
                Allied<span className="text-construct-yellow">Engineers</span>
              </span>
            </Link>

            <div className="hidden md:flex space-x-8 items-center">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'About', path: '/about' },
                { name: 'Client Portal', path: '/portal' },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="relative text-construct-gray hover:text-construct-charcoal font-semibold transition-colors group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-construct-yellow transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="px-5 py-2.5 bg-construct-yellow text-black font-semibold rounded-lg shadow-md hover:bg-construct-yellow-hover hover:scale-105 transition-all"
              >
                Contact
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-construct-gray hover:text-construct-charcoal p-2">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-construct-charcoal font-semibold border-b border-gray-100 hover:bg-gray-50">Home</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-construct-charcoal font-semibold border-b border-gray-100 hover:bg-gray-50">Services</Link>
              <Link to="/projects" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-construct-charcoal font-semibold border-b border-gray-100 hover:bg-gray-50">Projects</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-construct-charcoal font-semibold border-b border-gray-100 hover:bg-gray-50">About Us</Link>
              <Link to="/portal" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-construct-charcoal font-semibold border-b border-gray-100 hover:bg-gray-50">Client Portal</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 mt-4 text-center bg-construct-yellow text-black font-semibold rounded-lg shadow-md hover:bg-construct-yellow-hover">Contact</Link>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
