<template>
	<view class="discount">
		<Status/>
		<view class="discount-header">
			<view class="header-left" @tap="goBacktitle">
				<image src="../../static/img/index/left.png" mode="aspectFill"></image>
				<view class="unuser" @tap.stop="unDiscount">不使用券</view>
			</view>
			
			<view class="header-center">优惠券</view>
			<view class="header-right" @tap="goToRichText(26)">使用说明</view>
		</view>
		<view class="discount-scroll">
			<view class="scroll-item" v-for="(item,index) in scrollList" :key = "index" :class="{on:index === currentIndex}" @tap = "handleScroll(index)">{{item}}</view>
		</view>
		<view class="discount-box">
			<view class="discount-item" v-for="(item,index) in disCountList" :key = "index" @tap="goBack(item)" >
				<view class="item-left">
					<view class="left-top">
						<view class="ticket">运费券</view>
						<view class="price">¥{{item.value}}</view>
						<!-- <view class="impose">限余额支付使用</view> -->
					</view>
					<view class="left-bottom">有效期:{{item.startTime +'-'+item.endTime}}</view>
					<image src="../../static/img/index/discount-left.png" mode="aspectFill" class="item-left-jiaobiao"></image>
					<view class="jiaobiao-text">1张</view>
				</view>
				<view class="item-right-box">
					<view class="item-right-item" v-if="currentIndex == 0">去</view>
					<view class="item-right-item" v-if="currentIndex == 1 || currentIndex == 2" >已</view>
					<view class="item-right-item" v-if="currentIndex == 0 || currentIndex == 1">使</view>
					<view class="item-right-item" v-if="currentIndex == 0 || currentIndex == 1">用</view>
					<view class="item-right-item" v-if="currentIndex == 2">过</view>
					<view class="item-right-item" v-if="currentIndex == 2">期</view>
				</view>
			</view>
			
			<view class="discount-item" v-for="(sell,index) in sell" :key = "index"  @tap="goBack(sell)">
				<view class="item-left">
					<view class="left-top">
						<view class="ticket">折扣券</view>
						<view class="left-top-right">
							<view class="tr-top">{{sell.value * 100}}折<text>运费券/帮我买(同时使用)</text></view>
							<view class="tr-center">限¥50内使用</view>
							<view class="tr-bpttom">限余额支付使用</view>
						</view>
					</view>
					<view class="left-bottom">有效期:{{sell.startTime +'-'+sell.endTime}}</view>
					<image src="../../static/img/index/discount-left.png" mode="aspectFill" class="item-left-jiaobiao"></image>
					<view class="jiaobiao-text">1张</view>
				</view>
				<view class="item-right-box">
					<view class="item-right-item" v-if="currentIndex == 0">去</view>
					<view class="item-right-item" v-if="currentIndex == 1 || currentIndex == 2" >已</view>
					<view class="item-right-item" v-if="currentIndex == 0 || currentIndex == 1">使</view>
					<view class="item-right-item" v-if="currentIndex == 0 || currentIndex == 1">用</view>
					<view class="item-right-item" v-if="currentIndex == 2">过</view>
					<view class="item-right-item" v-if="currentIndex == 2">期</view>
				</view>
			</view>
		</view>
		<uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			this.status = options.status
			
			this.payAmount = options.payAmount

			if (this.payAmount === "undefined") {
				this.payAmount = 0
			}
			
			this.initDiscountInfo()
		},
		data () {
			return {
				scrollList: ['未使用','已使用','已过期'],
				currentIndex: 0,
				//优惠券
				disCountList: [],
				//折扣券
				sell: [],
				status:'',
				payAmount: 0
			}
		},
		methods:{
			goBacktitle(){
				uni.navigateBack({
					delta:1
				})
			},
			//返回
			goBack(item) {

				if (this.currentIndex == 1) {
					uni.showToast({
						icon:'none',
						title: '该券已被使用'
					})
					return
				}
				if (this.currentIndex == 2) {
					uni.showToast({
						icon:'none',
						title: '该券已过期'
					})
					return
				}
				if (item.type) {

					if (this.payAmount < 50) {
						uni.showToast({
							icon: 'none',
							title: '订单金额小于50，无法使用该优惠券'
						})
						return
					}
				}
				
				if (item && item != undefined) {
					uni.setStorageSync('discount',item)	
				}
				
				if (this.status === "0") {
					uni.navigateTo({
						url:'../storage/storage?car=' + 0 + '&scrollIndex=' + 0
					})
				} else {
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			handleScroll (index) {
				this.currentIndex = index
				this.initDiscountInfo()
			},
			//优惠券列表信息
			async initDiscountInfo () {

				let res = await this.$fetch(this.$api.disCount,{status:this.currentIndex},"POST","Form")
	
				if (res.code == 0) {
					//优惠券
					let disCountList = []
					//折扣卷
					let sell = []
					res.rows.filter(function(value,index){
						if (value.type === 0) {
							disCountList.push(value)
						}
						if (value.type === 1) {
							sell.push(value)
						}
					})

					this.disCountList = disCountList
					this.sell = sell

				}
				
			},
			goToRichText (id) {
				
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			},
			unDiscount () {
				console.log('discount')
				uni.removeStorageSync('discount')
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.discount{
		padding-bottom: 30rpx;
		box-sizing: border-box;
		.discount-header{
			position: fixed;
			z-index: 999;
			// top:10rpx;
			// left: 0;
			width: 100%;
			height: 64rpx;
			// padding-top: 52rpx;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height); //覆盖样式
			/*  #endif  */
			background-color: #fff;
		
			display: flex;
			align-items: center;
			// border-bottom: 1rpx solid #f7f7fa;
			// box-sizing: border-box;
			.header-left{
				height: 100%;
				display: flex;
				align-items: center;
				// margin-left: 30rpx;
				margin: 0 -60rpx;
				padding: 0 90rpx;
				box-sizing: border-box;
				position: relative;
				// transform: rotate(180deg);
				image{
					width: 24rpx;
					height: 36rpx;
				}
				.unuser{
					width: 160rpx;
					height: 70%;
					
					border-radius: 4px;
					text-align: center;
					background-color: rgb(217, 212, 212);
					position: absolute;
					left: 180rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 14px;
				}
			}
			.header-center{
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #09023E;
				line-height: 32px;
				margin-left: 244rpx;
				box-sizing: border-box;
			}
			.header-right{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				letter-spacing: 0;
				text-align: right;
				margin-left: 178rpx;
				box-sizing: border-box;
			}
		}
		.discount-scroll{
			position: fixed;
			// top:114rpx;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height); //覆盖样式
			/*  #endif  */
			transform: translateY(64rpx);
			z-index: 999;
			display: flex;
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			background-color: #fff; 
			border-top: 1rpx solid #f7f7fa;
			// box-sizing: border-box;
			.scroll-item{
				width: 33.3%;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				text-align: center;
				position: relative;
				&::after{
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
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #5468FF;
					font-weight: bold;
					&::after{
						width: 15%;
					}
				}
			}
		}
		.discount-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 206rpx;
			box-sizing: border-box;
			.discount-item{
				width: 690rpx;
				height: 220rpx;
				background: url(../../static/img/index/discount.png) no-repeat;
				background-size: cover;
				display: flex;
				justify-content: space-between;
				padding-top: 56rpx;
				padding-left: 42rpx;
				padding-right: 34rpx;
				margin-top: 30rpx;
				box-sizing: border-box;
				position: relative;
				.item-left{
					width: 540rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					.left-top{
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;
						box-sizing: border-box;
						.ticket{
							font-family: PingFangSC-Regular;
							font-size: 32px;
							color: #FFFFFF;
							text-shadow: 0 2px 4px rgba(62,77,180,0.50);
						}
						.price{
							font-family: PingFangSC-Regular;
							font-size: 32px;
							color: #FFFFFF;
							margin: 0 20rpx;
							box-sizing: border-box;
						}
						.impose{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(255,255,255,0.70);
						}
						.left-top-right{
							width: 320rpx;
							margin-left: 20rpx;
							box-sizing: border-box;
							.tr-top{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #FFFFFF;
								text{
									font-family: PingFangSC-Regular;
									font-size: 11px;
									color: #FFFFFF;
									line-height: 20px;
								}
							}
							.tr-center,.tr-bpttom{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(255,255,255,0.70);
							}
							
						}
					}
					.left-bottom{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(255,255,255,0.70);
					}
					.item-left-jiaobiao{
						width: 89.2rpx;
						height: 90.8rpx;
						position: absolute;
						left: 0;
						top: 0;
					}
					.jiaobiao-text{
						width: 50.2rpx;
						height: 52.4rpx;
						line-height: 52.4rpx;
						font-family: PingFangSC-Regular;
						transform: rotate(-45deg);
						font-size: 12px;
						text-align: center;
						color: #FFFFFF;
						position: absolute;
						left: 0;
						top: 0;
					}
				}
				.item-right-box{
					display: flex;
					flex-direction: column;
					.item-right-item{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
					}
				}
			}
		}
		
	}
</style>
