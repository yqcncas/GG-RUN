<template>
	<view class="invite">
		
	<!-- 	<view class="invite-header">
			<image src="../../static/img/index/left.png" mode="aspectFill" @tap="goToBack"></image>
			<view>邀请有礼</view>
		</view> -->
		<view class="invite-middle" >
			<view class="invite-middle-left">
				<view class="invite-middle-left-top">
					<text>您已成功推荐:</text>
					<text>{{subNum}}人</text>
				</view>
				<view class="invite-middle-left-bottom">
					<text>推荐返佣收入:</text>
					<text>{{subAmount}}元</text>
				</view>
			</view>
			<view class="invite-middle-right" @tap="goToRichText(RichText[0].id)">
				<view class="invite-rule">邀请规则</view>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
			
		</view>
		<view class="invite-main">
			<view class="main-header">
				<view class="header-left">
					<image :src="avatar" mode="aspectFill"></image>
				</view>
				<view class="header-right">
					<view class="user-name">{{userName}}</view>
					<view class="user-award">好友完成订单，您可获得好友支付金额的提成奖励，奖励计入钱包余额。</view>
				</view>
			</view>
			<image :src="qrcode" mode="aspectFill" style="margin: 0 auto; display: block;" class="qrcode"></image>
		</view>
		<view class="share" @tap="saveImage">保存图片</view>
		<view class="more-share">更多分享方式</view>
		<view class="share-box">
			<view class="box-left" @tap="shareWX">
				<image src="../../static/img/my/shareWx.png" mode="aspectFill"></image>
			</view>
			<view class="box-right" @tap="shareFriends">
				<image src="../../static/img/my/sharefrends.png" mode="aspectFill"></image>
			</view>
		
		</view>
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
	export default {
		onLoad(options) {
			let newQrcode = options.qrcode.slice(1,options.qrcode.length)
			
			this.qrcode = baseURL + newQrcode

			this.avatar = options.avatar
			if (options.avatar === "") {
				this.avatar = '../../static/img/order/avatar.png'
			}
			
			this.userName = options.userName
			this.inviteCode = options.inviteCode
			this.sharUrl = 'http://yonghu.gglaisong.com/?inviteCode='+this.inviteCode
			this.initRichText()
			this.invitedStatics()
		},
		data () {
			return {
				qrcode: '',
				avatar: '',
				userName: '',
				RichText: [],
				inviteCode: '',
				sharUrl:'',
				subNum: 0, // 推荐人数
				subAmount: 0
			}
		},
		methods: {
			goToBack () {
				uni.navigateBack({
					delta:1
				})
			},
			// 获取推荐人数
			async invitedStatics () {
				let res = await this.$fetch(this.$api.invitedStatics, {}, 'POST', 'FORM')
				this.subAmount = res.data.amount
				this.subNum = res.data.subNum
			},
			//分享微信
			shareWX() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.sharUrl,
				    title: "GG来送",
				    summary: "我正在使用GG来送，赶紧跟我一起来体验！",
				    imageUrl: "../../static/96.png",
				    success: function (res) {
				        
						uni.showToast({
							icon:'success',
							title: '分享成功'
						})
				    },
				    fail: function (err) {
				        
						uni.showToast({
							icon:'success',
							title: '取消分享'
						})
				    }
				});
			},
			//分享朋友圈
			shareFriends () {
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: this.sharUrl,
				    title: "GG来送",
				    summary: "我正在使用GG来送，赶紧跟我一起来体验！",
				    imageUrl: "../../static/96.png",
				    success: function (res) {
				        
				    	uni.showToast({
				    		icon:'success',
				    		title: '分享成功'
				    	})
				    },
				    fail: function (err) {
				       
				    	uni.showToast({
				    		icon:'success',
				    		title: '取消分享'
				    	})
				    }
				});
			},
			//保存图片
			saveImage(){
				uni.downloadFile({
				    url: this.qrcode, //仅为示例，并非真实的资源
				    success: (res) => {
				        if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										icon: "success",
										title: "保存成功"
										
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
				  
				        }
				    }
				});
			},
			async initRichText () {
				let res = await this.$fetch(this.$api.articleType,{type:6},"Post","Form")
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
	page::after{
		display: none;
	}
	.invite{
		width: 100%;
		height: 100%;
		background-color: rgb(84, 104, 255);
		.invite-header{
			width: 100%;
			padding: 52rpx 0 26rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			image{
				width: 24rpx;
				height: 36rpx;
				margin-right: 256rpx;
				box-sizing: border-box;
				
			}
			view{
				color: #FFFFFF;
			}
		}
		.invite-middle{
			width: 100%;
			// height: 34rpx;
			// padding: 26rpx 90rpx 30rpx 530rpx;
			padding: 0 92rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.invite-middle-left{
				.invite-middle-left-top,.invite-middle-left-bottom{
					text{
						font-family: PingFangSC-Regular;
						font-size: 16px;
						color: #FFFFFF;
						&:nth-child(2){
							padding-left: 8rpx;
							box-sizing: border-box;
						}
					}
				}
			}
			.invite-middle-right{
				display: flex;
				align-items: center;
				.invite-rule{
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #FFFFFF;
					letter-spacing: -0.29px;
					margin-right: 20rpx;
					box-sizing: border-box;
				}
				image{
					width: 16rpx;
					height: 26rpx;
				}
			}
			
		}
		.invite-main{
			width: 568rpx;
			height: 702rpx;
			background-color: #fff;
			margin: 0 auto;
			margin-top: 30rpx;
			background: #FFFFFF;
			border-radius: 7px;
			border-radius: 7px;
			box-sizing: border-box;
			
			.main-header{
				width: 100%;
				// height: 195rpx;
				display: flex;
				padding: 30rpx 40rpx 29rpx 30rpx;
				border-bottom: 1px dashed rgba(9,2,62,0.30);
				box-sizing: border-box;
				.header-left{
					margin-right: 20rpx;
					box-sizing: border-box;
					image{
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
				}
				.header-right{
					display: flex;
					flex-direction: column;
					.user-name{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #09023E;
						letter-spacing: -0.41px;
						margin-bottom: 10rpx;
						box-sizing: border-box;
					}
					.user-award{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						letter-spacing: -0.29px;
					}
				}
			}
			.qrcode{
				width: 426rpx;
				height: 426rpx;
				padding-top: 30rpx;
				box-sizing: border-box;
			}
		}
		.share{
			width: 568rpx;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			margin: 0 auto;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			letter-spacing: -0.34px;
			background: rgba(255,255,255,0.30);
			border-radius: 4px;
			border-radius: 4px;
			margin-top: 40rpx;
			box-sizing: border-box;
		}
		.more-share{
			margin-top: 34rpx;
			box-sizing: border-box;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #FFFFFF;
			letter-spacing: -0.29px;
		}
		.share-box{
			width: 100%;
			height: 90rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			.box-left{
				width: 90rpx;
				height: 90rpx;
				margin-right: 32rpx;
				box-sizing: border-box;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.box-right{
				width: 90rpx;
				height: 90rpx;
				margin-left: 32rpx;
				box-sizing: border-box;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
