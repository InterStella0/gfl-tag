import { colors } from '../colorConstants.js';

const TagRichTextPalette = ({ darkMode, currentTypingColor, setCurrentTypingColor, handleColorClick }) => {
  return (
    <div className={`rounded-2xl p-6 mb-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Tag Color Palette - Rich Text</h3>
      <p className="text-sm text-gray-500 mb-4">
        Select text and click a color to apply it, or click a color to set typing color for new text.
      </p>
      {currentTypingColor && (
        <div className={`mb-4 p-3 rounded-lg backdrop-blur-sm border ${
          darkMode 
            ? 'bg-blue-900/60 border-blue-400/50 shadow-lg shadow-blue-500/20' 
            : 'bg-blue-50/80 border-blue-200/60 shadow-md shadow-blue-300/20'
        }`}>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: currentTypingColor.color }}
            />
            <span className="text-sm font-medium">
              Typing color: <span className="text-blue-600 dark:text-blue-400">{currentTypingColor.name}</span> - New text will be this color
            </span>
            <button
              onClick={() => setCurrentTypingColor(null)}
              className="ml-auto text-xs px-2 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
              currentTypingColor?.code === color.code
                ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                : darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-50 hover:bg-gray-100'
            } hover:scale-105`}
            title={`${currentTypingColor?.code === color.code ? 'Active typing color: ' : ''}${color.name} - ${currentTypingColor?.code === color.code ? 'Click to clear' : 'Click to set typing color or apply to selection'}`}
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.color }}
            />
            <span className="text-xs font-mono">{color.name} ({color.code})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagRichTextPalette;