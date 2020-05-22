<template>
	<view class="history-invioce">
	
		<view class="history-box" v-for="item in historyInfo" :key = "item.id" @tap="goToHistoryDetail(item.type,item)">
			<view class="history-top">
				<view class="top-left">
					<image src="../../static/img/order/time.png" mode="aspectFill"></image>
					<view>{{item.createTime}}</view>
				</view>
				<view class="top-right">
					{{item.status == 0 ? "待发出" : "已完成" }}
					<image src="../../static/img/my/right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="history-middle">
				{{item.type == 0 ? "电子发票" : "纸质发票"}}
			</view>
			<view class="history-bottom">
				<view class="bottom-left">骑手服务</view>
				<view class="bottom-right">¥{{item.totalAmount}}</view>
			</view>
		</view>
		<uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.initHistoryInfo()
		},
		data () {
			return {
				historyInfo: []
			}
		},
		methods: {
			//到开票详情
			goToHistoryDetail (type,info) {
				uni.navigateTo({
					url: 'historyDetail?type='+ type + "&info=" + JSON.stringify(info)  
				})
			},
			//初始化
			async initHistoryInfo () {
				let res = await this.$fetch(this.$api.invoiceInfo,{},"Post","Form")
				
				if (res.code == 0) {
					this.historyInfo = res.rows
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.history-invioce{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		.history-box{
			width: 690rpx;
			padding: 30rpx;
			background: #FFFFFF;
			border-radius: 2px;
			border-radius: 2px;
			margin-top: 30rpx;
			box-sizing: border-box;
			.history-top{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.top-left{
					display: flex;
					image{
						width: 28rpx;
						height: 28rpx;
					}
					view{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #09023E;
						margin-left: 20rpx;
						box-sizing: border-box;
					}
				}
				.top-right{
					display: flex;
					align-items: center;
					justify-content: center;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					image{
						width: 16rpx;
						height: 26rpx;
						margin-left: 20rpx;
						box-sizing: border-box;
						vertical-align: text-bottom;
					}
				}
			}
			.history-middle{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				margin-top: 22rpx;
				margin-bottom: 20rpx;
				box-sizing: border-box;
			}
			.history-bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
			
				.bottom-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					
				}
				.bottom-right{
					font-family: PingFangSC-Semibold;
					font-size: 24px;
					color: #09023E;
					
				}
			}
		}
	}
</style>
