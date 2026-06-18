'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name or emoji
  category: 'streak' | 'quiz' | 'action';
  pointsReward: number;
}

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'consistent-cultivator',
    title: 'Consistent Cultivator',
    description: 'Maintain a 3-day daily check-in streak',
    icon: '🌱',
    category: 'streak',
    pointsReward: 50,
  },
  {
    id: 'agri-scholar',
    title: 'Agri Scholar',
    description: 'Maintain a 7-day daily check-in streak',
    icon: '📚',
    category: 'streak',
    pointsReward: 100,
  },
  {
    id: 'soil-specialist',
    title: 'Soil Specialist',
    description: 'Get a perfect score on the Soil Health Quiz',
    icon: '🧪',
    category: 'quiz',
    pointsReward: 50,
  },
  {
    id: 'organic-pioneer',
    title: 'Organic Pioneer',
    description: 'Get a perfect score on the Organic Farming Quiz',
    icon: '🍎',
    category: 'quiz',
    pointsReward: 50,
  },
  {
    id: 'water-warden',
    title: 'Water Warden',
    description: 'Get a perfect score on the Smart Irrigation Quiz',
    icon: '💧',
    category: 'quiz',
    pointsReward: 50,
  },
  {
    id: 'pest-pathfinder',
    title: 'Pest Pathfinder',
    description: 'Successfully scan a crop for disease detection',
    icon: '🔬',
    category: 'action',
    pointsReward: 50,
  },
  {
    id: 'market-guru',
    title: 'Market Guru',
    description: 'Browse Mandi prices or check a crop price calculation',
    icon: '📈',
    category: 'action',
    pointsReward: 30,
  },
];

interface RewardsContextType {
  points: number;
  level: number;
  streak: number;
  lastCheckIn: string | null;
  badges: string[];
  quizzesCompleted: Record<string, number>;
  activitiesLogged: string[];
  addPoints: (amount: number, reason: string) => void;
  claimDailyCheckIn: () => boolean;
  unlockBadge: (badgeId: string) => void;
  completeQuiz: (quizId: string, score: number, totalQuestions: number) => void;
  logActivity: (activityId: string, pointsEarned?: number) => void;
  canCheckInToday: () => boolean;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [quizzesCompleted, setQuizzesCompleted] = useState<Record<string, number>>({});
  const [activitiesLogged, setActivitiesLogged] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPoints = localStorage.getItem('rewards_points');
      const savedLevel = localStorage.getItem('rewards_level');
      const savedStreak = localStorage.getItem('rewards_streak');
      const savedLastCheckIn = localStorage.getItem('rewards_last_checkin');
      const savedBadges = localStorage.getItem('rewards_badges');
      const savedQuizzes = localStorage.getItem('rewards_quizzes');
      const savedActivities = localStorage.getItem('rewards_activities');

      if (savedPoints) setPoints(parseInt(savedPoints, 10));
      if (savedLevel) setLevel(parseInt(savedLevel, 10));
      if (savedStreak) setStreak(parseInt(savedStreak, 10));
      if (savedLastCheckIn) setLastCheckIn(savedLastCheckIn);
      if (savedBadges) setBadges(JSON.parse(savedBadges));
      if (savedQuizzes) setQuizzesCompleted(JSON.parse(savedQuizzes));
      if (savedActivities) setActivitiesLogged(JSON.parse(savedActivities));
      
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('rewards_points', points.toString());
      localStorage.setItem('rewards_level', level.toString());
      localStorage.setItem('rewards_streak', streak.toString());
      localStorage.setItem('rewards_last_checkin', lastCheckIn || '');
      localStorage.setItem('rewards_badges', JSON.stringify(badges));
      localStorage.setItem('rewards_quizzes', JSON.stringify(quizzesCompleted));
      localStorage.setItem('rewards_activities', JSON.stringify(activitiesLogged));
    }
  }, [points, level, streak, lastCheckIn, badges, quizzesCompleted, activitiesLogged, isInitialized]);

  // Points to next level formula: Level * 100
  // e.g. Level 1 needs 100 points to hit Level 2. Total points for level N is sum from 1 to N-1 of level * 100.
  // Simplified level calculation: level = Math.floor(points / 100) + 1
  useEffect(() => {
    const calculatedLevel = Math.floor(points / 150) + 1;
    if (calculatedLevel > level && isInitialized) {
      setLevel(calculatedLevel);
      toast.success(`🎉 LEVEL UP! You reached Level ${calculatedLevel}!`, {
        description: 'Keep learning and farming to unlock more rewards.',
        duration: 5000,
        position: 'top-center',
      });
      // Play a little sound if we want, or just trigger visual feedback
    }
  }, [points, level, isInitialized]);

  const addPoints = (amount: number, reason: string) => {
    setPoints((prev) => {
      const nextPoints = prev + amount;
      toast.success(`+${amount} XP`, {
        description: reason,
        icon: '🌾',
        duration: 3000,
      });
      return nextPoints;
    });
  };

  const canCheckInToday = () => {
    if (!lastCheckIn) return true;
    
    const today = new Date().toDateString();
    const lastCheckInDate = new Date(lastCheckIn).toDateString();
    return today !== lastCheckInDate;
  };

  const claimDailyCheckIn = () => {
    if (!canCheckInToday()) {
      toast.error('Already Checked In Today!', {
        description: 'Come back tomorrow for your next check-in reward.',
      });
      return false;
    }

    const now = new Date();
    const today = now.toDateString();
    
    let newStreak = streak + 1;

    // Check if the last check-in was yesterday to maintain streak
    if (lastCheckIn) {
      const lastDate = new Date(lastCheckIn);
      const diffTime = Math.abs(now.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If it's been more than 1 day (approx 48 hours to be safe for timezones), streak resets
      if (diffDays > 2) {
        newStreak = 1;
        toast.info('Streak Reset', {
          description: 'You missed a day! Your streak has been reset to 1.',
        });
      }
    } else {
      newStreak = 1;
    }

    setStreak(newStreak);
    setLastCheckIn(now.toISOString());
    
    // Check if streak unlocks any badges
    if (newStreak === 3) {
      setTimeout(() => unlockBadge('consistent-cultivator'), 1000);
    } else if (newStreak === 7) {
      setTimeout(() => unlockBadge('agri-scholar'), 1000);
    }

    addPoints(15, `Day ${newStreak} Check-in reward`);
    return true;
  };

  const unlockBadge = (badgeId: string) => {
    if (badges.includes(badgeId)) return;

    const badge = AVAILABLE_BADGES.find(b => b.id === badgeId);
    if (!badge) return;

    setBadges((prev) => [...prev, badgeId]);
    addPoints(badge.pointsReward, `Unlocked Badge: ${badge.title}`);
    
    toast.success(`🏅 ACHIEVEMENT UNLOCKED: ${badge.title}`, {
      description: badge.description,
      duration: 5000,
      icon: badge.icon,
    });
  };

  const completeQuiz = (quizId: string, score: number, totalQuestions: number) => {
    const isPerfect = score === totalQuestions;
    const existingScore = quizzesCompleted[quizId] || 0;

    // Only reward points if they improved their score
    if (score > existingScore) {
      const improvedQuestions = score - existingScore;
      const pointsReward = improvedQuestions * 10; // 10 points per question
      
      setQuizzesCompleted((prev) => ({
        ...prev,
        [quizId]: score,
      }));
      
      addPoints(pointsReward, `Improved score on quiz: ${quizId}`);

      if (isPerfect) {
        if (quizId === 'soil' || quizId === 'soil-health') {
          unlockBadge('soil-specialist');
        } else if (quizId === 'organic' || quizId === 'organic-farming') {
          unlockBadge('organic-pioneer');
        } else if (quizId === 'water' || quizId === 'smart-irrigation') {
          unlockBadge('water-warden');
        }
      }
    } else {
      toast.info('Quiz Completed', {
        description: `You scored ${score}/${totalQuestions}. No new high score.`,
      });
    }
  };

  const logActivity = (activityId: string, pointsEarned = 5) => {
    // Activities that can earn points once a day
    const todayStr = new Date().toDateString();
    const storageKey = `activity_${activityId}_${todayStr}`;
    
    if (typeof window !== 'undefined' && !localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, 'completed');
      setActivitiesLogged((prev) => {
        const next = [...prev, `${activityId}_${todayStr}`];
        addPoints(pointsEarned, `Logged activity: ${activityId.replace('-', ' ')}`);
        
        // Custom achievements check
        if (activityId === 'disease-detection') {
          unlockBadge('pest-pathfinder');
        } else if (activityId === 'mandi-check' || activityId === 'crop-calculator') {
          unlockBadge('market-guru');
        }
        
        return next;
      });
    }
  };

  return (
    <RewardsContext.Provider
      value={{
        points,
        level,
        streak,
        lastCheckIn,
        badges,
        quizzesCompleted,
        activitiesLogged,
        addPoints,
        claimDailyCheckIn,
        unlockBadge,
        completeQuiz,
        logActivity,
        canCheckInToday,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
}
