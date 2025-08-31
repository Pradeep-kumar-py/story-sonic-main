import { TrendingUp, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StoryCard from "@/components/StoryCard";
import { stories } from "@/data/stories";

const Explore = () => {
  // Mock trending and recommended data
  const trendingStories = stories.slice(0, 3);
  const recentlyAdded = stories.slice(3, 6);
  const topRated = stories.slice(1, 4);

  const categories = [
    { name: "Fantasy", count: 156, color: "bg-purple-100 text-purple-800" },
    { name: "Sci-Fi", count: 98, color: "bg-blue-100 text-blue-800" },
    { name: "Romance", count: 234, color: "bg-pink-100 text-pink-800" },
    { name: "Mystery", count: 87, color: "bg-yellow-100 text-yellow-800" },
    { name: "Adventure", count: 145, color: "bg-green-100 text-green-800" },
    { name: "Drama", count: 76, color: "bg-red-100 text-red-800" }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-story-text mb-4">
            Explore Stories
          </h1>
          <p className="text-story-meta text-lg max-w-2xl">
            Discover trending stories, new releases, and personalized recommendations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card shadow-story">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-story-meta">Total Stories</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-story-text">1,234</div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-story">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-story-meta">Active Writers</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-story-text">567</div>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-story">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-story-meta">Reading Time</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-story-text">2.5M</div>
              <p className="text-xs text-story-meta">minutes this month</p>
            </CardContent>
          </Card>
          <Card className="gradient-card shadow-story">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-story-meta">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-story-text">4.8</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-story-text mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="gradient-card shadow-story hover:shadow-elegant transition-smooth cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <Badge variant="secondary" className={`mb-2 ${category.color}`}>
                    {category.name}
                  </Badge>
                  <p className="text-sm text-story-meta">{category.count} stories</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Stories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-story-text">Trending Now</h2>
            <Button variant="outline" onClick={() => window.location.href = '/browse'}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStories.map((story, index) => (
              <StoryCard key={`trending-${index}`} {...story} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-story-text">Recently Added</h2>
            <Button variant="outline" onClick={() => window.location.href = '/browse'}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyAdded.map((story, index) => (
              <StoryCard key={`recent-${index}`} {...story} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-story-text">Top Rated</h2>
            <Button variant="outline" onClick={() => window.location.href = '/browse'}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRated.map((story, index) => (
              <StoryCard key={`top-${index}`} {...story} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;