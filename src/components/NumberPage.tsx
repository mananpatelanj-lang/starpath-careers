import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Sparkles, Lock, Play, ArrowLeft, Palette, Heart, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { AdPlacement } from './AdPlacement';

interface NumberData {
  number: number;
  name: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  career_paths: string[];
  personality_traits: string;
  lucky_colors: string[];
  compatible_numbers: number[];
  life_path_guidance: string;
}

interface NumberPageProps {
  number: number;
  user: User | null;
  onBack: () => void;
  onAuthRequired: () => void;
}

export function NumberPage({ number, user, onBack, onAuthRequired }: NumberPageProps) {
  const [numberData, setNumberData] = useState<NumberData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [canUnlock, setCanUnlock] = useState(false);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNumberData();
    if (user) {
      checkUnlockStatus();
    }
  }, [number, user]);

  const fetchNumberData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('numerology_numbers')
        .select('*')
        .eq('number', number)
        .single();

      if (error) throw error;
      setNumberData(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load number data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkUnlockStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('unlocked_combinations, last_unlock_date')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        const hasUnlocked = data.unlocked_combinations?.includes(`NUMBER_${number}`) || false;
        setIsUnlocked(hasUnlocked);

        // Check if user can unlock (monthly limit)
        const lastUnlock = data.last_unlock_date ? new Date(data.last_unlock_date) : null;
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        
        setCanUnlock(!hasUnlocked && (!lastUnlock || lastUnlock < oneMonthAgo));
      }
    } catch (error: any) {
      console.error('unlock check error:', error);
    }
  };

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    
    // Simulate ad watching (replace with real ad integration)
    setTimeout(() => {
      setIsWatchingAd(false);
      unlockContent();
    }, 3000);
    
    toast({
      title: "Watching Ad",
      description: "Please wait while the ad loads...",
    });
  };

  const unlockContent = async () => {
    if (!user || !canUnlock) return;

    try {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('unlocked_combinations')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentUnlocked = profile?.unlocked_combinations || [];
      const newUnlocked = [...currentUnlocked, `NUMBER_${number}`];

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          unlocked_combinations: newUnlocked,
          last_unlock_date: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setIsUnlocked(true);
      setCanUnlock(false);
      
      toast({
        title: "✨ Content Unlocked!",
        description: `You've unlocked the secrets of Number ${number}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to unlock content",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!numberData) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <Card className="card-cosmic p-8 text-center">
          <h2 className="text-xl font-bold text-destructive mb-4">Number Not Found</h2>
          <Button onClick={onBack} className="btn-cosmic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={onBack}
          className="mb-6 text-accent hover:text-primary"
          variant="ghost"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header Ad */}
        <div className="mb-8 flex justify-center">
          <AdPlacement slot="header-banner" format="leaderboard" />
        </div>

        {/* Number Header */}
        <Card className="card-cosmic p-8 text-center mb-8 animate-fade-in-up">
          <div className="text-8xl font-bold text-primary mb-4 cosmic-glow">
            {number}
          </div>
          <h1 className="text-3xl font-bold text-cosmic-glow mb-2">
            {numberData.name}
          </h1>
          <h2 className="text-xl text-accent mb-4">
            {numberData.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {numberData.description}
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-cosmic p-6">
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {numberData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-4 w-4 text-primary" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="card-cosmic p-6">
                <h3 className="text-xl font-bold text-destructive mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Challenges
                </h3>
                <ul className="space-y-2">
                  {numberData.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 rounded-full bg-destructive/20" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Career Paths - Locked/Unlocked */}
            <Card className="card-cosmic p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Career Paths
              </h3>
              
              {!user ? (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Sign in to unlock your personalized career paths
                  </p>
                  <Button onClick={onAuthRequired} className="btn-cosmic">
                    Sign In to Unlock
                  </Button>
                </div>
              ) : !isUnlocked ? (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Watch a short ad to unlock your career insights
                  </p>
                  {canUnlock ? (
                    <Button 
                      onClick={handleWatchAd} 
                      disabled={isWatchingAd}
                      className="btn-cosmic"
                    >
                      {isWatchingAd ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Watching Ad...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Ad to Unlock
                        </>
                      )}
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You've already unlocked content this month. Come back next month!
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {numberData.career_paths.map((career, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-primary/20 to-secondary/20 p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
                    >
                      <div className="text-center font-medium text-foreground">{career}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Personality Traits & Life Guidance - Always visible */}
            <Card className="card-cosmic p-6">
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Personality Traits
              </h3>
              <p className="text-muted-foreground mb-6">{numberData.personality_traits}</p>
              
              <h4 className="text-lg font-bold text-primary mb-3">Life Path Guidance</h4>
              <p className="text-muted-foreground">{numberData.life_path_guidance}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar Ad */}
            <AdPlacement slot="sidebar-rectangle" format="rectangle" />

            {/* Lucky Colors */}
            <Card className="card-cosmic p-6">
              <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Lucky Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                {numberData.lucky_colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm border border-accent/30"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </Card>

            {/* Compatible Numbers */}
            <Card className="card-cosmic p-6">
              <h3 className="text-lg font-bold text-primary mb-4">
                Compatible Numbers
              </h3>
              <div className="flex gap-2">
                {numberData.compatible_numbers.map((num, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </Card>

            {/* Bottom Sidebar Ad */}
            <AdPlacement slot="sidebar-square" format="square" />
          </div>
        </div>

        {/* Footer Ad */}
        <div className="mt-12 flex justify-center">
          <AdPlacement slot="footer-banner" format="leaderboard" />
        </div>
      </div>
    </div>
  );
}