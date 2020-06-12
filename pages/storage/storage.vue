<template>
	<view class="storage">
		<Status />
		<view class="storage-header">
			<view class="back" @tap="goBack"><image src="../../static/img/index/left.png" mode="aspectFill"></image></view>
			<view class="header-title">{{ car == 0 ? 'GG来送' : '小汽车' }}</view>
			<view class="header-sectitle">3公里1小时内到达</view>
		</view>
		<view class="storage-scroll" v-if="Number(car) === 0">
			<view class="scroll-item" v-for="(scroll, index) in scrollList" :key="index" :class="{ on: index === scrollIndex }" @tap="handleScrollIndex(index)">{{ scroll }}</view>
		
		</view>
		<view class="storage-scroll" v-if="Number(car) === 1"> 
			<view class="scroll-item"  v-for="(scroll, index) in carScrollList" :key="index" :class="{ on: index === scrollIndex }" @tap="handleScrollIndex(index)">{{ scroll }}</view>
		</view>
		<view class="textArea-box"   v-if="scrollIndex === 2" style="padding-top: 220rpx;">
			<textarea value="" placeholder="输入你想要买的商品，比如：红牛一厅" class="helpBuyTextArea"  @blur = "setHelpBuyInfo"  v-model="helpBuyTextArea"/>
			<view class="needxiaopiao" @tap.stop="needTicket">
				<view class="xiaopiao-circle" :class="{ on: xiaopiaoCircle }"></view>
				需要小票,按小票结算
			</view>
		</view>
		<scroll-view scroll-y="true" :class="{'scrollPadding': scrollIndex !== 2 }"> 
			<view class="storage-address">
				<view class="address-item-header" v-if="scrollIndex === 2">
					<view class="item-header-title">选择方式</view>
					<view class="item-header-assign" :class="{ on: index === assignIndex }" v-for="(item, index) in assignList" :key="index" @tap="hangdleAssignIndex(index)">
						{{ item }}
					</view>
					<!-- <view class="item-header-nearby"></view> -->
				</view>
				<!-- <view class="address-item bdt" v-if="scrollIndex !== 2 || assignIndex !== 0 "> -->
				<view class="address-item bdt" >
 					<view class="address-left">
						<view class="circle" v-if="scrollIndex !== 2 ">取</view>
						<view class="circle" v-else>买</view>
						<view class="fillInfo" @tap="goToEdit(0)" v-if="sendAddressShow">请详细填写取件人、地址信息</view>
						<view class="address-center" @tap="goToEdit(sendAddress, 0, sendAddress.id)" v-else :class="{'bdr' : scrollIndex === 2 }">
							<view class="center-top" v-if="assignIndex === 0 && scrollIndex !== 2">
								<!-- <view class="user-name" :class="{'user-name-change' : sendAddress.editAddress.name.length > 9}">{{ sendAddress.editAddress.name }}</view> -->
								<view class="user-name" >{{ sendAddress.editAddress.name }}</view>
								<!-- <view class="user-phone" >{{ sendAddress.mobile }}</view> -->
								<!-- <view class="user-phone" style="padding-right:10rpx ;">{{ sendAddress.mobile }}</view> -->
							</view>
						<!-- 	<view class="center-top" v-else-if="assignIndex === 1">
								<view class="user-name" v-if="sendAddress.editAddress.name">{{ sendAddress.editAddress.name }}</view>
								<view class="user-name" v-else>{{ sendAddress.addressDetail[2] }}</view>
							</view> -->
							<!-- <view class="center-top" v-else-if="assignIndex === 0 ">
								<view class="user-name" >骑手就近购买</view>
							</view> -->
							<view class="center-top" v-if="scrollIndex == 2 && assignIndex == 0">
								<view class="user-name" >骑手就近购买</view>
							</view>
							<view class="center-top" v-if="assignIndex === 1">
								<view class="user-name" v-if="sendAddress.editAddress.name">{{ sendAddress.editAddress.name }}</view>
								<view class="user-name" v-else>{{ sendAddress.addressDetail[2] }}</view>
							</view>
							
							<view class="center-bottom" v-if="scrollIndex !== 2 || assignIndex !== 0">{{ sendAddress.editAddress.address || sendAddress.addressDetail[0] }}</view>
							<view class="center-bottom-user"  v-if="scrollIndex !== 2">
								<view class="user-phone" style="margin-right:20rpx ;">{{ sendAddress.name }}</view>
								<view class="user-phone" v-if=" sendAddress.name != sendAddress.mobile" >{{ sendAddress.mobile }}</view>
							</view>
						</view>
					</view>
					<view class="address-right" @tap.stop="goToAddress(0)" v-if="scrollIndex !== 2">地址簿</view>
				</view>
				<view class="address-item ">
					<view class="address-left">
						<!-- <view class="circle end" v-if="scrollIndex !== 2 || helpBuy === 1">收</view> -->
						<view class="circle end" v-if="scrollIndex !== 2">达</view>
						<view class="circle end" v-if="scrollIndex === 2 ">收</view>
						<view class="fillInfo" @tap="goToEdit(1)" v-if="endAddressShow">请详细填写收件人、地址信息</view>
						<view class="address-center" v-else @tap.stop="goToEdit(endAddress, 1, endAddress.id)">
							<view class="center-top" v-if="scrollIndex === 2 && assignIndex === 0">
								<view class="user-name">{{ endAddress.editAddress.name }}</view>
							</view>
							<view class="center-top" v-else>
								
								<!-- <view class="user-name">{{ endAddress.name }}</view> -->
								<!-- <view class="user-name " :class="{'user-name-change' : endAddress.editAddress.name.length > 9}">{{ endAddress.editAddress.name }}</view> -->
								<view class="user-name ">{{ endAddress.editAddress.name }}</view>
								<!-- <view class="user-phone">{{ endAddress.mobile }}</view> -->
								<!-- <view class="user-phone" style="padding-right:10rpx ;">{{ endAddress.mobile }}</view> -->
								
							</view>
							<view class="center-bottom">{{ endAddress.editAddress.address }}</view>
							<view class="center-bottom-user">
								<view class="user-phone" style="margin-right:20rpx ;">{{ endAddress.name }}</view>
								<view class="user-phone"  v-if=" endAddress.name != endAddress.mobile">{{ endAddress.mobile }}</view>
							</view>
						</view>
					</view>
					<view class="address-right " @tap.stop="goToAddress(1)" :class="{'nearBuy' : scrollIndex === 2 && helpBuy === 0}">地址簿</view>
				</view>
			</view>

			<view class="storage-item-box" :class="{changebdPad:scrollIndex === 2}">
				<view class="storage-item baojia" @tap="pickTimer" v-if="scrollIndex != 2">
					<!-- <view class="item-left"><image src="../../static/img/order/qujiantimer.png" mode=""></image>取件时间</view> -->
				<!-- 	<view class="item-right">
						<view>{{ showChoiceTime ? showChoiceTime : '马上取件' }}</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view> -->
					
					<view class="item-left">
						<!-- <view class="item-left-top">保价金（¥{{car == 0 ? 3 : 5}}）</view> -->
						<view class="item-left-top"><image src="../../static/img/order/qujiantimer.png" mode=""></image>取件时间</view>
						<view class="item-left-bottom">骑手会在30分钟内上门取件</view>
					</view>
					<view class="item-right">
						<view>{{ showChoiceTime ? showChoiceTime : '马上取件' }}</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				
				<view class="storage-item" @click="closeShopAppraisement" v-if="scrollIndex === 2">
					<view class="item-left">商品预估价</view>
					<view class="item-right">
						<view class="place" v-if = "shopInfo.price" >{{ shopInfo.price + '元' }}</view>
						<view class="place" v-else style="color: rgba(9,2,62,0.30);">实际价格以骑手发票为准,多退少补</view>
						
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				
				<view class="storage-item baojia" @tap="goToShopInfo" v-else>
				<!-- 	<view class="item-left"><image src="../../static/img/order/shopinfo.png" mode=""></image>商品信息</view>
					<view class="item-right">
						<view class="place" v-if="JSON.stringify(shopInfo) == '{}'" style="color: rgba(9,2,62,0.30);">请填写</view>
						<view class="place" v-else-if="scrollIndex == 2">{{ shopInfo.main + ',' + shopInfo.price + '元' }}</view>
						<view class="place" v-else>{{ shopInfo.main + ',' + shopInfo.weight + '公斤内,' + shopInfo.price + '元' }}</view>

						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view> -->
					
					<view class="item-left">
						<!-- <view class="item-left-top">保价金（¥{{car == 0 ? 3 : 5}}）</view> -->
						<view class="item-left-top"><image src="../../static/img/order/shopinfo.png" mode=""></image>商品信息</view>
						<view class="item-left-bottom">请认真填写包裹信息</view>
					</view>
					<view class="item-right item-right-shopInfo">
						<view class="place" v-if="JSON.stringify(shopInfo) == '{}'" style="color: rgba(9,2,62,0.30);"><span style = "color: #ef392b; display: inline-block;padding-right: 8rpx;font-size: 16px;">*必填</span>请填写</view>
						<view class="place" v-else-if="scrollIndex == 2">{{ shopInfo.main + ',' + shopInfo.price + '元' }}</view>
						<view class="place item-right-shopInfo" v-else>{{ shopInfo.main + ',' + shopInfo.weight + '公斤内,' + shopInfo.price + '元' }}</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				
			
				
				<view class="storage-item baojia" @tap="goToDiscount">
					<!-- <view class="item-left"><image src="../../static/img/order/youhui.png" mode=""></image>优惠券</view>
					<view class="item-right">
						<view class="place" v-if="JSON.stringify(discount) == '{}'" style="color: rgba(9,2,62,0.30);">请选择</view>
						<view class="place" v-else>{{ discount.type === 0 ? discount.value + '元' : discount.value * 100 + '折' }}</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view> -->
					
					<view class="item-left">
						<!-- <view class="item-left-top">保价金（¥{{car == 0 ? 3 : 5}}）</view> -->
						<view class="item-left-top"><image src="../../static/img/order/youhui.png" mode=""></image>优惠券</view>
						<view class="item-left-bottom">选择合适的优惠券更优惠</view>
					</view>
					<view class="item-right">
						<view class="place" v-if="JSON.stringify(discount) == '{}'" style="color: rgba(9,2,62,0.30);">请选择</view>
						<view class="place" v-else>{{ discount.type === 0 ? discount.value + '元' : discount.value * 100 + '折' }}</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<!-- <view class="storage-item">
					<view class="item-left">签收码</view>
					<view class="item-right"><switch :checked="signCode" @change="handleSignCode"></switch></view>
				</view> -->
				<view class="storage-item baojia" v-if="scrollIndex != 2">
					<view class="item-left">
						<!-- <view class="item-left-top">保价金（¥{{car == 0 ? 3 : 5}}）</view> -->
						<view class="item-left-top"><image src="../../static/img/order/baojia.png" mode=""></image>保价服务（¥{{ orderProperty }}）</view>
						<view class="item-left-bottom">开启保价服务商品遗失损坏最高赔付500元</view>
					</view>
					<view class="item-right"><switch :checked="goldCode" @change="handleGoldCode"></switch></view>
				</view>
				<view class="storage-item jiaji" v-if="rightIndex === 999">
					<view class="item-left">
						<view class="item-left-top"><image src="../../static/img/order/jiaji.png" mode=""></image>加急专送</view>
						<view class="item-left-bottom">开启加急专送，一对一直达，每公里加收1元，缩短1/3时间</view>
					</view>
					<view class="item-right"><switch :checked="urgentCode" @change="handleUrgentCode"></switch></view>
				</view>
				<view class="storage-item" v-if="scrollIndex === 2">
					<view class="item-left"><image src="../../static/img/order/qianshou.png" mode=""></image>签收码</view>
					<view class="item-right"><switch :checked="signCode" @change="handleSignCode"></switch></view>
				</view> 
				
				<view class="storage-item">
			<!-- 		<view class="item-left">
						<image src="../../static/img/order/redbag.png" mode=""></image>打赏小费
						<text>(车手不易，打赏点小费)</text>
					</view>
					<view class="item-right">
						<picker :range="grant" @change="selectedGrant">
							<view class="place" style="color: rgba(9,2,62,0.30);" v-if="giveGrant === ''|| giveGrant === 0">请选择</view>
							<view class="place" v-else>{{ giveGrant + '元' }}</view>
						</picker>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view> -->
					
					<view class="item-left" >
						<!-- <view class="item-left-top">保价金（¥{{car == 0 ? 3 : 5}}）</view> -->
						<view class="item-left-top"><image src="../../static/img/order/redbag.png" mode=""></image>打赏小费</view>
						<view class="item-left-bottom">加点小费接单会更快哦</view>
					</view>
					<view class="item-right">
						<picker :range="grant" @change="selectedGrant">
							<view class="place" style="color: rgba(9,2,62,0.30);" v-if="giveGrant === ''|| giveGrant === 0">请选择</view>
							<view class="place" v-else>{{ giveGrant + '元' }}</view>
						</picker>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="storage-item" v-if="scrollIndex !== 2">
					<view class="item-left">保温箱</view>
					<view class="item-right"><switch :checked="stayWarmCode" @change="handleStayWarmCode"></switch></view>
					<view class="storage-item-line"></view>
					<view class="item-left">签收码</view>
					<view class="item-right"><switch :checked="signCode" @change="handleSignCode"></switch></view>
				</view> 
				<view class="storage-item" @click="goToRemark">
					<view class="item-left">备注</view>
					<view class="item-right">
						<input
							type="text"
							class="item-right-remark"
							v-model="remark"
							placeholder="请填写"
							placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: 0;text-align: right;"
							disabled="true"
						/>
					</view>
				</view>
			</view>
		
		</scroll-view>
	<view class="storage-footer" v-if="scrollIndex !== 2">
		<view class="footer-left">
			<view class="fl-top">
				<view class="flt-left">
					<view class="total-price">总计：</view>
					<view class="price" :class="{ priceActive: JSON.stringify(orderComputed) != '{}' }">
						¥{{ orderComputed.payAmount ? orderComputed.payAmount : 0 }}
					</view>
				</view>
				<view class="flt-right" @tap="goTofreight(0)">
					<view class="freight">运费明细</view>
					<image src="../../static/img/index/up.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="flt-bottom">3公里内：1小时内送达</view>
		</view>
		<view class="footer-right" @tap="handleBilldetail">确认下单</view>
	</view>
	<view class="storage-footer column-footer" v-else>			<view class="newpopups-footer-top">				<view class="newpopups-footer-top-l">					<view class="paotuifei">跑腿费: <span>￥{{orderComputed.taskReward ? orderComputed.taskReward : 0}}</span></view>					<view class="paotuifei">预付金: <span>￥{{orderComputed.goodsPredictAmount ? orderComputed.goodsPredictAmount : 50}}</span></view>				</view>				<view class="newpopups-footer-left-top-c">					合计: <span>￥{{orderComputed.payAmount ? orderComputed.payAmount : 50}}</span>				</view>				<view class="newpopups-footer-left-top-r" @tap="handleBilldetail">					确认下单				</view>			</view>			<view class="newpopups-footer-bottom">				<view class="newpopups-footer-bottom-l" @tap="choiceHelpbuyCircle">					<!-- <view class="newpopups-footer-left-bottom-circle"></view> -->
					<view class="horseman-circle" :class="{ on: helpbuyCircle }"></view>					<view>我已阅读并同意<span @tap.stop = "goToRichText(38)">《帮买服务协议》</span></view>				</view>				<view class="newpopups-footer-bottom-r" @tap = "goTofreight(1)">					费用明细				</view>			</view>		</view>
		<!-- 有无运力 -->
		<view class="horseman-box" v-if="horseman">
			<view class="horseman-item">
				<view class="close" @tap="handleHorsemanShow"><image src="../../static/img/order/close.png" mode="aspectFill"></image></view>
				<view class="horseman-box-center">
					<view class="center-header"><image src="../../static/img/order/zhuyi.png" mode="aspectFill"></image></view>
					<view class="center-center">周围无运力</view>
					<div class="center-footer" >
						{{Nhorseman ? '该时间段' : '当前发货地周围'}}暂无运力，建议取消订单稍后再试。若需继续发单，建议您多支付
						<text class="ft-text">¥{{newAddPrice}}</text>
						给骑手小哥从远处安排过来哦～
					</div>
				</view>
				<view class="horseman-middle">
					<view class="horseman-circle" @tap="handleHorsemanCircle" :class="{ on: horsemanCircle }"></view>
					<view class="horseman-reader" @tap="handleHorsemanCircle">已阅读并同意</view>
					<view class="horseman-protocol" @tap="goToRichText(RichText[0].id)">《{{ RichText[0].articleTitle }}》</view>
				</view>
				<view class="horseman-button-box">
					<view class="horseman-button-left" @tap="continueOrder">继续发单</view>
					<view class="horseman-button-right" @tap="handleHorsemanShow">取消发单</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="shopAppraisement" v-show="shopAppraisement" @click.stop="closeShopAppraisement"> -->
		<view class="shopAppraisement" v-show="shopAppraisement" >
			<view class="shopAppraisement-wrapper" :class="{newTop: platform == 'ios'}">
				<view class="shopAppraisement-header" @click.stop="closeShopAppraisement">
					<view>填写商品估价</view>
					<image src="../../static/img/order/closeBlack.png" mode="aspectFill" ></image>
				</view>
				<view class="shopAppraisement-center">
						<view class="yufu">预付金: <span>¥50</span></view>
						<view class="center-tip">说明：如骑手已购买商品，用户取消订单，预付金不予退还</view>
						<view class="center-input-box">
							<view class="shopAppraisement-input-left">估价: ¥</view>
							<input type="number" :adjust-position = 'false' placeholder="估价仅拱骑手参考，平台不扣除资金" placeholder-style="font-size: 12px" :focus = 'shopAppraisement' v-model="appraisement">
						</view>
						<view class="center-bottom-tip">估价拱骑手参考，实际价格以骑手发票为准，私下交易，多退少补。（最高500元）</view>
				</view>
				<view class="shopAppraisement-bottom" @click.stop="closeShopAppraisement">
					<view class="shopAppraisement-bottom-submit" @click="setHelpBuyInfo">确定</view>
				</view>
			</view>
		</view>

		<!-- 取件弹框 -->
		<uni-popup ref="popup" type="bottom" class="popup">
			<view class="pop-left">
				<view class="pop-left-day">
					<view class="day" v-for="(day, index) in day" :key="index" @tap="handleDayIndex(index)" :class="{ on: index === dayIndex }">{{ day }}</view>
				</view>
			</view>
			<view class="pop-right">
				<scroll-view scroll-y="true">
					<view class="right-timer-box">
						<view class="timer-item takenow" v-if="dayIndex === 0" @tap="initTakeNow">
							<view class="item-left" :class="{ acitve: rightIndex === 999 }">马上取件</view>
							<image src="../../static/img/index/duihou.png" mode="aspectFill" v-if="rightIndex === 999"></image>
						</view>
						<view class="timer-item" v-for="(item, index) in timeList" :key="index" @tap="handleRight(item, index)" v-if="dayIndex === 0">
							<view class="item-left second-left" :class="{ acitve: index === rightIndex }">{{ item.text }}</view>
							<image src="../../static/img/index/duihou.png" mode="aspectFill" v-if="index === rightIndex"></image>
						</view>

						<view class="timer-item" v-if="!timeList.length" v-for="(item, index) in timer" :key="index" @tap="handleRight(item, index)">
							<view class="item-left second-left" :class="{ acitve: index === rightIndex }">{{ item.text }}</view>
							<image src="../../static/img/index/duihou.png" mode="aspectFill" v-if="index === rightIndex"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="pop-button" @tap="popSubmit">确定</view>
		</uni-popup>

		<!-- 确认下单弹框 -->
		<uni-popup ref="popups" type="bottom" >
			<view class="popups-showBox" v-show="priceDetailshow">
				<view class="popups-header">
					<view class="popups-header-left">费用明细</view>
					<view class="popups-header-right" @tap="goToRichText(37)">
						<view class="price-rule">价格规则</view>
						<image src="../../static/img/my/right.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="popups-main">
					<view class="popuos-main-item">
						<view class="main-item-left">起步价</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.startPrice }}</view>
					</view>
					<view class="popuos-main-item">
						<view class="main-item-left">保价金</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.premium }}</view>
					</view>
		
					<view class="popuos-main-item" v-if="orderComputed.extraMileagePrice">
						<view class="main-item-left">超里程</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.extraMileagePrice }}</view>
					</view>
					
					<view class="popuos-main-item" v-if="orderComputed.urgentExpressPrice">
						<view class="main-item-left">加急专送</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.urgentExpressPrice }}</view>
					</view>
					
					<view class="popuos-main-item" v-if="scrollIndex === 2">
						<view class="main-item-left">预付金</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.goodsPredictAmount }}</view>
					</view>
					<view class="popuos-main-item" v-if="orderComputed.otherPrice">
						<view class="main-item-left">其他</view>
						<view class="main-item-right">¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : orderComputed.otherPrice }}</view>
					</view>
				
					<view class="popuos-main-item" v-if="!(JSON.stringify(discount) == '{}')">
						<view class="main-item-left">{{ discount.type === 0 ? discount.value + '元优惠券（限余额支付）' : discount.value + '折优惠券（限余额支付）' }}</view>
						<view class="main-item-right">-¥{{ JSON.stringify(orderComputed) == '{}' ? 0 : (orderComputed.taskReward - orderComputed.payAmount).toFixed(2) }}</view>
					</view>
				</view>
			</view>
			<view class="popups-footer">
				<view class="popups-footer-left">
					<view class="footer-left-top">
						<view class="flt-left">
							<view class="flt-left-total">总计：</view>
							<view class="flt-left-price" :class="{ on: JSON.stringify(orderComputed) != '{}' }">¥{{ orderComputed.payAmount ? orderComputed.payAmount : 0 }}</view>
						</view>
						<view class="flt-right" @tap="handleDetailshow">
							<view class="price-detail">费用明细</view>
							<image src="../../static/img/index/up.png" mode="aspectFill" class="up-down" :class="{ on: priceDetailshow }"></image>
						</view>
					</view>
					<view class="footer-left-bottom">3公里内：1小时内送达</view>
				</view>
				<view class="popups-footer-right" @tap="handlePopPay">确认下单</view>
			</view>
		</uni-popup>
		
		

		<!-- 支付弹框 -->
		<uni-popup ref="popupPay" type="bottom" @change="closePay" >
			<view class="popupPay-header">
				<view class="popupPay-header-left">您需支付</view>
				<view class="popupPay-header-right">¥{{ orderComputed.payAmount ? orderComputed.payAmount : 0 }}</view>
			</view>
			<view class="popupPay-middle">
				<view class="popupPay-middle-left">支付剩余时间</view>
				<view class="popupPay-middle-right">{{ minutes }}:{{ seconds }}</view>
			</view>
			<view class="popupPay-item" v-for="(popPay, index) in payInfo" :key="index" @tap="handleCircle(index)">
				<view class="circle"><view class="n-circle" v-show="circleShow === index"></view></view>
				<image :src="popPay.image" mode="aspectFill"></image>
				<view class="pay-way">
					{{ popPay.text }}
					<view class="pay-way-sectext" v-if="popPay.sectext">{{ popPay.sectext }}</view>
				</view>
			</view>
			<view class="popupPay-button" @tap="payOrder">确认支付</view>
		</uni-popup>
		
	
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	onLoad(option) {
		console.log(option.assignIndex)
		this.car = option.car;
		this.scrollIndex = Number(option.scrollIndex)
		console.log(this.scrollIndex)
		//默认地址
		this.initAddress();
		//获取保价金
		this.initorderProperty();
		//富文本
		this.initRichText();
		//获取当前时间
		let nowTime = this.$dayjs().hour();
		this.nowTime = nowTime;
		
		//更改数组
		///找到对应的下标
		let arrIndex = this.timer.findIndex(value => {
			if (this.nowTime == value.start) {
				return true;
			}
		});
		//截取字符串
		this.timeList = this.timer.slice(arrIndex + 1);

		//获取余额
		// this.payInfo[0].sectext =  "(" + uni.getStorageSync('user_amount') + ')'

		//获取签收码
		this.signCode = uni.getStorageSync('user_signCode');

		if (JSON.stringify(this.sendAddress) == '{}') {
			this.sendAddressShow = true;
		} else {
			this.sendAddressShow = false;
		}
	},
	onShow() {
		// this.initAddress()
		let phoneData = uni.getSystemInfoSync();
		this.platform = phoneData.platform;
		// console.log(this.platform == 'android')
		
		this.initMyInfo();
		this.initorderProperty();
		this.createOrderTimer = this.$dayjs().hour()
		//起始地址
		if (uni.getStorageSync('sendAddress')) {
			// console.log(uni.getStorageSync('sendAddress'))
			let sendAddress = JSON.parse(uni.getStorageSync('sendAddress'));
			if (sendAddress !== this.sendAddress) {
			}
			this.sendAddress = sendAddress;
		}

		//终点地址
		if (uni.getStorageSync('endAddress')) {
			let endAddress = JSON.parse(uni.getStorageSync('endAddress'));
			this.endAddress = endAddress;
			if (this.endAddress.addressDetail === 'undefined') {
				this.endAddress.addressDetail = '';
			}
		}
		//商品信息
		if (uni.getStorageSync('shopInfo')) {
			let shopInfo = uni.getStorageSync('shopInfo');
			if (shopInfo && shopInfo != undefined) {
				this.shopInfo = shopInfo;
			}
		}

		//优惠券
		if (uni.getStorageSync('discount')) {
			let discount = uni.getStorageSync('discount');
			if (discount.value != undefined) {
				this.discount = discount;
			}
			console.log(this.discount)
		} else {
			this.discount = {}
		}
		//取件日期
		if (uni.getStorageSync('takeTimer')) {
			let takeDay = uni.getStorageSync('takeTimer');
			if (takeDay && takeDay != undefined) {
				this.showChoiceTime = takeDay;
			}
		}
		//计算距离
		if (this.isComputedDistance) {
			this.isComputedDistanceFunc();
		}

		//订单计算初始请求
		if (this.isInitOrderPrice) {
			this.isInitOrderPriceAjax();
		}
		// 倒计时
		if (this.countDown != '') {
			clearInterval(this.countDown);
			this.minutes = 30;
			this.seconds = 0;
		}

		if (JSON.stringify(this.endAddress) == '{}') {
			this.endAddressShow = true;
		} else {
			this.endAddressShow = false;
		}
		
		// 获取备注
		if (uni.getStorageSync('remark')) {
			this.remark = uni.getStorageSync('remark')
		}
	},
	onUnload() {
		// uni.removeStorageSync('sendAddress')
		// uni.removeStorageSync('endAddress');
		uni.removeStorageSync('shopInfo');
		uni.removeStorageSync('discount');
		uni.removeStorageSync('takeTimer');
		uni.removeStorageSync('remark');
	},
	data() {
		return {
			platform: '',
			//发货地址
			sendAddress: {},
			//收货地址
			endAddress: {},
			car: 0, //0电动 1小车
			//顶部导航
			scrollList: ['帮我送', '帮我取', '帮我买'],
			carScrollList: ['帮我送', '帮我取'],
			scrollIndex: 0,
			//时间
			dayIndex: 0,
			day: ['今天', '明天', '后天'],
			//立即取件
			rightIndex: 999,
			timer: [
				{ text: '9:00-10:00', start: '9', end: '10' },
				{ text: '10:00-11:00', start: '10', end: '11' },
				{ text: '11:00-12:00', start: '11', end: '12' },
				{ text: '12:00-13:00', start: '12', end: '13' },
				{ text: '13:00-14:00', start: '13', end: '14' },
				{ text: '14:00-15:00', start: '14', end: '15' },
				{ text: '15:00-16:00', start: '15', end: '16' },
				{ text: '16:00-17:00', start: '16', end: '17' },
				{ text: '17:00-18:00', start: '17', end: '18' },
				{ text: '18:00-19:00', start: '18', end: '19' },
				{ text: '19:00-20:00', start: '19', end: '20' },
				{ text: '21:00-22:00', start: '21', end: '22' },
				{ text: '22:00-23:00', start: '22', end: '23' },
				{ text: '23:00-24:00', start: '23', end: '24' }
			],
			//今天的数组列表
			timeList: [],
			//发请求的时间参数
			choiceTime: '',
			//页面展示用的时间
			showChoiceTime: '',

			showDay: '',
			//选择的时间段
			choiceMinunte: '',
			//日期
			dayTimer: '',
			//发请求用的时间
			choiceMinunteEnd: '',

			//指定商店
			assignList: ['骑手就近购买', '指定地址'],
			assignIndex: 0,
			//打赏
			grant: [0, 1, 2, 3, 4, 5],
			giveGrant: '',
			//总价
			totalPrice: 0,
			//费用详情显示
			priceDetailshow: false,
			//支付按钮
			payInfo: [
				{
					image: '../../static/img/my/yuezhifu.png',
					text: '余额支付',
					sectext: ''
				},
				{
					image: '../../static/img/my/Alipaypayment.png',
					text: '支付宝支付（推荐）	',
					sectext: ''
				},
				{
					image: '../../static/img/my/weixinzhifu.png',
					text: '微信支付',
					sectext: ''
				}
			],
			circleShow: 0,

			//阅读协议的圆
			horsemanCircle: false,
			//是否显示请选地址
			sendAddressShow: true,
			endAddressShow: true,
			//商品信息
			shopInfo: {},
			//优惠券
			discount: {},
			//距离
			distance: '',
			//签收码
			signCode: 0,
			//保价金
			goldCode: 0,
			//加急专送
			urgentCode: 0,
			//保温箱
			stayWarmCode: 0,
			//备注
			remark: '',
			//计算订单价格数据返回
			orderComputed: {},
			//计时器
			minutes: 30,
			seconds: 0,
			countDown: '',
			//周边骑手
			//是否有骑手
			horseman: false,
			horsemanCount: '',
			horsemanList: [],
			//加价
			addPirce: 0,
			//请求回来的订单ID
			orderId: '',
			RichText: [],
			//保价金
			orderProperty: '',
			//就近购买与指定
			helpBuy: 0,
			//就近距离配置
			riderSide: 3,
			//是否支付按钮，用作判断使用优惠券并有无付款
			payFlag: true,
			//商品预估显示
			shopAppraisement: false,
			//帮买商品内容
			helpBuyTextArea: '',
			//帮买预估价值
			appraisement: '',
			//帮买阅读协议
			helpbuyCircle: true,
			// 选择时间的开始
			choiceMinunteStart: '',
			//时间段无运力
			Nhorseman: false,
			//小票圆
			xiaopiaoCircle : false,
			newAddPrice: 0,
			adcode: ''
		};
	},
	components: {
		uniPopup
	},
	watch: {
		sendAddress(value, oldvalue) {
			if (value != oldvalue) {
				this.sendAddressShow = false;
				//计算距离
				if (JSON.stringify(value) != '{}' && JSON.stringify(this.endAddress) != '{}') {
					// console.log('进入');
					// if (this.helpBuy !== 1) {
						// console.log('我执行了？')
						this.isComputedDistanceFunc();
					// }
					
					
				}
				this.isInitOrderPriceAjax();
			}
		},
		endAddress(value, oldvalue) {
			if (value != oldvalue) {
				this.endAddressShow = false;
				//计算距离
				if (JSON.stringify(value) != '{}' && JSON.stringify(this.sendAddress) != '{}') {
					this.isComputedDistanceFunc();
				}
				this.isInitOrderPriceAjax();
			}
		},
		//监听各个按钮是否开启
		signCode(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		goldCode(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		urgentCode(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		stayWarmCode(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		giveGrant(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		//监听距离变化
		distance(value, oldvalue) {
			if (value != oldvalue) {
				this.isInitOrderPriceAjax();
			}
		},
		//监听时间变化
		second: {
			handler(newVal) {
				this.num(newVal);
			}
		},
		minute: {
			handler(newVal) {
				this.num(newVal);
			}
		}
	},
	computed: {
		//计算距离
		isComputedDistance() {
			return JSON.stringify(this.sendAddress) != '{}' && JSON.stringify(this.endAddress) != '{}';
		},
		//初始计算订单价格
		isInitOrderPrice() {
			return JSON.stringify(this.sendAddress) != '{}' && JSON.stringify(this.endAddress) != '{}' && JSON.stringify(this.shopInfo) != '{}';
		}
	},
	methods: {
		// 关闭支付
		closePay(data) {
			clearInterval(this.countDown);
			this.countDown = null;
			this.minutes = 30;
			this.seconds = 0;
			// console.log(data)
			// console.log('我被隐藏')
			if(!data.show && this.payFlag) {
				if (uni.getStorageSync('discount')) {
					uni.setStorageSync('userSelect',0)
					uni.switchTab({
						url: '../order/order'
					})
				}
			}
		},
		//返回
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		//去运费明细
		goTofreight(index) {
			uni.navigateTo({
				url: '../freightDeatail/freightDeatail?freightInfo=' + JSON.stringify(this.orderComputed) + "&status=" + index
			});
		},
		// 去备注
		goToRemark () {
			uni.navigateTo({
				url: '../remark/remark'
			})
		},
		//商品预估显示
		closeShopAppraisement () {
			console.log(this.helpBuyTextArea.trim())
			console.log(this.helpBuyTextArea.trim() === true)
			// if (!this.helpBuyTextArea.trim()) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '请先填写需要购买的物品'
			// 	})
			// 	return
			// }
			// if (this.helpBuyTextArea.trim() && this.helpBuyTextArea.replace('需要小票') != '') {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '请先填写需要购买的物品'
			// 	})
			// 	return
			// }
			this.shopAppraisement = !this.shopAppraisement
			uni.hideKeyboard()
		},
		checkShopInfoPrice () {
			
		
		},
		//小票
		needTicket () {
			this.xiaopiaoCircle = !this.xiaopiaoCircle
			if (this.xiaopiaoCircle) {
				this.helpBuyTextArea = this.helpBuyTextArea + ' 需要小票,按小票结算'
			} else {
				this.helpBuyTextArea = this.helpBuyTextArea.replace(' 需要小票,按小票结算', '')
			}
			
		},
		//个人信息
		async initMyInfo() {
			let res = await this.$fetch(this.$api.currentUser, {}, 'GET', 'form');
			this.payInfo[0].sectext = '(' + Number(res.data.amount).toFixed(2) + ')';
		},
		//指定商店下标
		hangdleAssignIndex(index) {
			this.assignIndex = index;
			this.helpBuy = index
			if (index == 1) {
				let me = this;
				this.sendAddress.addressDetail = ""
				uni.chooseLocation({
					success: res => {
						let that = res;
						uni.request({
							url:
								'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' +
								res.longitude +
								',' +
								res.latitude +
								'&key=6223011d1e55de8ee9d00617ee5270c2&radius=1000&extensions=all', //仅为示例，并非真实接口地址。
							success: res => {
								if (that.name === '地图位置') {
									that.name = res.data.regeocode.aois[0].name;
								}
								that.address = res.data.regeocode.formatted_address;

								if (this.sendAddress.addressDetail instanceof Array) {
									
									me.sendAddress.addressDetail[0] = that.address;
									me.sendAddress.addressDetail[1] = '';
									me.sendAddress.addressDetail[2] = that.name;
									me.sendAddress.latitude = that.longitude + ',' + that.latitude;
									
									
								} else {
									
									me.sendAddress.editAddress = that;
						
									me.sendAddress.latitude =  me.sendAddress.editAddress.longitude + ',' + me.sendAddress.editAddress.latitude
					
									
								}
								
								// console.log(me.sendAddress)
								uni.setStorageSync('sendAddress',JSON.stringify(me.sendAddress))
								// this.sendAddress = me.sendAddress
								this.isComputedDistanceFunc();
								this.isInitOrderPriceAjax();
							}
						});
					},
					complete: () => {
						this.isComputedDistanceFunc();
						this.isInitOrderPriceAjax();
					}
				});
			}
			this.isInitOrderPriceAjax();
		},
		//更改scroll下标
		handleScrollIndex(index) {
			
			this.scrollIndex = index;
			this.shopInfo = {};
			this.discount = {};
			this.showChoiceTime = '马上取件';
			this.assignIndex = 0;
			this.choiceTime = '', 
			this.showDay = '';
			this.choiceMinunte = '';
			this.dayTimer = '';
			this.choiceMinunteEnd = '';
			this.giveGrant = '';
			this.totalPrice = 0;
			this.orderComputed = {};
			this.helpBuy = 0
			this.helpBuyTextArea = ''
			this.choiceMinunteStart = 0
			this.rightIndex = 999
			// this.initAddress()
			 // let addDetail = this.sendAddress.addressDetail
			// if (index == 2) {
			// 	this.addDetail = this.sendAddress.addressDetail
			// 	this.sendAddress.addressDetail = ""
			// } else {
			// 	this.sendAddress.addressDetail = this.addDetail
			// }
			uni.removeStorageSync('takeTimer');
			uni.removeStorageSync('shopInfo');
			uni.removeStorageSync('discount');
		},
		//取件时间
		pickTimer() {
			this.$refs.popup.open();

			this.handleDayIndex(this.dayIndex);
		},
		//更换取件时间
		handleDayIndex(index) {
			if (index || index == 0) {
				this.showDay = this.day[index];
			}
			this.dayIndex = index;
			if (index === 0) {
				//获取当前日期
				this.dayTimer = this.$dayjs().format('YYYY-MM-DD');
				let arrIndex = this.timer.findIndex(value => {
					if (this.nowTime == value.start) {
						return true;
					}
				});
				this.timeList = this.timer.slice(arrIndex + 1);
			} else if (index === 1) {
				this.dayTimer = this.$dayjs()
					.add(1, 'day')
					.format('YYYY-MM-DD');
				this.timeList = [];
			} else if (index === 2) {
				this.dayTimer = this.$dayjs()
					.add(2, 'day')
					.format('YYYY-MM-DD');
				this.timeList = [];
			}
			this.rightIndex = 999;
		},
		//更改对勾
		handleRight(item, index) {
			if (this.showChoiceTime === '马上取件') {
				this.choiceMinunteStart = 0
			}
			this.rightIndex = index;
			this.choiceMinunte = item;
			this.choiceMinunteEnd = item.end;
			this.choiceMinunteStart = item.start
			
		},
		//初始化
		initTakeNow() {
			this.dayIndex = 0;
			this.rightIndex = 999;
		},
		//获取保价金
		async initorderProperty() {
			let res = await this.$fetch(this.$api.orderProperty, { carType: this.car }, 'GET', 'form');
			
			this.orderProperty = res.data.bond;
			this.riderSide = res.data.distance
			this.newAddPrice = res.data.capacitySubsidy
			this.yunliTimerStart = res.data.noCapacityMonitoringPeriod.split('-')[0]
			this.yunliTimerEnd = res.data.noCapacityMonitoringPeriod.split('-')[1]
			
		},
		//点击确定
		popSubmit() {
			this.$refs.popup.close();
			this.choiceTime = this.dayTimer + ' ' + this.choiceMinunteStart;
			
			if (this.rightIndex != 999) {
				this.showChoiceTime = this.showDay + ' ' + this.choiceMinunte.text;
			} else {
				this.showChoiceTime = '马上取件';
			}
			//点击确定存入本地
			uni.setStorageSync('takeTimer', this.showChoiceTime);
		},
		//去地址簿
		goToAddress(index) {
			uni.navigateTo({
				url: '../address/address?address=' + index
			});
		},
		//保存帮买商品信息
		setHelpBuyInfo () {
			
			if (this.appraisement <= 0 && uni.getStorageSync('shopInfo') == true) {
								this.appraisement = 1				uni.showToast({					title: '商品预估价最低1元',					icon: 'none'				})							} else if (this.appraisement > 500) {				this.appraisement = 500				uni.showToast({					title: '商品预估价最高500元',					icon: 'none'				})			} 
			if (this.helpBuyTextArea.trim()) {
				this.shopInfo.main = this.helpBuyTextArea
			}
			if (this.appraisement) {
				this.shopInfo.price = this.appraisement
			}
			if (this.helpBuyTextArea.trim() && this.appraisement) {
				uni.setStorageSync('shopInfo', this.shopInfo)
				this.isInitOrderPriceAjax()
			}
			if (this.helpBuyTextArea === '') {
				this.orderComputed.payAmount = 0
			} 
		},
		//去商品信息
		goToShopInfo() {
			if (JSON.stringify(this.sendAddress) == '{}' || JSON.stringify(this.endAddress) == '{}') {
				uni.showToast({
					icon: 'none',
					title: '请先填写地址'
				});
				return;
			}

			if (this.scrollIndex == 2) {
				uni.navigateTo({
					url: '../buyShopInfo/buyShopInfo'
				});
			} else {
				uni.navigateTo({
					url: '../shopInfo/shopInfo'
				});
			}
		},
		//去优惠券
		goToDiscount() {
			uni.navigateTo({
				url: '../discount/discount?payAmount=' + this.orderComputed.payAmount
			});
		},
		//打赏消费
		selectedGrant(e) {
			let index = e.detail.value;
			this.giveGrant = this.grant[index];
		},
		//下单详情
		async handleBilldetail() {			let latitude = this.sendAddress.latitude.split(',')[1];
			let longitude = this.sendAddress.latitude.split(',')[0];			if (this.scrollIndex == 2 && this.assignIndex == 0) {				latitude = this.endAddress.latitude.split(',')[1];
				longitude = this.endAddress.latitude.split(',')[0];			}
			latitude = Number(latitude).toFixed(6);			longitude = Number(longitude).toFixed(5);				
							uni.request({			   url:	'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + longitude +',' + latitude +'&key=6223011d1e55de8ee9d00617ee5270c2&radius=1000&extensions=all', //仅为示例，并非真实接口地址。		
		    success: async (res) => {				this.adcode = res.data.regeocode.addressComponent.adcode.substring(0, 4)				let msg = await this.$fetch(this.$api.testAdcode, {adcode: this.adcode}, 'POST', 'FORM')
				console.log(msg)				if (msg.code != 0) {
					return uni.showToast({							icon: 'none',
							title: '该地区暂未开通服务，敬请期待'				})				} else {					
					if (this.shopInfo.main === undefined || this.shopInfo.price === undefined) {
						uni.showToast({
							title: '请检查您要下单的信息',
							icon: 'none'
						})
						return
					}
					if(this.scrollIndex != 2) {
						if (this.sendAddress.mobile.trim() == '' || this.sendAddress.name.trim() == '') {
							uni.showToast({
								icon: 'none',
								title: '请完善取货地址信息'
							});
							return;
						}
					}
					
					
					if (this.scrollIndex === 2 && !this.helpbuyCircle) {
						uni.showToast({
							title: '请认真阅读帮买服务协议',
							icon: 'none'
						})
						return
					}
					
					if (this.sendAddress.latitude === "" && JSON.stringify(this.endAddress) != '{}' && JSON.stringify(this.shopInfo) != '{}') {
						uni.showToast({
							title: '未获取到详细地址,请先完善信息',
							icon: 'none'
						})
						return
					}
					if (JSON.stringify(this.sendAddress.editAddress) === '{}' || JSON.stringify(this.endAddress.editAddress) === '{}') {
						uni.showToast({
							icon: 'none',
							title: '未获取到详细地址,请先完善信息'
						});
						return;
					}
					//优惠券限制
					if (this.discount.type) {
						if(this.orderComputed.payAmount < 50 ) {
							uni.showToast({
								icon: 'none',
								title: '订单金额小于50，无法使用优惠'
							});
							return;
						}
					}
					
					if (JSON.stringify(this.sendAddress) == '{}' || JSON.stringify(this.endAddress) == '{}' || JSON.stringify(this.shopInfo) == '{}') {
						uni.showToast({
							icon: 'none',
							title: '请检查您要下单的信息'
						});
						return;
					} else {
						uni.showLoading({
						    title: '订单生成中'
						});
						let latitude = this.sendAddress.latitude.split(',')[1];
						let longitude = this.sendAddress.latitude.split(',')[0];
					
						latitude = Number(latitude).toFixed(6);
						longitude = Number(longitude).toFixed(5);
						let Radius = null;
					
						let getRadius = await this.$fetch(this.$api.getScanRange, {}, 'GET', 'Form');
						if (getRadius.code === 0) {
							Radius = getRadius.data.taskScanRange;
						}
						
						
						//搜索周边有无骑手
						uni.request({
							url: 'https://tsapi.amap.com/v1/track/terminal/aroundsearch',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								// key: 'e54514186dfbafae58736cd342838baf',
								// sid: '92478',
								key: "4145121d3d1b5dcf41702960f3bd5adc",
								sid: '126730',
								center: latitude + ',' + longitude,
								radius: Radius * 1000
							},
							success: res => {
								console.log(res)
								uni.hideLoading()
								this.horsemanCount = res.data.data.count;
								this.horsemanList = res.data.data.results;
								// if (this.choiceMinunteStart >= 22) {
								// 		this.horseman = true;
								// 		this.Nhorseman = true;
								// } else if (this.createOrderTimer >= this.yunliTimerStart  &&  this.createOrderTimer <= this.yunliTimerEnd) {
								// 	this.horseman = true;
								// 	this.Nhorseman = true;
								// }
								if (this.createOrderTimer >= this.yunliTimerStart  &&  this.createOrderTimer <= this.yunliTimerEnd) {
									this.horseman = true;
									this.Nhorseman = true;
								}
								 
								if (this.horseman == false) {
									this.Nhorseman = false
									this.$refs.popups.open();
									
								}
							}
						});
					}
																
									}			    }
		});
		
		
		},
		//确认下单
		async handlePopPay() {
			this.isCreateOrderPriceAjax();
		},
		//更改下单圆
		handleCircle(index) {
			this.circleShow = index;
		},
		//显示费用详情
		handleDetailshow() {
			this.priceDetailshow = !this.priceDetailshow;
		},
		//更改阅读协议的圆
		handleHorsemanCircle() {
			this.horsemanCircle = !this.horsemanCircle;
		},
		//关闭无骑手弹框
		handleHorsemanShow() {
			this.addPirce = 0;
			this.isInitOrderPriceAjax();
			this.horseman = false;
		},
		//去编辑
		goToEdit(addressInfo, index, id) {
			if (this.scrollIndex === 2 && index === 0 && this.assignIndex === 0) {
				return
			}
			if (this.scrollIndex === 2 && index === 0 && this.assignIndex === 1) {
				let me = this
				uni.chooseLocation({
					success: res => {
						let that = res;
						uni.request({
							url:
								'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' +
								res.longitude +
								',' +
								res.latitude +
								'&key=6223011d1e55de8ee9d00617ee5270c2&radius=1000&extensions=all', //仅为示例，并非真实接口地址。
							success: res => {
								if (that.name === '地图位置') {
									that.name = res.data.regeocode.aois[0].name;
								}
								that.address = res.data.regeocode.formatted_address;
				
								if (this.sendAddress.addressDetail instanceof Array) {
									
									me.sendAddress.addressDetail[0] = that.address;
									me.sendAddress.addressDetail[1] = '';
									me.sendAddress.addressDetail[2] = that.name;
									me.sendAddress.latitude = that.longitude + ',' + that.latitude;
									
						
									
								} else {
									
									me.sendAddress.editAddress = that;
						
									me.sendAddress.latitude =  me.sendAddress.editAddress.longitude + ',' + me.sendAddress.editAddress.latitude
					
									
								}
								
								
								uni.setStorageSync('sendAddress',JSON.stringify(me.sendAddress))
								// this.sendAddress = me.sendAddress
								this.isComputedDistanceFunc();
								this.isInitOrderPriceAjax();
							}
						});
					},
					complete: () => {
						this.isComputedDistanceFunc();
						this.isInitOrderPriceAjax();
					}
				});
			} else {
				uni.navigateTo({
					url: '../editAddress/editAddress?addressInfo=' + JSON.stringify(addressInfo) + '&status=' + index + '&id=' + id
				});
			}
			
		},
		//获取默认地址
		async initAddress() {
			// let res = await this.$fetch(this.$api.addressList, {}, 'GET', 'Form');
			// if (res.code === 0) {
			// 	let msg = res.data.find(item => item.defaultFlag === 0);
			// 	// if (msg != undefined) {
			// 	msg.addressDetail = msg.addressDetail.split(',');
			// 	this.sendAddress = msg;

			// 	// }

			// 	let editAddress = {};
			// 	editAddress.name = this.sendAddress.addressDetail[2];
			// 	editAddress.address = this.sendAddress.addressDetail[0];
			// 	editAddress.longitude = this.sendAddress.latitude.split(',')[0];
			// 	editAddress.latitude = this.sendAddress.latitude.split(',')[1];

			// 	let province = this.sendAddress.province;
			// 	let city = this.sendAddress.city;
			// 	let area = this.sendAddress.area;
			// 	let userName = this.sendAddress.name;
			// 	let userPhone = this.sendAddress.mobile;
			// 	let orderId = this.sendAddress.id;
			// 	let addressDetail = this.sendAddress.addressDetail[1];
			// 	let latitude = this.sendAddress.latitude;

			// 	let sendAddress = {
			// 		addressDetail: addressDetail,
			// 		latitude: latitude,
			// 		mobile: userPhone,
			// 		name: userName,
			// 		province: province,
			// 		editAddress: editAddress,
			// 		city: city,
			// 		area: area,
			// 		orderId: orderId
			// 	};
			// 	console.log(sendAddress)
			// 	uni.setStorageSync('sendAddress', JSON.stringify(sendAddress));
				// uni.setStorageSync('sendAddress',msg)
			// }
		},
		//更改签收码
		handleSignCode(e) {
			if (e.detail.value) {
				this.signCode = 1;
			} else {
				this.signCode = 0;
			}
		},
		//更改保证金
		handleGoldCode(e) {
			if (e.detail.value) {
				this.goldCode = 1;
			} else {
				this.goldCode = 0;
			}
		},
		//更改加急专送
		handleUrgentCode(e) {
			if (e.detail.value) {
				this.urgentCode = 1;
			} else {
				this.urgentCode = 0;
			}
		},
		//更改保温箱
		handleStayWarmCode(e) {
			if (e.detail.value) {
				this.stayWarmCode = 1;
			} else {
				this.stayWarmCode = 0;
			}
		},
		//初始请求价格
		async isInitOrderPriceAjax() {
			
			
			if (this.sendAddress.latitude === "" && JSON.stringify(this.endAddress) != '{}' && JSON.stringify(this.shopInfo) != '{}') {
				uni.showToast({
					title: '未获取到详细地址,请先完善信息',
					icon: 'none'
				})
				return
			}
			if (this.shopInfo.price === undefined) {
				return
			}

			//格式化
			if (JSON.stringify(this.sendAddress) != '{}' && JSON.stringify(this.endAddress) != '{}' && JSON.stringify(this.shopInfo) != '{}' && this.sendAddress.latitude !== "") {
				let initsendress = null;
				// if (this.sendAddress.addressDetail instanceof Array) {
				// 	initsendress = this.sendAddress.addressDetail[0] + '' + this.sendAddress.addressDetail[2] + '' + this.sendAddress.addressDetail[1];
				// } else {
				// 	initsendress = this.sendAddress.editAddress.address + '' + this.sendAddress.editAddress.name + '' + this.sendAddress.addressDetail;
				// }
				
				if (this.sendAddress.addressDetail instanceof Array) {
					initsendress = this.sendAddress.addressDetail[0] + ''  + this.sendAddress.addressDetail[1];
				} else {
					initsendress = this.sendAddress.editAddress.address + ''  + this.sendAddress.addressDetail;
				}

				let startAddress = JSON.stringify(initsendress);
				
				// let endAddress = JSON.stringify(this.endAddress.editAddress.address + '' + this.endAddress.editAddress.name + '' + this.endAddress.addressDetail);
				
				let endAddress = JSON.stringify(this.endAddress.editAddress.address + ''  + this.endAddress.addressDetail);
			
						
				//发送计算订单请求
				//当是立即取件时
				if (this.rightIndex === 999) {
					
					//判断有无优惠券
					if (JSON.stringify(this.discount) === '{}') {
						
					
						//就近骑手
						if (this.scrollIndex === 2 ) {
							
							if (this.assignIndex === 0) {
							
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 1,
										// buyAddressType: this.assignIndex,
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 0,
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										// goodsPredictAmount: this.shopInfo.price,
										goodsPredictAmount: 50,
										subsidy: this.addPirce
									}, 
									'POST'
								);
								
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							if (this.assignIndex === 1) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 0,
										// buyAddressType: this.assignIndex,
										startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.distance,
										type: this.scrollIndex,
										pickUpType: 0,
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										goodsPredictAmount: 50,
										subsidy: this.addPirce
									}, 
									'POST'
								);
								
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							
							
						} else {
							
						let res = await this.$fetch(
							this.$api.orderCalculation,
							{
								buyAddressType: this.assignIndex,
								startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
								endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
								tip: this.giveGrant,
								goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
								distance: this.distance,
								type: this.scrollIndex,
								pickUpType: 0,
								carType: this.car,
								incubatorFlag: this.stayWarmCode,
								premiumFlag: this.goldCode,
								urgentExpressPriceFlag: this.urgentCode,
								signForCodeFlag: this.signCode,
								goodsPredictAmount: '',
								subsidy: this.addPirce
							},
							'POST'
						);
						
						
						if (res.code == 0) {
							this.orderComputed = res.data;
						}
						}
						
					} else {
						//优惠
						if (this.scrollIndex === 2 ) {
						
							if (this.assignIndex === 0) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 1,
										// buyAddressType: this.assignIndex,
										// startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 0,
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										userCouponId: this.discount.id,
										goodsPredictAmount: 50,
										subsidy: this.addPirce
									},
									'POST'
								);
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							if (this.assignIndex === 1) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 0,
										// buyAddressType: this.assignIndex,
										startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.distance,
										type: this.scrollIndex,
										pickUpType: 0,
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										userCouponId: this.discount.id,
										goodsPredictAmount: 50,
										subsidy: this.addPirce
									},
									'POST'
								);
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							
						} else {
						
							let res = await this.$fetch(
								this.$api.orderCalculation,
								{
									buyAddressType: this.assignIndex,
									startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
									endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									goodsPredictAmount: '',
									subsidy: this.addPirce
								},
								'POST'
							);
							
							if (res.code == 0) {
								this.orderComputed = res.data;
							}
						}
						
					}
					//预约时间
				} else {
					//判断有无优惠券
					if (JSON.stringify(this.discount) === '{}') {
						console.log(this.choiceTime + '*******************')
						if (this.scrollIndex === 2 ) {
							
							if (this.assignIndex === 0) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 1,
										// startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 1,
										pickUpTime: this.choiceTime + ':00:00',
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										goodsPredictAmount: this.shopInfo.price,
										subsidy: this.addPirce
									},
									'POST'
								);
								console.log(res);
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							if (this.assignIndex === 1) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 0,
										startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 1,
										pickUpTime: this.choiceTime + ':00:00',
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										goodsPredictAmount: this.shopInfo.price,
										subsidy: this.addPirce
									},
									'POST'
								);
								
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							
						} else {
							
							let res = await this.$fetch(
								this.$api.orderCalculation,
								{
									buyAddressType: this.assignIndex,
									startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
									endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									goodsPredictAmount: '',
									subsidy: this.addPirce
								},
								'POST'
							);
							
							
							if (res.code == 0) {
								this.orderComputed = res.data;
							}
						}
						
					} else {
						if (this.scrollIndex === 2) {
							
							if (this.assignIndex === 0) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 1,
										// startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 1,
										pickUpTime: this.choiceTime + ':00:00',
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										userCouponId: this.discount.id,
										goodsPredictAmount: this.shopInfo.price,
										subsidy: this.addPirce
									},
									'POST'
								);
								
									
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							if (this.assignIndex === 1) {
								let res = await this.$fetch(
									this.$api.orderCalculation,
									{
										buyAddressType: 0,
										startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
										endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
										tip: this.giveGrant,
										goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
										distance: this.riderSide,
										type: this.scrollIndex,
										pickUpType: 1,
										pickUpTime: this.choiceTime + ':00:00',
										carType: this.car,
										incubatorFlag: this.stayWarmCode,
										premiumFlag: this.goldCode,
										urgentExpressPriceFlag: this.urgentCode,
										signForCodeFlag: this.signCode,
										userCouponId: this.discount.id,
										goodsPredictAmount: this.shopInfo.price,
										subsidy: this.addPirce
									},
									'POST'
								);
								
									
								
								if (res.code == 0) {
									this.orderComputed = res.data;
								}
							}
							
						} else {
							
							let res = await this.$fetch(
								this.$api.orderCalculation,
								{
									buyAddressType: this.assignIndex,
									startAddress: JSON.stringify({ addressDetail: startAddress, latitude: this.sendAddress.latitude }),
									endAddress: JSON.stringify({ addressDetail: endAddress, latitude: this.endAddress.latitude }),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									goodsPredictAmount: '',
									subsidy: this.addPirce
								},
								'POST'
							);
							
								
							
							if (res.code == 0) {
								this.orderComputed = res.data;
							}
						}
						
					}
				}
			}
		},
		//计算距离
		isComputedDistanceFunc() {
			if (JSON.stringify(this.sendAddress) != '{}' && JSON.stringify(this.endAddress) != '{}') {
				let initsendress = null;
				let endLatitude = '';
				if (this.sendAddress.addressDetail instanceof Array) {
					uni.request({
						url:
							'https://restapi.amap.com/v4/direction/bicycling?origin=' +
							this.sendAddress.latitude +
							'&destination=' +
							this.endAddress.latitude +
							'&key=6223011d1e55de8ee9d00617ee5270c2', //仅为示例，并非真实接口地址。
						success: res => {
							console.log(res.data); 
							this.distance = res.data.data.paths[0].distance / 1000;
						}
					});
				} else {
					
					uni.request({
						url:
							'https://restapi.amap.com/v4/direction/bicycling?origin=' +
							this.sendAddress.latitude +
							'&destination=' +
							this.endAddress.latitude +
							'&key=6223011d1e55de8ee9d00617ee5270c2', //仅为示例，并非真实接口地址。
						success: res => { 
							// console.log(res.data)  
							this.distance = res.data.data.paths[0].distance / 1000;
							// console.log(this.distance)
						} 
					}); 
					
				}
			}
		},
		//创建订单请求
		async isCreateOrderPriceAjax() {
			//格式化
			if (JSON.stringify(this.sendAddress) != '{}' && JSON.stringify(this.endAddress) != '{}' && JSON.stringify(this.shopInfo) != '{}') {
				//起点
				let initsendress = null;
				let initsendressTitle = null;
				let initsendressDetail = null;
				let initsendressName = null;
				//结束地址
				let initendressTitle = null;
				let initendressDetail = null;
				let initendressName = null;

				if (this.sendAddress.addressDetail instanceof Array) {
					
					initsendress = this.sendAddress.addressDetail[0] + ''  + this.sendAddress.addressDetail[1];

					initsendressDetail = this.sendAddress.addressDetail[1];
					initsendressTitle = this.sendAddress.addressDetail[2];
					initsendressName = this.sendAddress.addressDetail[0];

					initendressTitle = this.endAddress.editAddress.name;
					initendressDetail = this.endAddress.addressDetail;
					initendressName = this.endAddress.editAddress.address;
					
					
				} else {
				
					initsendress = this.sendAddress.editAddress.address + '' + this.sendAddress.addressDetail;
					initsendressDetail = this.sendAddress.addressDetail;
					initsendressTitle = this.sendAddress.editAddress.name;
					initsendressName = this.sendAddress.editAddress.address;

					initendressTitle = this.endAddress.editAddress.name;
					initendressDetail = this.endAddress.addressDetail;
					initendressName = this.endAddress.editAddress.address;
					
					
				}

				let startAddress = initsendress;
				let startIndex = initsendress.indexOf('市')
				
				startAddress = initsendress.substring(startIndex + 1,startIndex+initsendress.length)
				
				// let endAddress = this.endAddress.editAddress.address + '' + this.endAddress.editAddress.name + '' + this.endAddress.addressDetail;
				let endAddress = this.endAddress.editAddress.address + '' + this.endAddress.addressDetail;
				let endIndex = endAddress.indexOf('市')

				endAddress = endAddress.substring(endIndex + 1,endIndex+endAddress.length)
				
				
				
				let goodsPredictAmount = 0
				if (this.scrollIndex === 2) {
					goodsPredictAmount = 50
				}
					console.log(this.choiceTime + '&&&&&&&&&&&')
				//发送计算订单请求
				//当是立即取件时
				if (this.rightIndex === 999) {
					//判断有无优惠券
					if (JSON.stringify(this.discount) === '{}') {
						if (this.scrollIndex === 2 && this.helpBuy === 0) {
							
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 1,
									startAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.riderSide,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									// goodsPredictAmount: this.shopInfo.price,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							
							// if (res.code === 0) {
							console.log(res)
							console.log('111')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						} else {
							
							let goodsPredictAmount = 0
							if (this.scrollIndex === 2) {
								goodsPredictAmount = 50
							}
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 0,
									startAddress: JSON.stringify({
										addressDetail: startAddress,
										latitude: this.sendAddress.latitude,
										title: initsendressTitle,
										name: initsendressName,
										detail: initsendressDetail,
										userName: this.sendAddress.name,
										mobile: this.sendAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										name: initendressName,
										title: initendressTitle,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							// if (res.code === 0) {
							console.log(res)
							console.log('222')
							console.log({
									buyAddressType: 0,
									startAddress: JSON.stringify({
										addressDetail: startAddress,
										latitude: this.sendAddress.latitude,
										title: initsendressTitle,
										name: initsendressName,
										detail: initsendressDetail,
										userName: this.sendAddress.name,
										mobile: this.sendAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										name: initendressName,
										title: initendressTitle,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								})
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						}
					
					} else {
						//无优惠
						if (this.scrollIndex === 2 && this.helpBuy === 0) {
							
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 1,
									// startAddress: JSON.stringify({
									// 	addressDetail: startAddress,
									// 	latitude: this.sendAddress.latitude,
									// 	title: initsendressTitle,
									// 	name: initsendressName,
									// 	detail: initsendressDetail,
									// 	userName: this.sendAddress.name,
									// 	mobile: this.sendAddress.mobile
									// }),
									
									startAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.riderSide,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									// goodsPredictAmount: this.shopInfo.price,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							
							// if (res.code === 0) {
							console.log(res)
							console.log('333')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						} else {
							
							let goodsPredictAmount = 0
							if (this.scrollIndex === 2) {
								goodsPredictAmount = 50
							}
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 0,
									startAddress: JSON.stringify({
										addressDetail: startAddress,
										latitude: this.sendAddress.latitude,
										title: initsendressTitle,
										name: initsendressName,
										detail: initsendressDetail,
										userName: this.sendAddress.name,
										mobile: this.sendAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 0,
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							
							// if (res.code === 0) {
							console.log(res)
							console.log('444')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						}
						
					}
					//预约时间
				} else {
					//判断有无优惠券
					if (JSON.stringify(this.discount) === '{}') {
						if (this.scrollIndex === 2 && this.helpBuy === 0) {
							console.log('创建5')
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 1,
									// startAddress: JSON.stringify({
									// 	addressDetail: startAddress,
									// 	latitude: this.sendAddress.latitude,
									// 	title: initsendressTitle,
									// 	name: initsendressName,
									// 	detail: initsendressDetail,
									// 	userName: this.sendAddress.name,
									// 	mobile: this.sendAddress.mobile
									// }),
									startAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.riderSide,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									// goodsPredictAmount: this.shopInfo.price,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							// if (res.code === 0) {
							console.log(res)
							console.log('55')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						} else {
							
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 0,
									startAddress: JSON.stringify({
										addressDetail: startAddress,
										latitude: this.sendAddress.latitude,
										title: initsendressTitle,
										name: initsendressName,
										detail: initsendressDetail,
										userName: this.sendAddress.name,
										mobile: this.sendAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									// goodsPredictAmount: '',
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							// if (res.code === 0) {
							console.log(res)
							console.log('666')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						}
						
					} else {
						if (this.scrollIndex === 2 && this.helpBuy === 0) {
							
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 1,
									// startAddress: JSON.stringify({
									// 	addressDetail: startAddress,
									// 	latitude: this.sendAddress.latitude,
									// 	title: initsendressTitle,
									// 	name: initsendressName,
									// 	detail: initsendressDetail,
									// 	userName: this.sendAddress.name,
									// 	mobile: this.sendAddress.mobile
									// }),
									startAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.riderSide,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									// goodsPredictAmount: this.shopInfo.price,
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							
							// if (res.code === 0) {
								console.log(res)
								console.log('77')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						} else {
						
							let res = await this.$fetch(
								this.$api.orderCreate,
								{
									buyAddressType: 0,
									startAddress: JSON.stringify({
										addressDetail: startAddress,
										latitude: this.sendAddress.latitude,
										title: initsendressTitle,
										name: initsendressName,
										detail: initsendressDetail,
										userName: this.sendAddress.name,
										mobile: this.sendAddress.mobile
									}),
									endAddress: JSON.stringify({
										addressDetail: endAddress,
										latitude: this.endAddress.latitude,
										title: initendressTitle,
										name: initendressName,
										detail: initendressDetail,
										userName: this.endAddress.name,
										mobile: this.endAddress.mobile
									}),
									tip: this.giveGrant,
									goodsInventory: JSON.stringify({ weight: this.shopInfo.weight, cost: this.shopInfo.price, goods: this.shopInfo.main }),
									distance: this.distance,
									type: this.scrollIndex,
									pickUpType: 1,
									pickUpTime: this.choiceTime + ':00:00',
									carType: this.car,
									incubatorFlag: this.stayWarmCode,
									premiumFlag: this.goldCode,
									urgentExpressPriceFlag: this.urgentCode,
									signForCodeFlag: this.signCode,
									userCouponId: this.discount.id,
									// goodsPredictAmount: '',
									goodsPredictAmount: goodsPredictAmount,
									subsidy: this.addPirce,
									remark: this.remark,
									adcode: this.adcode
								},
								'POST'
							);
							
							// if (res.code === 0) {
								console.log(res)
								console.log('88s')
							this.orderId = res.data;
							this.$refs.popups.close();
							this.$refs.popupPay.open();
							this.countDownTimer();
							// }
						}
						
					}
				}
			}
		},
		//倒计时
		countDownTimer() {
			this.countDown = setInterval(() => {
				if (this.seconds === 0 && this.minutes !== 0) {
					this.seconds = 59;
					this.minutes -= 1;
				} else if (this.minutes === 0 && this.seconds === 0) {
					this.$refs.popupPay.close();
					this.seconds = 0;
					clearInterval(this.countDown);
					this.countDown = null;
					this.minutes = 30;
					this.seconds = 0;
				} else {
					this.seconds -= 1;
				}
			}, 1000);
		},
		num(n) {
			return n < 10 ? '0' + n : '' + n;
		},
		//继续发单
		async continueOrder() {
			if (this.horsemanCircle) {
				this.addPirce = this.newAddPrice;
				this.isInitOrderPriceAjax();
				this.horseman = false;
				//搜索骑手
				let latitude = this.sendAddress.latitude.split(',')[1];
				let longitude = this.sendAddress.latitude.split(',')[0];
				let Radius = null;
				let getRadius = await this.$fetch(this.$api.getScanRange, {}, 'GET', 'Form');

				if (getRadius.code === 0) {
					Radius = Number(getRadius.data.taskScanRange) + Number(getRadius.data.addSubsidyScanRange);
				}
				//搜索周边有无骑手
				uni.request({
					url: 'https://tsapi.amap.com/v1/track/terminal/aroundsearch',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						// key: 'e54514186dfbafae58736cd342838baf',
						// sid: '92478',
						key: "4145121d3d1b5dcf41702960f3bd5adc",
						sid: '126730',
						center: latitude + ',' + longitude,
						radius: Radius * 1000
					},
					success: res => {
						this.horsemanCount = res.data.data.count;
						this.horsemanList = res.data.data.results;

						if (this.horseman == false) {
							this.$refs.popups.open();
						}
					}
				});

				this.$refs.popups.open();
			} else {
				uni.showToast({
					icon: 'none',
					title: '请仔细阅读并同意加收运力费协议'
				});
			}
		},
		async payOrder() {
			uni.showLoading({
				title: '正在下单中....'
			});
			this.payFlag = false
			if (this.circleShow === 0) {
				let res = await this.$fetch(this.$api.orderPay, { orderId: this.orderId, payType: this.circleShow }, 'POST', 'form');
				console.log(res)
				if (res.code == 0) {
					uni.hideLoading();

					uni.showToast({
						icon: 'success',
						title: res.msg
					});

					clearInterval(this.countDown);
					this.countDown = null;
					this.minutes = 30;
					this.seconds = 0;

					this.$refs.popupPay.close();
					
					uni.setStorageSync('userSelect',1)
					setTimeout(() => {
						// uni.redirectTo({
						// 	url:'./storage?car=' + this.car
						// })
						uni.setStorageSync('orderRefresh', true)
						uni.switchTab({
							url:'../order/order'
						})
					
					}, 1500);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					
				}
			}

			if (this.circleShow === 1) {
				let res = await this.$fetch(this.$api.orderPay, { orderId: this.orderId, payType: this.circleShow }, 'POST', 'form');
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: res.msg, //微信、支付宝订单数据
					success: res => {
						uni.hideLoading();

						uni.showToast({
							icon: 'success',
							title: '支付成功'
						});

						clearInterval(this.countDown);
						this.countDown = null;
						this.minutes = 30;
						this.seconds = 0;

						this.$refs.popupPay.close();
						uni.setStorageSync('userSelect',1)
						setTimeout(() => {
							uni.setStorageSync('orderRefresh', true)
							uni.switchTab({
								url:'../order/order'
							})
						
						}, 1500);
					},
					fail: async (err) => {
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						});
						this.$refs.popupPay.close();
						
						let msg = await this.$fetch(this.$api.orderDetail,{id:this.orderId},"POST","Form")
						
						if (msg.code == 0) {
							setTimeout(() => {
								uni.setStorageSync('orderRefresh', true)
								uni.switchTab({
									url:'../order/order'
								})
								uni.navigateTo({
									url:'../orderDetail/orderDetail?orderDetail=' + JSON.stringify(msg.data) + "&currentIndex=" + 0
								})
							},1500)
						
						}
					}
				});
			}

			if (this.circleShow === 2) {
				let res = await this.$fetch(this.$api.orderPay, { orderId: this.orderId, payType: this.circleShow }, 'POST', 'form');

				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: res.data, //微信、支付宝订单数据
					success: res => {
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: '支付成功'
						});
						clearInterval(this.countDown);

						this.countDown = null;
						this.minutes = 30;
						this.seconds = 0;

						this.$refs.popupPay.close();
						uni.setStorageSync('userSelect',1) 
						setTimeout(() => {
							uni.setStorageSync('orderRefresh', true)
							uni.switchTab({
								url:'../order/order'
							})
						
						}, 1500);
					},
					fail: async(err) =>{
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						});
						this.$refs.popupPay.close();
						let msg = await this.$fetch(this.$api.orderDetail,{id:this.orderId},"POST","Form")
						
						if (msg.code == 0) {
							setTimeout(() => {
								uni.setStorageSync('orderRefresh', true)
								uni.switchTab({
									url:'../order/order'
								})
								uni.navigateTo({
									url:'../orderDetail/orderDetail?orderDetail=' + JSON.stringify(msg.data) + "&currentIndex=" + 0
								})
							},1500)
						
						}
					}
				});
			}
		},
		//富文本
		async initRichText() {
			let res = await this.$fetch(this.$api.articleType, { type: 5 }, 'Post', 'Form');

			if (res.code == 0) {
				this.RichText = res.data;
			}
		},
		goToRichText(id) {
			uni.navigateTo({
				url: '../rich-text/rich-text?id=' + id
			});
		},
		choiceHelpbuyCircle () {
			this.helpbuyCircle = !this.helpbuyCircle
		}
	}
};
</script>

<style lang="less" scoped>
page::after {
	display: none;
}
page {
	// background-color: #ffffff !important;
}

.storage {
	background-color: rgb(247, 247, 250);
	touch-action: none;
	overflow-x : hidden;
	.storage-header {
		width: 100%;
		background-color: #fff;
		// padding-top: 52rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: fixed;
		// top:17rpx;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		z-index: 11;
		.back {
			margin: 0 -60rpx;
			padding: 0 90rpx;
			box-sizing: border-box;
			vertical-align: text-bottom;
			position: relative;
			::after{
				content: '';
				position: absolute;
				top: -10rpx;
				right: -10rpx;
				left: -10rpx;
				bottom: -10rpx;
			}
			image {
				width: 24rpx;
				height: 36rpx;
				box-sizing: border-box;
			}
		}
		.header-title {
			font-family: PingFangSC-Regular;
			font-size: 17px;
			color: #09023e;
			text-align: center;
			line-height: 32px;
			margin-left: 237rpx;
			box-sizing: border-box;
		}
		.header-sectitle {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: rgba(9, 2, 62, 0.3);
			text-align: center;
		}
	}
	.storage-scroll {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		position: fixed;
		// top: 114rpx;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		transform: translateY(55rpx);
		// transform: translateY(55rpx);
		z-index: 12;
		border-top: 1rpx solid #f7f7fa;
		box-sizing: border-box;
		.scroll-item {
			flex: 1;
			// width: 33.3%;
			height: 90rpx;
			line-height: 90rpx;
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(9, 2, 62, 0.3);
			text-align: center;
			position: relative;

			&::after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4rpx solid #5468ff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: 0.5s;
			}
			&.on {
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #5468ff;
				&:after {
					width: 15%;
				}
			}
		}
	}
	.storage-address {
		margin-top: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		.address-item-header {
			display: flex;
			align-items: center;
			padding-top: 30rpx;
			box-sizing: border-box;
			.item-header-title {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023e;
				letter-spacing: -0.34px;
				padding-left: 32rpx;
				padding-right: 30rpx;
				box-sizing: border-box;
			}
			.item-header-assign {
				width: 174rpx;
				height: 44rpx;
				line-height: 44rpx;
				text-align: center;
				border: 1px solid rgba(9, 2, 62, 0.3);
				border-radius: 2px;
				border-radius: 2px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(9, 2, 62, 0.3);
				letter-spacing: -0.29px;
				margin-right: 30rpx;
				box-sizing: border-box;
				&.on {
					border: 1px solid #5468ff;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #5468ff;
					letter-spacing: -0.29px;
				}
			}
			.item-header-nearby {
				width: 174rpx;
				height: 44rpx;
				line-height: 44rpx;
				text-align: center;
				border: 1px solid rgba(9, 2, 62, 0.3);
				border-radius: 2px;
				border-radius: 2px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(9, 2, 62, 0.3);
				letter-spacing: -0.29px;
				box-sizing: border-box;
			}
		}
		.address-item {
			// height: 150rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			box-sizing: border-box;
			&.bdt {
				border-bottom: 1rpx solid #f7f7fa;
				box-sizing: border-box;
			}

			.address-left {
				display: flex;
				align-items: center;
				.circle {
					width: 48rpx;
					height: 48rpx;
					line-height: 48rpx;
					border-radius: 50%;
					background: #09023e;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #ffffff;
					text-align: center;
					&.end {
						background: #5468ff;
					}
				}
				.fillInfo {
					width: 516rpx;
					// line-height: 150rpx;
					border-right: 1rpx solid #f7f7fa;
					margin-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.3);
				}
				.address-center {
					width: 516rpx;
					border-right: 1rpx solid #f7f7fa;
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					box-sizing: border-box;
					&.bdr{
						border-right: none;
					}
					.center-top {
						display: flex;
						.user-name {
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #09023e;
							letter-spacing: -0.41px;
							font-weight: bold;
							display: -webkit-box;    
							-webkit-box-orient: vertical;    
							-webkit-line-clamp: 1;    //控制行数
							overflow: hidden;
							&.user-name-change{
								width: 160rpx;
							}
						}
						.user-phone {
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #09023e;
							letter-spacing: -0.41px;
							margin-left: 20rpx;
							box-sizing: border-box;
							font-weight: bold;
						}
					}
					.center-bottom {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						// color: rgba(9, 2, 62, 0.3);
						margin-top: 10rpx;
						box-sizing: border-box;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.center-bottom-user{
						display: flex;
						.user-phone{
							font-size: 14px;
							// color: rgba(9, 2, 62, 0.3);
						}
					}
				}
			}
			.address-right {
				// padding: 15rpx 0;
				margin: -40rpx 0;
				padding: 40rpx 0;
				box-sizing: border-box;
				// line-height: 150rpx;
				// line-height: 50%;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468ff;
				// line-height: 100%;
				&.nearBuy{
					// transform: translateX(30rpx);
				}
			}
		}
	}
	.storage-item-box {
		margin-top: 30rpx;
		padding-bottom: 180rpx;
		box-sizing: border-box;
		background-color: rgb(247,247,250);
		&.changebdPad{
			padding-bottom: 320rpx;
		}
		.storage-item {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #f7f7fa;
			box-sizing: border-box;
			&.baojia {
				height: 120rpx;
			}
			&.jiaji {
				height: 154rpx;
			}
			.storage-item-line{
				width: 1rpx;
				height: 100%;
				background-color: #f7f7fa;
			}
			.item-left {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023e;
				letter-spacing: -0.34px;
				.item-left-top {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023e;
					letter-spacing: -0.34px;
				}
				.item-left-bottom {
					width: 400rpx;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: -0.29px;
					text-align: justify;
				}
				text {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: -0.29px;
				}
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 6rpx;
					box-sizing: border-box;
					transform: translateY(6rpx);
				}
			}
			.item-right {
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023e;
				letter-spacing: 0;
				text-align: right;
				.place {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					letter-spacing: 0;
					text-align: right;
				}
				image {
					width: 16rpx;
					height: 26rpx;
					margin-left: 20rpx;
					box-sizing: border-box;
				}
				.item-right-remark {
					width: 550rpx;
					text-align: right;
				}
				
			}
		}
	}

	.storage-footer {
		width: 100%;
		height: 160rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between; 
		align-items: center;
		background-color: #fff;
		z-index: 99;
		flex-wrap: nowrap;
		&.column-footer{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.footer-left {
			.fl-top {
				display: flex;
				align-items: center;

				.flt-left {
					display: flex;
					align-items: center;

					flex-wrap: nowrap;
					.total-price {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023e;
						letter-spacing: -0.34px;
					}
					.price {
						flex: 1;
						font-family: PingFangSC-Semibold;
						font-size: 20px;
						color: rgba(9, 2, 62, 0.3);
						letter-spacing: -0.58px;
						&.priceActive {
							color: #ff8516;
						}
					}
				}
				.flt-right {
					display: flex;
					align-items: center;
					.freight {
						margin-left: 35rpx;
						margin-right: 15rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #5468ff;
						letter-spacing: -0.29px;
					}
					image {
						width: 26rpx;
						height: 16rpx;
					}
				}
			}
			.flt-bottom {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: rgba(9, 2, 62, 0.3);
				letter-spacing: -0.29px;
			}
		}
		.footer-right {
			width: 280rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #ffffff;
			letter-spacing: -0.34px;
			background: #5468ff;
			border-radius: 22.5px;
			border-radius: 22.5px;
			box-sizing: border-box;
		}
		.newpopups-footer-top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.newpopups-footer-top-l{
				font-family: PingFangSC;
				font-weight: 700;
				font-size: 14px;
				color: rgba(16, 16, 16, 1);
				span{
					font-family: PingFangSC;
					font-weight: 400;
					font-size: 14px;
					color: rgba(70, 82, 164, 1);
				}
			}
			.newpopups-footer-left-top-c{
				font-family: PingFangSC;
				font-weight: 400;
				font-size: 18px;
				color: rgb(16, 16, 16);
				span{
					font-family: PingFangSC;
					font-weight: 700;
					font-size: 20px;
					color: rgb(38, 66, 225);
				}
			}
			.newpopups-footer-left-top-r{
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border-radius: 20rpx;
				background-color: rgb(66, 88, 213);
				font-size: 14px;
				color: #FFFFFF;
			}
		}
		.newpopups-footer-bottom{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.newpopups-footer-bottom-l{
				display: flex;
				align-items: center;
				font-family: PingFangSC;
				font-weight: 400;
				font-size: 14px;
				color: rgb(16, 16, 16);
				span{
					color: #5da8ff;
				}
				.horseman-circle {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					border: 1rpx solid #ccc;
					box-sizing: border-box;
					margin-right: 4rpx;
					box-sizing: border-box;
					&.on {
						background: url(../../static/img/my/choice.png) no-repeat;
						background-size: cover;
						border: none;
					}
				}
			}
			.newpopups-footer-bottom-r{
				font-family: PingFangSC;
				font-weight: 400;
				font-size: 12px;
				color: #525E71;
				padding-right: 50rpx;
				padding-top: 5rpx;
				box-sizing: border-box;
			}
		}
	}
	.horseman-box {
		position: fixed;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		background: #000000;
		z-index: 999;
		background: rgba(0, 0, 0, 0.4);
		.horseman-item {
			width: 640rpx;
			// height: 592rpx;
			background-color: #fff;
			padding: 40rpx;
			border-radius: 7px;
			border-radius: 7px;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			.close {
				display: flex;
				justify-content: flex-end;
				box-sizing: border-box;
				image {
					width: 30rpx;
					height: 30rpx;
					transform: rotate(-270deg);
					border-radius: 1px;
					border-radius: 1px;
					box-sizing: border-box;
				}
			}
			.horseman-box-center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.center-header {
					image {
						width: 96rpx;
						height: 96rpx;
					}
				}
				.center-center {
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #09023e;
					margin: 30rpx 0;
					box-sizing: border-box;
				}
				.center-footer {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #09023e;
					text-align: justify;
					text {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #ff8516;
						text-align: justify;
						line-height: 17px;
					}
				}
			}

			.horseman-middle {
				margin-top: 50rpx;
				box-sizing: border-box;
				display: flex;
				width: 100%;
				height: 40rpx;
				align-items: center;
				.horseman-circle {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					border: 1rpx solid #ccc;
					box-sizing: border-box;
					&.on {
						background: url(../../static/img/my/choice.png) no-repeat;
						background-size: cover;
						border: none;
					}
				}
				.horseman-reader {
					margin-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, -2147483648, 0.3);
					line-height: 20px;
				}
				.horseman-protocol {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #7888ff;
					line-height: 20px;
				}
			}
			.horseman-button-box {
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				text-align: center;
				line-height: 70rpx;
				margin-top: 30rpx;
				padding-bottom: 30rpx;
				box-sizing: border-box;
				.horseman-button-left {
					width: 260rpx;
					height: 70rpx;
					background: #ff8516;
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #ffffff;
				}
				.horseman-button-right {
					width: 260rpx;
					height: 70rpx;
					background: #5468ff;
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #ffffff;
				}
			}
		}
	}
	/deep/.uni-popup__wrapper-box {
		width: 750rpx;
		// height: 650rpx;
		background: #ffffff;
		border-radius: 7px 7px 0 0;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		&.on {
			height: 100rpx;
		}
		.pop-left {
			width: 230rpx;
			height: 500rpx;
			.pop-left-day {
				width: 230rpx;
				height: 500rpx;
				background-color: #f7f7fa;
				text-align: center;
				.day {
					width: 230rpx;
					height: 140rpx;
					line-height: 140rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.3);
					&.afterday {
						width: 230rpx;
						height: 220rpx;
					}
					&.on {
						background: #ffffff;
						border-radius: 7px 0 0 0;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023e;
						box-sizing: border-box;
					}
				}
			}
		}
		.pop-right {
			width: 520rpx;
			// height: 650rpx;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;

			.right-timer-box {
				height: 500rpx;
				.timer-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 30rpx;
					box-sizing: border-box;
					&.takenow {
						height: 140rpx;
						padding-top: 0;
						box-sizing: border-box;
					}
					.item-left {
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9, 2, 62, 0.3);
						&.acitve {
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #5468ff;
						}
						&.second-left {
						}
					}
					image {
						width: 32rpx;
						height: 26rpx;
					}
				}
			}
		}
		.pop-button {
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			text-align: center;
			background: #5468ff;
			border-radius: 4px;
			border-radius: 4px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #ffffff;
			box-sizing: border-box;
		}
		.popups-header {
			width: 100%;
			height: 48rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 50rpx;
			box-sizing: border-box;
			.popups-header-left {
				margin-left: 308rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023e;
				letter-spacing: -0.41px;
				font-weight: bold;
			}
			.popups-header-right {
				height: 48rpx;
				display: flex;
				align-items: center;
				// margin-left: 100rpx;
				// box-sizing: border-box;
				margin-right: 70rpx;
				box-sizing: border-box;
				.price-rule {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: 0;
					text-align: right;
					padding-right: 10rpx;
					box-sizing: border-box;
				}
				image {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		.popups-main {
			width: 100%;
			// height: 270rpx;
			// margin-top: -220rpx;
			padding: 0 70rpx;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #f7f7fa;
			.popuos-main-item {
				width: 100%;
				height: 40rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.main-item-left {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: 0;
				}
				.main-item-right {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023e;
					letter-spacing: 0;
					text-align: right;
				}
			}
		}
		.popups-showBox {
			width: 100%;
			transition: all 0.5s;
		}
		.popups-footer {
			width: 100%;
			height: 160rpx;
			padding: 20rpx 30rpx 30rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.popups-footer-left {
				.footer-left-top {
					display: flex;
					align-items: center;
					.flt-left {
						display: flex;
						align-items: center;
						.flt-left-total {
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #09023e;
							letter-spacing: -0.34px;
						}
						.flt-left-price {
							font-family: PingFangSC-Semibold;
							font-size: 16px;

							color: rgba(9, 2, 62, 0.3);
							letter-spacing: -0.58px;
							margin-right: 30rpx;
							box-sizing: border-box;
							&.on {
								color: #ff8516;
							}
						}
					}
					.flt-right {
						display: flex;
						align-items: center;
						.price-detail {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #5468ff;
							letter-spacing: -0.29px;
							padding-left: 10rpx;
							margin-right: 15rpx;
							border-left: 1rpx solid #ccc;
							box-sizing: border-box;
						}
						image {
							width: 26rpx;
							height: 16rpx;
						}
						.up-down {
							transform: rotate(180deg);
							transition: 0.3s;
							&.on {
								transform: rotate(0deg);
							}
						}
					}
				}
				.footer-left-bottom {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9, 2, 62, 0.3);
					letter-spacing: -0.29px;
				}
			}
			.popups-footer-right {
				width: 280rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				background: #5468ff;
				border-radius: 22.5px;
				border-radius: 22.5px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #ffffff;
				letter-spacing: -0.34px;
				box-sizing: border-box;
				transform: translateY(10rpx);
			}
		}
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
				color: #09023e;
				letter-spacing: -0.41px;
				font-weight: bold;
				margin-right: 20rpx;
				box-sizing: border-box;
			}
			.popupPay-header-right {
				font-family: PingFangSC-Semibold;
				font-size: 24px;
				color: #ff8516;
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
				color: rgba(9, 2, 62, 0.3);
				letter-spacing: -0.34px;
			}
			.popupPay-middle-right {
				margin-left: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468ff;
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
				border: 1px solid rgba(9, 2, 62, 0.3);
				position: relative;
				.n-circle {
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
					background: #5468ff;
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
					color: rgba(9, 2, 62, 0.3);
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
			background: #5468ff;
			border-radius: 4px;
			border-radius: 4px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #ffffff;
			letter-spacing: -0.34px;
		}
	}
	.helpBuyTextArea{
		width: 700rpx;
		height: 240rpx;
		background-color: rgb(255, 255, 255);
		border-color: rgb(187, 187, 187);
		border-width: 1px;
		border-style: solid;
		font-size: 14px;
		line-height: 20px;
		font-weight: normal;
		font-style: normal;
		opacity: 1;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.scrollPadding{
		padding-top: 190rpx;
	}
	.textArea-box{
		transform: translateX(24rpx);
		position: relative;
		.needxiaopiao{
			position: absolute;
			right: 90rpx;
			bottom: 10rpx;
			font-size: 14px;
			color: rgba(145, 145, 145, 1);
			display: flex;
			align-items: center;
			z-index: 999;
			.xiaopiao-circle {
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				border: 1rpx solid #ccc;
				box-sizing: border-box;
				margin-right: 4rpx;
				box-sizing: border-box;
				&.on {
					background: url(../../static/img/my/choice.png) no-repeat;
					background-size: cover;
					border: none;
				}
			}
		}
	}
	.shopAppraisement{
		position: fixed;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.4);
		.shopAppraisement-wrapper{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: rgb(242, 234, 234);
			z-index: 9999;
			&.newTop{
				top: 39%;
			}
			.shopAppraisement-header{
				width: 750rpx;
				display: flex;
				justify-content: center;
				height: 90rpx;
				align-items: center;
				background-color: rgb(214, 218, 244);
				image{
					width: 30rpx;
					height: 30rpx;
					border-radius: 1px;
					border-radius: 1px;
					box-sizing: border-box;
					transform: translateX(200rpx);
				}
			}
			.shopAppraisement-center{
				width: 750rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.yufu{
					font-family: PingFangSC;
					font-weight: 400;
					font-size: 18px;
					span{
						
					}
				}
				.center-tip{
					font-family: PingFangSC;
					font-weight: 400;
					font-size: 12px;
					color: rgb(116, 116, 116);
				}
				.center-bottom-tip{
					font-family: PingFangSC;
					font-weight: 400;
					font-size: 10px;
					color: rgb(145, 145, 145);
				}
				.center-input-box{
					
					background-color: #fff;
					display: flex;
					padding: 10rpx;
					box-sizing: border-box;
					border-radius: 4rpx;
					margin: 10rpx 0;
					.shopAppraisement-input-left{
						font-family: PingFangSC;
						font-weight: 400;
						font-size: 18px;
						color: rgb(16, 16, 16);
						margin-right: 6rpx;
						box-sizing: border-box;
					}
					input{
						// width: 600rpx;
					}
				}
			}
			.shopAppraisement-bottom{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: 30rpx;
				box-sizing: border-box;
				margin-top: 10rpx;
				.shopAppraisement-bottom-submit{
					width: 300rpx;
					height: 72rpx;
					background-color: rgb(84, 104, 255);
					text-align: center;
					color: #FFFFFF;
					border-radius: 8px;
					font-size: 18px;
					line-height: 72rpx;
				}
			}
		}
	}
}
</style>
