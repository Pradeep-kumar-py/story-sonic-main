import { Heart, Play, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface StoryCardProps {
  id?: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  readTime: string;
  likes: number;
  hasAudio?: boolean;
  thumbnail?: string;
  isLiked?: boolean;
}

const StoryCard = ({ 
  id = 0,
  title, 
  author, 
  description, 
  genre, 
  readTime, 
  likes, 
  hasAudio = false,
  thumbnail = "/placeholder.svg",
  isLiked = false 
}: StoryCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/story/${id}`);
  };
  return (
    <Card 
      className="group gradient-card shadow-story hover:shadow-elegant transition-smooth hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          {hasAudio && (
            <div className="absolute top-3 right-3">
              <div className="bg-audio-primary/90 text-white rounded-full p-2 shadow-audio">
                <Play className="h-4 w-4" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs">
              {genre}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-story-text line-clamp-2 group-hover:text-primary transition-smooth">
              {title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <User className="h-3 w-3 text-story-meta" />
              <span className="text-sm text-story-meta">{author}</span>
            </div>
          </div>
          
          <p className="text-sm text-story-meta line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-story-meta">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{likes}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-smooth hover:text-primary"
            >
              Read More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;