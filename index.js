function checkChange(nextProp, prevProp, fnNext, fnPrev) {
	const hasChanged = prevProp !== nextProp
	const nextProp$ = fnNext && fnNext(nextProp) || nextProp;
	const prevProp$ = fnPrev && fnPrev(prevProp) || prevProp;
	
	const nextState = hasChanged ? nextProp$ : prevProp$;

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

	Object.keys(combinations$).forEach((name) => initialState$[name] = combinations$[name].module() );

	return initialState$;
};

// #2
export function stateCombine(combinations) {
	return function(prop, state, action) {
		const { module } = getCombinations(combinations)[prop] || {};
		const nextProp$ = module(state[prop], action);
		const prevProp$ = state[prop];
		const fnNext = (nextProp) => { ...state, [prop]: nextProp };
		const fnPrev = (prevProp) => state;

		return module ? checkChange(nextProp$, prevProp$, fnNext, fnPrev) : state;
	};
};

// #3
export function runCombine(combinations, combine) {
	return function(state, action) {
		let prevProp = state;

		Object.keys(getCombinations(combinations)).forEach((name) => state = combine(name, state, action) );

		return checkChange(state, prevProp);
	};
};