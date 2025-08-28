import { StarfieldBackground } from '@/components/StarfieldBackground';
import { NumerologyCalculator } from '@/components/NumerologyCalculator';
import { AdPlacement } from '@/components/AdPlacement';
import { Star, Sparkles, Zap, Globe, TrendingUp, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import cosmicHeroBg from '@/assets/cosmic-hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Starfield Background */}
      <StarfieldBackground />
      
      {/* CSS Starfield Backup */}
      <div className="starfield-bg"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <header className="relative py-20 px-4 text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${cosmicHeroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Top Ad Placement */}
            <div className="flex justify-center mb-8">
              <AdPlacement slot="header-banner" format="leaderboard" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className="h-12 w-12 text-accent animate-pulse" />
              <Sparkles className="h-8 w-8 text-primary floating-particle" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic-glow cosmic-gradient bg-clip-text text-transparent leading-tight">
              Discover Your Destiny Career
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-accent">
              Through Ancient Numerology
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unlock the cosmic wisdom of numbers to guide your professional journey. 
              Let the stars reveal your perfect career path through sacred numerology.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-2 text-accent">
                <Zap className="h-5 w-5" />
                <span className="font-medium">AI-Resistant Careers</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Market Insights</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Secure & Private</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Calculator Section */}
        <main className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar Ad */}
              <div className="hidden lg:block">
                <div className="sticky top-8 space-y-6">
                  <AdPlacement slot="left-sidebar" format="square" />
                  <Card className="card-cosmic p-4 text-center">
                    <Globe className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h3 className="font-bold text-accent mb-2">Global Wisdom</h3>
                    <p className="text-xs text-muted-foreground">
                      Ancient numerology from Vedic traditions, now enhanced with modern career insights
                    </p>
                  </Card>
                </div>
              </div>

              {/* Main Calculator */}
              <div className="lg:col-span-2">
                <NumerologyCalculator />
              </div>

              {/* Right Sidebar Ad */}
              <div className="hidden lg:block">
                <div className="sticky top-8 space-y-6">
                  <AdPlacement slot="right-sidebar" format="square" />
                  <Card className="card-cosmic p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold text-primary mb-2">2025 Ready</h3>
                    <p className="text-xs text-muted-foreground">
                      Career recommendations updated for the AI age and future job market
                    </p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mobile Ads */}
            <div className="lg:hidden mt-12 space-y-6">
              <div className="flex justify-center">
                <AdPlacement slot="mobile-banner-1" format="banner" />
              </div>
            </div>
          </div>
        </main>

        {/* About Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-cosmic-glow">How Cosmic Numerology Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="card-cosmic p-6">
                <div className="text-4xl font-bold text-primary mb-4">Mulank</div>
                <h3 className="text-xl font-semibold text-accent mb-3">Your Birth Number</h3>
                <p className="text-muted-foreground">
                  Calculated from your birth date, reveals your core personality traits, 
                  natural talents, and inherent strengths that shape your career potential.
                </p>
              </Card>
              
              <Card className="card-cosmic p-6">
                <div className="text-4xl font-bold text-secondary mb-4">Bhagyank</div>
                <h3 className="text-xl font-semibold text-accent mb-3">Your Destiny Number</h3>
                <p className="text-muted-foreground">
                  Derived from your complete birth date, indicates your life path, 
                  karmic lessons, and the ultimate direction of your professional journey.
                </p>
              </Card>
            </div>

            {/* Bottom Ad */}
            <div className="flex justify-center mb-8">
              <AdPlacement slot="footer-banner" format="leaderboard" />
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-accent/20">
              <h3 className="text-xl font-bold text-accent mb-4">Why Trust Ancient Wisdom in Modern Times?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Numerology has guided career decisions for thousands of years. Our system combines this timeless wisdom 
                with cutting-edge analysis of AI resistance, market trends, and industry evolution. Each recommendation 
                is crafted to help you thrive in the rapidly changing professional landscape of 2025 and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center border-t border-border/20 bg-background/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold text-cosmic-glow">Starpath Careers</span>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Cosmic career guidance through sacred numerology • Built with ancient wisdom for modern success
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;