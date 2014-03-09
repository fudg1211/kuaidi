/**
 * Created by fudongguang on 14-3-8.
 */
define(['common', './global/data'], function (com, data) {

	/*
	* 保存的数据格式为
	* {"id":"768108919277","data":{"message":"ok","nu":"768108919277","ischeck":"1","com":"zhongtong","updatetime":"2014-03-08 21:32:34","status":"200","condition":"F00","data":[{}]}}
	* */

	return {
		getAll:function(){
			var localData = com.storage.local.get('localData');

			if(localData){
				localData = JSON.parse(localData);

				return localData.reverse();
			}else{
				return false;
			}
		},

		getById:function(id){
			var localData = this.getAll();
			for(var i=0;i<localData.length;i++){
				if(localData[i]['id']===id){
					return localData[i];
				}
			}

			return false;
		},

		add:function(result){
			if(!this.getById(result['id'])){
				var localData = this.getAll();

				if(!localData){
					localData = [];
				}
				localData.push(result);

				this.save(localData);
			}

			return localData;
		},

		delById:function(id){
			var localData = this.getAll();
			for(var i=0;i<localData.length;i++){
				if(localData[i]['id']===id){
					localData.splice(i,1);
					this.save(localData);
					return true;
				}
			}
		},

		checkByIdAndCom:function(id,companyName){
			var localData = this.getAll();
			for(var i=0;i<localData.length;i++){
				if(localData[i]['id']===id && localData[i]['data']['com']===companyName){
					return true;
				}
			}
		},

		updateById:function(id,result){
			var localData = this.getAll();
			for(var i=0;i<localData.length;i++){
				if(localData[i]['id']===id){
					localData[i]=result;
					this.save(localData);
					return true;
				}
			}
		},

		save:function(result){
			var str = JSON.stringify(result);
			com.storage.local.set('localData',str);
		}
	}
});