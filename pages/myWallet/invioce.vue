<template>
	<view class="invioce">
		<view class="invioce-item" @tap="goToApplyInvioce">
			<view class="item-left">申请开发票</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="invioce-item" @tap="goToHistoryInvioce">
			<view class="item-left" >历史发票</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
		<view class="invioce-item" @tap="goToRichText(25)">
			<view class="item-left">开票规则</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			//到开发票
			goToApplyInvioce () {
				uni.navigateTo({
					url: '../applyInvioce/applyInvioce'
				})
			},
			//到历史发票
			goToHistoryInvioce () {
				uni.navigateTo({
					url:'../historyInvioce/historyInvioce'
				})
			},
			goToRichText (id) {
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.invioce{
		width: 100%;
		height: 100%;
		background-color: rgb(247,247,250);
		.invioce-item{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-bottom: 1rpx solid #F7F7FA;
			&:last-child{
				border-bottom: none;
			}
			.item-left{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
			}
			image{
				width: 16rpx;
				height: 26rpx;
			}
			
		}
	}
</style>
