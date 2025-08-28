import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Star, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NumerologyResult {
  combination_code: string;
  mulank_name: string;
  bhagyank_name: string;
  careers: string[];
  strengths: string;
  challenges: string;
  ai_resistance: string;
  market_demand: string;
  industry_focus: string;
  special_insight: string;
  success_formula: string;
  financial_potential: string;
}

interface CalculatedNumbers {
  mulank: number;
  bhagyank: number;
  combinationCode: string;
}

export function NumerologyCalculator() {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [calculatedNumbers, setCalculatedNumbers] = useState<CalculatedNumbers | null>(null);
  const [errors, setErrors] = useState({ date: '', month: '', year: '' });
  const { toast } = useToast();

  // CLIENT-SIDE ONLY: Basic numerology calculations
  const calculateMulank = (day: number): number => {
    let sum = day;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculateBhagyank = (day: number, month: number, year: number): number => {
    const totalSum = day + month + year;
    let sum = totalSum;
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const validateInputs = (): boolean => {
    const newErrors = { date: '', month: '', year: '' };
    let hasErrors = false;

    // Date validation
    const dayNum = parseInt(date);
    if (!date || dayNum < 1 || dayNum > 31) {
      newErrors.date = 'Enter valid day (1-31)';
      hasErrors = true;
    }

    // Month validation
    const monthNum = parseInt(month);
    if (!month || monthNum < 1 || monthNum > 12) {
      newErrors.month = 'Enter valid month (1-12)';
      hasErrors = true;
    }

    // Year validation
    const yearNum = parseInt(year);
    if (!year || yearNum < 1900 || yearNum > 2100) {
      newErrors.year = 'Enter valid year (1900-2100)';
      hasErrors = true;
    }

    // Additional date validation for month-day combinations
    if (!hasErrors) {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
      
      if (monthNum === 2 && isLeapYear) {
        daysInMonth[1] = 29;
      }
      
      if (dayNum > daysInMonth[monthNum - 1]) {
        newErrors.date = `Invalid date for month ${monthNum}`;
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleCalculation = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const dayNum = parseInt(date);
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);

      // CLIENT-SIDE: Calculate numbers using only basic math
      const mulank = calculateMulank(dayNum);
      const bhagyank = calculateBhagyank(dayNum, monthNum, yearNum);
      const combinationCode = `M${mulank}B${bhagyank}`;

      setCalculatedNumbers({ mulank, bhagyank, combinationCode });

      // BACKEND: Fetch protected career data
      const { data, error } = await supabase
        .from('career_data')
        .select('*')
        .eq('combination_code', combinationCode)
        .single();

      if (error) {
        throw new Error(`Failed to fetch career data: ${error.message}`);
      }

      if (!data) {
        throw new Error('No career data found for this combination');
      }

      setResult(data);
      
      toast({
        title: "✨ Your Destiny Revealed!",
        description: `Found your cosmic career blueprint: ${combinationCode}`,
      });

    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "🌟 Cosmic Connection Failed",
        description: "Unable to connect to the cosmic database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string, field: 'date' | 'month' | 'year', maxLength: number) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '').slice(0, maxLength);
    
    if (field === 'date') setDate(numericValue);
    else if (field === 'month') setMonth(numericValue);
    else if (field === 'year') setYear(numericValue);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="card-cosmic p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-6 w-6 text-accent floating-particle" />
            <h2 className="text-2xl font-bold text-cosmic-glow">Enter Your Birth Date</h2>
            <Sparkles className="h-6 w-6 text-primary floating-particle" />
          </div>
          <p className="text-muted-foreground">
            Reveal your cosmic career path through ancient numerology wisdom
          </p>
        </div>

        {/* Date Input Fields */}
        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-accent">Day</label>
            <Input
              type="text"
              placeholder="DD"
              value={date}
              onChange={(e) => handleInputChange(e.target.value, 'date', 2)}
              className={`input-cosmic text-center text-xl font-bold ${errors.date ? 'border-destructive' : ''}`}
              maxLength={2}
            />
            {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-accent">Month</label>
            <Input
              type="text"
              placeholder="MM"
              value={month}
              onChange={(e) => handleInputChange(e.target.value, 'month', 2)}
              className={`input-cosmic text-center text-xl font-bold ${errors.month ? 'border-destructive' : ''}`}
              maxLength={2}
            />
            {errors.month && <p className="text-destructive text-sm mt-1">{errors.month}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-accent">Year</label>
            <Input
              type="text"
              placeholder="YYYY"
              value={year}
              onChange={(e) => handleInputChange(e.target.value, 'year', 4)}
              className={`input-cosmic text-center text-xl font-bold ${errors.year ? 'border-destructive' : ''}`}
              maxLength={4}
            />
            {errors.year && <p className="text-destructive text-sm mt-1">{errors.year}</p>}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center">
          <Button
            onClick={handleCalculation}
            disabled={isLoading || !date || !month || !year}
            className="btn-cosmic px-8 py-3 text-lg font-bold pulse-cosmic"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Consulting the Stars...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Find My Career Destiny
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {calculatedNumbers && result && (
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Numbers Display */}
          <Card className="card-cosmic p-6 text-center">
            <h3 className="text-xl font-bold mb-4 text-cosmic-glow">Your Numerology Numbers</h3>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{calculatedNumbers.mulank}</div>
                <div className="text-accent font-medium">Mulank</div>
                <div className="text-sm text-muted-foreground">{result.mulank_name}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">{calculatedNumbers.bhagyank}</div>
                <div className="text-accent font-medium">Bhagyank</div>
                <div className="text-sm text-muted-foreground">{result.bhagyank_name}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-accent">
              Combination: {calculatedNumbers.combinationCode}
            </div>
          </Card>

          {/* Career Recommendations */}
          <Card className="card-cosmic p-6">
            <h3 className="text-xl font-bold mb-4 text-cosmic-glow flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Your Destined Career Paths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {result.careers.map((career, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary/20 to-secondary/20 p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
                >
                  <div className="text-center font-medium text-foreground">{career}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-bold text-accent mb-2">✨ Strengths</h4>
                <p className="text-sm text-muted-foreground">{result.strengths}</p>
              </div>
              <div>
                <h4 className="font-bold text-destructive mb-2">⚠️ Challenges</h4>
                <p className="text-sm text-muted-foreground">{result.challenges}</p>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-2">🤖 AI Resistance</h4>
                <p className="text-sm text-muted-foreground">{result.ai_resistance}</p>
              </div>
              <div>
                <h4 className="font-bold text-secondary mb-2">📈 Market Demand</h4>
                <p className="text-sm text-muted-foreground">{result.market_demand}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
              <h4 className="font-bold text-accent mb-2">💡 Special Insight</h4>
              <p className="text-sm mb-3">{result.special_insight}</p>
              <h4 className="font-bold text-primary mb-2">🎯 Success Formula</h4>
              <p className="text-sm mb-3">{result.success_formula}</p>
              <h4 className="font-bold text-accent mb-2">💰 Financial Potential</h4>
              <p className="text-sm">{result.financial_potential}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}