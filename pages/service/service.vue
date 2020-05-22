<template>
	<view class="service">
		<view class="law-item" v-for="(item) in RichText" :key = "item.id" @tap="goToRichText(item.id)">
			<view class="item-left">{{item.articleTitle}}</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
<!-- 		<view class="service-item" @tap="goToRichText(30)">
			<view class="item-header" >费用问题</view>
			<view class="item-text" >跑腿都能提供什么类型的服务？</view>index
			
		</view>
		<view class="service-item">
			<view class="item-header">费用问题</view>
			<view class="item-text" @tap="goToRichText(31)">白跑费问题？</view>
			<view class="item-text" @tap="goToRichText(32)">怎样收费的？</view>
			<view class="item-text" @tap="goToRichText(33)">为什么有时候下单会显示加价？</view>
		</view>
		<view class="service-item" @tap="goToComplaint">
			<view class="item-header">投诉</view>
			<view class="item-text">投诉</view>
		</view>
		<view class="service-item" @tap="goToRichText(34)">
			<view class="item-header">反馈与意见</view>
			<view class="item-text">反馈与意见</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data () {
			return {
				RichText: []
			}
		},
		onLoad() {
			this.initRichText()
		},
		methods: {
			//到投诉
			goToComplaint () {
				uni.navigateTo({
					url: '../complaint/complaint'
				})
			},
			goToRichText (id) {
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			},
			async initRichText () {
				let res = await this.$fetch(this.$api.articleType,{type: 14},"Post","Form")
				console.log(res)
				if (res.code == 0) {
					this.RichText = res.data
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.service{
		.service-item{
			padding: 40rpx 0 30rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F7F7FA;
			background-color: #fff;
			&:last-child{
				border-bottom: none;
			}
			.item-header{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				font-weight: bold;
			}
			.item-text{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
				margin-top: 20rpx;
				box-sizing: border-box;
			}
		}
		.law-item{
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
		}
	}
</style>
