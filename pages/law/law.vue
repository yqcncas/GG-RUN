<template>
	<view class="law">
		<view class="law-item" v-for="(item) in RichText" :key = "item.id" @tap="goToRichText(item.id)">
			<view class="item-left">{{item.articleTitle}}</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
<!-- 		<view class="law-item">
			<view class="item-left">隐私政策</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="law-item">
			<view class="item-left">用户充值协议</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="law-item">
			<view class="item-left">使用须知</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="law-item">
			<view class="item-left">保价金协议</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view> -->
<!-- 		<view class="law-item">
			<view class="item-left">注销协议</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initRichText()
		},
		data () {
			return {
				RichText: []
			}
		},
		methods: {
			async initRichText () {
				let res = await this.$fetch(this.$api.articleType,{type:4},"Post","Form")
				console.log(res)
				if (res.code == 0) {
					this.RichText = res.data
				}
			},
			goToRichText (id) {
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			}
		}
	}
	
</script>

<style lang="less">
	.law{
		width: 100%;
		height: 100%;
		background-color: rgb(247,247,250);
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
