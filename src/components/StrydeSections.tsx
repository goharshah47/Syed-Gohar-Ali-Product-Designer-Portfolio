import React, { useState } from 'react';
import { 
  StrydePhone, 
  StrydeHomeScreen, 
  StrydeHomeClutteredScreen, 
  StrydeActiveSessionScreen, 
  StrydeTaskScreen, 
  StrydeStatsScreen, 
  StrydeAnalyticsScreen, 
  StrydeSettingsScreen, 
  StrydeProScreen 
} from './StrydeScreens';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Layers, 
  Smartphone, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Sliders, 
  BarChart2, 
  TrendingUp,
  X,
  Flame,
  Volume2
} from 'lucide-react';

// --- 1. HERO VISUAL ---
export const StrydeHeroVisual: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_70%)] opacity-15 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 w-full">
        {/* Main Phone */}
        <StrydePhone theme="dark" size="lg" badge="Strydē Mobile • Focus & Timer">
          <StrydeHomeScreen theme="dark" />
        </StrydePhone>

        {/* Secondary Info Highlights */}
        <div className="flex flex-col gap-4 max-w-sm text-left">
          <div className="p-5 rounded-2xl bg-canvas-muted border border-border-theme/80 shadow-sm backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-1">
              Core Paradigm
            </span>
            <h4 className="text-lg font-bold tracking-tight text-fg mb-1">Calm by Default</h4>
            <p className="text-xs text-fg-muted font-light leading-relaxed">
              Every element on the home screen serves one singular goal: helping the user enter a focused work session in under 3 taps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-canvas-muted border border-border-theme/80 shadow-sm backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-1">
              Architecture
            </span>
            <h4 className="text-lg font-bold tracking-tight text-fg mb-1">Contextual Complexity</h4>
            <p className="text-xs text-fg-muted font-light leading-relaxed">
              Advanced task tracking, detailed analytics, soundscapes, and calendar integration remain immediately accessible without cluttering the active canvas.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border-theme/60 bg-canvas flex items-center justify-between text-xs">
            <span className="text-fg-muted">Pricing Model</span>
            <span className="font-bold text-fg">Free + Strydē Pro ($1.99/mo)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. THE CHALLENGE VISUAL: Tension & Principles ---
export const StrydeChallengeVisual: React.FC = () => {
  return (
    <div className="w-full space-y-12">
      {/* Design Tension Grid */}
      <div className="p-8 md:p-12 rounded-3xl bg-canvas-muted border border-border-theme/80">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
            The Fundamental Tension
          </span>
          <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
            More Functionality vs. More Friction
          </h4>
          <p className="text-sm md:text-base text-fg-muted font-light leading-relaxed mt-2">
            When users download a focus tool, they want to get to work immediately. Yet as the product expands to support tasks, stats, analytics, streaks, calendar integrations, and monetization, the interface risks becoming another distraction in their workday.
          </p>
        </div>

        {/* Product Areas vs. Friction Analysis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: 'Focus Sessions', risk: 'Must remain central and fast' },
            { title: 'Task Backlog', risk: 'Can overwhelm the timer' },
            { title: 'Stats & History', risk: 'Can turn timer into dashboard' },
            { title: 'Analytics', risk: 'Heavy charts induce fatigue' },
            { title: 'Settings', risk: 'Configuration bloats home' },
            { title: 'Strydē Pro', risk: 'Aggressive paywalls kill trust' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-canvas border border-border-theme/60 flex flex-col justify-between">
              <span className="text-xs font-bold text-fg mb-1">{item.title}</span>
              <span className="text-[11px] text-fg-muted font-light leading-tight">{item.risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Design Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-canvas border border-border-theme/80 hover:border-accent/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 font-mono font-bold text-sm">
            01
          </div>
          <h5 className="text-xl font-bold tracking-tight text-fg mb-2">Focus First</h5>
          <p className="text-sm text-fg-muted font-light leading-relaxed">
            The active focus session is the heartbeat of the product. No secondary feature or promotion is ever allowed to displace the timer ring from the visual center.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-canvas border border-border-theme/80 hover:border-accent/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 font-mono font-bold text-sm">
            02
          </div>
          <h5 className="text-xl font-bold tracking-tight text-fg mb-2">Complexity on Demand</h5>
          <p className="text-sm text-fg-muted font-light leading-relaxed">
            Advanced capabilities like custom durations, break intervals, and task prioritization appear contextually in lightweight bottom sheets, keeping the primary viewport uncluttered.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-canvas border border-border-theme/80 hover:border-accent/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 font-mono font-bold text-sm">
            03
          </div>
          <h5 className="text-xl font-bold tracking-tight text-fg mb-2">Insight Without Noise</h5>
          <p className="text-sm text-fg-muted font-light leading-relaxed">
            Metrics are separated cleanly into two dedicated tabs: quick daily check-ins on Stats, and deeper longitudinal reflection on Analytics. The timer screen stays clean.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 3. PRODUCT EXPERIENCE: Home Comparison (Before vs After) ---
export const StrydeHomeComparison: React.FC = () => {
  return (
    <div className="w-full space-y-12">
      <div className="text-left max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Simplifying the Home Experience
        </span>
        <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
          Designing for focus meant removing things.
        </h4>
        <p className="text-base text-fg-muted font-light leading-relaxed mt-3">
          The original Home/Timer screen suffered from secondary elements competing for cognitive bandwidth: upgrade banners, streak pressure badges, today's suggested tags, and sprawling recent tasks. By extracting secondary capabilities into dedicated architectural modules, the core focus journey became crystal clear.
        </p>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Before Phone */}
        <div className="p-6 md:p-8 rounded-3xl bg-canvas-muted border border-rose-500/20 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-rose-500">
            <X className="w-4 h-4" />
            <span>Before: Cluttered & Distracting</span>
          </div>
          <StrydePhone theme="dark" size="md">
            <StrydeHomeClutteredScreen />
          </StrydePhone>
          <div className="mt-4 text-center max-w-xs">
            <p className="text-xs text-fg-muted font-light">
              Timer squeezed by promotional banners, streak gamification badges, and floating tags.
            </p>
          </div>
        </div>

        {/* After Phone */}
        <div className="p-6 md:p-8 rounded-3xl bg-canvas-muted border border-emerald-500/30 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-emerald-500">
            <Check className="w-4 h-4" />
            <span>After: Clean & Intentional</span>
          </div>
          <StrydePhone theme="dark" size="md">
            <StrydeHomeScreen theme="dark" />
          </StrydePhone>
          <div className="mt-4 text-center max-w-xs">
            <p className="text-xs text-fg-muted font-light">
              Pristine visual hierarchy: Task → Category → Duration → Break → Start.
            </p>
          </div>
        </div>
      </div>

      {/* Explicit Removed vs. Kept Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-canvas-muted border border-border-theme">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 block mb-3">
            Removed From Home Screen
          </span>
          <div className="space-y-2">
            {[
              { label: 'Pro Upgrade Promotional Banner', reason: 'Moved to non-intrusive Settings & Pro views' },
              { label: 'Gamified Streak Badges', reason: 'Moved to Stats tab to eliminate performance anxiety' },
              { label: 'Today’s Suggestion Tags', reason: 'Removed to stop decision fatigue before starting' },
              { label: 'Sprawling Recent Tasks Backlog', reason: 'Encapsulated into contextual bottom sheet' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                <div>
                  <span className="font-semibold text-fg">{item.label}</span>
                  <span className="text-fg-muted block font-light text-[11px]">{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-canvas-muted border border-border-theme">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3">
            Preserved As Core Functionality
          </span>
          <div className="space-y-2">
            {[
              { label: 'Active Task Selector', reason: 'Visible at a glance with quick 1-tap change sheet' },
              { label: 'Focus Mode Categories', reason: 'Deep Work, Coding, Writing, Design chips' },
              { label: 'Duration & Break Presets', reason: '25m, 45m, 60m, and custom intervals' },
              { label: 'One-Tap Start Focus Action', reason: 'Prominent, high-contrast primary CTA' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <div>
                  <span className="font-semibold text-fg">{item.label}</span>
                  <span className="text-fg-muted block font-light text-[11px]">{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. CORE FOCUS FLOW SEQUENCE ---
export const StrydeCoreFocusFlow: React.FC = () => {
  const steps = [
    { num: '01', title: 'Home / Ready', desc: 'Active task & category primed', phone: <StrydeHomeScreen theme="dark" /> },
    { num: '02', title: 'Task Sheet', desc: 'Select or create focus item', phone: <StrydeTaskScreen /> },
    { num: '03', title: 'Active Focus', desc: 'Distraction-free countdown', phone: <StrydeActiveSessionScreen /> },
    { num: '04', title: 'Stats Check', desc: 'Session logged seamlessly', phone: <StrydeStatsScreen theme="dark" /> },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="text-left max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          End-to-End User Journey
        </span>
        <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
          The Core Focus Sequence
        </h4>
        <p className="text-sm text-fg-muted font-light mt-2">
          From session intent to logged productivity with zero friction points along the way.
        </p>
      </div>

      {/* Responsive Horizontal / Grid Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">
                {idx + 1}
              </span>
              <span className="text-xs font-bold text-fg uppercase tracking-wider">{step.title}</span>
            </div>
            
            <StrydePhone theme="dark" size="sm">
              {step.phone}
            </StrydePhone>

            <span className="text-[11px] text-fg-muted font-light mt-3 text-center">
              {step.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 5. ACTIVE FOCUS HERO SHOWCASE ---
export const StrydeActiveFocusShowcase: React.FC = () => {
  return (
    <div className="w-full p-8 md:p-14 rounded-3xl bg-canvas-muted border border-border-theme flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="max-w-md text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Session Experience</span>
        </div>
        <h4 className="text-3xl md:text-4xl font-black tracking-tight text-fg mb-4">
          Sustaining Attention Through Subtraction
        </h4>
        <p className="text-sm md:text-base text-fg-muted font-light leading-relaxed mb-6">
          Once the timer starts, all navigation, category pickers, and background metrics fade away. The interface converts into a high-legibility ambient HUD featuring only the countdown, the active task name, and gentle pause/end controls.
        </p>

        <div className="space-y-3 border-t border-border-theme/80 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-fg">Large Monospace Digits for at-a-glance desktop visibility</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-fg">Subtle Pulsing Arc reinforcing cognitive flow</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-fg">Integrated Distraction Shield & Ambient Soundscapes</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-accent/15 rounded-full blur-3xl scale-75 pointer-events-none" />
        <StrydePhone theme="dark" size="lg" badge="In-Session Display">
          <StrydeActiveSessionScreen />
        </StrydePhone>
      </div>
    </div>
  );
};

// --- 6. PRODUCT ARCHITECTURE: Tree Diagram ---
export const StrydeArchitectureTree: React.FC = () => {
  const branches = [
    {
      title: '01. TIMER (Home)',
      purpose: 'Primary focus engine & active session',
      items: ['Contextual Task Selector', 'Focus Modes (Deep Work, Coding, Writing, Design)', 'Duration Presets (25m, 45m, 60m, Custom)', 'Break Intervals (5m, 10m, 15m)', 'Active Focus Mode Display']
    },
    {
      title: '02. STATS',
      purpose: 'Daily progress & motivation',
      items: ['Today’s Total Focus Hours', 'Weekly Rhythm Bar Chart', 'Consistency Streak Counter', 'Total Lifetime Focus Hours', 'Recent Session History']
    },
    {
      title: '03. ANALYTICS',
      purpose: 'Longitudinal patterns & insights',
      items: ['Weekly vs. Monthly Trend Graphs', 'Category Percentage Breakdown', 'Peak Productivity Time Windows', 'Interruption & Drop-off Diagnostics']
    },
    {
      title: '04. SETTINGS',
      purpose: 'Configuration without noise',
      items: ['Focus Duration Preferences', 'Appearance: Light / Dark / System', 'Binaural & Ambient Soundscapes', 'Profile & Security', 'About Strydē v2.4']
    },
    {
      title: '05. INTEGRATIONS',
      purpose: 'Ecosystem synchronization',
      items: ['Google Calendar 2-Way Sync', 'Calendar Event Focus Block Import', 'Status Indicator & Reminders']
    },
    {
      title: '06. STRYDĒ PRO',
      purpose: 'Monetization & premium tools',
      items: ['$1.99 / month Subscription', 'Unlimited Focus Sessions', 'Full Soundscape Library', 'Multi-Device Cloud Backup']
    },
  ];

  return (
    <div className="w-full space-y-8">
      <div className="text-left max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Structural Hierarchy
        </span>
        <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
          Information Architecture
        </h4>
        <p className="text-sm text-fg-muted font-light mt-2">
          Each capability is mapped to a dedicated domain so secondary functions never compete with the primary timer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-canvas border border-border-theme flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{b.title}</span>
              </div>
              <p className="text-xs text-fg-muted font-light mb-4">{b.purpose}</p>
              
              <ul className="space-y-2 border-t border-border-theme/60 pt-4">
                {b.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-fg">
                    <span className="text-accent text-[10px] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 7. STATS VS ANALYTICS COMPARISON ---
export const StrydeStatsVsAnalytics: React.FC = () => {
  return (
    <div className="w-full space-y-10">
      <div className="text-left max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Differentiating Progress from Patterns
        </span>
        <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
          From tracking time to understanding progress.
        </h4>
        <p className="text-base text-fg-muted font-light leading-relaxed mt-2">
          A common mistake in productivity UX is merging fast progress checks with complex analytical charts. Strydē establishes a deliberate split: <strong>Stats</strong> answers "How did I do today?", while <strong>Analytics</strong> answers "What patterns govern my deep work?".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Column */}
        <div className="p-6 md:p-8 rounded-3xl bg-canvas-muted border border-border-theme flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-border-theme/60">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Tab 02</span>
              <h5 className="text-lg font-bold text-fg">Stats: Quick Overview</h5>
            </div>
            <span className="text-xs text-fg-muted font-light">"How am I doing today?"</span>
          </div>

          <StrydePhone theme="dark" size="md">
            <StrydeStatsScreen theme="dark" />
          </StrydePhone>

          <div className="mt-6 w-full text-left space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">Today's total focus time and completed session count</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">7-Day habit consistency streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">Lightweight bar chart showing daily distribution</span>
            </div>
          </div>
        </div>

        {/* Analytics Column */}
        <div className="p-6 md:p-8 rounded-3xl bg-canvas-muted border border-border-theme flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-border-theme/60">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Tab 03</span>
              <h5 className="text-lg font-bold text-fg">Analytics: Deep Reflection</h5>
            </div>
            <span className="text-xs text-fg-muted font-light">"What are my focus habits?"</span>
          </div>

          <StrydePhone theme="dark" size="md">
            <StrydeAnalyticsScreen />
          </StrydePhone>

          <div className="mt-6 w-full text-left space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">Weekly vs. Monthly longitudinal comparative toggle</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">Category distribution: Deep Work, Coding, Writing, Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-fg">Algorithmic peak productivity window detection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 8. ADAPTIVE NAVIGATION VISUAL ---
export const StrydeAdaptiveNavVisual: React.FC = () => {
  return (
    <div className="w-full p-8 md:p-12 rounded-3xl bg-canvas-muted border border-border-theme space-y-8">
      <div className="max-w-2xl text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Interaction Innovation
        </span>
        <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight text-fg">
          Adaptive Navigation Dynamics
        </h4>
        <p className="text-sm text-fg-muted font-light mt-2 leading-relaxed">
          On mobile viewports, bottom navigation bars take up valuable vertical real estate. Strydē implements an intelligent scroll-hysteresis detector that minimizes the bar during downward scrolling and smoothly expands upon upward scroll or scroll to top.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-canvas border border-border-theme text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">State 01 • At Rest</div>
          <h5 className="text-base font-bold text-fg mb-2">Standard Navigation</h5>
          <p className="text-xs text-fg-muted font-light mb-4">
            Full tab labels with high-legibility icons when user is stationary or near page top.
          </p>
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex justify-around text-[9px] text-stone-400">
            <div className="text-accent flex flex-col items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5" />Timer</div>
            <div className="flex flex-col items-center gap-1"><BarChart2 className="w-3.5 h-3.5" />Stats</div>
            <div className="flex flex-col items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />Analytics</div>
            <div className="flex flex-col items-center gap-1"><Sliders className="w-3.5 h-3.5" />Settings</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-canvas border border-border-theme text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">State 02 • Scroll Down</div>
          <h5 className="text-base font-bold text-fg mb-2">Compact Island Pill</h5>
          <p className="text-xs text-fg-muted font-light mb-4">
            Labels collapse into an ultra-slim floating pill, expanding readable area for lists and charts.
          </p>
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex justify-center">
            <div className="px-4 py-1.5 rounded-full bg-stone-800 border border-stone-700 flex items-center gap-5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <BarChart2 className="w-3.5 h-3.5" />
              <TrendingUp className="w-3.5 h-3.5" />
              <Sliders className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-canvas border border-border-theme text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">State 03 • Scroll Up</div>
          <h5 className="text-base font-bold text-fg mb-2">Instant Expansion</h5>
          <p className="text-xs text-fg-muted font-light mb-4">
            Any micro-scroll upward immediately re-expands labels for instant, effortless tab switching.
          </p>
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex justify-around text-[9px] text-stone-300">
            <div className="text-accent flex flex-col items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5" />Timer</div>
            <div className="flex flex-col items-center gap-1"><BarChart2 className="w-3.5 h-3.5" />Stats</div>
            <div className="flex flex-col items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />Analytics</div>
            <div className="flex flex-col items-center gap-1"><Sliders className="w-3.5 h-3.5" />Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 9. PERSONALIZATION & DESIGN SYSTEM: Light & Dark Mode ---
export const StrydeThemeAndCalendarVisual: React.FC = () => {
  return (
    <div className="w-full space-y-12">
      <div className="text-left max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Design System Consistency
        </span>
        <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
          Consistency matters most when the interface changes around the user.
        </h4>
        <p className="text-base text-fg-muted font-light leading-relaxed mt-2">
          Strydē was engineered with mathematical parity across light and dark atmospheres. Dark mode is not an inverted hack; both color palettes share identical optical weights, border definitions, and typographic scale ratios.
        </p>
      </div>

      {/* Light vs Dark Phone Pair */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Light Mode Phone */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#EAE7E1] text-stone-900 flex flex-col items-center">
          <span className="px-3 py-1 rounded-full bg-stone-300/80 text-stone-800 text-[10px] font-bold uppercase tracking-widest mb-4">
            Light Atmosphere (#F8F7F4)
          </span>
          <StrydePhone theme="light" size="md">
            <StrydeHomeScreen theme="light" />
          </StrydePhone>
          <p className="text-xs text-stone-700 font-light mt-4 text-center max-w-xs">
            Warm neutral backdrop tailored for bright daytime work environments without eye fatigue.
          </p>
        </div>

        {/* Dark Mode Phone */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#09090b] text-stone-100 flex flex-col items-center">
          <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-200 text-[10px] font-bold uppercase tracking-widest mb-4">
            Dark Atmosphere (#121214)
          </span>
          <StrydePhone theme="dark" size="md">
            <StrydeHomeScreen theme="dark" />
          </StrydePhone>
          <p className="text-xs text-stone-400 font-light mt-4 text-center max-w-xs">
            True deep charcoal surfaces optimizing battery life and nocturnal deep work focus.
          </p>
        </div>
      </div>

      {/* Calendar Integration Feature Block */}
      <div className="p-8 rounded-3xl bg-canvas-muted border border-border-theme flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Google Calendar Sync</span>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-fg mb-2">
            Focus Integrated with Your Schedule
          </h5>
          <p className="text-sm text-fg-muted font-light leading-relaxed">
            Users don't focus in a vacuum—they operate inside busy calendar schedules. Strydē integrates directly with Google Calendar, allowing users to convert calendar events into one-tap focus sessions and log completed work blocks back to their calendar automatically.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-canvas border border-border-theme flex flex-col gap-3 min-w-[240px]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-fg-muted">Google Calendar</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/40">Connected</span>
          </div>
          <div className="h-px bg-border-theme/60" />
          <div className="text-[11px] text-fg-muted font-light">
            ✓ Auto-import calendar meetings as break markers<br />
            ✓ Sync completed focus sessions to calendar
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 10. STRYDĒ PRO: Monetization Showcase ---
export const StrydeProVisual: React.FC = () => {
  return (
    <div className="w-full space-y-10">
      <div className="text-left max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Monetization Strategy
        </span>
        <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
          Monetization should be clear without interrupting the core experience.
        </h4>
        <p className="text-base text-fg-muted font-light leading-relaxed mt-2">
          Instead of locking core timer capabilities behind paywalls or bombarding free users with interstitial popups, Strydē adheres strictly to a clean two-tier paradigm: <strong>FREE</strong> and <strong>STRYDĒ PRO</strong> ($1.99/mo).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Phone Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <StrydePhone theme="dark" size="md" badge="Upgrade Sheet">
            <StrydeProScreen />
          </StrydePhone>
        </div>

        {/* Feature Comparison Table */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 rounded-3xl bg-canvas-muted border border-border-theme">
            <h5 className="text-xl font-bold text-fg mb-4">Value Proposition Matrix</h5>
            
            <div className="divide-y divide-border-theme/60">
              <div className="py-3 flex justify-between items-center text-xs font-bold">
                <span className="text-fg-muted">Capability</span>
                <div className="flex gap-12 text-right">
                  <span className="w-16 text-center text-fg-muted">FREE</span>
                  <span className="w-24 text-center text-accent">STRYDĒ PRO</span>
                </div>
              </div>

              {[
                { name: 'Core Focus Timer (25m, 45m, 60m)', free: '✓', pro: '✓ Unlimited' },
                { name: 'Contextual Task Manager', free: '✓ Up to 5', pro: '✓ Unlimited' },
                { name: 'Ambient Soundscapes & Chimes', free: '1 Preset', pro: 'Full Sound Library' },
                { name: 'Analytics & Insights', free: '7 Days', pro: 'Full Longitudinal' },
                { name: 'Google Calendar 2-Way Sync', free: '—', pro: '✓ Enabled' },
                { name: 'Multi-Device Cloud Backup', free: '—', pro: '✓ Real-time' },
              ].map((row, idx) => (
                <div key={idx} className="py-3.5 flex justify-between items-center text-xs">
                  <span className="font-medium text-fg">{row.name}</span>
                  <div className="flex gap-12 text-right">
                    <span className="w-16 text-center text-fg-muted font-mono">{row.free}</span>
                    <span className="w-24 text-center text-accent font-bold font-mono">{row.pro}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-canvas border border-border-theme flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-fg block">Transparent Pricing</span>
                <span className="text-[11px] text-fg-muted font-light">Simple recurring monthly fee with no annual lock-in traps</span>
              </div>
              <span className="text-lg font-black text-accent font-mono">$1.99 / mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 11. FINAL EXPERIENCE MONTAGE ---
export const StrydeFinalMontage: React.FC = () => {
  return (
    <div className="w-full py-8 space-y-12">
      <div className="text-left max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
          Design Output
        </span>
        <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight text-fg">
          A Cohesive Mobile Ecosystem
        </h4>
        <p className="text-base text-fg-muted font-light mt-2">
          From session launch to longitudinal analytics, every viewport adheres to an unyielding standard of clarity and focus.
        </p>
      </div>

      {/* Multi-Device Montage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
        <StrydePhone theme="dark" size="sm" badge="Ready State">
          <StrydeHomeScreen theme="dark" />
        </StrydePhone>

        <StrydePhone theme="dark" size="sm" badge="Active Timer">
          <StrydeActiveSessionScreen />
        </StrydePhone>

        <StrydePhone theme="dark" size="sm" badge="Weekly Stats">
          <StrydeStatsScreen theme="dark" />
        </StrydePhone>

        <StrydePhone theme="dark" size="sm" badge="Settings & Sync">
          <StrydeSettingsScreen />
        </StrydePhone>
      </div>
    </div>
  );
};

// --- 12. DESIGN TAKEAWAYS & FINAL STATEMENT ---
export const StrydeTakeawaysVisual: React.FC = () => {
  return (
    <div className="w-full space-y-16">
      {/* 3 Core Design Takeaways */}
      <div>
        <div className="text-left max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
            Reflections & Learnings
          </span>
          <h4 className="text-3xl font-extrabold tracking-tight text-fg">
            Design Takeaways
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-canvas border border-border-theme flex flex-col justify-between">
            <div>
              <span className="text-3xl font-black font-mono text-accent block mb-4">01</span>
              <h5 className="text-lg font-bold tracking-tight text-fg mb-3">
                Simplicity is a Product Decision
              </h5>
              <p className="text-sm text-fg-muted font-light leading-relaxed">
                Reducing visible functionality makes the core experience infinitely more powerful when the remaining capabilities are architected with purpose.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-canvas border border-border-theme flex flex-col justify-between">
            <div>
              <span className="text-3xl font-black font-mono text-accent block mb-4">02</span>
              <h5 className="text-lg font-bold tracking-tight text-fg mb-3">
                Contextual Complexity
              </h5>
              <p className="text-sm text-fg-muted font-light leading-relaxed">
                Tasks, customization, analytics, and account controls remain fully available without competing with the primary focus journey.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-canvas border border-border-theme flex flex-col justify-between">
            <div>
              <span className="text-3xl font-black font-mono text-accent block mb-4">03</span>
              <h5 className="text-lg font-bold tracking-tight text-fg mb-3">
                Clarity Builds Trust
              </h5>
              <p className="text-sm text-fg-muted font-light leading-relaxed">
                Consistent navigation, transparent terminology, and predictable visual rhythm make users feel in control of their attention and their tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Editorial Statement */}
      <div className="p-12 md:p-16 rounded-[2.5rem] bg-canvas-muted border border-border-theme text-center relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-4">
          Core Thesis
        </span>
        <blockquote className="text-2xl md:text-4xl font-extrabold tracking-tight text-fg max-w-3xl mx-auto leading-snug mb-6">
          "Strydē became less about showing everything a productivity app can do—and more about helping users focus on what they came to do."
        </blockquote>
        <div className="w-12 h-1 bg-accent mx-auto rounded-full mb-6" />
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-fg-muted">
          Focus less on the interface. Focus more on the work.
        </p>
      </div>
    </div>
  );
};
