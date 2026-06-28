/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Github, Linkedin, Mail, ExternalLink, Menu, X, Sun, Moon, Search, ShoppingBag, Plus, Check, Filter, ArrowUpRight, AlertCircle } from 'lucide-react';

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
  | { type: 'phase-intro', title: string, role: string, scope: string, tools: string[], activities: string[] }
  | { type: 'text-split', title: string, content: string, image: string, reversed?: boolean, tag?: string }
  | { type: 'image-full', image: string, caption?: string }
  | { type: 'image-grid', images: string[], columns?: 2 | 3, contain?: boolean, padding?: boolean, bgWhite?: boolean, noGrayscale?: boolean, aspect?: string }
  | { type: 'quote', text: string, author?: string }
  | { type: 'layered', images: string[], title: string, content: string }
  | { type: 'outcomes', items: { label: string, value: string }[] }
  | { type: 'statement', text: string, subtext?: string }
  | { type: 'comparison', before: string, after: string, title?: string, description?: string, contain?: boolean, padding?: boolean, bgWhite?: boolean, aspect?: string }
  | { type: 'section-header', title: string, subtitle?: string };

// --- Mock Data ---

const PROJECTS: Project[] = [
  {
    id: 'safco-dental',
    title: 'Safco Dental',
    year: '2025 - 2026',
    category: 'B2B Ecommerce Redesign • Healthcare',
    image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/cover.jpg',
    accent: '#0d9488',
    description: 'Transforming a legacy dental supply platform into a scalable, modern ecommerce system for procurement teams.',
    blocks: [
      { 
        type: 'hero', 
        title: 'Safco Dental', 
        subtitle: 'Making complex B2B purchasing feel effortless.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/inner_Cover.png'
      },
      {
        type: 'phase-intro',
        title: 'Project Snapshot',
        role: 'Product Designer',
        scope: 'B2B Ecommerce Web Platform',
        tools: ['Figma', 'Magento', 'Design Tokens', 'UserTesting', 'Hotjar', 'Fullstory'],
        activities: [
          'UX Research & Behavior Auditing',
          'Information Architecture Strategy',
          'User Flows & Task Analysis',
          'UI Design & Prototyping',
          'Enterprise Design System Development'
        ]
      },
      {
        type: 'section-header',
        title: '01. The Challenge',
        subtitle: 'Improving the digital experience for dental professionals through research-driven UX strategy, intuitive navigation, and scalable design.'
      },
      {
        type: 'text-split',
        tag: 'The Context',
        title: 'Complexity at Scale',
        content: 'Safco Dental is a major B2B commerce platform serving thousands of dental practices and procurement managers. The existing platform was bogged down by outdated design paradigms, making it difficult for users to find products and complete routine procurement tasks.\n\nOur task was to transform this legacy catalog into an intuitive, high-speed purchasing engine that matches the speed of clinical practice.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Complexity%20at%20Scale.jpg'
      },
      {
        type: 'text-split',
        tag: 'The Problem Matrix',
        title: 'Friction and Cognitive Load',
        content: 'Key issues identified in our initial audit:\n\n• Large Product Catalog: Navigating 15,000+ complex SKUs was exhausting.\n• Difficult Discovery: Search did not support SKU matching, bulk item lookup, or fuzzy search queries.\n• Complex Purchasing Workflows: Multiple custom pricing contracts, bulk price tiers, and DSO authorization steps were poorly integrated.\n• Legacy Usability Barriers: Outdated form styling and weak visual hierarchy increased error rates and transaction times.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Friction%20and%20Cognitive%20Load.jpg',
        reversed: true
      },
      {
        type: 'section-header',
        title: '02. Research & Insights',
        subtitle: 'Mapping professional workflows, session recordings, and transactional drop-offs.'
      },
      {
        type: 'text-split',
        tag: 'User Behavior Analysis',
        title: 'How Dental Procurement Officers Think',
        content: 'Unlike consumer retail, dental buyers are task-oriented procurement specialists who often work under tight timelines.\n\nWe analyzed hotjar heatmaps, fullstory session replays, and customer support logs. We discovered that 73% of repeat purchases failed to complete within expected times because of search navigation loops.\n\nWe converted these friction points into actionable design opportunities.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Procurement%20Officers%20Think.jpg'
      },
      {
        type: 'layered',
        title: 'From Insight to Opportunity',
        content: '• Insight 1: Dental offices order identical products every week by reference code.\n• Problem: Users had to manually type complete SKUs into search, then go to the PDP to add to cart.\n• Design Opportunity: SKU-first predictive search that lets users add to cart directly from the dropdown.\n\n• Insight 2: Multi-location practices have structured authorization levels.\n• Problem: Standard carts didn\'t support multi-user checkouts or budget approval limits.\n• Design Opportunity: Integrated DSO-level account hierarchies in the dashboard.',
        images: [
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/insight.jpg',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/insightopportunity.jpg'
        ]
      },
      {
        type: 'section-header',
        title: '03. UX Strategy',
        subtitle: 'Overhauling the information architecture and purchase pathways.'
      },
      {
        type: 'text-split',
        tag: 'Navigation Blueprint',
        title: 'Simplified Information Architecture',
        content: 'We redesigned the navigation taxonomy from the ground up.\n\nBy collapsing dozens of redundant nested categories into a unified 3-level mega menu, we reduced the average time-to-category by 42%. We designed interactive category bubble selectors to guide mobile-first users instantly to high-volume products.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Simplified%20Information%20Architecture.jpg'
      },
      {
        type: 'text-split',
        tag: 'Search & Conversion Strategy',
        title: 'Efficiency-First B2B Architecture',
        content: 'Our strategy prioritized speed and visual density:\n\n• Advanced predictive auto-complete supporting partial SKUs.\n• Inline quantity selectors in search listings.\n• Transparent pricing structures reflecting contract tiers instantly.\n• One-click Quick Reorder tables on the user dashboard.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Efficiency-First%20B2B%20Architecture.jpg',
        reversed: true
      },
      {
        type: 'section-header',
        title: '04. Design Exploration',
        subtitle: 'Comparing legacy designs with modern, scalable interfaces.'
      },
      {
        type: 'comparison',
        title: 'Interface Transformation',
        description: 'Comparing the legacy system with the redesigned, high-density professional workspace. The new layout emphasizes visual structure, clear pricing tiers, robust filters, and frictionless action buttons.',
        before: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/evolution%20before.jpg',
        after: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/evolution%20after.jpg',
        contain: true,
        padding: true,
        bgWhite: true
      },
      {
        type: 'section-header',
        title: '05. The Final Experience',
        subtitle: 'Apple-inspired enterprise design built for dental teams.'
      },
      {
        type: 'text-split',
        tag: 'Feature 01: Product Discovery',
        title: 'Smart Search & Category Taxonomy',
        content: 'Features a full-width persistent search bar equipped with SKU autocomplete. Dynamic visual categories allow procurement managers to find specialized instruments, infection control supplies, and consumables with zero friction.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Smart%20Search%20%26%20Category%20Taxonomy.jpg'
      },
      {
        type: 'text-split',
        tag: 'Feature 02: Product Detail Experience',
        title: 'High-Density PDP Information Hierarchy',
        content: 'Displays clinical specifications, stock levels, manufacturer details, and volume discount tables. The pricing widget automatically recalculates totals based on quantities, simplifying purchasing decisions and boosting average order values.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/High-Density%20PDP%20Information%20Hierarchy%20.jpg',
        reversed: true
      },
      {
        type: 'text-split',
        tag: 'Feature 03: Account Dashboard',
        title: 'Unified Professional Procurement Control',
        content: 'A robust workspace for practice managers to track current orders, review approval queues from dental support organizations (DSOs), download clinical invoices, and instantly repeat high-frequency purchases with a single tap.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Unified%20Professional%20Procurement%20Control.jpg'
      },
      {
        type: 'section-header',
        title: '06. Enterprise Design System',
        subtitle: 'Scaling B2B interfaces with modular components.'
      },
      {
        type: 'image-grid',
        images: [
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/enterprise1.jpg',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/enterprise%202.jpg',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/enterprise%203.jpg'
        ],
        columns: 3,
        contain: true,
        padding: true,
        bgWhite: true,
        noGrayscale: true,
        aspect: 'aspect-[4/3]'
      },
      {
        type: 'statement',
        text: 'Standardized UI component libraries that reduce frontend design cycles by 60%.',
        subtext: 'We established comprehensive typography styles (Inter & Poppins), custom healthcare badges, flexible bulk-add data tables, and input forms engineered for high speed input.'
      },
      {
        type: 'section-header',
        title: '07. Measurable Outcomes',
        subtitle: 'Durable, high-performing B2B metrics.'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Purchase Cycle Speed', value: '3x Faster' },
          { label: 'Search Exit Rate', value: '-45%' },
          { label: 'AOV (Average Order Value)', value: '+28%' }
        ]
      },
      {
        type: 'section-header',
        title: '08. Reflections',
        subtitle: 'What we learned designing in a complex professional marketplace.'
      },
      {
        type: 'text-split',
        title: 'Designing for the Dental Ecosystem',
        content: 'B2B product design isn\'t about chasing visual trends—it\'s about respecting the user\'s specialized domain and working environments.\n\n• Balances Business and Professional Needs: Procurement teams need high informational density and lightning fast actions. Minimalism must not sacrifice usability.\n• Scalable Component Architecture is Mandatory: Building a complex, multi-state web application requires clean tokens and modular UI elements to prevent interface drift.\n• Trust is the Ultimate Currency: Displaying transparent bulk discounts, accurate real-time stock levels, and easy reorder pipelines converts one-time buyers into lifetime partners.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/Safco/Designing%20for%20the%20Dental%20Ecosystem.jpg',
        reversed: true
      }
    ]
  },
  {
    id: 'lotiq',
    title: 'LotIQ',
    year: '2026',
    category: 'AI Property Intelligence • Enterprise SaaS',
    image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/thumbnail.jpg',
    accent: '#10b981',
    description: 'AI-Powered Property Intelligence System simplifying complex physical enforcement workflows.',
    blocks: [
      { 
        type: 'hero', 
        title: 'LotIQ', 
        subtitle: 'A system that automates parking enforcement and physical space monitoring using AI, rules, and human validation.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/cover.jpg'
      },
      {
        type: 'phase-intro',
        title: 'Discovery & Problem Framing',
        role: 'Product Designer',
        scope: 'End-to-end product design across system',
        tools: ['Figma', 'Lovable', 'Google AI Studio', 'GitHub', 'Vercel', 'UserTesting'],
        activities: [
          'Audited existing product/system',
          'Identified UX and system-level issues',
          'Defined problem areas and priorities',
          'Mapped user and business needs'
        ]
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
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/Decision.png'
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
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/Friction%20%26%20Inefficiency.jpg'
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
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/cover.jpg',
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
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/website.png',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/propertymangerapp.png',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/engineroom.png'
        ],
        columns: 3
      },
      {
        type: 'text-split',
        tag: 'System A',
        title: 'Lead Generation Website',
        content: 'Modern landing pages designed to convert property managers through clear value propositions and transparent onboarding flow.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/website.png'
      },
      {
        type: 'text-split',
        tag: 'System B',
        title: 'Property Manager App',
        content: 'A control center for landlords to configure rules, define zones, and monitor incidents in real-time across their portfolios.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/propertymangerapp.png',
        reversed: true
      },
      {
        type: 'text-split',
        tag: 'System C',
        title: 'The Backoffice System',
        content: 'The "engine room" where operations teams monitor AI accuracy, handle disputes, and validate escalated incidents to ensure system integrity.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/engineroom.png'
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
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/enforcement.png'
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
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/LotIQ/reflections.jpg',
        reversed: true
      }
    ]
  },
  {
    id: 'flowai',
    title: 'FlowAI',
    year: '2026',
    category: 'AI-Native PM Copilot • Enterprise SaaS',
    image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/cover.jpg',
    accent: '#6366f1',
    description: 'An AI-powered co-working space that automates status updates, summarizes team stand-ups, detects roadmap blocks, and optimizes planning pipelines.',
    blocks: [
      { 
        type: 'hero', 
        title: 'FlowAI PM Copilot', 
        subtitle: 'An intelligent AI copilot for project management streamlining cross-functional communication and proactive planning.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/innercover.jpg'
      },
      {
        type: 'phase-intro',
        title: '01. Overview',
        role: 'Lead Product Designer',
        scope: 'End-to-End Product Strategy, AI Interaction Design, Design Systems',
        tools: ['Figma', 'React', 'Tailwind CSS', 'Google PAIR', 'Framer Motion'],
        activities: [
          'Conducted 12 user interviews with active PMs',
          'Mapped progressive disclosure interaction models',
          'Engineered custom confidence scoring and explainability badges',
          'Created high-fidelity responsive web and mobile layouts'
        ]
      },
      {
        type: 'section-header',
        title: '02. The Problem',
        subtitle: 'Administrative friction and fragmented tool visibility are dragging down modern product teams.'
      },
      {
        type: 'text-split',
        tag: 'Friction',
        title: 'The Status-Chasing Cost',
        content: 'I started by framing the underlying challenges plaguing project managers at mid-sized tech companies. Our industry analysis and preliminary surveys revealed a staggering truth: project managers spend between 40% and 60% of their weekly capacity on purely administrative task coordination.\n\nThis includes chasing down engineers for manual status updates, documenting repetitive blocker alerts, and constantly context-switching across siloed platforms like Slack, Jira, and Notion. Because work is scattered across disconnected systems, teams suffer from a severe loss of central operational visibility. Existing PM tools remain fundamentally reactive; they act as glorified static databases that rely entirely on manual user input, failing to surface proactive insights when tasks begin to stall or resource constraints emerge. I designed FlowAI to directly solve this administrative deficit by shifting the system architecture from a reactive registry to an active, contextual, and proactive copilot.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/friction%20problem.jpg'
      },
      {
        type: 'section-header',
        title: '03. Research & Discovery',
        subtitle: 'Synthesizing real-world friction into core actionable insights.'
      },
      {
        type: 'layered',
        title: 'User Insights & Core Personas',
        content: 'To ground our design, I conducted structured user interviews with 12 active project leads. Three key synthesized insights emerged: first, "Status chasing is a trust tax" — PMs hated pestering engineers, which damaged team morale. Second, "No one trusts an automated timeline" — team leads rejected automatic scheduling because it ignored critical human context. Third, "Tool fatigue causes data decay" — when updating a task is tedious, team members stop doing it, leading to stale roadmap data.\n\nFrom these insights, I developed two primary personas. Sarah (34), an Engineering PM at a fintech startup, struggles to synchronize fast-moving sprint outputs with executive product roadmaps. James (41), an Operations Lead at a SaaS company, struggles to manage capacity constraints across multi-disciplinary, remote teams.\n\nThese insights led me to formulate three core How Might We (HMW) statements:\n• HMW design an AI copilot that automatically synthesizes cross-tool progress updates without pestering developers?\n• HMW visually communicate AI confidence to help PMs verify automatic planning suggestions?\n• HMW design a lightweight mobile-first interface that enables team leads to resolve blockers with a single tap on the go?',
        images: [
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/trust.jpg',
          'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/persona.jpg'
        ]
      },
      {
        type: 'section-header',
        title: '04. Design Goals',
        subtitle: 'Translating research discoveries into clear, measurable product objectives.'
      },
      {
        type: 'text-split',
        tag: 'Metrics for Success',
        title: 'Setting the Operational Benchmark',
        content: 'To guide our design execution and define what success looked like, I established four clear, measurable product design goals, each directly mapped to our core user pain points:\n\n1. Reduce Status-Chasing Overhead by 50%: Directly targeting Sarah\'s pain point of administrative friction, I aimed to automate the collection of updates from background tools like Slack and GitHub, converting them into auto-drafted status reports.\n\n2. Increase Planning Efficiency by 4x: Addressing James\'s resource allocation challenges, the system must generate proactive, optimal task redistribution plans that can be reviewed and approved in seconds rather than hours.\n\n3. Achieve a 90% AI Acceptance Rate: To overcome user skepticism toward automated timeline changes, I designed highly explicit AI confidence scores and explainability layers to ensure PMs felt secure accepting suggestions.\n\n4. Achieve a Sub-5-Second Mobile Resolution Time: Addressing the issue of prolonged project delays, I aimed to design a mobile notification system that allows team leads to resolve flagged task blockers instantly on the go.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/operational%20benchmark.jpg',
        reversed: true
      },
      {
        type: 'section-header',
        title: '05. AI Interaction Decisions',
        subtitle: 'Applying Google PAIR and Nielsen Norman heuristics to secure trust.'
      },
      {
        type: 'text-split',
        tag: 'AI Interaction Logic',
        title: 'Designing for Trust and Transparency',
        content: 'Designing an AI-native interface required a radical departure from traditional B2B SaaS layout patterns. Following the Google PAIR (People + AI Research) guidelines and Nielsen Norman heuristics, I prioritized human control, explicit trust boundaries, and fluid co-creation.\n\nTo prevent cognitive overload, the AI does not interrupt the primary workspace. Instead, it surfaces contextual suggestions in a dedicated, collapsible side panel, utilizing a passive, non-modal presentation layer. Every automated recommendation is paired with an explicit "Confidence Score" (e.g., "94% Confidence") and a detailed explainability card outlining the specific parameters, Slack conversations, and PR commits that drove the recommendation.\n\nCrucially, I established a strict "Human-in-the-loop" pattern: every AI-suggested action is treated as a draft. Every automated adjustment to timelines or task assignments requires human confirmation and is completely reversible with a single-click "Undo" button.\n\nFurthermore, I utilized progressive disclosure to hide complex AI functions behind standard manual triggers, letting users choose their level of automation. When handling system errors or uncertainty (e.g., when developer Slack sentiment is ambiguous), the copilot degrades gracefully, presenting alternative paths rather than a black-box failure.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/ai%20interaction.jpg'
      },
      {
        type: 'quote',
        text: 'SaaS users do not want magical black boxes; they want tools that let them review, edit, understand, and instantly undo decisions.',
        author: 'Lead Product Designer'
      },
      {
        type: 'section-header',
        title: '06. Key Screens & Workspaces',
        subtitle: 'Deliberate layout choices for core web and mobile interactions.'
      },
      {
        type: 'image-full',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/innercover.jpg',
        caption: 'High-Fidelity Web Workspace: Integrating the main team board, contextual AI alerts, and the interactive Copilot Panel.'
      },
      {
        type: 'text-split',
        tag: 'Interface Strategy',
        title: 'Dashboard, Kanban & Mobile Extension',
        content: 'I designed the core interface around four critical workspaces. The primary Dashboard is built for high information density, placing high-level velocity indicators and a priority queue of team blockers front and center. I opted for a clean, minimalist layout to prevent visual noise from competing with critical project data.\n\nThe AI Copilot Panel utilizes a conversational, document-native sidebar interaction model. It acts as an active partner that drafts task briefs, summarizes stand-ups, and auto-populates timelines based on simple natural language prompts.\n\nFor the Kanban Board, I designed custom AI-driven inline flags. Rather than waiting for a weekly meeting, cards automatically glow amber when the system detects a high probability of a missed deadline, providing a hoverable tool-tip explaining the underlying data pattern.\n\nWhen designing the Mobile Extension, I resisted the urge to simply scale down the desktop browser. Instead, I focused strictly on active management on the go: a high-speed, swipe-based notification inbox where project leads can review, approve, or dismiss critical blocker resolution proposals in seconds.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/mobile.jpg',
        reversed: true
      },
      {
        type: 'section-header',
        title: '07. Design System & Typography',
        subtitle: 'A robust Swiss-inspired modern visual vocabulary engineered for utility.'
      },
      {
        type: 'text-split',
        tag: 'Design System',
        title: 'Palette, Typography, & AI UI Elements',
        content: 'For the visual design, I established an elegant, modern, high-contrast Slate theme. I paired the crisp, geometric sans-serif Inter (for UI controls and body copy) with the high-performance monospace JetBrains Mono for data elements and confidence indices. This typographical hierarchy instantly conveys a sense of high technical utility and clarity.\n\nI defined a specific color palette using deep charcoal slates as the structural canvas, clean neutral whites for text, and a vibrant Indigo Violet accent to visually identify AI-generated content. This "AI color signature" helps users instantly distinguish between system-level data and AI-assisted recommendations.\n\nI built several AI-specific custom components for the design system. These include AI Suggestion Cards with built-in action buttons, Confidence Badges with dynamic green-to-amber color-coding based on scoring thresholds, and responsive Copilot Chat Bubbles featuring integrated markdown rendering, feedback thumbs, and expandable citation drawers that document the AI\'s data sources.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/flowaidesignsystem.jpg'
      },
      {
        type: 'section-header',
        title: '08. Outcomes & Metrics',
        subtitle: 'Verifying user trust and workspace acceleration in high-utility settings.'
      },
      {
        type: 'outcomes',
        items: [
          { label: 'Administrative Overhead', value: '-52%' },
          { label: 'Blocker Resolution Speed', value: '65%' },
          { label: 'AI Recommendation Acceptance', value: '88%' }
        ]
      },
      {
        type: 'text-split',
        tag: 'Validation',
        title: 'Key Learnings & Structural Iterations',
        content: 'In hypothetical but highly realistic usability testing with a cohort of 25 engineering project managers, FlowAI achieved remarkable, measurable operational outcomes. The 52% reduction in administrative overhead successfully returned an average of 18 hours per week to team leads.\n\nA key learning from this process was that users do not want a complete black box, nor do they want a verbose chat assistant; they want contextual, inline widgets. If I were to design this project differently today, I would invest earlier in local LLM optimization strategies to ensure instant, sub-100ms response times for mobile interactions, further reducing micro-friction.',
        image: 'https://raw.githubusercontent.com/goharshah47/Portfolioimages/refs/heads/main/FlowAI/keylearnings.jpg',
        reversed: true
      },
      {
        type: 'section-header',
        title: '09. Strategic Reflection',
        subtitle: 'Maintaining human agency as the core heuristic of intelligent SaaS.'
      },
      {
        type: 'statement',
        text: 'FlowAI reinforced that the ultimate measure of AI design is not technological sophistication, but the preservation of human agency.',
        subtext: 'By prioritizing clear user control, absolute transparency of data sources, and contextual UI placements over generic chat interfaces, I learned how to build digital products that feel like true collaborative partners.'
      }
    ]
  }
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

  // Extract navigation items from section headers and phase intros
  const navItems = project.blocks
    .filter(block => block.type === 'section-header' || block.type === 'phase-intro')
    .map((block, idx) => ({
      id: `section-${idx}`,
      // @ts-ignore
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
      { 
        threshold: 0.1, 
        rootMargin: '-140px 0px -65% 0px' 
      }
    );

    const elements = document.querySelectorAll('.case-study-nav-target');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [project.id, project.blocks]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = containerRef.current;
    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top + container.scrollTop;
      
      const offset = 150;
      container.scrollTo({
        top: relativeTop - offset,
        behavior: 'smooth'
      });
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
            // Calculate section ID for headers and phase intros
            let sectionId = '';
            if (block.type === 'section-header' || block.type === 'phase-intro') {
              // @ts-ignore
              const navigableBlocks = project.blocks.filter(b => b.type === 'section-header' || b.type === 'phase-intro');
              const itemIdx = navigableBlocks.indexOf(block);
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
                  <div className="relative z-10 container-wide w-full flex flex-col items-start">
                    <div className="max-w-4xl">
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
                  </div>
                </section>
              );
            case 'phase-intro':
              return (
                <section key={idx} className={`case-study-section section-padding ${bgClass}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="container-wide"
                  >
                    <div className="mb-20 case-study-nav-target" id={sectionId}>
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 block">Phase 01</span>
                      <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4">{block.title}</h2>
                      <div className="h-1 w-20 bg-accent rounded-full opacity-30" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20">
                      <div className="space-y-12">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-accent">Context</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                              <p className="text-fg-muted text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">Role</p>
                              <p className="text-xl md:text-2xl font-bold tracking-tight">{block.role}</p>
                            </div>
                            <div>
                              <p className="text-fg-muted text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">Scope</p>
                              <p className="text-xl md:text-2xl font-bold tracking-tight">{block.scope}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-accent">Tools & Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {block.tools.map((tool, i) => (
                            <span key={i} className="px-5 py-2.5 rounded-full border border-border-theme text-[10px] font-bold tracking-[0.2em] uppercase bg-canvas-muted/50">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-20 border-t border-border-theme/30">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-accent">Key Activities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {block.activities.map((activity, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="p-8 rounded-[2rem] bg-canvas-muted/30 border border-border-theme hover:border-accent/30 transition-all duration-500 group"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <p className="text-sm font-medium leading-relaxed text-fg-muted group-hover:text-fg transition-colors">{activity}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </section>
              );
            case 'section-header':
              return (
                <section key={idx} className={`case-study-section section-padding text-center ${bgClass}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto case-study-nav-target"
                    id={sectionId}
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
                <section key={idx} className={`py-16 md:py-24 px-4 md:px-8 lg:px-12 ${bgClass}`}>
                  <div className={`max-w-[1600px] mx-auto w-full grid gap-8 md:gap-12 lg:gap-16 ${block.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {block.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`rounded-[2rem] md:rounded-[2.5rem] overflow-hidden ${block.aspect || 'aspect-square'} shadow-2xl md:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.45)] border border-border-theme/40 flex items-center justify-center ${block.padding ? 'p-3 md:p-4 lg:p-6' : ''} ${block.bgWhite ? 'bg-white dark:bg-zinc-950' : 'bg-canvas-muted'}`}
                      >
                        <img 
                          src={img} 
                          className={`w-full h-full transition-all duration-700 ${block.contain ? 'object-contain' : 'object-cover'} ${block.noGrayscale ? 'scale-100 hover:scale-[1.03]' : 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100'}`} 
                          alt="" 
                          referrerPolicy="no-referrer" 
                        />
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
                        <div className={`rounded-[2.5rem] overflow-hidden shadow-2xl ${block.aspect || 'aspect-[16/10]'} border border-border-theme/40 flex items-center justify-center ${block.padding ? 'p-6 md:p-8 lg:p-10' : ''} ${block.bgWhite ? 'bg-white dark:bg-zinc-950' : 'bg-canvas-muted'}`}>
                          <img 
                            src={block.before} 
                            className={`w-full h-full transition-all duration-700 ${block.contain ? 'object-contain' : 'object-cover'} grayscale opacity-60`} 
                            alt="Before" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                      </div>
                      <div className="space-y-8">
                        <span className="inline-block px-4 py-2 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">Evolution B (Final)</span>
                        <div 
                          className={`rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.35)] ${block.aspect || 'aspect-[16/10]'} border-4 md:border-8 flex items-center justify-center ${block.padding ? 'p-6 md:p-8 lg:p-10' : ''} ${block.bgWhite ? 'bg-white dark:bg-zinc-950' : 'bg-canvas-muted'}`} 
                          style={{ borderColor: project.accent }}
                        >
                          <img 
                            src={block.after} 
                            className={`w-full h-full transition-all duration-700 ${block.contain ? 'object-contain' : 'object-cover'}`} 
                            alt="After" 
                            referrerPolicy="no-referrer" 
                          />
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-canvas section-padding">
      {/* Background Visual */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] blur-[140px] scale-50 opacity-20" />
      </div>

      <div className="relative z-10 container-wide w-full">
        <div className="max-w-[1200px]">
          <div className="flex flex-col items-start text-left">
            <h1 className="tracking-tight leading-[0.85] mb-12 text-balance max-w-[1150px]">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold block text-[3rem] md:text-[5.25rem] lg:text-[6.2rem] text-fg"
              >
                Turning complex ideas
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-extrabold block text-[4rem] md:text-[7.5rem] lg:text-[8.4rem] mt-1"
              >
                into <span className="text-accent">simple</span>, usable products.
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
  const safcoProject = PROJECTS.find(p => p.id === 'safco-dental') || PROJECTS[0];
  const otherProjects = PROJECTS.filter(p => p.id !== 'safco-dental');

  // Interactive mockup state variables
  const [searchVal, setSearchVal] = useState('');
  const [qty, setQty] = useState(12);
  const [activeCategory, setActiveCategory] = useState('Preventive');
  const [dsoApproved, setDsoApproved] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  // Dental Products Data for Mockup
  const dentalProducts = [
    { name: 'Steri-Pocket Autoclave Pouches', sku: '315-9821', category: 'Preventive', price: 14.95, rating: 4.9, stock: 'High' },
    { name: 'Front Surface Examination Mirror #4', sku: '924-0012', category: 'Instruments', price: 24.50, rating: 4.8, stock: 'High' },
    { name: 'Premium Prophy Paste - Mint Coarse', sku: '211-4091', category: 'Preventive', price: 29.99, rating: 4.7, stock: 'Low' },
    { name: 'M-Type Gutta Percha Points .04', sku: '412-2918', category: 'Endodontics', price: 22.50, rating: 4.9, stock: 'High' },
  ];

  // SKU autocomplete matching
  const showAutocomplete = searchVal.toLowerCase().startsWith('sku') || searchVal.length > 1;
  const filteredAutocomplete = [
    { name: 'Front Surface Examining Mirror #4', sku: 'SKU #924-0012', price: '$24.50', tier: '$21.50 (12+ units)' },
    { name: 'Dual-Surface Dental Mirror #5', sku: 'SKU #924-0018', price: '$32.00', tier: '$28.00 (12+ units)' },
    { name: 'Double-Sided Mirror #5', sku: 'SKU #924-0021', price: '$34.20', tier: '$30.50 (12+ units)' }
  ].filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.sku.toLowerCase().includes(searchVal.toLowerCase()));

  // Price tier math for interactive PDP Card
  const getUnitPrice = (q: number) => {
    if (q >= 12) return 15.20;
    if (q >= 5) return 17.10;
    return 18.50;
  };
  const unitPrice = getUnitPrice(qty);
  const totalPrice = (qty * unitPrice).toFixed(2);
  const standardPriceTotal = (qty * 18.50);
  const savings = (standardPriceTotal - parseFloat(totalPrice)).toFixed(2);

  return (
    <section id="work" className="section-padding bg-canvas transition-colors duration-500">
      {/* Work Section Header */}
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
          A curated selection of B2B digital products, enterprise applications, and AI workspaces engineered for high utility.
        </motion.p>
      </div>

      {/* FLAGSHIP CASE STUDY: SAFCO DENTAL */}
      <div className="container-wide mb-32">
        <motion.a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelect(safcoProject);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(safcoProject);
            }
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="block relative bg-canvas-muted rounded-[3rem] border border-border-theme overflow-hidden p-8 md:p-12 lg:p-16 group hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.45)] hover:-translate-y-1 cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:border-accent/30"
        >
          {/* Subtle light background highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Storyteller Info Panel */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Primary Flagship Project
                </span>
                <span className="text-fg-muted/40 text-xs font-medium">{safcoProject.year}</span>
              </div>
              
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                {safcoProject.title}
              </h3>
              
              <p className="text-lg font-semibold tracking-tight text-fg mb-4 text-balance">
                "Redesigning a B2B dental commerce experience to help professionals find products faster and work more efficiently."
              </p>
              
              <p className="text-fg-muted text-base font-light leading-relaxed mb-8">
                I transformed a legacy B2B dental marketplace experience into a modern, efficient, and user-centered digital product. Our design strategy dramatically simplified discovery of 15,000+ SKUs, streamlined recurring DSO order systems, and unified clinical purchasing under an Apple-inspired visual ecosystem.
              </p>

              {/* Dynamic Highlights Checklist */}
              <div className="space-y-4 mb-10 border-t border-b border-border-theme/60 py-6">
                <div className="flex items-start gap-4">
                  <div className="p-1.5 bg-accent/10 rounded-lg text-accent mt-0.5">
                    <Search size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-fg mb-0.5">SKU-First Predictive Search</h5>
                    <p className="text-xs text-fg-muted font-light">Autocompletes partial SKU numbers to bypass navigation grids completely.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-1.5 bg-accent/10 rounded-lg text-accent mt-0.5">
                    <Filter size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-fg mb-0.5">High-Density PDP Price Tiers</h5>
                    <p className="text-xs text-fg-muted font-light">Interactive price matrices recalculate bulk order savings in real-time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-1.5 bg-accent/10 rounded-lg text-accent mt-0.5">
                    <AlertCircle size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-fg mb-0.5">DSO Procurement Dashboard</h5>
                    <p className="text-xs text-fg-muted font-light">Multi-location order authorizations with built-in spending thresholds.</p>
                  </div>
                </div>
              </div>

              {/* Navigation trigger button (Rendered as div inside anchor for valid HTML markup) */}
              <div 
                className="self-start px-8 py-4 bg-[#050505] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 ease-in-out flex items-center gap-3 shadow-lg group-hover:bg-accent group-hover:translate-y-[-2px] group-hover:shadow-xl group-hover:shadow-accent/25"
              >
                <span>Explore Flagship Case Study</span>
                <ArrowRight size={14} className="transition-transform duration-300 ease-in-out group-hover:translate-x-[6px]" />
              </div>
            </div>

            {/* Right Interactive Mockup Showcase (Clean, high-fidelity cover image) */}
            <div 
              className="lg:col-span-7 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full flex items-center justify-center overflow-hidden"
            >
              <div className="w-full h-full p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="w-full h-full relative overflow-hidden rounded-[2rem] border border-border-theme/60 bg-canvas-muted flex items-center justify-center">
                  <img
                    src={safcoProject.image}
                    alt={safcoProject.title}
                    className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-fg/5 dark:bg-black/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </motion.a>
      </div>

      {/* ADDITIONAL CASE STUDIES SECTION */}
      <div className="container-wide mb-16">
        <h3 className="text-xl font-bold uppercase tracking-[0.3em] text-fg-muted/40 mb-12 border-b border-border-theme pb-4">
          More Enterprise Products & AI Workspaces
        </h3>
      </div>

      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {otherProjects.map((project, idx) => (
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
  const skills = [
    "Product Design",
    "UX Research",
    "Design Systems",
    "Rapid Prototyping",
    "User Flows",
    "User Journey Mapping",
    "UX Architecture",
    "Team Management",
    "HTML/CSS"
  ];

  const tools = [
    "Figma",
    "Sketch",
    "Adobe XD",
    "Adobe Creative Suite",
    "Hotjar",
    "Fullstory",
    "Intercom"
  ];

  const experience = [
    {
      company: "Soft Code Labs",
      period: "Sept 2022 – Present",
      role: "Product Designer",
      location: "Islamabad, PK",
      bullets: [
        "Designed user-centred interfaces in Figma, improving UX and customer satisfaction.",
        "Developed and optimized AI tools to enhance functionality and personalize experiences.",
        "Conducted user research and data analysis to inform design decisions.",
        "Led design reviews and user testing, integrating AI solutions based on feedback.",
        "Collaborated with developers to ensure design accuracy and accessibility."
      ]
    },
    {
      company: "Fiverr.com",
      period: "Nov 2015 – Present",
      role: "Freelance Graphic Designer",
      location: "Remote",
      bullets: [
        "Successfully completed 9,000+ orders globally with 6,000+ positive reviews.",
        "Designed multiple eye-catching logos, business cards, brochures, newsletter and magazine for social media sites.",
        "Working closely with clients throughout projects to create vision and conceive design.",
        "Managed multiple projects simultaneously, ensuring timely delivery and client satisfaction."
      ]
    },
    {
      company: "Soft Code Labs",
      period: "Mar 2020 – Sept 2022",
      role: "Graphic Designer",
      location: "Islamabad, PK",
      bullets: [
        "Led a team of of three designers to develop graphic and production materials.",
        "Developed innovative visual solutions to complex design problems.",
        "Managed the design and development of multiple websites and applications."
      ]
    },
    {
      company: "Shutterstock",
      period: "Ongoing",
      role: "Stock Contributor",
      location: "Remote",
      bullets: [
        "Created high-quality vector graphics and illustrations for various purposes.",
        "Produced scalable vector artwork suitable for print and digital platforms.",
        "Utilised Adobe Illustrator for design creation and editing."
      ]
    }
  ];

  const certifications = [
    { title: "UX Design Professional", issuer: "Google" },
    { title: "Introduction to Artificial Intelligence", issuer: "IBM" }
  ];

  return (
    <section id="about" className="section-padding bg-canvas-muted/20 transition-colors duration-500 border-y border-border-theme">
      <div className="container-wide max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* About Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">About Me</span>
          <h2 className="font-sans font-extrabold text-[2.5rem] md:text-[4rem] lg:text-[5rem] tracking-tighter leading-[0.95] text-balance text-fg">
            Solving complex UX challenges with <span className="text-accent underline decoration-accent/20">clarity</span> and intent.
          </h2>
          <p className="mt-4 text-xl text-fg-muted font-light leading-relaxed max-w-3xl">
            I am a fundamental UI/UX thinker with a solid foundation in computer science, bridging the gap between engineering systems and intuitive user layouts. Deeply responsive to client ambitions, I specialize in simplifying intricate product workflows and developing scalable design patterns.
          </p>
        </motion.div>

        {/* Dynamic Bento & Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Experience Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent block mb-8">Work Experience</span>
              <div className="flex flex-col gap-10 border-l border-border-theme pl-6 md:pl-8 ml-2">
                {experience.map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Circle timeline point */}
                    <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent bg-canvas transition-all duration-300 group-hover:scale-125" />
                    
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-fg leading-none">{job.role}</h3>
                        <span className="text-sm text-accent/80 font-semibold">{job.company}</span>
                      </div>
                      <div className="text-xs text-fg-muted bg-canvas-muted px-2 py-1 rounded border border-border-theme">
                        {job.period} <span className="mx-1">•</span> {job.location}
                      </div>
                    </div>
                    
                    <ul className="list-none space-y-2 text-sm text-fg-muted/90 leading-relaxed font-light">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2">
                          <span className="text-accent select-none mt-1">↳</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Skills, Tools, Education, Certifications */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Skills Division */}
            <div className="p-6 md:p-8 rounded-[2rem] bg-canvas border border-border-theme/65 shadow-sm">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent block mb-5">Professional Skills</span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full bg-canvas-muted border border-border-theme/80 text-[11px] font-semibold text-fg-muted tracking-wide hover:border-accent hover:text-fg transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools Division */}
            <div className="p-6 md:p-8 rounded-[2rem] bg-canvas border border-border-theme/65 shadow-sm">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent block mb-5">Design Tools</span>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full bg-canvas-muted border border-border-theme/80 text-[11px] font-semibold text-fg-muted tracking-wide hover:border-accent hover:text-fg transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Certs */}
            <div className="p-6 md:p-8 rounded-[2rem] bg-canvas border border-border-theme/65 shadow-sm flex flex-col gap-6">
              
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent block mb-3">Education</span>
                <div className="text-sm font-bold text-fg">Bachelor of Computer Science</div>
                <div className="text-xs text-fg-muted mt-1">Comsats University Islamabad, Pakistan</div>
                <div className="text-xs text-accent mt-0.5">Sept 2015</div>
              </div>

              <div className="pt-4 border-t border-border-theme/50">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-accent block mb-3">Industry Credentials</span>
                <div className="flex flex-col gap-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="text-xs text-accent mt-0.5">✔</span>
                      <div>
                        <div className="text-xs font-bold text-fg leading-tight">{cert.title}</div>
                        <div className="text-[11px] text-fg-muted">{cert.issuer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

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
            href="mailto:goharshah3@gmail.com"
            className="inline-block text-2xl md:text-4xl font-bold text-fg hover:text-accent transition-colors pb-2 border-b-2 border-accent"
          >
            goharshah3@gmail.com
          </a>

          <div className="mt-24 pt-12 border-t border-border-theme flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-fg-muted text-sm">© 2026 Syed Gohar Ali. All rights reserved.</p>
            <div className="flex gap-8 text-fg-muted text-sm uppercase tracking-widest font-semibold">
              <a href="https://linkedin.com/in/syedgohar" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
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
