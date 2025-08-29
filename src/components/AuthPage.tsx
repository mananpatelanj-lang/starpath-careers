import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Star, Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const validateGmailDomain = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'signup' && !validateGmailDomain(email)) {
      toast({
        title: "Gmail Required",
        description: "Only Gmail addresses are allowed for registration",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6 && mode !== 'forgot') {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          }
        });
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Please log in instead.",
              variant: "destructive",
            });
            setMode('login');
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Check Your Email",
            description: "Please check your email for the confirmation link",
          });
          setMode('login');
        }
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid Credentials",
              description: "Email or password is incorrect",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in",
          });
          onAuthSuccess();
        }
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        
        if (error) {
          throw error;
        } else {
          toast({
            title: "Reset Email Sent",
            description: "Check your email for password reset instructions",
          });
          setMode('login');
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card-cosmic p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="absolute top-4 left-4 text-accent hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="h-6 w-6 text-accent floating-particle" />
              <h1 className="text-2xl font-bold text-cosmic-glow">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Us' : 'Reset Password'}
              </h1>
              <Star className="h-6 w-6 text-primary floating-particle" />
            </div>
            <p className="text-muted-foreground">
              {mode === 'login' ? 'Sign in to unlock your numerology insights' :
               mode === 'signup' ? 'Create your account to access premium content' :
               'Enter your email to reset your password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-accent">
                <Mail className="inline h-4 w-4 mr-2" />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'signup' ? 'your.email@gmail.com' : 'Enter your email'}
                className="input-cosmic"
                required
              />
              {mode === 'signup' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Only Gmail addresses are accepted
                </p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-accent">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-cosmic"
                  required
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-accent">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="input-cosmic"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-cosmic w-full pulse-cosmic"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Email'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-accent hover:text-primary transition-colors"
                >
                  Forgot your password?
                </button>
                <div>
                  <span className="text-sm text-muted-foreground">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-sm text-accent hover:text-primary transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}
            
            {mode === 'signup' && (
              <div>
                <span className="text-sm text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-sm text-accent hover:text-primary transition-colors"
                >
                  Sign in
                </button>
              </div>
            )}
            
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-accent hover:text-primary transition-colors"
              >
                Back to sign in
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}