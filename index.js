import each from "lodash-es/each";

export function stateCombine(combinations) {
	return function(prop, state, action) {
		const combination = combinations[prop];
		const { module } = combination;

		const prevProp = state[prop]
		const nextProp = module(state[prop], action)
		const hasChanged = prevProp !== nextProp
		const nextState = hasChanged ? {
			...state,
			[prop]: nextProp,
		} : state;

		return nextState;
	};
};

export function runCombine(combinations, combine) {
	return function(state, action) {
		// TODO: the same problem.
		// We should not mutate state from scope rathen then return from function.
		each(combinations, function(combination, name) {
			if (combination.actions.includes(action.type)) {
				state = combine(name, state, action);
			};
		});
	};
};

export function getInitialState(combinations, initialState) {
	const combineInitial = (memo, [combination, name]) =>
		Object.assign(memo, { [name]: combination.module() });

	return Object.entries(combinations).reduce(combineInitial, initialState)
};
