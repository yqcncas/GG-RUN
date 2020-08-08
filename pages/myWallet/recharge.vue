<template>
	<view class="recharge">
		<view class="recharge-top">
			<view class="top-header">充值金额</view>
			<view class="top-box">
				<view class="item" v-for="(item,index) in rechargeList" :key = 'index' @tap="addActive(item,index)" :class="{active:currentIndex === index, huodong: item.type == 2}">
					<view class="price" :class="{huodongtext: item.type == 2}">{{item.amount}}</view>
					<view class="selling" :class="{huodongtext: item.type == 2}">{{item.remark}}</view>
					<view class="shuiyin" v-if="item.type == 2">仅限活动</view>
				</view>
			</view>
		</view>
		<view class="recharge-middle">
			<view class="middle-top">其他金额</view>
			<view class="middle-center" @tap="showTip">
				<view>¥</view>
				<input type="number" v-model="elsePrice" :disabled="currentIndex != -1" >
			</view>
		</view>
		
		<view class="recharge-bottom">
			<view class="circle" :class="{isChoice:isChoice}" @tap="isReader"></view>
			<view class="reader" @tap="isReader">已阅读并同意</view>
			<view class="protocol" @tap="goToRichText(20)">《充值协议》</view>
		</view>
		<view class="confirm" @tap="confirm">确定</view>
		
		<uni-popup ref="popup" type="bottom" class="popup" v-if="popupflag == 1">
			<view class="popup-title">您选择要充值的金额</view>
			<view class="popup-center">¥{{currentIndex != -1 ? isChoiceItem.amount : elsePrice}}</view>
			<view class="popup-bottom" @tap="realRecharge">确定充值</view>
		</uni-popup>
		
		<uni-popup ref="popups" type="bottom" class="popups">
			<view class="popups-title">请选择支付方式</view>
			<view class="popups-center">
				<view class="popups-zfb" @tap="circleTap(1)">
					<view class="zfb-circle">
						<view class="circle-active" v-if="circleTapIndex == 1"></view>
					</view>
					<image src="../../static/img/my/Alipaypayment.png" mode="aspectFill"></image>
					<view class="popups-font">支付宝支付（推荐）</view>
				</view>
				<view class="popups-wx" @tap="circleTap(2)">
					<view class="zfb-circle">
						<view class="circle-active" v-if="circleTapIndex == 2"></view>
					</view>
					<image src="../../static/img/my/weixinzhifu.png" mode="aspectFill"></image>
					<view class="popups-font">微信支付</view>
				</view>
			</view>
			<view class="popups-bottom" @tap="rechargeSubmit">确定</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		onLoad() {
			this.initRecharge()
		},
		data () {
			return {
				//圆
				isChoice: false,
				//充值金额信息
				rechargeList:[],
				//是否选中充值金额
				currentIndex: -1,
				//其他金额
				elsePrice:' ',
				//支付宝还是微信
				circleTapIndex: 1,
				popupflag: 0,
				//保存选中的充值信息
				isChoiceItem: {}
			}
		},
		methods: {
			//选中
			isReader () {
				this.isChoice = !this.isChoice
			},
			//选中添加样式
			addActive (item,index) {
				if (this.currentIndex != index) {
					this.currentIndex = index
					this.isChoiceItem = item
				} else {
					this.currentIndex = -1
				}
				
			},
			//确定
			confirm () {
				if (!this.isChoice) {
					uni.showToast({
						icon:'none',
						title: '请认真阅读充值协议'
					})
					return
				} else {
					this.popupflag = 1
					this.$nextTick(function(){
						this.$refs.popup.open()
					})
				}
			},
			//充值
			realRecharge () {
				this.popupflag = 2
				this.$refs.popups.open()
			},
			//小圆点切换
			circleTap (number) {
				this.circleTapIndex = number
				
			},
			change (e) {
				
			},
			
			async initRecharge(){
				let res = await this.$fetch(this.$api.rechargeInfo,{},"POST","FORM")
				console.log(res)
				if(res.code == 0) {
					this.rechargeList = res.rows
				}
			},
			//其他金额提示
			showTip () {
				if (this.currentIndex != -1) {
					uni.showToast({
						icon: 'none',
						title: '您已选择固定充值金额，请取消后在点击'
					})
				}
			
			},
			//充值
			async rechargeSubmit () {
				if (this.currentIndex != -1) {
					let res = await this.$fetch(this.$api.userRecharge,{money:this.isChoiceItem.amount,payType:this.circleTapIndex},"Post","Form")
					console.log(this.isChoiceItem.amount)
					console.log(this.circleTapIndex)
					console.log(res)
					
					if (this.circleTapIndex === 1) {
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: res.msg, //微信、支付宝订单数据
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.showToast({
									icon:'success',
									title: '支付成功'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
						    },
						    fail: function (err) {
						        
						    }
						});
					}
					if (this.circleTapIndex === 2) {
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: res.data, //微信、支付宝订单数据
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.showToast({
									icon:'success',
									title: '支付成功'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
								
						    },
						    fail: function (err) {
						        
						    }
						});
					}
					
					
				} else {
					let res = await this.$fetch(this.$api.userRecharge,{money:this.elsePrice,payType:this.circleTapIndex},"Post","Form")
					console.log(res)
					if (this.circleTapIndex === 1) {
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: res.msg, //微信、支付宝订单数据
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.showToast({
									icon:'success',
									title: '支付成功'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					}
					if (this.circleTapIndex === 2) {
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: res.data, //微信、支付宝订单数据
						    success: function (res) {
						        console.log('success:' + JSON.stringify(res));
								uni.showToast({
									icon:'success',
									title: '支付成功'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					}
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

<style lang="less" scoped>
	.recharge{
		width: 100%;
		height: 100%;
		// padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		.recharge-top{
			width: 100%;
			height: 588rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			.top-header{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				padding: 30rpx 0;
				box-sizing: border-box;
				font-weight: bold;
			}
			.top-box{
				display: flex;
				flex-wrap: wrap;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 210rpx;
					height: 130rpx;
					border: 1px solid rgba(9,2,62,0.30);
					border-radius: 4px;
					border-radius: 4px;
					margin: 0 30rpx 30rpx 0;
					box-sizing: border-box;
					position: relative;
					&.huodong{
						background-color: #ffeae9;
					}
					&.active{
						background: #5468FF;
						.price{
							font-family: PingFangSC-Semibold;
							font-size: 20px;
							color: #FFFFFF !important;
							text-align: center;
						}
						.selling{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FFFFFF !important;
							text-align: center;
						}
						.shuiyin{
							// color: #FFFFFF;
						}
					}
					
					&:nth-child(3n){
						margin-right: 0;
					}
					.price{
						font-family: PingFangSC-Semibold;
						font-size: 20px;
						color: rgba(9,2,62);
						text-align: center;
						&.huodongtext{
							color: #000000;
						}
					}
					.selling{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62);
						text-align: center;
						&.huodongtext{
							color: #000000;
						}
					}
					.shuiyin{
						width: 210rpx;
						height: 130rpx;
						text-align: center;
						line-height: 130rpx;
						font-size: 16px;
						opacity: 0.9;
						font-weight: 600;
						color: #ff8ca4;
						transform: rotate(-32deg);
						position: absolute;
				
					}
				}
			}
		}
		.recharge-middle {
			width: 100%;
			height: 214rpx;
			padding: 30rpx 30rpx 22rpx 30rpx;
			box-sizing: border-box;
			.middle-top{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.middle-center{
				display: flex;
				align-items: center;
				height: 80rpx;
				width: 100%;
				border-bottom: 1rpx solid #F7F7FA;
				view{
					font-family: PingFangSC-Regular;
					font-size: 24px;
					color: #4A4A4A;
					letter-spacing: -0.58px;
					text-align: center;
					margin-right: 20rpx;
					box-sizing: border-box;
				}
				input{
					height: 84rpx;
					font-family: PingFangSC-Semibold;
					font-size: 30px;
					color: #4A4A4A;
					letter-spacing: -0.72px;
					text-align: left;
				}
			}
		}
		.recharge-bottom{
			width: 100%;
			height: 40rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.circle{
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				border: 1rpx solid #ccc;
				
				&.isChoice{
					background: url(../../static/img/my/choice.png) no-repeat;
					background-size: cover;
					border: none;
				}
			}
			.reader{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,-2147483648,0.30);
				line-height: 20px;
				margin-left: 20rpx;
				box-sizing: border-box;
			}
			.protocol{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5569ff;
				line-height: 20px;
			}
		}
		/deep/.uni-popup__wrapper-box{
			width: 100%;
			// height: 392rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			.popup-title{
				padding-top: 60rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				font-weight: bold;
			}
			.popup-center{
				padding: 20rpx 0 60rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Medium;
				font-size: 30px;
				color: #FF8516;
				letter-spacing: -0.72px;
			}
			.popup-bottom{
				width: 690rpx;
				height: 90rpx;
				background: #5468FF;
				border-radius: 4px;
				border-radius: 4px;
				text-align: center;
				line-height: 90rpx;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				margin-bottom: 30rpx;
				box-sizing: border-box;
			}
			.popups-title{
				padding-top: 60rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				font-weight: bold;
			}
			.popups-center{
				width: 100%;
				padding: 0 30rpx;
				margin-top: 60rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				// justify-content: flex-start;
				align-items: flex-start;
				.popups-zfb{
					display: flex;
					width: 100%;
					height: 100rpx;
					.zfb-circle{
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						border: 1px solid #5468FF;
						text-align: center;
						position: relative;
					}
					.circle-active{
						position: absolute;
						left: 50%;
						top:50%;
						transform: translate(-50%,-50%);
						width: 24rpx;
						height: 24rpx;
						line-height: 24rpx;
						border-radius: 50%;
						background: #5468FF;
					}
					image{
						width: 40rpx;
						height: 40rpx;
						margin: 0 20rpx 0 30rpx;
						box-sizing: border-box;
					}
					.popups-font{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #333333;
						letter-spacing: -0.34px;
						text-align: justify;
					}
				}
				.popups-wx{
					display: flex;
					width: 100%;
					height: 100rpx;
					.zfb-circle{
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						border: 1px solid #5468FF;
						position: relative;
					}
					.circle-active{
						position: absolute;
						left: 50%;
						top:50%;
						transform: translate(-50%,-50%);
						width: 24rpx;
						height: 24rpx;
						line-height: 24rpx;
						border-radius: 50%;
						background: #5468FF;
					}
					image{
						width: 40rpx;
						height: 40rpx;
						margin: 0 20rpx 0 30rpx;
						box-sizing: border-box;
					}
					.popups-font{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #333333;
						letter-spacing: -0.34px;
						text-align: justify;
					}
				}
			}
			.popups-bottom{
				width: 690rpx;
				height: 90rpx;
				background: #5468FF;
				border-radius: 4px;
				border-radius: 4px;
				text-align: center;
				line-height: 90rpx;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				margin-bottom: 30rpx;
				box-sizing: border-box;
			}
		}
		.confirm{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #5468FF;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			position: absolute;
			bottom: 0;
		}
	}
</style>
