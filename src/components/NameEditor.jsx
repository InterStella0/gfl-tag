import { otherColors } from "../colorConstants";


const NameEditor = ({ darkMode, nameText, setNameText, nameColor, setNameColor }) => {
  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Name (Single Color)</h3>
      
      <p className="text-sm text-gray-500 mb-3">
        Choose one color for the entire name
      </p>
      
      <input
        type="text"
        value={nameText}
        onChange={(e) => setNameText(e.target.value)}
        placeholder="Enter name..."
        className={`w-full px-4 py-3 rounded-lg border transition-colors mb-4 ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400' 
            : 'bg-white border-gray-200 focus:border-purple-400 text-gray-800 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-purple-400/20`}
      />
      
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        <button
          onClick={() => setNameColor(null)}
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            !nameColor 
              ? 'bg-purple-500 text-white' 
              : darkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-transparent" />
          <span className="text-xs">Default</span>
        </button>
        
        {otherColors.map((color, index) => (
          <button
            key={index}
            onClick={() => setNameColor(color)}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              nameColor?.code === color.code 
                ? 'bg-purple-500 text-white' 
                : darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.color }}
            />
            <span className="text-xs font-mono">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NameEditor;