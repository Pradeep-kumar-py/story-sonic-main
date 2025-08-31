import { Search, BookOpen, User, Menu, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">StoryVerse</h1>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-story-meta h-4 w-4" />
            <Input 
              placeholder="Search stories..." 
              className="pl-10 gradient-card shadow-story transition-smooth"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/explore')}>
            Explore
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/browse')}>
            Browse
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/favorites')}>
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name || 'User'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/signin')}>
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;