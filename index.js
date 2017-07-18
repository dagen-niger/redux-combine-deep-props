import {each} from "lodash-es";

export function stateCombine(combinations) {
	return function(prop, state, action) {
		let combination = combinations[prop];
		let module = combination.module;

		state[prop] = module(state[prop], action);

		return state;
	};
};

export function runCombine(combinations, combine) {
	return function(state, action) {
		each(combinations, function(combination, name) {
			if (combination.actions.includes(action.type)) {
				state = combine(name, state, action);
			};
		});
	};
};

export function getInitialState(combinations, initialState) {
	let initialState$ = initialState;

	each(combinations, function(combination, name) {
		initialState$[name] = combination.module();
	});

	return initialState$;
};