<template>
	<view class="recharge-discount">
		<view class="recharge-scroll">
			<view class="scroll-item" :class="{on:index === currentIndex}" v-for="(item,index) in scrollList" :key = "index" @tap="handleCurrentIndex(index)">{{item}}</view>
		</view>
		<view class="recharge-box">
			<view class="recharge-item">
				<view class="item-left">
					<view class="item-left-top">充值¥100</view>
					<!-- <view class="item-left-bottom">送运费券¥5X3张</view> -->
					<view class="item-left-center">
						<view class="center-left">送运费券/帮我买(同时使用)</view>
						<view class="center-right">限¥50内使用</view>
					</view>
					<view class="item-left-bottom">送运费券¥5X3张</view>
				</view>
				<view class="item-right">
					<view class="item-right-text">去</view>
					<view class="item-right-text">充</view>
					<view class="item-right-text">值</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				scrollList: ['未使用','已使用','已过期'],
				currentIndex: 0 
			}
		},
		methods: {
			handleCurrentIndex (index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.recharge-discount{
		width: 100%;
		.recharge-scroll{
			display: flex;
			background-color: #fff;
			.scroll-item{
				width: 33.3%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4rpx solid #5468FF;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: 0.5s;
				}
				&.on{
					color: #5468FF;
					font-weight: bold;
					&:after{
						width: 15%;
					}
				}
			}
		}
		.recharge-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.recharge-item{
				width: 690rpx;
				height: 220rpx;
				background: url(../../static/img/index/discount.png) no-repeat;
				background-size: cover;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				box-sizing: border-box;
				.item-left{
					width: 546rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.item-left-top{
						font-family: PingFangSC-Regular;
						font-size: 28px;
						color: #FFFFFF;
						text-align: center;
						text-shadow: 0 2px 4px rgba(62,77,180,0.50);
					}
					.item-left-center{
						display:flex;
						.center-left{
							font-family: PingFangSC-Regular;
							font-size: 11px;
							color: #FFFFFF;
						}
						.center-right{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(255,255,255,0.70);
						}
					}
					.item-left-bottom{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(255,255,255,0.70);
						text-align: center;
					}
				}
				.item-right{
					width: 103rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					// margin-left: 210rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
