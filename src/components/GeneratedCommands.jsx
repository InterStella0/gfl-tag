import { Copy, Bug, Code } from 'lucide-react';

const GeneratedCommands = ({ 
  darkMode, 
  tagText, 
  nameText, 
  copied, 
  copyCommands, 
  generateTagColorCommand, 
  generateSetTagCommand, 
  generateNameColorCommand,
  tagBaseColor,
  nameColor,
  debugMode,
  setDebugMode
}) => {
  const hasContent = tagText.trim() || nameText.trim();

  if (!hasContent) return null;

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
      darkMode 
        ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
        : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Generated Commands</h3>
          <button
            onClick={() => setDebugMode(!debugMode)}
            className={`flex items-center gap-2 px-3 py-1 text-sm rounded-lg transition-colors ${
              debugMode
                ? darkMode
                  ? 'bg-orange-600/80 text-white'
                  : 'bg-orange-500/90 text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={debugMode ? 'Switch to Unicode mode' : 'Switch to Debug mode'}
          >
            {!debugMode ? <Bug className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            <span>{debugMode ? 'Unicode' : 'Debug'}</span>
          </button>
        </div>
        <button
          onClick={copyCommands}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            copied
              ? 'bg-green-500 text-white'
              : darkMode
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          } shadow-md hover:shadow-lg`}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Commands'}
        </button>
      </div>
      
      <div className={`space-y-3`}>
        {tagBaseColor && (
          <div>
            <label className="text-sm text-gray-500">Tag Base Color:</label>
            <div className={`p-3 rounded-lg font-mono text-sm ${
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {generateTagColorCommand()}
            </div>
          </div>
        )}
        
        {tagText.trim() && (
          <div>
            <label className="text-sm text-gray-500">Tag Text:</label>
            <div className={`p-3 rounded-lg font-mono text-sm break-all ${
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {generateSetTagCommand()}
            </div>
          </div>
        )}

        {nameColor && nameText.trim() && (
          <div>
            <label className="text-sm text-gray-500">Name Color:</label>
            <div className={`p-3 rounded-lg font-mono text-sm ${
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {generateNameColorCommand()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedCommands;