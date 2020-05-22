<template>
	<view class="order-detail">
		<!-- 普通 -->
		<!-- 	<view class="detail-title" v-if="orderStatus == 0">
			<view class="title-left">待支付订单</view>
			<view class="title-center">剩余时间</view>
			<view class="title-right">04:12:55</view>
		</view> -->
		<!-- 接单 -->
		<view class="detail-title" v-if="orderStatus == 1">
			<view class="title-left">等待骑手接单</view>
			<view class="title-wait">请耐心等待，骑手很快就接到你的订单了！</view>
		</view>
		<!-- 完成 -->
		<view class="detail-title cancelOrder-title" v-if="orderStatus == 6">
			<view class="title-left">已取消订单</view>
		</view>

		<!-- 普通 -->
		<view class="detail-header" v-if="orderStatus == 0 || orderStatus == 1 || orderStatus == 6">
			<view class="avatar">
				<image :src="orderDetailInfo.userAvatar ? orderDetailInfo.userAvatar:'../../static/img/order/avatar.png'" mode="aspectFill"></image>
			</view>
			<view class="header-right">
				<view class="right-top">
					<view class="send-user">寄件人</view>
					<view class="user">{{orderDetailInfo.startAddress.userName}}</view>
					<view class="user-phone">{{orderDetailInfo.startAddress.mobile}}</view>
				</view>
				<view class="right-bottom">
					<view class="send">发单数量</view>
					<view class="send-num">{{orderDetailInfo.userOddNumber}}</view>
					<view class="cancel">取消数量</view>
					<view class="cancel-num">{{orderDetailInfo.userCancelledNumber}}</view>
				</view>
			</view>
		</view>

		<!-- 接单 -->
		<view class="detail-header-already" v-if=" orderStatus == 2 || orderStatus == 3 || orderStatus == 4 || orderStatus == 7">
			<view class="header-already-left">
				<view class="already-left">
					<image :src="orderDetailInfo.riderAvatar?orderDetailInfo.riderAvatar : '../../static/img/order/avatar.png' " mode="aspectFill"></image>
				</view>
				<view class="already-right">
					<view class="already-right-header">
						<view class="user-name">{{orderDetailInfo.riderName}}</view>
						<view class="user-phone">
							{{orderDetailInfo.riderMobile}}
						</view>
					</view>
					
					<view class="user-star-box">
						<view class="star">
							<image src="../../static/img/order/star-active.png" mode="aspectFill" v-for="(startActive,index) in rateActive"
							 :key="index"></image>

							<image src="../../static/img/order/star.png" mode="aspectFill" v-for="(start,i) in rate" :key="i"></image>
						</view>
						<view class="star-num">{{rateActive}}星</view>
						<view class="order-num">{{orderDetailInfo.riderTotalNum}}单</view>
					</view>
				
				</view>
			</view>
			<view class="header-already-right" @tap="callPhone(orderDetailInfo.riderMobile)">
				<image src="../../static/img/order/call-phone.png" mode="aspectFill"></image>
			</view>
		</view>

		<!-- 完成 -->
		<view class="header-complete" v-if="orderStatus == 5">
			<view class="complete-left">
				<view class="complete-left-avatar">
					<image :src="orderDetailInfo.riderAvatar?orderDetailInfo.riderAvatar:'../../static/img/order/avatar.png'" mode="aspectFill"></image>
				</view>
				<view class="complete-left-right">
					<view class="left-right-top">
						<view class="user-name">{{orderDetailInfo.riderName}}</view>
						<view class="user-phone" @tap="callPhone(orderDetailInfo.riderMobile)">{{orderDetailInfo.riderMobile}}</view>
						<image src="../../static/img/order/dianhua.png" mode="aspectFill" @tap="callPhone(orderDetailInfo.riderMobile)"></image>
					</view>
					<view class="left-right-bottom">
						<view class="star-box">
							<image src="../../static/img/order/star-active.png" mode="aspectFill" v-for="(startActive,index) in rateActive"
							 :key="index"></image>

							<image src="../../static/img/order/star.png" mode="aspectFill" v-for="(start,i) in rate" :key="i"></image>
						</view>
						<view class="star-num">{{rateActive}}星</view>
						<view class="order-num">{{orderDetailInfo.riderTotalNum}}单</view>
					</view>
				</view>
			</view>
			<!-- <view class="complete-right">
				<view class="complete-collect on" :class="{on:orderDetailInfo.shieldType === 0}" @tap="handleCollect">{{orderDetailInfo.shieldType === 0 ? '已收藏':"收藏"}}</view>
				<view class="complete-shield" :class="{on:orderDetailInfo.shieldType === 1}" @tap="handleShield">{{orderDetailInfo.shieldType === 1 ?"已屏蔽":"屏蔽"}}</view>
			</view> -->
		</view>

		<view class="detail-already-main" v-if="orderStatus == 2|| orderStatus == 3 || orderStatus == 4 || orderStatus == 5">
			<view class="map">
				<!-- <map style="width: 100%; height: 476rpx;" :latitude="orderDetailInfo.endAddress.latitude.split(',')[1]" 
				:longitude="orderDetailInfo.endAddress.latitude.split(',')[0]" 
				:markers="covers"
				></map> -->
				<orderDetailMap :orderDetailInfo="orderDetailInfo" :covers="covers" v-if = "!showCancelButton" />


				<!-- 完成 -->
				<cover-view class="map-already" v-if="orderStatus == 4 || orderStatus == 5">
					<cover-image src="../../static/img/order/already-complete.png" mode="aspectFill" class="coverImage"></cover-image>
					<cover-view class="coverText">骑手已到达目的地</cover-view>
				</cover-view>
				
				
			</view>
			<!-- <view v-if="orderDetailInfo.signForCodeFlag"> -->
			<view v-if="orderDetailInfo.pickUpCode">
				<view class="already-main-detail" v-if="orderStatus == 2">
					<view class="already-main-item" @tap="copyPickUpCode(orderDetailInfo.pickUpCode)">
						<view class="pickup-left">取货码</view>
						<view class="pickup-right">{{orderDetailInfo.pickUpCode}}</view>
						<image src="../../static/img/order/fuzhi.png" mode="aspectFill"></image>
					</view>
					<view class="already-tip">确认骑手收费后，将取货码给其收货确认收货。</view>
				</view>
			</view>
			
			<!-- <view v-if="orderDetailInfo.signForCodeFlag"> -->
			<view v-if="orderDetailInfo.signForCode">
				<view class="already-main-detail" v-if="orderStatus == 3 || orderStatus == 4">
					<view class="already-main-item" @tap="copyPickUpCode(orderDetailInfo.pickUpCode)">
						<view class="pickup-left">签收码</view>
						<view class="pickup-right">{{orderDetailInfo.signForCode}}</view>
						<image src="../../static/img/order/fuzhi.png" mode="aspectFill"></image>
					</view>
					<view class="already-tip">确认骑手收费后，将取货码给其收货确认收货。</view>
				</view>
			</view>
			
			<view class="already-main-detail nocenter" v-if="orderStatus == 5 ">
				<view class="collectOrUncollectBox">
					<view class="collectOrUncollectBox-item" :class="{on:orderDetailInfo.shieldType === 0}" @tap="handleCollect">{{orderDetailInfo.shieldType === 0 ? '已收藏':"收藏骑手"}}</view>
					<view class="collectOrUncollectBox-item" :class="{on:orderDetailInfo.shieldType === 1}" @tap="handleShield">{{orderDetailInfo.shieldType === 1 ?"已屏蔽":"屏蔽骑手"}}</view>
				</view>
				<p class = "already-main-detail-p">骑手拉黑后您发布的订单<span style = "color: rgba(219, 33, 33, 1);">无法</span>接单</p>
				<p class = "already-main-detail-p">骑手收藏后您发布的订单<span style = "color: rgba(219, 33, 33, 1);">优先</span>接单</p>
				<view class="pickandsignCodeBox">
					<view class="pickandsignCodeBox-left">
						取货码:{{orderDetailInfo.pickUpCode}}
					</view>
					<view class="pickandsignCodeBox-right">
						签收码:{{orderDetailInfo.signForCode}}
					</view>
				</view>
			</view>

		</view>


		<view class="detail-main">
			<view class="main-item">
				<view>订单类型:</view>
				<view style="color: rgba(38, 66, 222, 1);font-weight: bold;">{{buyType[orderDetailInfo.type]}}</view>
				<view v-if="orderStatus == 7" @click="showQuestion(orderDetailInfo.orderProblem.problemDescription)" style="color: #fff;font-weight: bold;font-size: 12px;background-color:rgba(38, 66, 222, 1); padding: 6rpx;box-sizing: border-box;border-radius: 4rpx;">查看原因</view>
			</view>
			<!-- <view class="main-item">
				<view>任务报酬</view>
				<view>¥32.2</view>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view> -->
			<view class="main-item">
				<view>商品价值:</view>
				<view>¥{{orderDetailInfo.goodsInventory.cost}}</view>
			</view>
			<view class="main-item">
				<view>物品重量:</view>
				<view>{{orderDetailInfo.goodsInventory.weight?orderDetailInfo.goodsInventory.weight:1}}kg内</view>
			</view>
			<view class="main-item">
				<view >物品信息:</view>
				<view>{{orderDetailInfo.goodsInventory.goods}}</view>
			</view>
			<view class="main-item" v-if="elseInfo">
				<view>其他属性:</view>
				<view style="color: rgba(38, 66, 222, 1);">{{elseInfo}}</view>
			</view>
			<!-- <view class="main-item">
				<view>适合车型</view>
				<view>小汽车</view>
			</view> -->
			<view class="main-item" @click.stop="goTofreight(0)">
				<view>跑腿服务:</view>
				<view style="color: #ff2525;" v-if="orderDetailInfo.type != 2">{{orderDetailInfo.payAmount? '￥'+ orderDetailInfo.payAmount : 0}}</view>
				<view style="color: #ff2525;" v-else>{{detailPayPrice ? '￥'+ detailPayPrice : 0}}</view>
				<image src="../../static/img/my/right.png" mode=""></image>
			</view>
			<view class="main-item">
				<view>取件时间:</view>
				<view>{{orderDetailInfo.pickUpTime? orderDetailInfo.pickUpTime : "马上取件"}}</view>
			</view>
			<view class="main-item" v-if="orderDetailInfo.estimatedTime">
				<view>预计送达:</view>
				<view>{{orderDetailInfo.estimatedTime? orderDetailInfo.estimatedTime : ""}}</view>
			</view>
			<view class="main-item" v-if="orderDetailInfo.remark">
				<view>用户备注:</view>
				<view style="color: rgba(38, 66, 222, 1);">{{orderDetailInfo.remark}}</view>
			</view>
		</view>
		<view class="detail-order">
			<view class="order-item" @tap="copyOrderNo(orderDetailInfo.orderNo)">
				<view class="order-left">订单编号:</view>
				<view class="order-right">
					<view class="order-right-box">
						<view>{{orderDetailInfo.orderNo}}</view>
						<image src="../../static/img/order/fuzhi.png" mode="aspectFill"></image>
					</view>

					<view class="order-start">{{orderDetailInfo.orderLevel}}星</view>
				</view>
			</view>
			<view class="order-item">
				<view class="order-left">发布时间:</view>
				<view class="order-right">{{orderDetailInfo.createTime}}</view>
			</view>
			<view class="order-item">
				<view class="order-left">订单性质:</view>
				<view class="order-right">{{orderDetailInfo.pickUpType? "预约" : "即时"}}</view>
			</view>
		</view>
		<view class="main-center">
			<view class="center-left">
				<view class="left-top" v-if="orderDetailInfo.type == 2">买</view>
				<view class="left-top" v-else>取</view>
				<view class="left-line">
					<div class="content">
					</div>
				</view>
				<view class="left-bottom" v-if="orderDetailInfo.type == 2">收</view>
				<view class="left-bottom" v-else>达</view>
			</view>
			<view class="center-right">
				<view class="right-top" v-if="!orderDetailInfo.buyAddressType">
					<view class="right-top-header">
						<view class="top-title">{{orderDetailInfo.startAddress.title}}</view>
						<!-- <view class="top-dist">800米</view> -->
					</view>
					<view class="right-top-center">{{orderDetailInfo.startAddress.addressDetail}}</view>
					<view class="right-top-footer" v-show="orderDetailInfo.type !== 2">{{orderDetailInfo.startAddress.userName}} {{orderDetailInfo.startAddress.mobile}}</view>
				</view>
				<view class="right-top top-title-child" v-else>
					就近购买
				</view>
				<view class="right-bottom">
					<view class="right-bottom-header">
						<view class="bottom-title">{{orderDetailInfo.endAddress.title}}</view>
						<!-- <view class="bottom-dist">800米</view> -->
					</view>
					<view class="right-bottom-center">{{orderDetailInfo.endAddress.addressDetail}}</view>
					<view class="right-bottom-footer">{{orderDetailInfo.endAddress.userName}} {{orderDetailInfo.endAddress.mobile}}</view>
				</view>
			</view>
		</view>
		<view class="detail-footer" v-if="orderStatus != 5" :class="{pdleft: orderStatus == 0}">
			<view class="cancel-button" @tap.stop="goToCancelOrder(orderDetailInfo.orderId)" v-if="orderStatus == 0 || orderStatus == 1  || orderStatus == 2  || orderStatus == 3">取消订单</view>
			<view class="pay-now" @tap="nowpayOrder" v-if="orderStatus == 0">立即支付</view>
			<view class="pay-now" @tap="goToEvaluate" v-if="orderStatus == 4">去评价</view>
			<view class="pay-now" v-if="orderStatus == 3" @tap="commitDelivery">确认收货</view>
			<view class="pay-now" v-if="orderStatus == 6" @tap="goToStorage(orderDetailInfo)">重新发单</view>
		</view>
		
		<view class="orderCancelModel" v-if="showCancelButton" @click.stop="closeCancelModel">
					<view class="orderCancelModel-Wrapper">
						<view class="cancelModel-top">
							<view>取消订单</view>
							<image src="../../static/img/order/closeBlack.png" mode="" @click.stop="closeCancelModel(0)"></image>
						</view>
						<view class="cancelModel-center">
							<view class="cancelModel-center-top">
								用户在{{cancelTimer}}分钟内取消订单免责，超过{{cancelPrice}}分钟取消订单有责，需要补偿骑手3元。
							</view>
							<view class="cancelModel-center-bottom">
								确定<span>取消</span>订单?
							</view>
							
						</view>
						<view class="cancelModel-bottom">
							<view class="cancelModel-bottom-left" @click.stop="closeCancelModel">取消</view>
							<view class="cancelModel-bottom-right" @click.stop="newGoToCancelOrder(orderDetailInfo.orderId)">确定</view>
						</view>
					</view>
		</view>
	

		<!-- 支付弹框 -->
		<uni-popup ref="popupPay" type="bottom">
			<view class="popupPay-header">
				<view class="popupPay-header-left">您需支付</view>
				<view class="popupPay-header-right">¥{{orderDetailInfo.payAmount}}</view>
			</view>
			<!-- 	<view class="popupPay-middle">
				<view class="popupPay-middle-left">支付剩余时间</view>
				<view class="popupPay-middle-right">{{minutes}}:{{seconds}}</view>
			</view> -->
			<view class="popupPay-item" v-for="(popPay,index) in payInfo" :key="index" @tap="handleCircle(index)">
				<view class="circle">
					<view class="n-circle" v-show="circleShow === index"></view>
				</view>
				<image :src="popPay.image" mode="aspectFill"></image>
				<view class="pay-way">
					{{popPay.text}}
					<view class="pay-way-sectext" v-if="popPay.sectext">{{popPay.sectext}}</view>
				</view>
			</view>
			<view class="popupPay-button" @tap="payOrder">确认支付</view>
		</uni-popup>

	</view>
</template>


<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import orderDetailMap from '@/components/orderDetailMap.nvue'
	import baseURL from '../../config/index.js'
	export default {
		onLoad(options) {
			this.cancelModelProp()
			console.log(options)
			
			this.orderStatus = options.currentIndex
			this.payPrice = options.payAmount
			console.log(JSON.parse(options.orderDetail))
			let orderDetailInfo = JSON.parse(options.orderDetail)

			orderDetailInfo.startAddress = JSON.parse(orderDetailInfo.startAddress)
			orderDetailInfo.goodsInventory = JSON.parse(orderDetailInfo.goodsInventory)
			orderDetailInfo.endAddress = JSON.parse(orderDetailInfo.endAddress)
			orderDetailInfo.startAddress.addressDetail = orderDetailInfo.startAddress.addressDetail.replace('undefined', '')
			orderDetailInfo.endAddress.addressDetail = orderDetailInfo.endAddress.addressDetail.replace('undefined', '')
			if (orderDetailInfo.riderAvatar) {
				var newStr= orderDetailInfo.riderAvatar.indexOf("http");
					//不是以http开头
				　　if(newStr==-1){
						orderDetailInfo.riderAvatar = baseURL + orderDetailInfo.riderAvatar.slice(1, orderDetailInfo.riderAvatar.length)
				　　}
				// orderDetailInfo.riderAvatar = baseURL + orderDetailInfo.riderAvatar.slice(1, orderDetailInfo.riderAvatar.length)
			}
			
			if (orderDetailInfo.userAvatar) {
				var newsStr= orderDetailInfo.userAvatar.indexOf("http");
					//不是以http开头
				
				　　if(newsStr==-1){
				
						orderDetailInfo.userAvatar = baseURL + orderDetailInfo.userAvatar.slice(1, orderDetailInfo.userAvatar.length)
						
				　　}
				
				// orderDetailInfo.riderAvatar = baseURL + orderDetailInfo.riderAvatar.slice(1, orderDetailInfo.riderAvatar.length)
			}

			this.orderDetailInfo = orderDetailInfo
			console.log(this.orderDetailInfo)
			this.covers[0].latitude = this.orderDetailInfo.endAddress.latitude.split(',')[1]
			this.covers[0].longitude = this.orderDetailInfo.endAddress.latitude.split(',')[0]
			console.log(this.orderDetailInfo.signForCode)
			console.log(this.orderDetailInfo.signForCode == true)
			if (this.orderDetailInfo.signForCode == null) {
				this.orderDetailInfo.signForCode = false
			}
			if (this.orderDetailInfo.pickUpCode == null) {
				this.orderDetailInfo.pickUpCode = false
			}
			// 支付余额
			// this.payInfo[0].sectext = "(" + uni.getStorageSync('user_amount') + ')'
			if (this.orderDetailInfo.type === 2) {
				this.detailPayPrice = Number(this.orderDetailInfo.payAmount - this.orderDetailInfo.goodsPredictAmount).toFixed(2)
			}

			//拼接字符串
			if (this.orderDetailInfo.premium) {
				this.elseInfo += ' ' + "保价金"
			}
			if (this.orderDetailInfo.urgentExpressPriceFlag) {
				this.elseInfo += ' ' + "加急快送"
			}
			if (this.orderDetailInfo.signForCodeFlag) {
				this.elseInfo += ' ' + "签收码"
			}
			if (this.orderDetailInfo.incubatorFlag) {
				this.elseInfo += ' ' + "保温箱"
			}

			if (this.elseInfo) {
				this.elseInfo = this.elseInfo.slice(1, this.elseInfo.length)
			}

			//对订单星级处理
			switch (this.orderDetailInfo.orderLevel) {
				case 1:
					this.orderDetailInfo.orderLevel = "一"
					break;
				case 2:
					this.orderDetailInfo.orderLevel = "二"
					break;
				case 3:
					this.orderDetailInfo.orderLevel = "三"
					break;
				case 4:
					this.orderDetailInfo.orderLevel = "四"
					break;
				case 5:
					this.orderDetailInfo.orderLevel = "五"
					break;
			}
			//星星
			if (this.orderDetailInfo.score) {
				this.rateActive = Math.floor(this.orderDetailInfo.score / 20)
				this.rate = 5 - this.rateActive
			}

			if (this.orderStatus == 2 || this.orderStatus == 3 || this.orderStatus == 4 || this.orderStatus == 5) {
				this.initMapInfo()
			}




		},
		onHide() {
			this.showCancelButton = false
		},
		components: {
			uniPopup,
			orderDetailMap
		},
		data() {
			return {
				//收藏
				collect: false,
				//屏蔽
				shield: false,
				//订单信息
				orderDetailInfo: {},
				//其他属性拼接字符串
				elseInfo: '',
				//订单状态
				orderStatus: '',
				buyType: ["帮我送", "帮我取", "帮我买"],
				//支付图片
				payInfo: [{
					image: '../../static/img/my/yuezhifu.png',
					text: '余额支付',
					sectext: '',
				}, {
					image: '../../static/img/my/Alipaypayment.png',
					text: '支付宝支付（推荐）	',
					sectext: '',
				}, {
					image: '../../static/img/my/weixinzhifu.png',
					text: '微信支付',
					sectext: '',
				}],
				//选中的是哪个支付
				circleShow: 0,
				//有颜色的星星
				rateActive: 0,
				//无颜色的星星
				rate: 0,
				//地图标记
				covers: [{
					id: 1,
					latitude: '',
					longitude: '',
					iconPath: '../../static/img/index/dingweitwo.png',
					callout: {
						content: '终点位置',
						fontSize: 14,
						display: 'ALWAYS'
					}
				}, {
					latitude: '',
					longitude: '',
					iconPath: '../../static/img/index/kuaidi.png',
					rotate: 75,
					callout: {
						content: '骑手位置',
						fontSize: 14,
						display: 'ALWAYS',

					}
				}],
				horsemanInfo: {},
				horsemanDeg: 0,
				payPrice: 0,
				detailPayPrice: 0,
				points: [],
				cancelTimer: 0,
				cancelPrice: 0,
				showCancelButton: false,
				// 立即支付 还是重新发单 0 立即1
				refreshOrder: 0
			}
		},
		computed: {
			// payPrice() {
			// 	return (this.orderDetailInfo.startPrice + this.orderDetailInfo.otherPrice).toFixed(2)
			// }
		},
		methods: {
			//到取消订单
			goToCancelOrder(id) {
				if (this.orderStatus == 2) {
					this.showCancelButton = !this.showCancelButton
				} else {
					uni.navigateTo({
						url: '../cancelOrder/cancelOrder?orderId=' + id
					})
				}
				
			},
			newGoToCancelOrder(id){
				uni.navigateTo({
					url: '../cancelOrder/cancelOrder?orderId=' + id
				})
			},
			showQuestion (item) {
				uni.showToast({
					icon: 'none',
					title: item
				})
			},
			// 取消时间 价格
			async cancelModelProp () {
				let res = await this.$fetch(this.$api.orderCancelProp, {}, 'GET' , 'form')
				this.cancelTimer = res.data.time
				this.cancelPrice = res.data.price
			},
			closeCancelModel () {
				this.showCancelButton = !this.showCancelButton
			},
			//收藏
			async handleCollect() {
				if (this.orderDetailInfo.shieldType === 1) {
					uni.showToast({
						icon: 'none',
						title: '请取消屏蔽后在进行收藏'
					});
					return
				}

				if (this.orderDetailInfo.shieldType === 0) {
					this.orderDetailInfo.shieldType = -1

				} else if (this.orderDetailInfo.shieldType === -1 || this.orderDetailInfo.shieldType === "") {
					this.orderDetailInfo.shieldType = 0
				}



				// console.log(this.orderDetailInfo.shieldType)

				//取消收藏
				if (this.orderDetailInfo.shieldType === -1) {

					let res = await this.$fetch(this.$api.orderCancelCollection, {
						riderId: this.orderDetailInfo.riderId
					}, "POST", 'Form')
					
					uni.showToast({
						icon: 'success',
						title: '取消收藏'
					})

				} else {
					let res = await this.$fetch(this.$api.orderCollection, {
						riderId: this.orderDetailInfo.riderId,
						type: 0
					}, "POST", 'Form')
				
					if (res.code === 0) {
						uni.showToast({
							icon: 'success',
							title: '收藏成功'
						})
					}
				}

			},
			//屏蔽
			async handleShield() {
				

				if (this.orderDetailInfo.shieldType === 0) {
					uni.showToast({
						icon: 'none',
						title: '请取消收藏后在进行屏蔽'
					});
					return
				}

				if (this.orderDetailInfo.shieldType === 1) {
					this.orderDetailInfo.shieldType = -1

				} else if (this.orderDetailInfo.shieldType === -1 || this.orderDetailInfo.shieldType === "") {
					this.orderDetailInfo.shieldType = 1
				}
				console.log(this.orderDetailInfo.shieldType)

				if (this.orderDetailInfo.shieldType === -1) {
					let res = await this.$fetch(this.$api.orderCancelCollection, {
						riderId: this.orderDetailInfo.riderId
					}, "POST", 'Form')
					
					uni.showToast({
						icon: 'success',
						title: '取消屏蔽'
					})
				} else {
					let res = await this.$fetch(this.$api.orderCollection, {
						riderId: this.orderDetailInfo.riderId,
						type: 1
					}, "POST", 'Form')
					console.log(res)
					uni.showToast({
						icon: 'success',
						title: '屏蔽成功'
					})
				}
			},

			//立即支付
			nowpayOrder() {
				this.initMyInfo()
				this.refreshOrder = 0
				this.$refs.popupPay.open()
			},
			//选中的是哪个支付方式
			handleCircle(index) {
				this.circleShow = index
			},
			
			//个人信息
			async initMyInfo() {
				let res = await this.$fetch(this.$api.currentUser, {}, 'GET', 'form');
				
				this.payInfo[0].sectext = '(' + Number(res.data.amount).toFixed(2) + ')';
			},
			
			//确认支付
			async payOrder() {
				uni.showLoading({
					title: '正在下单中....'
				})
				if (this.circleShow === 0) {
					let res = await this.$fetch(this.$api.orderPay, {
						orderId: this.orderDetailInfo.orderId,
						payType: this.circleShow
					}, "POST", "form")
					
					if (res.code == 0) {
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
											  
						this.$refs.popupPay.close()
						if (this.refreshOrder) {
							uni.setStorageSync('userSelect',1)
							setTimeout(() => {
								uni.switchTab({
									url:'../order/order'
								})
							
							}, 1500);
						} else {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							
								// uni.switchTab({
								// 	url: '../order/order',
								// 	success(){
								// 	 let page = getCurrentPages().pop();  //跳转页面成功之后
								// 		if (!page) return;  
								// 		page.onLoad(); //如果页面存在，则重新刷新页面
								// 	}
								// })
							}, 1000)
						}
					
					} else {
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
					}
				} else if (this.circleShow === 1) {
					let res = await this.$fetch(this.$api.orderPay, {
						orderId: this.orderDetailInfo.orderId,
						payType: this.circleShow
					}, "POST", "form")
					
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: res.msg, //微信、支付宝订单数据
						success: (res) => {
							uni.hideLoading();

							uni.showToast({
								icon: 'success',
								title: '支付成功'
							})

							this.$refs.popupPay.close()

							if (this.refreshOrder) {
								uni.setStorageSync('userSelect',1)
								setTimeout(() => {
									uni.switchTab({
										url:'../order/order'
									})
								
								}, 1500);
							} else {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								
									// uni.switchTab({
									// 	url: '../order/order',
									// 	success(){
									// 	 let page = getCurrentPages().pop();  //跳转页面成功之后
									// 		if (!page) return;  
									// 		page.onLoad(); //如果页面存在，则重新刷新页面
									// 	}
									// })
								}, 1000)
							}
						},
						fail: (err) => {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})

						}
					});
				} else if (this.circleShow === 2) {
					let res = await this.$fetch(this.$api.orderPay, {
						orderId: this.orderDetailInfo.orderId,
						payType: this.circleShow
					}, "POST", "form")
					
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: res.data, //微信、支付宝订单数据
						success: (res) => {
							uni.hideLoading();
							uni.showToast({
								icon: 'success',
								title: '支付成功'
							})

							this.$refs.popupPay.close()

							if (this.refreshOrder) {
								uni.setStorageSync('userSelect',1)
								setTimeout(() => {
									uni.switchTab({
										url:'../order/order'
									})
								
								}, 1500);
							} else {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								
									// uni.switchTab({
									// 	url: '../order/order',
									// 	success(){
									// 	 let page = getCurrentPages().pop();  //跳转页面成功之后
									// 		if (!page) return;  
									// 		page.onLoad(); //如果页面存在，则重新刷新页面
									// 	}
									// })
								}, 1000)
							}
						},
						fail: function(err) {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})

						}
					});
				}

			},
			//复制取货码
			copyPickUpCode(copyCode) {
				uni.setClipboardData({
					data: copyCode,
					success: function() {
						console.log('success');
					}
				});
			},
			//拨打骑手电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			//复制订单号
			copyOrderNo(orderNo) {
				uni.setClipboardData({
					data: orderNo,
					success: function() {
						console.log('success');
					}
				});
			},
			//去评价
			goToEvaluate() {
				uni.navigateTo({
					url: '../evaluate/evaluate?orderId=' + this.orderDetailInfo.orderId
				})
			},
			//去运费明细
			goTofreight(index) {
				uni.navigateTo({
					url: '../freightDeatail/freightDeatail?freightInfo=' + JSON.stringify(this.orderDetailInfo) + "&status=" + index
				});
			},
			//确认收货
			commitDelivery() {
				uni.showModal({
					title: '确认收货',
					content: '请确保您已收到货物',
					success: async (res) => {
						if (res.confirm) {
							// console.log('用户点击确定');
							let res = await this.$fetch(this.$api.orderConfirm, {
								orderId: this.orderDetailInfo.orderId
							}, "POST", "Form")
							console.log(res)
							uni.showToast({
								icon: 'success',
								title: '成功收货'
							})
							setTimeout(() => {
								uni.switchTab({
									url: '../order/order',
									success() {
										let page = getCurrentPages().pop(); //跳转页面成功之后
										if (!page) return;
										page.onLoad(); //如果页面存在，则重新刷新页面
									}
								})
							}, 1000)
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			//获取当前骑手
			initMapInfo() {
				console.log(this.orderDetailInfo)
				console.log(this.orderDetailInfo.tid)
				uni.request({
					url: 'https://tsapi.amap.com/v1/track/terminal/search',
					method: "POST",
					data: {
						// key: "e54514186dfbafae58736cd342838baf",
						// sid: '92478',
						key: "4145121d3d1b5dcf41702960f3bd5adc",
						sid: '126730',
						keywords: this.orderDetailInfo.riderId
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log(res)
						this.horsemanInfo = res.data.data
						this.covers[1].latitude = this.horsemanInfo.results[0].location.latitude
						this.covers[1].longitude = this.horsemanInfo.results[0].location.longitude

						this.privatedouble(this.covers[1].latitude, this.covers[1].longitude, this.covers[0].latitude, this.covers[0].longitude)
						this.points = [{								latitude: this.covers[0].latitude,								longitude: this.covers[0].longitude,							},{								latitude: this.covers[1].latitude,								longitude: this.covers[1].longitude,							}]
					}
				});
			},
			//重新发单
			goToStorage(orderInfo) {
				console.log(orderInfo)
				uni.showModal({
				    title: '重新发单',
				    content: '是否确定重新发单',
				    success: async (res) => {
				        if (res.confirm) {
						console.log(orderInfo.orderId)
					  let res = await this.$fetch(this.$api.orderCreate,{
					  	buyAddressType: orderInfo.buyAddressType,
					  	startAddress: JSON.stringify(orderInfo.startAddress),
					  	endAddress: JSON.stringify(orderInfo.endAddress),
					  	tip: orderInfo.tip,
					  	goodsInventory: JSON.stringify(orderInfo.goodsInventory),
					  	distance: orderInfo.distance,
					  	type: orderInfo.type,
					  	pickUpType: 0,
					  	carType: orderInfo.carType,
					  	incubatorFlag: orderInfo.incubatorFlag,
					  	premiumFlag: orderInfo.premiumFlag,
					  	urgentExpressPriceFlag: orderInfo.urgentExpressPriceFlag,
					  	signForCodeFlag: orderInfo.signForCodeFlag,
					  	goodsPredictAmount: orderInfo.goodsPredictAmount,
					  	subsidy: orderInfo.subsidy,
					  	remark: orderInfo.remark
					  }, "POST")
					  
					  this.refreshOrder = 1
					  // 删除
					  let msg = await this.$fetch(this.$api.orderDisplay, {id: orderInfo.orderId}, 'POST', 'form')
					  this.orderDetailInfo.orderId = res.data
					  this.$refs.popupPay.open()
				  
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				// uni.redirectTo({
				// 	url: '../storage/storage?car=' + this.orderDetailInfo.carType
				// })
			},


			//旋转
			privatedouble(lat_a, lng_a, lat_b, lng_b) {

				let d = 0;

				lat_a = lat_a * Math.PI / 180;

				lng_a = lng_a * Math.PI / 180;

				lat_b = lat_b * Math.PI / 180;

				lng_b = lng_b * Math.PI / 180;



				d = Math.sin(lat_a) * Math.sin(lat_b) + Math.cos(lat_a) * Math.cos(lat_b) * Math.cos(lng_b - lng_a);

				d = Math.sqrt(1 - d * d);

				d = Math.cos(lat_b) * Math.sin(lng_b - lng_a) / d;

				d = Math.asin(d) * 180 / Math.PI;


				// console.log(d)
				//     d = Math.round(d*10000);
				// this.covers[1].callout.rotate = Math.abs(d)
				return d

			}

		}

	}
</script>

<style lang="less">
	page::after {
		width: 0;
		height: 0;
		display: none !important;
	}

	.order-detail {
		width: 100%;
		background-color: rgb(247, 247, 250);
		padding-bottom: 130rpx;
		box-sizing: border-box;

		.detail-title {
			width: 100%;
			height: 100rpx;
			padding-left: 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			background: #5468FF;

			&.cancelOrder-title {
				background: rgba(9, 2, 62, 0.30);
			}

			.title-left {
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #FFFFFF;
				letter-spacing: -0.41px;
			}

			.title-center {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				margin-left: 40rpx;
				margin-right: 30rpx;
				box-sizing: border-box;
			}

			.title-right {
				font-family: PingFangSC-Semibold;
				font-size: 24px;
				color: #FFFFFF;
				letter-spacing: -0.58px;
			}

			.title-wait {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(255, 255, 255, 0.80);
				letter-spacing: -0.29px;
				margin-left: 30rpx;
				box-sizing: border-box;
			}
		}

		.detail-header {
			width: 100%;
			height: 172rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #FBFAF8;
			background-color: #fff;

			.avatar {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				margin-left: 30rpx;
				box-sizing: border-box;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.header-right {
				// display: flex;
				margin-left: 30rpx;
				box-sizing: border-box;

				.right-top {
					display: flex;
						
					
					.send-user {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9, 2, 62, 0.30);
					}

					.user {
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						letter-spacing: -0.34px;
						font-weight: bold;
						margin-left: 30rpx;
						margin-right: 20rpx;
						box-sizing: border-box;
					}

					.user-phone {
						font-family: PingFangSC-Semibold;
						font-weight: bold;
						font-size: 14px;
						color: #09023E;
						letter-spacing: -0.34px;
					}
				}

				.right-bottom {
					display: flex;
					margin-top: 20rpx;
					box-sizing: border-box;

					.send {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9, 2, 62, 0.30);
						letter-spacing: -0.34px;
					}

					.send-num {
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						letter-spacing: -0.34px;
						margin-left: 30rpx;
						margin-right: 60rpx;
						box-sizing: border-box;
					}

					.cancel {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9, 2, 62, 0.30);
						letter-spacing: -0.34px;
					}

					.cancel-num {
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						letter-spacing: -0.34px;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
			}
		}

		.detail-header-already {
			padding: 30rpx;
			padding-bottom: 4rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			border-top: 1rpx solid rgb(247, 247, 250);
			box-sizing: border-box;

			.header-already-left {
				display: flex;
				align-items: center;

				.already-left {
					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						overflow: hidden;
						box-sizing: border-box;
					}
				}

				.already-right {
					display: flex;
					flex-direction: column;
					// align-items: center;
					margin-left: 20rpx;
					box-sizing: border-box;
					.already-right-header{
						display: flex;
						align-items: center;
						.user-phone{
							font-family: PingFangSC-Semibold;
							font-size: 16px;
							color: #000000;
						}
					}
					.user-name {
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #09023E;
						font-weight: bold;
						letter-spacing: -0.41px;
						margin-right: 20rpx;
					}
					

					.user-star-box {
						display: flex;
						align-items: center;
						// margin-top: 12rpx;
						box-sizing: border-box;

						.star {
							image {
								width: 30rpx;
								height: 30rpx;
							}
						}

						.star-num {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(9, 2, 62, 0.30);
							letter-spacing: -0.29px;
							margin-left: 10rpx;
							margin-right: 20rpx;
							box-sizing: border-box;
						}

						.order-num {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #09023E;
							letter-spacing: -0.29px;
						}

					}

					.user-phone {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9, 2, 62, 0.30);
						letter-spacing: -0.29px;
						text-align: right;
						// margin-top: -10rpx;
						box-sizing: border-box;
					}
				}
			}

			.header-already-right {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.detail-already-main {
			.map {
				width: 100%;
				height: 476rpx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.map-already {
					width: 100%;
					height: 476rpx;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
					background: rgba(0, 0, 0, 0.40);
					border: 1px solid #979797;
					box-sizing: border-box;

					.coverImage {
						width: 126rpx;
						height: 126rpx;
						// position: absolute;
						// left: 50%;
						// top:50%;
						// transform: translate(-50%,-50%);
					}

					.coverText {
						font-family: PingFangSC-Regular;
						font-size: 17px;
						color: #FFFFFF;
						letter-spacing: -0.41px;
						text-align: center;
						margin-top: 30rpx;
						box-sizing: border-box;
					}
				}
			}

			.already-main-detail {
				width: 100%;
				// height: 154rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				// padding-left: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				border-bottom: 1rpx solid #FBFAF8;
				&.nocenter{
					// justify-content: flex-start;
					align-items: flex-start
					
				}

				.already-main-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 30rpx;
					box-sizing: border-box;
					image {
						width: 36rpx;
						height: 36rpx;
					}

					.pickup-left {
						// font-family: PingFangSC-Regular;
						// font-size: 14px;
						// color: rgba(9, 2, 62, 0.30);
						font-family: PingFangSC;
						font-weight: 700;
						font-size: 18px;
						color: rgb(16, 16, 16);
						transform: translateX(-80rpx);
					}

					.pickup-right {
						// font-family: PingFangSC-Semibold;
						// font-size: 17px;
						// color: #FF8516;
						font-family: PingFangSC;
						font-weight: 700;
						font-size: 24px;
						color: rgba(255, 98, 0, 1);
						// margin-left: 20rpx;
						// margin-right: 10rpx;
						
						box-sizing: border-box;
						transform: translateX(-40rpx);
					}
				}

				.already-tip {
					margin-top: 10rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					// color: rgba(9, 2, 62, 0.30);
				}
				.collectOrUncollectBox {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 20rpx;
					padding-left: 50rpx;
					padding-right: 50rpx;
					box-sizing: border-box;
					.collectOrUncollectBox-item{
						width: 236rpx;
						height: 76rpx;
						background-color: rgb(145, 145, 145);
						color: #FFFFFF;
						text-align: center;
						line-height: 76rpx;
						border-radius: 8px;
						box-sizing: border-box;
						&.on{
							background: #5468FF;							color: #FFFFFF;
						}
					}
				}
				.already-main-detail-p{
					font-family: PingFangSC;
					font-weight: 400;
					font-size: 14px;
					color: rgba(119, 112, 112, 1);
					padding-left: 50rpx;
					box-sizing: border-box;
				}
				.pickandsignCodeBox{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 20rpx;
					padding-left: 50rpx;
					padding-right: 50rpx;
					box-sizing: border-box;
					view{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 14px;
						color: rgb(145, 145, 145);
					}
				}
			}
		}

		.header-complete {
			width: 100%;
			height: 152rpx;
			padding: 0 30rpx;
			border-top: 1rpx solid rgb(247, 247, 250);
			border-bottom: 1rpx solid rgb(247, 247, 250);
			background-color: #fff;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.complete-left {
				display: flex;
				align-items: center;

				.complete-left-avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.complete-left-right {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					box-sizing: border-box;

					.left-right-top {
						display: flex;
						align-items: center;

						.user-name {
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #09023E;
							font-weight: bold;
							letter-spacing: -0.41px;
						}

						.user-phone {
							font-family: PingFangSC-Semibold;
							font-size: 16px;
							color: #000000;
							letter-spacing: -0.29px;
							margin-left: 30rpx;
							margin-right: 10rpx;
							box-sizing: border-box;
						}

						image {
							width: 32rpx;
							height: 32rpx;

						}
					}

					.left-right-bottom {
						display: flex;
						align-items: center;
						margin-top: 12rpx;

						.star-box {
							image {
								width: 30rpx;
								height: 30rpx;
							}
						}

						.star-num {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(9, 2, 62, 0.30);
							letter-spacing: -0.29px;
							margin-left: 10rpx;
							margin-right: 20rpx;
							box-sizing: border-box;
						}

						.order-num {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #09023E;
							letter-spacing: -0.29px;
						}
					}
				}
			}

			.complete-right {
				.complete-collect {
					width: 100rpx;
					height: 42rpx;
					line-height: 42rpx;
					// background: #5468FF;
					border-radius: 2px;
					border-radius: 2px;
					border: 1px solid rgba(9, 2, 62, 0.30);
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #ccc;
					letter-spacing: -0.29px;
					text-align: center;

					&.on {
						background: #5468FF;
						color: #FFFFFF;
						line-height: 42rpx;
					}
				}

				.complete-shield {
					margin-top: 20rpx;
					width: 100rpx;
					height: 42rpx;
					line-height: 42rpx;
					text-align: center;
					border: 1px solid rgba(9, 2, 62, 0.30);
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #ccc;
					letter-spacing: -0.29px;

					&.on {
						background: #5468FF;
						color: #FFFFFF;
						line-height: 42rpx;
					}
				}
			}
		}

		.detail-main {
			background-color: #fff;
			padding: 30rpx 30rpx 50rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #FBFAF8;

			.main-item {
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				box-sizing: border-box;
				
				&:first-child {
					margin-top: 0;
				}

				view {
					&:nth-child(1) {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						// color: rgba(9, 2, 62, 0.30);
						// width: 120rpx;
					}

					&:nth-child(2) {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						margin-left: 30rpx;
						margin-right: 20rpx;
						box-sizing: border-box;
						flex: 1;
					}
				}

				image {
					width: 16rpx;
					height: 26rpx;
					transform: translateY(6rpx);
				}
			}
		}

		.detail-order {
			background-color: #fff;
			padding: 4rpx 34rpx 30rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #FBFAF8;

			.order-item {
				display: flex;
				margin-top: 20rpx;
				box-sizing: border-box;

				&:first-child {
					margin-top: 0;
				}

				.order-left {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					// color: rgba(9, 2, 62, 0.30);
				}

				.order-right {
					// width: 80%;
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-left: 30rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;

					.order-right-box {
						display: flex;
						align-items: center;
					}

					image {
						width: 24rpx;
						height: 24rpx;
						margin-left: 10rpx;
						box-sizing: border-box;
					}

					.order-start {
						padding: 4rpx;
						background: #5468FF;
						border-radius: 2px;
						border-radius: 2px;
						// margin-left: 207rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 10px;
						color: #FFFFFF;
						text-align: center;
					}
				}
			}
		}

		.main-center {
			width: 100%;
			padding: 30rpx;
			background-color: #fff;
			display: flex;
			box-sizing: border-box;
			border-bottom: 1rpx solid #FBFAF8;

			.center-left {
				width: 42rpx;
				margin-top: 46rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;

				.left-top,
				.left-bottom {
					width: 42rpx;
					height: 42rpx;
					line-height: 42rpx;
					border-radius: 50%;
					border: 1px solid #09023E;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #09023E;
					text-align: center;
				}

				.left-bottom {
					border: 1rpx solid #5468FF;
					color: #5468FF;
				}

				.left-line {
					width: 0;
					// height: 134rpx;
					height: 45%;
					border-left: 2rpx dashed #fff;
					background: linear-gradient(to bottom, #09023E, #5468FF);
					background-origin: border-box;

					.content {
						height: 100px;
						background-color: #fff;
					}

				}
			}

			.center-right {
				width: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;

				.right-top {
					&.top-title-child{
						height: 120rpx;
						line-height: 120rpx;
						font-family: PingFangSC-Semibold;
						font-size: 20px;
						color: #5468FF;
						font-weight: bold;
					}
					.right-top-header {

						display: flex;
						justify-content: space-between;

						.top-title {
							font-family: PingFangSC-Semibold;
							font-size: 20px;
							color: #09023E;
							font-weight: bold;
						}

						.top-dist {
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #09023E;
						}
					}

					.right-top-center {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; //控制行数
						overflow: hidden;
					}

					.right-top-footer {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9, 2, 62, 0.30);
					}
				}

				.right-bottom {
					padding-top: 48rpx;
					box-sizing: border-box;

					.right-bottom-header {
						display: flex;
						justify-content: space-between;

						.bottom-title {
							font-family: PingFangSC-Semibold;
							font-size: 20px;
							color: #5468FF;
							font-weight: bold;
						}

						.bottom-dist {
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #5468FF;
						}
					}

					.right-bottom-center {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #5468FF;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; //控制行数
						overflow: hidden;
					}

					.right-bottom-footer {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9, 2, 62, 0.30);
					}
				}
			}
		}

		.detail-footer {
			width: 100%;
			height: 100rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			// justify-content: flex-end;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			// padding-right: 30rpx;
			box-sizing: border-box;
			&.pdleft{
				padding-left: 30rpx;
				box-sizing: border-box;
			}
			.cancel-button {
				
				// width: 160rpx;
				width: 320rpx;
				height: 70rpx;
				line-height: 70rpx;
				border: 1px solid rgba(9, 2, 62, 0.50);
				border-radius: 15px;
				border-radius: 15px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9, 2, 62, 0.50);
				letter-spacing: -0.34px;
				text-align: center;
				box-sizing: border-box;
			}

			.pay-now {
				// width: 160rpx;
				width: 320rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: #5468FF;
				border-radius: 15px;
				border-radius: 15px;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				text-align: center;
				margin: 0 30rpx;

			}
		}
		.orderCancelModel{
			position: fixed;
			left: 0;
			top:0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.4);
			z-index: 9999999;
			.orderCancelModel-Wrapper{
				width: 600rpx;
				
				background-color: rgb(242, 234, 234);
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				padding: 30rpx;
				box-sizing: border-box;
				.cancelModel-top{
					
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom: 1rpx solid #CCCCCC;
					view{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 18px;
						color: rgb(16, 16, 16);
					}
					image{
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						right: 36rpx;
					}
				}
				.cancelModel-center{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-top: 10rpx;
					box-sizing: border-box;
					.cancelModel-center-top{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 14px;
						color: rgb(125, 125, 129);
						
					}
					.cancelModel-center-bottom{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 20px;
						color: rgb(16, 16, 16);
						span{
							    color: rgb(219, 33, 33);
						}
					}
				}
				.cancelModel-bottom{
					width: 100%;
					display: flex;
					justify-content: space-around;
					margin-top: 10rpx;
					box-sizing: border-box;
					.cancelModel-bottom-left, .cancelModel-bottom-right{
						width: 200rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 10rpx;
					}
					.cancelModel-bottom-left{
						background-color: rgb(119, 112, 112);
						color: #FFFFFF;
					}
					.cancelModel-bottom-right{
						background-color: rgb(98, 118, 255);
					}
				}
			}
			
		}
		.uni-popup__wrapper-box {
			width: 750rpx;
			// height: 650rpx;
			background: #FFFFFF;
			border-radius: 7px 7px 0 0;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			position: fixed !important;
			left: 0;
			bottom: 0;

			.popupPay-header {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding-top: 60rpx;
				box-sizing: border-box;

				.popupPay-header-left {
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					letter-spacing: -0.41px;
					font-weight: bold;
					margin-right: 20rpx;
					box-sizing: border-box;
				}

				.popupPay-header-right {
					font-family: PingFangSC-Semibold;
					font-size: 24px;
					color: #FF8516;
					letter-spacing: -0.58px;
				}
			}

			.popupPay-middle {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding-top: 28rpx;
				box-sizing: border-box;

				.popupPay-middle-left {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.30);
					letter-spacing: -0.34px;
				}

				.popupPay-middle-right {
					margin-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #5468FF;
					letter-spacing: -0.34px;
				}
			}

			.popupPay-item {
				width: 100%;
				display: flex;
				margin-top: 60rpx;
				padding-left: 30rpx;
				box-sizing: border-box;

				.circle {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1px solid rgba(9, 2, 62, 0.30);
					position: relative;

					.n-circle {
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						background: #5468FF;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}

				image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 30rpx;
					margin-right: 20rpx;
					box-sizing: border-box;
				}

				.pay-way {
					display: flex;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #333333;
					letter-spacing: -0.34px;

					.pay-way-sectext {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9, 2, 62, 0.30);
						letter-spacing: -0.34px;
					}
				}
			}

			.popupPay-button {
				margin: 30rpx;
				box-sizing: border-box;
				width: 690rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				background: #5468FF;
				border-radius: 4px;
				border-radius: 4px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
		}

	}
</style>
