export default function stateCombineDeepProp(combinations) {
	return function(prop, state, action) {
		let combination = combinations[prop];
		let module = combination.module;

		state[prop] = module(state[prop], action);

		return state;
	};
};