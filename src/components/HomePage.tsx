import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, User, LogOut, Users } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdPlacement } from './AdPlacement';
import { StarfieldBackground } from './StarfieldBackground';
import { BlogSection } from './BlogSection';
import { useSEO } from '@/hooks/useSEO';

interface HomePageProps {
  user: SupabaseUser | null;
  onNavigate: (path: string) => void;
  onAuthRequired: () => void;
}

const numberDescriptions = [
  { number: 1, name: 'The Leader', description: 'Independent pioneers who thrive on innovation and taking charge' },
  { number: 2, name: 'The Cooperator', description: 'Natural diplomats who excel at bringing people together' },
  { number: 3, name: 'The Communicator', description: 'Creative entertainers who light up any room with charisma' },
  { number: 4, name: 'The Builder', description: 'Reliable foundations who excel at creating lasting structures' },
  { number: 5, name: 'The Explorer', description: 'Adventure-loving free spirits who crave variety and new experiences' },
  { number: 6, name: 'The Nurturer', description: 'Compassionate healers driven to help and heal others' },
  { number: 7, name: 'The Seeker', description: 'Mystical analysts always searching for truth and meaning' },
  { number: 8, name: 'The Achiever', description: 'Material masters who understand worldly success and power' },
  { number: 9, name: 'The Humanitarian', description: 'Universal servers here to make the world a better place' },
];

export function HomePage({ user, onNavigate, onAuthRequired }: HomePageProps) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

  // SEO optimization for homepage
  useSEO({
    title: 'Numerology Insights - Discover Your Numbers 1-9',
    description: 'Unlock the secrets of numerology with personalized insights for numbers 1-9. Discover your strengths, career paths, and life guidance through ancient wisdom. Watch ads to unlock premium content.',
    canonical: '/'
  }, '/');

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setUserProfile(data);
    } catch (error: any) {
      console.error('Profile fetch error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const handleNumberClick = (number: number) => {
    onNavigate(`/number/${number}`);
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <StarfieldBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-8">
            <div></div> {/* Spacer */}
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-accent floating-particle" />
              <h1 className="text-4xl md:text-6xl font-bold text-cosmic-glow">
                Numerology Destiny
              </h1>
              <Sparkles className="h-8 w-8 text-primary floating-particle" />
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-accent">
                    <User className="inline h-4 w-4 mr-1" />
                    {user.email?.split('@')[0]}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onAuthRequired}
                  variant="ghost"
                  className="text-accent hover:text-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your cosmic career path through the ancient wisdom of numerology. 
            Each number holds unique insights into your destiny and purpose.
          </p>

          {/* Header Ad */}
          <div className="mb-8">
            <AdPlacement slot="header-main" format="leaderboard" />
          </div>
        </div>

        {/* About Section */}
        <Card className="card-cosmic p-8 mb-12 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-center text-cosmic-glow mb-6 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-accent" />
            About Numerology Destiny
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Star className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-lg font-bold text-accent mb-2">Ancient Wisdom</h3>
              <p className="text-muted-foreground text-sm">
                Based on thousands of years of numerological knowledge and cosmic insights
              </p>
            </div>
            <div>
              <Sparkles className="h-12 w-12 mx-auto text-secondary mb-4" />
              <h3 className="text-lg font-bold text-accent mb-2">Personalized Insights</h3>
              <p className="text-muted-foreground text-sm">
                Each number reveals unique strengths, challenges, and career paths tailored to you
              </p>
            </div>
            <div>
              <User className="h-12 w-12 mx-auto text-accent mb-4" />
              <h3 className="text-lg font-bold text-accent mb-2">Premium Content</h3>
              <p className="text-muted-foreground text-sm">
                Unlock detailed career guidance and life insights with our ad-supported model
              </p>
            </div>
          </div>
        </Card>

        {/* Numbers Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-cosmic-glow mb-8">
            Choose Your Number
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {numberDescriptions.map((item, index) => (
              <Card
                key={item.number}
                className="card-cosmic p-6 hover:scale-105 transition-transform cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleNumberClick(item.number)}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-4 cosmic-glow">
                    {item.number}
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-3">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  <Button className="btn-cosmic w-full" size="sm">
                    Explore Number {item.number}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Blog Section */}
        <BlogSection />

        {/* Sidebar Ad */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {user && userProfile && (
              <Card className="card-cosmic p-6">
                <h3 className="text-lg font-bold text-accent mb-4">Your Progress</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {userProfile.unlocked_combinations?.length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Unlocked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {9 - (userProfile.unlocked_combinations?.length || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent mb-1">
                      {userProfile.last_unlock_date ? '1' : '0'}
                    </div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <AdPlacement slot="home-sidebar" format="rectangle" />
            <AdPlacement slot="home-sidebar-2" format="square" />
          </div>
        </div>

        {/* Footer Ad */}
        <div className="mt-12 flex justify-center">
          <AdPlacement slot="footer-main" format="leaderboard" />
        </div>
      </div>
    </div>
  );
}