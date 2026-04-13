/**
 * THE NEXT LAP — Premium Website
 *
 * npm install framer-motion lucide-react
 *
 * Add to your index.html <head>:
 * <link rel="preconnect" href="https://fonts.googleapis.com" />
 * <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />
 *
 * Meta Title:  The NEXT LAP – Business Skills & AI for Life | For Every Indian
 * Meta Desc:   Learn business skills and AI for everyday life at The NEXT LAP.
 *              Programs for students, seniors, homemakers, teachers, entrepreneurs
 *              & MSME owners. Available across 13+ Indian cities.
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
  Zap,
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
//  CONSTANTS
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
    accent: 'var(--accent)',
  },
  {
    id: 'homemakers',
    label: 'Homemakers',
    icon: Home,
    desc: 'Meal planning, family budgeting, tutoring your children, even running a home business — all with AI as your assistant.',
    featured: true,
    accent: 'var(--gold)',
  },
  {
    id: 'msme',
    label: 'MSME Owners',
    icon: TrendingUp,
    desc: 'Pricing strategy, profit systems, and AI automation — the gap between where you are and ₹1 Crore.',
    featured: false,
    accent: 'var(--accent)',
  },
  {
    id: 'students',
    label: 'Students',
    icon: GraduationCap,
    desc: 'AI as a career skill and business thinking — a head start most peers don\'t have yet.',
    featured: false,
    accent: 'var(--gold)',
  },
  {
    id: 'women',
    label: 'Women Entrepreneurs',
    icon: Sparkles,
    desc: 'Your idea deserves a system, a strategy, and the right tools. Build your business, your way.',
    featured: false,
    accent: 'var(--accent)',
  },
  {
    id: 'professionals',
    label: 'Professionals',
    icon: Briefcase,
    desc: 'Stay ahead. Add AI to your skill set before your industry demands it.',
    featured: false,
    accent: 'var(--gold)',
  },
  {
    id: 'teachers',
    label: 'Teachers & Educators',
    icon: BookOpen,
    desc: 'Bring AI literacy into your classroom. Prepare students for tomorrow, starting today.',
    featured: false,
    accent: 'var(--accent)',
  },
  {
    id: 'career',
    label: 'Career Changers',
    icon: ArrowUpRight,
    desc: 'Pivot with purpose. New skills, real income, and a clear path forward.',
    featured: false,
    accent: 'var(--gold)',
  },
];

const PROGRAMS = [
  {
    id: 'prompt',
    title: 'Prompt Engineering',
    tagline: 'Talk to AI. Get Results.',
    desc: 'Learn to get exactly what you want from AI tools. From writing content to solving complex business tasks — zero coding required.',
    duration: '2 Weeks',
    format: 'Online + Offline',
    level: 'Beginner',
    accent: 'var(--accent)',
  },
  {
    id: 'scale',
    title: 'Scale to ₹1 Crore',
    tagline: 'For the Serious Business Owner.',
    desc: 'A structured roadmap for MSME owners: pricing strategy, profit systems, and AI automation to grow your revenue.',
    duration: '6 Weeks',
    format: 'Cohort-Based',
    level: 'Intermediate',
    accent: 'var(--gold)',
  },
  {
    id: 'ailife',
    title: 'AI for Life',
    tagline: 'Everyday AI. For Everyone.',
    desc: 'Built for senior citizens, homemakers, and first-time users. Use AI to simplify daily life — no tech background needed.',
    duration: '3 Weeks',
    format: 'In-Person',
    level: 'All Levels',
    accent: 'var(--accent)',
  },
  {
    id: 'teachers',
    title: 'AI Literacy for Teachers',
    tagline: 'Teach Tomorrow, Today.',
    desc: 'Help educators integrate AI into lesson planning, student engagement, and classroom innovation across India.',
    duration: '4 Weeks',
    format: 'Hybrid',
    level: 'Educators',
    accent: 'var(--gold)',
  },
  {
    id: 'founder',
    title: "Founder's Focus",
    tagline: 'From Idea to Execution.',
    desc: 'For first-time founders and solopreneurs. Build your business model, validate your idea, and launch with confidence.',
    duration: '8 Weeks',
    format: 'Cohort-Based',
    level: 'Beginner–Mid',
    accent: 'var(--accent)',
  },
  {
    id: 'streedhan',
    title: 'StreeDHAN',
    tagline: 'Her Business. Her Rules.',
    desc: 'A women-first program combining financial literacy, digital skills, and AI tools. Built in India, for Indian women.',
    duration: '4 Weeks',
    format: 'Women-Only Cohort',
    level: 'All Levels',
    accent: 'var(--gold)',
  },
];

const PILLARS = [
  { icon: Globe,       title: 'Built for India',       desc: 'Hindi-first content. Indian case studies. Real scenarios from Tier 1, 2, and 3 cities — not Silicon Valley.' },
  { icon: Target,      title: 'Outcome First',          desc: 'Every session ends with something you can use. No fluff, no filler, no theory without application.' },
  { icon: Brain,       title: 'AI for All Ages',        desc: 'From 16 to 70+, our curriculum adapts to your context — not the other way around.' },
  { icon: Smartphone,  title: 'Mobile-First',           desc: 'All content runs perfectly on a ₹12,000 Android. No laptop, no camera, no desktop required.' },
  { icon: MapPin,      title: '13-City Community',      desc: 'Learn alongside peers from your own city. Local cohorts, WhatsApp groups, city-specific meetups.' },
  { icon: Award,       title: 'Practitioner-Led',       desc: 'Every trainer has run a business, launched a product, or deployed AI in real life — not just taught it.' },
];

const FAQS = [
  {
    q: 'Do I need any prior knowledge or a degree to join?',
    a: 'Absolutely not. Most of our learners start from zero. Our programs are designed for people who have never touched a business course or AI tool before. If you can use WhatsApp, you can do this.',
  },
  {
    q: 'Are the programs available in Hindi?',
    a: 'Yes. Several programs are delivered in Hindi or bilingual (Hindi + English) format. When you WhatsApp us, tell us your language preference and we\'ll match you to the right cohort.',
  },
  {
    q: "I'm a senior citizen. Is this really for me?",
    a: "Especially for you. We have a dedicated program — AI for Life — built with senior citizens in mind. Slower pace, no jargon, in-person format, and trainers who understand your context and your comfort level.",
  },
  {
    q: 'Online or offline — how do the programs actually run?',
    a: "Both, depending on the program. Some are fully online (runs on your phone), some are in-person in your city, and some are hybrid. We'll match you based on what's available near you.",
  },
  {
    q: 'How much do the programs cost?',
    a: "Pricing varies by program, and we keep them accessible because financial gatekeeping is exactly what we're fighting. WhatsApp us for current pricing, payment plans, and any scholarships available.",
  },
  {
    q: 'Which cities are you active in right now?',
    a: 'We\'re live in 13+ cities: Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Jaipur, Lucknow, Ahmedabad, Chandigarh, Indore, Bhopal, Surat, and Nagpur — with more added every quarter.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useCounter(end, duration = 2200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, active]);
  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
//  GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:          #060603;
      --surface:     #0E0E09;
      --surface2:    #141410;
      --text:        #F0EBE0;
      --muted:       #7A7570;
      --dim:         #302E2A;
      --accent:      #FF4500;
      --gold:        #E8B84B;
      --green:       #25D366;
      --border:      rgba(240,235,224,0.07);
      --border-md:   rgba(240,235,224,0.14);
      --font-display:'Syne', sans-serif;
      --font-body:   'Plus Jakarta Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      font-weight: 400;
      line-height: 1.6;
      overflow-x: hidden;
      cursor: none;
    }

    @media (max-width: 768px) { body { cursor: auto; } }

    ::selection { background: var(--accent); color: #fff; }

    h1,h2,h3,h4 {
      font-family: var(--font-display);
      font-weight: 800;
      line-height: 1;
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: var(--font-body); cursor: none; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); }

    /* Grain overlay */
    .grain-overlay {
      position: fixed; inset: 0; z-index: 9000; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      opacity: 0.4;
      mix-blend-mode: overlay;
    }

    /* Utility */
    .sp { padding: 120px 48px; }
    @media (max-width: 768px) { .sp { padding: 72px 24px; } }

    /* Nav responsive */
    @media (max-width: 900px) {
      .nav-links { display: none !important; }
      .nav-burger { display: flex !important; }
    }
    @media (min-width: 901px) {
      .nav-burger { display: none !important; }
    }

    /* Stats grid */
    @media (max-width: 640px) {
      .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
    }

    /* Audience grid */
    @media (max-width: 1100px) {
      .audience-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .audience-featured { grid-column: span 1 !important; }
    }
    @media (max-width: 600px) {
      .audience-grid { grid-template-columns: 1fr !important; }
    }

    /* Programs grid */
    @media (max-width: 1024px) {
      .programs-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 640px) {
      .programs-grid { grid-template-columns: 1fr !important; }
    }

    /* Method grid */
    @media (max-width: 900px) {
      .method-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 600px) {
      .method-grid { grid-template-columns: 1fr !important; }
    }

    /* Steps */
    @media (max-width: 768px) {
      .steps-row { flex-direction: column !important; }
      .step-item { text-align: left !important; }
      .step-circle { margin-left: 0 !important; margin-right: auto !important; }
    }

    /* Founder */
    @media (max-width: 900px) {
      .founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
    }

    /* Footer */
    @media (max-width: 1024px) {
      .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr !important; }
    }

    @keyframes breathe {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.7); }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
//  CURSOR
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

  const cfg = { stiffness: 350, damping: 28 };
  const rx = useSpring(pos.x, cfg);
  const ry = useSpring(pos.y, cfg);

  return (
    <>
      {/* Red dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
          width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)',
          x: pos.x - 4, y: pos.y - 4,
        }}
        animate={{ scale: clicked ? 0.4 : 1 }}
        transition={{ duration: 0.1 }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
          borderRadius: '50%', border: '1px solid rgba(240,235,224,0.35)',
          x: rx, y: ry, translateX: '-50%', translateY: '-50%',
        }}
        animate={{ width: hovered ? 52 : 30, height: hovered ? 52 : 30, opacity: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.18 }}
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
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.93 }}
    aria-label="Chat on WhatsApp"
    style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 8000,
      width: 60, height: 60, borderRadius: '50%', background: '#25D366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 28px rgba(37,211,102,0.45)',
    }}
  >
    <MessageCircle size={26} color="#fff" fill="#fff" />
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
    { label: 'Programs', href: '#programs' },
    { label: "Who It's For", href: '#audience' },
    { label: 'Our Method', href: '#method' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
          padding: '18px 48px',
          background: scrolled ? 'rgba(6,6,3,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
        }}
      >
        <a href="#" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, letterSpacing: '-0.5px' }}>
          THE NEXT LAP
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.5px', color: 'var(--muted)', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'var(--accent)', color: '#fff', padding: '10px 22px',
              borderRadius: 40, fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.6px', display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none',
            }}
          >
            <MessageCircle size={13} /> WhatsApp Us
          </motion.a>
          <button
            className="nav-burger"
            onClick={() => setOpen(true)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', padding: 4, display: 'none' }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 700, background: 'var(--bg)',
              display: 'flex', flexDirection: 'column', padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17 }}>THE NEXT LAP</span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text)' }}>
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800,
                    padding: '12px 0', borderBottom: '1px solid var(--border)', lineHeight: 1.1,
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a
              href={WA_LINK}
              style={{
                background: '#25D366', color: '#fff', padding: '18px 24px',
                borderRadius: 50, fontSize: 15, fontWeight: 700, textAlign: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 32,
              }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  MARQUEE (city ticker)
// ─────────────────────────────────────────────────────────────────────────────

const Marquee = () => {
  const items = [...CITIES, ...CITIES, ...CITIES, ...CITIES];
  return (
    <div
      style={{
        overflow: 'hidden', background: 'var(--accent)', padding: '11px 0',
        borderTop: '1px solid rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(0,0,0,0.15)',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-25%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {items.map((city, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '0 28px', fontSize: 11, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase', color: '#fff',
              whiteSpace: 'nowrap',
            }}
          >
            <MapPin size={9} style={{ opacity: 0.7 }} />
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
        padding: '28px 32px', background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, lineHeight: 1 }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.2px', marginTop: 8, fontWeight: 600 }}>
        {label}
      </div>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '160px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Atmospheric glow */}
      <motion.div
        style={{
          position: 'absolute', top: '5%', right: '-8%', width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(255,69,0,0.1) 0%, transparent 65%)',
          pointerEvents: 'none', y: yBg,
        }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '10%', left: '-5%', width: '35vw', height: '35vw',
          background: 'radial-gradient(circle, rgba(232,184,75,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow pill */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36,
          padding: '8px 18px', border: '1px solid var(--border)', borderRadius: 40,
          width: 'fit-content',
        }}
      >
        <span
          style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
            animation: 'breathe 2s ease-in-out infinite',
          }}
        />
        <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
          India's Skill-First Platform · 13+ Cities
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 70 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(44px, 8.5vw, 110px)',
          fontWeight: 800, lineHeight: '0.9', letterSpacing: '-3.5px',
          marginBottom: 40, maxWidth: 1100,
        }}
      >
        You Don't Need<br />
        a Degree to{' '}
        <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Build,</em><br />
        <span style={{ color: 'var(--gold)' }}>Grow,</span> or Simplify<br />
        Your Life.
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--muted)',
          maxWidth: 580, lineHeight: 1.75, marginBottom: 48, fontWeight: 300,
        }}
      >
        The NEXT LAP teaches business skills and AI to anyone ready to start
        something, scale something, or just make everyday life easier — at any
        age, from any city in India.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 72 }}
      >
        <motion.a
          href="#programs"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'var(--text)', color: 'var(--bg)',
            padding: '15px 34px', borderRadius: 50,
            fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.8px', display: 'inline-flex', alignItems: 'center', gap: 10,
          }}
        >
          Explore Programs <ArrowRight size={15} />
        </motion.a>
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'transparent', color: 'var(--text)',
            padding: '15px 34px', borderRadius: 50, border: '1px solid var(--border-md)',
            fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.8px', display: 'inline-flex', alignItems: 'center', gap: 10,
          }}
        >
          <MessageCircle size={15} /> WhatsApp Us
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="stats-strip"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
        }}
      >
        <StatCell value={13} suffix="+" label="Cities in India" start={inView} />
        <StatCell value={4000} suffix="+" label="People Trained" start={inView} />
        <div style={{ padding: '28px 32px', background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, lineHeight: 1 }}>16–70+</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.2px', marginTop: 8, fontWeight: 600 }}>All Ages Welcome</div>
        </div>
        <StatCell value={6} suffix="" label="Active Programs" start={inView} />
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  AUDIENCE CARD (extracted — no hooks in loops)
// ─────────────────────────────────────────────────────────────────────────────

const AudienceCard = ({ a }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = a.icon;

  return (
    <motion.div
      ref={ref}
      className={a.featured ? 'audience-featured' : ''}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      data-cur
      style={{
        gridColumn: a.featured ? 'span 2' : 'span 1',
        background: a.featured ? `${a.accent === 'var(--accent)' ? 'rgba(255,69,0,0.07)' : 'rgba(232,184,75,0.07)'}` : 'var(--surface)',
        border: `1px solid ${a.featured ? (a.accent === 'var(--accent)' ? 'rgba(255,69,0,0.28)' : 'rgba(232,184,75,0.28)') : 'var(--border)'}`,
        borderRadius: 20, padding: a.featured ? '44px' : '32px',
        display: 'flex', flexDirection: 'column', gap: 20,
        transition: 'border-color 0.3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 46, height: 46, borderRadius: 13,
            background: a.featured ? `${a.accent === 'var(--accent)' ? 'rgba(255,69,0,0.15)' : 'rgba(232,184,75,0.15)'}` : 'var(--surface2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon size={20} color={a.accent} />
        </div>
        {a.featured && (
          <span
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
              background: a.accent, color: a.accent === 'var(--gold)' ? '#000' : '#fff',
              padding: '4px 14px', borderRadius: 40,
            }}
          >
            Priority
          </span>
        )}
      </div>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)', fontSize: a.featured ? 30 : 20,
            fontWeight: 800, lineHeight: 1.1, marginBottom: 12,
          }}
        >
          {a.label}
        </h3>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{a.desc}</p>
      </div>
      <a
        href={WA_LINK}
        style={{
          fontSize: 13, color: a.accent, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 'auto',
          transition: 'gap 0.2s',
        }}
      >
        Learn More <ArrowRight size={13} />
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
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85 }}
        style={{ marginBottom: 56 }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
          Zero Gatekeeping
        </div>
        <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 76px)', letterSpacing: '-2.5px', lineHeight: 1, maxWidth: 700 }}>
          If You're Curious,<br />You Belong Here.
        </h2>
      </motion.div>

      <div
        className="audience-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
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
//  PROGRAM CARD (extracted)
// ─────────────────────────────────────────────────────────────────────────────

const ProgramCard = ({ p, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const accentHex = p.accent === 'var(--accent)' ? '#FF4500' : '#E8B84B';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 54 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      data-cur
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '36px', display: 'flex', flexDirection: 'column',
        gap: 20, position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentHex + '66')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(240,235,224,0.07)')}
    >
      {/* Corner glow */}
      <div
        style={{
          position: 'absolute', top: 0, right: 0, width: 140, height: 140,
          background: `radial-gradient(circle at top right, ${accentHex}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: p.accent, border: `1px solid ${accentHex}44`, padding: '4px 12px', borderRadius: 40,
          }}
        >
          {p.level}
        </span>
        <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{p.duration}</span>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 14, color: p.accent, fontWeight: 600, fontStyle: 'italic', marginBottom: 14 }}>{p.tagline}</p>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: p.accent, color: p.accent === 'var(--gold)' ? '#000' : '#fff',
            padding: '11px 18px', borderRadius: 50, fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.7px',
            display: 'inline-flex', alignItems: 'center', gap: 7, flex: 1, justifyContent: 'center',
            border: 'none',
          }}
        >
          <MessageCircle size={12} /> Enroll via WhatsApp
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'transparent', color: 'var(--text)', padding: '11px 18px',
            borderRadius: 50, fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.7px', display: 'inline-flex', alignItems: 'center', gap: 7,
            border: '1px solid var(--border-md)',
          }}
        >
          Learn More <ArrowRight size={12} />
        </motion.a>
      </div>
    </motion.div>
  );
};

const Programs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="programs" style={{ background: 'var(--surface2)', padding: '120px 0' }}>
      <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
              What We Teach
            </div>
            <h2 style={{ fontSize: 'clamp(36px,5.5vw,76px)', letterSpacing: '-2.5px', lineHeight: 1 }}>
              6 Programs.<br />One Purpose.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 380, lineHeight: 1.75, fontWeight: 300 }}>
            Each program is built around a single outcome. No theory without application, no filler, no wasted time.
          </p>
        </motion.div>

        <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  PILLAR CARD (extracted)
// ─────────────────────────────────────────────────────────────────────────────

const PillarCard = ({ pillar, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = pillar.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ background: 'var(--surface2)' }}
      data-cur
      style={{
        background: 'var(--bg)', padding: '48px 40px',
        transition: 'background 0.3s', cursor: 'default',
      }}
    >
      <div
        style={{
          width: 50, height: 50, borderRadius: 14, background: 'var(--surface2)',
          border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: 28,
        }}
      >
        <Icon size={22} color="var(--accent)" />
      </div>
      <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14, fontWeight: 700 }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 14 }}>
        {pillar.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300 }}>{pillar.desc}</p>
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
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        style={{ marginBottom: 56 }}
      >
        <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
          The Method
        </div>
        <h2 style={{ fontSize: 'clamp(36px,5.5vw,76px)', letterSpacing: '-2.5px', lineHeight: 1 }}>
          Why This Works<br />When Others Don't.
        </h2>
      </motion.div>

      <div
        className="method-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden',
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
//  HOW IT WORKS (Step extracted)
// ─────────────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Find Your Path',
    desc: "Tell us who you are — student, homemaker, business owner, retiree. We'll match you to the program that fits your life.",
    cta: 'Take the Quiz',
  },
  {
    num: '02',
    title: 'Show Up & Learn',
    desc: 'Live sessions, real Indian examples, Hindi or English — on your phone. No prerequisites. No complicated tech. Just show up.',
    cta: 'See the Schedule',
  },
  {
    num: '03',
    title: 'Use It & Grow',
    desc: "Every session gives you something you can use the next morning. Build your business, simplify your life — the results are real.",
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
      transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: 1, padding: '0 28px', textAlign: align }}
    >
      <div
        className="step-circle"
        style={{
          width: 80, height: 80, borderRadius: '50%',
          background: i === 1 ? 'var(--accent)' : 'var(--surface)',
          border: i === 1 ? 'none' : '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32,
          marginLeft: i === 2 ? 'auto' : i === 1 ? 'auto' : 0,
          marginRight: i === 0 ? 'auto' : i === 1 ? 'auto' : 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: i === 1 ? '#fff' : 'var(--muted)' }}>
          {step.num}
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>{step.desc}</p>
      <a href={WA_LINK} style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {step.cta} <ArrowRight size={13} />
      </a>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ background: 'var(--surface2)', padding: '120px 0' }}>
      <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            The Process
          </div>
          <h2 style={{ fontSize: 'clamp(36px,5.5vw,76px)', letterSpacing: '-2.5px', lineHeight: 1 }}>
            How It Works.{' '}
            <span style={{ color: 'var(--muted)', fontWeight: 400, letterSpacing: '-1px' }}>Three steps.</span>
          </h2>
        </motion.div>

        <div className="steps-row" style={{ display: 'flex', position: 'relative' }}>
          {/* connector line — desktop only */}
          <div
            style={{
              position: 'absolute', top: 39, left: '16%', right: '16%', height: 1,
              background: 'linear-gradient(to right, transparent, var(--border-md), var(--border-md), transparent)',
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
      <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

        {/* Portrait block */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 24, aspectRatio: '3/4', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}
          >
            {/* Abstract portrait */}
            <svg viewBox="0 0 260 340" width="260" height="340" fill="none">
              <circle cx="130" cy="110" r="60" fill="rgba(255,69,0,0.12)" stroke="rgba(255,69,0,0.25)" strokeWidth="1" />
              <circle cx="130" cy="110" r="38" fill="rgba(255,69,0,0.08)" stroke="rgba(255,69,0,0.35)" strokeWidth="0.8" />
              <text x="130" y="118" textAnchor="middle" fill="rgba(255,69,0,0.7)" fontFamily="Syne,sans-serif" fontSize="28" fontWeight="800">HR</text>
              <ellipse cx="130" cy="270" rx="90" ry="68" fill="rgba(255,69,0,0.07)" stroke="rgba(255,69,0,0.18)" strokeWidth="1" />
              <path d="M 60 190 Q 130 155 200 190" stroke="rgba(255,69,0,0.2)" strokeWidth="1" fill="none" />
            </svg>
            {/* Gradient overlay at bottom */}
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 32px',
                background: 'linear-gradient(to top, rgba(6,6,3,0.95) 0%, rgba(6,6,3,0.6) 50%, transparent 100%)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800 }}>Himja Rana</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Founder, The NEXT LAP</div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: -18, right: -18,
              background: 'var(--gold)', color: '#000',
              padding: '12px 20px', borderRadius: 50,
              fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px',
              whiteSpace: 'nowrap',
            }}
          >
            4,000+ Lives Changed
          </motion.div>
        </motion.div>

        {/* Story text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            The Founder
          </div>
          <h2 style={{ fontSize: 'clamp(30px,4vw,58px)', letterSpacing: '-2px', lineHeight: 1, marginBottom: 36 }}>
            From Community<br />Builder to<br />Skill Architect.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { text: "Himja Rana didn't start The NEXT LAP in a boardroom. She started it inside a WhatsApp group of women who wanted to do more with their lives — and didn't know where to begin.", bold: true },
              { text: "As the founder of BossLADIES, a grassroots community of women entrepreneurs across India, Himja saw the same pattern everywhere: brilliant, motivated people held back by a lack of structured, practical, affordable skills.", bold: false },
              { text: "The NEXT LAP is her answer to that gap. Not a coaching brand, not a motivational seminar — a real skills platform, built for India, delivered with warmth, and obsessed with one thing: outcomes.", bold: false },
            ].map(({ text, bold }, i) => (
              <p key={i} style={{ fontSize: 15, color: bold ? 'var(--text)' : 'var(--muted)', lineHeight: 1.8, fontWeight: bold ? 400 : 300 }}>
                {text}
              </p>
            ))}
          </div>

          <div
            style={{
              display: 'flex', gap: 36, marginTop: 48, paddingTop: 40,
              borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}
          >
            {[['BossLADIES', 'Community'], ['13+ Cities', 'Active'], ['4,000+', 'Trained']].map(([val, lbl]) => (
              <div key={val}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, color: 'var(--accent)' }}>{val}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 600, marginTop: 4 }}>{lbl}</div>
              </div>
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
      transition={{ duration: 0.55, delay: index * 0.06 }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '28px 0', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 24, background: 'none', border: 'none', color: 'var(--text)', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,1.8vw,21px)', fontWeight: 700, lineHeight: 1.3 }}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            background: open ? 'var(--accent)' : 'var(--surface)',
            border: '1px solid var(--border-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s',
          }}
        >
          <Plus size={15} color={open ? '#fff' : 'var(--muted)'} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 28, fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, fontWeight: 300 }}>
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
    <section style={{ background: 'var(--surface2)', padding: '120px 0' }}>
      <div className="sp" style={{ maxWidth: 860, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: 60, textAlign: 'center' }}
        >
          <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
            Got Questions?
          </div>
          <h2 style={{ fontSize: 'clamp(36px,5.5vw,72px)', letterSpacing: '-2.5px', lineHeight: 1 }}>
            The Answers<br />Are Right Here.
          </h2>
        </motion.div>

        <div>
          {FAQS.map((f, i) => (
            <FAQItem key={i} faq={f} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 64, textAlign: 'center' }}
        >
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 28, fontWeight: 300 }}>
            Still have questions? We're one message away.
          </p>
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              padding: '16px 38px', borderRadius: 50,
              fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px',
            }}
          >
            <MessageCircle size={16} /> Chat on WhatsApp
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
  <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '80px 0 40px' }}>
    <div className="sp" style={{ maxWidth: 1400, margin: '0 auto', paddingTop: 0, paddingBottom: 0 }}>
      <div
        className="footer-grid"
        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 60, marginBottom: 72 }}
      >
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, marginBottom: 20, letterSpacing: '-0.5px' }}>
            THE NEXT LAP
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28, maxWidth: 280, fontWeight: 300 }}>
            India's skill-first platform for business and AI education. For every Indian, at every age, in every city.
          </p>
          <a
            href={WA_LINK}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: '#fff', padding: '10px 20px',
              borderRadius: 40, fontSize: 13, fontWeight: 700,
            }}
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
        </div>

        {/* Programs */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 24 }}>
            Programs
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PROGRAMS.map((p) => (
              <li key={p.id}>
                <a
                  href="#"
                  style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ecosystem */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 24 }}>
            Ecosystem
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['BossLADIES Community', 'For Educators', 'For Corporates', 'City Partners', 'Become a Trainer', 'Blog'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 24 }}>
            Reach Us
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 6 }}>Active Cities</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7 }}>
                {CITIES.slice(0, 7).join(' · ')} +&nbsp;more
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 6 }}>WhatsApp</div>
              <a href={WA_LINK} style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>+91 8284997777</a>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 6 }}>Hindi Support</div>
              <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>हाँ, हम हिंदी में बात करते हैं</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)', paddingTop: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}
      >
        <p style={{ fontSize: 13, color: 'var(--dim)' }}>© 2025 The NEXT LAP. Built for India, by India.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Use', 'Refund Policy'].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontSize: 13, color: 'var(--dim)', transition: 'color 0.2s' }}
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