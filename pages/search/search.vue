<template>
	<view class="search">
		<view class="search-box">
			<view class="search-input-box">
				<image src="../../static/img/order/search.png" mode="aspectFill" class="search-img"></image>
				<input type="text" placeholder="请输入电话/地址/姓名" class="search-input" v-model="seachKey" @blur="initOrder">	
			</view>
		
		</view>
		<view class="main-box" >
			<view class="main-item" v-for="(item,index) in searchOrderInfo" :key = "index" @tap="goToDeatail(item.id,item.status)">
			<view class="main-header">
				<view class="header-top">
					<view class="top-box" @tap.stop="copyNumber(item.orderNo)">
						<view class="order-number">订单编号</view>
						<view class="order-num">{{item.orderNo}}</view>
						<image src="../../static/img/order/fuzhi.png" mode="aspectFill" class="copy"></image>
					</view>
					<view class="header-button " :class="{waittake: currentIndex == 1,waitgather: currentIndex == 2,complete:currentIndex == 5} ">{{status[item.status]}}</view>
				</view>
				<view class="header-bottom">
					<view class="sub-time">发布时间</view>
					<view class="create-time">{{item.createTime}}</view>
				</view>
			</view>
			<view class="main-center">
				<view class="center-left">
					<view class="left-top">起</view>
					<view class="left-line">
						<div class="content">
						</div>
					</view>
					<view class="left-bottom">终</view>
				</view>
			<view class="center-right">
				<view class="right-top">
					<view class="right-top-header">
						<view class="top-title">{{item.startAddress.title}}</view>
						<!-- <view class="top-dist">800米</view> -->
					</view>
					<view class="right-top-center">{{item.startAddress.addressDetail}}</view>
					<view class="right-top-footer">{{item.startAddress.userName}} {{item.startAddress.mobile}}</view>
				</view>
				<view class="right-bottom">
					<view class="right-bottom-header">
						<view class="bottom-title">{{item.endAddress.title}}</view>
						<!-- <view class="bottom-dist">800米</view> -->
					</view>
					<view class="right-bottom-center">{{item.endAddress.addressDetail}}</view>
					<view class="right-bottom-footer">{{item.endAddress.userName}} {{item.endAddress.mobile}}</view>
				</view>
			</view>
			</view>
			<view class="main-bottom">
			<view class="bottom-left">
				<view class="total">合计：</view>
				<view class="price">¥{{item.payAmount}}</view>
			</view>
			<view class="bottom-right">
				<!-- <view class="cancel-order" @tap.stop="goToCancelOrder(item.id)" v-if=" currentIndex == 1 || currentIndex == 2 || currentIndex == 3 || currentIndex == 0 ">取消订单</view> -->
				<view class="detail-order" @tap.stop="goToDeatail(item.id)">订单详情</view>
			</view>
		</view>
		</view>
		</view>
		<uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		
		data () {
			return {
				status: ['已取消','待支付','待接单','待收取','进行中','待评价','已完成'],
				seachKey: '',
				hasFlag:false,
				pageNum:0,
				searchOrderInfo: [],
				searchArr: [],
				searchArrLength : 0,
				i: 0
			}
		},
		methods:{
			async initOrder () {
	
				let res = await this.$fetch(this.$api.orderCustomer,{status:'',keyLike:this.seachKey,pageNum:this.pageNum,pageSize:10},"POST")
				console.log(res)
				// this.searchOrderInfo = [...this.searchOrderInfo,...res.rows]
				
				if (this.searchOrderInfo.length < res.total) {
					this.hasFlag = true
					this.searchArr = []
					for (let i = this.i ; i < res.total ; i++) {
						this.searchArr = res.rows.slice(this.i,this.i + 10)
					}
					
					this.searchArrLength += this.searchArr.length
					this.searchArr.forEach(item => {
						item.startAddress = JSON.parse(item.startAddress)
						item.endAddress = JSON.parse(item.endAddress)
					})
					
					if(this.searchArrLength <= res.total) {
						this.searchOrderInfo = [...this.searchOrderInfo,...this.searchArr]
						// console.log(this.orderList.length,res.total)
						console.log(JSON.stringify(this.searchOrderInfo))
						if(this.searchOrderInfo.length >= res.total){
							this.hasFlag = false

						}
					}
				} else {
					this.hasFlag = false
				}
			
			},
			async goToDeatail (id,status) {
				console.log(id)
				let res = await this.$fetch(this.$api.orderDetail,{id:id},"POST","Form")
				console.log(res)
				if (res.code == 0) {
					if (status -1 == -1) {
						status = 7
					}
					if (this.status == 3) {
						uni.navigateTo({
							url:'../orderDetail/orderDetailing?orderDetail=' + JSON.stringify(res.data) + "&currentIndex=" + (status -1)
						})
					} else {
						uni.navigateTo({
							url:'../orderDetail/orderDetail?orderDetail=' + JSON.stringify(res.data) + "&currentIndex=" + (status -1)
						})
					}
					
				}
				
			},
			//复制
			copyNumber (orderId) {
				uni.setClipboardData({
						data: orderId,
						success() {
							
						}	
					})
			},
		},
		onReachBottom(){
			this.i += 10
		    if(this.hasFlag){
				this.initOrder()
			}
		},
		watch:{
			seachKey(value,oldvalue){
				if (value != oldvalue) {
					this.i = 0
					this.searchOrderInfo = []
					this.searchArr = []
					this.searchArrLength = 0
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f7f7fa;
	}
	.search{
		width: 100%;
		overflow-x: hidden;
		.search-box{
			width: 100%;
			height: 104rpx;
			background-color: #fff;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			.search-input-box{
				width: 690rpx;
				height: 72rpx;
				background: #F7F7FA;
				border-radius: 10px;
				border-radius: 10px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				.search-img{
					width: 28rpx;
					height: 28rpx;
					margin: 0 20rpx;
					box-sizing: border-box;
				}
				.search-input{
					width: 500rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: -0.34px;
					line-height: 22px;
				}
			}
		}
		.main-box{
			// margin-top: 30rpx;
			padding: 30rpx;
			box-sizing: border-box;
			
		}
		.main-item{
			margin-top: 30rpx;
			box-sizing: border-box;
			&:first-child{
				margin-top: 0;
			}
		}
		.main-header{
			padding: 20rpx;
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
						width: 18rpx;
						height: 18rpx;
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
			padding: 20rpx;
			width: 100%;
			// margin-top: 30rpx;
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
					
					.right-top-header{
						
						display: flex;
						justify-content: space-between;
						
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
				}
			}
		}
		.main-bottom{
			padding: 20rpx;
			// height: 120rpx;
			width: 100%;
			// margin-top: 32rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			align-items: center;
			.bottom-left{
				display: flex;
				align-items: center;
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
			}
			.bottom-right{
				display: flex;
				.cancel-order,.detail-order{
					width: 160rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border: 1px solid rgba(9,2,62,0.50);
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
</style>
