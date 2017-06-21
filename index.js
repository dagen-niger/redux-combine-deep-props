import {each, contains} from "lodash";

export default function stateCombine(combinations) {
	return function(prop, state, action) {
		let combination = combinations[prop];
		let module = combination.module;

		state[prop] = module(state[prop], action);

		return state;
	};
};

export default function runCombine(combinations, combine) {
	return function(state, action) {
		each(combinations, function(combination, name) {
			if (contains(combination.actions, action.type)) {
				state = combine(name, state, action);
			};
		});
	};
};