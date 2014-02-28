var initData = {
	dir:'/js/'
};

requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js',
	paths:{
		'common':initData.dir+'app/global/common',
		'configs':initData.dir+'app/global/configs',
		'storage':initData.dir+'app/global/storage',
		'hack':initData.dir+'app/global/hack',
		'regular':initData.dir+'app/global/regular'
	},
	shim: {
		'common': {
			deps: ['./lib/Fish', './lib/ejs_production', './lib/json2', './lib/dialog']
		}
	}, urlArgs: 'v=' + (new Date()).getTime()
});

// Start the main app logic.
requirejs(
	['./app/index' ],
	function () {
		//jQuery, canvas and the app/sub module are all
		//loaded and can be used here now.
	}
);
