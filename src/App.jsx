import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bot, 
  Globe, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Lightbulb, 
  Menu, 
  X, 
  Send, 
  Briefcase, 
  Filter, 
  ShieldCheck,
  Building2,
  Clock,
  AlertTriangle,
  Calendar
} from 'lucide-react';

// --- LIVE INTELLIGENCE SNAPSHOT (FEB 02, 2026) ---
// Data sourced from: NFVF, DSAC, and DTIC public gazettes.
const LIVE_OPPORTUNITIES = [
  {
    id: 1,
    title: "Production & Development (Cycle 1)",
    source: "National Film & Video Foundation",
    type: "Grant",
    status: "Forecast",
    sector: "Film/TV",
    value: "Tier 1 - 3 Funding",
    deadline: "Est. Open: Feb 17, 2026",
    description: "Anticipated opening for the new financial year. Covers 'above the line' development for Features, Documentaries, and TV Formats.",
    tags: ["IP Development", "Upcoming", "High Value"]
  },
  {
    id: 2,
    title: "Foreign Film & TV Production Incentive",
    source: "Dept. of Trade, Industry (DTIC)",
    type: "Tax Rebate",
    status: "Open",
    sector: "Service/Co-Pro",
    value: "25% - 30% Rebate",
    deadline: "Rolling / Always Open",
    description: "Rebate for foreign-owned projects shot in SA. Requires R15M+ QSPE (Qualifying South African Production Expenditure).",
    tags: ["Tax", "Export", "Above the Line"]
  },
  {
    id: 3,
    title: "Mzansi Golden Economy (MGE)",
    source: "Dept. Sport, Arts & Culture",
    type: "Government Grant",
    status: "Reviewing",
    sector: "Events/Touring",
    value: "Project Based",
    deadline: "Closed Jan 30",
    description: "Major open call for cultural events and touring ventures. Applications currently under adjudication for the 2026/27 financial year.",
    tags: ["Closed", "Government", "Arts"]
  },
  {
    id: 4,
    title: "Micro-Budget Film Projects (Fiction)",
    source: "NFVF / Distributor Partner",
    type: "Commission",
    status: "Reviewing",
    sector: "Feature Film",
    value: "R4.5M - R6.0M",
    deadline: "Closed Jan 30",
    description: "Specific call for 'Youth Centric' and 'Family' films. Fully funded production caps. Now in selection phase.",
    tags: ["Commission", "Fiction", "Closed"]
  },
  {
    id: 5,
    title: "Sunny Side of the Doc 2026",
    source: "Intl. Market (La Rochelle)",
    type: "Market Pitch",
    status: "Open",
    sector: "Documentary",
    value: "Co-Pro Financing",
    deadline: "Mar 14, 2026 (Est)",
    description: "International call for documentary projects to pitch to global broadcasters/streamers. High IP export potential.",
    tags: ["International", "Documentary", "Market"]
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('search'); // Default to feed for "Live Test"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'SYSTEM ONLINE: Connected to South African & International Funding Database (Snapshot: Feb 02, 2026). Note: Several major government calls closed on Jan 30th. How can I help you find active opportunities?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Search/Filter State
  const [opportunities, setOpportunities] = useState(LIVE_OPPORTUNITIES);
  const [selectedFilter, setSelectedFilter] = useState('All');

  // --- HANDLERS ---

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    
    // Simulate AI Response with REAL Context
    setTimeout(() => {
      let responseText = "Processing request against live database...";
      const lowerInput = chatInput.toLowerCase();

      if (lowerInput.includes('documentary') || lowerInput.includes('doc')) {
        responseText = "For documentaries, the **Sunny Side of the Doc** international pitch is currently the best active 'above the line' opportunity (Deadline ~March). The NFVF Cycle 1 (opening mid-Feb) will also cover documentary development. Note: The MGE call has just closed.";
      } else if (lowerInput.includes('ip') || lowerInput.includes('intellectual property')) {
        responseText = "To build long-term IP, I recommend preparing for the **NFVF Cycle 1 Development Funding** expected to open around Feb 17th. This grant allows you to retain IP ownership, unlike the 'Micro-Budget' tender which was a commissioning deal (and closed Jan 30).";
      } else if (lowerInput.includes('government') || lowerInput.includes('grant')) {
        responseText = "Status Update: You just missed the Jan 30th deadline for the **Mzansi Golden Economy (MGE)** and **Micro-Budget** tenders. However, the **DTIC Tax Rebate** is always open if you have secured private equity, and the new financial year funding (NFVF) opens in roughly 2 weeks.";
      } else {
        responseText = "I've scanned the active 2026 gazettes. Most government grants are currently in 'Adjudication' following the Jan 30 deadlines. I recommend preparing your 'Above the Line' assets now for the February 17th NFVF cycle opening.";
      }

      setChatMessages(prev => [...prev, { role: 'system', content: responseText }]);
    }, 800);

    setChatInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    // Filter logic
    let filtered = LIVE_OPPORTUNITIES;
    
    if (searchQuery) {
      filtered = filtered.filter(op => 
        op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        op.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(op => {
        if (selectedFilter === 'Open') return op.status === 'Open' || op.status === 'Forecast';
        if (selectedFilter === 'Closed') return op.status === 'Reviewing' || op.status === 'Closed';
        return op.tags.includes(selectedFilter) || op.sector === selectedFilter;
      });
    }

    setOpportunities(filtered);
  }, [searchQuery, selectedFilter]);


  // --- COMPONENTS ---

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const StatusBadge = ({ status }) => {
    let styles = "";
    if (status === "Open") styles = "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    else if (status === "Forecast") styles = "bg-amber-500/20 text-amber-400 border-amber-500/50";
    else if (status === "Reviewing") styles = "bg-rose-500/20 text-rose-400 border-rose-500/50";
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${styles}`}>
        {status === 'Forecast' ? '⚠️ Opening Soon' : status}
      </span>
    );
  };

  // Re-added StatCard component which was missing
  const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <span className={`text-sm font-medium ${trend.includes('Closed') ? 'text-rose-400' : 'text-emerald-400'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  const OpportunityCard = ({ op }) => (
    <div className={`bg-slate-800 rounded-xl border p-6 hover:shadow-xl transition-all duration-300 group ${op.status === 'Reviewing' ? 'border-slate-700 opacity-75' : 'border-slate-600 hover:border-blue-500'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex space-x-2 mb-2">
            <StatusBadge status={op.status} />
            <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded border border-slate-600">
              {op.type}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{op.title}</h3>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <Building2 size={14} className="mr-1" /> {op.source}
          </p>
        </div>
        <div className="text-right">
          <p className="text-emerald-400 font-bold text-lg">{op.value}</p>
          <p className={`text-xs flex items-center justify-end mt-1 ${op.status === 'Reviewing' ? 'text-rose-400' : 'text-slate-500'}`}>
             <Clock size={12} className="mr-1" /> {op.deadline}
          </p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed border-t border-slate-700/50 pt-4">
        {op.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {op.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full border border-slate-600">
            #{tag}
          </span>
        ))}
      </div>
      <button className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        op.status === 'Reviewing' 
          ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-500 text-white'
      }`}>
        {op.status === 'Reviewing' ? 'Application Closed' : 'Analyze Opportunity'}
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-2 text-blue-500">
              <Globe size={24} />
              <span className="font-bold text-xl tracking-tight text-white">IP<span className="text-blue-500">Scout</span></span>
            </div>
          ) : (
            <Globe size={24} className="text-blue-500" />
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem id="dashboard" icon={TrendingUp} label={isSidebarOpen ? "Dashboard" : ""} />
          <SidebarItem id="search" icon={Search} label={isSidebarOpen ? "Opportunity Feed" : ""} />
          <SidebarItem id="chat" icon={Bot} label={isSidebarOpen ? "AI Analyst" : ""} />
          <SidebarItem id="saved" icon={FileText} label={isSidebarOpen ? "My Portfolio" : ""} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
        {/* HEADER */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-semibold text-white">
            {activeTab === 'dashboard' && 'Creative Economy Overview'}
            {activeTab === 'search' && 'Opportunity Discovery'}
            {activeTab === 'chat' && 'Investment Intelligence Bot'}
            {activeTab === 'saved' && 'Saved Assets'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-400">Live Snapshot: Feb 02, 2026</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-900/20">
              JD
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          
          {/* VIEW: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Alert Banner for Deadlines */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start space-x-3">
                 <AlertTriangle className="text-amber-500 flex-shrink-0" size={20} />
                 <div>
                   <h4 className="text-amber-500 font-bold text-sm">Post-Deadline Alert</h4>
                   <p className="text-slate-300 text-sm mt-1">
                     Major calls (MGE & Micro-Budget) closed on Jan 30. Market focus has shifted to the upcoming 
                     <span className="text-white font-semibold"> NFVF Cycle 1</span> (Feb) and <span className="text-white font-semibold">DTIC Incentives</span> (Rolling).
                   </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Active Opportunities" value="3" trend="2 Closed Jan 30" icon={FileText} color="text-blue-500 bg-blue-500" />
                <StatCard label="Max Potential Value" value="R6.0M" trend="Micro-Budget Cap" icon={Building2} color="text-indigo-500 bg-indigo-500" />
                <StatCard label="Next Major Cycle" value="Feb 17" trend="Est. Opening" icon={Calendar} color="text-amber-500 bg-amber-500" />
                <StatCard label="Tax Rebate" value="35%" trend="Always Open" icon={DollarSign} color="text-emerald-500 bg-emerald-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
                <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent"></div>
                   <h3 className="text-lg font-bold text-white mb-2 z-10">Live Market Status</h3>
                   <p className="text-slate-400 text-center max-w-md z-10">
                     We are currently in the <span className="text-blue-400 font-semibold">"Adjudication Lull"</span>. 
                     Most 2025/26 funds are reviewing Jan submissions. New financial year cycles open mid-Feb.
                   </p>
                   <div className="mt-8 flex space-x-8 z-10">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-500">CLOSED</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">MGE / DSAC</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400">OPEN</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">DTIC Rebates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-400">SOON</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">NFVF Cycle 1</div>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Live Alerts (Feb 2026)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                       <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                       <div>
                         <p className="text-sm text-slate-200 font-medium">NFVF Cycle 1 Prep</p>
                         <p className="text-xs text-slate-500">Expected Feb 17 • Get scripts ready</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-800 opacity-75">
                       <div className="w-2 h-2 mt-2 rounded-full bg-rose-500 flex-shrink-0"></div>
                       <div>
                         <p className="text-sm text-slate-200 font-medium">Micro-Budget Closed</p>
                         <p className="text-xs text-slate-500">Closed Jan 30 • Under Review</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: OPPORTUNITY FEED */}
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search live database (e.g., 'Tax', 'NFVF', 'Documentary')..." 
                    className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {['All', 'Open', 'Closed', 'Documentary', 'Tax'].map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        selectedFilter === filter 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {opportunities.map(op => (
                  <OpportunityCard key={op.id} op={op} />
                ))}
              </div>
            </div>
          )}

          {/* VIEW: CHATBOT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full max-h-[calc(100vh-140px)] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                     <Bot size={18} className="text-white" />
                   </div>
                   <div>
                     <h3 className="font-bold text-white">Analyst Bot (Live)</h3>
                     <p className="text-xs text-emerald-400 flex items-center">
                       <ShieldCheck size={10} className="mr-1" /> Data: Feb 02 2026
                     </p>
                   </div>
                 </div>
                 <button className="text-slate-500 hover:text-white" title="Clear Chat">
                   <X size={18} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <form onSubmit={handleChatSubmit} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about active 2026 tenders..."
                    className="w-full bg-slate-900 text-white pl-4 pr-12 py-4 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <p className="text-center text-xs text-slate-500 mt-2">
                  System updated with Gov Gazette Data from Jan 2026 - Feb 2026.
                </p>
              </div>
            </div>
          )}
          
          {/* VIEW: SAVED (Placeholder) */}
          {activeTab === 'saved' && (
             <div className="flex flex-col items-center justify-center h-full text-slate-500">
               <Briefcase size={64} className="mb-4 opacity-50" />
               <h3 className="text-xl font-medium text-white">Your Portfolio is Empty</h3>
               <p className="max-w-md text-center mt-2">Start saving opportunities from the Feed or ask the Bot to shortlist tenders for you.</p>
               <button onClick={() => setActiveTab('search')} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors">
                 Browse Opportunities
               </button>
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;