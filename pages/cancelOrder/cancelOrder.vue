<template>
	<view class="cancel-order">
		<view class="cancel-header">
			<textarea v-model="cancelPerson" placeholder="请输入取消订单原因" placeholder-style = "font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
		</view>
		
		<view class="complaint-box">
			<view class="complaint-item" v-for="(item,index) in cancelList" :key = "index" @tap="handleClick(index,item)">
				<view class="circle" >
					<view class="n-circle" v-show="isComplaint == index"></view>
				</view>
				<view class="info">{{item}}</view>
			</view>
		</view>
		
		<!-- <view class="cancel-bottom">
			<view>
				<parser :html="cancelRichText"></parser>
			</view>
		</view> -->
		<view class="cancel-button" @tap="cancelSubmit">提交</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	export default {
		onLoad(options) {
			console.log(options)
			this.orderId = options.orderId
			this.initRichText()
		},
		data () {
			return {
				orderId: '',
				cancelPerson: '',
				cancelRichText: '',
				isComplaint: -1,
				cancelList: ['信息填写错误,重新下单','临时有事，我不需要了','其他原因']
			}
		},
		components:{
			parser
		},
		methods:{
			async cancelSubmit () {
				if (this.cancelPerson.trim() == "") {
					uni.showToast({
						icon: 'none',
						title: '请填写取消订单的原因'
					})
					return
				}
				let res = await this.$fetch(this.$api.orderCancel,{orderId:this.orderId,cancelRemark:this.cancelPerson},"POST","Form")
				console.log(res)
				if (res.code == 0) {
					this.cancelPerson = ""
					uni.showToast({
						icon: 'success',
						title: '取消订单成功'
					})
					uni.setStorageSync('userSelect',6) 
					setTimeout(() =>{
						uni.switchTab({
							url: '../order/order',
						})
					},1000)
					
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			},
			async initRichText () {
				let res = await this.$fetch(this.$api.articleType,{type:8},"Post","Form")
				
				if (res.code == 0) {
					this.cancelRichText = res.data[0].articleContent
				}
			},
			handleClick (index,item) {
				if (index != this.isComplaint) {
					this.isComplaint = index
				} else {
					this.isComplaint = -1
				}
				console.log(item)
				this.cancelPerson = item
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.cancel-order{
		.cancel-header{
			width: 100%;
			height: 630rpx;
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			textarea{
				width: 100%;
				height: 100%;
				font-size: 14px;
			}
		}
		.complaint-box{
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			.complaint-item{
				display: flex;
				align-items: center;
				margin-top: 28rpx;
				
				box-sizing: border-box;
				
				&:first-child{
					margin-top: 20rpx;
					box-sizing: border-box;
				}
				
				.circle{
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1px solid #9B98B0;
					box-sizing: border-box;
					// position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					.n-circle{
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						background: #5468FF;
						// position: absolute;
						// left: 50%;
						// top: 50%;
						// transform: translate(-50%,-50%);
					}
				}
				.info{
					margin-left: 20rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
					text-align: justify;
				}
			}
		}
		.cancel-bottom{
			margin: 30rpx 0;
			padding: 30rpx;
			box-sizing: border-box;
			width: 100%;
			height: 426rpx;
			background-color: #fff;
			// text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: rgba(9,2,62,0.30);
			view{
				// padding-top: 66rpx;
				// padding: 30rpx;
				box-sizing: border-box;
			}
		}
		.cancel-button{
			width: 100%;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>
