<template>
	<view class="order" >
		<Status/>
		<!-- <view class="header-box" @touchstart = "touchDemo" @touchcancel = "touchEndDemo" @touchmove = "touchmoveDemo" @touchend = "touchenditem"> -->
		<view class="header-box">
		<view class="order-header">
			<view class="header-title">我的订单</view>
			<image src="../../static/img/order/search.png" mode="aspectFill" class="header-search" @tap="goToSearch"></image>
		</view>
		<view class="scroll">
				<scroll-view id="nav-bar" :scroll-x="true" class="scroll-box" :scroll-into-view="toChildView"  scroll-with-animation  >
				<view class="scroll-item-box">
					<view class="scroll-item" :class="{on:currentIndex === index}" v-for="(scroll,index) in scrollList" 
					:key = "index" 
					@tap="handleCurrent(index,$event)"
					:id = 'scroll.id'
					>{{scroll.name}}</view>
				</view>
			</scroll-view>
		</view>
		</view>
		<view class="center-text" v-if="!swiperItem1.length && currentIndex == 0">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem2.length && currentIndex == 1">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem3.length && currentIndex == 2">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem4.length && currentIndex == 3">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem5.length && currentIndex == 4">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem6.length && currentIndex == 5">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem7.length && currentIndex == 6">{{noOrderText}}</view>
		<view class="center-text" v-if="!swiperItem8.length && currentIndex == 7">{{noOrderText}}</view>
		<!-- <view class="center-text"></view> -->
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption" :down = "downOption">
			<swiper class="swiper" style="height: calc(100vh );" :current="currentIndex" @change="swiperChange">
				
					<!-- <block v-for="(count,i) in 7" :key = "i"> -->
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
								<view class="pullDownPage" v-if="swiperItem1.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem1" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">
												<view class="top-title">{{item.startAddress.title}}</view>
											</view>
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>
										</view>
										<view class="right-top top-title-child" v-else>
											就近购买
										</view>
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}} <text style="padding-left: 15rpx;" v-if="item.endAddress.extensionNumber">分机号: {{item.endAddress.extensionNumber}}</text></view>
										</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem2.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem2" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">	
											<view class="top-title">{{item.startAddress.title}}</view>
											</view>
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>
											</view>										
											<view class="right-top top-title-child" v-else>
												就近购买	
											</view>
											<view class="buyTimerDJS" style="display: flex;align-items: center;" v-if="item.pickUpType == 0">接单后:<view><span style = "color: #5468FF;">{{item.pickUpNeedTime}}分钟</span>内{{item.type == 2 ? '购买' : '取件'}}</view></view>
											<view class="buyTimerDJS" style="display: flex;align-items: center;" v-if="item.pickUpType == 1">送达:<view><span style = "color: #5468FF;">{{item.newPickUpTime}}</span></view></view>
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}} <text style="padding-left: 15rpx;" v-if="item.endAddress.extensionNumber">分机号: {{item.endAddress.extensionNumber}}</text></view>
										</view>
										<view class="buyTimerDJS" style = "color: #5468FF;" v-if="item.pickUpType == 0">接单后预计: <span style = "color: #d32928;">{{item.estimatedNeedTime}}分钟</span>内送达</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem3.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem3" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">
											<view class="top-title">{{item.startAddress.title}}</view>	
											</view>										
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>						
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>
											</view>										
											<view class="right-top top-title-child" v-else>就近购买</view>
											<view class="buyTimerDJS" v-if="item.endPickTimer && !item.buyAddressType && item.pickUpType == 0 && item.second != undefined">剩余时间: <span style = "color: #5468FF;">{{item.hour}}:{{item.minute}}:{{item.second}}</span>内{{item.type == 2 ? '购买' : '取件'}}</view>	
											<view class="buyTimerDJS" v-else-if = "item.endPickTimer <= 0 && !item.buyAddressType && item.pickUpType == 0"><span>已超时</span></view>
											<view class="buyTimerDJS" v-if="item.endPickTimer && item.buyAddressType && item.pickUpType == 0 && item.second != undefined">剩余时间: <span style = "color: #5468FF;">{{item.hour}}:{{item.minute}}:{{item.second}}</span>内{{item.type == 2 ? '购买' : '取件'}}</view>
											<view class="buyTimerDJS" v-else-if = "item.endPickTimer <= 0 && item.buyAddressType && item.pickUpType == 0"><span>已超时</span></view>
											
											<view class="buyTimerDJS" v-if="item.endPickTimer && !item.buyAddressType && item.pickUpType == 1">预约: <text style = "color: #5468FF;margin-right: 50rpx;">{{item.newPickUpTime}}</text>     剩余: <span style = "color: #5468FF;">{{item.hour}}:{{item.minute}}:{{item.second}}</span></view>
											<view class="buyTimerDJS" v-else-if = "item.endPickTimer <= 0 && !item.buyAddressType && item.pickUpType == 1"><span>已超时</span></view>
											<view class="buyTimerDJS" v-if="item.endPickTimer && item.buyAddressType && item.pickUpType == 1">预约: <text style = "color: #5468FF;margin-right: 50rpx;">{{item.newEstimatedTime}}</text>  剩余: <span style = "color: #5468FF;">{{item.hour}}:{{item.minute}}:{{item.second}}</span></view>
											<view class="buyTimerDJS" v-else-if = "item.endPickTimer <= 0 && item.buyAddressType && item.pickUpType == 1"><span>已超时</span></view>
											
											
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}} <text style="padding-left: 15rpx;" v-if="item.endAddress.extensionNumber">分机号: {{item.endAddress.extensionNumber}}</text></view>
											<!-- <view class="buyTimerDJS">送达倒计时: <span>18分钟</span>内购买</view> -->
											<view class="buyTimerDJS" v-if="item.pickUpType == 0 && item.sendsecond != undefined" style = "color: #5468FF;">剩余时间:<span style = "color: #d32928;">{{item.sendhour}}:{{item.sendminute}}:{{item.sendsecond}}</span>内送达</view>
											<view class="buyTimerDJS" v-if="item.pickUpType == 1 && item.sendsecond != undefined" style = "color: #5468FF;">预约: <text style = "color: #d32928;margin-right: 50rpx;">{{item.newEstimatedTime}}</text>  <span  style = "color: #5468FF">剩余:</span> <span style = "color: #d32928;">{{item.sendhour}}:{{item.sendminute}}:{{item.sendsecond}}</span></view>
											<view class="buyTimerDJS"	v-if = "item.sendsecond == undefined"><span>已超时</span></view>
										</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
									
										<view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem4.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem4" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">	
												<view class="top-title">{{item.startAddress.title}}</view>
												</view>	
												<view class="right-top-center">{{item.startAddress.addressDetail}}</view>
												<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>
												
											</view>
											<view class="right-top top-title-child" v-else>就近购买</view>
											
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}} <text style="padding-left: 15rpx;" v-if="item.endAddress.extensionNumber">分机号: {{item.endAddress.extensionNumber}}</text></view>
											<view class="buyTimerDJS" v-if="item.estimatedTimeDown > 0">剩余时间: <span >{{item.hour}}:{{item.minute}}:{{item.second}}</span>内送达</view>
											<view class="buyTimerDJS" v-else-if="item.estimatedTimeDown <= 0"><span>已超时</span></view>
										</view>
									</view>
								</view>
								
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										<view class="detail-order"  v-if="currentIndex === 3"  style="background-color: rgb(84, 104, 255); color: #FFFFFF; border: none;">订单派送中</view>
										<view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem5.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem5" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">	
											<view class="top-title">{{item.startAddress.title}}</view>
											</view>
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>											
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>	
											</view>					
											<view class="right-top top-title-child" v-else>就近购买</view>
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}}</view>
										</view>
									</view>
								</view>
								
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0, 5)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem6.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem6" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">	
											<view class="top-title">{{item.startAddress.title}}</view>
											</view>
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>	
											</view>										
											<view class="right-top top-title-child" v-else>就近购买</view>
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}}</view>
										</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0, 6)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem7.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem7" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">
												<view class="top-title">{{item.startAddress.title}}</view>
												</view>	
												<view class="right-top-center">{{item.startAddress.addressDetail}}</view>									
												<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>	
												</view>								
												<view class="right-top top-title-child" v-else>就近购买</view>
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}}</view>
										</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0, 7)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y="true" class="swiper-scroll" style="height: calc(100vh );" :scroll-top = "secondsSCT" @scrolltolower = "scrollBottom" @scroll = "watchScrollY" > 
							<view class="pullDownPage" v-if="swiperItem8.length">下拉刷新页面, 查看订单情况</view>
							<view class="swiper-main" v-for="(item,index) in swiperItem8" :key = "index" @tap="goToDeatail(item.id,item.payAmount)">
								<view class="main-header">
									<view class="header-top" >
										<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
											<view class="order-number">订单编号</view>
											<view class="order-num">{{item.orderNo}}</view>
											<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
										</view>
										<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{scrollList[currentIndex].name}}</view>
									</view>
									<view class="header-bottom">
										<view class="sub-time">发布时间</view>
										<view class="create-time">{{item.createTime}}</view>
									</view>
								</view>
								<view class="main-center">
									<view class="center-left">
										<view class="left-top" v-if="item.type == 2">买</view>
										<view class="left-top" v-else>取</view>
										<view class="left-line">
											<div class="content">
											</div>
										</view>
										<view class="left-bottom" v-if="item.type == 2">收</view>
										<view class="left-bottom" v-else>达</view>
									</view>
									<view class="center-right">
										<view class="right-top" v-if="!item.buyAddressType">
											<view class="right-top-header">								
												<view class="top-title">{{item.startAddress.title}}</view>					
											</view>										
											<view class="right-top-center">{{item.startAddress.addressDetail}}</view>	
											<view class="right-top-footer" v-show="item.type !== 2">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>	
											</view>										
											<view class="right-top top-title-child" v-else>就近购买</view>
											
										<view class="right-bottom" :style="{paddingTop:item.startAddress.addressDetail.length < 27 ? 70 + 'rpx' : 48 + 'rpx'}">
										<!-- <view class="right-bottom"> -->
											<view class="right-bottom-header">
												<view class="bottom-title">{{item.endAddress.title}}</view>
											</view>
											<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
											<view class="right-bottom-footer" >{{item.endAddress.userName}} {{item.endAddress.mobile}}</view>
										</view>
									</view>
								</view>
								<view class="main-bottom">
									<view class="bottom-left">
										<view class="bottom-left-top">
											<view class="total">跑腿费：</view>
											<view class="price" >¥{{item.goodsPredictAmount ? item.realAmount : item.payAmount}}</view>
											<!-- <div class="price" ref = 'price'></div> -->
										</view>
										<view class="bottom-left-bottom" v-if="item.goodsPredictAmount">
											<view class="total">预付金：</view>
											<view class="price">¥{{item.goodsPredictAmount}}</view>
										</view>
										
									</view>
									<view class="bottom-right">
										<view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2  || currentIndex == 0 " style="background-color: #3291f8; color: #FFFFFF;">取消订单</view>
										<!-- <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>
										 <view class="detail-order" @tap.stop="goToDeatail(item.id,item.payAmount)" v-if="currentIndex !== 4 && currentIndex !== 6 && currentIndex !== 5 && currentIndex !== 1" >订单详情</view>-->
										  <view class="detail-order"  v-if=" currentIndex === 0" style="background-color: rgb(84, 104, 255); color: #FFFFFF;" @tap.stop="nowpayOrder(item.id, item.payAmount)">去支付</view>
										<view class="detail-order"  v-if="currentIndex === 4" @tap.stop = "goToEvaluate(item.id)" style="background-color: #f55f04; color: #FFFFFF; border: none;">去评价</view>
										<view class="detail-order"  v-if="currentIndex === 5" @tap.stop = "goToStorage(item.carType, item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">{{currentIndex === 5 ? '继续下单' : '重新发单'}}</view>
										<view class="detail-order"  v-if="currentIndex === 6 " @tap.stop="refreshOrder(item)" style="background-color: rgb(84, 104, 255); color: #FFFFFF;">重新发单</view>
										<!-- <view class="cancel-order"  v-if="currentIndex === 5" @tap.stop="handleShield(item.riderId)">屏蔽骑手</view>
										<view class="detail-order" v-if="currentIndex === 5" @tap.stop="collectRider(item.riderId)">收藏骑手</view> -->
										<view class="detail-order" @click.stop="deleteOrder(item.id, $event, 0)" v-if="currentIndex === 4 || currentIndex === 5 || currentIndex === 6" style="background-color: #2642e1; color: #FFFFFF;">删除</view>
									</view>
								</view>
								
							</view>
							
							
							 <!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more> -->
						</scroll-view>
						</swiper-item>
					<!-- </block> -->
				
				
			</swiper>
		</mescroll-body>
			
		<!-- </scroll-view> -->
		<view class="orderCancelModel" v-if="showCancelModel">
			<view class="orderCancelModel-Wrapper">
				<view class="cancelModel-top">
					<view>提示:骑手已接单</view>
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
					<view class="cancelModel-bottom-left" @click.stop="closeCancelModel(0)">取消</view>
					<view class="cancelModel-bottom-right" @click.stop="goToCancelOrder(orderRealyId, 1)">确定</view>
				</view>
			</view>
	   </view>
	   
	   <uni-popup ref="popupPay" type="bottom">
	   	<view class="popupPay-header">
	   		<view class="popupPay-header-left">您需支付</view>
	   		<view class="popupPay-header-right">¥{{waitPayamount}}元</view>
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
	// let windowWidth = 0, scrollTimer = false, tabBar;
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'	
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		onLoad (options) {
			
			const query = uni.createSelectorQuery().in(this);
			query.select('.scroll-item').boundingClientRect(data => {
			  this.scrollWidth = data.width
			}).exec();
			
			this.cancelModelProp()
			
			this.hasFlag = true
			this.orderList = []
			this.i = 0
			this.orderArr = []
			this.orderArrLength = 0
			this.priceArr = []
			this.showCancelModel = false
			this.realyCancel = false
			this.initMyInfo()
			this.initOrder()
			
			//判读到多少时开始下拉刷新
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];  
			this.currentWebview = page.$getAppWebview();
			this.currentWebview.setStyle({
			  pullToRefresh: {  
			    support: false	
			  }  
			});
			
			
			
		},

		onShow() {
			if (this.currentIndex != 6) {
				this.setTimer = setInterval(() => {
					this.hasFlag = true
					this.orderList = []
					this.i = 0
					this.orderArr = []
					this.orderArrLength = 0
					this.priceArr = []
					this.initOrder()
				}, 15000)
			}
			
			
			if(uni.getStorageSync('userSelect')){
				this.currentIndex = uni.getStorageSync('userSelect')
				
				this.initOrder()
				uni.removeStorageSync('userSelect')
			}
			if (uni.getStorageSync('starSetIntertFlag')) {
				if (this.currentIndex != 6) {
				this.setTimer = setInterval(() => {
					this.hasFlag = true
					this.orderList = []
					this.i = 0
					this.orderArr = []
					this.orderArrLength = 0
					this.priceArr = []
					this.initOrder()
				}, 15000)
				uni.removeStorageSync('starSetIntertFlag')
				}
			}
			uni.removeStorageSync('orderDetailInfo');
			// 进入详情 会跳转到第一页 所以注释
			// this.hasFlag = true
			// this.orderList = []
			// // this.i = 0
			// // this.orderArr = []
			// // this.orderArrLength = 0
			// // this.priceArr = []
			// this.showCancelModel = false
			// this.realyCancel = false
			// this.deleteId = 0
			
			
			this.initOrder()
			// this.currentIndex = 0
			// this.toChildView = ''
			
			if (uni.getStorageSync('orderRefresh')) {
				setTimeout(() => {
					this.handleCurrent(this.currentIndex)
					uni.removeStorageSync('orderRefresh')
				}, 500)
			}
		
			
		}, 
		onHide() {
			uni.hideLoading()
			this.showCancelModel = false
			this.$refs.popupPay.close()
			clearInterval(this.setTimer)
			this.setTimer = null
		},
		onTabItemTap(e){
		
			this.initOrder()
			if (this.setTimer) return
			if (this.currentIndex != 6) {
			this.setTimer = setInterval(() => {
				this.hasFlag = true
				this.orderList = []
				this.i = 0
				this.orderArr = []
				this.orderArrLength = 0
				this.priceArr = []
				this.initOrder()
			}, 15000)
			}
		},
		
		components:{
			uniPopup
		},
		
		data () {
			return {
				//头部导航
				secondsSCT: 0,
				scrollList:[{id: 'waitpay', name: '待支付',value: 1},{id: 'waitjiedan', name: '待接单',value:2},{id: 'waitshouqu', name: '待收取',value:3},{id: 'loding', name: '进行中',value:4},{id: 'evaluate', name: '待评价',value:5},{id: 'complete', name: '已完成',value:6},{id: 'cancel', name: '已取消',value:0},{id: 'questions', name: '问题订单',value:7}],
				currentIndex: 0,
				//轮播图用
				toChildView: '',
				swiperHeight: 684,
				//数据信息
				orderList: [],
				//分页用的空数组
				orderArr: [],
				i: 0,
				orderArrLength: 0,
				hasFlag: true,
				scrollLeft:0,
				noOrderText: '',
				timerId: '',
				currentWebview: '',
				switchTabFlag: true,
				//取消订单弹框
				showCancelModel: false,
				realyCancel: false,
				cancelTimer: 0,
				cancelPrice: 0,
				orderRealyId: 0,
				priceArr: [],
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
				waitPayamount: 0,
				waitpayOrderId: 0,
				deleteId: 0,
				swiperItem1: [],
				swiperItem2: [],
				swiperItem3: [],
				swiperItem4: [],
				swiperItem5: [],
				swiperItem6: [],
				swiperItem7: [],
				swiperItem8: [],
				priceArr1: [],
				priceArr2: [],
				priceArr3: [],
				priceArr4: [],
				priceArr5: [],
				priceArr6: [],
				priceArr7: [],
				priceArr8: [],
				resTotal: 0,
				firstPushArr: [],
				touchEndY: 0,
				touchStartY: 0,
				touchTimer: '',
				upOption: {
					use: false
				},
				downOption: {
					offset: 30
				},
				pickUpTimerFlag: [],
				estimatedTimerFlag: [],
				setTimer: null
			}
		},
		computed:{
			orderListLength(){
				
				return this.orderList.length
			},
			paotuifei (pr1, pr2) {
				// cpmsole.log(pre1, pr2)
				return Number(pr1 - pr2).toFixed(2)
			}
		},
		
		methods: {
			downCallback () {
				setTimeout(()=>{
					this.hasFlag = true
					this.orderList = []
					this.i = 0
					this.orderArr = []
					this.orderArrLength = 0
					this.priceArr = []
					this.initOrder()
					
				}, 1000)
				this.mescroll.endDownScroll()
				
			},
			touchenditem (e) {
				// console.log(e)
				// this.touchEndY = e.changedTouches[0].pageY
				// // console.log(this.touchEndY - this.touchStartY)
				// console.log(this.touchEnsdY)
				// console.log(this.touchStartY)
				// if (this.touchEndY - this.touchStartY) {
				// 	this.currentWebview.setStyle({  
				// 	  pullToRefresh: {  
				// 	    support: true,  
				// 		style: plus.os.name === 'Android' ? 'circle' : 'circle'
				// 	  }  
				// 	});  
				// 	if (this.touchTimer != '' || this.touchTimer != null) {
				// 		clearTimeout(this.touchTimer)
				// 		this.touchTimer = null
				// 	}
					
				//  this.touchTimer = setTimeout(() => {
				// 		this.currentWebview.setStyle({
				// 		  pullToRefresh: {  
				// 		    support: false
				// 		  }  
				// 		});  
				// 	}, 700)
					
				// 	this.secondsSCT = 0
				// } else {
				// 	this.currentWebview.setStyle({
				// 	  pullToRefresh: {  
				// 	    support: false,  
				// 	  }  
				// 	});  
				// }
			},
			touchmoveDemo (e) {
				console.log(e)
				this.touchEndY = e.changedTouches[0].pageY
				// console.log(this.touchEndY - this.touchStartY)
				console.log(this.touchEndY)
				console.log(this.touchStartY)
				if (this.touchEndY - this.touchStartY) {
					this.currentWebview.setStyle({  
					  pullToRefresh: {  
					    support: true,  
						// style: plus.os.name === 'Android' ? 'circle' : 'circle'
						style: plus.os.name === 'Android' ? 'circle' : 'default'
					  }  
					});  
					if (this.touchTimer != '' || this.touchTimer != null) {
						clearTimeout(this.touchTimer)
						this.touchTimer = null
					}
					
				 // this.touchTimer = setTimeout(() => {
					// 	this.currentWebview.setStyle({
					// 	  pullToRefresh: {  
					// 	    support: false
					// 	  }  
					// 	});  
					// }, 700)
					
					this.secondsSCT = 0
				} else {
					this.currentWebview.setStyle({
					  pullToRefresh: {  
					    support: false,  
					  }  
					});  
				}
			},
			touchDemo (e) {
				console.log(e)
				this.touchStartY = e.changedTouches[0].pageY
			},
			touchEndDemo (e) {
				console.log(e)
			
				
				
			},
			//更改下标
			async handleCurrent (index,e,dele) {
				
				this.currentIndex = index
				let toChildViewId = index == 0 ? this.scrollList[this.currentIndex].id : this.scrollList[this.currentIndex - 1].id
				this.toChildView = toChildViewId
				// this.scrollLeft = this.currentIndex * this.scrollWidth
				// if (!dele) {
					this.hasFlag = true
					this.orderList = []
					this.i = 0
					this.orderArr = []
					this.orderArrLength = 0
					this.priceArr = []
				// }
			
				
				
				this.initOrder()
				
				this.switchTabFlag = false
			},
			//去搜索
			goToSearch () {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			//立即支付
			nowpayOrder(orderId, Amount) {
				this.waitpayOrderId = orderId
				this.waitPayamount = Amount
				this.initMyInfo()
				this.$refs.popupPay.open()
			},
			//选中的是哪个支付方式
			handleCircle(index) {
				this.circleShow = index
			},
			async initMyInfo() {
				let res = await this.$fetch(this.$api.currentUser, {}, 'GET', 'form');
				
				this.payInfo[0].sectext = '(' + Number(res.data.amount).toFixed(2) + ')';
			},
		
			//重新发单
			goToStorage(car, item){
				
				let sendAddress = {
					addressDetail: item.startAddress.detail,
					latitude: item.startAddress.latitude,
					mobile: item.startAddress.mobile,
					name: item.startAddress.userName,
					editAddress: {
							name: item.startAddress.title,
							address: item.startAddress.name,
							latitude: item.startAddress.latitude.split(',')[1],
							longitude: item.startAddress.latitude.split(',')[0]
					}
				};
				let endAddress = {
					addressDetail: item.endAddress.detail,
					latitude: item.endAddress.latitude,
					mobile: item.endAddress.mobile,
					name: item.endAddress.userName,
					editAddress: {
							name: item.endAddress.title,
							address: item.endAddress.name,
							latitude: item.endAddress.latitude.split(',')[1],
							longitude: item.endAddress.latitude.split(',')[0]
					}
				}
				
				
				
				
				uni.showModal({
				    title: '重新发单',
				    content: '是否确定重新发单',
				    success:  (res) => {
				        if (res.confirm) {
							
							uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))
							uni.setStorageSync('endAddress', JSON.stringify(endAddress))
				           uni.navigateTo({
				           	url: '../storage/storage?car=' + car + '&scrollIndex=' + item.type
				           })
				        } else if (res.cancel) {
				            
				        }
				    }
				});
				
			},
			// 重新发单
			async refreshOrder(item) {
				uni.showModal({
				    title: '重新发单',
				    content: '是否确定重新发单',
				    success: async (res) => {
				        if (res.confirm) {
				           this.deleteId = item.id				           
				           let res = await this.$fetch(this.$api.orderCreate,{
				           	buyAddressType: item.buyAddressType,
				           	startAddress: JSON.stringify(item.startAddress),
				           	endAddress: JSON.stringify(item.endAddress),
				           	tip: item.tip,
				           	goodsInventory: item.goodsInventory,
				           	distance: item.distance,
				           	type: item.type,
				           	pickUpType: 0,
				           	carType: item.carType,
				           	incubatorFlag: item.incubatorFlag,
				           	premiumFlag: item.premiumFlag,
				           	urgentExpressPriceFlag: item.urgentExpressPriceFlag,
				           	signForCodeFlag: item.signForCodeFlag,
				           	goodsPredictAmount: item.goodsPredictAmount,
				           	subsidy: item.subsidy,
				           	remark: item.remark
				           }, "POST")
				           this.waitpayOrderId = res.data
				           this.waitPayamount = item.payAmount
				           this.$refs.popupPay.open();
				        } else if (res.cancel) {
				           
				        }
				    }
				});
		
					
			},
			//去详情
			async goToDeatail (id,payAmount) {
				
				this.timerId && clearTimeout(this.timerId)
				this.timerId = setTimeout(async()=>{
				let res = await this.$fetch(this.$api.orderDetail,{id:id},"POST","Form")
				
				if (res.code == 0) {
					
					if (this.currentIndex == 3 || this.currentIndex == 2) {
						uni.setStorageSync('orderDetailInfo',JSON.stringify(res.data))
						
						uni.navigateTo({
							url:'../orderDetail/orderDetailing?currentIndex=' + this.currentIndex
						})
					} else {
						uni.navigateTo({
							url:'../orderDetail/orderDetail?orderDetail=' + JSON.stringify(res.data) + "&currentIndex=" + this.currentIndex + '&payAmount='+ payAmount
						})
					}
				}
			},300) 
			},
			//复制
			copyNumber (orderId) {
				uni.setClipboardData({
						data: orderId,
						success() {
							
						}	
					})
			},
			//到取消订单
			goToCancelOrder (id, index) {
				this.orderRealyId = id 
				if (this.currentIndex === 2) {
					this.showCancelModel = !this.showCancelModel
				}
				if (index) {
					uni.navigateTo({
						url: '../cancelOrder/cancelOrder?orderId=' + id
					})
				}
				if (this.currentIndex !== 2) {
					uni.navigateTo({
						url: '../cancelOrder/cancelOrder?orderId=' + id
					})
				}
			},
			//确认支付
			async payOrder(e) {
				uni.showLoading({
					title: '正在下单中....'
				})
			
				if (this.circleShow === 0) {
					let res = await this.$fetch(this.$api.orderPay, {
						orderId: this.waitpayOrderId,
						payType: this.circleShow
					}, "POST", "form")
					
					if (res.code == 0) {
						this.initMyInfo()
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: res.msg
						})
						this.$refs.popupPay.close()
						setTimeout(() => {
							if (this.currentIndex == 6) {
								this.currentIndex = 0
							}
							this.handleCurrent(this.currentIndex + 1, e)
							
						}, 1500)
						setTimeout(() => {
							if (this.currentIndex == 6) {
								this.currentIndex = 0
							}
							this.handleCurrent(this.currentIndex, e)
						},2000)
						if (this.deleteId) {
							this.deleteOrder(this.deleteId, e, 1)
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				} else if (this.circleShow === 1) {
					let res = await this.$fetch(this.$api.orderPay, {
						orderId: this.waitpayOrderId,
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
			
							setTimeout(() => {
								if (this.currentIndex == 6) {
									this.currentIndex = 0
								}
									this.handleCurrent(this.currentIndex + 1, e)
							}, 1500)
							setTimeout(() => {
								if (this.currentIndex == 6) {
									this.currentIndex = 0
								}
								this.handleCurrent(this.currentIndex, e)
							},2000)
							if (this.deleteId) {
								this.deleteOrder(this.deleteId, e, 1)
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
						orderId: this.waitpayOrderId,
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
			
							setTimeout(() => {
								if (this.currentIndex == 6) {
									this.currentIndex = 0
								}
									this.handleCurrent(this.currentIndex + 1, e)
									
							}, 1500)
							setTimeout(() => {
								if (this.currentIndex == 6) {
									this.currentIndex = 0
								}
								this.handleCurrent(this.currentIndex, e)
							},2000)
							if (this.deleteId) {
								this.deleteOrder(this.deleteId, e, 1)
							}
						},
						fail: function(err) {
							
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
			
						}
					});
				}
			
			},
			//收藏骑手
			async collectRider(riderId){
				let res = await this.$fetch(this.$api.orderCollection, {
					riderId: riderId,
					type: 0
				}, "POST", 'Form')
				if (res.code === 0) {
					uni.showToast({
						icon: 'success',
						title: '收藏骑手成功'
					})
				}
			},
			//屏蔽骑手
			async handleShield(riderId){
				let res = await this.$fetch(this.$api.orderCollection, {
					riderId: riderId,
					type: 1
				}, "POST", 'Form')
				uni.showToast({
					icon: 'success',
					title: '屏蔽骑手成功'
				})
			},
			async initOrder () {
				// uni.showLoading({
				// 	title:'加载中'
				// })
				
				let res = await this.$fetch(this.$api.orderCustomer,{status:this.scrollList[this.currentIndex].value, displayFlag: 1},"POST")
				// console.log(res)
				this.resTotal = res.total
				// 新增数组
				if (res.total === 0) {
					this.noOrderText = "暂无订单"
					// setTimeout(()=>{
					// 	uni.hideLoading()
					// },500)
				} else {
					this.noOrderText = ""
				}
				// 分页
				if (this.orderList.length < res.total) {
					// console.log('执行')
					this.hasFlag = true
					this.orderArr = [] 
					// this.priceArr = []
					for (let i = this.i ; i < res.total ; i++) {
						this.orderArr = res.rows.slice(this.i,this.i + 10)
					}
					
					this.orderArrLength += this.orderArr.length
					
					
					this.orderArr.forEach(item => {
						item.startAddress = JSON.parse(item.startAddress)
						item.endAddress = JSON.parse(item.endAddress)
						item.startAddress.addressDetail = item.startAddress.addressDetail.replace('undefined', '')
						item.endAddress.addressDetail = item.endAddress.addressDetail.replace('undefined', '')
					})
					
					//订单数据
					if(this.orderArrLength <= res.total) {
						
						this.orderList = [...this.orderList,...this.orderArr]
						// console.log(JSON.stringify(this.orderList))
					
						
						if (this.currentIndex == 0) {
							this.swiperItem1 = this.orderList
							
							// this.swiperItem1.forEach(item => {
								// this.priceArr1.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 1) {
							console.log(this.orderList)
							this.orderList.forEach(item => {
								if (item.pickUpType == 1) {
									item.newPickUpTime = item.pickUpTime.slice(5)
								} else {
									item.newPickUpTime = ''
								}
							})
							this.swiperItem2 = this.orderList
							
							// this.swiperItem2.forEach(item => {
							// 	// this.priceArr2.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 2) {
	
							if (this.orderList.length) {
								this.orderList.forEach((item, index) => {
									
									item.endPickTimer = this.$dayjs(item.pickUpTime).diff(this.$dayjs(), "second")
									item.estimatedTimeDown = this.$dayjs(item.estimatedTime).diff(this.$dayjs(), "second")
									
									item.newPickUpTime = item.pickUpTime.slice(5)
									item.newEstimatedTime = item.estimatedTime.slice(5)
									
									
									this.countDown(item.endPickTimer, index, item, 1)
									this.countDown(item.estimatedTimeDown, index, item, 2)
									
									clearInterval(this.pickUpTimerFlag[index])
									
									this.pickUpTimerFlag[index] = null;
									this.pickUpTimerFlag[index] = setInterval(() => {
										// item.endPickTimer = --item.endPickTimer
										// this.$set(this.orderList[index], "endPickTimers", --item.endPickTimer)
										item.endPickTimer--
										item.estimatedTimeDown--
										// console.log(item.endPickTimer)
										if (item.endPickTimer <= 0) {
											item.hour = 0
										    item.minute = 0
										    item.second = 0
											item.endPickTimer = 0
											this.endOfTime(index)
											return
										}
										if (item.estimatedTimeDown <= 0) {
											item.sendhour = 0
										    item.sendminute = 0
										    item.sendsecond = 0
											item.estimatedTimeDown = 0
											this.endOfTime(index)
											return
										}
										
										this.countDown(item.endPickTimer, index, item, 1)
										this.countDown(item.estimatedTimeDown, index, item, 2)
									}, 1000)
								})
							}
							
							
							this.swiperItem3 = this.orderList
							console.log(this.swiperItem3)
							// this.swiperItem3.forEach(item => {
							// 	// this.priceArr3.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 3) {
							
							
							if (this.orderList.length) {
								this.orderList.forEach((item, index) => {
									
									item.estimatedTimeDown = this.$dayjs(item.estimatedTime).diff(this.$dayjs(), "second")
									this.countDown(item.estimatedTimeDown, index, item, 1)
									clearInterval(this.estimatedTimerFlag[index])
									this.estimatedTimerFlag[index] = null;
									this.estimatedTimerFlag[index] = setInterval(() => {
										
										// item.endPickTimer = --item.endPickTimer
										// this.$set(this.orderList[index], "estimatedTimeDowns", --item.estimatedTimeDown)
										item.estimatedTimeDown--
										// console.log(item.estimatedTimeDown)
										if (item.estimatedTimeDown <= 0) {
											item.estimatedTimeDown = 0
											this.endOfTime(index)
											return
										}
										this.countDown(item.estimatedTimeDown, index, item, 1)
									}, 1000)
								})
							}
							
							this.swiperItem4 = this.orderList
							// console.log(this.orderList)
							// this.swiperItem4.forEach(item => {
							// 	// this.priceArr4.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 4) {
							this.swiperItem5 = this.orderList
							
							// this.swiperItem5.forEach(item => {
							// 	// this.priceArr5.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 5) {
							this.swiperItem6 = this.orderList
							
							// this.swiperItem6.forEach(item => {
							// 	// this.priceArr6.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 6) {
							this.swiperItem7 = this.orderList
							
							// this.swiperItem7.forEach(item => {
							// 	// this.priceArr7.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
						if (this.currentIndex == 7) {
							this.swiperItem8 = this.orderList
							// this.swiperItem8.forEach(item => {
							// 	// this.priceArr8.push((item.payAmount - item.goodsPredictAmount).toFixed(2))
							// })
						}
				
						if(this.orderList.length >= res.total){
							this.hasFlag = false
						}
					} else {
						
					
					}
					setTimeout(()=>{
						uni.hideLoading()
					},500)
				} else {
					// console.log('执行')
					
					if (this.orderList.length == 0 && this.currentIndex == 0) {
						
						this.swiperItem1 = []
						
					}
					if (this.orderList.length == 0 && this.currentIndex== 1) {
						this.swiperItem2 = []
					}
					if (this.orderList.length == 0 && this.currentIndex == 2) {
						this.swiperItem3 = []
					}
					if (this.orderList.length == 0 && this.currentIndex == 3) {
						this.swiperItem4 = []
					}
					if (this.orderList.length == 0 && this.currentIndex == 4) {
						this.swiperItem5 = []
					}
					if (this.orderList.length == 0 && this.currentIndex == 5) {
						this.swiperItem6 = []
					}
					if (this.orderList.length == 0 && this.currentIndex == 6) {
						this.swiperItem7 = []
					}
					this.hasFlag = false
				}
			
				
			
			
				
			},
			// 倒计时处理 传入的是秒数
			countDown(seconds, i, item, type){
				// console.log(seconds)
			    //如果传递的值大于0
				
			    if (seconds > 0) {
			        //转换时间
					if (type === 1) {
						this.$set(item, 'hour',  Math.floor(seconds / (60 * 60)))
										
						this.$set(item, 'minute', Math.floor(seconds / 60) - (item.hour * 60))
										
						this.$set(item, 'second', Math.floor(seconds) - (item.hour * 60 * 60) - (item.minute * 60))
									
						   //判断时间是否大于10 
						    if (item.hour < 10) {
						    	item.hour = "0" + item.hour
						    }
						    if (item.minute < 10) {
						    	item.minute = "0" + item.minute
						    }
						    if (item.second < 10) {
						    	item.second = "0" + item.second
						    }
					} else {
						this.$set(item, 'sendhour',  Math.floor(seconds / (60 * 60)))
										
						this.$set(item, 'sendminute', Math.floor(seconds / 60) - (item.sendhour * 60))
										
						this.$set(item, 'sendsecond', Math.floor(seconds) - (item.sendhour * 60 * 60) - (item.sendminute * 60))
									
						   //判断时间是否大于10 
						    if (item.sendhour < 10) {
						    	item.sendhour = "0" + item.sendhour
						    }
						    if (item.sendminute < 10) {
						    	item.sendminute = "0" + item.sendminute
						    }
						    if (item.sendsecond < 10) {
						    	item.sendsecond = "0" + item.sendsecond
						    }
					}
					
			    } else {
			        //结束时间
			    	this.endOfTime(i)
			    }
			},
			// 清除定时器
			endOfTime (i) {
				clearInterval(this.pickUpTimerFlag[i])
				this.pickUpTimerFlag[i] = null;
				clearInterval(this.estimatedTimerFlag[i])
				this.estimatedTimerFlag[i] = null
			},
			//去评价
			goToEvaluate(id) {
				
				uni.navigateTo({
					url: '../evaluate/evaluate?orderId=' + id
				})
			},
			// 删除
			async deleteOrder (id, e, refreshIndex) {
				
				if (refreshIndex) {
					let res = await this.$fetch(this.$api.orderDisplay, {id}, 'POST', 'form')
					
				} else {
					uni.showModal({
					    title: '删除订单',
					    content: '确定删除订单么?',
					    success: async (res) => {
					        if (res.confirm) {
					            let res = await this.$fetch(this.$api.orderDisplay, {id}, 'POST', 'form')
								if (res.data) {
									if (this.currentIndex == 4) {
										for (let i = 0; i < this.swiperItem5.length; i++) {
											if (this.swiperItem5[i].id == id) {
												this.swiperItem5.splice(i, 1)
											}
										}
									}
									if (this.currentIndex == 5) {
										for (let i = 0; i < this.swiperItem6.length; i++) {
											if (this.swiperItem6[i].id == id) {
												this.swiperItem6.splice(i, 1)
											}
										}
									}
									if (this.currentIndex == 6) {
										for (let i = 0; i < this.swiperItem7.length; i++) {
											if (this.swiperItem7[i].id == id) {
												this.swiperItem7.splice(i, 1)
											}
										}
									}
									// 删除会跳到上一页 所以带上了1  直接不要了 进行数组删除就完事了
									// this.handleCurrent(this.currentIndex, e, 1)
									
								}
					        } else if (res.cancel) {
					            
					        }
					    }
					});
				}
				
			},
			//滑动轮播图
			swiperChange(e){
				
				this.timerId && clearTimeout(this.timerId)
				this.timerId = setTimeout(() => {
			
				// this.handleCurrent(e.detail.current)
				
				if (this.switchTabFlag) {
					
					// this.toChildView = this.scrollList[this.currentIndex].id
					
					this.currentIndex = e.detail.current
					let toChildViewId = e.detail.current == 0 ? this.scrollList[e.detail.current].id : this.scrollList[e.detail.current - 1].id
					this.toChildView = toChildViewId
					this.hasFlag = true
					this.orderList = []
					this.i = 0
					this.orderArr = []
					this.orderArrLength = 0
					this.priceArr = []
					this.scrollLeft = this.currentIndex * this.scrollWidth  
					this.initOrder()
				}
				this.switchTabFlag = true
				},500)
				
				
			},
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			//触底
			scrollBottom(){
				this.i += 10
				if(this.hasFlag){
					this.initOrder()
				}
			},
			//监听下拉多少 开启下拉刷新
			watchScrollY(e){
				// console.log(e)
				if (e.detail.scrollTop <= 20) {
					this.currentWebview.setStyle({
					  pullToRefresh: {  
					    support: false,  
						style: plus.os.name === 'Android' ? 'circle' : 'default'  
					  }  
					});  
					this.secondsSCT = 0
				} else {
					this.currentWebview.setStyle({
					  pullToRefresh: {  
					    support: false,  
					  }  
					});  
				}
				
			},
			closeCancelModel (index) {
				this.showCancelModel = !this.showCancelModel
			},
			async cancelModelProp () {
				let res = await this.$fetch(this.$api.orderCancelProp, {}, 'GET' , 'form')
				this.cancelTimer = res.data.time
				this.cancelPrice = res.data.price
			}
		},
		onPullDownRefresh(){
		setTimeout(()=>{
			this.hasFlag = true
			this.orderList = []
			this.i = 0
			this.orderArr = []
			this.orderArrLength = 0
			this.priceArr = []
			this.initOrder()
			uni.stopPullDownRefresh()
		})
	}
	}
</script>

<style lang="less" >
	page::after{
		display: none;
	}
	page{
		background-color: rgb(247,247,250);
	}
	.order{
		width: 100%;
		// height: 100%;
		
		.order-header{
			width: 100%;
			height: 64rpx;
			// padding-top: 52rpx;
			padding-bottom: 12rpx;
			box-shadow: 0 0 0 0 rgba(0,0,0,0.07);
			border-bottom: 10rpx solid rgb(247,247,250);
			background-color: #fff;
			display: flex;
			// justify-content: center;
			align-items: center;
			position: fixed;
			z-index: 999;
			// top:40rpx;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height); //覆盖样式
			/*  #endif  */
			.header-title{
				font-family: PingFangSC-Regular;
				font-size: 17px;
				color: #09023E;
				text-align: center;
				line-height: 32rpx;
				margin-left: 310rpx;
				margin-right: 236rpx;
				box-sizing: border-box;
			}
			.header-search{
				width: 38rpx;
				height: 38rpx;
			}
		}
		.scroll{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			padding: 0 30rpx;
			
			box-sizing: border-box;
			background-color: #fff;
			position: fixed;
			// top:128rpx;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height); //覆盖样式
			/*  #endif  */
			transform: translateY(64rpx);
			z-index: 999;
			border-top: 1rpx solid #f7f7fa;
			box-sizing: border-box;
			.scroll-box{
				white-space: nowrap;
				overflow-x: hidden;
				.scroll-item-box{
					display: inline-block;
					.scroll-item{
						display: inline-block;
						margin-left: 50rpx;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9,2,62,0.30);
						border-right: 1rpx solid transparent;
						border-left: 1rpx solid transparent;
						box-sizing: border-box;
						&:first-child{
							margin-left: 0;
						}
						&.on{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #5468FF;
							text-align: center;
							// transition: all 0.4s linear;
						}
					}
				}
			}
		}
		.center-text{
			font-size: 14px;
			color: #ccc;
			position: absolute;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
		}
		.swiper-scroll{
			width: 100%;
			// height: 1500rpx;
		}
		.swiper{
			width: 100%;
			// padding-bottom: 100rpx;
			box-sizing: border-box;
			.swiper-main{
				// margin-top: 30rpx;
				margin-bottom: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				padding: 26rpx 30rpx 32rpx 30rpx;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				border-radius: 7px;
				box-sizing: border-box;
				&:nth-child(1){
					margin-top: 248rpx;
					box-sizing: border-box;
				}
				.main-header{
					border-bottom: 1rpx solid #FBFAF8;
					padding-bottom: 20rpx;
					box-sizing: border-box;
					background-color: #fff;
					.header-top{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.top-box{
							display: flex;
							align-items: center;
							.order-number{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #09023E;
								
							}
							.order-num{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #09023E;
								margin-left: 20rpx;
								margin-right: 10rpx;
								box-sizing: border-box;
							}
							.copy{
								width: 24rpx;
								height: 24rpx;
								box-sizing: border-box;
								// position: relative;
								// top: 50%;
								// transform: translateY(50%);
								// box-sizing: border-box;
							}
						}
						
						.header-button{
							width: 120rpx;
							height: 46rpx;
							line-height: 46rpx;
							background: #5468FF;
							border-radius: 12px;
							border-radius: 12px;
							// margin-left: 54rpx;
							box-sizing: border-box;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FFFFFF;
							text-align: center;
							&.waittake{
								width: 96rpx;
								height: 40rpx;
								line-height: 40rpx;
								text-align: center;
								background: rgba(255,193,0,0.25);
								border-radius: 2px;
								border-radius: 2px;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #FFAF00;
								box-sizing: border-box;
							}
							&.waitgather{
								width: 96rpx;
								height: 40rpx;
								line-height: 40rpx;
								text-align: center;
								background: rgba(255,133,22,0.20);
								border-radius: 2px;
								border-radius: 2px;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #FF8516;
								box-sizing: border-box;
							}
							&.complete{
								width: 96rpx;
								height: 40rpx;
								line-height: 40rpx;
								text-align: center;
								background: rgba(84,104,255,0.20);
								border-radius: 2px;
								border-radius: 2px;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #5468FF;
								box-sizing: border-box;
							}
						}
					}
					.header-bottom{
						display: flex;
						.sub-time{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #09023E;
							margin-right: 20rpx;
							box-sizing: border-box;
						}
						.create-time{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #09023E;
						}
					}
				}
				.main-center{
					width: 100%;
					margin-top: 30rpx;
					padding-bottom: 30rpx;
					background-color: #fff;
					display: flex;
					box-sizing: border-box;
					border-bottom: 1rpx solid #FBFAF8;
					.center-left{
						width: 42rpx;
						margin-top: 46rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						.left-top,.left-bottom{
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
						.left-bottom{
							border: 1rpx solid #5468FF;
							color: #5468FF;
						}
						.left-line{
							width: 0;
							height: 52%;
							border-left: 2rpx dashed #fff;
							background: linear-gradient(to bottom, #09023E, #5468FF);
							background-origin: border-box;
							.content {
								height: 100px;
								background-color: #fff;
							}
											
						}
					}
					.center-right{
						width: 100%;
						padding-left: 20rpx;
						box-sizing: border-box;
						.right-top{
							&.top-title-child {
								height: 120rpx;
								line-height: 120rpx;
								font-family: PingFangSC-Semibold;
								font-size: 20px;
								color: #5468FF;
								font-weight: bold;
							}
							.right-top-header{
								// width: 80%;
								display: flex;
								justify-content: space-between;
								// white-space: nowrap;
								// text-overflow: ellipsis;
								// overflow: hidden;
								display: -webkit-box;
								-webkit-box-orient: vertical;    
								-webkit-line-clamp: 1;    //控制行数
								overflow: hidden;
								.top-title{
									font-family: PingFangSC-Semibold;
									font-size: 20px;
									color: #09023E;
									font-weight: bold;
								}
								
								.top-dist{
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #09023E;
								}
							}
							.right-top-center{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #09023E;
								display: -webkit-box;    
								-webkit-box-orient: vertical;    
								-webkit-line-clamp: 2;    //控制行数
								overflow: hidden;
							}
							.right-top-footer{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(9,2,62,0.30);
							}
							
						}
						.buyTimerDJS{
							font-size: 16px;
							font-weight: bold;
						
							span{
								color: #d32928;
							}
						}
						.right-bottom{
							padding-top: 48rpx;
							box-sizing: border-box;
							.right-bottom-header{
								display: flex;
								justify-content: space-between;
								.bottom-title{
									font-family: PingFangSC-Semibold;
									font-size: 20px;
									color: #5468FF;
									font-weight: bold;
								}
								.bottom-dist{
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #5468FF;
								}
							}
							.right-bottom-center{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #5468FF;
								display: -webkit-box;    
								-webkit-box-orient: vertical;    
								-webkit-line-clamp: 2;    //控制行数
								overflow: hidden;
							}
							.right-bottom-footer{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(9,2,62,0.30);
							}
							.buyTimerDJS{
								font-size: 16px;
								font-weight: bold;
								color: #4658c5;
								span{
									color: #d32928;
								}
							}
						}
					}
				}
				.main-bottom{
					// height: 120rpx;
					width: 100%;
					margin-top: 32rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					background-color: #fff;
					align-items: center;
					.bottom-left{
						// display: flex;
						// align-items: center;
						.total{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(9,2,62,0.30);
						}
						.price{
							font-family: PingFangSC-Semibold;
							font-size: 20px;
							color: #5468FF;
						}
						.bottom-left-top{
							display: flex;
							align-items: center;
						}
						.bottom-left-bottom{
							display: flex;
							align-items: center;
						}
					}
					.bottom-right{
						display: flex;
						.cancel-order,.detail-order{
							width: 160rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							// border: 1px solid rgba(9,2,62,0.50);
							border-radius: 15px;
							border-radius: 15px;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(9,2,62,0.50);
							letter-spacing: -0.34px;
							box-sizing: border-box;
						}
						.detail-order{
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
				}
			
			}
		}
		.orderCancelModel{
			position: fixed;
			left: 0;
			top:0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.4);
			z-index: 999;
			.orderCancelModel-Wrapper{
				width: 600rpx;
				
				// background-color: rgb(242, 234, 234);
				background-color: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				padding: 30rpx;
				border-radius: 12rpx;
				overflow: hidden;
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
					padding-top: 15rpx;
					box-sizing: border-box;
					.cancelModel-center-top{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 16px;
						// color: rgb(125, 125, 129);
						
					}
					.cancelModel-center-bottom{
						font-family: PingFangSC;
						// font-weight: 400;
						font-weight: bold;
						font-size: 16px;
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
			z-index: 999;
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
		.pullDownPage{
			width: 100%;
			padding-top: 220rpx;
			padding-bottom: 10rpx;
			text-align: center;
			font-size: 14px;
		}
	}
	
</style>
<style>
	.downwarp-tip{
		transform: translateY(170rpx) !important;
	}
	.mescroll-downwarp .downwarp-progress {
		transform: translateY(170rpx) !important;
	}
</style>