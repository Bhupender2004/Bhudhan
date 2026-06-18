'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRewards, AVAILABLE_BADGES, Badge as BadgeType } from '@/lib/context/rewards-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Trophy, Award, BookOpen, ShoppingBag, Check, Copy, AlertTriangle, ChevronRight, Lock, Sparkles, Star } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

// Pre-defined coupons in shop
interface Coupon {
  id: string;
  title: string;
  description: string;
  cost: number;
  code: string;
  icon: string;
}

const AVAILABLE_COUPONS: Coupon[] = [
  {
    id: 'seed-discount',
    title: '15% Off Seeds & Saplings',
    description: 'Get 15% discount on any seed purchases in the BhuDhan Marketplace.',
    cost: 100,
    code: 'BHUSEED15',
    icon: '🌱',
  },
  {
    id: 'free-soil-test',
    title: 'Free Soil Test Voucher',
    description: 'Get one comprehensive soil test report free at partner labs.',
    cost: 200,
    code: 'BHUSOILFREE',
    icon: '🧪',
  },
  {
    id: 'priority-expert',
    title: 'Priority Expert Call',
    description: 'Bypass the queue and get an instant video consultation with an agricultural expert.',
    cost: 150,
    code: 'BHUEXPERTPRO',
    icon: '👨‍🔬',
  },
  {
    id: 'free-tractor-delivery',
    title: 'Free Equipment Delivery',
    description: 'Free logistics/delivery on your next tractor or harvester rental booking.',
    cost: 250,
    code: 'BHUTRANS250',
    icon: '🚜',
  },
];

// Pre-defined quizzes
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  questions: Question[];
}

const QUIZZES: Quiz[] = [
  {
    id: 'soil-health',
    title: 'Soil Health & NPK Balance',
    description: 'Learn the essentials of soil composition, pH levels, and macronutrients N, P, and K.',
    category: 'Soil Science',
    icon: '🧪',
    questions: [
      {
        question: 'What does the "N" represent in NPK fertilizers?',
        options: ['Sodium', 'Nitrogen', 'Nickel', 'Potassium'],
        correctAnswer: 1,
      },
      {
        question: 'Which of the following soil types has the highest water retention capacity?',
        options: ['Sandy Soil', 'Silt Soil', 'Clay Soil', 'Peat Soil'],
        correctAnswer: 2,
      },
      {
        question: 'What is the ideal pH range for most agricultural crops to absorb nutrients?',
        options: ['4.0 - 5.0', '6.0 - 7.5', '8.0 - 9.5', '5.0 - 5.5'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'organic-farming',
    title: 'Organic Farming Principles',
    description: 'Master chemical-free pest control, crop rotation, and natural composting.',
    category: 'Sustainability',
    icon: '🍎',
    questions: [
      {
        question: 'Which of these inputs is strictly prohibited in certified organic farming?',
        options: ['Vermicompost', 'Bio-pesticides', 'Synthetic Urea', 'Neem Cake'],
        correctAnswer: 2,
      },
      {
        question: 'What is the primary agronomic benefit of crop rotation?',
        options: ['Reducing harvest time', 'Natural soil fertility restoration & pest disruption', 'Decreasing seed costs', 'Increasing crop water requirements'],
        correctAnswer: 1,
      },
      {
        question: 'Which bacterium forms a symbiotic relationship with legume roots to fix nitrogen?',
        options: ['E. Coli', 'Lactobacillus', 'Rhizobium', 'Streptomyces'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'smart-irrigation',
    title: 'Smart Irrigation & Water Management',
    description: 'Optimize water efficiency using drip technology, sprinkler timing, and mulching.',
    category: 'Water Conservation',
    icon: '💧',
    questions: [
      {
        question: 'Which irrigation method is most water-efficient (up to 90% efficiency)?',
        options: ['Flood Irrigation', 'Furrow Irrigation', 'Sprinkler Irrigation', 'Drip Irrigation'],
        correctAnswer: 3,
      },
      {
        question: 'What is the primary role of "mulching" in agricultural fields?',
        options: ['Attracting beneficial insects', 'Retaining soil moisture and reducing evaporation', 'Speeding up seed germination', 'Improving soil pH'],
        correctAnswer: 1,
      },
      {
        question: 'When is the best time to irrigate crops to minimize water loss due to evaporation?',
        options: ['Mid-day (12 PM - 3 PM)', 'Late afternoon (3 PM - 5 PM)', 'Early morning or late evening', 'Midnight'],
        correctAnswer: 2,
      },
    ],
  },
];

export default function RewardsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const {
    points,
    level,
    streak,
    badges,
    quizzesCompleted,
    addPoints,
    completeQuiz,
  } = useRewards();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Quiz states
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Coupon states
  const [purchasedCoupons, setPurchasedCoupons] = useState<string[]>([]);
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Load purchased coupons from localStorage
    if (typeof window !== 'undefined') {
      const savedCoupons = localStorage.getItem('rewards_purchased_coupons');
      if (savedCoupons) {
        setPurchasedCoupons(JSON.parse(savedCoupons));
      }
    }
  }, []);

  // Update active tab from URL if it changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto" />
          <p className="text-muted-foreground text-sm font-semibold animate-pulse">Loading Rewards Center...</p>
        </div>
      </div>
    );
  }

  // Points details
  const pointsInCurrentLevel = points - (level - 1) * 150;
  const pointsNeededForNextLevel = 150;
  const progressPercent = Math.min(Math.max((pointsInCurrentLevel / pointsNeededForNextLevel) * 100, 0), 100);
  
  // Chart configurations
  const quizPoints = Object.values(quizzesCompleted).reduce((sum, score) => sum + score * 10, 0);
  const badgePoints = badges.length * 50;
  const checkinPoints = Math.max(points - quizPoints - badgePoints, 0);

  const chartData = {
    labels: ['Quizzes', 'Badges', 'Check-ins & Activities'],
    datasets: [
      {
        data: [quizPoints, badgePoints, checkinPoints],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Emerald
          'rgba(245, 158, 11, 0.8)', // Amber
          'rgba(59, 130, 246, 0.8)',  // Blue
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
            weight: 'bold' as const,
          },
          padding: 15,
        },
      },
    },
  };

  // Quiz helper functions
  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelection = (index: number) => {
    if (selectedAnswer !== null) return; // Answer already selected
    setSelectedAnswer(index);
    
    if (index === activeQuiz!.questions[currentQuestionIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeQuiz === null) return;
    
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      completeQuiz(activeQuiz.id, quizScore, activeQuiz.questions.length);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setQuizFinished(false);
  };

  // Coupon helper functions
  const buyCoupon = (coupon: Coupon) => {
    if (points < coupon.cost) {
      toast.error('Insufficient Points!', {
        description: `You need ${coupon.cost} XP to redeem this coupon. You currently have ${points} XP.`,
      });
      return;
    }

    if (purchasedCoupons.includes(coupon.id)) {
      toast.warning('Already Purchased', {
        description: 'You already possess this coupon voucher.',
      });
      return;
    }

    // Deduct points
    addPoints(-coupon.cost, `Redeemed Coupon: ${coupon.title}`);
    
    // Save to list
    const newCoupons = [...purchasedCoupons, coupon.id];
    setPurchasedCoupons(newCoupons);
    localStorage.setItem('rewards_purchased_coupons', JSON.stringify(newCoupons));

    toast.success('Voucher Redeemed Successfully!', {
      description: `Check the code below and copy it for check-out.`,
      icon: '🎫',
    });
  };

  const copyToClipboard = (couponId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(couponId);
    toast.success('Coupon Code Copied!', {
      description: `Voucher code ${code} is ready to paste at checkout.`,
    });
    setTimeout(() => setCopiedCouponId(null), 3000);
  };

  return (
    <div className="space-y-6 px-4 md:px-10 max-w-[1400px] mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rewards & Learning Center</h1>
        <p className="text-muted-foreground">
          Complete quizzes, unlock badges, and redeem farming coupons with your XP points.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg font-bold">Overview</TabsTrigger>
          <TabsTrigger value="quizzes" className="rounded-lg font-bold">Daily Quizzes</TabsTrigger>
          <TabsTrigger value="badges" className="rounded-lg font-bold">My Badges</TabsTrigger>
          <TabsTrigger value="shop" className="rounded-lg font-bold">Rewards Shop</TabsTrigger>
        </TabsList>

        {/* ──────── TAB: OVERVIEW ──────── */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* XP and Level Summary */}
            <Card className="md:col-span-2 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-100 dark:border-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-60 h-60 bg-emerald-500/5 dark:bg-emerald-500/2 rounded-full blur-3xl pointer-events-none" />
              
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Progression Portal</span>
                </div>
                <CardTitle className="text-3xl font-black mt-2">Farmer Level {level}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  Complete achievements and answer quizzes to level up your farming knowledge.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Level Circle & Progress */}
                <div className="flex flex-col sm:flex-row items-center gap-6 py-4">
                  {/* Huge Circular XP Gauge */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="48" strokeWidth="8" stroke="currentColor" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                      <circle cx="56" cy="56" r="48" strokeWidth="8" strokeDasharray={2 * Math.PI * 48} strokeDashoffset={2 * Math.PI * 48 * (1 - progressPercent / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" className="text-emerald-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-none">{points}</span>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">XP Points</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-2.5">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Knowledge Progress Bar</h3>
                    <Progress value={progressPercent} className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="flex justify-between text-xs font-bold text-muted-foreground">
                      <span>{points - pointsInCurrentLevel} XP (Level {level} Start)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{level * 150} XP (Level {level + 1})</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 bg-emerald-500/5 border border-emerald-500/10 px-3 py-2 rounded-xl">
                      💡 Tip: Every quiz answered correctly yields **10 XP**! A perfect score unlocks exclusive badges worth **50 XP** each.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Streak & Badges Summary */}
            <Card className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                  <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                  Your Stats
                </CardTitle>
                <CardDescription>A quick glance at your accomplishments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="flex items-center gap-3 p-3 bg-amber-50/50 dark:bg-slate-900/50 rounded-2xl border border-amber-100/30 dark:border-slate-800">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/35 text-orange-600 dark:text-orange-400">
                    <span className="text-xl">🔥</span>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground font-semibold">Active Streak</h4>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">{streak} Days Consistent</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-emerald-50/50 dark:bg-slate-900/50 rounded-2xl border border-emerald-100/30 dark:border-slate-800">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/35 text-emerald-600 dark:text-emerald-400">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground font-semibold">Total Badges</h4>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100">{badges.length} Unlocked</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full font-bold border-slate-200 dark:border-slate-800 rounded-xl" onClick={() => setActiveTab('quizzes')}>
                  Explore Quizzes
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Points Breakdown Chart & Activities */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border border-slate-200 dark:border-slate-800 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">XP Points Breakdown</CardTitle>
                <CardDescription>Visual chart representing how you have earned your farming experience.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center relative">
                {points === 0 ? (
                  <div className="text-center text-muted-foreground text-sm font-semibold py-8">
                    No XP data available. Complete activities to populate the chart!
                  </div>
                ) : (
                  <div className="w-full h-full p-2">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Daily Activities Checklist</CardTitle>
                <CardDescription>Perform these tasks daily to log experience and maintain streaks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-50 text-xs p-0 text-slate-600 border-slate-200">1</Badge>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">Daily App Check-In</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Log in and claim your streak points.</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-bold">+15 XP</Badge>
                </div>

                <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-50 text-xs p-0 text-slate-600 border-slate-200">2</Badge>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">Complete a Knowledge Quiz</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Answer standard topic quizzes correctly.</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-bold">Up to +30 XP</Badge>
                </div>

                <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-50 text-xs p-0 text-slate-600 border-slate-200">3</Badge>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">Scan Crop / Check Prices</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Use BhuDhan AI Tools to analyze fields or mandis.</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-bold">+5 XP</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl" onClick={() => setActiveTab('shop')}>
                  Redeem Rewards Shop
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* ──────── TAB: QUIZZES ──────── */}
        <TabsContent value="quizzes" className="space-y-6">
          {activeQuiz === null ? (
            <div className="grid gap-6 md:grid-cols-3">
              {QUIZZES.map((quiz) => {
                const prevScore = quizzesCompleted[quiz.id] || 0;
                const isCompleted = prevScore > 0;
                const isPerfect = prevScore === quiz.questions.length;

                return (
                  <Card key={quiz.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-32 h-32 bg-slate-100 dark:bg-slate-800/30 rounded-full group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                    
                    <CardHeader className="pb-3 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                          {quiz.category}
                        </span>
                        {isCompleted && (
                          <Badge variant={isPerfect ? 'default' : 'secondary'} className="font-bold text-[10px]">
                            {isPerfect ? '🏅 Perfect Score' : `Score: ${prevScore}/${quiz.questions.length}`}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mt-1">
                        <span className="text-2xl">{quiz.icon}</span>
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-2">
                        {quiz.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 p-4 flex justify-between items-center relative z-10">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{quiz.questions.length} Questions</span>
                      <Button onClick={() => startQuiz(quiz)} className="font-bold bg-emerald-600 hover:bg-emerald-700 h-9 rounded-xl group/btn px-4">
                        {isCompleted ? 'Retry Quiz' : 'Start Quiz'}
                        <ChevronRight className="h-4 w-4 ml-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Active Quiz Interface */
            <div className="max-w-2xl mx-auto">
              {!quizFinished ? (
                <Card className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-slate-900">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{activeQuiz.icon}</span>
                      <h3 className="font-bold">{activeQuiz.title}</h3>
                    </div>
                    <span className="text-xs font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
                      Q {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex) / activeQuiz.questions.length) * 100}%` }}
                    />
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="text-lg md:text-xl font-bold leading-snug text-slate-800 dark:text-slate-100">
                      {activeQuiz.questions[currentQuestionIndex].question}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 space-y-3">
                    {activeQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === activeQuiz.questions[currentQuestionIndex].correctAnswer;
                      const hasAnswered = selectedAnswer !== null;

                      let optionStyle = 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50';
                      
                      if (hasAnswered) {
                        if (isCorrect) {
                          optionStyle = 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 dark:bg-green-950/20';
                        } else if (isSelected) {
                          optionStyle = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 dark:bg-red-950/20';
                        } else {
                          optionStyle = 'border-slate-200 opacity-60 dark:border-slate-800';
                        }
                      }

                      return (
                        <button
                          key={index}
                          disabled={hasAnswered}
                          onClick={() => handleAnswerSelection(index)}
                          className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all flex items-center justify-between group ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {hasAnswered && isCorrect && <span className="text-green-600 text-lg">✓</span>}
                          {hasAnswered && isSelected && !isCorrect && <span className="text-red-600 text-lg">✗</span>}
                        </button>
                      );
                    })}
                  </CardContent>

                  <CardFooter className="px-6 py-4 border-t bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                    <Button variant="ghost" onClick={resetQuiz} className="font-semibold text-muted-foreground rounded-xl">
                      Quit Quiz
                    </Button>
                    <Button
                      disabled={selectedAnswer === null}
                      onClick={handleNextQuestion}
                      className="font-bold bg-emerald-600 hover:bg-emerald-700 px-6 rounded-xl"
                    >
                      {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Finish' : 'Next Question'}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                /* Quiz Finished / Score screen */
                <Card className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl text-center p-8 bg-white dark:bg-slate-900 relative">
                  {quizScore === activeQuiz.questions.length && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                      {/* Simple CSS-based Confetti celebration particles */}
                      <div className="absolute top-1/4 left-1/4 animate-bounce text-xl">🎉</div>
                      <div className="absolute top-1/3 right-1/4 animate-ping text-xl">✨</div>
                      <div className="absolute bottom-1/4 left-1/3 animate-bounce text-xl">🌸</div>
                      <div className="absolute bottom-1/3 right-1/3 animate-pulse text-xl">⭐</div>
                    </div>
                  )}

                  <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/40 text-amber-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
                    {quizScore === activeQuiz.questions.length ? '🏅' : '👍'}
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Quiz Completed!</h3>
                  <p className="text-muted-foreground text-sm font-semibold mt-1 uppercase tracking-wider">{activeQuiz.title}</p>
                  
                  <div className="my-6">
                    <p className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                      {quizScore} / {activeQuiz.questions.length}
                    </p>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mt-2">
                      {quizScore === activeQuiz.questions.length 
                        ? 'Perfect Score! You unlocked a specialized knowledge badge!'
                        : 'Good job! Review the farming guides to try for a perfect score.'}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 mb-6 flex justify-around items-center">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">Correct Answers</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{quizScore}</p>
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">XP Earned</p>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">+{quizScore * 10} XP</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={resetQuiz} className="font-bold border-slate-200 dark:border-slate-800 rounded-xl px-6">
                      Back to Quizzes
                    </Button>
                    {quizScore < activeQuiz.questions.length && (
                      <Button onClick={() => startQuiz(activeQuiz)} className="font-bold bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                        Retry Quiz
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* ──────── TAB: MY BADGES ──────── */}
        <TabsContent value="badges" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {AVAILABLE_BADGES.map((badge) => {
              const isUnlocked = badges.includes(badge.id);

              return (
                <Card 
                  key={badge.id} 
                  className={`border rounded-2xl overflow-hidden relative transition-all duration-300 ${
                    isUnlocked 
                      ? 'border-emerald-200 bg-gradient-to-br from-emerald-500/5 to-transparent shadow-md hover:shadow-lg hover:scale-[1.02] dark:border-emerald-950/20' 
                      : 'border-slate-200 bg-slate-50/50 opacity-70 dark:border-slate-800 dark:bg-slate-900/30'
                  }`}
                >
                  <CardHeader className="pb-3 text-center">
                    {/* Badge Icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl mb-3 border-2 transition-transform duration-500 ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-white dark:border-slate-800 shadow-md scale-105 animate-pulse' 
                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700 grayscale'
                    }`}>
                      {isUnlocked ? badge.icon : '🔒'}
                    </div>

                    <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex justify-center items-center gap-1.5 leading-none">
                      {badge.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-2 h-10 overflow-hidden">
                      {badge.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-4 pt-1 flex flex-col items-center">
                    <Badge variant={isUnlocked ? 'default' : 'outline'} className="font-bold text-[10px] tracking-wide">
                      {isUnlocked ? '🏅 UNLOCKED' : 'LOCKED'}
                    </Badge>
                  </CardContent>

                  <div className="border-t border-slate-100 dark:border-slate-800 p-2.5 bg-slate-50/50 dark:bg-slate-900/20 text-center text-[10px] font-bold text-muted-foreground uppercase">
                    {isUnlocked ? 'Claimed +50 XP' : `Reward: +${badge.pointsReward} XP`}
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* ──────── TAB: REWARDS SHOP ──────── */}
        <TabsContent value="shop" className="space-y-6">
          {/* Points display banner */}
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl border-none shadow-md overflow-hidden relative">
            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
              <div>
                <h3 className="text-lg font-bold">Rewards Shop</h3>
                <p className="text-xs text-white/90 font-medium mt-1">Deduct points to unlock vouchers, free services, and marketplace discounts.</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 text-center shadow-inner shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Your Wallet</p>
                <p className="text-2xl font-black mt-1">🪙 {points} XP</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {AVAILABLE_COUPONS.map((coupon) => {
              const isPurchased = purchasedCoupons.includes(coupon.id);
              const canAfford = points >= coupon.cost;

              return (
                <Card 
                  key={coupon.id} 
                  className={`border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    isPurchased 
                      ? 'border-emerald-200 bg-emerald-500/5 dark:border-emerald-950/20' 
                      : 'border-slate-200 hover:shadow-md'
                  }`}
                >
                  <CardHeader className="pb-3 flex-row gap-4 items-start">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/40 rounded-xl flex items-center justify-center text-2xl shrink-0 border shadow-sm">
                      {coupon.icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 truncate">{coupon.title}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-1 h-12 overflow-hidden">
                        {coupon.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    {isPurchased ? (
                      /* Display active code once bought */
                      <div className="bg-white dark:bg-slate-900 border border-dashed border-emerald-500 rounded-xl p-3 flex items-center justify-between shadow-sm animate-fade-in">
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest leading-none">Coupon Active</p>
                          <p className="text-base font-black text-slate-800 dark:text-slate-100 mt-1 font-mono tracking-wider">{coupon.code}</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => copyToClipboard(coupon.id, coupon.code)}
                          className="font-bold bg-emerald-600 hover:bg-emerald-700 h-9 rounded-lg"
                        >
                          {copiedCouponId === coupon.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              Copy Code
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      /* Price display */
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-sm font-semibold">
                        <span>Cost:</span>
                        <span className="text-amber-600 dark:text-amber-400 font-black">🪙 {coupon.cost} XP</span>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-2 border-t bg-slate-50/50 dark:bg-slate-900/10 p-3.5 flex justify-end">
                    {!isPurchased && (
                      <Button
                        disabled={!canAfford}
                        onClick={() => buyCoupon(coupon)}
                        className={`font-bold rounded-xl h-9 px-5 transition-all ${
                          canAfford 
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500 dark:border-slate-800'
                        }`}
                      >
                        {!canAfford ? 'Need More XP' : 'Redeem Voucher'}
                      </Button>
                    )}
                    {isPurchased && (
                      <Badge className="bg-emerald-500 text-white font-bold text-[9px] px-2.5 py-1 uppercase rounded-md shadow-sm">
                        Purchased
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
