/**
 * THE NEXT LAP  Premium Website (Refactored for Subtle Cyberpunk / Editorial Layout)
 *
 * npm install framer-motion lucide-react
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useInView,
} from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  Users,
  BookOpen,
  Globe,
  Smartphone,
  Award,
  TrendingUp,
  Heart,
  Brain,
  Home,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
  Plus,
  Menu,
  X,
  Target,
  Sparkles,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  CONSTANTS & DATA (From Content Brief)
// ─────────────────────────────────────────────────────────────────────────────

const WA_LINK =
  'https://wa.me/918284997777?text=Hi%2C%20I%27m%20interested%20in%20The%20NEXT%20LAP';

const CITIES = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune',
  'Jaipur', 'Lucknow', 'Ahmedabad', 'Chandigarh', 'Indore',
  'Bhopal', 'Surat', 'Nagpur',
];

const AUDIENCES = [
  {
    id: 'seniors',
    label: 'Senior Citizens & Retirees',
    icon: Heart,
    desc: 'Use AI to manage health records, stay connected with family, learn new hobbies, and keep your mind sharp. Built for 60+.',
    featured: true,
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'homemakers',
    label: 'Homemakers',
    icon: Home,
    desc: 'Meal planning, family budgeting, tutoring your children, even running a home business, all with AI as your assistant.',
    featured: true,
    accent: 'var(--accent)',
  },
  {
    id: 'msme',
    label: 'MSME Owners',
    icon: TrendingUp,
    desc: 'Pricing strategy, profit systems, and AI automation, the gap between where you are and ₹1 Crore.',
    featured: false,
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'students',
    label: 'Students',
    icon: GraduationCap,
    desc: "AI as a career skill and business thinking, a head start most peers don't have yet.",
    featured: false,
    accent: 'var(--accent)',
  },
  {
    id: 'women',
    label: 'Women Entrepreneurs',
    icon: Sparkles,
    desc: 'Your idea deserves a system, a strategy, and the right tools. Build your business, your way.',
    featured: false,
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'professionals',
    label: 'Professionals',
    icon: Briefcase,
    desc: 'Stay ahead. Add AI to your skill set before your industry demands it.',
    featured: false,
    accent: 'var(--accent)',
  },
  {
    id: 'teachers',
    label: 'Teachers & Educators',
    icon: BookOpen,
    desc: 'Bring AI literacy into your classroom. Prepare students for tomorrow, starting today.',
    featured: false,
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'career',
    label: 'Career Changers',
    icon: ArrowUpRight,
    desc: 'Pivot with purpose. New skills, real income, and a clear path forward.',
    featured: false,
    accent: 'var(--accent)',
  },
];

const PROGRAMS = [
  {
    id: 'prompt',
    title: 'Prompt Engineering',
    tagline: 'Talk to AI. Get Results.',
    desc: 'Learn to get exactly what you want from AI tools. From writing content to solving complex business tasks, zero coding required.',
    duration: '2 Weeks',
    format: 'Online + Offline',
    level: 'Beginner',
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'scale',
    title: 'Scale to ₹1 Crore',
    tagline: 'For the Serious Business Owner.',
    desc: 'A structured roadmap for MSME owners: pricing strategy, profit systems, and AI automation to grow your revenue.',
    duration: '6 Weeks',
    format: 'Cohort-Based',
    level: 'Intermediate',
    accent: 'var(--accent)',
  },
  {
    id: 'ailife',
    title: 'AI for Life',
    tagline: 'Everyday AI. For Everyone.',
    desc: 'Built for senior citizens, homemakers, and first-time users. Use AI to simplify daily life, no tech background needed.',
    duration: '3 Weeks',
    format: 'In-Person',
    level: 'All Levels',
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'teachers',
    title: 'AI Literacy for Teachers',
    tagline: 'Teach Tomorrow, Today.',
    desc: 'Help educators integrate AI into lesson planning, student engagement, and classroom innovation across India.',
    duration: '4 Weeks',
    format: 'Hybrid',
    level: 'Educators',
    accent: 'var(--accent)',
  },
  {
    id: 'founder',
    title: "Founder's Focus",
    tagline: 'From Idea to Execution.',
    desc: 'For first-time founders and solopreneurs. Build your business model, validate your idea, and launch with confidence.',
    duration: '8 Weeks',
    format: 'Cohort-Based',
    level: 'Beginner–Mid',
    accent: 'var(--neon-cyan)',
  },
  {
    id: 'streedhan',
    title: 'StreeDHAN',
    tagline: 'Her Business. Her Rules.',
    desc: 'A women-first program combining financial literacy, digital skills, and AI tools. Built in India, for Indian women.',
    duration: '4 Weeks',
    format: 'Women-Only Cohort',
    level: 'All Levels',
    accent: 'var(--accent)',
  },
];

const PILLARS = [
  { 
    icon: Globe,       
    title: 'Built for India',      
    desc: 'Hindi-first content. Indian case studies. Real scenarios from Tier 1, 2, and 3 cities, not Silicon Valley.',
    img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop'
  },
  { 
    icon: Target,      
    title: 'Outcome First',        
    desc: 'Every session ends with something you can use. No fluff, no filler, no theory without application.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
  },
  { 
    icon: Brain,       
    title: 'AI for All Ages',      
    desc: 'From 16 to 70+, our curriculum adapts to your context not the other way around.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop'
  },
  { 
    icon: Smartphone,  
    title: 'Mobile-First',         
    desc: 'All content runs perfectly on a ₹12,000 Android. No laptop, no camera, no desktop required.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop'
  },
  { 
    icon: MapPin,      
    title: '13-City Community',    
    desc: 'Learn alongside peers from your own city. Local cohorts, WhatsApp groups, city-specific meetups.',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop'
  },
  { 
    icon: Award,       
    title: 'Practitioner-Led',     
    desc: 'Every trainer has run a business, launched a product, or deployed AI in real life, not just taught it.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop'
  },
];

const FAQS = [
  {
    q: 'Do I need any prior knowledge or a degree to join?',
    a: 'Absolutely not. Most of our learners start from zero. Our programs are designed for people who have never touched a business course or AI tool before. If you can use WhatsApp, you can do this.',
  },
  {
    q: 'Are the programs available in Hindi?',
    a: "Yes. Several programs are delivered in Hindi or bilingual (Hindi + English) format. When you WhatsApp us, tell us your language preference and we'll match you to the right cohort.",
  },
  {
    q: "I'm a senior citizen. Is this really for me?",
    a: "Especially for you. We have a dedicated program, AI for Life, built with senior citizens in mind. Slower pace, no jargon, in-person format, and trainers who understand your context and your comfort level.",
  },
  {
    q: 'Online or offline, how do the programs actually run?',
    a: "Both, depending on the program. Some are fully online (runs on your phone), some are in-person in your city, and some are hybrid. We'll match you based on what's available near you.",
  },
  {
    q: 'How much do the programs cost?',
    a: "Pricing varies by program, and we keep them accessible because financial gatekeeping is exactly what we're fighting. WhatsApp us for current pricing, payment plans, and any scholarships available.",
  },
  {
    q: 'Which cities are you active in right now?',
    a: "We're live in 13+ cities: Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Jaipur, Lucknow, Ahmedabad, Chandigarh, Indore, Bhopal, Surat, and Nagpur, with more added every quarter.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  HOOKS & UTILS
// ─────────────────────────────────────────────────────────────────────────────

// Premium Easing Curve
const customEase = [0.22, 1, 0.36, 1]; 

function useCounter(end, duration = 2200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - p, 5);
      setVal(Math.floor(easeOut * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, active]);
  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL STYLES (CYBERPUNK / HIGH-END DARK OVERHAUL)
// ─────────────────────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:          #000000; /* Pure deep black */
      --surface:     #050505; /* Barely off-black */
      --surface2:    #0a0a0a;
      --text:        #FFFFFF; /* Pure crisp white */
      --muted:       #888888;
      --dim:         #333333;
      --accent:      #FF5A1F; /* Brand Orange */
      --neon-cyan:   #00F3FF; /* Cyberpunk contrast */
      --border:      rgba(255,255,255,0.06);
      --border-md:   rgba(255,255,255,0.12);
      --font-display:'Playfair Display', serif; 
      --font-body:   'Plus Jakarta Sans', sans-serif; 
    }

    html { scroll-behavior: smooth; background: var(--bg); }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      font-weight: 400;
      line-height: 1.6;
      overflow-x: hidden;
      cursor: none;
      -webkit-font-smoothing: antialiased;
    }

    @media (max-width: 768px) { body { cursor: auto; } }

    ::selection { background: var(--neon-cyan); color: #000; }

    h1, h2, h3, h4 {
      font-family: var(--font-display);
      font-weight: 500; 
      line-height: 1.1;
      letter-spacing: -0.02em; 
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: var(--font-body); cursor: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--dim); border-radius: 4px; }

    /* Subtle Cyberpunk Grid Background */
    .cyber-grid {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
      -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
      transform: perspective(500px) rotateX(60deg) translateY(-100px) scale(2);
      animation: gridMove 20s linear infinite;
    }

    @keyframes gridMove {
      0% { transform: perspective(500px) rotateX(60deg) translateY(0) scale(2); }
      100% { transform: perspective(500px) rotateX(60deg) translateY(50px) scale(2); }
    }

    /* Glitch / RGB Split effect for marquees and hovers */
    .glitch-hover:hover {
      text-shadow: 2px 0 var(--neon-cyan), -2px 0 var(--accent);
      transition: text-shadow 0.2s ease;
    }

    .grain-overlay {
      position: fixed; inset: 0; z-index: 9000; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.8;
      mix-blend-mode: overlay;
    }

    /* Utility */
    .sp { padding: 140px 60px; position: relative; z-index: 10; } 
    @media (max-width: 1024px) { .sp { padding: 100px 40px; } }
    @media (max-width: 768px) { .sp { padding: 80px 24px; } }

    /* Nav responsive */
    @media (max-width: 900px) {
      .nav-links { display: none !important; }
      .nav-burger { display: flex !important; }
    }
    @media (min-width: 901px) {
      .nav-burger { display: none !important; }
    }

    /* Grids */
    @media (max-width: 768px) {
      .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 1200px) {
      .audience-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
      .audience-featured { grid-column: span 1 !important; }
    }
    @media (max-width: 768px) {
      .audience-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    }
    @media (max-width: 1100px) {
      .programs-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
    }
    @media (max-width: 768px) {
      .programs-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    }
    @media (max-width: 1024px) {
      .method-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 768px) {
      .method-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 768px) {
      .steps-row { flex-direction: column !important; gap: 48px !important; }
      .step-item { text-align: left !important; padding: 0 !important; }
      .step-circle { margin-left: 0 !important; margin-right: auto !important; margin-bottom: 24px !important;}
      .step-connector { display: none !important; }
    }
    @media (max-width: 960px) {
      .founder-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
    }
    @media (max-width: 1024px) {
      .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 48px !important;}
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    }

    @keyframes breathe {
      0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 10px var(--neon-cyan); }
      50% { opacity: 0.6; transform: scale(0.85); box-shadow: 0 0 2px var(--neon-cyan); }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
//  MAGNETIC DOM CURSOR
// ─────────────────────────────────────────────────────────────────────────────

const Cursor = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const mv = (e) => setPos({ x: e.clientX, y: e.clientY });
    const mo = (e) =>
      setHovered(!!(e.target.closest('button') || e.target.closest('a') || e.target.closest('[data-cur]')));
    const md = () => setClicked(true);
    const mu = () => setClicked(false);
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', mo);
    window.addEventListener('mousedown', md);
    window.addEventListener('mouseup', mu);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseover', mo);
      window.removeEventListener('mousedown', md);
      window.removeEventListener('mouseup', mu);
    };
  }, []);

  const cfg = { stiffness: 400, damping: 30 };
  const rx = useSpring(pos.x, cfg);
  const ry = useSpring(pos.y, cfg);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%', background: 'var(--text)',
          boxShadow: '0 0 10px var(--text)',
          x: pos.x - 3, y: pos.y - 3,
        }}
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
          borderRadius: '50%', border: '1px solid var(--neon-cyan)',
          boxShadow: hovered ? '0 0 20px rgba(0, 243, 255, 0.4), inset 0 0 10px rgba(0, 243, 255, 0.2)' : 'none',
          x: rx, y: ry, translateX: '-50%', translateY: '-50%',
        }}
        animate={{ width: hovered ? 72 : 32, height: hovered ? 72 : 32, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING WHATSAPP
// ─────────────────────────────────────────────────────────────────────────────

const FloatingWA = () => (
  <motion.a
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, type: 'spring', stiffness: 280 }}
    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(37,211,102,0.8)' }}
    whileTap={{ scale: 0.95 }}
    aria-label="Chat on WhatsApp"
    style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 8000,
      width: 64, height: 64, borderRadius: '50%', background: '#25D366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(37,211,102,0.3)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}
  >
    <MessageCircle size={28} color="#fff" fill="#fff" />
  </motion.a>
);

// ─────────────────────────────────────────────────────────────────────────────
//  NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: "Who It's For", href: '#audience' },
    { label: 'Programs', href: '#programs' },
    { label: 'Our Method', href: '#method' },
    { label: 'About', href: '#about' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: customEase }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
          padding: '24px 60px',
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
        }}
      >
        <a href="#" className="glitch-hover" style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 16, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>
          THE NEXT LAP
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="glitch-hover"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', color: 'var(--muted)', textTransform: 'uppercase', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'var(--text)', color: 'var(--bg)', padding: '12px 24px',
              borderRadius: 40, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none',
            }}
          >
            <MessageCircle size={14} /> Contact
          </motion.a>
          <button
            className="nav-burger"
            onClick={() => setOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', padding: 4, display: 'none' }}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: customEase }}
            style={{
              position: 'fixed', inset: 0, zIndex: 700, background: 'var(--bg)',
              display: 'flex', flexDirection: 'column', padding: '32px',
              borderLeft: '1px solid var(--neon-cyan)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 16, letterSpacing: '0.1em', color: 'var(--text)' }}>THE NEXT LAP</span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text)' }}>
                <X size={32} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, ease: customEase }}
                  className="glitch-hover"
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 400, fontStyle: 'italic',
                    padding: '20px 0', borderBottom: '1px solid var(--border)', lineHeight: 1, color: 'var(--text)'
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  MARQUEE
// ─────────────────────────────────────────────────────────────────────────────

const Marquee = () => {
  const items = [...CITIES, ...CITIES, ...CITIES, ...CITIES];
  return (
    <div
      style={{
        overflow: 'hidden', background: 'rgba(10,10,10,0.5)', padding: '16px 0',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(5px)', position: 'relative', zIndex: 10
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-25%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {items.map((city, i) => (
          <span
            key={i}
            className="glitch-hover"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '0 40px', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)',
              whiteSpace: 'nowrap', transition: 'color 0.2s'
            }}
          >
            <MapPin size={12} style={{ opacity: 0.8, color: 'var(--neon-cyan)' }} />
            {city}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────────────────

const StatCell = ({ value, suffix, label, start }) => {
  const n = useCounter(value, 2000, start);
  return (
    <div
      style={{
        padding: '40px 32px', background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(10px)',
        borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, lineHeight: 1, color: 'var(--text)' }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 12, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 12, fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 0.5], [0, -120]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '180px 60px 100px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background Cyber Grid */}
      <div className="cyber-grid" />

      {/* Cyber Glows */}
      <motion.div
        style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none', y: yBg,
        }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '-20%', left: '-10%', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(255, 90, 31, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: customEase }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 48,
          }}
        >
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-cyan)',
              animation: 'breathe 2s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--neon-cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
            India's Skill-First Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: customEase }}
          style={{
            fontSize: 'clamp(52px, 8vw, 120px)',
            fontWeight: 400, lineHeight: '1', letterSpacing: '-0.02em',
            marginBottom: 48, maxWidth: 1100, color: 'var(--text)'
          }}
        >
          You Don't Need<br />
          a Degree to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--neon-cyan)', textShadow: '0 0 20px rgba(0,243,255,0.3)', fontWeight: 500 }}>Build,</em><br />
          <span style={{ color: 'var(--accent)', textShadow: '0 0 20px rgba(255,90,31,0.3)' }}>Grow,</span> or Simplify<br />
          Your Life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: customEase }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)',
            maxWidth: 640, lineHeight: 1.8, marginBottom: 64, fontWeight: 400,
          }}
        >
          The NEXT LAP teaches business skills and AI to anyone ready to start
          something, scale something, or just make everyday life easier, at any
          age, from any city in India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
          style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 100 }}
        >
          <motion.a
            href="#programs"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 90, 31, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'var(--accent)', color: '#fff',
              padding: '18px 40px', borderRadius: 4, 
              fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: 12,
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            Explore Programs <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'transparent', color: 'var(--text)',
              padding: '18px 40px', borderRadius: 4, border: '1px solid var(--border-md)',
              fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: 12,
              transition: 'border-color 0.3s, color 0.3s'
            }}
          >
            <MessageCircle size={16} /> WhatsApp Us
          </motion.a>
        </motion.div>

        <motion.div
          className="stats-strip"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: customEase }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)', background: 'rgba(5,5,5,0.4)'
          }}
        >
          <StatCell value={13} suffix="+" label="Cities in India" start={inView} />
          <StatCell value={4000} suffix="+" label="People Trained" start={inView} />
          <div style={{ padding: '40px 32px', background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(10px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, lineHeight: 1, color: 'var(--text)' }}>16–70+</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 12, fontWeight: 600 }}>All Ages Welcome</div>
          </div>
          <StatCell value={6} suffix="" label="Active Programs" start={inView} />
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIENCE
// ─────────────────────────────────────────────────────────────────────────────

const AudienceCard = ({ a }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = a.icon;
  const isCyan = a.accent === 'var(--neon-cyan)';
  const glowColor = isCyan ? 'rgba(0,243,255,0.15)' : 'rgba(255,90,31,0.15)';

  return (
    <motion.div
      ref={ref}
      className={a.featured ? 'audience-featured' : ''}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: customEase }}
      whileHover={{ y: -8, boxShadow: `0 10px 30px ${glowColor}`, borderColor: a.accent }}
      data-cur
      style={{
        gridColumn: a.featured ? 'span 2' : 'span 1',
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: 12, padding: a.featured ? '56px 48px' : '40px 32px',
        display: 'flex', flexDirection: 'column', gap: 24,
        transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
        position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${a.accent}, transparent)`, opacity: a.featured ? 0.5 : 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 8,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid var(--border)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon size={22} color={a.accent} style={{ filter: `drop-shadow(0 0 8px ${a.accent})` }} />
        </div>
        {a.featured && (
          <span
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: a.accent, border: `1px solid ${a.accent}`,
              padding: '6px 16px', borderRadius: 4,
              boxShadow: `inset 0 0 8px ${glowColor}`
            }}
          >
            Priority
          </span>
        )}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)', fontSize: a.featured ? 32 : 24,
            fontWeight: 500, lineHeight: 1.15, marginBottom: 16, color: 'var(--text)'
          }}
        >
          {a.label}
        </h3>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 400 }}>{a.desc}</p>
      </div>
      <a
        href={WA_LINK}
        style={{
          fontSize: 13, color: a.accent, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16,
          transition: 'gap 0.3s', textShadow: `0 0 10px ${glowColor}`
        }}
      >
        Learn More <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

const Audience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="audience" className="sp" style={{ maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: customEase }}
        style={{ marginBottom: 80 }}
      >
        <div style={{ fontSize: 12, color: 'var(--neon-cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
          Zero Gatekeeping
        </div>
        <h2 style={{ fontSize: 'clamp(44px, 6vw, 88px)', letterSpacing: '-0.02em', lineHeight: 1, maxWidth: 800 }}>
          If You're Curious,<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' }}>You Belong Here.</em>
        </h2>
      </motion.div>

      <div
        className="audience-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, 
        }}
      >
        {AUDIENCES.map((a) => (
          <AudienceCard key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────

const ProgramCard = ({ p, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const isCyan = p.accent === 'var(--neon-cyan)';
  const glowColor = isCyan ? 'rgba(0,243,255,0.15)' : 'rgba(255,90,31,0.15)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
      whileHover={{ y: -8, boxShadow: `0 10px 30px ${glowColor}`, borderColor: p.accent }}
      data-cur
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '48px 40px', display: 'flex', flexDirection: 'column',
        gap: 24, position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: p.accent, border: `1px solid var(--border)`, padding: '6px 14px', borderRadius: 4,
          }}
        >
          {p.level}
        </span>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{p.duration}</span>
      </div>

      <div style={{ flex: 1, marginTop: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, lineHeight: 1.1, marginBottom: 12, color: 'var(--text)' }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 14, color: p.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20, textShadow: `0 0 10px ${glowColor}` }}>{p.tagline}</p>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 400 }}>{p.desc}</p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, backgroundColor: p.accent, color: '#000' }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'transparent', color: p.accent, border: `1px solid ${p.accent}`,
            padding: '14px 24px', borderRadius: 4, fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            display: 'inline-flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center',
            transition: 'background 0.3s, color 0.3s'
          }}
        >
          <MessageCircle size={14} /> Enroll
        </motion.a>
      </div>
    </motion.div>
  );
};

const Programs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="programs" style={{ background: 'var(--surface2)', padding: '140px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: customEase }}
          style={{ marginBottom: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
              What We Teach
            </div>
            <h2 style={{ fontSize: 'clamp(44px,6vw,88px)', letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text)' }}>
              6 Programs.<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' }}>One Purpose.</em>
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 420, lineHeight: 1.6, fontWeight: 400 }}>
            Each program is built around a single outcome. No theory without application, no filler, no wasted time.
          </p>
        </motion.div>

        <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  METHOD
// ─────────────────────────────────────────────────────────────────────────────

const PillarCard = ({ pillar, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = pillar.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.1, ease: customEase } }
      }}
      data-cur
      style={{
        background: 'var(--surface)',
        cursor: 'default',
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden', 
      }}
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'var(--surface2)',
          zIndex: 0
        }}
      />

      <div style={{ height: 240, width: '100%', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <motion.img 
          src={pillar.img}
          alt={pillar.title}
          variants={{
            hidden: { filter: 'grayscale(100%) brightness(0.3) contrast(1.2)', scale: 1 },
            visible: { filter: 'grayscale(100%) brightness(0.3) contrast(1.2)', scale: 1 },
            hover: { filter: 'grayscale(50%) brightness(0.6) contrast(1.2)', scale: 1.08 }
          }}
          transition={{ duration: 0.7, ease: customEase }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'luminosity' }}
        />
        
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 10%, var(--surface) 100%)' }} />
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 10%, var(--surface2) 100%)' }} 
        />
        
        <div style={{ position: 'absolute', top: 32, right: 32, fontSize: 13, color: 'var(--neon-cyan)', letterSpacing: '0.15em', fontWeight: 600, fontFamily: 'var(--font-display)', fontStyle: 'italic', zIndex: 2 }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div style={{ padding: '0px 48px 56px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        
        <motion.div
          variants={{
            hidden: { borderColor: 'var(--border)', y: 0, boxShadow: 'none' },
            visible: { borderColor: 'var(--border)', y: 0, boxShadow: 'none' },
            hover: { borderColor: 'var(--neon-cyan)', y: -2, boxShadow: '0 0 15px rgba(0,243,255,0.3)' }
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: 56, height: 56, borderRadius: 8, background: 'var(--surface)',
            border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginTop: '-28px', marginBottom: 32,
            position: 'relative', zIndex: 10,
          }}
        >
          <Icon size={24} color="var(--text)" />
        </motion.div>
        
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>
          {pillar.title}
        </h3>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, fontWeight: 400 }}>{pillar.desc}</p>
      </div>
    </motion.div>
  );
};

const Method = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="method" className="sp" style={{ maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: customEase }}
        style={{ marginBottom: 80 }}
      >
        <div style={{ fontSize: 12, color: 'var(--neon-cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
          The Method
        </div>
        <h2 style={{ fontSize: 'clamp(44px,6vw,88px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          Why This Works<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' }}>When Others Don't.</em>
        </h2>
      </motion.div>

      <div
        className="method-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden',
        }}
      >
        {PILLARS.map((p, i) => (
          <PillarCard key={i} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Find Your Path',
    desc: "Tell us who you are, student, homemaker, business owner, retiree. We'll match you to the program that fits your life.",
    cta: 'Take the Quiz',
  },
  {
    num: '02',
    title: 'Show Up & Learn',
    desc: 'Live sessions, real Indian examples, Hindi or English, on your phone. No prerequisites. No complicated tech. Just show up.',
    cta: 'See the Schedule',
  },
  {
    num: '03',
    title: 'Use It & Grow',
    desc: "Every session gives you something you can use the next morning. Build your business, simplify your life, the results are real.",
    cta: 'See Student Stories',
  },
];

const StepItem = ({ step, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const align = i === 2 ? 'right' : i === 1 ? 'center' : 'left';

  return (
    <motion.div
      ref={ref}
      className="step-item"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: i * 0.2, ease: customEase }}
      style={{ flex: 1, padding: '0 40px', textAlign: align }}
    >
      <div
        className="step-circle"
        style={{
          width: 88, height: 88, borderRadius: '50%',
          background: i === 1 ? 'var(--neon-cyan)' : 'var(--surface)',
          border: i === 1 ? 'none' : '1px solid var(--border)',
          boxShadow: i === 1 ? '0 0 20px rgba(0,243,255,0.4)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40,
          marginLeft: i === 2 ? 'auto' : i === 1 ? 'auto' : 0,
          marginRight: i === 0 ? 'auto' : i === 1 ? 'auto' : 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, fontWeight: 500, color: i === 1 ? '#000' : 'var(--muted)' }}>
          {step.num}
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, marginBottom: 20, lineHeight: 1.1 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24, fontWeight: 400 }}>{step.desc}</p>
      <a href={WA_LINK} style={{ fontSize: 13, color: 'var(--neon-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {step.cta} <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--surface2)', padding: '140px 0', borderTop: '1px solid var(--border)' }}>
      <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: customEase }}
          style={{ marginBottom: 100, textAlign: 'center' }}
        >
          <div style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
            The Process
          </div>
          <h2 style={{ fontSize: 'clamp(44px,6vw,88px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            How It Works.<br /><em style={{ fontStyle: 'italic', color: 'var(--muted)', fontWeight: 400 }}>Three steps.</em>
          </h2>
        </motion.div>

        <div className="steps-row" style={{ display: 'flex', position: 'relative' }}>
          <div
            className="step-connector"
            style={{
              position: 'absolute', top: 44, left: '16%', right: '16%', height: 1,
              background: 'linear-gradient(to right, transparent, var(--neon-cyan), var(--neon-cyan), transparent)',
              opacity: 0.3
            }}
          />
          {steps.map((s, i) => (
            <StepItem key={i} step={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FOUNDER
// ─────────────────────────────────────────────────────────────────────────────

const Founder = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" className="sp" style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 100, alignItems: 'center' }}>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: customEase }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 4, aspectRatio: '3/4', overflow: 'hidden', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}
          >
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--surface2) 0%, var(--bg) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <span style={{fontFamily: 'var(--font-display)', fontSize: 120, fontStyle: 'italic', color: 'rgba(255,255,255,0.05)'}}>HR</span>
            </div>
            
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 40px',
                background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500 }}>Himja Rana</div>
              <div style={{ fontSize: 13, color: 'var(--neon-cyan)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Founder, The NEXT LAP</div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0], boxShadow: ['0 0 10px rgba(255,90,31,0.2)', '0 0 20px rgba(255,90,31,0.5)', '0 0 10px rgba(255,90,31,0.2)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: -24, right: -24,
              background: 'var(--accent)', color: '#000',
              padding: '16px 24px', borderRadius: 4,
              fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            4,000+ Lives Changed
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
        >
          <div style={{ fontSize: 12, color: 'var(--neon-cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
            The Founder
          </div>
          <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 48 }}>
            From Community Builder to <br/><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' }}>Skill Architect.</em>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { text: "Himja Rana didn't start The NEXT LAP in a boardroom. She started it inside a WhatsApp group of women who wanted to do more with their lives and didn't know where to begin.", bold: true },
              { text: "As the founder of BossLADIES, a grassroots community of women entrepreneurs across India, Himja saw the same pattern everywhere: brilliant, motivated people held back by a lack of structured, practical, affordable skills.", bold: false },
              { text: "The NEXT LAP is her answer to that gap. Not a coaching brand, not a motivational seminar, a real skills platform, built for India, delivered with warmth, and obsessed with one thing: outcomes.", bold: false },
            ].map(({ text, bold }, i) => (
              <p key={i} style={{ fontSize: 16, color: bold ? 'var(--text)' : 'var(--muted)', lineHeight: 1.7, fontWeight: bold ? 500 : 400 }}>
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────────────────────────────────────

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: customEase }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '32px 0', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 32, background: 'none', border: 'none', color: open ? 'var(--neon-cyan)' : 'var(--text)', textAlign: 'left',
          transition: 'color 0.3s'
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 500, lineHeight: 1.3 }}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: customEase }}
          style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: open ? 'var(--neon-cyan)' : 'var(--surface)',
            border: `1px solid ${open ? 'transparent' : 'var(--border)'}`,
            boxShadow: open ? '0 0 15px rgba(0,243,255,0.4)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          <Plus size={20} color={open ? '#000' : 'var(--text)'} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: customEase }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 40, fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 400, maxWidth: '90%' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section  id="faqs" style={{ background: 'var(--surface2)', padding: '140px 0', borderTop: '1px solid var(--border)' }}>
      <div className="sp" style={{ maxWidth: 960, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: customEase }}
          style={{ marginBottom: 80, textAlign: 'center' }}
        >
          <div style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>
            Got Questions?
          </div>
          <h2 style={{ fontSize: 'clamp(44px,6vw,88px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            The Answers<br /><em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' }}>Are Right Here.</em>
          </h2>
        </motion.div>

        <div>
          {FAQS.map((f, i) => (
            <FAQItem key={i} faq={f} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          style={{ marginTop: 80, textAlign: 'center' }}
        >
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 32, fontWeight: 400 }}>
            Still have questions? We're one message away.
          </p>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(37,211,102,0.6)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#25D366', color: '#fff',
              padding: '18px 40px', borderRadius: 4,
              fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            }}
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '100px 0 40px' }}>
    <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
      <div
        className="footer-grid"
        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 80, marginBottom: 100 }}
      >
        <div>
          <div className="glitch-hover" style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 18, marginBottom: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>
            THE NEXT LAP
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 32, maxWidth: 300, fontWeight: 400 }}>
            India's skill-first platform for business and AI education. For every Indian, at every age, in every city.
          </p>
          <a
            href={WA_LINK}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)',
              padding: '12px 24px', borderRadius: 4, fontSize: 12, fontWeight: 700, 
              textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'box-shadow 0.3s, background 0.3s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(0,243,255,0.4)'; e.currentTarget.style.background = 'rgba(0,243,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent'; }}
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 32 }}>
            Programs
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROGRAMS.map((p) => (
              <li key={p.id}>
                <a
                  href="#"
                  style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 400, transition: 'color 0.3s, text-shadow 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--text)'; e.target.style.textShadow = '0 0 8px rgba(255,255,255,0.4)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; e.target.style.textShadow = 'none'; }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--neon-cyan)', marginBottom: 32 }}>
            Ecosystem
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['BossLADIES Community', 'For Educators', 'For Corporates', 'City Partners', 'Become a Trainer', 'Blog'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 400, transition: 'color 0.3s, text-shadow 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--text)'; e.target.style.textShadow = '0 0 8px rgba(255,255,255,0.4)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; e.target.style.textShadow = 'none'; }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: 32 }}>
            Reach Us
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--dim)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Active Cities</div>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 400, lineHeight: 1.6 }}>
                {CITIES.slice(0, 5).join(' · ')} +&nbsp;more
              </p>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--dim)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>WhatsApp</div>
              <a href={WA_LINK} style={{ fontSize: 16, color: 'var(--neon-cyan)', fontWeight: 500, textShadow: '0 0 10px rgba(0,243,255,0.3)' }}>+91 8284997777</a>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--dim)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Hindi Support</div>
              <span style={{ fontSize: 15, color: 'var(--text)', fontWeight: 400 }}>हाँ, हम हिंदी में बात करते हैं</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)', paddingTop: 40,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24,
        }}
      >
        <p style={{ fontSize: 14, color: 'var(--dim)' }}>© 2026 The NEXT LAP. Built for India, by India.</p>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Privacy Policy', 'Terms of Use', 'Refund Policy'].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontSize: 14, color: 'var(--dim)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--muted)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--dim)')}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
//  SEO
// ─────────────────────────────────────────────────────────────────────────────

const SEOMeta = () => {
  useEffect(() => {
    document.title = 'The NEXT LAP – Business Skills & AI for Life | For Every Indian';
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('description', 'Learn business skills and AI for everyday life at The NEXT LAP. Programs for students, seniors, homemakers, teachers, entrepreneurs & MSME owners. Available across 13+ Indian cities.');
    setMeta('keywords', 'AI courses India, business skills India, AI for seniors, MSME training, women entrepreneur, prompt engineering India, Hindi AI course');
    setMeta('og:title', 'The NEXT LAP – Business Skills & AI for Life | For Every Indian');
    setMeta('og:description', 'India\'s skill-first platform. Practical AI and business programs for students, seniors, homemakers, and entrepreneurs across 13+ cities.');
  }, []);
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <GlobalStyles />
      <SEOMeta />
      <div className="grain-overlay" aria-hidden="true" />
      <Cursor />
      <FloatingWA />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Audience />
        <Programs />
        <Method />
        <HowItWorks />
        <Founder />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}