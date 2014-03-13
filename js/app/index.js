/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['./global/common', './global/data', './localData'], function (com, data, local) {
	var Index = FishMVC.View.extend({
		init: function () {
			this.autoRefreshData();
		},

		elements: {
			'#addIco': 'addIco',
			'#setIco': 'setIco_rel',
			'.selecteCompanys': 'selecteCompanys_rel',
			'.companysSelected': 'companysSelected_rel',
			'#saveSetCompanys': 'saveSetCompanys_rel',
			'.company': 'company_rel',
			'#companySelected': 'companySelected_rel',
			'#search': 'search_rel',
			'#addInput': 'addInput_rel',
			'.orderInfo': 'orderInfo_rel',
			'.showOrderDetail': 'showOrderDetail_rel',
			'.delNu': 'delNu_rel',
			'.orderDescDetailContainer': 'orderDescDetailContainer_rel',
			'#orderContainer': 'orderContainer_rel',
			'.refreshNu': 'refreshNu_rel'
		},

		events: {
			'click addIco': 'addNu',
			'click setIco_rel': 'setCompany',
			'click selecteCompanys_rel': 'selecteCompanys',
			'click saveSetCompanys_rel': 'saveSetCompanys',
			'click company_rel': 'selectCompany',
			'click search_rel': 'search',
			'click orderInfo_rel': 'showOrderInfo',
			'click delNu_rel': 'delNu',
			'click orderDescDetailContainer_rel': 'orderDescDetailContainer',
			'click refreshNu_rel': 'refreshNu'
		},

		autoRefreshData: function () {
			var localData = local.getAll();

			for (var i = 0; i < localData.length; i++) {
				this.searchBack(localData[i]['data'],localData[i]['data']['nu'], 1);
			}

			var a, self = this;

			setTimeout(function () {
				for (i = 0; i < localData.length; i++) {
					a = localData[i]['data'];
					if (parseInt(a['ischeck']) || (localData[i]['time'] + 15 * 60 * 1000) > new Date().getTime()) {
						continue;
					}
					self.searchQuery(a['com'], a['nu'], 1);
				}
			}, 100)

		},

		addNu: function () {
			var md = com.clon(data.getGuoneiCompany());
			var localData = com.storage.local.get('localCompanys');
			var result = [];
			var lastNuAndCompany = JSON.parse(com.storage.local.get('lastNuAndCompany')) || ['', false];


			if (localData) {
				localData = JSON.parse(localData);

				for (var i = 0; i < localData.length; i++) {
					for (var kk = 0; kk < md.length; kk++) {
						if (md[kk][0] === localData[i]) {
							result.push(md[kk]);
							break;
						}
					}
				}
			}

			for (i = 0; i < result.length; i++) {
				if (result[i][1] === lastNuAndCompany[1]) {
					result[i][5] = 'companySelected';
				}
			}


			var config = {
				url: 'tpl/addNu',
				className: 'addNu',
				funs: [function () {

				}],
				data: result,
				last: lastNuAndCompany
			};


			this._addNuPannel = com.dialog(config);

		},

		getCompanyById: function (id) {
			var md = data.getGuoneiCompany(), result;
			for (var i = 0; i < md.length; i++) {
				if (md[i][0] === id) {
					result = md[i];
					break
				}
			}

			if (result) {
				result = com.clon(result);
			}

			return result;
		},


		getCompanyByEnName: function (name) {
			var md = data.getGuoneiCompany(), result;
			for (var i = 0; i < md.length; i++) {
				if (md[i][1] === name) {
					result = md[i];
					break
				}
			}

			if (result) {
				result = com.clon(result);
			}

			return result;
		},

		setCompany: function (obj) {
			$(obj).removeClass('setIco_tip');

			var md = com.clon(data.getGuoneiCompany());
			var localData = com.storage.local.get('localCompanys');

			if (localData) {
				localData = JSON.parse(localData);
			}


			if (localData) {
				for (var i = 0; i < localData.length; i++) {
					for (var kk = 0; kk < md.length; kk++) {
						if (md[kk][0] === localData[i]) {
							md[kk][4] = true;
							break;
						}
					}
				}
			}


			var config = {
				url: 'tpl/setNu',
				className: 'addNu',
				funs: [function () {

				}],
				data: md
			};

			this._setCompanyPannel = com.dialog(config);
		},

		selecteCompanys: function (obj) {
			obj = $(obj);
			if (obj.hasClass('companysSelected')) {
				obj.removeClass('companysSelected');
			} else {
				obj.addClass('companysSelected');
			}
		},

		saveSetCompanys: function () {
			this['companysSelected_rel']();
			var result = [];
			this['companysSelected'].each(function () {
				var companyId = $(this).attr('id');
				result.push(companyId);
			});

			if (!result.length) {
				com.alert({msg: '最少选择一个公司'});
				return false;
			}

			com.storage.local.set('localCompanys', JSON.stringify(result));

			this._setCompanyPannel.remove();
			this._setCompanyPannel = null;

			this._addNuPannel.remove();
			this._addNuPannel = null;

			this.addNu();
		},

		selectCompany: function (obj) {
			obj = $(obj);
			$('.companySelected').removeClass('companySelected').removeAttr('id', 'companySelected');
			obj.addClass('companySelected').attr('id', 'companySelected');
		},

		search: function () {
			var obj = this['companySelected_rel'](),
				objA = this['addInput_rel'](),
				companyId = obj.attr('companyId'),
				self = this,
				companyName,
				nu = objA.val();


			if (!nu) {
				objA.attr('placeholder', '请输入运单号').focus();
				return false;
			}

			if (!companyId) {
				com.alert({msg: '请选择快递公司'});
				return false;
			}

			var company = this.getCompanyById(companyId);

			if (company && company.length) {
				companyName = company[1];
			}

			if (local.checkByIdAndCom(nu, companyName)) {
				com.alert({msg: '已经有该运单'});
				return;
			}

			this.searchQuery(companyName, nu);

			com.storage.local.set('lastNuAndCompany', JSON.stringify([nu, companyName]));
		},

		searchQuery: function (companyName, nu, isAuto) {
			var self = this;
			com.testSpeed('a1');
			data.search(companyName, nu, function (result) {
				if (!result['nu']) {
					result['nu'] = nu;
				}

				if (self.searchBack(result,nu,0,isAuto) && self._addNuPannel) {
					self._addNuPannel.remove();
				}
			});
		},

		testModule:function(error){

			var result={};
			result['status']='201';
			result['message']='查找不到数据';

			if(error===500){
				result = {"status":"500","message":"服务器错误"};
			}

			return result;
		},


		searchBack: function (result,nu, isLocal, isAuto) {
			var isAdd=false;


			var tempA = local.getById(nu),
				renderArray;

			if(!tempA){
				isAdd=true;
			}


			if(isAdd && result['status'] !== '200' && !isAuto && !isLocal){
					com.alert({msg: result['message'], className: 'searchBackDialog'});
					return false;
			}


			result['comDetail'] = this.getCompanyByEnName(result['com']);

			if(isLocal){

				var b = parseInt((new Date().getTime() - parseInt(tempA['time'])) / 60000);
				if (b < 1) {
					result['timeStr'] = '刚刚更新';
				} else {
					result['timeStr'] = '' + b.toString() + '分钟前';
				}

				renderArray = result;
			}else{

				if(result['status']!=='200'){
					result={"message": "ok", "nu": nu, "ischeck": "0", "com": tempA['data']['com'], "status": "200", "condition": "F00", "data": tempA['data']['data'], "state": "3"};
					result['comDetail'] = this.getCompanyByEnName(tempA['data']['com']);

					//{"message":"ok","nu":"7472853546","ischeck":"1","com":"yuantong","updatetime":"2014-03-12 13:46:54","status":"200","condition":"F00","data":[{"time":"2014-03-10 12:56:27","context":"浙江省杭州市文三路公司 已签收 操作员：周春泷","ftime":"2014-03-10 12:56:27"},{"time":"2014-03-10 08:25:52","context":"浙江省杭州市文三路公司 派件中 操作员：朱苡仙","ftime":"2014-03-10 08:25:52"},{"time":"2014-03-10 06:45:55","context":"浙江省杭州市文三路公司 已收入 操作员：凌进","ftime":"2014-03-10 06:45:55"},{"time":"2014-03-10 01:52:54","context":"杭州转运中心公司 已发出 操作员：候卫兵","ftime":"2014-03-10 01:52:54"},{"time":"2014-03-10 00:55:14","context":"杭州转运中心公司 已收入 操作员：侯亚锋","ftime":"2014-03-10 00:55:14"},{"time":"2014-03-10 00:47:54","context":"杭州转运中心公司 已收入 操作员：张耀天","ftime":"2014-03-10 00:47:54"},{"time":"2014-03-09 02:22:42","context":"深圳转运中心公司 已发出 操作员：杨学健","ftime":"2014-03-09 02:22:42"},{"time":"2014-03-09 00:06:57","context":"深圳转运中心公司 已打包 操作员：范丽雪","ftime":"2014-03-09 00:06:57"},{"time":"2014-03-08 23:41:27","context":"深圳转运中心公司 已收入 操作员：张再勇","ftime":"2014-03-08 23:41:27"},{"time":"2014-03-08 21:12:11","context":"广东省深圳市宝安区龙华公司 已收件 操作员：梅瑜","ftime":"2014-03-08 21:12:11"}],"state":"3","comDetail":["a02","yuantong","圆通快递",0,false,false],"timeStr":"2698分钟前"}"
				}

				result['timeStr'] = '刚刚更新';
				renderArray = result;
			}

			var html = com.getRender('tpl/nuList', renderArray),
				idEL = $('#nu_' + result['nu'].toString() + '_' + result['com']);

			if (result['nu'] && idEL && idEL.length) {
				idEL.html($(html).children());
			} else {
				this['orderContainer_rel']().prepend(html);
			}


			if(!isLocal){
				var time = new Date().getTime();

				if (tempA) {
					local.updateById(result['nu'], {id: result['nu'], data: result, time: time, createTime: tempA['createTime']});
				} else {
					local.add({id: result['nu'], data: result, time: time, createTime: time});
				}
			}

			return true;
		},


		fixError:function(result){
			var a = {"message": "ok", "nu": "7472853546", "ischeck": "1", "com": "yuantong", "updatetime": "2014-03-12 13:46:54", "status": "200", "condition": "F00", "data": [
				{"time": "2014-03-08 21:12:11", "context": "广东省深圳市宝安区龙华公司 已收件 操作员：梅瑜", "ftime": "2014-03-08 21:12:11"}
			], "state": "3", "comDetail": ["a02", "yuantong", "圆通快递", 0, false, false], "timeStr": "2698分钟前"};
		},


		showOrderInfo: function (obj) {

			var self = this;
			setTimeout(function () {
				if (self._delNu || self._orderDescDetailContainer || self._refreshNu) {
					setTimeout(function () {
						self._delNu = false;
						self._refreshNu = false;
						self._orderDescDetailContainer = false;
					}, 100);
					return false;
				}

				obj = $(obj);
				var a = obj.hasClass('showOrderDetail');

				self['showOrderDetail_rel']().removeClass('showOrderDetail');
				if (!a) {
					obj.addClass('showOrderDetail');
				}
			}, 10);
		},

		delNu: function (obj) {
			var self = this;
			this._delNu = true;
			var config = {
				msg: '确定要删除吗？',
				buttons: [
					['确定', 'J-dialogClose'],
					['取消', 'J-dialogClose']
				],
				funs: [function () {
					self.delSubmit(obj);
				}]
			};
			com.dialog(config);

			return false;
		},

		delSubmit: function (obj) {
			obj = $(obj).parent();
			var nu = obj.attr('nu');
			if (local.delById(nu)) {
				obj.remove();
			}
		},

		refreshNu: function (obj) {
			this._refreshNu = true;
			com.testSpeed('1');

			obj = $(obj).parent();
			var nu = obj.attr('nu');

			var localData = local.getById(nu),
				ischeck = localData['data']['ischeck'],
				companyName = localData['data']['com'];

			if (localData['time'] && (parseInt(localData['time']) + 60 * 1000) > new Date().getTime()) {
				return false;
			}

			com.testSpeed('a');

			if (parseInt(ischeck)) {
				return false;
			} else {
				this.searchQuery(companyName, nu);
			}

		},

		orderDescDetailContainer: function () {
			this._orderDescDetailContainer = true;
			return false;
		}


	});

	var index = new Index();


	var M_index = FishMVC.Module.extend();
	var mIndex = new M_index();

	mIndex.on('change:localData', function () {

	})

});
