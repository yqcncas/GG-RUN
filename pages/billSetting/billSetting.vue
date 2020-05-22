<template>
	<view class="bill-setting">
		<view class="bs-header" @tap="goToCollect">
			<view class="header-left">我收藏/屏蔽的骑手</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="bs-middle">
			<view class="header-left">收货码/送达码</view>
			<!-- <switch checked = 'false' @change="switch1Change" /> -->
			<switch :checked = "signCodeFlag" @change="changeSignCode" />
		</view>
		<view class="bs-footer">
			<view class="header-left">收藏专送</view>
			<switch :checked = 'collectionFlag' @change="changeCollectionCode" />
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options)
			this.signCodeFlag = Number(options.signCode)
			this.collectionFlag = Number(options.CollectionFlag)
		},
		data () {
			return {
				signCodeFlag: '',
				collectionFlag : ''
			}
		},
		methods: {
			//到我的收藏
			goToCollect () {
				uni.navigateTo({
					url: '../collect/collect'
				})
			},
			//修改签收码
			async changeSignCode () {
				if(this.signCodeFlag) {
					this.signCodeFlag = 0
				} else {
					this.signCodeFlag = 1
				}
				let res = await this.$fetch(this.$api.signCodeFlag,{signForCodeFlag: this.signCodeFlag},"POST",'Form')
			
				if (res.code === 0) {
					uni.showToast({
						icon:'success',
						title:res.msg
					})
				} else {
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			},
			//修改收藏专送
			async changeCollectionCode () {
				if(this.collectionFlag) {
					this.collectionFlag = 0
				} else {
					this.collectionFlag = 1
				}
				let res = await this.$fetch(this.$api.collectionCodeFlag,{specialCollectionFlag: this.collectionFlag},"POST",'Form')
				
				if (res.code === 0) {
					uni.showToast({
						icon:'success',
						title:res.msg
					})
				} else {
					uni.showToast({
						icon:'none',
						title:res.msg
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.bill-setting{
		width: 100%;
		height: 100%;
		.bs-header{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-bottom: 1rpx solid #FBFAF8;
			padding: 0 28rpx 0 30rpx;
			box-sizing: border-box;
			image{
				width: 16rpx;
				height: 26rpx;
			}
		}
		.bs-middle{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-bottom: 1rpx solid #FBFAF8;
			padding: 0 28rpx 0 30rpx;
			box-sizing: border-box;
			/deep/.uni-switch-input{
				margin: 0;
			}
		}
		.bs-footer{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28rpx 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			/deep/.uni-switch-input{
				margin: 0;
			}
		}
		.header-left{
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #09023E;
			letter-spacing: -0.34px;
		}
	}
</style>
