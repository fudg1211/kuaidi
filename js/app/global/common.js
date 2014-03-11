/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(['configs', 'storage',  'hack', 'regular'], function (configs, storage, hack,regular) {
	var toString = {}.toString,
		$ = window.$,
		UA = window.navigator.userAgent;


	window.com = common = {

		isFunction: function (it) {
			return toString.call(it) === "[object Function]";
		},

		isString: function (it) {
			return toString.call(it) === "[object String]";
		},

		isNumber:function(it){
			return toString.call(it) === "[object Number]";
		},

		isBoolean:function(it){
			return toString.call(it) === "[object Boolean]";
		},

		isNull:function(it){
			return (it === null);
		},

		isArray: function (it) {
			return toString.call(it) === "[object Array]";
		},

		isObject: function (it) {
			return toString.call(it) === "[object Object]";
		},

		isBaseType:function(it){
			return (!this.isArray(it) && !this.isObject(it));
		},

		isUrl:function(it){
			return (/^http:\/\//i.test(it));
		},

		isgImgUrl:function(it){
			it = it.trim();
			return /\.(jpeg|jpg|gif|png|bmp)(\?.*)*$/i.test(it);
		},

		isJsonP:function(it){
			return /^\w+\([\[\{].*[\}\]]\)$/.test(it);
		},

		isJson:function(it){
			return /^[\{\[].*[\}\]]$/.test(it);
		},

		/**
		 * 获取数据类型 小写
		 * @param it
		 * @returns {*}
		 */
		getType:function(it){
			var type = toString.call(it);
			var m = type.match(/\s(\w+)\]$/i);
			type = m[1].toLowerCase().trim();

			return type;
		},

		/**
		 * 获取对象长度
		 */
		getObjectLength:function(obj){
			var i=0;
			for(k in obj){
				i++;
			}

			return i;
		},

		storage: storage,
		configs: configs,
		regular: regular,


		render: function (source, data, dest) {
			dest = dest ? dest : source + "Dest";
			new EJS({element: source}).update(dest, {md: data});
		},

		getRender: function (url, config) {
			return new EJS({url: url}).render({md: config})
		},

		dialog:function(config){
			if(!config.content){
				var url = config.url || 'tpl/dialog';
				delete config.url;
				config.content = this.getRender(url,config);
			}
			return dialog(config);
		},

		alert:function(config){

			if(!config){
				config={};
			}
			if(!config.content){
				config.url = config.url || 'tpl/alert';
			}

			if(config.className){
				config.className += ' alertDialog';
			}else{
				config.className='alertDialog';
			}



			return this.dialog(config)
		},

		loading: {
			show: function () {
				com.dialog({className:'loading'});
			},
			hide: function () {
				setTimeout(function(){
					$('.loading').remove();
				},300);
			}
		},

		ajax: function (configs) {
			var self = this;

			if (!configs.hideLoading) {
				this.loading.show();
			}


			var a = {
				type: 'POST',
				dataType: 'json',
				url: self.configs.host,
				async:false,
				data: '',
				success: function (result) {
				},
				error: function () {
					self.alert('网络异常');
					initData.onDataError=true;
				},
				complete: function (result) {
					self.loading.hide();
				}
			};


			this.mix(a, configs);

			$.ajax(a);
		},


		/**
		 * 合并对象
		 * @param target
		 * @param source
		 */

		mix: function (target, source) {
			var k;
			for (k in target) {
				if (target.hasOwnProperty(k) && source.hasOwnProperty(k) && source[k]) {
					target[k] = source[k];
				}
			}
		},

		/**
		 * 克隆对象和数组
		 * @param obj
		 * @returns {{}}
		 */
		clon: function (obj) {
			var newObj = {}, self = this;

			if(self.isArray(obj)){
				newObj = [];
			}

			var cloneObject = (function (a, b) {
				if (self.isObject(a)) {
					for (k in a) {
						if (a.hasOwnProperty(k)) {
							if (self.isObject(a[k])) {
								b[k] = {};
								arguments.callee(a[k], b[k]);
							} else if (self.isArray(a[k])) {
								b[k] = [];
								arguments.callee(a[k], b[k]);
							} else {
								b[k] = a[k];
							}
						}
					}
				} else if (self.isArray(a)) {
					for (k in a) {
						if (self.isObject(a[k])) {
							b[k] = {};
							arguments.callee(a[k], b[k]);
						} else if (self.isArray(a[k])) {
							b[k] = [];
							arguments.callee(a[k], b[k]);
						} else {
							b[k] = a[k];
						}
					}
				}
			}(obj, newObj));

			return newObj;
		},




		gather: {},

		queryArray: [],
		query: function (name) {
			if (!name) {
				return false;
			}

			if (this.queryArray.length) {
				return this.queryArray[name];
			} else {
				var href = window.location.href;
				href = href.replace(/#[^&]*$/, '');//去除锚点

				var reg = /\?(.+)/,
					m = href.match(reg);

				if (m && m[1]) {
					var s = m[1].split('&');
					for (a in s) {
						var b = s[a].split('='),
							k = b[0],
							v = b[1];

						this.queryArray[k] = v;
					}

					return this.queryArray[name];

				} else {
					return '';
				}
			}
		}

	};

	return common;
});



