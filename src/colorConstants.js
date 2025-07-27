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
  {name: 'White', code: 'a', color: '#FFFFFF', unicode: ''},
  {name: 'Green', code: 'b', color: '#4FC83DFF', unicode: ''},
  {name: 'Light Green', code: 'c', color: '#CEE698FF', unicode: ''},
  {name: 'Blue', code: 'd', color: '#758FCCFF', unicode: ''},
  {name: 'Dark Blue', code: 'e', color: '#5C66C7FF', unicode: ''},
  {name: 'Dark Red', code: 'f', color: '#D60403FF', unicode: ''},
  {name: 'Light Red', code: 'g', color: '#B85043FF', unicode: ''},
  {name: 'Gold', code: 'h', color: '#E5B064FF', unicode: ''},
  {name: 'Grey', code: 'i', color: '#CFC8C0FF', unicode: ''},
  {name: 'Lime', code: 'j', color: '#ACE779FF', unicode: ''},
  {name: 'Orchid', code: 'k', color: '#B54BBAFF', unicode: ''},
  {name: 'Yellow', code: 'l', color: '#E1E495FF', unicode: '   '},
  {name: 'Palered', code: 'm', color: '#D5494CFF', unicode: ''},
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