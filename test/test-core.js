/**
 * test-core.js
 *
 * @description   mocha + chai test suite for WAAX Core 1.0.0-alpha
 * @author        hoch (hongchan.choi@gmail.com)
 * @version       1.0.0
 */


// caching
var expect = chai.expect,
    should = chai.should();


/**
 * Info and Log
 */

describe('System: Info and Log', function() {

  describe('Info.getVersion()', function () {
    it('should return API version number.', function () {
      expect(WX.Info.getVersion()).to.equal('1.0.0-alpha');
    });
  });
  describe('Log.info(arg)', function () {
    it('should print info message in the console.', function (done) {
      WX.Log.info('this is', 'info', 'message.');
      done();
    });
  });
  describe('Log.warn(arg)', function () {
    it('should print warning message in the console.', function (done) {
      WX.Log.warn('this is', 'warning', 'message.');
      done();
    });
  });
  describe('Log.error(arg)', function () {
    it('should print message and throw error.', function () {
      expect(function () {
        WX.Log.error('this is', 'error', 'message.');
      }).to.throw(Error);
    });
  });

});


/**
 * Util
 *
 * isObject, isArray, isNumber, hasParam, extend, clone,
 * clamp, random2f, random2, mtof, ftom, powtodb, dbtopow, rmstodb, dbtorms,
 * patch(TBD)
 */

describe('System: Utilities', function() {

  // Object utilities
  describe('isObject(arg)', function () {
    it('should return true when input is JS object.', function () {
      expect(WX.isObject({})).to.equal(true);
      expect(WX.isObject([])).to.equal(true);
      expect(WX.isObject('Hey')).to.equal(false);
      expect(WX.isObject(1.0)).to.equal(false);
    });
  });
  describe('isArray(arg)', function () {
    it('should return true when input is Array.', function () {
      expect(WX.isArray([])).to.equal(true);
      expect(WX.isArray({})).to.equal(false);
      expect(WX.isArray(1.0)).to.equal(false);
    });
  });
  describe('isNumber(arg)', function () {
    it('should return true when input is Number.', function () {
      expect(WX.isNumber(1.0)).to.equal(true);
      expect(WX.isNumber('Number')).to.equal(false);
      expect(WX.isNumber({})).to.equal(false);
    });
  });
  describe('isBoolean(arg)', function () {
    it('should return true when input is Boolean.', function () {
      expect(WX.isBoolean(true)).to.equal(true);
      expect(WX.isBoolean(false)).to.equal(true);
      expect(WX.isBoolean(1)).to.equal(false);
    });
  });
  describe('hasParam(plugin, param)', function () {
    it('should return true when plugin has the parameter.', function () {
      var plugin = { params: { 'parameter': 0.0 } };
      expect(WX.hasParam(plugin, 'parameter')).to.equal(true);
      expect(WX.hasParam(plugin, 'notParameter')).to.equal(false);
    });
  });
  describe('extend(target, source)', function () {
    it('should add source to target object and return the extended target.', function () {
      var source = { a: 1, b: 2 },
          target = { b: 3, c: 4 },
          result = { a: 1, b: 2, c: 4 };
      expect(WX.extend(target, source)).deep.equal(result);
    });
  });
  describe('clone(source)', function () {
    it('should return a cloned object.', function () {
      var source = { a: 1, b: 2 },
          result = { a: 1, b: 2 };
      expect(WX.clone(source)).deep.equal(result);
    });
  });

  // Music Math utilities
  describe('clamp(value, min, max)', function () {
    it('should clamp value into between min and max.', function () {
      expect(WX.clamp(1.5, 0.0, 1.0)).to.equal(1.0);
      expect(WX.clamp(-0.5, 0.0, 1.0)).to.equal(0.0);
    });
  });
  describe('random2f(min, max)', function () {
    it('should generate a floating point random value between min and max.', function () {
      var rnd = WX.random2f(0.0, 10.0);
      expect(rnd).to.be.within(0.0, 10.0);
      expect(parseInt(rnd, 10) === rnd).to.equal(false);
    });
  });
  describe('random2(min, max)', function () {
    it('should generate an integer random value between min and max.', function () {
      var rnd = WX.random2(0, 10);
      expect(rnd).to.be.within(0, 10);
      expect(parseInt(rnd, 10) === rnd).to.equal(true);
    });
  });
  describe('mtof(midi)', function () {
    it('should return frequency from MIDI pitch.', function () {
      expect(WX.mtof(69)).to.equal(440.0);
      expect(WX.mtof(-1500)).to.equal(0);
      expect(WX.mtof(1500)).to.equal(3.282417553401589e+38);
    });
  });
  describe('ftom(freq)', function () {
    it('should return MIDI pitch from frequency.', function () {
      expect(WX.ftom(440)).to.equal(69);
      expect(WX.ftom(-1)).to.equal(-1500);
      expect(WX.ftom(22050)).to.equal(136);
    });
  });
  describe('powtodb(pow)', function () {
    it('should return decibel from signal power.', function () {
      expect(WX.powtodb(1.0)).to.equal(100.0);
      expect(WX.powtodb(10.0)).to.equal(110.0);
    });
  });
  describe('dbtopow(db)', function () {
    it('should return power from decibel.', function () {
      expect(WX.dbtopow(0.0)).to.equal(0.0);
      expect(WX.dbtopow(100.0)).to.equal(1.0);
    });
  });
  describe('rmstodb(rms)', function () {
    it('should return decibel from RMS.', function () {
      expect(WX.rmstodb(0.0)).to.equal(0.0);
      expect(WX.rmstodb(100.0)).to.equal(140.0);
    });
  });
  describe('dbtorms(db)', function () {
    it('should return RMS from decibel.', function () {
      expect(WX.dbtorms(0.0)).to.equal(0.0);
      expect(WX.dbtorms(100.0)).to.equal(1.0);
    });
  });
  describe('veltoamp(vel)', function () {
    it('should return linear amp from velocity.', function () {
      expect(WX.veltoamp(0)).to.equal(0);
      expect(WX.veltoamp(63)).to.equal(0.49606299212598426);
      expect(WX.veltoamp(64)).to.equal(0.5039370078740157);
      expect(WX.veltoamp(127)).to.equal(1.0);
    });
  });

  // describe('patch(args)', function () {
  //   it('TBD: should patch plugin units in arguments.', function () {
  //     // TBD
  //   });
  // });

});


/**
 * Core
 */

describe('System: Core', function() {

  describe('context', function () {
    it('should be AudioContext.', function () {
      expect(WX.context.constructor.name).to.equal('AudioContext');
    });
  });
  // TODO: there might be inconsistent between now and currentTime. be advise.
  describe('now (getter)', function () {
    it('should return current time in audio context.', function () {
      expect(WX.now).to.be.above(0.0);
      expect(WX.now).to.equal(WX.context.currentTime);
    });
  });
  describe('srate (getter)', function () {
    it('should return current sample rate of audio context.', function () {
      expect(WX.srate).to.be.above(22050);
      expect(WX.srate).to.equal(WX.context.sampleRate);
    });
  });
  describe('Gain()', function () {
    it('should return a gain node.', function () {
      expect(WX.Gain().constructor.name).to.equal('GainNode');
    });
  });
  describe('OSC()', function () {
    it('should return an oscillator node.', function () {
      expect(WX.OSC().constructor.name).to.equal('OscillatorNode');
    });
  });
  describe('Delay()', function () {
    it('should return a delay node.', function () {
      expect(WX.Delay().constructor.name).to.equal('DelayNode');
    });
  });
  describe('Filter()', function () {
    it('should return a biquad filter node.', function () {
      expect(WX.Filter().constructor.name).to.equal('BiquadFilterNode');
    });
  });
  describe('Comp()', function () {
    it('should return a compressor node.', function () {
      expect(WX.Comp().constructor.name).to.equal('DynamicsCompressorNode');
    });
  });
  describe('Convolver()', function () {
    it('should return a convolver node.', function () {
      expect(WX.Convolver().constructor.name).to.equal('ConvolverNode');
    });
  });
  describe('WaveShaper()', function () {
    it('should return a waveshaper node.', function () {
      expect(WX.WaveShaper().constructor.name).to.equal('WaveShaperNode');
    });
  });
  describe('Source()', function () {
    it('should return a audio buffer source node.', function () {
      expect(WX.Source().constructor.name).to.equal('AudioBufferSourceNode');
    });
  });
  describe('Analyzer()', function () {
    it('should return an analyzer node.', function () {
      expect(WX.Analyzer().constructor.name).to.equal('AnalyserNode');
    });
  });
  describe('Panner()', function () {
    it('should return a panner node.', function () {
      expect(WX.Panner().constructor.name).to.equal('PannerNode');
    });
  });
  describe('Splitter()', function () {
    it('should return a channel splitter node.', function () {
      expect(WX.Splitter().constructor.name).to.equal('ChannelSplitterNode');
      expect(WX.Splitter(1, 2).constructor.name).to.equal('ChannelSplitterNode');
      expect(WX.Splitter(1, 6).constructor.name).to.equal('ChannelSplitterNode');
    });
  });
  describe('Merger()', function () {
    it('should return a channel merger node.', function () {
      expect(WX.Merger().constructor.name).to.equal('ChannelMergerNode');
      expect(WX.Merger(2, 1).constructor.name).to.equal('ChannelMergerNode');
      expect(WX.Merger(6, 1).constructor.name).to.equal('ChannelMergerNode');
    });
  });
  describe('Buffer()', function () {
    it('should return a buffer source.', function () {
      expect(WX.Buffer(2, 1.0, 44100).constructor.name).to.equal('AudioBuffer');
      expect(WX.Buffer(1, 2.0, 48000).constructor.name).to.equal('AudioBuffer');
    });
  });
  describe('Envelope(arg)', function () {
    it('should return an envelope generator.', function () {
      var env = WX.Envelope([0.0, 0.0], [0.8, 0.01, 1], [0.0, 0.3, 2]);
      var t = WX.now;
      expect(env(1.0, 0.5)).deep.equal([
        [0.0, 1.0, 0], [0.4, 1.01, 1], [0.0, 1.3, 2]
      ]);
    });
  });
  describe('defineParams(plugin, paramDefs)', function () {
    it('should define parameter instances in a plugin.', function () {
      var flag = false;
      var plugin = {
        params: {},
        $testParam: function () {
          flag = true;
        }
      };
      WX.defineParams(plugin, {
        'testParam': {
          type: 'Generic', unit: '',
          default: 0.01, min: 0.0, max: 1.0
        }
      });
      expect(plugin.params.testParam.get()).to.equal(0.01);
      plugin.params.testParam.set(0.5, 0, 0);
      expect(flag).to.equal(true);
      expect(plugin.params.testParam.get()).to.equal(0.5);
    });
  });
  describe('loadClip', function () {
    it('should return a audio buffer after xhr loading success.', function (done) {
      var clip = { name: 'ziggy', url: '../sound/hochkit/fx-001.wav' };
      var progress = false, complete = false;
      WX.loadClip(clip,
        function (event) {
          progress = true;
          expect(event.loaded).to.be.within(0, event.totalSize);
        },
        function (buffer) {
          complete = true;
          expect(progress).to.equal(true);
          expect(complete).to.equal(true);
          expect(buffer.constructor.name).to.equal('AudioBuffer');
          expect(clip.buffer.constructor.name).to.equal('AudioBuffer');
          done();
      });
    });
  });

});


/**
 * Plug-in utilities
 * - defineType
 * - initPreset
 * - extendPrototype
 * - register
 */

describe('Plug-in Utilities', function () {

  // dummy setup for testing
  function MyGenerator(preset) {
    WX.Plugin.defineType(this, 'Generator');
    WX.defineParams(this, {
      p1: { type: 'Boolean', default: false },
      p2: { type: 'Boolean', default: true }
    });
    WX.Plugin.initPreset(this, preset);
  }
  MyGenerator.prototype = {
    info: { api_version: '1.0.0-alpha' },
    defaultPreset: { p1: false, p2: true },
    $p1: function (value, time, xtype) {
      return value ? 'pass' : 'fail';
    },
    $p2: function (value, time, xtype) {
      return value ? 'pass' : 'fail';
    }
  };
  WX.Plugin.extendPrototype(MyGenerator, 'Generator');

  function MyProcessor() {
    WX.Plugin.defineType(this, 'Processor');
  }
  MyProcessor.prototype = {};
  WX.Plugin.extendPrototype(MyProcessor, 'Processor');

  function MyAnalyzer() {
    WX.Plugin.defineType(this, 'Analyzer');
  }
  MyAnalyzer.prototype = {};
  WX.Plugin.extendPrototype(MyAnalyzer, 'Analyzer');

  var gen = new MyGenerator({ p1: true, p2: false });
  var pro = new MyProcessor();
  var ana = new MyAnalyzer();

  describe('defineType(plugin, type)', function () {
    it('should import required components to plugin based on type specifier.',
      function () {
        expect(gen).to.contain.keys('params', '_output', '_outlet');
        expect(pro).to.contain.keys('params', '_inlet', '_bypass');
        expect(ana).to.contain.keys('params', '_inlet', '_input');
      }
    );
  });

  describe('extendPrototype(plugin, type)', function () {
    it('should extend prototype with core plugin methods.',
      function () {
        // generator
        expect(gen).to.respondTo('get');
        expect(gen).to.respondTo('set');
        expect(gen).to.respondTo('getPreset');
        expect(gen).to.respondTo('setPreset');
        expect(gen).to.respondTo('$output');
        expect(gen).to.respondTo('cut');
        expect(gen).to.respondTo('to');
        expect(gen.$p1(true)).to.equal('pass');
        expect(gen.$p2(false)).to.equal('fail');
        // processor
        expect(pro).to.respondTo('get');
        expect(pro).to.respondTo('set');
        expect(pro).to.respondTo('getPreset');
        expect(pro).to.respondTo('setPreset');
        expect(pro).to.respondTo('$bypass');
        expect(pro).to.respondTo('$input');
        expect(pro).to.respondTo('$output');
        expect(pro).to.respondTo('cut');
        expect(pro).to.respondTo('to');
        // analyzer
        expect(ana).to.respondTo('get');
        expect(ana).to.respondTo('set');
        expect(ana).to.respondTo('getPreset');
        expect(ana).to.respondTo('setPreset');
        expect(ana).to.respondTo('$input');
        expect(ana).to.respondTo('cut');
        expect(ana).to.respondTo('to');
      }
    );
  });

  describe('initPreset(plugin, preset)', function () {
    it('should initialize plugin preset from arguments and default preset.',
      function () {
        expect(gen.get('p1')).to.equal(true);
        expect(gen.get('p2')).to.equal(false);
      }
    );
  });

  describe('register(pluginConstructor)', function () {
    it('should register plugin class under namespace WX.',
      function () {
        WX.Plugin.register(MyGenerator);
        var myGen = WX.MyGenerator();
        expect(myGen).to.respondTo('get');
        expect(myGen).to.respondTo('set');
        expect(myGen).to.respondTo('getPreset');
        expect(myGen).to.respondTo('setPreset');
        expect(myGen).to.respondTo('$output');
        expect(myGen).to.respondTo('cut');
        expect(myGen).to.respondTo('to');
        expect(myGen.$p1(true)).to.equal('pass');
        expect(myGen.$p2(false)).to.equal('fail');
      }
    );
  });

});


/**
 * MUI methods??
 * - MouseResponder
 * - KeyResponder
 * - $
 */


/**
 * Plug-in: Fader
 */

describe('Plug-in: Fader', function () {
  it('should set parameters correctly. (BEEP)', function (done) {
    // test patch: osc is needed to run the AudioParam automation
    var osc = WX.OSC();
    var fader = WX.Fader({ bypass: true });
    osc.start();
    osc.to(fader._inlet);
    fader.to(WX.Master);
    fader.set('input', 0.25);
    fader.set('dB', -6.0);
    // test preset values
    var preset = fader.getPreset();
    expect(fader._inlet.constructor.name).to.equal('GainNode');
    expect(fader._outlet.constructor.name).to.equal('GainNode');
    expect(preset.bypass).to.equal(true);
    expect(preset.mute).to.equal(false);
    expect(preset.input).to.equal(0.25);
    expect(preset.dB).to.equal(-6.0);
    expect(fader.info.name).to.equal('Fader');
    // checking actual AudioParam under the hood
    // wow this is totally weird... 1ms??
    setTimeout(function () {
      expect(fader._output.gain.value).to.equal(0.5011872053146362);
      osc.stop();
      done();
    }, 100);
  });
});


