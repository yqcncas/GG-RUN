<template>
	<view class="bill-detail">
		<view class="bill-header">
			<lyzml-datepicker ref="lyzmlDatePicker" :config="datePickerConfig" @onDateChange="onBirthDayChange" ></lyzml-datepicker>
			<image src="../../static/img/my/down.png" mode="aspectFill" class="down"></image>
		</view>
		<view class="bill-box">
			<view class="bill-item" v-for="item in billDetail" :key = "item.id" >
				<view class="item-header">{{item.remark}}</view>
				<view class="item-first">
					<view class="recharge">{{typeInfo[item.type]}}</view>
					<view class="number-blue">{{priceIncoInfo[item.type]}}{{item.amount}}</view>
				</view>
				<view class="item-second">
					<view class="createTimer">{{item.createTime}}</view>
					<view class="font-blue">{{status[item.status]}}</view>
				</view>
			</view>
		</view>
		 <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	
	export default {
		onLoad() {
			this.initOrderCurrent()
		},
		data () {
			return {
				//时间
				dataTime: '',
				//数据
				billDetail: [],
				hasFlag: true,
				//手动上拉加载
				i: 0,
				billDetailLength: 0,
				orderArr: [],
				//type对应的信息
				typeInfo: ['余额消费',"支付宝消费","微信消费",'退款','赔付','保证金充值','保证金扣除','骑手收入','骑手返佣',"用户返佣",'用户充值余额','用户充值返现','用户充值返现','用户充值返现','用户充值返现','用户充值返现','用户充值返现','用户充值返现','用户充值返现','用户充值返现'],
				priceIncoInfo: ['-',"-","-",'+','-','+','-','+','+',"+",'+','+','+','+','+','+','+','+','+','+'],
				status:['待审核',"通过","未通过"]
			}
		},
		computed: {
			datePickerConfig: function() {
				let retObj = {
					initType: "ym",
				};
				
				return retObj;
			}
		},
		methods:{
			onBirthDayChange(e) {
				this.dataTime = e.value;
				this.i = 0,
				this.billDetailLength = 0,
				this.orderArr = []
				this.initOrderCurrent()
			},
			
		
			//初始化
			async initOrderCurrent () {
				
				if (this.dataTime == "") {
					let day  = this.$dayjs().format("YYYY-MM")
					// console.log(day)
					let res = await this.$fetch(this.$api.orderCurrent,{dateQue:day},"POST","Form")
					console.log(res)
					
					res.rows.forEach(item => {
						let index = item.remark.lastIndexOf("-")
						// console.log(index)
						let str = item.remark.substring(index+1,item.remark.length);
						item.remark = str
					})
					
					
					if(res.code == 0) {
		
						if ( this.billDetail.length < res.total) {
							this.hasFlag = true
							this.orderArr = []
							
							for ( let i = this.i ; i < res.total; i++) {
								this.orderArr = res.rows.slice(this.i,this.i+10)
							 }
							 this.billDetailLength += this.orderArr.length
							 
							 if (this.billDetailLength <= res.total) {
							      //赋值
							 		this.billDetail = [...this.billDetail,...this.orderArr]
							   //赋值结束后判断是否还有值
							 		if(this.billDetail.length >= res.total){
							 			this.hasFlag = false
							 		}
							 	}
							 } else {
								
							 	this.hasFlag = false
							 }
							
						}
					
				} else {
					let res = await this.$fetch(this.$api.orderCurrent,{dateQue:this.dataTime},"POST","Form")
					console.log(JSON.stringify(res))
					if(res.code == 0) {
						this.billDetail = res.rows
					}
					if(res.total == 0) {
						this.hasFlag = false
					}
				}
				
				
			}
		},
		onReachBottom(){
		    //则在上拉加载时，slice的起始位置需要增加
		    this.i += 10
		    if(this.hasFlag){
				this.initOrderCurrent()
		    }
		}
	}
</script>

<style lang="less" >
	page{
		background-color: rgb(247,247,250);
	}
	.bill-detail{
		width: 100%;
		.bill-header{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;
			line-height: 100rpx;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #09023E;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgb(247,247,250);
			.down{
				width: 20rpx;
				height: 12rpx;
				margin-left: 10rpx;
				box-sizing: border-box;
			}
		}
		.bill-box{
			box-sizing: border-box;
			.bill-item{
				width: 100%;
				// height: 148rpx;
				padding: 30rpx 30rpx 26rpx 30rpx;
			
				background-color: #fff;
				box-sizing: border-box;
				border-bottom: 1rpx solid rgb(246,246,250);
				&:last-child{
					border-bottom: none;
				}
				&:first-child{
					// border-top: 1rpx solid rgb(247,247,250);
				}
				.item-header{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);

				}
				.item-first{
					width: 100%;
					height: 48rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.recharge{
						font-family: PingFangSC-Regular;
						font-size: 17px;
						color: #09023E;
					}
					.number-blue{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #5468FF;
						text-align: right;
					}
					.number-red{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #EC584E;
						text-align: right;
					}
					
				}
				.item-second{
					width: 100%;
					height: 34rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 10rpx;
					box-sizing: border-box;
					.createTimer{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
					}
					.font-blue{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #288BFF;
						text-align: right;
					}
					.font-green{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #1FB16A;
						text-align: right;
					}
					.font-gray{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
						text-align: right;
					}
				}
			}
		}
	}
	
</style>
