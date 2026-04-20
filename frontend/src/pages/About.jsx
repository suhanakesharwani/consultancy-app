import { motion } from 'framer-motion';
import { Target, Shield, Zap, Layers } from 'lucide-react';

export default function About() {
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-construct-charcoal mb-6">About <span className="text-construct-yellow">Allied Engineers</span></h1>
        <p className="text-construct-gray text-xl">
          Engineering excellence since 2005. Structural precision at scale.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-10 mb-24">
        <div className="lg:w-1/2 bg-white p-10 rounded-xl shadow-md border border-gray-100 flex flex-col">
          <h2 className="text-3xl font-bold text-construct-charcoal mb-6">Our Mission</h2>
          <p className="text-construct-gray text-lg leading-relaxed mb-6">
            Allied Engineers was established to provide uncompromising precision in heavy infrastructure development. We engineer frameworks that defy the elements and stand the test of time.
          </p>
          <p className="text-construct-gray text-lg leading-relaxed mb-10">
            From deep subterranean soil analysis to high-altitude structural physics, our multidisciplinary teams bridge the gap between architectural vision and physical reality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-200 pt-10 mt-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-construct-yellow mb-2">500+</div>
              <div className="text-sm text-construct-gray font-semibold uppercase tracking-wider">Completed Projects</div>
            </div>
            <div className="text-center md:border-l md:border-r border-gray-200 px-4">
              <div className="text-4xl font-bold text-construct-yellow mb-2">20+</div>
              <div className="text-sm text-construct-gray font-semibold uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-construct-yellow mb-2">150+</div>
              <div className="text-sm text-construct-gray font-semibold uppercase tracking-wider">Global Clients</div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full h-[500px] rounded-xl overflow-hidden shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1000" 
            alt="Engineering team" 
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>
      </div>

      <div className="bg-white p-12 rounded-xl shadow-md border border-gray-100 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-construct-charcoal mb-4">Compliance & Certification</h2>
          <p className="text-construct-gray text-lg">Operating to the highest industry standards for quality and safety.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "ISO 9001:2015", desc: "Quality Management", icon: <Shield /> },
            { name: "ASCE Member", desc: "Corporate Alliance", icon: <Target /> },
            { name: "OSHA 30-Hour", desc: "Safety Protocol", icon: <Zap /> },
            { name: "LEED Certified", desc: "Sustainable Eng.", icon: <Layers /> }
          ].map((cert, i) => (
            <div key={i} className="p-6 bg-construct-gray-light rounded-lg border border-gray-200 hover:border-construct-yellow hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="text-construct-yellow mb-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">{cert.icon}</div>
              <div className="font-bold text-construct-charcoal mb-2">{cert.name}</div>
              <div className="text-sm text-construct-gray">{cert.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
