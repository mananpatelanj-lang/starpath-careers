import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  readTime: string;
}

const dummyBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Hidden Power of Life Path Number 7: Mystical Insights Revealed",
    excerpt: "Discover the profound spiritual journey of Life Path 7 individuals and how their analytical nature combined with mystical intuition creates unique opportunities for enlightenment and success.",
    author: "Sarah Moonstone",
    date: "2024-02-15",
    image: "/placeholder.svg", // This would be a real image in production
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Career Alignment Through Numerology: Finding Your True Purpose",
    excerpt: "Learn how numerological insights can guide you toward a career that aligns with your soul's purpose. Explore practical strategies for using your life path number to make meaningful career decisions.",
    author: "Marcus Stellarium",
    date: "2024-02-12",
    readTime: "7 min read"
  }
];

export function BlogSection() {
  const handleReadMore = (postId: number) => {
    // This would navigate to the full blog post in a real implementation
    console.log(`Navigate to blog post ${postId}`);
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold text-cosmic-glow">
            Numerology Insights Blog
          </h2>
        </div>
        <p className="text-muted-foreground">
          Explore deeper wisdom and practical guidance from our numerology experts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dummyBlogPosts.map((post, index) => (
          <Card
            key={post.id}
            className="card-cosmic overflow-hidden hover:scale-105 transition-transform animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {post.image && (
              <div className="aspect-video bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <span className="text-accent">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-accent mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <Button
                onClick={() => handleReadMore(post.id)}
                variant="outline"
                className="group w-full"
              >
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="ghost" className="text-accent hover:text-primary">
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}