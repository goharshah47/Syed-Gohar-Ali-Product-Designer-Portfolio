/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Github, Linkedin, Mail, ExternalLink, Menu, X, Sun, Moon } from 'lucide-react';

// --- Data Types ---

interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;
  accent: string;
  description: string;
  blocks: ContentBlock[];
}

type ContentBlock = 
  | { type: 'hero', title: string, subtitle: string, image: string, role?: string, tools?: string[] }
  | { type: 'text-split', title: string, content: string, image: string, reversed?: boolean, tag?: string }
  | { type: 'image-full', image: string, caption?: string }
  | { type: 'image-grid', images: string[], columns?: 2 | 3 }
  | { type: 'quote', text: string, author?: string }
  | { type: 'layered', images: string[], title: string, content: string }
  | { type: 'outcomes', items: { label: string, value: string }[] }
  | { type: 'comparison', before: string, after: string, title?: string, description?: string }
  | { type: 'section-header', title: string, subtitle?: string };

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: 'aura-fitness',
    title: 'Aura Fitness',
    year: '2023',
    category: 'Mobile App • Wellness',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
    accent: '#f27d26',
    description: 'A holistic wellness companion that bridges physical and mental health through AI-driven insights.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Emotional Fitness', 
        subtitle: 'Elevating health tracking from raw metrics to mindful growth and mental well-being.',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
        role: 'Lead Product Designer',
        tools: ['Figma', 'Protopie', 'Mirror']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'Aura is a holistic wellness platform that bridges the gap between physical effort and mental state.'
      },
      {
        type: 'text-split',
        tag: 'Problem Definition',
        title: 'Metric Overload',
        content: 'Modern fitness apps focus heavily on numeric goals (10k steps, 500 calories) without considering the user\'s internal capacity or emotional burnout.\n\nUsers often felt like they were "failing" their devices when they didn\'t meet these arbitrary targets, leading to a 45% drop-off rate after the first month.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '02. Research',
        subtitle: 'Discovery & Understanding User Behavior'
      },
      {
        type: 'layered',
        title: 'The Burnout Cycle',
        content: 'Through 20+ qualitative interviews, we discovered that users wanted a "partner" rather than a "judge." We identified a core persona: "The Overachiever," who values progress but struggles with the guilt of rest days.',
        images: [
          'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop'
        ]
      },
      {
        type: 'section-header',
        title: '03. Framing',
        subtitle: 'Defining the Solution Space'
      },
      {
        type: 'text-split',
        tag: 'User Needs',
        title: 'The Energy Dial',
        content: 'We framed our challenge around one core question: "How might we adjust workout intensity based on a user\'s daily emotional and physical capacity?"\n\nThe solution needed to be reactive, adaptive, and non-punishing.',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'section-header',
        title: '04. Exploration',
        subtitle: 'Ideation & Concept Development'
      },
      {
        type: 'image-grid',
        images: [
          'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583454110551-21f2fa29617f?q=80&w=600&auto=format&fit=crop'
        ],
        columns: 3
      },
      {
        type: 'section-header',
        title: '05. UX Process',
        subtitle: 'Information Architecture & Flows'
      },
      {
        type: 'text-split',
        tag: 'Interaction Logic',
        title: 'The Adaptive Flow',
        content: 'Every session begins with a 3-second "Pulse Check." The app uses this input to dynamically rewrite the workout plan. If the user reports "Low Energy," Aura shifts focus to active recovery and stretching.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '06. Visual Identity',
        subtitle: 'Designing the Aura'
      },
      {
        type: 'quote',
        text: "The UI shouldn't just display data; it should radiate a mood that aligns with the user's state.",
        author: 'Lead Visual Designer'
      },
      {
        type: 'image-full',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        caption: 'The final UI system uses soft gradients and organic shapes to reduce visual stress.'
      },
      {
        type: 'section-header',
        title: '07. The Solution',
        subtitle: 'Final Product Experience'
      },
      {
        type: 'image-full',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
        caption: 'High-fidelity mobile experience showcasing the pulse dial interaction.'
      },
      {
        type: 'section-header',
        title: '08. Validation',
        subtitle: 'Usability Testing & Iteration'
      },
      {
        type: 'comparison',
        title: 'Streamlining the Intake',
        description: 'V1 required 5 steps to start a workout. V2 reduced this to a single swipe based on high-frequency user feedback during beta testing.',
        before: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=800&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '09. Impact',
        subtitle: 'Outcomes & Business Value'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'User Retention', value: '+62%' },
          { label: 'Avg Session Time', value: '42m' },
          { label: 'Active Users', value: '1.2M' }
        ]
      },
      {
        type: 'section-header',
        title: '10. Reflection',
        subtitle: 'Key Learnings'
      },
      {
        type: 'text-split',
        title: 'Empathy as a Feature',
        content: 'This project taught me that user loyalty isn\'t built through features alone, but through emotional resonance. Designing for "failure states" is as important as designing for success.',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
        reversed: true
      }
    ]
  },
  {
    id: 'nexus-os',
    title: 'Nexus OS',
    year: '2023',
    category: 'Desktop Interface • Productivity',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    accent: '#3b82f6',
    description: 'A revolutionary desktop paradigm focused on flow state and focused work.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Spatial Productivity', 
        subtitle: 'Redefining the desktop as a three-dimensional environment for focus and flow.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        role: 'UX Architect',
        tools: ['Blender', 'Unity', 'Figma']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'Nexus moves beyond flat windows to create a persistent spatial memory map of your work.'
      },
      {
        type: 'text-split',
        tag: 'Problem',
        title: 'Tab Overload',
        content: 'Users lose 20% of their day just searching for where they left off. Traditional desktops treat every file as a separate island, ignoring the relationships between them.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '02-05. Exploration',
        subtitle: 'From 2D stacks to 3D spheres'
      },
      {
        type: 'image-grid',
        images: [
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
        ],
        columns: 2
      },
      {
        type: 'section-header',
        title: '06-08. Visual Design & Solution',
        subtitle: 'The Glass UI System'
      },
      {
        type: 'image-full',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        caption: 'The final interface uses depth to prioritize active task "Spheres".'
      },
      {
        type: 'section-header',
        title: '09-11. Impact & Reflection',
        subtitle: 'Measurable Focus'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Work Efficiency', value: '+30%' },
          { label: 'Cognitive Load', value: '-40%' },
          { label: 'Daily Users', value: '450K+' }
        ]
      }
    ]
  },
  {
    id: 'safco-dental',
    title: 'Safco Dental',
    year: '2023',
    category: 'Healthcare • B2B SaaS',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
    accent: '#0d9488',
    description: 'Modernizing legacy dental supply chains through intuitive inventory management and AI forecasting.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Healthcare Clarity', 
        subtitle: 'Simplifying the complex B2B dental supply chain for office managers.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
        role: 'Senior Product Designer',
        tools: ['Sketch', 'Abstract', 'React']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'Modernizing a 30-year legacy system into a high-performance procurement platform.'
      },
      {
        type: 'text-split',
        tag: 'The Problem',
        title: 'Invisible Inventory',
        content: 'Dental office managers were losing hours to manual audits. The legacy system was built on SKU codes rather than human-readable patterns.',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '02-05. Strategy',
        subtitle: 'Research & Information Architecture'
      },
      {
        type: 'layered',
        title: 'B2B Empathy',
        content: 'We discovered that office managers multitask heavily. The new IA allows for "Paused Orders" and "Quick Re-ups" based on historical usage.',
        images: [
          'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop'
        ]
      },
      {
        type: 'section-header',
        title: '06-08. Design & Solution',
        subtitle: 'The Safco Blueprint'
      },
      {
        type: 'image-full',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
        caption: 'A clean, high-contrast UI designed for clinical environments.'
      },
      {
        type: 'section-header',
        title: '09-11. Impact',
        subtitle: 'Efficiency Redefined'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Order Speed', value: '+120%' },
          { label: 'Audit Accuracy', value: '99.8%' },
          { label: 'Customer NPS', value: '78' }
        ]
      }
    ]
  },
  {
    id: 'velocity-finance',
    title: 'Velocity Finance',
    year: '2022',
    category: 'Fintech • Trading Platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    accent: '#8b5cf6',
    description: 'Democratizing algorithmic trading for the everyday long-term investor.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Finance for Humans', 
        subtitle: 'Removing the intimidation of markets with narrative data and intuitive risk management.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        role: 'Lead UX Designer',
        tools: ['Figma', 'D3.js', 'React']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'Transforming complex quantitative data into actionable visual stories.'
      },
      {
        type: 'text-split',
        tag: 'Problem',
        title: 'Complexity Barrier',
        content: 'Retail investors feel paralyzed by advanced charting. Velocity interprets these signals into human-readable narratives.',
        image: 'https://images.unsplash.com/photo-1611974714023-3769c0d1c811?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'quote',
        text: "The best trading indicator is the one you actually understand.",
        author: 'Lead FinTech Analyst'
      },
      {
        type: 'section-header',
        title: '02-11. The Design System',
        subtitle: 'A full case study on risk visualization and user education.'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Trust Increase', value: '+45%' },
          { label: 'User Education', value: 'High' },
          { label: 'AUM Growth', value: '$2.5B' }
        ]
      }
    ]
  },
];

const CaseStudySection = ({ project, onBack, onSelect }: { project: Project, onBack: () => void, onSelect: (p: Project) => void }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeId, setActiveId] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [project.id]);

  // Extract navigation items from section headers
  const navItems = project.blocks
    .filter(block => block.type === 'section-header')
    .map((block, idx) => ({
      id: `section-${idx}`,
      // @ts-ignore - we know it's section-header
      title: block.title.replace(/^\d+[-.]?\d*\.\s*/, '')
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('.case-study-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [project.id, project.blocks]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ '--project-accent': project.accent } as React.CSSProperties}
      className="fixed inset-0 z-[100] bg-canvas text-fg overflow-y-auto overflow-x-hidden transition-all duration-700 ease-in-out scroll-smooth"
    >
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[120] origin-left"
        style={{ scaleX, backgroundColor: project.accent }}
      />

      <nav className="fixed top-0 left-0 w-full z-[110] px-6 py-6 flex justify-between items-center mix-blend-difference">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[var(--project-accent)] transition-colors"
        >
          <motion.div whileHover={{ x: -4 }}><ArrowRight className="rotate-180" size={16} /></motion.div>
          Back to Work
        </button>
        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
          {project.title} • {project.year}
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row relative">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block lg:w-64 xl:w-80 h-screen sticky top-0 p-8 pt-32 shrink-0 border-r border-border-theme/30 bg-canvas/40 backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-fg-muted/40 mb-2">Project Phase</span>
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group block text-left text-[11px] uppercase font-bold tracking-widest transition-all duration-300 ${
                    activeId === item.id ? 'text-fg' : 'text-fg-muted/40 hover:text-fg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="h-1 rounded-full"
                      style={{ backgroundColor: project.accent }}
                      animate={{ 
                        width: activeId === item.id ? 20 : 0,
                        opacity: activeId === item.id ? 1 : 0
                      }}
                    />
                    <span className={activeId === item.id ? "translate-x-0" : "group-hover:translate-x-1 transition-transform"}>
                      {item.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="lg:hidden sticky top-20 z-[90] w-full px-6 py-4 bg-canvas/80 backdrop-blur-md border-b border-border-theme overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${
                  activeId === item.id ? '' : 'text-fg-muted/40'
                }`}
                style={{ color: activeId === item.id ? project.accent : undefined }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full overflow-hidden">
          {project.blocks.map((block, idx) => {
            // Calculate section ID for headers
            let sectionId = '';
            if (block.type === 'section-header') {
              // @ts-ignore
              const itemIdx = project.blocks.filter(b => b.type === 'section-header').indexOf(block);
              sectionId = `section-${itemIdx}`;
            }

            switch (block.type) {
            case 'hero':
              return (
                <section key={idx} className="relative h-screen flex items-end pb-24 px-6 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <motion.img 
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      src={block.image} 
                      className="w-full h-full object-cover" 
                      alt="" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
                  </div>
                  <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                      <motion.h1 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-[0.8] mb-8"
                      >
                        {block.title.split(' ').map((word, i) => (
                          <span key={i} className="inline-block mr-4">{word}</span>
                        ))}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-3xl font-light text-fg-muted max-w-2xl leading-relaxed"
                      >
                        {block.subtitle}
                      </motion.p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-8 pb-4">
                      {block.role && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: project.accent }}>Role</span>
                          <p className="text-lg font-medium">{block.role}</p>
                        </div>
                      )}
                      {block.tools && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: project.accent }}>Tools</span>
                          <div className="flex flex-wrap gap-2">
                            {block.tools.map((tool, i) => (
                              <span key={i} className="px-3 py-1 rounded-full border border-border-theme text-[10px] font-bold tracking-widest uppercase">{tool}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );
            case 'section-header':
              return (
                <section key={idx} id={sectionId} className="case-study-section py-24 px-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                  >
                    <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6 underline decoration-accent/20" style={{ textDecorationColor: `${project.accent}33` }}>{block.title}</h2>
                    {block.subtitle && <p className="text-xl md:text-2xl text-fg-muted font-light">{block.subtitle}</p>}
                  </motion.div>
                </section>
              );
            case 'text-split':
              return (
                <section key={idx} className="py-20 px-6">
                  <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center ${block.reversed ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`lg:col-span-5 ${block.reversed ? 'lg:order-2' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                      >
                        {block.tag && <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block" style={{ color: project.accent }}>{block.tag}</span>}
                        <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-tight">{block.title}</h2>
                        <div className="text-lg md:text-2xl text-fg-muted font-light leading-relaxed whitespace-pre-line">{block.content}</div>
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2 }}
                      className={`lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden ${block.reversed ? 'lg:order-1' : ''}`}
                    >
                      <img src={block.image} className="w-full h-full object-cover shadow-2xl" alt="" referrerPolicy="no-referrer" />
                    </motion.div>
                  </div>
                </section>
              );
            case 'image-grid':
              return (
                <section key={idx} className="py-12 px-6">
                  <div className={`max-w-7xl mx-auto grid gap-8 ${block.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {block.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl overflow-hidden aspect-square shadow-lg"
                      >
                        <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            case 'comparison':
              return (
                <section key={idx} className="py-24 px-6 bg-canvas-muted">
                  <div className="max-w-7xl mx-auto">
                    {(block.title || block.description) && (
                      <div className="mb-16 text-center lg:text-left">
                        {block.title && <h2 className="text-4xl font-bold mb-4 tracking-tight">{block.title}</h2>}
                        {block.description && <p className="text-xl text-fg-muted font-light">{block.description}</p>}
                      </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <span className="inline-block px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded">Before</span>
                        <div className="rounded-2xl overflow-hidden shadow-xl aspect-video">
                          <img src={block.before} className="w-full h-full object-cover grayscale" alt="Before" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest rounded">After</span>
                        <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video border-4" style={{ borderColor: project.accent }}>
                          <img src={block.after} className="w-full h-full object-cover" alt="After" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            case 'image-full':
              return (
                <section key={idx} className="py-24 px-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-screen-2xl mx-auto"
                  >
                    <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-3xl">
                      <img src={block.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>
                    {block.caption && (
                      <div className="mt-8 flex justify-center">
                        <span className="px-4 py-1 rounded-full border border-border-theme text-[10px] font-bold uppercase tracking-widest text-fg-muted">
                          {block.caption}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </section>
              );
            case 'quote':
              return (
                <section key={idx} className="py-64 px-6 bg-canvas-muted relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
                  <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="text-4xl md:text-8xl font-display italic tracking-tight leading-[1.1] mb-12"
                    >
                      "{block.text}"
                    </motion.h2>
                    {block.author && <p className="text-sm font-bold uppercase tracking-[0.4em]" style={{ color: project.accent }}>[{block.author}]</p>}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
                </section>
              );
            case 'layered':
              return (
                <section key={idx} className="py-48 px-6 overflow-hidden">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-5">
                      <motion.h2 
                         initial={{ opacity: 0, x: -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="text-4xl md:text-6xl font-bold mb-10 tracking-tight"
                      >
                        {block.title}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-2xl text-fg-muted font-light leading-relaxed"
                      >
                        {block.content}
                      </motion.p>
                    </div>
                    <div className="lg:col-span-7 relative h-[700px]">
                      {block.images.map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 100, y: 100, rotate: 5 }}
                          whileInView={{ opacity: 1, x: i * 100, y: i * 100, rotate: i * -2 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-0 left-0 w-4/5 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] border-8 border-canvas"
                        >
                          <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            case 'outcomes':
              return (
                <section key={idx} className="py-40 px-6 bg-fg text-canvas">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
                    {block.items.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="text-7xl md:text-9xl font-extrabold mb-4 tracking-tighter" style={{ color: project.accent }}>{item.value}</div>
                        <div className="text-xs font-bold uppercase tracking-[0.5em] opacity-40">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            default:
              return null;
          }
        })}
        </div>
      </div>

      <footer className="py-48 px-6 bg-canvas border-t border-border-theme text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-10 block" style={{ color: project.accent }}>Next Project</span>
        <motion.div 
          whileHover={{ scale: 0.98, opacity: 0.7 }}
          onClick={() => {
            const nextIndex = (PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length;
            onSelect(PROJECTS[nextIndex]);
          }}
          className="text-5xl md:text-[10vw] font-extrabold tracking-tighter cursor-pointer leading-none"
        >
          {PROJECTS[(PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length].title.toUpperCase()}
        </motion.div>
      </footer>
    </motion.div>
  );
};


// --- Components ---

const Navbar = ({ darkMode, toggleTheme }: { darkMode: boolean, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-canvas/80 backdrop-blur-md py-4 border-b border-border-theme' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          SYED <span className="text-accent">GOHAR ALI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-sm font-medium uppercase tracking-widest text-fg-muted">
            {['Work', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-fg transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-theme text-fg-muted hover:text-accent transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-fg-muted">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-canvas-muted border-b border-border-theme p-6 md:hidden flex flex-col gap-4 text-center shadow-xl"
          >
            {['Work', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-canvas">
      {/* Background Visual */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_50%)] blur-[120px] scale-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-[0.4em] mb-6">
            Product Designer • UI/UX
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            CRAFTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fg to-fg-muted dark:from-neutral-100 dark:to-neutral-500">DIGITAL</span> SYSTEMS
          </h1>
          <p className="text-lg md:text-xl text-fg-muted max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Designing frictionless interfaces for complex digital products that balance aesthetic beauty with functional precision.
          </p>

          <motion.button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-accent text-white rounded-full font-semibold uppercase tracking-widest text-sm flex items-center gap-3 mx-auto shadow-2xl shadow-accent/20 transition-shadow hover:shadow-accent/40"
          >
            View Projects <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};


const WorkGrid = ({ onSelect }: { onSelect: (project: Project) => void }) => {
  return (
    <section id="work" className="py-24 bg-canvas transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Selected Works</h3>
        </div>
        <p className="text-fg-muted max-w-xs text-sm font-light">A collection of projects spanning fintech, mobile health, and smart systems.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-canvas-muted border border-border-theme">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-fg/10 group-hover:bg-fg/0 transition-colors duration-500" />
              <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="bg-canvas text-fg p-4 rounded-full shadow-lg border border-border-theme">
                  <ExternalLink size={20} />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-2xl font-bold mb-1">{project.title}</h4>
                <p className="text-fg-muted text-sm font-medium uppercase tracking-wider">{project.category}</p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-fg-muted transition-colors mt-2"
              >
                <ChevronRight size={24} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-canvas-muted transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
            alt="Syed Gohar Ali"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[20px] border-fg/5 pointer-events-none" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">In a Nutshell</h2>
          <h3 className="text-4xl font-bold mb-8 leading-tight">I bridge the gap between human needs and business objectives.</h3>
          <p className="text-fg-muted text-lg font-light leading-relaxed mb-6">
            With over 8 years of experience in product design, I've worked with global brands and fast-growing startups to launch products that aren't just usable—they're indispensable.
          </p>
          <p className="text-fg-muted text-lg font-light leading-relaxed mb-10">
            I believe in deep research, data-informed decisions, and the magic of high-fidelity prototyping.
          </p>

          <div className="flex gap-6">
            {[Linkedin, Github, Mail].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -4, color: '#f27d26' }}
                href="#"
                className="text-fg-muted hover:text-accent transition-colors"
                title={Icon.name}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-24 bg-canvas border-t border-border-theme transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">LET'S <span className="text-accent italic font-display">TALK</span></h2>
          <p className="text-fg-muted text-xl font-light mb-12 max-w-2xl mx-auto">
            Available for new projects, creative collaborations, or just a coffee chat about design systems.
          </p>

          <a
            href="mailto:hello@goharali.com"
            className="inline-block text-2xl md:text-4xl font-bold text-fg hover:text-accent transition-colors pb-2 border-b-2 border-accent"
          >
            hello@goharali.com
          </a>

          <div className="mt-24 pt-12 border-t border-border-theme flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-fg-muted text-sm">© 2026 Syed Gohar Ali. All rights reserved.</p>
            <div className="flex gap-8 text-fg-muted text-sm uppercase tracking-widest font-semibold">
              <a href="#" className="hover:text-fg transition-colors">Behance</a>
              <a href="#" className="hover:text-white dark:hover:text-white transition-colors">Dribbble</a>
              <a href="#" className="hover:text-white dark:hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero />
      <WorkGrid onSelect={setSelectedProject} />
      <About />
      <Contact />

      <AnimatePresence>
        {selectedProject && (
          <CaseStudySection 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
            onSelect={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
