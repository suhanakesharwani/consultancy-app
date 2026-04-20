import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Layers, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const services = [
    {
      title: 'Topological Surveying',
      icon: <Ruler className="h-10 w-10 text-construct-yellow" />,
      desc: 'High-precision spatial measurement and mapping.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Geotechnical Inv.',
      icon: <Layers className="h-10 w-10 text-construct-yellow" />,
      desc: 'Sub-surface analysis for soil and rock properties.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Structural Design',
      icon: <Building2 className="h-10 w-10 text-construct-yellow" />,
      desc: 'Safe, sustainable structural frameworks.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-construct-gray-light">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-construct-charcoal overflow-hidden border-b-[6px] border-construct-yellow">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541888086225-f6740b9deae0?auto=format&fit=crop&q=80&w=1920" 
            alt="Construction site" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-1 w-12 bg-construct-yellow rounded-full"></div>
              <span className="text-construct-yellow font-bold uppercase tracking-widest text-sm">Professional Engineering Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-md">
              Engineering Precision. <br/> Building the Future.
            </h1>
            
            <p className="text-xl text-gray-200 mb-12 font-medium max-w-2xl drop-shadow">
              Industry-leading topological surveying, geotechnical investigation, and structural design. We build infrastructure that lasts generations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/services" className="inline-flex justify-center items-center px-6 py-3.5 bg-construct-yellow text-black font-bold text-lg rounded-lg shadow-md hover:bg-construct-yellow-hover hover:scale-105 transition-all">
                Our Services
              </Link>
              <Link to="/contact" className="inline-flex justify-center items-center px-6 py-3.5 bg-white border border-gray-200 text-construct-charcoal font-bold text-lg rounded-lg shadow-md hover:bg-gray-50 transition-all">
                Request Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-construct-yellow font-bold uppercase tracking-wider text-sm mb-3">Core Competencies</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-construct-charcoal mb-6">Structural Capabilities</h3>
          <p className="text-construct-gray text-lg">Delivering accurate data and safe structural designs tailored to your specific project requirements.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm">
                  {service.icon}
                </div>
              </div>
              
              <div className="p-8">
                <h4 className="text-2xl font-bold text-construct-charcoal mb-4">{service.title}</h4>
                <p className="text-construct-gray mb-8">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center text-construct-charcoal font-bold hover:text-construct-yellow transition-colors">
                  Learn more <ArrowRight className="ml-2 w-5 h-5 text-construct-yellow" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
