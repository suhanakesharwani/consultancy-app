import { Upload, FileText, Lock, Activity, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ClientPortal() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const res = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        setToken(data.access);
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (err) {
      setLoginError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
     const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const projRes = await fetch(`${API_URL}/api/client/projects/`, { headers });
      if (projRes.ok) {
        setProjects(await projRes.json());
      }
      
      const docRes = await fetch(`${API_URL}/api/documents/`, { headers });
      if (docRes.ok) {
        setDocuments(await docRes.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !selectedProject) return;
    
    setUploadMessage('Uploading...');
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('file_name', uploadFile.name);
    formData.append('project', selectedProject);

    try {
      const res = await fetch(`${API_URL}/api/documents/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setUploadMessage('Upload successful!');
        setUploadFile(null);
        fetchData(); // refresh documents
      } else {
        setUploadMessage('Upload failed.');
      }
    } catch (err) {
      setUploadMessage('Network error.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-construct-gray-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 border-t-4 border-t-construct-yellow w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-construct-gray-light rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-construct-yellow" />
            </div>
            <h1 className="text-2xl font-bold text-construct-charcoal">Secure Access</h1>
            <p className="text-construct-gray text-sm mt-1">Client Terminal / Portal</p>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-semibold text-construct-charcoal block mb-2">Email/Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com" 
                className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-all" 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-construct-charcoal block mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-construct-gray-light border border-gray-200 text-construct-charcoal rounded-lg px-4 py-3 focus:outline-none focus:border-construct-yellow focus:ring-1 focus:ring-construct-yellow transition-all" 
              />
            </div>
            {loginError && <div className="text-red-500 text-sm font-bold">{loginError}</div>}
            <button className="w-full bg-construct-yellow text-black font-bold py-3.5 rounded-lg hover:bg-construct-yellow-hover hover:scale-[1.02] transition-all shadow-md mt-4">
              Initialize Session
            </button>
          </form>
          <div className="mt-8 bg-orange-50 border-l-4 border-construct-orange p-4 rounded-r-lg">
             <p className="text-construct-orange text-sm font-medium">Please contact your project manager if you require access credentials.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-construct-charcoal mb-2">Client Dashboard</h1>
          <p className="text-construct-gray font-medium">Session active • Access Level: Standard</p>
        </div>
        <div className="flex flex-col items-end mt-6 md:mt-0 gap-2">
          <div className="font-bold text-construct-charcoal text-sm bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
            USER AUTHENTICATED
          </div>
          <button onClick={handleLogout} className="text-sm text-red-500 font-bold hover:underline">
            Terminate Session
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Project Status */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <div className="text-construct-gray text-sm font-bold uppercase mb-1">Assigned Projects</div>
              <div className="text-3xl font-bold text-construct-charcoal">{projects.length < 10 ? `0${projects.length}` : projects.length}</div>
            </div>
            <Activity className="w-10 h-10 text-construct-yellow" />
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <div className="text-construct-gray text-sm font-bold uppercase mb-1">Total Documents</div>
              <div className="text-3xl font-bold text-construct-charcoal">{documents.length < 10 ? `0${documents.length}` : documents.length}</div>
            </div>
            <Clock className="w-10 h-10 text-construct-orange" />
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <div className="text-construct-gray text-sm font-bold uppercase mb-1">System Status</div>
              <div className="text-xl font-bold text-construct-charcoal text-green-500">SECURE</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-construct-charcoal mb-6 border-b border-gray-100 pb-4 flex items-center"><FileText className="mr-3 text-construct-yellow" /> Documentation</h2>
          {documents.length === 0 ? (
            <p className="text-construct-gray text-sm font-medium">No documents available.</p>
          ) : (
            <ul className="space-y-4">
              {documents.map((doc) => (
                <li key={doc.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-construct-gray-light rounded-lg border border-gray-200 hover:border-construct-yellow hover:shadow-sm transition-all group">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-construct-charcoal font-bold text-sm flex items-center mb-1">
                      {doc.file_name} 
                      {doc.is_report && <span className="ml-2 bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded uppercase font-bold">Admin Report</span>}
                    </span>
                    <span className="text-construct-gray text-xs">UPLOADED: {new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                  <a href={`http://localhost:8000${doc.file}`} target="_blank" rel="noreferrer" className="bg-white border border-gray-300 text-construct-charcoal px-4 py-2 font-bold text-xs rounded-lg hover:bg-construct-yellow hover:border-construct-yellow transition-colors shadow-sm">
                    Download
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 overflow-hidden group">
          <h2 className="text-xl font-bold text-construct-charcoal mb-6 flex items-center"><Upload className="mr-3 text-construct-yellow" /> Transmit Files</h2>
          
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-construct-gray uppercase block mb-1">Select Project</label>
              <select 
                className="w-full bg-construct-gray-light border border-gray-200 rounded-lg p-2 text-sm text-construct-charcoal"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                required
              >
                <option value="">-- Choose Project --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-construct-yellow transition-colors cursor-pointer bg-construct-gray-light flex flex-col justify-center items-center relative">
              <Upload className="w-8 h-8 text-construct-gray mb-2 group-hover:text-construct-yellow transition-colors" />
              <p className="text-construct-charcoal text-sm font-bold mb-1">Select File</p>
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setUploadFile(e.target.files[0])}
                required
              />
              {uploadFile && <p className="text-xs text-construct-yellow font-bold mt-2 truncate w-full px-2">{uploadFile.name}</p>}
            </div>
            
            <button type="submit" className="w-full bg-construct-charcoal text-white font-bold py-3 rounded-lg hover:bg-black transition-all text-sm">
              Upload Document
            </button>
            {uploadMessage && <p className="text-xs text-center font-bold text-construct-gray">{uploadMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
