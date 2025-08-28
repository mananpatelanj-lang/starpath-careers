-- Create career_data table for numerology combinations
CREATE TABLE public.career_data (
  combination_code TEXT PRIMARY KEY CHECK (combination_code ~ '^M[1-9]B[1-9]$'),
  mulank_name TEXT NOT NULL,
  bhagyank_name TEXT NOT NULL,
  careers TEXT[] NOT NULL CHECK (array_length(careers, 1) = 7),
  strengths TEXT NOT NULL,
  challenges TEXT NOT NULL,
  ai_resistance TEXT NOT NULL,
  market_demand TEXT NOT NULL,
  industry_focus TEXT NOT NULL,
  special_insight TEXT NOT NULL,
  success_formula TEXT NOT NULL,
  financial_potential TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for security
ALTER TABLE public.career_data ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access (since this is public career data)
CREATE POLICY "Allow public read access to career data" 
ON public.career_data 
FOR SELECT 
USING (true);

-- Insert sample data for M1B1 through M1B9 combinations
INSERT INTO public.career_data (combination_code, mulank_name, bhagyank_name, careers, strengths, challenges, ai_resistance, market_demand, industry_focus, special_insight, success_formula, financial_potential) VALUES
('M1B1', 'The Leader', 'The Pioneer', 
 ARRAY['Entrepreneur', 'CEO/Executive', 'Independent Consultant', 'Innovation Director', 'Startup Founder', 'Business Coach', 'Strategic Planner'],
 'Natural leadership, innovation, independence, confidence, pioneering spirit',
 'Can be impatient, overly aggressive, resistant to collaboration',
 'HIGH - Leadership roles remain AI-resistant',
 'EXCELLENT - Leadership skills always in demand',
 'Entrepreneurship & Leadership',
 'Double leadership energy creates unstoppable force for innovation',
 'Lead from the front, trust your instincts, build strong teams',
 'VERY HIGH - Multiple income streams possible'),

('M1B2', 'The Leader', 'The Cooperator',
 ARRAY['Team Leader', 'Project Manager', 'HR Director', 'Diplomatic Relations', 'Partnership Manager', 'Event Coordinator', 'Customer Success Manager'],
 'Leadership with diplomacy, excellent team building, balanced approach',
 'Internal conflict between leading and following, decision paralysis',
 'MEDIUM-HIGH - Interpersonal skills valued',
 'HIGH - Team leadership essential everywhere',
 'Management & Relations',
 'Leadership softened by cooperation creates trusted authority',
 'Balance authority with empathy, build consensus',
 'HIGH - Steady growth through relationships'),

('M1B3', 'The Leader', 'The Creative Communicator',
 ARRAY['Creative Director', 'Marketing Executive', 'Media Producer', 'Brand Strategist', 'Content Creator', 'Public Speaker', 'Entertainment Executive'],
 'Charismatic leadership, creative vision, excellent communication',
 'Can be scattered, overpromises, struggles with routine',
 'MEDIUM - Creative leadership roles evolving',
 'EXCELLENT - Creative leadership highly sought',
 'Creative Industries',
 'Leadership meets creativity for magnetic influence',
 'Inspire through vision, delegate details, stay visible',
 'VERY HIGH - Creative leadership commands premium'),

('M1B4', 'The Leader', 'The Organizer',
 ARRAY['Operations Director', 'System Administrator', 'Quality Manager', 'Process Engineer', 'Construction Manager', 'Logistics Coordinator', 'Safety Director'],
 'Disciplined leadership, systematic approach, reliable execution',
 'Can be rigid, micromanages, resistant to change',
 'MEDIUM - Process optimization still needed',
 'HIGH - Operational excellence always valued',
 'Operations & Systems',
 'Leadership with structure builds lasting organizations',
 'Create systems that work without you, maintain standards',
 'HIGH - Operational efficiency drives profit'),

('M1B5', 'The Leader', 'The Freedom Seeker',
 ARRAY['Sales Director', 'Travel Industry Executive', 'Adventure Tourism', 'International Business', 'Marketing Agency Owner', 'Event Promoter', 'Digital Nomad Consultant'],
 'Dynamic leadership, adaptability, excellent networking',
 'Restless nature, difficulty with commitment, scattered focus',
 'MEDIUM - Travel/experience sectors growing',
 'HIGH - Flexible leadership needed post-COVID',
 'Sales & Experience Economy',
 'Leadership with freedom creates innovative solutions',
 'Embrace change, network globally, stay adaptable',
 'HIGH - Freedom economy offers multiple streams'),

('M1B6', 'The Leader', 'The Nurturer',
 ARRAY['Healthcare Administrator', 'Education Director', 'Family Business Owner', 'Community Leader', 'Social Services Director', 'Wellness Center Owner', 'Childcare Executive'],
 'Caring leadership, family-oriented, community focus',
 'Overprotective tendencies, difficulty saying no, burnout risk',
 'HIGH - Human care always needed',
 'EXCELLENT - Healthcare/education critical',
 'Healthcare & Education',
 'Leadership with heart builds lasting communities',
 'Prioritize people, create nurturing environments',
 'MEDIUM-HIGH - Service sectors steady growth'),

('M1B7', 'The Leader', 'The Spiritual Seeker',
 ARRAY['Research Director', 'University Professor', 'Think Tank Leader', 'Spiritual Coach', 'Innovation Lab Head', 'Technology Researcher', 'Consulting Firm Owner'],
 'Visionary leadership, analytical mind, spiritual wisdom',
 'Can be detached, overthinks decisions, struggles with mundane tasks',
 'HIGH - Deep thinking and analysis valued',
 'MEDIUM-HIGH - Specialized expertise needed',
 'Research & Innovation',
 'Leadership with wisdom creates breakthrough solutions',
 'Think long-term, trust intuition, seek truth',
 'MEDIUM-HIGH - Intellectual property valuable'),

('M1B8', 'The Leader', 'The Achiever',
 ARRAY['Corporate Executive', 'Investment Manager', 'Real Estate Developer', 'Financial Director', 'Business Owner', 'Acquisition Specialist', 'Venture Capitalist'],
 'Powerful leadership, material success, strategic thinking',
 'Can be ruthless, workaholic tendencies, relationship struggles',
 'MEDIUM - Financial leadership evolving with AI',
 'HIGH - Financial expertise always needed',
 'Finance & Business',
 'Leadership with ambition builds empires',
 'Focus on results, build wealth systems, maintain ethics',
 'VERY HIGH - Wealth creation potential excellent'),

('M1B9', 'The Leader', 'The Humanitarian',
 ARRAY['Non-profit Director', 'Social Impact Leader', 'Global Initiative Head', 'Environmental Leader', 'Humanitarian Coordinator', 'Social Enterprise CEO', 'Advocacy Director'],
 'Compassionate leadership, global vision, service-oriented',
 'Can be idealistic, financially impractical, emotional decisions',
 'HIGH - Human leadership for global challenges',
 'EXCELLENT - Social impact sector growing',
 'Social Impact',
 'Leadership with compassion changes the world',
 'Serve a greater cause, think globally, inspire others',
 'MEDIUM - Purpose over profit, but growing field');

-- Continue with M2B1 through M2B9
INSERT INTO public.career_data (combination_code, mulank_name, bhagyank_name, careers, strengths, challenges, ai_resistance, market_demand, industry_focus, special_insight, success_formula, financial_potential) VALUES
('M2B1', 'The Cooperator', 'The Pioneer',
 ARRAY['Deputy Director', 'Partnership Development', 'Co-founder', 'Collaborative Leader', 'Alliance Manager', 'Joint Venture Specialist', 'Cooperative Manager'],
 'Supportive leadership, diplomatic innovation, team harmony',
 'Conflict between supporting and leading, decision delays',
 'HIGH - Collaborative skills essential',
 'HIGH - Partnership expertise valued',
 'Partnerships & Alliances',
 'Cooperation with pioneer spirit creates lasting partnerships',
 'Support others success, innovate through collaboration',
 'HIGH - Partnership profits substantial'),

('M2B2', 'The Cooperator', 'The Cooperator',
 ARRAY['Team Coordinator', 'Mediator', 'Customer Service Manager', 'Human Resources', 'Administrative Manager', 'Support Services', 'Community Coordinator'],
 'Ultimate team player, harmony creator, diplomatic excellence',
 'Lack of initiative, avoids confrontation, undervalues self',
 'HIGH - Human relations always needed',
 'EXCELLENT - Soft skills premium value',
 'Human Resources',
 'Double cooperation energy creates perfect harmony',
 'Be the bridge, facilitate others, create peace',
 'MEDIUM - Steady but not explosive growth');