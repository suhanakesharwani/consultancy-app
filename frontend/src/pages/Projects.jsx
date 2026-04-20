import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const fetchProjects = async () => {
      try {
        let url = `${API_URL}/api/projects/`;
        if (filter !== 'all') {
          url += `?service_type=${filter}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [filter]);

  // Use fallback images for the seed data since they don't have uploaded files
  const getFallbackImage = (serviceType) => {
    if (serviceType === 'topological') return "/images/survey.png";
    if (serviceType === 'geotechnical') return "/images/geo.png";
    if (serviceType === 'structural') return "/images/struct.png";
    return "/images/struct.png";
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl font-bold text-construct-charcoal mb-6">Our <span className="text-construct-yellow">Portfolio</span></h1>
        <p className="text-construct-gray text-xl mb-10">
          Proven structural integrity across major infrastructure developments.
        </p>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'topological', label: 'Topological Surveying' },
            { id: 'geotechnical', label: 'Geotechnical Inv.' },
            { id: 'structural', label: 'Structural Design' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm ${
                filter === type.id 
                  ? 'bg-construct-yellow text-black shadow-md scale-105' 
                  : 'bg-white text-construct-charcoal border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-construct-yellow"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-construct-gray font-semibold">
          No projects found for the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="h-72 overflow-hidden relative shrink-0">
                <img 
                  src={project.image_1 || getFallbackImage(project.service_type)} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute top-4 left-4 bg-construct-yellow text-black px-3 py-1 font-bold text-sm rounded-lg shadow-sm">
                  {project.location}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-construct-charcoal px-3 py-1 font-bold text-xs rounded-lg shadow-sm">
                  {project.completion_date}
                </div>
              </div>
              
              <div className="p-8 bg-white flex flex-col flex-grow">
                <div className="text-xs font-bold text-construct-gray uppercase tracking-wider mb-2">
                  Client: {project.client_name}
                </div>
                <h3 className="text-2xl font-bold text-construct-charcoal mb-3">{project.title}</h3>
                <p className="text-construct-gray leading-relaxed mb-6">{project.description}</p>
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 bg-construct-gray-light border border-gray-200 rounded-md text-xs font-bold text-construct-charcoal uppercase">
                    {project.service_type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
