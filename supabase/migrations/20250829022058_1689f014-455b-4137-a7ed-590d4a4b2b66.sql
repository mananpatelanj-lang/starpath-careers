-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  unlocked_combinations TEXT[] DEFAULT '{}',
  last_unlock_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create numerology_numbers table for individual number content
CREATE TABLE public.numerology_numbers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 9),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  weaknesses TEXT[] NOT NULL,
  career_paths TEXT[] NOT NULL,
  personality_traits TEXT NOT NULL,
  lucky_colors TEXT[] NOT NULL,
  compatible_numbers INTEGER[] NOT NULL,
  life_path_guidance TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for numerology_numbers (public read access)
ALTER TABLE public.numerology_numbers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to numerology numbers" 
ON public.numerology_numbers 
FOR SELECT 
USING (true);

-- Insert sample data for numbers 1-9
INSERT INTO public.numerology_numbers (number, name, title, description, strengths, weaknesses, career_paths, personality_traits, lucky_colors, compatible_numbers, life_path_guidance) VALUES
(1, 'The Leader', 'Independent Pioneer', 'Natural born leaders who thrive on innovation and taking charge. You are the initiators of the zodiac, always ready to start new ventures and lead others to success.', 
ARRAY['Leadership', 'Innovation', 'Independence', 'Determination', 'Pioneering spirit'], 
ARRAY['Impatience', 'Stubbornness', 'Self-centeredness', 'Aggression', 'Difficulty following others'],
ARRAY['CEO/Executive', 'Entrepreneur', 'Military Leader', 'Sports Coach', 'Inventor', 'Consultant', 'Politician'],
'Bold, ambitious, and confident. You prefer to lead rather than follow and have a strong desire for independence and originality.',
ARRAY['Red', 'Orange', 'Gold'],
ARRAY[3, 5, 6],
'Focus on developing patience and learning to collaborate with others. Your leadership skills are your greatest asset - use them to inspire and uplift others.'),

(2, 'The Cooperator', 'Diplomatic Peacemaker', 'Natural diplomats who excel at bringing people together. You have an innate ability to see all sides of a situation and create harmony wherever you go.',
ARRAY['Diplomacy', 'Cooperation', 'Sensitivity', 'Intuition', 'Peacemaking'],
ARRAY['Over-sensitivity', 'Indecisiveness', 'Dependency', 'Passive-aggressiveness', 'Lack of confidence'],
ARRAY['Mediator', 'Counselor', 'Teacher', 'Social Worker', 'Diplomat', 'Team Manager', 'Healthcare Worker'],
'Gentle, cooperative, and highly intuitive. You work best in partnerships and team environments where your diplomatic skills can shine.',
ARRAY['Blue', 'Green', 'Silver'],
ARRAY[1, 6, 8],
'Build confidence in your own abilities and learn to make decisions independently. Your gift for bringing people together is invaluable in our divided world.'),

(3, 'The Communicator', 'Creative Expression', 'Natural entertainers and communicators who light up any room. You have a gift for self-expression and inspiring others through your creativity and charisma.',
ARRAY['Creativity', 'Communication', 'Optimism', 'Social skills', 'Artistic talent'],
ARRAY['Scattered energy', 'Superficiality', 'Gossiping', 'Mood swings', 'Difficulty with focus'],
ARRAY['Artist', 'Writer', 'Actor', 'Marketing Professional', 'Public Speaker', 'Designer', 'Entertainer'],
'Expressive, creative, and naturally charismatic. You have a talent for communication and bringing joy to others through your artistic abilities.',
ARRAY['Yellow', 'Orange', 'Pink'],
ARRAY[1, 5, 7],
'Channel your creative energy into meaningful projects and learn to focus your scattered talents. Your ability to inspire others through art and communication is your superpower.'),

(4, 'The Builder', 'Reliable Foundation', 'The backbone of society, you excel at creating stable, lasting structures. Your practical approach and strong work ethic make you indispensable in any organization.',
ARRAY['Reliability', 'Organization', 'Hard work', 'Practicality', 'Attention to detail'],
ARRAY['Rigidity', 'Over-cautiousness', 'Workaholic tendencies', 'Resistance to change', 'Narrow-mindedness'],
ARRAY['Engineer', 'Accountant', 'Project Manager', 'Construction Manager', 'Administrator', 'Quality Control', 'Operations Manager'],
'Methodical, reliable, and extremely hardworking. You prefer structure and order, and excel at turning ideas into concrete reality.',
ARRAY['Brown', 'Green', 'Navy Blue'],
ARRAY[2, 6, 8],
'Learn to embrace change and new ideas while maintaining your valuable stability. Your ability to build lasting foundations is crucial for long-term success.'),

(5, 'The Explorer', 'Freedom Seeker', 'Adventure-loving free spirits who crave variety and new experiences. You are the travelers and experience-seekers who bring excitement and fresh perspectives to the world.',
ARRAY['Adaptability', 'Curiosity', 'Freedom-loving', 'Versatility', 'Progressive thinking'],
ARRAY['Restlessness', 'Impulsiveness', 'Inconsistency', 'Commitment issues', 'Scattered energy'],
ARRAY['Travel Guide', 'Journalist', 'Sales Representative', 'Event Planner', 'Pilot', 'Marketing Specialist', 'Freelancer'],
'Dynamic, curious, and freedom-loving. You thrive on variety and new experiences, always seeking the next adventure or challenge.',
ARRAY['Turquoise', 'Bright Blue', 'Multi-colors'],
ARRAY[1, 3, 7],
'Learn to balance your need for freedom with commitment and follow-through. Your ability to adapt and bring fresh perspectives is invaluable in our changing world.'),

(6, 'The Nurturer', 'Compassionate Healer', 'Natural caregivers who are driven to help and heal others. You have an innate ability to create harmony and provide support wherever it is needed most.',
ARRAY['Compassion', 'Responsibility', 'Nurturing', 'Healing abilities', 'Family-oriented'],
ARRAY['Over-protectiveness', 'Martyrdom', 'Worry', 'Perfectionism', 'Controlling behavior'],
ARRAY['Nurse', 'Teacher', 'Counselor', 'Social Worker', 'Interior Designer', 'Chef', 'Childcare Provider'],
'Caring, responsible, and naturally healing. You are drawn to helping others and creating beautiful, harmonious environments wherever you go.',
ARRAY['Pink', 'Light Blue', 'Lavender'],
ARRAY[1, 2, 4],
'Set healthy boundaries and remember to care for yourself as much as you care for others. Your nurturing nature is a gift that heals the world.'),

(7, 'The Seeker', 'Mystical Analyst', 'Deep thinkers and spiritual seekers who are always searching for truth and meaning. You have a natural ability to see beyond the surface and understand hidden mysteries.',
ARRAY['Analytical mind', 'Spiritual insight', 'Research abilities', 'Intuition', 'Depth of understanding'],
ARRAY['Overthinking', 'Isolation', 'Skepticism', 'Difficulty trusting', 'Perfectionism'],
ARRAY['Researcher', 'Scientist', 'Therapist', 'Detective', 'Spiritual Teacher', 'Analyst', 'Academic'],
'Introspective, analytical, and spiritually inclined. You prefer depth over breadth and are naturally drawn to mysteries and hidden truths.',
ARRAY['Purple', 'Indigo', 'White'],
ARRAY[3, 5, 9],
'Balance your need for solitude with meaningful connections to others. Your insights and wisdom are meant to be shared with the world.'),

(8, 'The Achiever', 'Material Master', 'Natural executives who understand how to achieve material success and worldly power. You have the rare combination of vision, determination, and business acumen.',
ARRAY['Business acumen', 'Leadership', 'Ambition', 'Financial wisdom', 'Organizational skills'],
ARRAY['Materialism', 'Workaholic tendencies', 'Impatience', 'Ruthlessness', 'Stress-related health issues'],
ARRAY['Business Owner', 'Financial Advisor', 'Real Estate Developer', 'Investment Banker', 'Corporate Executive', 'Lawyer', 'Surgeon'],
'Ambitious, powerful, and business-minded. You understand how to achieve material success and have natural executive abilities.',
ARRAY['Black', 'Dark Gray', 'Burgundy'],
ARRAY[2, 4, 6],
'Remember that true success includes spiritual and emotional fulfillment, not just material achievement. Use your power to uplift others and create positive change.'),

(9, 'The Humanitarian', 'Universal Server', 'Compassionate souls who are here to serve humanity and make the world a better place. You see the bigger picture and are driven by a desire to help all of mankind.',
ARRAY['Compassion', 'Wisdom', 'Generosity', 'Universal love', 'Humanitarian spirit'],
ARRAY['Emotional volatility', 'Martyrdom', 'Impracticality', 'Over-giving', 'Difficulty saying no'],
ARRAY['Non-profit Leader', 'Doctor', 'Artist', 'Philanthropist', 'Environmental Activist', 'International Aid Worker', 'Spiritual Leader'],
'Compassionate, wise, and universally loving. You are naturally drawn to serving humanity and making the world a more beautiful place.',
ARRAY['Gold', 'Purple', 'Crimson'],
ARRAY[3, 6, 7],
'Learn to set boundaries and take care of yourself while serving others. Your compassionate heart and universal perspective are exactly what the world needs.');