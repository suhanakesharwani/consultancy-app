import { MapPin, Phone, Mail, FileWarning, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    service_required: '',
    project_location: '',
    description: ''
  });
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (attachment) {
      data.append('attachment', attachment);
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/enquiries/`, {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          full_name: '',
          company: '',
          email: '',
          phone: '',
          service_required: '',
          project_location: '',
          description: ''
        });
        setAttachment(null);
      } else {
        setError('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-construct-charcoal mb-6">Contact <span className="text-construct-yellow">Us</span></h1>
        <p className="text-construct-gray text-xl">
          Initiate project requirements or request technical consultation today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 border-t-4 border-t-construct-yellow p-8">
            <h3 className="text-construct-charcoal font-bold text-xl mb-6 flex items-center">
              <MapPin className="mr-3 text-construct-yellow w-6 h-6" /> HQ Coordinates
            </h3>
            <p className="text-construct-gray mb-6 leading-relaxed">
              123 Engineering Blvd<br/>
              Sector 7, Tech District<br/>
              New York, NY 10001
            </p>
            <div className="w-full h-32 bg-construct-gray-light rounded-lg border border-gray-200 flex items-center justify-center">
               <MapPin className="text-construct-orange w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <h3 className="text-construct-charcoal font-bold text-xl mb-6">Direct Channels</h3>
            <ul className="space-y-4 text-construct-gray font-medium">
              <li className="flex items-center"><Phone className="mr-3 text-construct-yellow w-5 h-5" /> (555) 123-4567</li>
              <li className="flex items-center"><Mail className="mr-3 text-construct-yellow w-5 h-5" /> info@alliedengineers.com</li>
              <li className="flex items-center text-construct-orange"><FileWarning className="mr-3 text-construct-orange w-5 h-5" /> Emergency Support</li>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-10"
          >
            {success ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-construct-charcoal mb-4">Enquiry Received!</h2>
                <p className="text-construct-gray text-lg mb-8">
                  Thank you for reaching out to Allied Engineers. A confirmation email has been sent to your inbox.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-construct-yellow text-black font-bold py-3 px-8 rounded-lg hover:bg-construct-yellow-hover transition-colors shadow-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3 mb-8 border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold text-construct-charcoal">Request For Quotation</h2>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Full Name *</label>
                      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Company (Optional)</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Service Required *</label>
                      <select name="service_required" value={formData.service_required} onChange={handleChange} required className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors appearance-none">
                        <option value="">Select a discipline...</option>
                        <option value="topological">Topological Surveying</option>
                        <option value="geotechnical">Geotechnical Investigation</option>
                        <option value="structural">Structural Design</option>
                        <option value="multiple">Multiple Services / General</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-construct-charcoal block mb-2">Project Location</label>
                      <input type="text" name="project_location" value={formData.project_location} onChange={handleChange} className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-construct-charcoal block mb-2">Project Scope / Technical Requirements *</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-colors"></textarea>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-construct-charcoal block mb-2">Attach Site Blueprints / Specs (Optional)</label>
                    <div className="border border-gray-200 rounded-lg bg-construct-gray-light p-2 flex items-center">
                      <input type="file" onChange={(e) => setAttachment(e.target.files[0])} className="w-full text-sm text-construct-gray file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-white file:text-construct-charcoal hover:file:bg-construct-yellow transition-colors cursor-pointer file:shadow-sm" />
                    </div>
                  </div>

                  {error && <div className="text-red-500 font-bold text-sm text-center">{error}</div>}

                  <button type="submit" disabled={isSubmitting} className="w-full bg-construct-yellow text-black font-bold py-4 rounded-lg hover:bg-construct-yellow-hover hover:scale-[1.02] transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100">
                    {isSubmitting ? 'Transmitting...' : 'Transmit Inquiry Data'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
