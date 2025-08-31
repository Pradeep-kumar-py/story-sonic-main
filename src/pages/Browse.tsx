import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const genres = ["all", "Fantasy", "Sci-Fi", "Romance", "Mystery", "Adventure", "Drama"];
  
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "all" || story.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-story-text mb-4">
            Browse Stories
          </h1>
          <p className="text-story-meta text-lg max-w-2xl">
            Discover amazing stories from our community of writers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-story-meta h-4 w-4" />
            <Input
              placeholder="Search stories or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 gradient-card shadow-story"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-story-meta" />
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px] gradient-card shadow-story">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre === "all" ? "All Genres" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-story-meta">
            {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-story-meta text-lg">No stories found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;