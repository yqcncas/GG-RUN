<template>
	<view class="apply-invioce">
		<view class="apply-item" v-for="(item,index) in applyInvioceInfo" :key = 'index' @tap="handleSelect(item,index)" >
			<view class="item-left" :class="{on:item.selected}"></view>
			<!-- <image src="../../static/img/my/choice.png" mode="aspectFill" ></image> -->
			<view class="item-right">
				<view class="right-title">
					<view class="right-title-order">
						<view class="order-left">
							<view class="order-number">订单编号</view>
							<view class="order-num">{{item.orderNo}}</view>
						</view>
						<view class="order-right">{{item.status == 5 ? "待评价" : "已完成"}}</view>
					</view>
					<view class="right-title-timer">
						<view class="submit-timer">发布时间</view>
						<view class="create-timer">{{item.estimatedTime}}</view>
					</view>
				</view>
				<view class="right-main">
					<view class="main-left">
						<view class="start">起</view>
						<view class="line">
							<div class="content">
							</div>
						</view>
						<view class="end">终</view>
					</view>
					<view class="main-right">
						<view class ='main-right-header'>
							<view class="header-start-name">{{JSON.parse(item.startAddress).title}}</view>
							<view class="header-start-address">{{JSON.parse(item.startAddress).name}}</view>
							<view class="header-start-user">{{JSON.parse(item.startAddress).userName}}  {{JSON.parse(item.startAddress).mobile}}</view>
						</view>
						<view class ='main-right-end-header'>
							<view class="header-end-name">{{JSON.parse(item.endAddress).title}}</view>
							<view class="header-end-address">{{JSON.parse(item.endAddress).addressDetail}}</view>
							<view class="header-end-user">{{JSON.parse(item.endAddress).userName}}  {{JSON.parse(item.endAddress).mobile}}</view>
						</view>
					</view>
				
				</view>
				<view class="main-bottom">
					<view class="bottom-left">
						<view class="total">合计：</view>
						<view class="bottom-left-price">¥{{item.payAmount}}</view>
					</view>
					<view class="bottom-right" @tap.stop="goToDeatail(item.id,item.status)">订单详情</view>
				</view>
			</view>
		</view>
		<view class="apply-button">
			<view class="button-left" @tap="handleCheckall">
				<view class="button-circle" :class="{on:isCheckAll}"></view>
				<view class="choice-all">全选</view>
			</view>
			<view class="button-right" @tap="goToOpenInvioce">下一步</view>
		</view>
		 <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.initInvoiceInfo()
		},
		onShow() {
			this.selectedList = []
			this.sumArr = []
			
			this.applyInvioceInfo.forEach(item => {
				if(item.selected) {
					this.selectedList.push(item)
				}
			})
			
			if (uni.getStorageSync('backFlag')) {
				this.selectedList = []
				this.sumArr = []
				this.initInvoiceInfo()
				uni.removeStorageSync('backFlag')
			}
			
			
			// this.initInvoiceInfo()
		},
		data () {
			return {
				currentIndex: '',
				//所有数据
				applyInvioceInfo: [],
				isCheckAll: false,
				//选中数据
				selectedList: [],
				hasFlag: false,
				//价格数据
				sumArr: []
			}
		},
		watch: {
		    'applyInvioceInfo': {
		        handler: function(newVal) {
		        	let selectCount = 0
		         //如循环的数据的选中状态为true，则变量++
		        	newVal.forEach(item => {
		        		if (item.selected) selectCount ++
		        	})
		         //当变量的值 === 数据的长度时全选
		        	if (selectCount === newVal.length) {
		                 //判断是否全选
		        		this.isCheckAll = true;
		        	} else {
		        		this.isCheckAll = false;
		        	}
					
					if(selectCount == 0) {
						this.isCheckAll = false;
					}
		        },
		        deep: true
		    }
		},
		computed:{
			// completePrice(){
			// 	return this.selectedList.reduce((pre,todo) => pre + todo.payAmount,0)
			// }
		},
		methods: {
			//到开发票
			goToOpenInvioce () {
				if (this.selectedList.length <= 0 ) {
					uni.showToast({
						icon: 'none',
						title: '请选择您需要申请的发票'
					})
					return
				}
				//合计

				let arr = ''
				this.selectedList.forEach((item)=>{
					arr = arr + ',' + item.id
				})
				arr = arr.substr(1)

				
				this.sumArr = []
				this.completePrice = 0
				this.selectedList.forEach((item)=>{
					
					console.log(item.payAmount)
					this.sumArr.push(item.payAmount)
				})
				
				for(let i = 0; i < this.sumArr.length;i++) {
					
					this.sumArr[i] = Number(this.sumArr[i])
					this.completePrice += this.sumArr[i]
		
				}
				
				this.completePrice = parseFloat(this.completePrice).toFixed(2)
	
				if (this.completePrice < 200) {
					uni.showToast({
						icon: 'none',
						title: '开票金额最低200元'
					})
					return
				}
				
				
				uni.navigateTo({
					url: '../openInvioce/openInvioce?price=' + this.completePrice + '&subString=' + arr
				})
			},
			//订单详情
			async goToDeatail (id,status) {
					
				let res = await this.$fetch(this.$api.orderDetail,{id:id},"POST","Form")
			
				if (res.code == 0) {
					uni.navigateTo({
						url:'../orderDetail/orderDetail?orderDetail=' + JSON.stringify(res.data) + "&currentIndex=" + (status -1)
					})
				}
				
			},
			//单选
			handleSelect (item,index) {
				console.log(item.selected)
				item.selected = !item.selected
				
				
				let isExist = this.selectedList.indexOf(item);
			
				    if(isExist > -1){
				    	this.selectedList.splice(isExist,1);
						
						console.log(this.selectedList)
				    }else {
				    	// push 数组里
				    	this.selectedList.push(item);
			
				    }
					
				
					
				    //再次全选
				    if(this.selectedList.length == this.applyInvioceInfo.length){
				    	this.isCheckAll = true;
					
				    }else {
				    	this.isCheckAll = false;
				
				    }
			},
			
			 //全选
			 handleCheckall(){
			     //取反
			     this.isCheckAll = !this.isCheckAll
			     let arr = [];
			     //把获取到的数据里的选择状态全部等于 是否全选中的状态
			     this.applyInvioceInfo.forEach((item,i) => {
			     	item.selected = this.isCheckAll;
			     	arr.push(item);
			     })
			     //判断选中状态的数组 是否已经全选 如为真则变成上面的新数组
			     this.selectedList = this.isCheckAll ? arr : [];
				 
			 },
			 
			async initInvoiceInfo() {
				let res = await this.$fetch(this.$api.orderCustomer,{status:5,invoiceFlag:0},"POST")
				
				let msg = await this.$fetch(this.$api.orderCustomer,{status:6,invoiceFlag:0},"POST")
	
				this.applyInvioceInfo = [...res.rows,...msg.rows]
				// res.rows.forEach((item) => {
				// 	item.selected = false
				// })
				// msg.rows.forEach((item) => {
				// 	item.selected = false
				// })
				this.applyInvioceInfo = Array.from(this.applyInvioceInfo)
				for (let i = 0; i < this.applyInvioceInfo.length; i++) {
					console.log(i)
					if (this.applyInvioceInfo[i].type == 2) {
							this.applyInvioceInfo[i].payAmount = Number(this.applyInvioceInfo[i].payAmount - this.applyInvioceInfo[i].goodsPredictAmount).toFixed(2)
						}
						
						JSON.parse(this.applyInvioceInfo[i].startAddress).addressDetail = JSON.parse(this.applyInvioceInfo[i].startAddress).addressDetail.replace('undefined', '')
						
						// this.applyInvioceInfo[i].endAddress.addressDetail = this.applyInvioceInfo[i].endAddress.addressDetail.replace('undefined', '')
				}
				
			}
			 
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.apply-invioce{
		width: 100%;
		padding: 0 30rpx 150rpx;
		box-sizing: border-box;
		.apply-item{
			width: 100%;
			// height: 544rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.item-left{
				width: 44rpx;
				height: 44rpx;
				border-radius: 50%;
				border: 1px solid rgba(9,2,62,0.30);
				box-sizing: border-box;
				background-size: cover;
				&.on {
					background: url('../../static/img/my/choice.png') no-repeat;
					background-size: cover;
					border: none;
				}
			}
			image{
				width: 44rpx;
				height: 44rpx;	
			}
			.item-right{
				width: 624rpx;
				// height: 544rpx;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				border-radius: 7px;
				margin-top: 30rpx;
				box-sizing: border-box;
				.right-title{
					padding: 30rpx 30rpx 20rpx 30rpx;
					box-sizing: border-box;
					.right-title-order{
						display: flex;
						justify-content: space-between;
						.order-left{
							display: flex;
							.order-number{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #09023E;
							
							}
							.order-num{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #09023E;
								margin-left: 20rpx;
								box-sizing: border-box;
							}
						}
						.order-right{
							padding: 2rpx 12rpx;
							background: rgba(84,104,255,0.20);
							border-radius: 2px;
							border-radius: 2px;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #5468FF;
							text-align: center;
							box-sizing: border-box;
						}
					}
					.right-title-timer{
						display: flex;
						padding: 10rpx 0;
						border-bottom: 1rpx solid #FBFAF8;
						box-sizing: border-box;
						.submit-timer{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #09023E;
							
						}
						.create-timer{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #09023E;
							margin-left: 20rpx;
							box-sizing: border-box;
						}
					}
				}
				.right-main{
					width: 100%;
					// height: 312rpx;
					padding: 58rpx 30rpx 0;
					box-sizing: border-box;
					display: flex;
					border-bottom: 1rpx solid #FBFAF8;
					.main-left{
						height: 243rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding-bottom: 60rpx;
						// border-bottom: 1rpx solid #ccc;
						box-sizing: border-box;
						.start,.end{
							width: 42rpx;
							height: 42rpx;
							border: 1px solid #09023E;
							border-radius: 50%;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #09023E;
							text-align: center;
							box-sizing: border-box;
						}
						.line{
							width: 0;
							height: 60%;
							border-left: 2rpx dashed #fff;
							background: linear-gradient(to bottom, #09023E, #5468FF);
							background-origin: border-box;
							.content {
								height: 100px;
								background-color: #fff;
							}
					
						}
						.end{
							border: 1px solid #5468FF;
							color: #5468FF;
						}
					}
					.main-right{
						width: 100%;

						.main-right-header{
							width: 500rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;

							margin-left: 20rpx;
							transform: translateY(-34rpx);
							box-sizing: border-box;
							.header-start-name{
								font-family: PingFangSC-Semibold;
								font-size: 14px;
								color: #09023E;
							}
							.header-start-address{
								width: 500rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #09023E;
							}
							.header-start-user{
							width: 500rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(9,2,62,0.30);
							}
						}
						.main-right-end-header{
							padding-left: 20rpx;
							margin-top: 8rpx;
							padding-bottom: 30rpx;
							// border-bottom: 1rpx solid #ccc;
							box-sizing: border-box;
							.header-end-name{
								font-family: PingFangSC-Semibold;
								font-size: 14px;
								color: #5468FF;
							}
							.header-end-address{
								width: 500rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #5468FF;
							}
							.header-end-user{
								
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(9,2,62,0.30);
							}
						}
					}
					
				}
				.main-bottom{
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					box-sizing: border-box;
					.bottom-left{
						display: flex;
						.total{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(9,2,62,0.30);
						}
						.bottom-left-price{
							font-family: PingFangSC-Semibold;
							font-size: 14px;
							font-weight: bold;
							color: #5468FF;
						}
					}
					.bottom-right{
						width: 160rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border: 1px solid rgba(9,2,62,0.50);
						border-radius: 15px;
						border-radius: 15px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9,2,62,0.50);
						letter-spacing: -0.34px;
					}
				}
			}
		}
		.apply-button{
			width: 100%;
			height: 110rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;
			.button-left{
				display: flex;
				align-items:center;
				.button-circle{
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					border: 1px solid rgba(9,2,62,0.30);
					box-sizing: border-box;
					&.on{
						background: url(../../static/img/my/choice.png) no-repeat;
						background-size: cover;
						border: none;
					}
				}
				.choice-all{
					padding-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
				}
			}
			.button-right{
				
				width: 160rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				background: #5468FF;
				border-radius: 2px;
				border-radius: 2px;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
			}
		}
	}
</style>
