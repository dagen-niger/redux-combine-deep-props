function checkChange(nextProp, prevProp, fnNext, fnPrev) {
	const hasChanged = prevProp !== nextProp
	const nextState = hasChanged ? fnNext && fnNext(nextProp) || nextProp : fnPrev && fnPrev(prevProp) || prevProp;

	return nextState;
};

function getCombinations(combinations) {
	return combinations || {};
};
//---------

// #1
export function getInitialState(combinations, initialState) {
	let initialState$ = initialState;
	let combinations$ = getCombinations(combinations);

	Object.keys(combinations$).forEach(function(name) {
		initialState$[name] = combinations$[name].module();
	})

	return initialState$;
};

// #2
export function stateCombine(combinations) {
	return function(prop, state, action) {
		const { module } = getCombinations(combinations)[prop] || {};

		return module ? checkChange(module(state[prop], action), state[prop], function(nextProp) {
			return {
				...state,
				[prop]: nextProp,
			}
		}, function(prevProp) {
			return state;
		}) : state;
	};
};

// #3
export function runCombine(combinations, combine) {
	return function(state, action) {
		let prevProp = state;

		Object.keys(getCombinations(combinations)).forEach(function(name) {
			state = combine(name, state, action);
		});

		return checkChange(state, prevProp);
	};
};