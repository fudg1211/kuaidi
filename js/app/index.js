/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-10-9
 * Time: AM10:48
 * To change this template use File | Settings | File Templates.
 */
define(['common', './global/data'], function (com, data) {
	var Index = FishMVC.View.extend({
		init: function () {

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
			'#addInput':'addInput_rel'
		},

		events: {
			'click addIco': 'addNu',
			'click setIco_rel': 'setCompany',
			'click selecteCompanys_rel': 'selecteCompanys',
			'click saveSetCompanys_rel': 'saveSetCompanys',
			'click company_rel':'selectCompany',
			'click search_rel':'search'
		},

		addNu: function () {
			var md = com.clon(data.getGuoneiCompany());
			var localData = com.storage.local.get('localCompanys');
			var result = [];


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

			var config = {
				url: 'tpl/addNu',
				className: 'addNu',
				funs: [function () {

				}],
				data:result
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

		setCompany: function () {
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
				nu = obj.attr('nu'),
				val = objA.val();


			if(!val){
				objA.attr('placeholder','请输入运单号').focus();
				return false;
			}

			if(!nu){
				com.alert({msg:'请选择快递公司'});
			}

			var nu = this.getCompanyById(nu);

			data.search(nu,val);
		}


	});

	var index = new Index();


	var M_index = FishMVC.Module.extend();
	var mIndex = new M_index();

	mIndex.on('change:localData',function(){

	})

});
