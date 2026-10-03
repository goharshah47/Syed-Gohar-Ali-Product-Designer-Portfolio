import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Heart,
  Droplets,
  Stethoscope,
  Utensils,
  Home as HomeIcon,
  GraduationCap,
  CheckCircle2,
  X,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';

export interface CampaignSlide {
  id: string;
  category: string;
  badge: string;
  headline: string;
  subtext: string;
  image: string;
  focalPoint: string;
  impact: string;
  raised: string;
  goal: string;
  percentage: number;
  location: string;
  icon: React.ElementType;
  suggestedAmounts: { amount: number; label: string }[];
}

export const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: 'clean-water',
    category: 'Water & Sanitation',
    badge: 'Clean Water Initiative',
    headline: 'Bringing Safe Drinking Water to Remote Highland Villages',
    subtext: 'Clean water transforms entire communities. Every solar-powered borehole prevents waterborne illness, restores dignity, and frees young children to attend school.',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=2000&q=85',
    focalPoint: 'object-[center_35%]',
    impact: '$35 secures lifetime clean drinking water for one person',
    raised: '$84,500',
    goal: '$100,000',
    percentage: 84,
    location: 'Turkana Basin & Rift Highlands',
    icon: Droplets,
    suggestedAmounts: [
      { amount: 25, label: 'Clean water filters' },
      { amount: 35, label: 'Lifetime clean water for 1 person' },
      { amount: 70, label: 'Water for two people' },
      { amount: 150, label: 'Equips a school borehole tap' }
    ]
  },
  {
    id: 'emergency-medicine',
    category: 'Urgent Healthcare',
    badge: 'Frontline Clinical Care',
    headline: 'Immediate Clinical Care Where Hospitals Cannot Reach',
    subtext: 'Deploying frontline mobile clinics, surgical trauma kits, and emergency pediatric treatments directly to families affected by sudden conflict and remote rural isolation.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=85',
    focalPoint: 'object-[center_28%]',
    impact: '$50 supplies sterile trauma medicine for 10 patients',
    raised: '$118,200',
    goal: '$140,000',
    percentage: 84,
    location: 'Mobile Relief Corridors',
    icon: Stethoscope,
    suggestedAmounts: [
      { amount: 30, label: 'Pediatric vitamins & antibiotics' },
      { amount: 50, label: 'Care for 10 acute patients' },
      { amount: 100, label: 'Emergency sterile field kit' },
      { amount: 250, label: 'Mobile clinic fuel & triage' }
    ]
  },
  {
    id: 'child-nutrition',
    category: 'Food Security',
    badge: 'Community Kitchens',
    headline: 'Nourishing Children & Restoring Dignity Through Warm Meals',
    subtext: 'Halting severe acute malnutrition with warm therapeutic community kitchens, fortified infant nutrition, and self-sustaining micro-farm agricultural plots.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85',
    focalPoint: 'object-[center_25%]',
    impact: '$25 provides a full month of balanced meals for a child',
    raised: '$62,400',
    goal: '$75,000',
    percentage: 83,
    location: 'Community Nutrition Centers',
    icon: Utensils,
    suggestedAmounts: [
      { amount: 25, label: 'One month of meals for a child' },
      { amount: 50, label: 'Emergency therapeutic food box' },
      { amount: 100, label: 'Family pantry staples for 2 months' },
      { amount: 200, label: 'Community greenhouse seeds & tools' }
    ]
  },
  {
    id: 'crisis-shelter',
    category: 'Disaster Relief',
    badge: 'Emergency Response',
    headline: 'Warm Shelter, Clean Blankets, and Hope for Displaced Families',
    subtext: 'Delivering weatherproof emergency shelter kits, clean solar lanterns, and winter thermal gear to protect displaced families rebuilding after extreme climate disasters.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=2000&q=85',
    focalPoint: 'object-center',
    impact: '$75 shelters a displaced family of five with essentials',
    raised: '$94,800',
    goal: '$110,000',
    percentage: 86,
    location: 'Disaster Rebuilding Zones',
    icon: HomeIcon,
    suggestedAmounts: [
      { amount: 40, label: 'Thermal blankets & solar light' },
      { amount: 75, label: 'Weather-proof shelter kit' },
      { amount: 150, label: 'Family transitional home module' },
      { amount: 300, label: 'Clean water & power pack' }
    ]
  },
  {
    id: 'girls-education',
    category: 'Education & Literacy',
    badge: 'Safe Classrooms',
    headline: 'Equipping Classrooms and Empowering Girls Through Learning',
    subtext: 'Opening safe classrooms, supplying textbooks and study tools, and funding trained teachers so every girl has the opportunity to learn, lead, and build her future.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=2000&q=85',
    focalPoint: 'object-[center_20%]',
    impact: '$40 funds textbooks and full school supplies for a year',
    raised: '$51,000',
    goal: '$60,000',
    percentage: 85,
    location: 'Community Primary Schools',
    icon: GraduationCap,
    suggestedAmounts: [
      { amount: 25, label: 'Backpack & writing supplies' },
      { amount: 40, label: 'Annual textbooks & curriculum' },
      { amount: 80, label: 'Two full student scholarships' },
      { amount: 200, label: 'Classroom library & desk set' }
    ]
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [fullPhotoFit, setFullPhotoFit] = useState(false);
  const [selectedDonationCampaign, setSelectedDonationCampaign] = useState<CampaignSlide | null>(null);

  const AUTOPLAY_INTERVAL = 6000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const currentSlide = CAMPAIGN_SLIDES[currentIdx];

  const goToSlide = useCallback((index: number, newDirection = 1) => {
    setDirection(newDirection);
    setCurrentIdx(index);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentIdx + 1) % CAMPAIGN_SLIDES.length, 1);
  }, [currentIdx, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIdx - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length, -1);
  }, [currentIdx, goToSlide]);

  // Autoplay loop
  useEffect(() => {
    if (isPaused || selectedDonationCampaign) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, selectedDonationCampaign]);

  // Handle user interaction pause
  const handleUserActivity = () => {
    setIsPaused(true);
    setUserInteracted(true);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    handleUserActivity();
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diffX > 45) {
      nextSlide();
    } else if (diffX < -45) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  // Open donation flow preselecting the active campaign
  const handleOpenDonate = (campaign: CampaignSlide) => {
    handleUserActivity();
    setSelectedDonationCampaign(campaign);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
      scale: 0.99
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      scale: 0.99,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      id="hero"
      aria-label="Humanitarian Campaign Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!userInteracted) setIsPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[90vh] h-[90vh] w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#0A120E] flex items-center justify-center transition-colors duration-500 select-none"
    >
      {/* Visual Background Foundation - Warm ivory to neutral */}
      <div className="absolute inset-0 bg-[#FAF8F5] dark:bg-[#0A120E] pointer-events-none" />

      {/* Main Campaign Slides Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* The Humanitarian Photograph:
                - Kept bright, natural, vivid.
                - No heavy dark overlay, color tint, or excessive gloomy gradients.
                - Subject-centered focal framing so faces, children, and people are 100% visible.
                - Responsive fit treatment with optional full-contain toggle.
            */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#F2EEE9] dark:bg-[#070D0A]">
              <img
                src={currentSlide.image}
                alt={currentSlide.headline}
                loading="eager"
                referrerPolicy="no-referrer"
                className={`w-full h-full transition-all duration-700 ease-out brightness-[1.01] contrast-[1.02] ${
                  fullPhotoFit
                    ? 'object-contain p-2 sm:p-4 md:p-6'
                    : `object-cover ${currentSlide.focalPoint}`
                }`}
              />

              {/* Gentle, localized ambient scrim: ONLY subtle edge softening to maintain pristine legibility while preserving full natural photo brightness */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/10 md:bg-gradient-to-r md:from-black/20 md:via-transparent md:to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CAMPAIGN CONTENT: PLACED DIRECTLY OVER THE HERO IMAGE */}
      <div className="relative z-20 container-wide w-full h-full px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-between py-10 md:py-14 pointer-events-none">
        {/* Top Floating Bar: Category Indicator & Full Photo Toggle */}
        <div className="flex items-center justify-between w-full pointer-events-auto">
          {/* Cause Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF8F5]/90 dark:bg-[#0B1511]/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046A38] dark:bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#046A38] dark:text-emerald-400">
              Active Humanitarian Mission
            </span>
            <span className="text-black/20 dark:text-white/20">•</span>
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
              {currentSlide.location}
            </span>
          </div>

          {/* Full Photo Composition Toggle */}
          <button
            onClick={() => setFullPhotoFit(!fullPhotoFit)}
            title={fullPhotoFit ? 'Switch to Full-Bleed View' : 'View Full Uncropped Photo'}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5]/85 dark:bg-[#0B1511]/85 backdrop-blur-md border border-black/5 dark:border-white/10 text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-[#121F1A] transition-all shadow-sm"
          >
            {fullPhotoFit ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{fullPhotoFit ? 'Cover View' : 'Full Photo'}</span>
          </button>
        </div>

        {/* Center/Bottom Overlay Editorial Card:
            - Warm ivory UI backdrop (#FAF8F5/92) with refined frosted blur.
            - Sits DIRECTLY OVER the photograph in a naturally readable area.
            - Deep emerald accents (#046A38).
            - Typography is crisp, dignified, and editorial.
        */}
        <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-6 pt-12 pointer-events-none">
          <motion.div
            key={`text-overlay-${currentSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-full max-w-2xl bg-[#FAF8F5]/92 dark:bg-[#0B1511]/92 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)]"
          >
            {/* Category & Mission Tag */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#046A38]/10 text-[#046A38] dark:bg-emerald-500/20 dark:text-emerald-300 border border-[#046A38]/15 dark:border-emerald-500/30">
                <currentSlide.icon size={13} className="text-[#046A38] dark:text-emerald-400" />
                {currentSlide.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {currentSlide.badge}
              </span>
            </div>

            {/* Strong Humanitarian Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-950 dark:text-white tracking-tight leading-[1.18] mb-3 text-balance">
              {currentSlide.headline}
            </h1>

            {/* Short Supporting Text */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6 text-balance">
              {currentSlide.subtext}
            </p>

            {/* Real Impact & Progress Mini-Bar */}
            <div className="mb-6 p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-800 dark:text-gray-200 font-medium">
                <Heart size={14} className="text-[#046A38] dark:text-emerald-400 fill-[#046A38]/20" />
                <span>{currentSlide.impact}</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{currentSlide.raised}</span> of {currentSlide.goal} funded
              </div>
            </div>

            {/* Actions: Primary "Donate Now" button & Cause info */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenDonate(currentSlide)}
                className="px-7 py-3.5 bg-[#046A38] hover:bg-[#03542C] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#046A38]/25 hover:shadow-xl hover:shadow-[#046A38]/35 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Donate Now</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => {
                  const workEl = document.getElementById('work');
                  if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-full border border-gray-300/80 dark:border-white/15 text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                Explore All Campaigns
              </button>
            </div>
          </motion.div>

          {/* SLIDER CONTROLS & PAGINATION BAR:
              - Minimal pagination: 01 / 05
              - Subtle progress indicator
              - Next / Prev buttons
              - Play / Pause control
          */}
          <div className="pointer-events-auto flex items-center gap-3 bg-[#FAF8F5]/92 dark:bg-[#0B1511]/92 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] px-4 py-2.5 rounded-full shadow-md">
            {/* Minimal Numeric Pagination: 01 / 05 */}
            <div className="flex items-center gap-1.5 px-2 font-mono text-xs font-bold text-gray-900 dark:text-white">
              <span>{String(currentIdx + 1).padStart(2, '0')}</span>
              <span className="text-gray-400 dark:text-gray-600 font-normal">/</span>
              <span className="text-gray-500 dark:text-gray-400 font-normal">
                {String(CAMPAIGN_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Subtle Progress Indicator Bar */}
            <div className="w-16 sm:w-20 h-1.5 bg-black/10 dark:bg-white/15 rounded-full overflow-hidden relative">
              <motion.div
                key={`progress-${currentIdx}-${isPaused}`}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '100%' : '100%' }}
                transition={{
                  duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000,
                  ease: 'linear'
                }}
                className="h-full bg-[#046A38] dark:bg-emerald-400 rounded-full"
              />
            </div>

            {/* Prev Slide */}
            <button
              onClick={() => {
                handleUserActivity();
                prevSlide();
              }}
              aria-label="Previous campaign slide"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Next Slide */}
            <button
              onClick={() => {
                handleUserActivity();
                nextSlide();
              }}
              aria-label="Next campaign slide"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPaused(prev => !prev)}
              aria-label={isPaused ? 'Resume campaign autoplay' : 'Pause campaign autoplay'}
              title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer border-l border-black/10 dark:border-white/10 pl-2"
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide dots along the bottom edge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-auto">
        {CAMPAIGN_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => {
              handleUserActivity();
              goToSlide(i, i > currentIdx ? 1 : -1);
            }}
            aria-label={`Go to slide ${i + 1}: ${slide.category}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentIdx
                ? 'w-7 h-1.5 bg-[#046A38] dark:bg-emerald-400 shadow-sm'
                : 'w-1.5 h-1.5 bg-black/25 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* DONATION FLOW MODAL: Pre-selects the chosen campaign */}
      <AnimatePresence>
        {selectedDonationCampaign && (
          <DonationModal
            campaign={selectedDonationCampaign}
            onClose={() => setSelectedDonationCampaign(null)}
            onSelectCampaign={(c) => setSelectedDonationCampaign(c)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface DonationModalProps {
  campaign: CampaignSlide;
  onClose: () => void;
  onSelectCampaign: (c: CampaignSlide) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
  onSelectCampaign
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(
    campaign.suggestedAmounts[1]?.amount || 50
  );
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;
    setIsCompleted(true);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-[#FAF8F5] dark:bg-[#0E1713] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden my-8"
      >
        {/* Header with Close */}
        <div className="p-6 sm:p-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#046A38]/10 text-[#046A38] dark:bg-emerald-500/20 dark:text-emerald-300 text-xs font-semibold mb-2">
              <campaign.icon size={13} />
              <span>Preselected Mission</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white">
              Support {campaign.badge}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              100% of your tax-deductible gift delivers vital assistance directly to the field.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close donation modal"
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {isCompleted ? (
          /* Confirmation State */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#046A38]/15 text-[#046A38] dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              Thank You for Your Compassion
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md leading-relaxed mb-6">
              Your {frequency === 'monthly' ? 'monthly gift' : 'donation'} of{' '}
              <strong className="text-[#046A38] dark:text-emerald-400">${effectiveAmount}</strong> to the{' '}
              <strong className="text-gray-900 dark:text-white">{campaign.badge}</strong> has been received.
              A tax receipt has been sent to {donorEmail || 'your email'}.
            </p>

            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 w-full text-left text-xs space-y-1.5 mb-6">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Receipt Number:</span>
                <span className="font-mono font-medium text-gray-800 dark:text-gray-200">#AID-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Allocated Mission:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{campaign.category}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Direct Impact:</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">{campaign.impact}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#046A38] hover:bg-[#03542C] text-white font-semibold text-sm rounded-full transition-all cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* Donation Form */
          <form onSubmit={handleDonateSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Campaign Selector Pill Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Selected Humanitarian Mission
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CAMPAIGN_SLIDES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onSelectCampaign(c);
                      setSelectedAmount(c.suggestedAmounts[1]?.amount || 50);
                      setIsCustom(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      c.id === campaign.id
                        ? 'bg-[#046A38] text-white shadow-sm'
                        : 'bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20'
                    }`}
                  >
                    {c.badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-black/5 dark:bg-white/5">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  frequency === 'monthly'
                    ? 'bg-white dark:bg-[#1A2620] text-[#046A38] dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Monthly Gift (Greatest Impact)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  frequency === 'one-time'
                    ? 'bg-white dark:bg-[#1A2620] text-[#046A38] dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                One-Time Gift
              </button>
            </div>

            {/* Suggested Amounts */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                Choose Gift Amount (USD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                {campaign.suggestedAmounts.map((opt) => (
                  <button
                    key={opt.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(opt.amount);
                      setIsCustom(false);
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      !isCustom && selectedAmount === opt.amount
                        ? 'border-[#046A38] bg-[#046A38]/10 text-[#046A38] dark:border-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold'
                        : 'border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="text-lg font-bold">${opt.amount}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  min="5"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustom(true);
                  }}
                  className={`w-full pl-8 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border text-sm font-medium transition-all ${
                    isCustom
                      ? 'border-[#046A38] ring-2 ring-[#046A38]/20 dark:border-emerald-500'
                      : 'border-black/10 dark:border-white/10 text-gray-900 dark:text-white'
                  }`}
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Email for Tax Receipt
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.org"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm"
                />
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck size={16} className="text-[#046A38] dark:text-emerald-400" />
              <span>256-bit SSL encrypted. 100% tax-deductible charitable organization.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#046A38] hover:bg-[#03542C] active:scale-[0.99] text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-[#046A38]/25 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart size={16} className="fill-white/20" />
              <span>
                Complete {frequency === 'monthly' ? 'Monthly' : ''} Gift of ${effectiveAmount}
              </span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSlider;
