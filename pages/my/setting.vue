<template>
	<view class="setting">
		<view class="setting-item" @tap="goToService">
			<view class="item-left">常见问题</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="setting-item" @tap="goToLaw">
			<view class="item-left">法律条款与隐私政策</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
	<!-- 	<view class="setting-item" @tap="goToLogOut">
			<view class="item-left">账号注销<text>（注销后无法恢复，请谨慎操作）</text></view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view> -->
		<!-- <view class="setting-item" @tap="clearStorage"> -->
		<view class="setting-item" @tap="clearCache">
			<view class="item-left">清除缓存</view>
			<view class="item-left-box">
				<view class="clearhuancun">{{fileSizeString}}</view>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
			
			
		</view>
		<view class="setting-item" @tap="goToRichText(27)">
			<view class="item-left">关于</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="setting-item" @click="goToComplaint">
			<view class="item-left">意见反馈</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="setting-item" @tap="quitLogin">
			<view class="item-left">退出登录</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				fileSizeString: ''
			}
		},
		onLoad() {
			this.formatSize()
		},
		methods: {
			//到法律
			goToLaw () {
				uni.navigateTo({
					url: '../law/law'
				})
			},
			//到注销
			goToLogOut () {
				uni.navigateTo({
					url: '../logout/logout'
				})
			},
			goToComplaint () {
				uni.navigateTo({
					url: '../complaint/complaint'
				})
			},
			//清除缓存
			clearStorage () {
				uni.showModal({
				    title: '清理缓存',
				    content: '您确定清理缓存么？',
				    success: function (res) {
				        if (res.confirm) {
				          uni.removeStorageSync('sendAddress')
				          uni.removeStorageSync('endAddress')
				          uni.removeStorageSync('shopInfo')
				          uni.removeStorageSync('discount')
				          uni.removeStorageSync('takeTimer')
						   uni.showToast({
						   	icon:'success',
							title: '清理缓存成功'
						   })
						   setTimeout(() => {
							   uni.switchTab({
									url:'../index/index'
							   })
						   },1000)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			formatSize() {  
				let that = this;  
				plus.cache.calculate(function(size) {  
					let sizeCache = parseInt(size);  
					if (sizeCache == 0) {  
						that.fileSizeString = "0B";  
					} else if (sizeCache < 1024) {  
						that.fileSizeString = sizeCache + "B";  
					} else if (sizeCache < 1048576) {  
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
					} else if (sizeCache < 1073741824) {  
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
					} else {  
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
					}  
					console.log(that.fileSizeString)
				});  
			},
			
			clearCache() {  
				let that = this;  
				let os = plus.os.name;  
				if (os == 'Android') {  
					let main = plus.android.runtimeMainActivity();  
					let sdRoot = main.getCacheDir();  
					let files = plus.android.invoke(sdRoot, "listFiles");  
					let len = files.length;  
					for (let i = 0; i < len; i++) {  
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
							if (entry.isDirectory) {  
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({  
										title: '缓存清理完成',  
										duration: 2000  
									});  
									that.formatSize(); // 重新计算缓存  
								}, function(e) {  
									console.log(e.message)  
								});  
							} else {  
								entry.remove();  
							}  
						}, function(e) {  
							console.log('文件路径读取失败')  
						});  
					}  
				} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
					plus.cache.clear(function() {  
						uni.showToast({  
							title: '缓存清理完成',  
							duration: 2000  
						});  
						that.formatSize();  
					});  
				}  
			},
			
			
			
			
			goToService () {
				uni.navigateTo({
					url: '../service/service'
				})
			},
			
			goToRichText (id) {
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			},
			quitLogin(){
				uni.showModal({
				    title: '退出登录',
				    content: '您确定要退出么？',
				    success: function (res) {
				        if (res.confirm) {
				           uni.clearStorageSync()
						   uni.showToast({
						   	icon:'success',
							title: '退出成功'
						   })
						   setTimeout(() => {
							   uni.switchTab({
									url:'../index/index'
							   })
						   },1000)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	.setting{
		width: 100%;
		height: 100%;
		background-color: rgb(247,247,250);
		.setting-item{
			width: 750rpx;
			height: 100rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			&:last-child{
				border-bottom: none;
			}
			.item-left{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
				text{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,-2147483648,0.30);
					letter-spacing: -0.34px;
					line-height: 20px;
				}
			}
			image{
				width: 16rpx;
				height: 26rpx;
			}
			.item-left-box{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.clearhuancun{
					font-size: 14px;
					padding-right: 10rpx;
				}
			}
		}
	}
</style>
