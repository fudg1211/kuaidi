var initData = {
	dir:'/chrome/kuaidi/js/'
};

requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js',
	urlArgs: 'v=123'
});

// Start the main app logic.
requirejs(
	['./lib/Fish', './lib/ejs_production', './lib/json2', './lib/dialog','./app/index'],
	function () {
		//jQuery, canvas and the app/sub module are all
		//loaded and can be used here now.
	}
);
