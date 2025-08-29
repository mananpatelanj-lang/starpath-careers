import { useState, useEffect } from 'react';
import { VirtualRouter } from '@/components/VirtualRouter';
import { HomePage } from '@/components/HomePage';
import { NumberPage } from '@/components/NumberPage';
import { AuthPage } from '@/components/AuthPage';
import { useAuth } from '@/hooks/useAuth';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleIdleTimeout = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.location.reload();
      
      toast({
        title: "Session Timeout",
        description: "You've been redirected to home due to inactivity",
      });
    }
  };

  // 15 minutes = 15 * 60 * 1000 milliseconds
  useIdleTimer({
    timeout: 15 * 60 * 1000,
    onIdle: handleIdleTimeout,
    enabled: user !== null && window.location.pathname !== '/'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <VirtualRouter user={user}>
      {(currentRoute, navigate) => {
        // Route handling
        if (currentRoute === '/auth') {
          return (
            <AuthPage
              onAuthSuccess={() => navigate('/')}
              onBack={() => navigate('/')}
            />
          );
        }

        if (currentRoute.startsWith('/number/')) {
          const number = parseInt(currentRoute.split('/')[2]);
          if (number >= 1 && number <= 9) {
            return (
              <NumberPage
                number={number}
                user={user}
                onBack={() => navigate('/')}
                onAuthRequired={() => navigate('/auth')}
              />
            );
          }
        }

        // Default home page
        return (
          <HomePage
            user={user}
            onNavigate={navigate}
            onAuthRequired={() => navigate('/auth')}
          />
        );
      }}
    </VirtualRouter>
  );
};

export default Index;