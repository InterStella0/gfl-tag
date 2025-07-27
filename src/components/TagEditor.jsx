import { Type } from 'lucide-react';

const TagEditor = ({ 
  darkMode, 
  tagEditorRef, 
  handleTextInput, 
  clearTagFormatting, 
  renderStyledText 
}) => {
  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tag Text Editor</h3>
        <button
          onClick={clearTagFormatting}
          className={`flex items-center gap-2 px-3 py-1 text-sm rounded-lg transition-colors ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <Type className="w-4 h-4" />
          Clear Colors
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mb-3">
        Type to add text. Select a color first to type in that color.
      </p>
      
      <div
        ref={tagEditorRef}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleTextInput}
        className={`w-full min-h-16 p-4 rounded-lg border-2 border-dashed transition-colors focus:outline-none focus:border-purple-400 cursor-text ${
          darkMode 
            ? 'bg-gray-900 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-800'
        }`}
        style={{ fontSize: '16px', lineHeight: '1.5' }}
      />

      {/* Styled Preview */}
      <div className="mt-4">
        <label className="text-sm text-gray-500 block mb-2">Preview:</label>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {renderStyledText()}
        </div>
      </div>
    </div>
  );
};

export default TagEditor;