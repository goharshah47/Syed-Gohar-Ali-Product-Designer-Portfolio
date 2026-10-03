import React from 'react';
import { 
  Wifi, 
  Battery, 
  Play, 
  Pause, 
  Plus, 
  Check, 
  Clock, 
  Calendar, 
  BarChart2, 
  Settings as SettingsIcon, 
  Flame, 
  Sparkles, 
  Volume2, 
  Shield, 
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

// --- Base Phone Frame Component ---
interface PhoneProps {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
  className?: string;
  badge?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StrydePhone: React.FC<PhoneProps> = ({ 
  children, 
  theme = 'dark', 
  className = '', 
  badge,
  size = 'md' 
}) => {
  const isDark = theme === 'dark';
  
  const sizeClasses = {
    sm: 'w-[260px] sm:w-[280px] h-[540px] sm:h-[580px]',
    md: 'w-[280px] sm:w-[320px] md:w-[340px] h-[580px] sm:h-[660px] md:h-[690px]',
    lg: 'w-[290px] sm:w-[340px] md:w-[370px] h-[600px] sm:h-[700px] md:h-[750px]'
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {badge && (
        <span className="mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/25">
          {badge}
        </span>
      )}
      <div 
        className={`relative ${sizeClasses} rounded-[36px] sm:rounded-[44px] md:rounded-[48px] overflow-hidden border-[6px] sm:border-[8px] md:border-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col ${
          isDark 
            ? 'bg-[#121214] text-stone-100 border-[#27272a] shadow-black/60' 
            : 'bg-[#F8F7F4] text-stone-900 border-[#D6D3CD] shadow-stone-400/40'
        }`}
      >
        {/* iOS Status Bar */}
        <div className={`shrink-0 pt-3 px-6 sm:px-7 flex items-center justify-between text-[11px] font-semibold z-20 ${
          isDark ? 'text-stone-300' : 'text-stone-800'
        }`}>
          <span>9:41</span>
          {/* Dynamic Island pill */}
          <div className="w-20 sm:w-24 h-4.5 sm:h-5 rounded-full bg-black flex items-center justify-center gap-1.5 px-2 border border-stone-800/50 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[8px] sm:text-[9px] text-stone-200 font-medium tracking-wide">STRYDĒ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold">5G</span>
            <Wifi className="w-3 h-3" />
            <Battery className={`w-3.5 h-3.5 ${isDark ? 'fill-stone-300' : 'fill-stone-800'}`} />
          </div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative p-4 sm:p-5">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="shrink-0 pb-2 pt-1 flex justify-center z-20 pointer-events-none">
          <div className={`w-28 sm:w-32 h-1 rounded-full ${
            isDark ? 'bg-stone-600/60' : 'bg-stone-400/60'
          }`} />
        </div>
      </div>
    </div>
  );
};

// --- Bottom Navigation Mockup Inside Phone ---
export const PhoneBottomNav: React.FC<{ active?: 'timer' | 'stats' | 'analytics' | 'settings', isDark?: boolean, compact?: boolean }> = ({
  active = 'timer',
  isDark = true,
  compact = false
}) => {
  if (compact) {
    return (
      <div className="mt-auto pt-2 flex justify-center">
        <div className={`px-4 py-2 rounded-full flex items-center gap-5 backdrop-blur-md shadow-lg border ${
          isDark ? 'bg-stone-900/95 border-stone-800 text-stone-400' : 'bg-white/95 border-stone-200 text-stone-600'
        }`}>
          <Clock className={`w-4 h-4 ${active === 'timer' ? 'text-accent' : ''}`} />
          <BarChart2 className={`w-4 h-4 ${active === 'stats' ? 'text-accent' : ''}`} />
          <TrendingUp className={`w-4 h-4 ${active === 'analytics' ? 'text-accent' : ''}`} />
          <SettingsIcon className={`w-4 h-4 ${active === 'settings' ? 'text-accent' : ''}`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-auto pt-2 border-t flex justify-around items-center text-[9px] font-semibold ${
      isDark ? 'border-stone-800/80 text-stone-500' : 'border-stone-200 text-stone-400'
    }`}>
      <div className={`flex flex-col items-center gap-1 ${active === 'timer' ? 'text-accent font-bold' : ''}`}>
        <Clock className="w-4 h-4" />
        <span>Timer</span>
      </div>
      <div className={`flex flex-col items-center gap-1 ${active === 'stats' ? 'text-accent font-bold' : ''}`}>
        <BarChart2 className="w-4 h-4" />
        <span>Stats</span>
      </div>
      <div className={`flex flex-col items-center gap-1 ${active === 'analytics' ? 'text-accent font-bold' : ''}`}>
        <TrendingUp className="w-4 h-4" />
        <span>Analytics</span>
      </div>
      <div className={`flex flex-col items-center gap-1 ${active === 'settings' ? 'text-accent font-bold' : ''}`}>
        <SettingsIcon className="w-4 h-4" />
        <span>Settings</span>
      </div>
    </div>
  );
};

// --- Home / Timer Screen (Clean Final State) ---
export const StrydeHomeScreen: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 flex flex-col justify-between h-full">
      {/* Top Bar / Category */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent block">Focus Mode</span>
          <h3 className={`text-sm font-bold ${isDark ? 'text-stone-100' : 'text-stone-800'}`}>Deep Work</h3>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
          isDark ? 'bg-stone-800/80 text-stone-300 border-stone-700' : 'bg-stone-100 text-stone-700 border-stone-300'
        }`}>
          Session 03
        </span>
      </div>

      {/* Task Selector Box */}
      <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
        isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200 shadow-2xs'
      }`}>
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <div className="truncate text-left">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">Active Task</span>
            <span className={`text-xs font-semibold truncate block ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
              Finish project presentation
            </span>
          </div>
        </div>
        <span className="text-[10px] text-accent font-bold shrink-0">Change</span>
      </div>

      {/* Circular Timer Ring */}
      <div className="relative flex items-center justify-center my-auto py-2">
        <svg className="w-44 h-44 sm:w-48 sm:h-48 -rotate-90">
          <circle 
            cx="50%" 
            cy="50%" 
            r="42%" 
            className={`${isDark ? 'stroke-stone-800' : 'stroke-stone-200'} fill-none`} 
            strokeWidth="8" 
          />
          <circle 
            cx="50%" 
            cy="50%" 
            r="42%" 
            stroke="#ea580c" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeDasharray="400" 
            strokeDashoffset="100" 
            className="fill-none transition-all duration-700" 
          />
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            25:00
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-accent mt-0.5">Ready</span>
        </div>
      </div>

      {/* Duration & Break Selectors */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] px-1 font-semibold text-stone-400">
          <span>Duration</span>
          <span className="text-accent">Break: 5m</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {['25m', '45m', '60m', 'Custom'].map((item, idx) => (
            <div 
              key={idx} 
              className={`py-1.5 text-center text-[11px] font-bold rounded-lg border transition-colors ${
                idx === 0 
                  ? 'bg-accent text-white border-accent' 
                  : isDark 
                    ? 'bg-stone-900 border-stone-800 text-stone-300' 
                    : 'bg-white border-stone-200 text-stone-700'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <button className="w-full py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-accent/20">
          <Play className="w-3.5 h-3.5 fill-white" />
          Start Focus
        </button>
      </div>

      {/* Bottom Nav */}
      <PhoneBottomNav active="timer" isDark={isDark} />
    </div>
  );
};

// --- Home / Cluttered "Before" State ---
export const StrydeHomeClutteredScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full text-stone-200 text-left">
      {/* Cluttered Upgrade Banner */}
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-600/30 to-purple-600/30 border border-amber-500/40 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300">Upgrade to Pro: 50% Off</span>
        </div>
        <span className="px-1.5 py-0.5 bg-amber-500 text-black text-[8px] font-black uppercase rounded">Claim</span>
      </div>

      {/* Streak Badge & Suggestions */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-950/60 border border-orange-700/50 rounded-full text-[9px] text-orange-300 font-bold">
          <Flame className="w-3 h-3 fill-orange-400 text-orange-400" />
          <span>4-Day Streak!</span>
        </div>
        <span className="text-[9px] text-stone-400">🔥 Top 10% Focusers</span>
      </div>

      {/* Small Compressed Timer */}
      <div className="relative flex items-center justify-center py-1">
        <div className="w-28 h-28 rounded-full border-4 border-stone-700 border-t-accent flex flex-col items-center justify-center">
          <span className="text-xl font-bold font-mono">25:00</span>
          <span className="text-[8px] text-stone-400">Standard</span>
        </div>
      </div>

      {/* Today's Suggestions Box */}
      <div className="p-2 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
        <div className="flex justify-between text-[9px] font-bold text-stone-400">
          <span>Today's Suggestions</span>
          <span className="text-accent text-[8px]">Refresh</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <span className="px-1.5 py-0.5 bg-stone-800 rounded text-[8px] text-stone-300">#deepwork</span>
          <span className="px-1.5 py-0.5 bg-stone-800 rounded text-[8px] text-stone-300">#study25</span>
          <span className="px-1.5 py-0.5 bg-stone-800 rounded text-[8px] text-stone-300">#pomodoro</span>
        </div>
      </div>

      {/* Recent Tasks List */}
      <div className="space-y-1">
        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Recent Tasks</span>
        <div className="p-1.5 bg-stone-900/80 rounded border border-stone-800 text-[10px] truncate">
          Draft weekly architecture notes
        </div>
        <div className="p-1.5 bg-stone-900/80 rounded border border-stone-800 text-[10px] truncate text-stone-500">
          Client check-in call (Completed)
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-2 bg-stone-800 text-stone-300 rounded-lg text-[10px] font-bold uppercase">
        Start Session
      </button>

      <PhoneBottomNav active="timer" isDark={true} />
    </div>
  );
};

// --- Active Session Screen ---
export const StrydeActiveSessionScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full items-center text-center">
      {/* Top active state */}
      <div className="w-full flex items-center justify-between text-stone-400">
        <div className="flex items-center gap-1.5 text-[10px] text-accent font-bold">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>SESSION IN PROGRESS</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-stone-400">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Binaural Beta</span>
        </div>
      </div>

      {/* Center Large Timer Ring */}
      <div className="relative flex items-center justify-center my-auto">
        <svg className="w-52 h-52 sm:w-56 sm:h-56 -rotate-90">
          <circle cx="50%" cy="50%" r="42%" className="stroke-stone-800 fill-none" strokeWidth="8" />
          <circle 
            cx="50%" 
            cy="50%" 
            r="42%" 
            stroke="#ea580c" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeDasharray="450" 
            strokeDashoffset="120" 
            className="fill-none" 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
            22:52
          </span>
          <span className="text-[10px] uppercase tracking-widest text-accent font-bold mt-1">
            Focus Session
          </span>
          <p className="text-xs text-stone-300 font-medium mt-2 max-w-[180px] truncate">
            Finish project presentation
          </p>
        </div>
      </div>

      {/* Ambient Soundscape Notice */}
      <div className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-stone-400 flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-accent" />
        <span>Distraction Shield Active</span>
      </div>

      {/* Control Actions */}
      <div className="w-full grid grid-cols-2 gap-2 pt-4">
        <button className="py-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Pause className="w-3.5 h-3.5" />
          Pause
        </button>
        <button className="py-3 bg-stone-900 hover:bg-rose-950/40 border border-stone-800 hover:border-rose-800/60 text-rose-400 rounded-xl text-xs font-bold uppercase tracking-wider">
          End Session
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
};

// --- Task Management Screen ---
export const StrydeTaskScreen: React.FC = () => {
  const tasks = [
    { title: 'Finish project presentation', category: 'Deep Work', est: '45m', active: true },
    { title: 'Refactor mobile navigation tokens', category: 'Coding', est: '60m', active: false },
    { title: 'Draft release announcement copy', category: 'Writing', est: '30m', active: false },
    { title: 'Review Q3 focus metrics and streaks', category: 'Admin', est: '15m', active: false }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full text-left">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Contextual Tasks</span>
            <h3 className="text-base font-bold text-white">Select Task</h3>
          </div>
          <button className="p-1.5 rounded-lg bg-accent text-white flex items-center gap-1 text-[10px] font-bold px-2">
            <Plus className="w-3 h-3" />
            <span>New</span>
          </button>
        </div>

        <div className="space-y-2 pt-1">
          {tasks.map((task, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                task.active 
                  ? 'bg-accent/15 border-accent text-white shadow-sm' 
                  : 'bg-stone-900 border-stone-800 text-stone-300'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  task.active ? 'bg-accent text-white' : 'border border-stone-700 text-stone-500'
                }`}>
                  {task.active ? '✓' : ''}
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold truncate">{task.title}</div>
                  <div className="flex items-center gap-2 text-[9px] text-stone-400 mt-0.5">
                    <span>{task.category}</span>
                    <span>•</span>
                    <span>{task.est}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold ${task.active ? 'text-accent' : 'text-stone-500'}`}>
                {task.active ? 'Selected' : 'Use'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button className="w-full py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          Confirm & Return to Timer
        </button>
      </div>

      <PhoneBottomNav active="timer" isDark={true} />
    </div>
  );
};

// --- Stats Screen ---
export const StrydeStatsScreen: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex-1 flex flex-col justify-between h-full text-left">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Daily Overview</span>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>Focus Stats</h3>
          </div>
          <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
            <Flame className="w-3 h-3 fill-accent" />
            <span>7-Day Streak</span>
          </div>
        </div>

        {/* Primary metric card */}
        <div className={`p-3.5 rounded-xl border ${
          isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-2xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Today's Focus</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-black font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>3h 45m</span>
            <span className="text-[10px] text-accent font-bold">4 Sessions Completed</span>
          </div>
        </div>

        {/* Weekly Bar Graph */}
        <div className={`p-3.5 rounded-xl border ${
          isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200 shadow-2xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">Weekly Rhythm</span>
          <div className="flex items-end justify-between gap-1.5 h-20 pt-2 px-1">
            {[
              { day: 'M', h: 65, today: false },
              { day: 'T', h: 80, today: false },
              { day: 'W', h: 50, today: false },
              { day: 'T', h: 90, today: false },
              { day: 'F', h: 75, today: false },
              { day: 'S', h: 30, today: false },
              { day: 'S', h: 85, today: true },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-stone-800/40 rounded-t h-full flex items-end">
                  <div 
                    className={`w-full rounded-t ${bar.today ? 'bg-accent' : isDark ? 'bg-stone-700' : 'bg-stone-400'}`} 
                    style={{ height: `${bar.h}%` }} 
                  />
                </div>
                <span className={`text-[9px] font-bold ${bar.today ? 'text-accent' : 'text-stone-400'}`}>{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-2.5 rounded-xl border ${
            isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <span className="text-[9px] font-bold uppercase text-stone-400 block">Total Focus</span>
            <span className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>48.5 hrs</span>
          </div>
          <div className={`p-2.5 rounded-xl border ${
            isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <span className="text-[9px] font-bold uppercase text-stone-400 block">Avg Session</span>
            <span className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>38 mins</span>
          </div>
        </div>
      </div>

      <PhoneBottomNav active="stats" isDark={isDark} />
    </div>
  );
};

// --- Analytics Screen ---
export const StrydeAnalyticsScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full text-left">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Deep Patterns</span>
            <h3 className="text-base font-bold text-white">Focus Analytics</h3>
          </div>
          {/* Toggle pill */}
          <div className="p-0.5 bg-stone-900 border border-stone-800 rounded-lg flex text-[9px] font-bold">
            <span className="px-2 py-0.5 bg-accent text-white rounded">Weekly</span>
            <span className="px-2 py-0.5 text-stone-400">Monthly</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Category Distribution</span>
          <div className="h-2 rounded-full overflow-hidden flex bg-stone-800">
            <div className="bg-accent h-full" style={{ width: '42%' }} />
            <div className="bg-amber-500 h-full" style={{ width: '28%' }} />
            <div className="bg-blue-500 h-full" style={{ width: '18%' }} />
            <div className="bg-stone-500 h-full" style={{ width: '12%' }} />
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px]">
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Deep Work: 42%</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Coding: 28%</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Writing: 18%</div>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-stone-500" /> Admin: 12%</div>
          </div>
        </div>

        {/* Peak Hours Card */}
        <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Optimal Focus Window</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-white font-mono">09:00 AM – 11:30 AM</span>
          </div>
          <p className="text-[10px] text-stone-400 mt-1">
            78% of your 45m+ sessions occur during morning hours with 0 recorded interruptions.
          </p>
        </div>
      </div>

      <PhoneBottomNav active="analytics" isDark={true} />
    </div>
  );
};

// --- Settings Screen ---
export const StrydeSettingsScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full text-left">
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Preferences</span>
          <h3 className="text-base font-bold text-white">Settings</h3>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Focus Preferences</span>
            </div>
            <span className="text-stone-500 text-[10px]">25m / 5m</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Appearance</span>
            </div>
            <span className="text-stone-400 text-[10px] font-semibold">Dark Mode</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-accent" />
              <span>Sound & Ambient Audio</span>
            </div>
            <span className="text-stone-400 text-[10px]">Active</span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Google Calendar Integration</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/50">
              Connected
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>Profile & Security</span>
            </div>
            <ArrowRight className="w-3 h-3 text-stone-500" />
          </div>

          <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-center justify-between text-stone-500">
            <span>About Strydē</span>
            <span className="text-[10px] font-mono">v2.4.0</span>
          </div>
        </div>
      </div>

      <PhoneBottomNav active="settings" isDark={true} />
    </div>
  );
};

// --- Stryde Pro Upgrade Screen ---
export const StrydeProScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-between h-full text-left">
      <div className="space-y-2.5">
        <div className="text-center pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Strydē Pro</span>
          </div>
          <h3 className="text-base font-extrabold text-white">Unleash Deep Focus</h3>
          <p className="text-[11px] text-stone-400">All tools you need for sustained cognitive flow.</p>
        </div>

        {/* Pricing Card */}
        <div className="p-3 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-accent text-center shadow-lg">
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent">Strydē Pro Membership</div>
          <div className="text-2xl font-black text-white mt-0.5 font-mono">$1.99 <span className="text-xs font-normal text-stone-400">/ month</span></div>
          <div className="text-[9px] text-stone-400 mt-0.5">Cancel anytime • 7-day free trial</div>
        </div>

        {/* Feature List */}
        <div className="space-y-1.5 text-[10px] text-stone-300">
          {[
            'Unlimited Daily Focus Sessions',
            'Full Binaural & Ambient Sound Library',
            'Advanced Weekly & Monthly Trend Analytics',
            'Seamless Google Calendar Sync',
            'Cross-Device Cloud State Backup'
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-[8px] shrink-0">
                ✓
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button className="w-full py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-accent/25">
          Upgrade to Strydē Pro — $1.99/mo
        </button>
        <span className="block text-center text-[9px] text-stone-500 mt-1">Free Tier continues with standard timer features</span>
      </div>

      <div className="h-2" />
    </div>
  );
};
