import { Heart } from "lucide-react";
import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  // Mock data - in real app, this would come from user's favorites in Supabase
  const favoriteStories = [
    // Empty for now - would be populated from user's actual favorites
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-story-text">
              Your Favorites
            </h1>
          </div>
          <p className="text-story-meta text-lg max-w-2xl">
            Stories you've saved to read later
          </p>
        </div>

        {favoriteStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-story-meta mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-story-text mb-2">
              No favorites yet
            </h3>
            <p className="text-story-meta mb-6 max-w-md mx-auto">
              Start exploring stories and click the heart icon to save your favorites here
            </p>
            <Button variant="default" onClick={() => window.location.href = '/browse'}>
              Browse Stories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;