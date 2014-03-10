/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['common', './global/data','./localData'], function (com, data, local) {
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
			'.company':'company_rel',
			'#companySelected':'companySelected_rel',
			'#search':'search_rel',
			'#addInput':'addInput_rel',
			'.orderInfo':'orderInfo_rel',
			'.showOrderDetail':'showOrderDetail_rel',
			'.delNu':'delNu_rel',
			'.orderDescDetailContainer':'orderDescDetailContainer_rel',
			'#orderContainer':'orderContainer_rel',
			'.refreshNu':'refreshNu_rel'
		},

		events: {
			'click addIco': 'addNu',
			'click setIco_rel': 'setCompany',
			'click selecteCompanys_rel': 'selecteCompanys',
			'click saveSetCompanys_rel': 'saveSetCompanys',
			'click company_rel':'selectCompany',
			'click search_rel':'search',
			'click orderInfo_rel':'showOrderInfo',
			'click delNu_rel':'delNu',
			'click orderDescDetailContainer_rel':'orderDescDetailContainer',
			'click refreshNu_rel':'refreshNu'
		},

		autoRefreshData:function(){
			var localData = local.getAll();

			for(var i=0;i<localData.length;i++){
				this.searchBack(localData[i]['data']);
			}

			var refreseNuEL = this['refreshNu_rel']();
			for(i=0;i<refreseNuEL.length;i++){
				refreseNuEL.eq(i).trigger('click');
			}
		},

		addNu: function () {
			var md = com.clon(data.getGuoneiCompany());
			var localData = com.storage.local.get('localCompanys');
			var result = [];
			var lastNuAndCompany = JSON.parse(com.storage.local.get('lastNuAndCompany')) || ['',false];


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

			for(i=0;i<result.length;i++){
				if(result[i][1]===lastNuAndCompany[1]){
					result[i][5]='companySelected';
				}
			}



			var config = {
				url: 'tpl/addNu',
				className: 'addNu',
				funs: [function () {

				}],
				data:result,
				last:lastNuAndCompany
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


		getCompanyByEnName:function(name){
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

			this._setCompanyPannel=com.dialog(config);
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
			this._setCompanyPannel=null;

			this._addNuPannel.remove();
			this._addNuPannel=null;

			this.addNu();
		},

		selectCompany:function(obj){
			obj = $(obj);
			$('.companySelected').removeClass('companySelected').removeAttr('id','companySelected');
			obj.addClass('companySelected').attr('id','companySelected');
		},

		search:function(){
			var obj = this['companySelected_rel'](),
				objA = this['addInput_rel'](),
				companyId = obj.attr('companyId'),
				self = this,
				companyName,
				nu = objA.val();


			if(!nu){
				objA.attr('placeholder','请输入运单号').focus();
				return false;
			}

			if(!companyId){
				com.alert({msg:'请选择快递公司'});
			}

			var company = this.getCompanyById(companyId);

			if(company && company.length){
				companyName = company[1];
			}

			if(local.checkByIdAndCom(nu,companyName)){
				com.alert({msg:'已经有该运单'});
				return;
			}

			this.searchQuery(companyName,nu);

			com.storage.local.set('lastNuAndCompany',JSON.stringify([nu,companyName]));
		},

		searchQuery:function(companyName,nu,refreshEL){
			var self = this;
			data.search(companyName,nu,function(result){
				self.searchBack(result,refreshEL);

				if(self._addNuPannel){
					self._addNuPannel.remove();
				}
			});
		},

		searchBack:function(result,refreshEL){

			if(result['status']===403){
				com.alert(result['message']);
				return false;
			}


			if(result['data'] && result['data'].length){

				result['comDetail'] = this.getCompanyByEnName(result['com']);
				var html = com.getRender('tpl/nuList',result);

				if(refreshEL){
					refreshEL.html($(html).children());
				}else{
					this['orderContainer_rel']().append(html);
				}

				var time = new Date().getTime();

				if(local.getById(result['nu'])){
					local.updateById(result['nu'],{id:result['nu'],data:result,time:time});
				}else{
					local.add({id:result['nu'],data:result,time:time,createTime:time});
				}
			}
		},

		showOrderInfo:function(obj){

			var self = this;
			setTimeout(function(){
				if(self._delNu || self._orderDescDetailContainer || self._refreshNu){
					setTimeout(function(){
						self._delNu=false;
						self._refreshNu=false;
						self._orderDescDetailContainer = false;
					},100);
					return false;
				}

				obj = $(obj);
				var a = obj.hasClass('showOrderDetail');

				self['showOrderDetail_rel']().removeClass('showOrderDetail');
				if(!a){
					obj.addClass('showOrderDetail');
				}
			},10);
		},

		delNu:function(obj){
			var self = this;
			this._delNu = true;
			var config={
				msg:'确定要删除吗？',
				buttons: [['确定','J-dialogClose'],['取消','J-dialogClose']],
				funs:[function(){
					self.delSubmit(obj);
				}]
			};
			com.dialog(config);

			return false;
		},

		delSubmit:function(obj){
			obj = $(obj).parent();
			var nu = obj.attr('nu');
			if(local.delById(nu)){
				obj.remove();
			}
		},

		refreshNu:function(obj){
			console.log(obj);
			this._refreshNu = true;

			obj = $(obj).parent();
			var	nu = obj.attr('nu');

			var localData = local.getById(nu),
				ischeck = localData['data']['ischeck'],
				companyName = localData['data']['com'];

			if(parseInt(ischeck)){
				return false;
			}else{
				this.searchQuery(companyName,nu,obj);
			}

		},

		orderDescDetailContainer:function(){
			this._orderDescDetailContainer = true;
			return false;
		}


	});

	var index = new Index();


	var M_index = FishMVC.Module.extend();
	var mIndex = new M_index();

	mIndex.on('change:localData',function(){

	})

});
