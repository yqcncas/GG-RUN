<template>
	<view class="shop-info">
		<view class="shop-header">
			
			<view class="header-box">
				<textarea class="header-box-textarea" v-model="textareaMain" placeholder="请填写您需要购买的商品" placeholder-style="font-size: 14px;color: rgba(9,2,62,0.30);font-family: PingFangSC-Regular;" />
			</view>
		</view>
		<view class="shop-footer">
			<view class="footer-left">商品价值<text class="footer-left-text">（最高¥500）</text>
				<view class="footer-left-botton">实际价值以购买发票为准，多退少补</view>
			</view>
			
			<view class="middle-right">
				<view class="sub" @tap="priceSub">
					<image src="../../static/img/index/sub.png" mode="aspectFill"></image>
				</view>
				<view class="middle-center">
					<input type="number" class="middle-input" v-model="price" @input="watchInput">
					<view class="middle-kilo">元</view>
				</view>
				<view class="add" @tap="priceAdd">
					<image src="../../static/img/index/add.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="reader-box">
			<view class="circle" :class="{on:currentIndex}" @tap="handleCircle"></view>
			<view class="isReader" @tap="handleCircle">已阅读并同意</view>
			<view class="xieyi" @tap="goToRichText(38)">《帮买服务协议》</view>
		</view>
		<view class="shop-button" @tap="goBack">确定</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				currentIndex: true,
		
				//价值
				price: 1,
				textareaMain: ''
				
			}
		},
		onShow(){
			if (uni.getStorageSync('shopInfo')) {
				let shopInfo = uni.getStorageSync('shopInfo')
				console.log(shopInfo)
				if (shopInfo && shopInfo != undefined) {
					this.textareaMain = shopInfo.main
					this.price = shopInfo.price
				}
			}
		},
		methods: {
			//更改下标
			handleCircle(){
				this.currentIndex = !this.currentIndex
			},
			//价值
			priceSub () {
				this.price = this.price - 1
			},
			priceAdd () {
				this.price = Number(this.price) + 1
				if (this.price > 500) {
					uni.showToast({
						icon: 'none',
						title: '价值最高500元，不能再高啦'
					})
					this.price = 500
				}
			},
			//返回
			goBack () {
				if (this.textareaMain.trim() === '') {
					uni.showToast({
						icon: 'none',
						title: '请填写您需要购买的商品信息'
					})
					return
				}
				if (!this.currentIndex) {
					uni.showToast({
						icon: 'none',
						title: '请仔细阅读帮买服务协议'
					})
					return
				}
				//其他
				let shopInfo = {}
				shopInfo.main = this.textareaMain
				shopInfo.price = this.price
				uni.setStorageSync('shopInfo',shopInfo)
				
				uni.navigateBack({
					delta:1
				})
			},
			watchInput() {
				if(this.price > 500) {
					uni.showToast({
						icon: 'none',
						title: '价值最高500元，不能再高啦'
					});
					this.price = 500
				}
			},
			goToRichText (id) {
				uni.navigateTo({
					url: '../rich-text/rich-text?id=' + id
				})
			}
			
		
		
		},
		watch:{
			weight (value) {
				if (value === 0) {
					uni.showToast({
						icon: 'none',
						title: '重量不能再小啦'
					})
					this.weight = 1
				}
			},
			price (value) {
				if (value === 0) {
					uni.showToast({
						icon: 'none',
						title: '价格不能再低啦'
					})
					this.price = 1
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.shop-info{
		.shop-header{
			width: 100%;
			// height: 440rpx;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			.header-title{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
			}
			.header-box{
				display: flex;
				flex-wrap: wrap;
				height: 100%;
				// width: 100%;
				// height: 220rpx;
				.header-box-textarea{
					font-size: 14px
				}
				.header-item{
			
					width: 210rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 4px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					margin-right: 30rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					&:nth-child(3n){
						margin-right: 0;
						box-sizing: border-box;
					}
					&.on{
						background: #5468FF;
						color: #FFFFFF;
					}
				}
				.header-input{
					width: 450rpx;
					height: 80rpx;
					line-height: 80rpx;
					padding-left: 30rpx;
					margin-top: 30rpx;
					background: #F7F7FA;
					border-radius: 2px;
					border-radius: 2px;
					font-size: 14px;
					box-sizing: border-box;
				}
			}
		}
		.shop-middle{
			width: 100%;
			height: 152rpx;
			background-color: #fff;
			padding: 30rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.middle-left{
				.middle-title{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					font-weight: bold;
				}
				.middle-tip{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					margin-top: 10rpx;
					box-sizing: border-box;
				}
			}
			.middle-right{
				display: flex;
				.sub,.add{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					// transform: scale(0.5);
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
						transform: scale(0.5)
					}
				}
				.sub{
					border-right: none;
					box-sizing: border-box;
				}
				.add{
					transform: scaleX(-1);
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					border-right: none;
					box-sizing: border-box;
				}
				.middle-center{
					width: 160rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 0px;
					box-sizing: border-box;
					.middle-input{
						width: 68rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						box-sizing: border-box;
						
					}
					.middle-kilo{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						box-sizing: border-box;
					}
				}
			}
		}
		.shop-footer{
			width: 100%;
			height: 152rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			.footer-left{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				font-weight: bold;
				text{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #5468ff;
					line-height: 24px;
				}
				.footer-left-botton{
					width: 302rpx ;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: -0.34px;
					padding-bottom: 20rpx;
					box-sizing: border-box;
				}
			}
			.middle-right{
				display: flex;
				.sub,.add{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					// transform: scale(0.5);
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
						transform: scale(0.5);
						box-sizing: border-box;
					}
				}
				.sub{
					border-right: none;
				}
				.add{
					transform: scaleX(-1);
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px 0 0 4px;
					border-radius: 4px 0px 0px 4px;
					border-right: none;
					box-sizing: border-box;
				}
				.middle-center{
					width: 160rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					border: 1px solid rgba(159,158,167,0.30);
					border-radius: 4px;
					border-radius: 0px;
					box-sizing: border-box;
					.middle-input{
						width: 68rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						box-sizing: border-box;
					}
					.middle-kilo{
						width: 68rpx;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						box-sizing: border-box;
					}
				}
			}
		}
		.reader-box{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			padding-left: 30rpx;
			border-top: 1rpx solid #F7F7FA;
			box-sizing: border-box;
	
			.circle{
				width: 32rpx;
				height: 32rpx;
				border: 1rpx solid #ccc;
				box-sizing: border-box;
				margin-right: 20rpx;
				border-radius: 50%;
				box-sizing: border-box;
				&.on{
					background: url(../../static/img/my/choice.png) no-repeat;
					background-size: cover;
					border:none
				}
			}
			.isReader{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,-2147483648,0.30);
				line-height: 20px;
			}
			.xieyi{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #242C00;
				line-height: 20px;
				color: #6678ff;
			}
		}
		.shop-button{
			width: 100%;
			height: 90rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			text-align: center;
			line-height: 90rpx;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			box-sizing: border-box;
		}
	}
</style>
