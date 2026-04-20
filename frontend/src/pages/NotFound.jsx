import { Link } from 'react-router-dom';
import { HardHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-construct-gray-light text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg"
      >
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center border-4 border-construct-yellow">
            <HardHat className="w-12 h-12 text-construct-charcoal" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold text-construct-charcoal mb-4">404</h1>
        <h2 className="text-2xl font-bold text-construct-charcoal mb-6">Under Construction</h2>
        
        <p className="text-construct-gray text-lg mb-10 leading-relaxed">
          The project blueprint you're looking for doesn't exist or has been relocated to another sector.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-construct-yellow text-black font-bold py-3.5 px-8 rounded-lg hover:bg-construct-yellow-hover hover:scale-105 transition-all shadow-md"
        >
          Return to Headquarters
        </Link>
      </motion.div>
    </div>
  );
}
