/**
 * Created with IntelliJ IDEA.
 * User: fudongguang
 * Date: 13-1-17
 * Time: 下午3:46
 * 通用函数.
 */
define(function () {
	return {
		getGuoneiCompany:function(){
			return [
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
			]
		},

		search:function(type,id,callback){
			var url ='http://www.kuaidi100.com/query?type='+type+'&postid='+id.toString();
			com.ajax({
				type:'get',
				url:url,
				success:function(result){
					if(result && callback){
						callback(result);
					}
				}
			})
		}
	};

});
