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

  const BLOCKED_DOMAINS = [
    '0-mail.com', '027168.com', '0815.su', '0sg.net', '10mail.org', '10minutemail.co.za', '10minutemail.com', '10minutemail.de', '10minutemail.net', '10minutemail.org', '11mail.com', '123.com', '123box.net', '123india.com', '123mail.cl', '123mail.org', '123qwe.co.uk', '126.com', '139.com', '150mail.com', '150ml.com', '15meg4free.com', '163.com', '16mail.com', '188.com', '189.cn', '1ce.us', '1chuan.com', '1coolplace.com', '1freeemail.com', '1funplace.com', '1internetdrive.com', '1mail.ml', '1mail.net', '1me.net', '1mum.com', '1musicrow.com', '1netdrive.com', '1nsyncfan.com', '1pad.de', '1under.com', '1webave.com', '1webhighway.com', '1zhuan.com', '2-mail.com', '20email.eu', '20mail.in', '20mail.it', '212.com', '21cn.com', '24horas.com', 'bahoo.biz.st', 'binkmail.com', 'bobmail.info', 'chammy.info', 'cool.fr.nf', 'courriel.fr.nf', 'devnullmail.com', 'dispostable.com', 'dodgeit.com', 'dontreg.com', 'dump-email.info', 'dumpyemail.com', 'e4ward.com', 'email60.com', 'emailias.com', 'emailinfive.com', 'emailmiser.com', 'emailondeck.com', 'emailtemporario.com.br', 'emailwarden.com', 'ephemail.net', 'explodemail.com', 'fakeinbox.com', 'fakeinformation.com', 'fastacura.com', 'filzmail.com', 'fizmail.com', 'frapmail.com', 'get1mail.com', 'getonemail.com', 'getonemail.net', 'girlsundertheinfluence.com', 'gishpuppy.com', 'great-host.in', 'grr.la', 'gsrv.co.uk', 'guerrillamail.biz', 'guerrillamail.com', 'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com', 'h.mintemail.com', 'haltospam.com', 'hide.biz.st', 'hochsitze.com', 'hotpop.com', 'hulapla.de', 'ieatspam.eu', 'ieatspam.info', 'ihatespam.info', 'imails.info', 'inboxalias.com', 'internxt.com', 'jetable.fr.nf', 'jetable.org', 'junk1e.com', 'kasmail.com', 'kaspop.com', 'keepmymail.com', 'killmail.com', 'killmail.net', 'klzlk.com', 'kurzepost.de', 'lifebeginsatconception.com', 'lroid.com', 'mail.by', 'mail.mezimages.net', 'mail2rss.org', 'mailbidon.com', 'mailblocks.com', 'mailcatch.com', 'maildrop.cc', 'maildrop.com', 'maileater.com', 'mailexpire.com', 'mailforspam.com', 'mailfreeonline.com', 'mailguard.me', 'mailin8r.com', 'mailinatar.com', 'mailinator.com', 'mailinator.gq', 'mailinator.net', 'mailinator.tk', 'mailinator2.com', 'mailmetrash.com', 'mailmoat.com', 'mailnull.com', 'mailscrap.com', 'mailshell.com', 'mailsiphon.com', 'mailtemp.info', 'mailtome.de', 'mailtothis.com', 'mailzilla.com', 'mailzilla.org', 'mamber.net', 'mega.zik.dj', 'mintemail.com', 'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf', 'mt2009.com', 'mt2014.com', 'mymail.infos.st', 'mytemp.email', 'mytrashmail.com', 'netzidiot.de', 'nobulk.com', 'noclickemail.com', 'nogmailspam.info', 'nomail.xl.cx', 'nospam.ze.tc', 'notmailinator.com', 'nowmymail.com', 'objectmail.com', 'obobbo.com', 'onewaymail.com', 'opayq.com', 'ordinaryamerican.net', 'otherinbox.com', 'owlpic.com', 'pimpedupmyspace.com', 'pjkd.com', 'plexolan.de', 'pookmail.com', 'proxymail.eu', 'prtnx.com', 'putthisinyourspamdatabase.com', 'quickinbox.com', 'rcpt.at', 'recode.me', 'reconmail.com', 'recursor.net', 'recyclebin.jp', 'regbypass.com', 'rmqkr.net', 'rppkn.com', 'rtrtr.com', 's0ny.net', 'safe-mail.net', 'safetymail.info', 'safetypost.de', 'sandelf.de', 'savelife.ml', 'sendspamhere.com', 'sharklasers.com', 'shieldedmail.com', 'shiftmail.com', 'shitmail.me', 'shitware.nl', 'shortmail.net', 'sibmail.com', 'skeefmail.com', 'slopsbox.com', 'smashmail.de', 'smellfear.com', 'snakemail.com', 'sneakemail.com', 'snkmail.com', 'sofort-mail.de', 'sogetthis.com', 'solvemail.info', 'spam4.me', 'spamail.de', 'spamarrest.com', 'spambob.com', 'spambog.com', 'spambog.de', 'spambog.ru', 'spambox.info', 'spambox.irishspringrealty.com', 'spambox.us', 'spamcannon.com', 'spamcannon.net', 'spamcon.org', 'spamcorptastic.com', 'spamcowboy.com', 'spamcowboy.net', 'spamcowboy.org', 'spamday.com', 'spamex.com', 'spamfree.eu', 'spamfree24.com', 'spamfree24.de', 'spamfree24.eu', 'spamfree24.net', 'spamfree24.org', 'spamgoes.com', 'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org', 'spamherelots.com', 'spamhereplease.com', 'spamhole.com', 'spamify.com', 'spaminator.de', 'spamkill.info', 'spaml.com', 'spaml.de', 'spammotel.com', 'spamobox.com', 'spamoff.de', 'spamsalad.in', 'spamspot.com', 'spamstack.net', 'spamthis.co.uk', 'spamthisplease.com', 'spamtroll.net', 'speed.1s.fr', 'superrito.com', 'suremail.info', 'talkinator.com', 'teewars.org', 'teleworm.com', 'temp-mail.de', 'temp-mail.org', 'temp-mail.ru', 'tempalias.com', 'tempe-mail.com', 'tempemail.biz', 'tempemail.com', 'tempemail.net', 'tempinbox.co.uk', 'tempinbox.com', 'tempmail.de', 'tempmail.eu', 'tempmail.it', 'tempmail.net', 'tempmail.org', 'tempmail.so', 'tempmail10.com', 'tempmail2.com', 'tempmailaddress.com', 'tempmailo.com', 'tempmails.net', 'tempomail.fr', 'temporarily.de', 'temporarioemail.com.br', 'temporaryemail.net', 'temporaryforwarding.com', 'temporaryinbox.com', 'thanksnospam.info', 'thankyou2010.com', 'thembones.com.au', 'thisisnotmyrealemail.com', 'throwawayemailaddress.com', 'tilien.com', 'tmailinator.com', 'tmailor.com', 'tradermail.info', 'trash-amil.com', 'trash-mail.at', 'trash-mail.com', 'trash-mail.de', 'trash2009.com', 'trashemail.de', 'trashmail.at', 'trashmail.com', 'trashmail.de', 'trashmail.me', 'trashmail.net', 'trashmail.org', 'trashmail.ws', 'trashmailer.com', 'trashymail.com', 'trashymail.net', 'trillianpro.com', 'turual.com', 'twinmail.de', 'tyldd.com', 'uggsrock.com', 'upliftnow.com', 'uplipht.com', 'venompen.com', 'veryrealemail.com', 'vidchart.com', 'viditag.com', 'viewcastmedia.com', 'viewcastmedia.net', 'viewcastmedia.org', 'watchfull.net', 'webemail.me', 'weg-werf-email.de', 'wegwerf-emails.de', 'wegwerfadresse.de', 'wegwerfemail.com', 'wegwerfemail.de', 'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org', 'wetrainbayarea.com', 'wetrainbayarea.org', 'wh4f.org', 'whopy.com', 'willselfdestruct.com', 'winemaven.info', 'wronghead.com', 'wuzupmail.net', 'wwwnew.eu', 'x.ip6.li', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmaily.com', 'xoxy.net', 'yapped.net', 'yeah.net', 'yep.it', 'yogamaven.com', 'yopmail.com', 'yopmail.fr', 'yopmail.net', 'ypmail.webredirect.org', 'yuurok.com', 'zamarar.ml', 'zehnminuten-mail.de', 'zehnminutenmail.de', 'zetmail.com', 'zippymail.info', 'zoemail.com', 'zoemail.net', 'zoemail.org'
  ];

  const validateGmailDomain = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isTemporaryEmail = (email: string): boolean => {
    const domain = email.toLowerCase().split('@')[1];
    return BLOCKED_DOMAINS.includes(domain);
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

    if (mode === 'signup' && isTemporaryEmail(email)) {
      toast({
        title: "No Temp Email Allowed",
        description: "Temporary email addresses are not permitted for registration",
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