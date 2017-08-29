(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['redux-combine-deep-props'] = global['redux-combine-deep-props'] || {})));
}(this, (function (exports) { 'use strict';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function checkChange(nextProp, prevProp, fnNext, fnPrev) {
	var hasChanged = prevProp !== nextProp;
	var nextProp$ = fnNext && fnNext(nextProp) || nextProp;
	var prevProp$ = fnPrev && fnPrev(prevProp) || prevProp;

	var nextState = hasChanged ? nextProp$ : prevProp$;

	return nextState;
}

function getCombinations(combinations) {
	return combinations || {};
}
//---------

// #1
function getInitialState(combinations, initialState) {
	var initialState$ = initialState;
	var combinations$ = getCombinations(combinations);

	Object.keys(combinations$).forEach(function (name) {
		return initialState$[name] = combinations$[name].module();
	});

	return initialState$;
}

// #2
function stateCombine(combinations) {
	return function (prop, state, action) {
		var _ref = getCombinations(combinations)[prop] || {},
		    module = _ref.module;

		var nextProp$ = module(state[prop], action);
		var prevProp$ = state[prop];
		var fnNext = function fnNext(nextProp) {
			return _extends({}, state, defineProperty({}, prop, nextProp));
		};
		var fnPrev = function fnPrev(prevProp) {
			return state;
		};

		return module ? checkChange(nextProp$, prevProp$, fnNext, fnPrev) : state;
	};
}

// #3
function runCombine(combinations, combine) {
	return function (state, action) {
		var prevProp = state;

		Object.keys(getCombinations(combinations)).forEach(function (name) {
			return state = combine(name, state, action);
		});

		return checkChange(state, prevProp);
	};
}

exports.getInitialState = getInitialState;
exports.stateCombine = stateCombine;
exports.runCombine = runCombine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
