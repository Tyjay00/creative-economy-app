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
  Calendar,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MapPin,
  Timer,
  ClipboardCheck,
  FileCheck
} from 'lucide-react';

// --- LIVE INTELLIGENCE SNAPSHOT (PAN-AFRICAN EDITION - FEB 08, 2026) ---
const LIVE_OPPORTUNITIES = [
  {
    id: 16,
    title: "Durban FilmMart (DFM) Projects",
    source: "Durban FilmMart Institute",
    country: "Pan-African",
    type: "Market Lab",
    status: "Urgent",
    sector: "Film/Doc",
    value: "Pitch & Finance",
    deadline: "Feb 20, 2026",
    description: "Submission for feature films and documentaries in development to pitch at DFM 2026. This is the premier finance market in Africa.",
    eligibility: "African producers with a developed script and finance plan.",
    strategicFit: "URGENT: Only 12 days left. If selected, this is your best route to finding co-producers and international sales agents.",
    portalUrl: "https://durbanfilmmart.co.za/",
    requirements: [
      "One-page Synopsis (PDF)",
      "Director's Statement (Visual Style)",
      "Producer's Statement (Finance Strategy)",
      "Chain of Title (Option Agreement)",
      "Draft Finance Plan",
      "Link to Director's previous work"
    ],
    businessAction: [
      "Ensure option agreement is signed with the writer.",
      "Draft a provisional finance plan showing 20% equity/soft money.",
      "Update Director's showreel link."
    ],
    tags: ["Market", "Development", "Urgent"]
  },
  {
    id: 9,
    title: "Film Empowerment Program",
    source: "Kenya Film Commission (KFC)",
    country: "Kenya",
    type: "Grant",
    status: "Urgent",
    sector: "Film/TV",
    value: "KES 500k - 5M",
    deadline: "Feb 28, 2026",
    description: "Funding for the development and production of Kenyan content, specifically targeting local stories with international appeal.",
    eligibility: "Registered Kenyan production companies with tax compliance (KRA PIN).",
    strategicFit: "Closing this month. Ensure your tax compliance certificate is up to date before applying.",
    portalUrl: "https://kenyafilmcommission.go.ke/",
    requirements: [
      "Valid Tax Compliance Certificate (KRA)",
      "Certificate of Incorporation (CR12)",
      "Detailed Script / Treatment",
      "Detailed Budget (Kenyan Shillings)",
      "Production Schedule",
      "Cast & Crew List (Tentative)"
    ],
    businessAction: [
      "Verify KRA Tax Compliance status immediately.",
      "Secure letters of intent from key cast members.",
      "Ensure budget aligns with KFC rate cards."
    ],
    tags: ["East Africa", "Grant", "Production"]
  },
  {
    id: 7,
    title: "KZN Film Fund Production",
    source: "KZN Film Commission",
    country: "South Africa",
    type: "Grant",
    status: "Urgent",
    sector: "Film/TV",
    value: "Up to R2M",
    deadline: "Feb 28, 2026",
    description: "Funding for productions with significant spend in KwaZulu-Natal province.",
    eligibility: "50% of principal photography must be in KZN. KZN-based service company required.",
    strategicFit: "Closing soon. Combine this with the DTIC rebate and NFVF funding for a 'blended finance' model.",
    portalUrl: "https://kznfilm.co.za/funding/",
    requirements: [
      "Company Registration (CIPC)",
      "Valid Tax Clearance Certificate (SARS)",
      "BBBEE Certificate (Level 1-3 preferred)",
      "Chain of Title / Copyright verification",
      "KZN Location Scouting Report",
      "Distribution Letter of Intent"
    ],
    businessAction: [
      "Register a KZN-based office or partner with a KZN co-producer.",
      "Scout locations in Durban/KZN to prove 50% spend.",
      "Secure a letter of intent from a distributor."
    ],
    tags: ["Regional", "KZN", "Production"]
  },
  {
    id: 3,
    title: "Mzansi Golden Economy (MGE)",
    source: "Dept. Sport, Arts & Culture",
    country: "South Africa",
    type: "Government Grant",
    status: "Closed",
    sector: "Events/Touring",
    value: "Project Based",
    deadline: "Closed: Jan 30, 2026",
    description: "Major open call for cultural events and touring ventures. Applications currently under adjudication.",
    eligibility: "Registered NPOs or Private Companies in the cultural sector.",
    strategicFit: "Closed. Monitor for 'Ad-Hoc' funding announcements in April if the main round is undersubscribed.",
    portalUrl: "https://www.dsac.gov.za/",
    requirements: [
      "Audited Financial Statements (Last 2 years)",
      "Tax Clearance Certificate",
      "Project Proposal & Budget",
      "Venues Booking Confirmation"
    ],
    businessAction: [
      "Wait for adjudication results (April 2026).",
      "Prepare audit for next cycle."
    ],
    tags: ["Closed", "Government", "Arts"]
  },
  {
    id: 14,
    title: "AFRIFF 2025 Submissions",
    source: "Africa Int. Film Festival",
    country: "Nigeria",
    type: "Festival",
    status: "Closed",
    sector: "Exhibition",
    value: "Awards/Screening",
    deadline: "Closed: Jan 15, 2026",
    description: "Submission call for feature films and shorts for the Lagos-based festival.",
    eligibility: "Films completed in 2024/2025.",
    strategicFit: "Closed. If you missed this, target the Durban International Film Festival (opening soon) instead.",
    portalUrl: "https://afriff.com/",
    requirements: ["Screener Link (Vimeo/YouTube)", "Press Kit"],
    businessAction: ["Target Durban International Film Festival instead."],
    tags: ["Closed", "Festival", "West Africa"]
  },
  {
    id: 15,
    title: "Kalasha Market Call",
    source: "Kenya Film Commission",
    country: "Kenya",
    type: "Market",
    status: "Closed",
    sector: "Trade",
    value: "Exhibitor Stand",
    deadline: "Closed: Dec 10, 2025",
    description: "Registration for trade stands at the Kalasha International Film & TV Market.",
    eligibility: "East African media companies.",
    strategicFit: "Closed. Next cycle opens Nov 2026.",
    portalUrl: "https://kenyafilmcommission.go.ke/",
    requirements: ["Company Profile", "Product Catalogue"],
    businessAction: ["Prepare catalogue for 2026 cycle."],
    tags: ["Closed", "East Africa", "Market"]
  },
  {
    id: 1,
    title: "Production & Development (Cycle 1)",
    source: "National Film & Video Foundation",
    country: "South Africa",
    type: "Grant",
    status: "Forecast",
    sector: "Film/TV",
    value: "Tier 1 - 3 Funding",
    deadline: "Est. Open: Feb 17, 2026",
    description: "Anticipated opening for the new financial year. Covers 'above the line' development for Features, Documentaries, and TV Formats.",
    eligibility: "51% Black-owned production companies. Must have secured rights to the IP.",
    strategicFit: "High priority. The NFVF is shifting focus to 'commercial viability'. Ensure your proposal highlights export potential.",
    portalUrl: "https://nfvf.co.za/home/index.php/funding",
    requirements: [
      "Complete Script (Feature) or Series Bible",
      "Detailed Development Budget",
      "Finance Plan",
      "Writer's Agreement (Chain of Title)",
      "Company Registration & Shareholder Certs",
      "BBBEE Certificate"
    ],
    businessAction: [
      "Ensure company is 51% Black-Owned (CIPC update if needed).",
      "Sign Option Agreement with the writer.",
      "Open a separate bank account for the project (required if funded)."
    ],
    tags: ["IP Development", "Upcoming", "High Value"]
  },
  {
    id: 2,
    title: "Foreign Film & TV Production Incentive",
    source: "Dept. of Trade, Industry (DTIC)",
    country: "South Africa",
    type: "Tax Rebate",
    status: "Open",
    sector: "Service/Co-Pro",
    value: "25% - 30% Rebate",
    deadline: "Rolling / Always Open",
    description: "Rebate for foreign-owned projects shot in SA. Requires R15M+ QSPE (Qualifying South African Production Expenditure).",
    eligibility: "Foreign-owned projects with a local service company. Minimum spend R15M.",
    strategicFit: "Critical for servicing international clients. The 5% 'Post-Production' bump is often overlooked—add that if applicable.",
    portalUrl: "http://www.thedtic.gov.za/financial-and-non-financial-support/incentives/film-and-television-production/",
    requirements: [
      "Provisional Application Form (Annexure A)",
      "Proof of R15M+ Secured Funding (Bank Guarantee)",
      "Co-Production Agreement",
      "Detailed Expenditure Schedule",
      "SPV Registration Documents"
    ],
    businessAction: [
      "Register a Special Purpose Vehicle (SPV) specifically for this production.",
      "Secure proof of funds from the foreign investor.",
      "Appoint a South African auditor."
    ],
    tags: ["Tax", "Export", "Above the Line"]
  },
  {
    id: 10,
    title: "BoI NollyFund",
    source: "Bank of Industry",
    country: "Nigeria",
    type: "Loan",
    status: "Open",
    sector: "Film",
    value: "₦20M - ₦50M",
    deadline: "Rolling",
    description: "Single-digit interest loans for film production and cinema infrastructure. Aimed at commercial Nollywood releases.",
    eligibility: "Nigerian-registered companies with a distribution agreement in place.",
    strategicFit: "Strictly for commercial projects. You must show a clear path to box office revenue to service the debt.",
    portalUrl: "https://www.boi.ng/",
    requirements: [
      "Distribution Agreement (Cinema/Streaming)",
      "Credit Check / Bank History",
      "Completion Bond Guarantee",
      "Detailed Recoupment Plan",
      "Collateral Documentation"
    ],
    businessAction: [
      "Secure a distribution deal with a major cinema chain (e.g., FilmHouse).",
      "Prepare collateral assets for loan security.",
      "Draft a 3-year revenue projection."
    ],
    tags: ["West Africa", "Loan", "Commercial"]
  },
  {
    id: 11,
    title: "Netflix Creative Equity Scholarship",
    source: "Netflix / Partner Institutions",
    country: "Pan-African",
    type: "Scholarship",
    status: "Open",
    sector: "Education",
    value: "Full Tuition + Stipend",
    deadline: "Mar 15, 2026",
    description: "Financial support for next-gen filmmakers studying at partner institutions in West, East, and Southern Africa.",
    eligibility: "Students accepted into partner film schools (e.g., Gotham, AACA).",
    strategicFit: "Excellent for talent pipeline development. Use this to fund junior staff or upskill yourself.",
    portalUrl: "https://about.netflix.com/en",
    requirements: [
      "Letter of Acceptance from Partner Institution",
      "Academic Transcripts",
      "Motivation Letter (Financial Need)",
      "Portfolio of creative work"
    ],
    businessAction: [
      "Apply to the partner film school first.",
      "Draft a motivation letter focusing on financial need and creative potential."
    ],
    tags: ["Education", "Pan-African", "Skills"]
  },
  {
    id: 6,
    title: "Media & Motion Pictures Loan",
    source: "Industrial Development Corp (IDC)",
    country: "South Africa",
    type: "Loan / Equity",
    status: "Open",
    sector: "Infrastructure/Film",
    value: "R1M - R500M",
    deadline: "Rolling",
    description: "Commercial funding for film projects or studio infrastructure. Focus on sustainable businesses and job creation.",
    eligibility: "Commercially viable projects with distribution guarantees. Not a grant—this is debt funding.",
    strategicFit: "Use this to gap-finance the last 20% of a production budget against a distribution guarantee.",
    portalUrl: "https://www.idc.co.za/",
    requirements: [
      "Business Plan (Commercial)",
      "Off-take Agreements (Distribution Guarantees)",
      "Audited Financials (3 Years)",
      "Tax Clearance",
      "Completion Bond Letter of Intent"
    ],
    businessAction: [
      "Secure a Completion Bond (insurance for the production).",
      "Finalize pre-sales or distribution guarantees to prove repayment ability.",
      "Structure the deal as 'Gap Financing'."
    ],
    tags: ["Loan", "Commercial", "Infrastructure"]
  },
  {
    id: 12,
    title: "Marketing & Distribution Support",
    source: "Gauteng Film Commission (GFC)",
    country: "South Africa",
    type: "Grant",
    status: "Open",
    sector: "Marketing",
    value: "R200k - R500k",
    deadline: "Mar 30, 2026 (Quarterly)",
    description: "Assistance for marketing costs, festival attendance (e.g., Cannes, Toronto), and distribution prints.",
    eligibility: "Gauteng-based filmmakers with completed projects ready for market.",
    strategicFit: "Apply now if you have a film accepted into a Q2 festival. Do not apply without an acceptance letter.",
    portalUrl: "https://gautengfilm.org.za/",
    requirements: [
      "Proof of Festival Acceptance",
      "Detailed Marketing Plan",
      "Marketing Budget",
      "Gauteng Residency Proof"
    ],
    businessAction: [
      "Wait for official festival invitation letter.",
      "Design a marketing poster and trailer."
    ],
    tags: ["Marketing", "Regional", "Gauteng"]
  },
  {
    id: 13,
    title: "Realness Episodic Lab",
    source: "Realness Institute",
    country: "Pan-African",
    type: "Lab / Dev",
    status: "Forecast",
    sector: "Series",
    value: "Dev Stipend + Pitch",
    deadline: "Est Open: Mar 01, 2026",
    description: "A development lab for writers of episodic content. Successful projects often get first-look deals with streamers.",
    eligibility: "Writers/Creators from any African country with a series concept.",
    strategicFit: "The most prestigious series lab on the continent. High entry barrier, but high reward.",
    portalUrl: "https://www.realness.institute/",
    requirements: [
      "Pilot Script (First Draft)",
      "Series Bible (1-Pager)",
      "Character breakdowns",
      "Writer's Bio"
    ],
    businessAction: [
      "Polish the pilot script.",
      "Refine the 'Logline' and 'Series Arc'."
    ],
    tags: ["Development", "Pan-African", "Series"]
  },
  {
    id: 5,
    title: "Sunny Side of the Doc 2026",
    source: "Intl. Market (La Rochelle)",
    country: "France (Global)",
    type: "Market Pitch",
    status: "Open",
    sector: "Documentary",
    value: "Co-Pro Financing",
    deadline: "Mar 14, 2026 (Est)",
    description: "International call for documentary projects to pitch to global broadcasters/streamers. High IP export potential.",
    eligibility: "Projects in advanced development with a trailer.",
    strategicFit: "Excellent for science, history, or nature docs. Grants access to EU broadcasters like ARTE and ZDF.",
    portalUrl: "https://www.sunnysideofthedoc.com/",
    requirements: [
      "2-Minute Teaser / Trailer",
      "Treatment (10-15 pages)",
      "Budget (in Euros)",
      "Confirmed access to subject matter"
    ],
    businessAction: [
      "Edit a high-quality teaser trailer.",
      "Create a budget in Euros (€).",
      "Sign location access agreements."
    ],
    tags: ["International", "Documentary", "Market"]
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('search'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null); 
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'SYSTEM ONLINE: Connected to Pan-African Funding Database (Snapshot: Feb 08, 2026). Try asking: "Analyze DFM", "What are the market trends?", or "Show me closed grants in Kenya".' }
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
    setChatMessages(prev => [...prev, userMsg]);
    
    // Simulate AI Response with REAL Context & Analysis Logic
    setTimeout(() => {
      let responseText = "";
      const lowerInput = chatInput.toLowerCase();
      
      // 1. Direct Opportunity Lookup (e.g., "Analyze DFM")
      const matchedOp = LIVE_OPPORTUNITIES.find(op => 
        lowerInput.includes(op.title.toLowerCase()) || 
        (op.source && lowerInput.includes(op.source.toLowerCase())) ||
        (op.id.toString() === lowerInput)
      );

      // 2. Market/Trend Analysis Request
      const isTrendRequest = lowerInput.includes('trend') || lowerInput.includes('analysis') || lowerInput.includes('market') || lowerInput.includes('report');

      if (matchedOp && (lowerInput.includes('analyze') || lowerInput.includes('tell me about') || lowerInput.includes('eligibility') || isTrendRequest === false)) {
         responseText = `**INTELLIGENCE REPORT: ${matchedOp.title}**\n\n**• Strategic Fit:** ${matchedOp.strategicFit}\n**• Eligibility:** ${matchedOp.eligibility}\n**• Financial Value:** ${matchedOp.value}\n**• Status:** ${matchedOp.status} (Deadline: ${matchedOp.deadline})`;
      } 
      else if (isTrendRequest) {
         const openCount = LIVE_OPPORTUNITIES.filter(op => op.status === 'Open' || op.status === 'Urgent').length;
         const urgentCount = LIVE_OPPORTUNITIES.filter(op => op.status === 'Urgent').length;
         const closedCount = LIVE_OPPORTUNITIES.filter(op => op.status === 'Closed').length;
         
         responseText = `**MARKET ANALYSIS (FEB 08 2026):**\n\n**• Active Liquidity:** There are ${openCount} funding lines currently active.\n**• Regional Heatmap:** High activity in East Africa (Kenya) and Pan-African markets. West Africa is leaning towards commercial debt funding.\n**• Risk Alert:** ${urgentCount} high-value opportunities are closing within 20 days (DFM, KZN, KFC).\n**• Historical Data:** ${closedCount} major funds have recently closed, indicating we are entering a new cycle.`;
      }
      // 3. Region/Topic Specific Queries
      else if (lowerInput.includes('closed') || lowerInput.includes('missed')) {
        responseText = "I've pulled the archives. You recently missed the **Mzansi Golden Economy (SA)** deadline on Jan 30 and **AFRIFF (Nigeria)** on Jan 15. The **Kalasha Market (Kenya)** closed back in December.";
      } else if (lowerInput.includes('soon') || lowerInput.includes('urgent') || lowerInput.includes('deadline')) {
        responseText = "URGENT ACTION REQUIRED:\n\n1. **Durban FilmMart (DFM)** - Closes Feb 20 (12 days left).\n2. **KZN Film Fund** - Closes Feb 28.\n3. **Kenya Film Commission (Empowerment)** - Closes Feb 28.";
      } else if (lowerInput.includes('kenya') || lowerInput.includes('east africa')) {
        responseText = "Kenya Analysis: The **Film Empowerment Program** is your key open grant (Closing Feb 28). The Kalasha Market cycle has closed. Consider Pan-African options like DFM if you have a feature in development.";
      } else if (lowerInput.includes('nigeria') || lowerInput.includes('west africa')) {
        responseText = "Nigeria Analysis: The market is currently focused on commercial growth. The **BoI NollyFund** (Loan) is open for projects with distribution. AFRIFF submissions have closed.";
      } else {
        responseText = "I can provide detailed analysis. Try asking:\n• 'Analyze [Fund Name]'\n• 'What are the market trends?'\n• 'Show urgent deadlines'";
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
        op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(op => {
        if (selectedFilter === 'Open') return op.status === 'Open' || op.status === 'Forecast' || op.status === 'Urgent';
        if (selectedFilter === 'Closed') return op.status === 'Closed';
        if (selectedFilter === 'Urgent') return op.status === 'Urgent';
        return op.tags.includes(selectedFilter) || op.sector === selectedFilter || op.country === selectedFilter;
      });
    }

    setOpportunities(filtered);
  }, [searchQuery, selectedFilter]);

  const handleAnalyzeClick = (op) => {
    setSelectedOpportunity(op);
    setActiveTab('search'); 
  };

  const handleBackToFeed = () => {
    setSelectedOpportunity(null);
  };


  // --- COMPONENTS ---

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setSelectedOpportunity(null); }}
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
    else if (status === "Forecast") styles = "bg-blue-500/20 text-blue-400 border-blue-500/50";
    else if (status === "Closed") styles = "bg-slate-700/50 text-slate-400 border-slate-600";
    else if (status === "Urgent") styles = "bg-amber-500/20 text-amber-400 border-amber-500/50";
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded border flex items-center gap-1 ${styles}`}>
        {status === 'Urgent' && <Timer size={10} />}
        {status === 'Closed' ? 'Closed' : status}
      </span>
    );
  };

  const StatCard = ({ label, value, trend, icon: Icon, color }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
        <span className={`text-sm font-medium ${trend.includes('Closed') || trend.includes('Urgent') ? 'text-amber-400' : 'text-emerald-400'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  const OpportunityCard = ({ op }) => (
    <div className={`bg-slate-800 rounded-xl border p-6 hover:shadow-xl transition-all duration-300 group flex flex-col h-full ${op.status === 'Closed' ? 'border-slate-700 opacity-60 bg-slate-800/50' : op.status === 'Urgent' ? 'border-amber-500/30' : 'border-slate-600 hover:border-blue-500'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex space-x-2 mb-2">
            <StatusBadge status={op.status} />
            <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded border border-slate-600">
              {op.country}
            </span>
          </div>
          <h3 className={`text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2 h-14 ${op.status === 'Closed' ? 'text-slate-400' : 'text-white'}`}>{op.title}</h3>
          <p className="text-slate-400 text-sm flex items-center mt-1">
            <Building2 size={14} className="mr-1" /> {op.source}
          </p>
        </div>
      </div>
      <div className="mb-4">
          <p className={`font-bold text-lg ${op.status === 'Closed' ? 'text-slate-500' : 'text-emerald-400'}`}>{op.value}</p>
          <p className={`text-xs flex items-center mt-1 ${op.status === 'Closed' ? 'text-slate-500' : op.status === 'Urgent' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
             <Clock size={12} className="mr-1" /> {op.deadline}
          </p>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed border-t border-slate-700/50 pt-4 flex-grow">
        {op.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {op.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full border border-slate-600">
            #{tag}
          </span>
        ))}
      </div>
      <button 
        onClick={() => handleAnalyzeClick(op)}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
        op.status === 'Closed' 
          ? 'bg-slate-800 border border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300' 
          : 'bg-blue-600 hover:bg-blue-500 text-white'
      }`}>
        {op.status === 'Closed' ? 'View Archive Data' : 'Analyze Opportunity'}
      </button>
    </div>
  );

  const DetailedView = ({ op }) => (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Detail Header */}
      <div className="bg-slate-800 p-6 border-b border-slate-700">
        <button onClick={handleBackToFeed} className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Feed
        </button>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <StatusBadge status={op.status} />
              <span className="text-slate-400 text-sm font-medium flex items-center">
                <MapPin size={14} className="mr-1 text-blue-400" /> {op.country}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{op.title}</h2>
            <div className="flex flex-wrap gap-2">
              {op.tags.map(tag => (
                 <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full border border-slate-600">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center min-w-[150px]">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Max Value</p>
            <p className={`text-2xl font-bold ${op.status === 'Closed' ? 'text-slate-400' : 'text-emerald-400'}`}>{op.value}</p>
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-blue-500" /> Scope of Work
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg">{op.description}</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <CheckCircle size={18} className="mr-2 text-emerald-500" /> Eligibility Criteria
            </h3>
            <p className="text-slate-300 leading-relaxed">{op.eligibility}</p>
          </section>

          {/* New Section: Requirements Checklist */}
          {op.requirements && (
            <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <ClipboardCheck size={18} className="mr-2 text-indigo-400" /> Document Checklist
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {op.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* New Section: Business Actions */}
          {op.businessAction && (
            <section className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
               <h3 className="text-lg font-bold text-emerald-100 mb-4 flex items-center">
                <Briefcase size={18} className="mr-2 text-emerald-400" /> Business Action Plan
              </h3>
              <ul className="space-y-3">
                {op.businessAction.map((action, idx) => (
                  <li key={idx} className="flex items-start text-emerald-200/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </div>
                    {action}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="bg-blue-900/10 p-6 rounded-xl border border-blue-500/20">
             <h3 className="text-lg font-bold text-blue-100 mb-3 flex items-center">
              <Lightbulb size={18} className="mr-2 text-blue-400" /> AI Strategic Analysis
            </h3>
            <p className="text-blue-200 leading-relaxed italic">"{op.strategicFit}"</p>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Key Dates</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                <span className={`font-medium ${op.status === 'Open' ? 'text-emerald-400' : op.status === 'Urgent' ? 'text-amber-400' : 'text-slate-400'}`}>{op.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Deadline</span>
                <span className={`font-medium ${op.status === 'Urgent' ? 'text-amber-400 font-bold' : 'text-white'}`}>{op.deadline}</span>
              </div>
            </div>
          </div>

           {op.status === 'Closed' ? (
             <button disabled className="w-full py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center transition-all bg-slate-700 text-slate-500 cursor-not-allowed">
               Applications Closed
             </button>
           ) : (
             <a 
               href={op.portalUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center transition-all bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02]"
             >
               View Application Portal <ExternalLink size={18} className="ml-2" />
             </a>
           )}
           
           <div className="text-center">
             <button className="text-sm text-slate-500 hover:text-white flex items-center justify-center w-full">
               <AlertCircle size={14} className="mr-1" /> Report Incorrect Data
             </button>
           </div>
        </div>
      </div>
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
            {activeTab === 'search' && !selectedOpportunity && 'Opportunity Discovery'}
            {activeTab === 'search' && selectedOpportunity && 'Intelligence Report'}
            {activeTab === 'chat' && 'Investment Intelligence Bot'}
            {activeTab === 'saved' && 'Saved Assets'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-emerald-400">Live Snapshot: Feb 08, 2026</span>
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
                   <h4 className="text-amber-500 font-bold text-sm">Action Required: Closing Soon</h4>
                   <p className="text-slate-300 text-sm mt-1">
                     <span className="text-white font-semibold">DFM Projects</span> close Feb 20 (12 days). 
                     <span className="text-white font-semibold"> KZN</span> and <span className="text-white font-semibold">Kenya (KFC)</span> grants close Feb 28.
                   </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Closing Soon" value="3" trend="Urgent Action" icon={Timer} color="text-amber-500 bg-amber-500" />
                <StatCard label="Active Opportunities" value="14" trend="Updated" icon={FileText} color="text-blue-500 bg-blue-500" />
                <StatCard label="Closed Archives" value="3" trend="MGE/Kalasha/AFRIFF" icon={Building2} color="text-slate-500 bg-slate-500" />
                <StatCard label="Next Major Cycle" value="Feb 17" trend="SA NFVF Cycle 1" icon={Calendar} color="text-emerald-500 bg-emerald-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
                <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent"></div>
                   <h3 className="text-lg font-bold text-white mb-2 z-10">Regional Activity Map</h3>
                   <p className="text-slate-400 text-center max-w-md z-10">
                     Funding activity is high in <span className="text-blue-400 font-semibold">East Africa</span> (Kenya) and <span className="text-blue-400 font-semibold">Southern Africa</span> (Gauteng/KZN). 
                     West Africa (Nigeria) is focused on commercial loans.
                   </p>
                   <div className="mt-8 flex space-x-8 z-10">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400">OPEN</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Kenya (KFC)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-400">URGENT</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">DFM Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-500">CLOSED</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">MGE / AFRIFF</div>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Live Alerts (Feb 2026)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
                       <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                       <div>
                         <p className="text-sm text-slate-200 font-medium">DFM Projects</p>
                         <p className="text-xs text-slate-500">Closing Feb 20 • 12 Days Left</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                       <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                       <div>
                         <p className="text-sm text-slate-200 font-medium">KFC Film Program</p>
                         <p className="text-xs text-slate-500">Kenya Only • Closes Feb 28</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: OPPORTUNITY FEED (List or Detail) */}
          {activeTab === 'search' && !selectedOpportunity && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search countries, grants, or sectors..." 
                    className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {['All', 'Urgent', 'Closed', 'South Africa', 'Kenya', 'Nigeria', 'Pan-African'].map(filter => (
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

          {/* VIEW: DETAIL VIEW (When an opportunity is selected) */}
          {activeTab === 'search' && selectedOpportunity && (
            <DetailedView op={selectedOpportunity} />
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
                       <ShieldCheck size={10} className="mr-1" /> Data: Feb 08 2026
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
                      <p className="text-sm leading-relaxed" style={{whiteSpace: 'pre-wrap'}}>{msg.content}</p>
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
                    placeholder="Ask 'Analyze DFM' or 'Show trends'..."
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