import { useParams, useNavigate } from "react-router-dom";
import { Heart, Play, Pause, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { stories } from "@/data/stories";

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const storyIndex = id ? parseInt(id) : 0;
  const story = stories[storyIndex];

  useEffect(() => {
    if (!story) {
      navigate('/browse');
    }
  }, [story, navigate]);

  if (!story) {
    return null;
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mock full story content
  const fullStoryContent = `
    ${story.description}
    
    Chapter 1: The Beginning
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    
    Chapter 2: The Development
    
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
    
    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
    
    Chapter 3: The Conclusion
    
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
    
    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
    
    The End.
  `;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Story Header */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg mb-6">
            <img 
              src={story.thumbnail} 
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge variant="secondary" className="mb-3">
                {story.genre}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {story.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-4">{story.author}</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{story.readTime}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {story.hasAudio && (
              <Button 
                onClick={handlePlayPause}
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {story.likes + (isLiked ? 1 : 0)}
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? 'text-blue-500 border-blue-500' : ''}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <Card className="gradient-card shadow-story">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-story-text leading-relaxed">
                {fullStoryContent}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hidden Audio Element */}
        {story.hasAudio && (
          <audio 
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          >
            <source src="#" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* Author Info */}
        <Card className="gradient-card shadow-story mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-story-text mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-story-text">{story.author}</h4>
                <p className="text-story-meta text-sm mt-1">
                  A passionate storyteller who loves to create immersive worlds and compelling characters. 
                  Follow for more amazing stories and updates.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Follow Author
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryDetail;