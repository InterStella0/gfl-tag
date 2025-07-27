import { useState, useRef, useCallback, useEffect } from 'react';
import BackgroundDecorations from './BackgroundDecorations';
import Header from './Header';
import TagBaseColorPalette from './TagBaseColorPalette';
import TagRichTextPalette from './TagRichTextPalette';
import TagEditor from './TagEditor';
import NameEditor from './NameEditor';
import PreviewSection from './PreviewSection';
import GeneratedCommands from './GeneratedCommands';
import { getColorMapping } from './colorConstants';
import { getCurrentSelection, getCaretPosition } from './tagTextUtils';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [copied, setCopied] = useState(false);
  
  // Tag state
  const [tagBaseColor, setTagBaseColor] = useState(null);
  const [tagText, setTagText] = useState('');
  const [tagSegments, setTagSegments] = useState([]);
  const [currentTypingColor, setCurrentTypingColor] = useState(null);
  const tagEditorRef = useRef(null);
  
  // Name state
  const [nameText, setNameText] = useState('');
  const [nameColor, setNameColor] = useState(null);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getBaseColorUnicode = () => {
    if (!tagBaseColor) return '';
    return getColorMapping(tagBaseColor);
  };

  // Handle color clicks - Microsoft Word style
  const handleColorClick = (color) => {
    const selection = getCurrentSelection(tagEditorRef);
    
    if (selection && selection.text.length > 0) {
      applyColorToSelection(color, selection);
    } else {
      setCurrentTypingColor(currentTypingColor?.code === color.code ? null : color);
    }
  };

  // Apply color to selection
  const applyColorToSelection = (color, selection = null) => {
    const sel = selection || getCurrentSelection(tagEditorRef);
    if (!sel) return;

    const { start, end } = sel;
    
    const newSegments = tagSegments.filter(segment => 
      segment.end <= start || segment.start >= end
    );

    newSegments.push({ start, end, color });
    newSegments.sort((a, b) => a.start - b.start);
    
    setTagSegments(newSegments);
    window.getSelection().removeAllRanges();
  };

  // Handle text input
  const handleTextInput = (e) => {
    const newText = e.target.textContent || '';
    const oldText = tagText;
    
    if (newText === oldText) return;
    
    if (currentTypingColor && newText.length > oldText.length) {
      const addedLength = newText.length - oldText.length;
      const caretPos = getCaretPosition(tagEditorRef);
      
      if (caretPos !== null) {
        const newSegment = {
          start: caretPos - addedLength,
          end: caretPos,
          color: currentTypingColor
        };
        
        setTagSegments(prev => [...prev, newSegment].sort((a, b) => a.start - b.start));
      }
    }
    
    setTagText(newText);
    
    if (newText.length < oldText.length) {
      const lengthDiff = oldText.length - newText.length;
      
      if (lengthDiff > 1) {
        setTagSegments([]);
      }
    }
  };

  // Render the styled text
  const renderStyledText = () => {
    if (!tagText) return <span className="text-gray-400">Enter tag text...</span>;

    const parts = [];
    let lastEnd = 0;

    const sortedSegments = [...tagSegments].sort((a, b) => a.start - b.start);

    sortedSegments.forEach(segment => {
      if (segment.start > lastEnd) {
        const unstyledText = tagText.slice(lastEnd, segment.start);
        parts.push(
          <span key={`unstyled-${lastEnd}`} style={{ 
            color: tagBaseColor ? tagBaseColor.color : (darkMode ? '#FFFFFF' : '#000000') 
          }}>
            {unstyledText}
          </span>
        );
      }

      const segmentText = tagText.slice(segment.start, segment.end);
      parts.push(
        <span key={`styled-${segment.start}`} style={{ color: segment.color.color }}>
          {segmentText}
        </span>
      );

      lastEnd = segment.end;
    });

    if (lastEnd < tagText.length) {
      const remainingText = tagText.slice(lastEnd);
      parts.push(
        <span key={`unstyled-${lastEnd}`} style={{ 
          color: tagBaseColor ? tagBaseColor.color : (darkMode ? '#FFFFFF' : '#000000') 
        }}>
          {remainingText}
        </span>
      );
    }

    return parts;
  };

  // Generate commands
  const generateTagColorCommand = useCallback(() => {
    if (!tagBaseColor) return '';
    return `/tagcolor ${tagBaseColor.code}`;
  }, [tagBaseColor]);

  const generateSetTagCommand = useCallback(() => {
    if (!tagText.trim()) return '';
    
    let result = '';
    let lastEnd = 0;
    const baseColorCode = getBaseColorUnicode();

    const sortedSegments = [...tagSegments].sort((a, b) => a.start - b.start);

    sortedSegments.forEach(segment => {
      if (segment.start > lastEnd) {
        const unstyledText = tagText.slice(lastEnd, segment.start);
        result += unstyledText;
      }

      const segmentText = tagText.slice(segment.start, segment.end);
      result += `[${segment.color.code}]${segmentText}`;
      
      if (segment.end < tagText.length && baseColorCode) {
        result += `[${baseColorCode}]`;
      }

      lastEnd = segment.end;
    });

    if (lastEnd < tagText.length) {
      result += tagText.slice(lastEnd);
    }

    return `/settag ${result}`;
  }, [tagText, tagSegments, tagBaseColor]);

  const generateNameColorCommand = useCallback(() => {
    if (!nameColor || !nameText.trim()) return '';
    return `/namecolor ${nameColor.code}`;
  }, [nameColor, nameText]);

  const copyCommands = async () => {
    const commands = [];
    
    if (tagBaseColor) {
      commands.push(generateTagColorCommand());
    }
    
    if (tagText.trim()) {
      commands.push(generateSetTagCommand());
    }

    if (nameColor && nameText.trim()) {
      commands.push(generateNameColorCommand());
    }
    
    if (commands.length === 0) return;
    
    const commandText = commands.join('\n');
    
    try {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearTagFormatting = () => {
    setTagSegments([]);
    setCurrentTypingColor(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 text-gray-800'
    }`} style={{
      backgroundImage: darkMode 
        ? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 192, 203, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 80%, rgba(255, 192, 203, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(221, 160, 221, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(173, 216, 230, 0.3) 0%, transparent 50%)'
    }}>
      <BackgroundDecorations darkMode={darkMode} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <TagBaseColorPalette 
          darkMode={darkMode}
          tagBaseColor={tagBaseColor}
          setTagBaseColor={setTagBaseColor}
        />
        
        <TagRichTextPalette 
          darkMode={darkMode}
          currentTypingColor={currentTypingColor}
          setCurrentTypingColor={setCurrentTypingColor}
          handleColorClick={handleColorClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TagEditor 
            darkMode={darkMode}
            tagEditorRef={tagEditorRef}
            handleTextInput={handleTextInput}
            clearTagFormatting={clearTagFormatting}
            renderStyledText={renderStyledText}
          />

          <NameEditor 
            darkMode={darkMode}
            nameText={nameText}
            setNameText={setNameText}
            nameColor={nameColor}
            setNameColor={setNameColor}
          />
        </div>

        <PreviewSection 
          darkMode={darkMode}
          tagText={tagText}
          nameText={nameText}
          nameColor={nameColor}
          renderStyledText={renderStyledText}
        />

        <GeneratedCommands 
          darkMode={darkMode}
          tagText={tagText}
          nameText={nameText}
          copied={copied}
          copyCommands={copyCommands}
          generateTagColorCommand={generateTagColorCommand}
          generateSetTagCommand={generateSetTagCommand}
          generateNameColorCommand={generateNameColorCommand}
          tagBaseColor={tagBaseColor}
          nameColor={nameColor}
        />
      </div>
    </div>
  );
};

export default App;