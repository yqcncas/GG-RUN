import { versionAndroid, versionIos } from '@/config'
import baseURL from '@/config'
export default {
	
	// 初始化时
	init (data) {
		//判断ios
		if (plus.os.name === 'iOS') {
						//版本号 后端返回										//数据
			if (parseFloat(data.appVersion) > parseFloat(versionIos)) this.updata(data, 'iOS')
		} else {
			//判断安卓
							//版本号 后端返回										//数据
			if (parseFloat(data.appVersion) > parseFloat(versionAndroid)) this.updata(data, 'android')
		}
	},
	// 更新app 
	updata (info, os) {
		// 提醒用户更新
		let url = os === 'iOS' ? info.iosUrl : info.filePath
		uni.showModal({
			title: '更新提示',
			content: info.remark,
			success: (showResult) => {
				console.log(showResult)
				if (showResult.confirm) {  
					//点击确定 进行更新  ios 不需要拼接地址
					if(os != 'iOS') {
						url = baseURL.slice(0, baseURL.length - 1) + url
					}
					// 页面跳转
					plus.runtime.openURL(url) 
				}
			}
		})
	}
}