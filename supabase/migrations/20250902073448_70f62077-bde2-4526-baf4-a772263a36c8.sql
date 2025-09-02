-- Update number 1 with comprehensive chapter content
UPDATE public.numerology_numbers 
SET 
  name = 'The Pioneer',
  title = 'Leadership, Innovation, and the Primal Force',
  description = 'The number 1 is the genesis, the primal force from which all other numbers spring. It is the vibration of new beginnings, pure action, and unwavering individuality. Ruled by the radiant Sun, the number 1 is imbued with a powerful, commanding energy that naturally seeks to lead and illuminate. In numerology, this is the path of the self, a journey of establishing a strong, independent identity and learning to stand on one''s own. The core archetype of this Life Path is The Pioneer and The Leader, a trailblazer destined to forge new paths, innovate, and inspire others to follow their dynamic vision.',
  strengths = ARRAY[
    'Fiercely independent thinkers and self-motivated',
    'Exceptionally creative and original minds',
    'Formidable will and determination',
    'Action-oriented "doers" who manifest dreams into reality',
    'Natural confidence and ability to inspire others',
    'Pioneering spirit and courage to innovate'
  ],
  weaknesses = ARRAY[
    'Can tip into arrogance and egotism if untempered',
    'Impatient with others'' shortcomings',
    'May become aggressive or stubborn when opposed',
    'Resist taking orders and supportive roles',
    'Deep-seated self-doubt despite confident exterior',
    'May seek external validation to quiet inner insecurity'
  ],
  career_paths = ARRAY[
    'Entrepreneur',
    'CEO/Executive',
    'Manager',
    'Inventor',
    'Freelancer',
    'Technology Pioneer',
    'Marketing/Advertising',
    'Sports Professional',
    'Entertainment Industry',
    'Lawyer',
    'Politician'
  ],
  personality_traits = 'The personality of a Life Path 1 is a compelling mix of powerful strengths and profound challenges, often revolving around their relationship with their own power. While they project an aura of unshakeable confidence, their greatest struggle is frequently deep-seated self-doubt. This insecurity is the hidden engine behind many of their behaviors. The very uniqueness that makes them brilliant innovators is also what can make them feel isolated and misunderstood. The true spiritual task for a 1 is not simply to lead, but to learn to lead from a place of authentic self-acceptance.',
  lucky_colors = ARRAY['Red', 'Orange', 'Yellow', 'Gold'],
  compatible_numbers = ARRAY[3, 5, 6],
  life_path_guidance = 'To fully embody their potential, a Life Path 1 must focus on transmuting self-doubt into unshakeable self-trust, embracing their unique path without needing external applause. They must consciously practice humility and empathy to prevent their natural confidence from souring into arrogance. Finding healthy outlets for their intense competitive drive, such as through sports or business challenges, can be highly beneficial. A key area of growth is learning to delegate and trust others, understanding that true leadership involves empowering the team, not just commanding it.'
WHERE number = 1;