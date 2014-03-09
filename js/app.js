var initData = {
	dir:'/chrome/kuaidi/js/'
};

requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js',
	paths:{
		'common':'app/global/common',
		'configs':'app/global/configs',
		'storage':'app/global/storage',
		'hack':'app/global/hack',
		'regular':'app/global/regular'
	},
	shim: {
		'common': {
			deps: ['./lib/Fish', './lib/ejs_production', './lib/json2', './lib/dialog']
		}
	}, urlArgs: 'v=123'
});

// Start the main app logic.
requirejs(
	['./app/index' ],
	function () {
		//jQuery, canvas and the app/sub module are all
		//loaded and can be used here now.
	}
);
