const PreviewSection = ({ darkMode, tagText, nameText, nameColor, renderStyledText }) => {
  const hasContent = tagText.trim() || nameText.trim();

  if (!hasContent) return null;

  return (
    <div className={`rounded-2xl p-6 mb-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <h3 className="text-lg font-semibold mb-4">Game Preview</h3>
      <div className={`p-4 rounded-lg text-xl ${
        darkMode ? 'bg-gray-900' : 'bg-gray-900'
      }`}>
        {tagText.trim() && renderStyledText()}
        {tagText.trim() && nameText.trim() && <span className="text-gray-400"> </span>}
        {nameText.trim() && (
          <span style={{ 
            color: nameColor ? nameColor.color : (darkMode ? '#FFFFFF' : '#000000')
          }}>
            {nameText}
          </span>
        )}
      </div>
    </div>
  );
};

export default PreviewSection;