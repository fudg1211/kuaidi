(function () {

	var getCompanyByEnName = function (name) {
		var md = [
			//快递id 快递名称 排序 是否选中 是否最后使用
			['a01','shunfeng','顺丰速递',0,false,false],
			['a02','yuantong','圆通快递',0,false,false],
			['a03','shentong','申通快递',0,false,false],
			['a04','ems','EMS特快专递',0,false,false],
			['a05','huitongkuaidi','汇通快递',0,false,false],
			['a06','zhongtong','中通快递',0,false,false],
			['a07','yunda','韵达快递',0,false,false],
			['a08','tiantian','天天快递',0,false,false],
			['a08','quanfengkuaidi','全峰快递',0,false,false],
			['a09','quanyikuaidi','全一快递',0,false,false],
			['a10','rufengda','如风达',0,false,false],
			['a11','emsguoji','EMS国际',0,false,false],
			['a12','zhaijisong','宅急送',0,false,false],
			['a13','debangwuliu','德邦物流',0,false,false],

			['b01','fedex','FedEx',0,false,false],
			['b02','usps','USPS',0,false,false],
			['b03','ups','UPS',0,false,false],
			['b04','dhl_us','DHL(美国)',0,false,false],
			['b05','dhl_de','DHL(德国)',0,false,false],
			['b06','TNT','TNT',0,false,false]
		], result;
		for (var i = 0; i < md.length; i++) {
			if (md[i][1] === name) {
				result = md[i];
				break
			}
		}

		return result;
	};

	var searchQuery = function (type, id) {
		var url = 'http://www.kuaidi100.com/query?type=' + type + '&postid=' + id.toString();
		$.ajax({
			type: 'get',
			url: url,
			success: function (result) {
				if (result) {
					searchBack(result,id);
				}
			}
		})
	};

	var Data = {
		getAll: function () {
			var localData = localStorage.getItem('localData');

			if (localData) {
				localData = JSON.parse(localData);

				var sortData = function (a, b) {
					return a['createTime'] - b['createTime'];
				};

				var sortDataA = function (b, a) {
					return (parseInt(a['data']['ischeck']) - parseInt(b['data']['ischeck']));
				};

				localData.sort(sortData);

				localData.sort(sortDataA);
				return localData;
			} else {
				return false;
			}
		},

		getById: function (id) {
			var localData = this.getAll();
			for (var i = 0; i < localData.length; i++) {
				if (localData[i]['id'] === id) {
					return localData[i];
				}
			}

			return false;
		},

		add: function (result) {
			if (!this.getById(result['id'])) {
				var localData = this.getAll();

				if (!localData || !localData.length) {
					localData = [];
				}
				localData.push(result);

				this.save(localData);
			}

			return localData;
		},

		delById: function (id) {
			var localData = this.getAll();
			for (var i = 0; i < localData.length; i++) {
				if (localData[i]['id'] === id) {
					localData.splice(i, 1);
					this.save(localData);
					return true;
				}
			}
		},

		checkByIdAndCom: function (id, companyName) {
			var localData = this.getAll();
			for (var i = 0; i < localData.length; i++) {
				if (localData[i]['id'] === id && localData[i]['data']['com'] === companyName) {
					return true;
				}
			}
		},

		updateById: function (id, result) {
			var localData = this.getAll();
			for (var i = 0; i < localData.length; i++) {
				if (localData[i]['id'] === id) {
					localData[i] = result;
					this.save(localData);
					return true;
				}
			}
		},

		save: function (result) {
			var str = JSON.stringify(result);
			localStorage.setItem('localData', str);
		}
	};


	window.getData = function () {
		var localData = Data.getAll(), a;

		for (i = 0; i < localData.length; i++) {
			a = localData[i]['data'];
//			if (parseInt(a['ischeck']) || (localData[i]['time'] + 15 * 60 * 1000) > new Date().getTime()) {
//				continue;
//			}
			searchQuery(a['com'], a['nu']);
		}
	};

	var searchBack = function (result, nu) {
		var isAdd = false;


		var tempA = Data.getById(nu);


		result = JSON.parse(result);

		if (result['status'] !== '200') {
			return false;
		}

		if(tempA.data.data.length===result.data.length){
			return false
		}


		result['comDetail'] = getCompanyByEnName(result['com']);

		webkitNotifications.createNotification("images/icons/icon-128-notice.png",result['comDetail'][2]+' '+nu.toString(),result.data[result.data.length-1]['context']).show();


		var time = new Date().getTime();

		Data.updateById(result['nu'], {id: result['nu'], data: result, time: time, createTime: tempA['createTime']});

		return true;
	};



}());