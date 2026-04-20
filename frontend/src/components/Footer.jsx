import { MapPin, Phone, Mail, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-construct-charcoal text-white pt-20 pb-10 mt-auto border-t-[6px] border-construct-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="text-construct-yellow">
                <HardHat className="h-8 w-8" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Allied<span className="text-construct-yellow">Engineers</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              Premier engineering consultancy specializing in topological surveying, geotechnical investigation, and structural design. We build the future on solid foundations.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 font-medium text-gray-400 text-sm">
              <li><Link to="/services" className="hover:text-construct-yellow transition flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-construct-yellow mr-2"></div>Services</Link></li>
              <li><Link to="/projects" className="hover:text-construct-yellow transition flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-construct-yellow mr-2"></div>Projects</Link></li>
              <li><Link to="/about" className="hover:text-construct-yellow transition flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-construct-yellow mr-2"></div>About Us</Link></li>
              <li><Link to="/portal" className="hover:text-construct-yellow transition flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-construct-yellow mr-2"></div>Client Portal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start"><MapPin className="h-5 w-5 mr-3 text-construct-yellow shrink-0" /> 123 Engineering Blvd<br/>Tech District, NY 10001</li>
              <li className="flex items-center"><Phone className="h-5 w-5 mr-3 text-construct-yellow shrink-0" /> (555) 123-4567</li>
              <li className="flex items-center"><Mail className="h-5 w-5 mr-3 text-construct-yellow shrink-0" /> info@alliedengineers.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-16 pt-8 text-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Allied Engineers. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
