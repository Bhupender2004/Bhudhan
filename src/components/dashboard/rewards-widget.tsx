'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRewards } from '@/lib/context/rewards-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Flame, Trophy, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export default function RewardsWidget() {
  const {
    points,
    level,
    streak,
    claimDailyCheckIn,
    canCheckInToday,
    badges,
  } = useRewards();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-full animate-pulse bg-slate-100 dark:bg-slate-800 border-none">
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          Loading Rewards...
        </div>
      </Card>
    );
  }

  // Points calculation
  const pointsInCurrentLevel = points - (level - 1) * 150;
  const pointsNeededForNextLevel = 150;
  const progressPercent = Math.min(Math.max((pointsInCurrentLevel / pointsNeededForNextLevel) * 100, 0), 100);
  const remainingPoints = pointsNeededForNextLevel - pointsInCurrentLevel;

  const hasCheckedInToday = !canCheckInToday();

  const handleCheckIn = () => {
    claimDailyCheckIn();
  };

  return (
    <Card className="h-full flex flex-col justify-between overflow-hidden border border-amber-100/30 dark:border-amber-950/20 bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-slate-900 dark:to-amber-950/20 shadow-sm relative group">
      {/* Background visual flair */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-amber-200/20 dark:bg-amber-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-orange-200/20 dark:bg-orange-500/5 rounded-full blur-2xl" />

      <CardHeader className="pb-4 relative z-10 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Trophy className="h-4.5 w-4.5 text-amber-500 animate-bounce" />
            Farmer Rewards
          </CardTitle>
          <Badge variant="outline" className="bg-amber-100/50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold border-amber-200 dark:border-amber-900 text-[10px] px-2.5 py-0.5">
            Level {level}
          </Badge>
        </div>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Earn XP points by learning and using BhuDhan
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 flex-1 relative z-10 px-5 md:px-6 pb-6">
        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-400">{points} Total XP</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{remainingPoints} XP to Lvl {level + 1}</span>
          </div>
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Streak & Achievements Counter */}
        <div className="grid grid-cols-2 gap-4 py-1">
          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800/60 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
              <Flame className={`h-5 w-5 ${streak > 0 ? 'animate-pulse' : ''}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase leading-none">Streak</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{streak} {streak === 1 ? 'Day' : 'Days'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800/60 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase leading-none">Badges</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{badges.length} Unlocked</p>
            </div>
          </div>
        </div>

        {/* Daily Check-In button */}
        <div className="pt-1">
          {hasCheckedInToday ? (
            <Button disabled className="w-full h-12 bg-green-500 hover:bg-green-500 text-white font-bold opacity-90 rounded-xl cursor-default flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-100" />
              <div className="flex flex-col items-start leading-tight text-left">
                <span className="text-[9px] font-bold text-green-200 uppercase tracking-wider">Reward Claimed</span>
                <span className="text-xs font-black">+15 XP Added</span>
              </div>
            </Button>
          ) : (
            <Button 
              onClick={handleCheckIn}
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-100 dark:shadow-none active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn"
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-amber-200 animate-pulse" />
              <div className="flex flex-col items-start leading-tight text-left">
                <span className="text-[9px] font-bold text-amber-100 uppercase tracking-wider leading-none">Daily Check-In</span>
                <span className="text-xs font-black mt-0.5">Claim +15 XP</span>
              </div>
            </Button>
          )}
        </div>
      </CardContent>

      {/* Widget Footer shortcut links */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-3 bg-white/30 dark:bg-slate-900/50 flex justify-between items-center relative z-10">
        <Link href="/bhudhan-games?tab=quizzes" className="inline-flex items-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors group/link">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          Take a Quiz
          <ArrowRight className="h-3 w-3 ml-0.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
        </Link>
        <Link href="/bhudhan-games?tab=shop" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
          Rewards Shop
        </Link>
      </div>
    </Card>
  );
}
