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
  | { type: 'statement', text: string, subtext?: string }
  | { type: 'comparison', before: string, after: string, title?: string, description?: string }
  | { type: 'section-header', title: string, subtitle?: string };

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: 'lotiq',
    title: 'LotIQ',
    year: '2024',
    category: 'AI Property Intelligence • Enterprise SaaS',
    image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/thumbnail.jpg?token=GHSAT0AAAAAADZI47SF6QOZH75GNO3I34HI2PZXALQ',
    accent: '#10b981',
    description: 'AI-Powered Property Intelligence System simplifying complex physical enforcement workflows.',
    blocks: [
      { 
        type: 'hero', 
        title: 'LotIQ', 
        subtitle: 'A system that automates parking enforcement and physical space monitoring using AI, rules, and human validation.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/inner_Cover.png?token=GHSAT0AAAAAADZI47SFSIWFLUWLP65HAJFG2PZXEPA',
        role: 'Product Designer',
        tools: ['Lovable', 'Google AI Studio', 'Vercel']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'LotIQ is an AI-powered property intelligence platform that replaces manual enforcement workflows with automated decision systems.'
      },
      {
        type: 'text-split',
        tag: 'The Context',
        title: 'Decision Intelligence',
        content: 'LotIQ isn\'t just a UI product—it\'s a decision-making system. It combines computer vision with a sophisticated rules engine to monitor physical spaces in real-time, reducing the need for manual reporting and high-cost operational overhead.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/Decision.png?token=GHSAT0AAAAAADZI47SFXUFNR62FKBTYER2E2PZXE4A'
      },
      {
        type: 'section-header',
        title: '02. Problem',
        subtitle: 'The high cost of manual physical enforcement.'
      },
      {
        type: 'text-split',
        tag: 'Current State',
        title: 'Friction & Inefficiency',
        content: 'Property managers traditionally rely on manual reporting and phone calls for enforcement. This leads to:\n\n• High operational costs\n• Significant fraud risk\n• Zero real-time visibility into property activity',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/Friction%20%26%20Inefficiency.jpg?token=GHSAT0AAAAAADZI47SEVZVI3W5NXSHHPDUA2PZXFCQ'
      },
      {
        type: 'section-header',
        title: '03. Solution',
        subtitle: 'Automating high-confidence decisions.'
      },
      {
        type: 'statement',
        text: 'Automate high-confidence decisions, escalate uncertain cases to humans.',
        subtext: 'The core design principle that ensures system reliability without sacrificing efficiency.'
      },
      {
        type: 'text-split',
        tag: 'Hybrid Approach',
        title: 'AI + Human Validation',
        content: 'The solution integrates computer vision detection with a rule-based decision engine. High-confidence violations are processed automatically, while low-confidence edge cases are escalated to human reviewers for final validation.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'section-header',
        title: '04. Product Ecosystem',
        subtitle: 'A three-pronged system approach.'
      },
      {
        type: 'image-grid',
        images: [
           'https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=800&auto=format&fit=crop',
           'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
           'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop'
        ],
        columns: 3
      },
      {
        type: 'text-split',
        tag: 'System A',
        title: 'Lead Generation Website',
        content: 'Modern landing pages designed to convert property managers through clear value propositions and transparent onboarding flow.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/website.png?token=GHSAT0AAAAAADZI47SFPTUG2DE5EEILU3MO2PZXFLQ'
      },
      {
        type: 'text-split',
        tag: 'System B',
        title: 'Property Manager App',
        content: 'A control center for landlords to configure rules, define zones, and monitor incidents in real-time across their portfolios.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa29617f?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'text-split',
        tag: 'System C',
        title: 'The Backoffice System',
        content: 'The "engine room" where operations teams monitor AI accuracy, handle disputes, and validate escalated incidents to ensure system integrity.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '05. Key Flows',
        subtitle: 'Designing for trust and accountability.'
      },
      {
        type: 'quote',
        text: 'AI design is about decision clarity, not UI complexity.',
        author: 'Product Thinking'
      },
      {
        type: 'text-split',
        tag: 'Workflow Design',
        title: 'The Enforcement Lifecycle',
        content: 'Detection → Evaluation → Validation → Action → Logging.\n\nEvery step is traceable and auditable, ensuring that "human-in-the-loop" isn\'t just a buzzword, but a critical safeguard.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/aihumanvalidation.jpg?token=GHSAT0AAAAAADZI47SFBMY5EF7BW222ECOI2PZXFHQ'
      },
      {
        type: 'section-header',
        title: '06. Impact',
        subtitle: 'Measurable operational transformation.'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Effort reduction', value: '90%' },
          { label: 'System Accuracy', value: '99%' },
          { label: 'Violation Resolution', value: 'Faster' }
        ]
      },
      {
        type: 'section-header',
        title: '07. Reflections',
        subtitle: 'What we learned along the way.'
      },
      {
        type: 'text-split',
        title: 'Systems Over Screens',
        content: 'Complex products require system thinking. We learned that trust comes from transparency, and that human oversight is essential for real-world AI reliability.',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
        reversed: true
      }
    ]
  },
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
        type: 'statement',
        text: 'The primary challenge was not data collection, but data interpretation.',
        subtext: 'We found that users didn\'t need more numbers; they needed actionable empathy.'
      },
      {
        type: 'text-split',
        tag: 'Problem Definition',
        title: 'Metric Overload',
        content: 'Modern fitness apps focus heavily on numeric goals (10k steps, 500 calories) without considering the user\'s internal capacity or emotional burnout.\n\nUsers often felt like they were "failing" their devices when they didn\'t meet these arbitrary targets, leading to a 45% drop-off rate after the first month.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'comparison',
        title: 'Reducing Cognitive Load',
        description: 'Trade-off: We sacrificed comprehensive data visibility on the home screen to prioritize the user\'s "Energy Score," reducing overall interaction friction by 25%.',
        before: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=800&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop'
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
    category: 'B2B Ecommerce Redesign • Healthcare',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    accent: '#0d9488',
    description: 'Transforming a legacy dental supply platform into a scalable, modern ecommerce system for procurement teams.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Safco Dental', 
        subtitle: 'Modernizing the B2B ecommerce experience for faster product discovery and repeat ordering across a complex ecosystem.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        role: 'Product/UI Designer',
        tools: ['Ecommerce UX', 'Design System', 'PLP/PDP', 'Search']
      },
      {
        type: 'section-header',
        title: '01. Overview',
        subtitle: 'A system-level transformation of a B2B dental supply platform serving thousands of professionals.'
      },
      {
        type: 'text-split',
        tag: 'The Context',
        title: 'Legacy to Scalable',
        content: 'Safco Dental is a B2B platform serving dental professionals and procurement teams. The existing Magento-based system had strong infrastructure but a fragmented frontend. This project focused on modernizing the entire digital experience into a scalable, system-driven ecosystem.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '02. The Problem',
        subtitle: 'Outdated design patterns and cognitive friction.'
      },
      {
        type: 'text-split',
        tag: 'The Challenge',
        title: 'Fragmented Experience',
        content: 'Key pain points included:\n\n• Legacy UI inconsistencies across pages\n• Weak visual hierarchy and outdated patterns\n• Poor product discovery and search\n• Fragmented navigation and category structure\n• Confusing promotional and pricing communication',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '03. Strategic Goals',
        subtitle: 'Aligning business efficiency with user needs.'
      },
      {
        type: 'layered',
        title: 'Balanced Objectives',
        content: 'Business goals focused on modernization and conversion, while users needed fast ordering, easy reordering, and pricing transparency. We aimed to build a system that supports both quick buying and deep product evaluation.',
        images: [
          'https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=600&auto=format&fit=crop'
        ]
      },
      {
        type: 'section-header',
        title: '04. Research Insights',
        subtitle: 'Understanding the B2B dental workflow.'
      },
      {
        type: 'text-split',
        tag: 'Personas',
        title: 'Who are we designing for?',
        content: '• Cost Conscious: Needs pricing clarity & deals\n• Reliability Loyalists: Needs fast reordering & trust\n• DSO Procurement: Needs structured approval flows\n• Premium Seekers: Needs deep product detail',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'statement',
        text: 'How might we modernize Safco Dental’s ecommerce experience so teams can quickly find, evaluate, and reorder products?',
        subtext: 'The central design challenge guiding the entire project.'
      },
      {
        type: 'section-header',
        title: '05. Design Principles',
        subtitle: 'Foundational rules for the new experience.'
      },
      {
        type: 'quote',
        text: 'Build reusable systems, not one-off screens. Optimize for B2B procurement efficiency.',
        author: 'UX Core Values'
      },
      {
        type: 'section-header',
        title: '06. Evolution',
        subtitle: 'Comparing the legacy system with the new vision.'
      },
      {
        type: 'comparison',
        title: 'Unified Design System',
        description: 'We moved from a fragmented, weak hierarchy to a unified structure where promotions, search, and navigation share a consistent language.',
        before: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '07. Key Workstreams',
        subtitle: 'A holistic approach to ecommerce modernization.'
      },
      {
        type: 'image-grid',
        images: [
           'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
           'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop',
           'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop'
        ],
        columns: 3
      },
      {
        type: 'text-split',
        tag: 'Ecommerce Core',
        title: 'PLP & PDP Optimization',
        content: 'Improved product scanning, category bubbles, and pricing tiers. PDPs now highlight bulk discounts and bundles clearly, reducing procurement effort.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'text-split',
        tag: 'Discovery',
        title: 'Advanced Search & Navigation',
        content: 'Designed a new search flyout with SKU-based discovery and improved category hierarchy to support the efficiency-driven dentist.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa29617f?q=80&w=800&auto=format&fit=crop',
        reversed: true
      },
      {
        type: 'text-split',
        tag: 'Marketing Systems',
        title: 'Unified Campaign Engine',
        content: 'Standardized banners, email templates, and web ads into a single marketing system that reduces design friction and improves brand trust.',
        image: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=800&auto=format&fit=crop'
      },
      {
        type: 'section-header',
        title: '08. Future Innovations',
        subtitle: 'Exploring predictive procurement.'
      },
      {
        type: 'layered',
        title: 'Forecast IQ',
        content: 'A conceptual tool for predictive procurement intelligence, helping offices manage inventory before it runs out.',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
        ]
      },
      {
        type: 'section-header',
        title: '09. Impact',
        subtitle: 'Product discovery redefined.'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Discovery Efficiency', value: 'High' },
          { label: 'Pricing Clarity', value: 'Unified' },
          { label: 'System Scalability', value: 'Global' }
        ]
      },
      {
        type: 'section-header',
        title: '10. The Narrative',
        subtitle: 'It is not a UI redesign, it is a system-level transformation.'
      },
      {
        type: 'text-split',
        title: 'Reflections on B2B complexity',
        content: 'This project connects product discovery, purchasing behavior, marketing systems, and operational workflows into a single cohesive ecosystem. It proved that B2B tools can be as polished and intuitive as consumer counterparts when driven by system thinking.',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop',
        reversed: true
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

            const isMuted = idx % 2 === 1;
            const bgClass = isMuted ? 'bg-canvas-muted' : 'bg-canvas';

            switch (block.type) {
            case 'hero':
              return (
                <section key={idx} className="relative h-screen flex items-end pb-32 px-6 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <motion.img 
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      src={block.image} 
                      className="w-full h-full object-cover" 
                      alt="" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent" />
                  </div>
                  <div className="relative z-10 container-wide w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8">
                      <motion.h1 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.85] mb-12 text-balance"
                      >
                        {block.title.split(' ').map((word, i) => (
                          <span key={i} className="inline-block mr-4">{word}</span>
                        ))}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-xl md:text-2xl font-light text-fg-muted max-w-2xl leading-relaxed"
                      >
                        {block.subtitle}
                      </motion.p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-10 pb-6">
                      {block.role && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block text-accent">Role</span>
                          <p className="text-xl font-bold tracking-tight">{block.role}</p>
                        </div>
                      )}
                      {block.tools && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block text-accent">Stack</span>
                          <div className="flex flex-wrap gap-2">
                            {block.tools.map((tool, i) => (
                              <span key={i} className="px-4 py-2 rounded-full border border-border-theme text-[10px] font-bold tracking-[0.2em] uppercase">{tool}</span>
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
                <section key={idx} id={sectionId} className={`case-study-section section-padding text-center ${bgClass}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Phase</span>
                    <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 underline decoration-accent/10 underline-offset-[12px]">{block.title}</h2>
                    {block.subtitle && <p className="text-xl md:text-3xl text-fg-muted font-light text-balance leading-relaxed">{block.subtitle}</p>}
                  </motion.div>
                </section>
              );
            case 'text-split':
              return (
                <section key={idx} className={`section-padding ${bgClass}`}>
                  <div className={`container-wide grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center ${block.reversed ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`lg:col-span-6 ${block.reversed ? 'lg:order-2' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {block.tag && <span className="text-[10px] font-bold uppercase tracking-[0.4rem] mb-6 block text-accent">{block.tag}</span>}
                        <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tighter leading-tight text-balance">{block.title}</h2>
                        <div className="text-lg md:text-xl text-fg-muted font-light leading-relaxed whitespace-pre-line">{block.content}</div>
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`lg:col-span-6 relative aspect-[12/10] rounded-[2rem] overflow-hidden ${block.reversed ? 'lg:order-1' : ''}`}
                    >
                      <img src={block.image} className="w-full h-full object-cover shadow-[0_50px_100px_rgba(0,0,0,0.2)]" alt="" referrerPolicy="no-referrer" />
                    </motion.div>
                  </div>
                </section>
              );
            case 'image-grid':
              return (
                <section key={idx} className={`py-12 px-6 ${bgClass}`}>
                  <div className={`container-wide grid gap-12 ${block.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {block.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-3xl overflow-hidden aspect-square shadow-2xl"
                      >
                        <img src={img} className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" alt="" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            case 'comparison':
              return (
                <section key={idx} className={`section-padding ${bgClass}`}>
                  <div className="container-wide">
                    {(block.title || block.description) && (
                      <div className="mb-24 text-center">
                        {block.title && <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">{block.title}</h2>}
                        {block.description && <p className="text-xl md:text-2xl text-fg-muted font-light max-w-3xl mx-auto leading-relaxed">{block.description}</p>}
                      </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-8">
                        <span className="inline-block px-4 py-2 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Evolution A</span>
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[16/10]">
                          <img src={block.before} className="w-full h-full object-cover grayscale opacity-60" alt="Before" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      <div className="space-y-8">
                        <span className="inline-block px-4 py-2 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Evolution B (Final)</span>
                        <div className="rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] aspect-[16/10] border-8" style={{ borderColor: project.accent }}>
                          <img src={block.after} className="w-full h-full object-cover" alt="After" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            case 'image-full':
              return (
                <section key={idx} className={`section-padding ${bgClass}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="container-wide"
                  >
                    <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-3xl border border-border-theme">
                      <img src={block.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>
                    {block.caption && (
                      <div className="mt-12 flex justify-center">
                        <span className="px-6 py-2 rounded-full bg-canvas-muted border border-border-theme text-[10px] font-bold uppercase tracking-[0.4em] text-fg-muted">
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
                  <div className="container-wide text-center relative z-10">
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-8xl font-display italic tracking-tight leading-[1.1] mb-12 text-balance"
                    >
                      "{block.text}"
                    </motion.h2>
                    {block.author && (
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-[1px] bg-border-theme" />
                        <p className="text-xs font-bold uppercase tracking-[0.5em]" style={{ color: project.accent }}>{block.author}</p>
                        <div className="w-8 h-[1px] bg-border-theme" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
                </section>
              );
            case 'layered':
              return (
                <section key={idx} className={`section-padding overflow-hidden ${bgClass}`}>
                  <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-5">
                      <motion.h2 
                         initial={{ opacity: 0, x: -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter"
                      >
                        {block.title}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-fg-muted font-light leading-relaxed"
                      >
                        {block.content}
                      </motion.p>
                    </div>
                    <div className="lg:col-span-7 relative h-[600px] md:h-[800px]">
                      {block.images.map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 100, y: 100, rotate: 5 }}
                          whileInView={{ opacity: 1, x: i * 80, y: i * 80, rotate: i * -3 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-0 left-0 w-3/4 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.3)] border-[12px] border-canvas"
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
            case 'statement':
              return (
                <section key={idx} className="py-48 px-6 text-center bg-canvas">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                  >
                    <h3 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                      {block.text}
                    </h3>
                    {block.subtext && (
                      <p className="text-xl md:text-2xl text-fg-muted font-light max-w-2xl mx-auto leading-relaxed">
                        {block.subtext}
                      </p>
                    )}
                  </motion.div>
                </section>
              );
            default:
              return null;
            }
          })}
        </div>
      </div>

      {/* Visual Transition Block for Next Project */}
      {(() => {
        const nextIndex = (PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length;
        const nextProject = PROJECTS[nextIndex];
        return (
          <section 
            className="group relative h-[80vh] flex items-center justify-center overflow-hidden cursor-pointer bg-black"
            onClick={() => onSelect(nextProject)}
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={nextProject.image} 
                className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-110" 
                alt={nextProject.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            
            <div className="relative z-10 text-center text-white p-6 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.6em] mb-6 block text-white/60">Next Project</span>
                <h2 className="text-6xl md:text-[10vw] font-extrabold tracking-tighter leading-none mb-8">
                  {nextProject.title}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <p className="text-xl font-light text-white/80 max-w-md">{nextProject.description}</p>
                  <div className="h-20 w-[1px] bg-white/20 hidden md:block" />
                  <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-accent">
                    View Case Study <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute inset-0 border-[0px] group-hover:border-[20px] border-accent/20 transition-all duration-700 pointer-events-none" />
          </section>
        );
      })()}

      <footer className="py-24 px-6 bg-canvas border-t border-border-theme text-center">
        <p className="text-fg-muted text-sm uppercase tracking-widest font-bold">End of Project</p>
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-8'}`}>
      <div className="container-wide flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SYED <span className="text-accent underline decoration-accent/20">GOHAR ALI</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-fg-muted/60">
            {['Work', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-fg transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-border-theme" />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-fg-muted hover:text-accent transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-fg-muted">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
              className="w-6 h-[2px] bg-fg" 
            />
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-[2px] bg-fg" 
            />
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
              className="w-6 h-[2px] bg-fg" 
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-canvas backdrop-blur-2xl border-b border-border-theme overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-12 flex flex-col gap-8 text-center">
              {['Work', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="text-4xl font-bold tracking-tighter"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-canvas section-padding">
      {/* Background Visual */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] blur-[140px] scale-50 opacity-20" />
      </div>

      <div className="relative z-10 container-wide">
        <div className="max-w-[800px]">
          <div className="flex flex-col items-start text-left">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-8"
            >
              PRODUCT DESIGNER
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-6 text-balance max-w-[750px]">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display italic font-medium block md:inline-block md:mr-4 text-accent"
              >
                Simplifying
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-extrabold"
              >
                complex products
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-normal text-fg-muted block mt-2"
              >
                with thoughtful design
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-fg-muted max-w-[600px] font-light leading-relaxed mb-10 text-balance"
            >
              Product Designer focused on B2B, SaaS, and ecommerce platforms—turning complex workflows into simple, intuitive experiences.
            </motion.p>
 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-6"
            >
              <motion.button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-accent text-white rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-2xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-300"
              >
                View Work <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-border-theme hover:bg-canvas-muted rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-fg-muted/30">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/40 to-transparent" />
      </motion.div>
    </section>
  );
};

const WorkGrid = ({ onSelect }: { onSelect: (project: Project) => void }) => {
  return (
    <section id="work" className="section-padding bg-canvas transition-colors duration-500">
      <div className="container-wide mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-6">Selected Works</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-balance">
              Building Products that <span className="text-fg-muted italic">Scale</span> and Solve Real Problems.
            </h3>
          </motion.div>
        </div>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-fg-muted max-w-sm text-lg font-light leading-relaxed"
        >
          A curated selection of deep-dive case studies focused on fintech, SaaS infrastructure, and complex healthcare systems.
        </motion.p>
      </div>

      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-8 bg-canvas-muted border border-border-theme transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-fg/10 dark:bg-black/20 group-hover:bg-fg/0 transition-colors duration-500" />
              
              {/* Overlay Tags */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full">{project.year}</span>
              </div>

              <div className="absolute bottom-8 right-8 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                <div className="bg-canvas text-fg px-6 py-3 rounded-full shadow-2xl border border-border-theme flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Case Study</span>
                  <ArrowRight size={16} className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h4>
                <div className="h-[1px] flex-1 bg-border-theme group-hover:bg-accent/40 transition-colors duration-500" />
              </div>
              <p className="text-fg-muted text-sm font-medium uppercase tracking-[0.2em]">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const tags = ["SaaS", "B2B Platforms", "UX Strategy", "Design Systems", "Product Identity"];

  return (
    <section id="about" className="section-padding bg-canvas-muted/30 transition-colors duration-500 border-y border-border-theme">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Syed Gohar Ali"
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-accent/10 mix-blend-color" />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight text-balance">
              Solving complex UX challenges with clarity and intent.
            </h3>
          </div>

          <div className="flex flex-col gap-8 text-xl text-fg-muted font-light leading-relaxed max-w-2xl">
            <p>
              I’m a Product Designer focused on solving complex UX challenges in SaaS and B2B platforms. 
              I enjoy breaking down complicated workflows and transforming them into clear, 
              intuitive experiences that are easy to use and scale.
            </p>
            <p>
              My approach combines user research, structured thinking, and visual clarity to design 
              solutions that not only look good but also improve usability and business outcomes.
            </p>
            <p>
              I work across the full design process—from understanding problems and defining user 
              needs to creating wireframes, refining interactions, and delivering polished UI systems.
            </p>
            <p>
              I’m particularly interested in designing systems that handle complexity while 
              maintaining simplicity, consistency, and performance.
            </p>
          </div>

          <div className="pt-10 border-t border-border-theme">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6 block">Expertise</span>
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-6 py-2.5 rounded-full border border-border-theme text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:border-accent hover:text-fg"
                >
                  {tag}
                </span>
              ))}
            </div>
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
