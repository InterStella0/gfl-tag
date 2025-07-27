const BackgroundDecorations = ({ darkMode }) => {
  return (
    <div key={darkMode ? 'dark' : 'light'} className="fixed inset-0 pointer-events-none">
      {/* Large Flowers */}
      <div className={`absolute top-20 left-16 w-12 h-12 ${darkMode ? 'opacity-20' : 'opacity-30'}`}>
        <div className="relative w-full h-full animate-pulse">
          <div className="absolute inset-0 bg-pink-300 rounded-full"></div>
          <div className="absolute top-1 left-1 w-4 h-4 bg-pink-400 rounded-full"></div>
          <div className="absolute top-1 right-1 w-4 h-4 bg-pink-400 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-4 h-4 bg-pink-400 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-pink-400 rounded-full"></div>
          <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-300 rounded-full"></div>
        </div>
      </div>
      
      <div className={`absolute top-32 right-20 w-10 h-10 ${darkMode ? 'opacity-25' : 'opacity-35'}`}>
        <div className="relative w-full h-full animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="absolute inset-0 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1 left-1 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute top-1 right-1 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute top-3 left-3 w-3 h-3 bg-yellow-300 rounded-full"></div>
        </div>
      </div>

      <div className={`absolute bottom-24 left-24 w-8 h-8 ${darkMode ? 'opacity-20' : 'opacity-30'}`}>
        <div className="relative w-full h-full animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-blue-300 rounded-full"></div>
          <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-300 rounded-full"></div>
        </div>
      </div>

      <div className={`absolute bottom-32 right-16 w-14 h-14 ${darkMode ? 'opacity-15' : 'opacity-25'}`}>
        <div className="relative w-full h-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-green-300 rounded-full"></div>
          <div className="absolute top-1 left-1 w-5 h-5 bg-green-400 rounded-full"></div>
          <div className="absolute top-1 right-1 w-5 h-5 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-5 h-5 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full"></div>
          <div className="absolute top-4 left-4 w-5 h-5 bg-yellow-300 rounded-full"></div>
        </div>
      </div>

      {/* Small Sparkles */}
      <div className={`absolute top-16 left-1/3 w-2 h-2 bg-yellow-400 rounded-full ${darkMode ? 'opacity-40' : 'opacity-60'} animate-ping`}></div>
      <div className={`absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full ${darkMode ? 'opacity-50' : 'opacity-70'} animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
      <div className={`absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full ${darkMode ? 'opacity-30' : 'opacity-50'} animate-ping`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute top-1/2 left-1/6 w-1 h-1 bg-blue-400 rounded-full ${darkMode ? 'opacity-60' : 'opacity-80'} animate-pulse`} style={{ animationDelay: '1.5s' }}></div>
      <div className={`absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full ${darkMode ? 'opacity-40' : 'opacity-60'} animate-ping`} style={{ animationDelay: '2s' }}></div>
      
      {/* Medium Flowers */}
      <div className={`absolute top-1/3 left-1/2 w-6 h-6 ${darkMode ? 'opacity-25' : 'opacity-35'}`}>
        <div className="relative w-full h-full animate-pulse" style={{ animationDelay: '2s' }}>
          <div className="absolute inset-0 bg-pink-200 rounded-full"></div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-200 rounded-full"></div>
        </div>
      </div>

      <div className={`absolute top-3/4 left-1/5 w-5 h-5 ${darkMode ? 'opacity-30' : 'opacity-40'}`}>
        <div className="relative w-full h-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-indigo-200 rounded-full"></div>
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
        </div>
      </div>

      {/* More tiny sparkles */}
      <div className={`absolute top-1/5 right-1/5 w-1 h-1 bg-yellow-300 rounded-full ${darkMode ? 'opacity-50' : 'opacity-70'} animate-ping`} style={{ animationDelay: '3s' }}></div>
      <div className={`absolute bottom-1/5 left-1/3 w-1 h-1 bg-pink-300 rounded-full ${darkMode ? 'opacity-40' : 'opacity-60'} animate-pulse`} style={{ animationDelay: '2.5s' }}></div>
      <div className={`absolute top-2/3 right-1/6 w-1 h-1 bg-purple-300 rounded-full ${darkMode ? 'opacity-60' : 'opacity-80'} animate-ping`} style={{ animationDelay: '1.8s' }}></div>
    </div>
  );
};

export default BackgroundDecorations;