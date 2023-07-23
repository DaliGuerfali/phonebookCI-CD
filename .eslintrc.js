module.exports = {
	'env': {
		'node': true,
		'browser': true,
		'es2021': true,
		'cypress/globals': true
	},
	'extends': ['eslint:recommended', 'plugin:react/recommended'],
	'plugins': ['import', 'react', 'cypress'],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			 2
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
    	'object-curly-spacing': [
        	'error', 'always'
    	],
    	'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    	],
		'no-console': 0,
		'react/prop-types': 0
	},
	'overrides': [
		{
			'files': ['client/**/*.js'],
			'parserOptions': {
				'sourceType': 'module'
			}
		}, 
		{
			'files': ['backend/**/*.js'],
			'parserOptions': {
				'sourceType': 'script'
			},
			'rules': {
				"import/no-commonjs": "off",
			}
		}
	]
};
