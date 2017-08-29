
import progress from 'rollup-plugin-progress';
import uglify from 'rollup-plugin-uglify-es';

import path from 'path';
import babel from 'rollup-plugin-babel';

export default {
	entry: 'index.js',
	dest: 'build/' + (process.env.NODE_ENV === 'production'?'redux-combine-deep-props.min.js':'redux-combine-deep-props.js'),
	format: 'umd',
	moduleName: 'redux-combine-deep-props',
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		progress({
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
	]
};