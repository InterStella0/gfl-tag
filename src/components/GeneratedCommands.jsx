import { Copy, Bug, Code } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { colors, getColorMapping } from '../colorConstants';

const COMMAND_TYPES = {
  chat: { settag: '/settag', tagcolor: '/tagcolor', namecolor: '/namecolor' },
  console: { settag: 'c_settag', tagcolor: 'c_tagcolor', namecolor: 'c_namecolor' },
  none: { settag: '', tagcolor: '', namecolor: '' }
};

const MODES = [
  { key: 'unicode', label: 'Unicode', icon: Code },
  { key: 'rawUnicode', label: 'Raw Unicode', icon: Code },
  { key: 'debug', label: 'Debug', icon: Bug },
  { key: 'friendly', label: 'Friendly', icon: Code }
];

const COMMAND_TYPE_OPTIONS = [
  { key: 'chat', label: 'Chat' },
  { key: 'console', label: 'Console' },
  { key: 'none', label: 'Raw' }
];

const GeneratedCommands = ({ 
  darkMode, 
  tagText, 
  nameText, 
  tagBaseColor,
  nameColor,
  tagSegments
}) => {
  const [commandType, setCommandType] = useState('chat'); 
  const [copied, setCopied] = useState(false);
  const [displayMode, setDisplayMode] = useState("unicode");

  const hasContent = useMemo(() => 
    Boolean(tagText?.trim() || nameText?.trim()), 
    [tagText, nameText]
  );

  const baseColorCode = useMemo(() => 
    tagBaseColor ? getColorMapping(tagBaseColor) : '', 
    [tagBaseColor]
  );

  const sortedSegments = useMemo(() => 
    tagSegments ? [...tagSegments].sort((a, b) => a.start - b.start) : [],
    [tagSegments]
  );

  const getColorCode = useCallback((color) => {
    switch(displayMode) {
      case 'unicode': return color.unicode;
      case 'rawUnicode': return color.rawUnicode;
      case 'debug': return `[${color.code}]`;
      case 'friendly': return color.friendly;
      default: return color.unicode;
    }
  }, [displayMode]);

  const generateTagColorCommand = useCallback(() => {
    if (!tagBaseColor) return '';
    const prefix = COMMAND_TYPES[commandType].tagcolor;
    return prefix ? `${prefix} ${tagBaseColor.code}` : tagBaseColor.code;
  }, [tagBaseColor, commandType]);

  const generateNameColorCommand = useCallback(() => {
    if (!nameColor || !nameText?.trim()) return '';
    const prefix = COMMAND_TYPES[commandType].namecolor;
    return prefix ? `${prefix} ${nameColor.code}` : nameColor.code;
  }, [nameColor, nameText, commandType]);

  const generateSetTagCommand = useCallback(() => {
    const trimmedTag = tagText?.trim();
    if (!trimmedTag) return '';
    
    let result = '';
    let lastEnd = 0;

    sortedSegments.forEach(segment => {
      if (segment.start > lastEnd) {
        result += trimmedTag.slice(lastEnd, segment.start);
      }

      const segmentText = trimmedTag.slice(segment.start, segment.end);
      const colorCode = getColorCode(segment.color);
      result += `${colorCode}${segmentText}`;
      
      if (segment.end < trimmedTag.length && baseColorCode) {
        const resetColor = colors.find(c => c.code === baseColorCode);
        if (resetColor) {
          result += getColorCode(resetColor);
        }
      }

      lastEnd = segment.end;
    });

    if (lastEnd < trimmedTag.length) {
      result += trimmedTag.slice(lastEnd);
    }

    const prefix = COMMAND_TYPES[commandType].settag;
    return prefix ? `${prefix} ${result}` : result;
  }, [tagText, sortedSegments, baseColorCode, displayMode, commandType, getColorCode]);

  const commands = useMemo(() => {
    const cmds = [];
    
    if (tagBaseColor) {
      cmds.push(generateTagColorCommand());
    }
    
    if (tagText?.trim()) {
      cmds.push(generateSetTagCommand());
    }

    if (nameColor && nameText?.trim()) {
      cmds.push(generateNameColorCommand());
    }
    
    return cmds;
  }, [generateTagColorCommand, generateSetTagCommand, generateNameColorCommand, tagBaseColor, tagText, nameColor, nameText]);

  const copyCommands = useCallback(async () => {
    if (commands.length === 0) return;
    
    try {
      await navigator.clipboard.writeText(commands.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [commands]);

  const currentModeIndex = useMemo(() => 
    MODES.findIndex(mode => mode.key === displayMode), 
    [displayMode]
  );
  
  const nextMode = MODES[(currentModeIndex + 1) % MODES.length];
  
  const currentCommandTypeIndex = useMemo(() => 
    COMMAND_TYPE_OPTIONS.findIndex(t => t.key === commandType), 
    [commandType]
  );
  
  const currentCommandType = COMMAND_TYPE_OPTIONS[currentCommandTypeIndex];
  const nextCommandType = COMMAND_TYPE_OPTIONS[(currentCommandTypeIndex + 1) % COMMAND_TYPE_OPTIONS.length];

  const switchDisplayMode = useCallback(() => {
    setDisplayMode(nextMode.key);
  }, [nextMode.key]);

  const switchCommandType = useCallback(() => {
    setCommandType(nextCommandType.key);
  }, [nextCommandType.key]);

  if (!hasContent) return null;

  const containerClasses = `rounded-2xl p-6 backdrop-blur-sm border ${
    darkMode 
      ? 'bg-gray-800/80 border-purple-500/20 shadow-2xl shadow-purple-500/10' 
      : 'bg-white/80 border-pink-200/50 shadow-xl shadow-pink-500/10'
  }`;

  const buttonClasses = `flex items-center gap-2 px-3 py-1 text-sm rounded-lg transition-colors ${
    darkMode
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
  }`;

  const copyButtonClasses = `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
    copied
      ? 'bg-green-500 text-white'
      : darkMode
      ? 'bg-purple-600 hover:bg-purple-700 text-white'
      : 'bg-purple-500 hover:bg-purple-600 text-white'
  } shadow-md hover:shadow-lg`;

  const codeBlockClasses = `p-3 rounded-lg font-mono text-sm break-all ${
    darkMode ? 'bg-gray-900' : 'bg-gray-50'
  }`;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Generated Commands</h3>
          
          <div className="flex gap-2">
            <button
              onClick={switchDisplayMode}
              className={buttonClasses}
              title={`Switch to ${nextMode.label} mode`}
            >
              <nextMode.icon className="w-4 h-4" />
              <span>{MODES[currentModeIndex]?.label}</span>
            </button>
            <button
              onClick={switchCommandType}
              className={buttonClasses}
              title={`Switch to ${nextCommandType.label} commands`}
            >
              <span>{currentCommandType?.label}</span>
            </button>
          </div>
        </div>
        <button
          onClick={copyCommands}
          className={copyButtonClasses}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Commands'}
        </button>
      </div>
      
      <div className="space-y-3">
        {tagBaseColor && (
          <div>
            <label className="text-sm text-gray-500">Tag Base Color:</label>
            <div className={codeBlockClasses}>
              {generateTagColorCommand()}
            </div>
          </div>
        )}
        
        {tagText?.trim() && (
          <div>
            <label className="text-sm text-gray-500">Tag Text:</label>
            <div className={codeBlockClasses}>
              {generateSetTagCommand()}
            </div>
          </div>
        )}

        {nameColor && nameText?.trim() && (
          <div>
            <label className="text-sm text-gray-500">Name Color:</label>
            <div className={codeBlockClasses}>
              {generateNameColorCommand()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedCommands;