void function(){

var keys = {
    0: ['Unknown'],
    1: ['Mouse1'],
    2: ['Mouse2'],
    3: ['Break'],
    4: ['Mouse3'],
    5: ['Mouse4'],
    6: ['Mouse5'],
    8: ['Backspace'],
    9: ['Tab'],
   12: ['Clear'],
   13: ['Enter'],
   16: ['Shift'],
   17: ['Control'],
   18: ['Alt'],
   19: ['Pause'],
   20: ['CapsLock'],
   21: ['IMEHangul'],
   23: ['IMEJunja'],
   24: ['IMEFinal'],
   25: ['IMEKanji'],
   27: ['Escape'],
   28: ['IMEConvert'],
   29: ['IMENonconvert'],
   30: ['IMEAccept'],
   31: ['IMEModechange'],
   32: ['Space'],
   33: ['PageUp'],
   34: ['PageDown'],
   35: ['End'],
   36: ['Home'],
   37: ['Left'],
   38: ['Up'],
   39: ['Right'],
   40: ['Down'],
   41: ['Select'],
   42: ['Print'],
   43: ['Execute'],
   44: ['Snapshot'],
   45: ['Insert'],
   46: ['Delete'],
   47: ['Help'],
   48: '0)',
   49: '1!',
   50: '2@',
   51: '3#',
   52: '4$',
   53: '5%',
   54: '6^',
   55: '7&',
   56: '8*',
   57: '9(',
   65: 'aA',
   66: 'bB',
   67: 'cC',
   68: 'dD',
   69: 'eE',
   70: 'fF',
   71: 'gG',
   72: 'hH',
   73: 'iI',
   74: 'jJ',
   75: 'kK',
   76: 'lL',
   77: 'mM',
   78: 'nN',
   79: 'oO',
   80: 'pP',
   81: 'qQ',
   82: 'rR',
   83: 'sS',
   84: 'tT',
   85: 'uU',
   86: 'vV',
   87: 'wW',
   88: 'xX',
   89: 'yY',
   90: 'zZ',
   91: ['MetaLeft'],
   92: ['MetaRight'],
   93: ['Menu'],
   95: ['Sleep'],
   96: ['Num0', 'NumInsert'],
   97: ['Num1', 'NumEnd'],
   98: ['Num2', 'NumDown'],
   99: ['Num3', 'NumPageDown'],
  100: ['Num4', 'NumLeft'],
  101: ['Num5', 'NumClear'],
  102: ['Num6', 'NumRight'],
  103: ['Num7', 'NumHome'],
  104: ['Num8', 'NumUp'],
  105: ['Num9', 'NumPageUp'],
  106: ['Num*', 'Num*'],
  107: ['Num+', 'Num+'],
  108: ['NumEnter', 'NumEnter'],
  109: ['Num-', 'Num-'],
  110: ['Num.', 'NumDelete'],
  111: ['Num/', 'Num/'],
  112: ['F1'],
  113: ['F2'],
  114: ['F3'],
  115: ['F4'],
  116: ['F5'],
  117: ['F6'],
  118: ['F7'],
  119: ['F8'],
  120: ['F9'],
  121: ['F10'],
  122: ['F11'],
  123: ['F12'],
  124: ['F13'],
  125: ['F14'],
  126: ['F15'],
  127: ['F16'],
  128: ['F17'],
  129: ['F18'],
  130: ['F19'],
  131: ['F20'],
  132: ['F21'],
  133: ['F22'],
  134: ['F23'],
  135: ['F24'],
  144: ['NumLock'],
  145: ['ScrollLock'],
  160: ['ShiftLeft'],
  161: ['ShiftRight'],
  162: ['ControlLeft'],
  163: ['ControlRight'],
  164: ['AltLeft'],
  165: ['AltRight'],
  166: ['BrowserBack'],
  167: ['BrowserForward'],
  168: ['BrowserRefresh'],
  169: ['BrowserStop'],
  170: ['BrowserSearch'],
  171: ['BrowserFavorites'],
  172: ['BrowserHome'],
  173: ['VolumeMute'],
  174: ['VolumeDown'],
  175: ['VolumeUp'],
  176: ['NextTrack'],
  177: ['PrevTrack'],
  178: ['Stop'],
  179: ['PlayPause'],
  180: ['LaunchMail'],
  181: ['LaunchMediaSelect'],
  182: ['LaunchApp1'],
  183: ['LaunchApp2'],
  186: ';:',
  187: '=+',
  188: ',<',
  189: '-_',
  190: '.>',
  191: '/?',
  192: '`~',
  219: '[{',
  220: '\\|',
  221: ']}',
  222: '\'"',
  223: ['Meta'],
  226: ['AltGr'],
  229: ['IMEProcess'],
  231: ['0x00'],
  246: ['Attention'],
  247: ['Crsel'],
  248: ['Exsel'],
  249: ['EraseEOF'],
  250: ['Play'],
  251: ['Zoom'],
  252: ['NoName'],
  254: ['Clear'],
};

var shiftNumpad = {
  12: 101,
  13: 108,
  33: 105,
  34: 99,
  35: 97,
  36: 103,
  37: 100,
  38: 104,
  39: 102,
  40: 98,
  45: 96,
}

function whatKey(evt){
  var key = keys[evt.keyCode];
  evt.shift = evt.shiftKey;
  if (key) {
    if (evt.shiftKey) {
      if (evt.keyLocation === 3) {
        var mapped = shiftNumpad[evt.keyCode];
        if (mapped) {
          return keys[mapped][1];
        }
      }
      return key[1] || key[0];
    } else {
      if (evt.keyLocation === 3) {
        var mapped = shiftNumpad[evt.keyCode];
        if (mapped) {
          evt.shift = evt.keyCode !== 13;
          return keys[mapped][0];
        }
      }
      return key[0];
    }
  } else if (evt.keyIdentifier) {
    return evt.keyIdentifier;
  } else {
    return String.fromCharCode(evt.keyCode);
  }
}

function Keyboard(view){
  var self = this;
  this.keys = {};
  this.view = view;
  this.ctrl = false;
  this.shift = false;
  this.alt = false;
  this.meta = false;

  var down = Object.create(null);

  view.addEventListener('keydown', function(e){
    self.update(e);
    e.name = whatKey(e);
    if (down[e.name]) {
      e.action = 'repeat';
      self.emit(e);
    } else {
      e.action = 'activate';
      down[e.name] = true;
      self.lastKey = e.name;
      self.emit(e);
    }
  }, true);
  view.addEventListener('keyup', function(e){
    self.update(e);
    e.action = 'release';
    self.lastKey = e.name = whatKey(e);
    self.emit(e);
    down[e.name] = null;
  }, true);
  view.addEventListener('keypress', function(e){
    self.update(e);
    e.action = 'press';
    self.lastKey = e.name = String.fromCharCode(e.keyCode);
    self.emit(e);
  }, true);
}

Keyboard.LOCATION = {
  STANDARD : 0,
  LEFT     : 1,
  RIGHT    : 2,
  NUMPAD   : 3,
  MOBILE   : 4,
  JOYSTICK : 5
};

Keyboard.prototype = {
  constructor: Keyboard,
  update: function update(evt){
    this.lastEvent = evt;
    this.ctrl = evt.ctrlKey;
    this.shift = evt.shift;
    this.alt = evt.altKey;
    this.meta = evt.metaKey;
    this.altgr = evt.altGraphKey;
  },
  emit: function emit(evt){
    var listeners = this.keys['*'];
    if (listeners) {
      for (var i=0; i < listeners.length; i++) {
        listeners[i](evt);
      }
    }

    listeners = this.keys[this.lastKey];
    if (listeners) {
      for (var i=0; i < listeners.length; i++) {
        listeners[i](evt);
      }
    }
  },
  on: function on(bind, listener){
    var self = this,
        current = 0,
        events = [],
        keys = bind.split('->');

    if (bind === '*') {

      var listeners = this.keys['*'] || (this.keys['*'] = []);
      listeners.push(function(evt){
        listener.call(self, evt);
      });

    } else if (keys.length > 1) {

      keys.forEach(function(key, index){
        var listeners = self.keys[key] || (self.keys[key] = []);
        listeners.push(function(evt){
          if (evt.action === 'activate' && events.length === index) {
            events.push(evt);
            if (index === keys.length - 1) {
              listener.apply(self, events);
              events.length = 0;
            }
          } else {
            events.length = 0;
          }
        });
      });

    } else if ((keys = bind.split('+')).length > 1) {

      keys.forEach(function(key, index){
        var listeners = self.keys[key] || (self.keys[key] = []);
        listeners.push(function(evt){
          if (evt.action === 'activate') {
            current++;
            events[index] = evt;
            if (events.length === keys.length) {
              listener.apply(self, events);
              events.length = 0;
            }
          } else if (evt.action === 'release') {
            current--;
            events[index] = null;
          }
        });
      });

    } else {
      var listeners = self.keys[bind] || (self.keys[bind] = []);
      listeners.push(function(evt){
        listener.call(self, evt);
      });
    }
  }
};

window.Keyboard = Keyboard;
window.keyboard = new Keyboard(window);
}();
