<template>
	<view class="my">
		<Status/>
		<view class="my-header">
			<view class="my-header-title">我的</view>
			<view class="user" @tap="goToUserInfo">
				<view class="user-box">
					<view class="user-avatar">
						<image :src="myInfoList.avatar ? myInfoList.avatar : '../../static/img/order/avatar.png'" mode="aspectFill"></image>
						
					</view>
					<view class="user-name">{{myInfoList.userName}}</view>
					<view class="user-phone">{{myInfoList.phonenumber}}</view>
					<view class="order-box" v-if="JSON.stringify(myInfoList) != '{}'" >
						<view class="send-left">发单数量</view>
						<view class="send-right">{{myInfoList.oddNumber}}</view>
					</view>
					<view class="order-box" v-if="JSON.stringify(myInfoList) != '{}'">
						<view class="send-left">取消订单</view>
						<view class="send-right">{{myInfoList.cancelledNumber}}</view>
					</view>
				</view>
				
			</view>

		</view>
		<view class="my-bottom">
			<ul class="bottom-ul">
				<li class = "bottom-item" @tap = "goToMyWallet">
					<view class="item-left">
						<image src=../../static/img/my/wallet.png mode="aspectFill"></image>
						<p>我的钱包</p>
					</view>
					<view class="item-right" v-if="myInfoList.amount">
						<p>余额:  {{myInfoList.amount}}</p>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
				<li class = "bottom-item" @tap= 'goToBillSetting'>
					<view class="item-left">
						<image src=../../static/img/my/bill.png mode="aspectFill"></image>
						<p>发单设置</p>
					</view>
					<view class="item-right">
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
				<li class = "bottom-item" @tap = 'goToInvite'>
					<view class="item-left">
						<image src=../../static/img/my/invite.png mode="aspectFill"></image>
						<p>邀请有礼</p>
					</view>
					<view class="item-right">
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
				<li class = "bottom-item" @tap = 'goToSetting'>
					<view class="item-left">
						<image src=../../static/img/my/design.png mode="aspectFill"></image>
						<p>设置中心</p>
					</view>
					<view class="item-right">
					
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
				<li class = "bottom-item" @tap = 'goToChat'>
					<view class="item-left">
						<image src=../../static/img/my/service.png mode="aspectFill"></image>
						<p>在线客服</p>
						<view class="redCircle" v-if="redInfo"></view>
					</view>
					<view class="item-right">
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
				<li class = "bottom-item" @tap = 'goToRichText(RichText[0].id)'>
					<view class="item-left">
						<image src="../../static/img/my/dianpingche.png" mode="aspectFill"></image>
						<p>加入骑手</p>
					</view>
					<view class="item-right">
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</li>
			
			</ul>
		</view>
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
	export default {
		onLoad() {
			this.initRichText()
		},
		data () {
			return{
				myInfoList: {},
				RichText: [],
				redInfo: 0,
				timer: ''
			}
		},
		onShow(){
			this.initMyInfo()
			this.initRedInfo()
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods:{
			//到个人信息设置
			goToUserInfo () {
				uni.navigateTo({
					url: './myInfo'
				})
			},
			//到我的钱包
			goToMyWallet () {
				uni.navigateTo({
					url: '../myWallet/myWallet?amount=' + this.myInfoList.amount
				})
			},
			//到设置中心
			goToSetting () {
				uni.navigateTo({
					url: './setting'
				})
			},
			//到发单设置
			goToBillSetting () {
				uni.navigateTo({
					url: '../billSetting/billSetting?signCode=' + this.myInfoList.signForCodeFlag + "&CollectionFlag=" + this.myInfoList.specialCollectionFlag
				})
			},
			//到邀请有礼
			goToInvite () {
				uni.navigateTo({
					url: '../invite/invite?qrcode=' + this.myInfoList.inviteQrCode + "&avatar=" + this.myInfoList.avatar + "&userName=" + this.myInfoList.userName + '&inviteCode=' + this.myInfoList.inviteCode
				})
			},
			//到客服
			goToChat () {
				uni.navigateTo({
					url: '../chat/chat?avatar=' + this.myInfoList.avatar
				})
			},
			//到高德地图
			goToGaodeMap () {
				uni.navigateTo({
					url:'../gaodeMap/gaodeMap'
				})
			},
			// 红点
			async initRedInfo () {
				if(uni.getStorageSync('redInfoFlag')) {
					this.timer = setInterval(async () => {
						
						let {data: res} = await this.$fetch(this.$api.infoRedDot, {}, 'Post')
						this.redInfo = res.noReadNum
					},5000)
				}
			},
			//初始化信息
			async initMyInfo () {
					let token = uni.getStorageSync('token')
					if (!token) {
						this.myInfoList = {}
					}
					
					let res = await this.$fetch(this.$api.currentUser,{token:token},"GET","form")
					
					if (res.code === 0) {
						this.myInfoList = res.data
						if (this.myInfoList.avatar) {
							var newStr=this.myInfoList.avatar.indexOf("http");
								//不是以http开头
							　　if(newStr==-1){
									this.myInfoList.avatar = baseURL + this.myInfoList.avatar
							　　}
						}
						
	
						this.myInfoList.amount = Number(this.myInfoList.amount).toFixed(2)
						uni.setStorageSync('user_phone', this.myInfoList.phonenumber);
						uni.setStorageSync('user_Name', this.myInfoList.userName);
						uni.setStorageSync('user_amount',this.myInfoList.amount)
						uni.setStorageSync('user_signCode',this.myInfoList.signForCodeFlag)
						// uni.setStorageSync('user_CollectionCode',this.myInfoList.specialCollectionFlag)
						
					} else {
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
			},
			async initRichText () {
				let res = await this.$fetch(this.$api.articleType,{type:7},"Post","Form")
				if (res.code == 0) {
					this.RichText = res.data
				}
			},
			goToRichText (id) {
				// uni.navigateTo({
				// 	url: '../rich-text/rich-text?id=' + id
				// })
				if(plus.os.name == "Android") {
					plus.runtime.openURL('http://qishou.bajiaostar.com/');
				} else {
					plus.runtime.openURL('http://qishou.bajiaostar.com/');
				}
				
			},
			hanldeOpenMap(){
				uni.navigateTo({
					url:'../testMap/testMap'
				})
			}
		}
	}
</script>

<style lang="less" >
	page::after{
		display: none;
	}
	.my{
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background-color: rgba(247,247,250);
		.my-header{
			width: 100%;
			height: 280rpx;
			background: url(../../static/img/my/myheader.png) no-repeat;
			background-size: cover; 
			text-align: center;
			position: relative;
			z-index: 99;
			.my-header-title{
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #FFFFFF;
				text-align: center;
				padding-top: 52rpx;
				padding-bottom: 84rpx;
				box-sizing: border-box;
			}
			.user{
				// background-color: #fff;
				.user-avatar{
					margin: 0 auto;
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					overflow: hidden;
					box-sizing: border-box;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.user-name{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					text-align: center;
					margin-top: 30rpx;
					box-sizing: border-box;
				}
				.user-phone{
					margin-top: 10rpx;
					// margin-bottom: 24rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					text-align: center;
				}
				.order-box{
					display: flex;
					.send-left{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #000000;
						margin-left: 310rpx;
						margin-right: 10rpx;
						box-sizing: border-box;
						
					}
					.send-right{
						font-size: 12px;
						color: rgba(9,2,62,0.30);
					}
				}
			}
		}
		.my-bottom{
			width: 100%;
			height: 100%;
			margin-top: 270rpx;
			background-color: rgba(247,247,250);
			padding-top: 30rpx;
			box-sizing: border-box;
			.bottom-ul{
				width: 100%;
				padding: 0;
				.bottom-item{
					width: 100%;
					height: 80rpx;
					padding: 0 30rpx 0 40rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-content: center;
					background-color: #fff;
					border-bottom: 1rpx solid rgb(247,247,250);
					&:last-child{
						border-bottom: none);
					}
					.item-left{
						display: flex;
						align-items: center;
						position: relative;
						image{
							width: 60rpx;
							height: 60rpx;
							
						}
						p{
							margin-left: 42rpx;
							box-sizing: border-box;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #4A4A4A;
							letter-spacing: 0;
						}
						.redCircle{
							width: 16rpx;							height: 16rpx;							border-radius: 50%;							background-color: red;							position: absolute;
							left: 36rpx;
							transform: translateY(-10rpx);							// right: 11rpx;							// top: 30rpx;
						}
					}
					.item-right{
						display: flex;
						align-items: center;
						p{
							margin-right: 20rpx;
							box-sizing: border-box;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #9B9B9B;
							letter-spacing: 0;
						}
						image{
							width: 16rpx;
							height: 26rpx;
						}
					}
				}
			}
		}
	}
</style>
