import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, PenTool } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 gradient-hero text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-audio-primary/30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-glow/20 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Where Stories
              <span className="block text-accent-glow">Come Alive</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover, share, and experience stories in both text and audio. 
              A universe of narratives awaits your imagination.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-primary hover:text-primary-glow shadow-elegant">
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Stories
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <PenTool className="mr-2 h-5 w-5" />
              Share Your Story
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/15">
              <BookOpen className="h-8 w-8 mb-4 text-accent-glow" />
              <h3 className="font-semibold mb-2">Rich Text Stories</h3>
              <p className="text-white/80 text-sm">Beautiful typography and immersive reading experience</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/15">
              <Headphones className="h-8 w-8 mb-4 text-accent-glow" />
              <h3 className="font-semibold mb-2">Audio Narratives</h3>
              <p className="text-white/80 text-sm">Listen to stories with high-quality text-to-speech</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-bounce hover:bg-white/15">
              <PenTool className="h-8 w-8 mb-4 text-accent-glow" />
              <h3 className="font-semibold mb-2">Easy Sharing</h3>
              <p className="text-white/80 text-sm">Upload and share your stories with the community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;