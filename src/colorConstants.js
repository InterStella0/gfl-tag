export const otherColors = [
  {name: 'Purple', code: 'purple', color: '#CD3DC1FF'},
  {name: 'Dark Red', code: 'darkred', color: '#E22B2FFF'},
  {name: 'red', code: 'red', color: '#D85157FF'},
  {name: 'Light Red', code: 'lightred', color: '#CF5758FF'},
  {name: 'Orange', code: 'orange', color: '#CAA453FF'},
  {name: 'Yellow', code: 'yellow', color: '#E1DE8DFF'},
  {name: 'Lime', code: 'lime', color: '#C5EBB0FF'},
  {name: 'Light Green', code: 'lightgreen', color: '#C5EBB0FF'},
  {name: 'Green', code: 'green', color: '#61DA67FF'},
  {name: 'Light Blue', code: 'lightblue', color: '#6B8DBDFF'},
  {name: 'Blue', code: 'blue', color: '#5F6EC9FF'},
  {name: 'Gray', code: 'gray', color: '#B9C5D1FF'},
  {name: 'Grey', code: 'grey', color: '#BFC3C6FF'},
  {name: 'White', code: 'white', color: '#FFFFFFFF'},
];

export const colors = [
  {name: 'White', code: 'a', color: '#FFFFFF', unicode: '\x01', rawUnicode: '\\u0001', friendly: '{white}'},
  {name: 'Green', code: 'b', color: '#4FC83DFF', unicode: '\x04', rawUnicode: '\\u0004', friendly: '{green}'},
  {name: 'Light Green', code: 'c', color: '#CEE698FF', unicode: '\x05', rawUnicode: '\\u0005', friendly: '{lightgreen}'},
  {name: 'Blue', code: 'd', color: '#758FCCFF', unicode: '\x0b', rawUnicode: '\\u000b', friendly: '{blue}'},
  {name: 'Dark Blue', code: 'e', color: '#5C66C7FF', unicode: '\x0c', rawUnicode: '\\u000c', friendly: '{darkblue}'},
  {name: 'Dark Red', code: 'f', color: '#D60403FF', unicode: '\x02', rawUnicode: '\\u0002', friendly: '{darkred}'},
  {name: 'Light Red', code: 'g', color: '#B85043FF', unicode: '\x0f', rawUnicode: '\\u000f', friendly: '{lightred}'},
  {name: 'Gold', code: 'h', color: '#E5B064FF', unicode: '\x10', rawUnicode: '\\U00000010', friendly: '{gold}'},
  {name: 'Grey', code: 'i', color: '#CFC8C0FF', unicode: '\x08', rawUnicode: '\\u0008', friendly: '{grey}'},
  {name: 'Lime', code: 'j', color: '#ACE779FF', unicode: '\x06', rawUnicode: '\\u0006', friendly: '{lime}'},
  {name: 'Orchid', code: 'k', color: '#B54BBAFF', unicode: '\x0e', rawUnicode: '\\u000e', friendly: '{orchid}'},
  {name: 'Yellow', code: 'l', color: '#E1E495FF', unicode: '\x09', rawUnicode: '\\u0009', friendly: '{yellow}'},
  {name: 'Palered', code: 'm', color: '#D5494CFF', unicode: '\x07', rawUnicode: '\\u0007', friendly: '{palered}'},
];

export const getColorMapping = (otherColor) => {
  const nameMap = {
    'white': 'a',
    'green': 'b', 
    'lightgreen': 'c',
    'blue': 'd',
    'darkred': 'f',
    'lightred': 'g',
    'orange': 'h',
    'grey': 'i',
    'gray': 'i',
    'lime': 'j',
    'purple': 'k',
    'yellow': 'l',
    'red': 'm'
  };
  
  return nameMap[otherColor.code.toLowerCase()] || 'a';
};