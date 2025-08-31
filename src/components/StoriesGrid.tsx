import StoryCard from "./StoryCard";
import { stories } from "@/data/stories";

const StoriesGrid = () => {

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-story-text mb-4">
            Featured Stories
          </h2>
          <p className="text-story-meta text-lg max-w-2xl mx-auto">
            Dive into carefully curated tales that will transport you to new worlds
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesGrid;