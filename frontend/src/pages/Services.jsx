import { Link } from 'react-router-dom';
import { Ruler, Layers, Building2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      id: "topological",
      title: "Topological Surveying",
      icon: <Ruler className="h-12 w-12 text-construct-yellow" />,
      description: "High-precision measurement and mapping of terrain to support engineering and construction planning. We provide critical spatial data required for accurate site development.",
      methodologies: [
        "GPS & Total Station Surveys for pinpoint accuracy",
        "Contour mapping and 3D digital terrain modeling",
        "Site boundary delineation and property line marking",
        "As-built surveys for completed structures"
      ]
    },
    {
      id: "geotechnical",
      title: "Geotechnical Investigation",
      icon: <Layers className="h-12 w-12 text-construct-yellow" />,
      description: "Comprehensive sub-surface analysis to evaluate soil and rock properties, ensuring the safe and economical design of foundations and earthworks.",
      methodologies: [
        "Deep borehole logging and soil sampling",
        "Standard Penetration Testing (SPT) & Cone Penetration Testing (CPT)",
        "Detailed soil classification and strata profiling",
        "Advanced laboratory analysis for bearing capacity"
      ]
    },
    {
      id: "structural",
      title: "Structural Design",
      icon: <Building2 className="h-12 w-12 text-construct-yellow" />,
      description: "State-of-the-art structural engineering for residential, commercial, and industrial facilities, focused on safety, efficiency, and sustainability.",
      methodologies: [
        "Comprehensive load analysis (gravity, wind, seismic)",
        "Deep and shallow foundation design integration",
        "Building frame design (steel, concrete, timber)",
        "Strict compliance with Eurocode and IS codes"
      ]
    }
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-construct-charcoal mb-6">Our <span className="text-construct-yellow">Services</span></h1>
        <p className="text-construct-gray text-xl">
          Professional methodologies engineered for absolute precision and reliability.
        </p>
      </div>
      
      <div className="space-y-16">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col lg:flex-row items-stretch border border-gray-100 overflow-hidden"
          >
            <div className="lg:w-1/2 p-10 md:p-14 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
              <div>
                <div className="mb-8 bg-gray-50 p-4 inline-block rounded-lg shadow-sm border border-gray-100">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold text-construct-charcoal mb-6">{service.title}</h2>
                <p className="text-construct-gray text-lg leading-relaxed mb-10">{service.description}</p>
              </div>
              <Link 
                to={`/contact?service=${service.id}`} 
                className="inline-flex justify-center items-center px-6 py-3 bg-white border-2 border-construct-yellow text-construct-charcoal font-bold rounded-lg shadow-sm hover:bg-construct-yellow transition-colors self-start"
              >
                Request Service
              </Link>
            </div>
            
            <div className="lg:w-1/2 p-10 md:p-14 bg-construct-gray-light">
              <h3 className="text-xl font-bold text-construct-charcoal mb-8 border-b border-gray-200 pb-4">Methodology Outline</h3>
              <div className="space-y-6">
                {service.methodologies.map((method, mIndex) => (
                  <div key={mIndex} className="flex items-start group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 shrink-0 mt-1 mr-4 group-hover:border-construct-yellow transition-colors">
                      <ChevronRight className="w-5 h-5 text-construct-yellow" />
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 w-full group-hover:border-construct-yellow transition-colors">
                      <span className="text-construct-charcoal font-medium">{method}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
