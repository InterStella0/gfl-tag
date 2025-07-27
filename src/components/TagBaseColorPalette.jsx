import { otherColors } from '../colorConstants.js';

const TagBaseColorPalette = ({ darkMode, tagBaseColor, setTagBaseColor }) => {
  return (
    <div className={`rounded-2xl p-6 mb-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Tag Color Palette Base</h3>
      <p className="text-sm text-gray-500 mb-4">Choose base color for your tag (generates /tagcolor command)</p>
      <div className="grid grid-cols-7 gap-3">
        <button
          onClick={() => setTagBaseColor(null)}
          className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
            !tagBaseColor 
              ? 'bg-purple-500 text-white' 
              : darkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-transparent" />
          <span className="text-xs">None</span>
        </button>
        {otherColors.map((color, index) => (
          <button
            key={index}
            onClick={() => setTagBaseColor(color)}
            className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
              tagBaseColor?.code === color.code
                ? 'bg-purple-500 text-white'
                : darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-50 hover:bg-gray-100'
            } hover:scale-105`}
            title={`Set base color to ${color.name}`}
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

export default TagBaseColorPalette;