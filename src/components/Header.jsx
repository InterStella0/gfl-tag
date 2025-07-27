import { Palette, Sun, Moon, Coffee, Github } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <Palette className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Mella's Tag Editor
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://Ko-fi.com/interstella0"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border ${
            darkMode 
              ? 'bg-orange-600/80 hover:bg-orange-500/80 text-white border-orange-500/30 shadow-lg shadow-orange-500/20' 
              : 'bg-orange-500/90 hover:bg-orange-600/90 text-white border-orange-400/40 shadow-md shadow-orange-400/30'
          }`}
          title="Support me on Ko-fi"
        >
          <Coffee className="w-4 h-4" />
          <span className="text-sm font-medium">Ko-fi</span>
        </a>
        
        <a
          href="https://github.com/InterStella0/gfl-tag"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
            darkMode 
              ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border-purple-500/30 shadow-lg shadow-purple-500/20' 
              : 'bg-white/80 hover:bg-gray-50/80 text-gray-600 border-pink-200/60 shadow-md shadow-pink-500/20'
          }`}
          title="View on GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
            darkMode 
              ? 'bg-gray-800/80 hover:bg-gray-700/80 text-yellow-400 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
              : 'bg-white/80 hover:bg-gray-50/80 text-gray-600 border-pink-200/60 shadow-xl shadow-pink-500/20'
          }`}
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Header;