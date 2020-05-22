<template>
	<view class="evaluaete">
		<view class="evaluaete-header">
			<view class="tui-rate-container">
				<view class="tui-title"> 服务评分</view>
				<tui-rate :current="serverStart" @change="changeServe" normal="#E6E5ED" active="#FFAF00" :size="26"></tui-rate>
			</view>
			<view class="tui-rate-container">
				<view class="tui-title"> 按时达评分 </view>
				<tui-rate :current="punctualityStart" @change="punctualityServe" normal="#E6E5ED" active="#FFAF00" :size="26"></tui-rate>
			</view>
			<view class="anonymity" @tap="handleAnonyClick">
				<view class="anonymity-circle" :class="{on:anonyClick == 1}" ></view>
				<view class="anonymity-name" >匿名评价</view>
		</view>
		</view>
		<!-- 评价 -->
		<view class="evaluate">
			<textarea v-model="evaluateContext" placeholder="请给你的骑手评价" class="eva-textarea" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
			<view class="upload-box">
				<view class="upload-imgList">
					<view class="upload-item" v-for="(item,index) in richTextList" :key="index">
						<image :src="item" mode="aspectFill"  @tap="previewImg" :data-url="item"></image>
						<image src="../../static/img/order/delete.png" mode="aspectFill" class="icon" @tap.stop="DelImage" :data-index="index"></image>
					</view>
				</view>
				<view class="upload" v-if="richTextList.length<4" @click="uploadImage">
					<view class="line-box">
						<view class="h-line"></view>
						<view class="z-line"></view>
					</view>
					<view class="upload-main">最多上传4张</view>
				</view>
			</view>
			
		</view>
		<!-- 投诉 -->
		<view class="complaint">
			<view class="complaint-header">投诉</view>
			<view class="complaint-box">
				<view class="complaint-item" v-for="(item,index) in complaintInfo" :key = "index" @tap="handleClick(index)">
					<view class="circle" >
						<view class="n-circle" v-show="isComplaint == index"></view>
					</view>
					<view class="info">{{item.remark}}</view>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="submit" @tap="submit">提交</view>
	</view>
</template>

<script>
	import tuiRate from "@/components/rate/rate"
	import baseURL from '../../config/index.js'
	export default {
		onLoad(options){
			
			this.orderId = options.orderId
			this.initEvaluateConfig()
		},
	    data () {
			return{
				loadding: false,
				show: false,
				//星级
				serverStart: 5,
				punctualityStart: 5,
				//匿名
				anonyClick: 1,
				//选项
				complaintInfo:[],
				//图片
				richTextList: [],
				imgList:[],
				//订单ID
				orderId: '',
				//投诉按钮
				isComplaint: -1,
				evaluateContext: ''
			}
		},
		components:{
			tuiRate
		},
		methods: {
			//控制服务评分
			changeServe (e) {
				this.serverStart = e.index
			},
			//控制准时评分
			punctualityServe (e) {
				this.punctualityStart = e.index
			},
			
			//控制匿名
			handleAnonyClick () {
				// this.anonyClick = !this.anonyClick
				if (this.anonyClick == 1) {
					this.anonyClick = 0
				} else {
					this.anonyClick = 1
				}
			},
			//控制投诉
			handleClick (index) {
				if (index != this.isComplaint) {
					this.isComplaint = index
				} else {
					this.isComplaint = -1
				}
			},
			//上传图片
			uploadImage(){
				let token = uni.getStorageSync('token')
				uni.chooseImage({
					count:4,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						for(let i = 0; i < res.tempFilePaths.length; i++){
							uni.uploadFile({
								url:baseURL+this.$api.upLoad,
								filePath:res.tempFilePaths[i],
								name:'file',
								header:{token},
								success: (uploadFileRes) => {
									console.log(uploadFileRes);
									let imgInfo = JSON.parse(uploadFileRes.data)
									this.richTextList.push(imgInfo.url)
									this.imgList.push(imgInfo.fileName)
								}
							})
						}
					}
				})
				
				console.log(this.imgList);
			},
			//删除图片
			DelImage(e) {
				uni.showModal({
					title: '是否删除图片',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.richTextList.splice(e.currentTarget.dataset.index, 1)
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//预览图片
			previewImg(e){
				uni.previewImage({
					urls:this.richTextList,
					current:e.currentTarget.dataset.url
				})
			},
			//提交
			async submit () {
				// console.log({orderId:this.orderId,evaluatePic:this.richTextList,evaluateType:0,
				// 	serviceScore:this.serverStart,timeScore:this.punctualityStart,anonymousFlag:this.anonyClick,evaluateContent:this.evaluateContext})
				console.log(this.isComplaint)
				
				if (this.isComplaint >= 0) {
					console.log({orderId:this.orderId,evaluatePic:JSON.stringify(this.richTextList),evaluateType:1,complaintType:this.complaintInfo[this.isComplaint].propertyName,
					serviceScore:this.serverStart,timeScore:this.punctualityStart,anonymousFlag:this.anonyClick,evaluateContent:this.evaluateContext.trim()})
					
					let res = await this.$fetch(this.$api.orderEvaluate,{orderId:this.orderId,evaluatePic:JSON.stringify(this.richTextList),evaluateType:1,complaintType:this.complaintInfo[this.isComplaint].propertyName,
					serviceScore:this.serverStart,timeScore:this.punctualityStart,anonymousFlag:this.anonyClick,evaluateContent:this.evaluateContext.trim()},"POST") 
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '评价成功'
						})
						uni.setStorageSync('userSelect',5) 
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
				} else {
					
					console.log({orderId:this.orderId,evaluatePic:JSON.stringify(this.richTextList),evaluateType:1,complaintType:this.isComplaint,
					serviceScore:this.serverStart,timeScore:this.punctualityStart,anonymousFlag:this.anonyClick,evaluateContent:this.evaluateContext.trim()})
					
					console.log(1111212)
					
					let res = await this.$fetch(this.$api.orderEvaluate,{orderId:this.orderId,evaluatePic:JSON.stringify(this.richTextList),evaluateType:0,
					serviceScore:this.serverStart,timeScore:this.punctualityStart,anonymousFlag:this.anonyClick,evaluateContent:this.evaluateContext.trim()},"POST")
					 
					console.log(res)
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '评价成功'
						})
						uni.setStorageSync('userSelect',5) 
						setTimeout(() =>{
							uni.switchTab({
								url: '../order/order',
							})
						},1000)
					}else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					
					
				}
				
			},
			//投诉配置
			async initEvaluateConfig () {
				let res = await this.$fetch(this.$api.orderConfig,{},'GET','Form')
				console.log(res)
				this.complaintInfo = res.data
			}
		}
		
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.evaluaete{
		padding-bottom: 120rpx;
		font-size: 14px;
		box-sizing: border-box;
		.evaluaete-header{
			background-color: #fff;
			padding-top: 30rpx;
			box-sizing: border-box;
			.tui-rate-container{
				display: flex;
				align-items: center;
				// margin-top: 30rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				.tui-title{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: 4.5px;
				}
				
			}
			.anonymity{
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				margin-top: 30rpx;
				padding-bottom: 30rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #F7F7FA;
				background-color: #fff;
				.anonymity-circle{
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1rpx solid #9B98B0;
					margin-right: 20rpx;
					box-sizing: border-box;
					&.on{
						background: url(../../static/img/my/choice.png) no-repeat;
						background-size: cover;
						border: none;
					}
				}
				.anonymity-name{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
				}
			}
		}
		
		.evaluate{
			width: 100%;
			height: 630rpx;
			background-color: #fff;
			.eva-textarea{
				width: 100%;
				height: 450rpx;
				padding: 30rpx;
				box-sizing: border-box;
			}
			.upload-box{
				display: flex;
				align-items: center;
				padding:0 30rpx;
				box-sizing: border-box;
				.upload-imgList{
					display: flex;
					.upload-item{
						position: relative;
						margin-right: 30rpx;
						box-sizing: border-box;
						&:last-child{
							margin-right: 0;
						}
						image{
							width: 150rpx;
							height: 150rpx;
							vertical-align: bottom;
						}
						.icon{
							width: 40rpx;
							height: 40rpx;
							position: absolute;
							right: 0;
							top:0;
							z-index: 999;
						}
					}
					
				}
				.upload{
					width: 150rpx;
					height: 150rpx;
					border: 1px dashed rgba(9,2,62,0.30);
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
					box-sizing: border-box;
					.line-box{
						width: 44rpx;
						height: 44rpx;
						display: flex;
						align-items: center;
						position: relative;
					
						.h-line{
							width: 44rpx;
							height: 2rpx;
							background: rgba(9,2,62,0.30);
							border-radius: 2px;
							border-radius: 1.5px;
							box-sizing: border-box;
						}
						.z-line{
							width: 2rpx;
							height: 44rpx;
							background: rgba(9,2,62,0.30);
							border-radius: 2px;
							border-radius: 1.5px;
							box-sizing: border-box;
							position: absolute;
							left:50%;
							transform: translateX(-50%);
						}
					}
					
					.upload-main{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
					}
				}
			}
			
		}
		.complaint{
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-top: 30rpx;
			box-sizing: border-box;
			.complaint-header{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				font-weight: bold;
				letter-spacing: -0.41px;
			}
			.complaint-box{
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
		}
		.submit{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			box-sizing: border-box;
			text-align: center;
		}
	}
</style>
