<template>
	<view class="open-invioce">
			<view class="open-header">
				<view class="header-total-price">开票总金额</view>
				<view class="header-price">
					<view>¥</view>
					<input type="number" v-model="price" disabled="true" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;"/>
				</view>
			</view>
			<view class="open-middle">
				<view class="middle-title">开票形式</view>
				<view class="middle-button">
					<view class="button-left" :class="{active: currentIndex === 0 }" @tap="handleCurrentIndex(0)">电子发票</view>
					<view class="button-right" :class="{active: currentIndex === 1}" @tap="handleCurrentIndex(1)">纸质发票</view>
				</view>
			</view>
			<view class="left-bottom" >
				<view class="left-header">发票详情</view>
				<view class="header-input-box">
					<input type="text" class="header-input" placeholder="请输入发票抬头" v-model="cheque" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;">
				</view>
				<view class="header-input-box">
					<input type="text" class="header-input" @blur="checkDuty" placeholder="请输入税号" v-model="duty" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;">
				</view>
				<view class="email-title">接收方式</view>
				<view class="header-input-box" v-if="currentIndex == 0">
					<input type="text" class="email-input" @blur="checkEmail" placeholder="请输入电子邮件"  v-model="email" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;"/>
				</view>
				<view v-show="currentIndex == 1" class="right-box">
					<view class="right-input">
						<input type="text" placeholder="请输入收件人" class="recipients" v-model="recipients" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;"/>
					</view>
					<view class="right-input">
						<input type="number" @blur="checkPhone" placeholder="请输入联系电话" class="phone" v-model="phone" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;"/>
					</view>
					<textarea type="text" placeholder="请输入接收地址" class="address"  v-model="address" placeholder-style="font-family: PingFangSC-Semibold;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.58px;" placeholder-class="textColor"/>
				</view>
			</view>
			<!-- <view class="submit" @tap="invioceSubmit">提交</view> -->
		
		<view class="submit" @tap="invioceSubmit">提交</view>
		
	</view>
</template>

<script>
	export default {
		onLoad(options){
			console.log(options)
			this.price = options.price

			this.price = Number(this.price).toFixed(2)

			this.subString = options.subString

		},
		data () {
			return {
				price: '', //输入的金额
				currentIndex: 0, //下标
				cheque: '',  //抬头
				duty: '', //税号
				email: '', //邮箱
				recipients: '',//收件人
				phone: '',
				address: '',
				//接口参数
				subString: '',
				//正则
				dutyFlag: '',
				emailFlag: '',
				phoneFlag: '',
				
			}
		},
		methods:{
			handleCurrentIndex (number) {
				this.currentIndex = number
			},
			async invioceSubmit () {
				
				if (this.dutyFlag) {
					uni.showToast({
						icon: 'none',
						title: '请检查税号是否输入正确'
					})
					return
				}
				
				if (this.emailFlag) {
					uni.showToast({
						icon: 'none',
						title: '请检查邮箱是否输入正确'
					})
					return
				}
				
				if (this.currentIndex === 0) {
					if (this.cheque == "" || this.duty == "" || this.email == "" || this.dutyFlag) {
						uni.showToast({
							icon: 'none',
							title: '请检查输入的内容'
						})
						return
					}
					
					
					
					let res = await this.$fetch(this.$api.invoiceApply,{totalAmount:this.price,dutyParagraph:this.duty,invoiceRise:this.cheque,email:this.email,type:0,orderIds:this.subString},"POST")
					
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '申请成功'
						})
						uni.setStorageSync('backFlag',true)
						setTimeout(() =>{
							uni.navigateBack({
								delta:1
							})
							
							// uni.redirectTo({
							// 	url: '../applyInvioce/applyInvioce',
							// 	success(){
							// 	    let page = getCurrentPages().pop();  //跳转页面成功之后
							// 	    if (!page) return;  
							// 	    page.onLoad(); //如果页面存在，则重新刷新页面
							// 	}
							// });
						},1000)
					}else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}
				if (this.currentIndex === 1) {
					if(this.phoneFlag) {
						uni.showToast({
							icon:'none',
							title: '您输入的手机号码有误'
						});
						return
					}
					
					if (this.cheque == "" || this.duty == "" || this.recipients == "" || this.phone == "" || this.address == ""){
						uni.showToast({
							icon:'none',
							title: '请检查您输入的内容是否有误'
						});
						return
					}
					
					
					let res = await this.$fetch(this.$api.invoiceApply,{totalAmount:this.price,dutyParagraph:this.duty,invoiceRise:this.cheque,type:1,orderIds:this.subString,address:this.address,mobile:this.phone,name:this.recipients},"POST")
					
					if (res.code == 0) {
						uni.showToast({
							icon: 'success',
							title: '申请成功'
						})
						
						uni.setStorageSync('backFlag',true)
						setTimeout(() =>{
							uni.navigateBack({
								delta:1
							})
							
							// uni.redirectTo({
							// 	url: '../historyInvioce/historyInvioce',
							// 	success(){
							// 	    let page = getCurrentPages().pop();  //跳转页面成功之后
							// 	    if (!page) return;  
							// 	    page.onLoad(); //如果页面存在，则重新刷新页面
							// 	}
							// });
							
							
						},1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				}
			},
			//验证税号
			checkDuty(){
				let reg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
				if (reg.test(this.duty)){
					this.dutyFlag = false
					
					return true
				} else {
					this.dutyFlag = true
					
					return false
				}
				
			},
			//验证邮箱
			checkEmail(){
				let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if(reg.test(this.email)){
					this.emailFlag = false
					return true
				} else {
					this.emailFlag = true
					return false
				}
			},
			//验证手机
			checkPhone(){
				let reg = /^1[3456789]\d{9}$/;
				if (reg.test(this.phone)) {
					this.phoneFlag = false
					
					return true
				} else {
					this.phoneFlag = true
		
					return false
				}
			}
		}
	}
</script>

<style lang="less">
	.open-invioce{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 0 30rpx;
		padding-bottom: 120rpx;
		box-sizing: border-box;
		.open-header{
			.header-total-price{
				padding-top: 40rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.header-price{
				display: flex;
				align-items: center;
				view{
					font-family: PingFangSC-Semibold;
					font-size: 24px;
					color: #5468FF;
					letter-spacing: -0.58px;
				}
				input{
					font-family: PingFangSC-Semibold;
					font-size: 24px;
					color: #5468FF;
					letter-spacing: -0.58px;
				}
			}
		}
		.open-middle{
			margin-top: 50rpx;
			box-sizing: border-box;
			.middle-title{
				padding-bottom: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.middle-button{
				display: flex;
				.button-left{
					width: 190rpx;
					height: 70rpx;
					margin-right: 40rpx;
					box-sizing: border-box;
					border: 1px solid rgba(9,2,62,0.30);
					border-radius: 2px;
					border-radius: 2px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: -0.34px;
					text-align: center;
					line-height: 70rpx;
				}
				.button-right{
					width: 190rpx;
					height: 70rpx;
					border: 1px solid rgba(9,2,62,0.30);
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: -0.34px;
					text-align: center;
					line-height: 70rpx;
				}
				.active{
					background: #5468FF;
					border-radius: 2px;
					border-radius: 2px;
					color: #FFFFFF;
				
				}
			}
		}
		.left-bottom{
			margin-top: 50rpx;
			box-sizing: border-box;
			.left-header{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.header-input-box{
				width: 690rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: #F7F7FA;
				border-radius: 2px;
				border-radius: 2px;
				margin-top: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: black;
				letter-spacing: -0.34px;
				display: flex;
				align-items: center;
				.header-input{
					// width: 690rpx;
					// height: 100rpx;
					// line-height: 100rpx;
					// background: #F7F7FA;
					// border-radius: 2px;
					// border-radius: 2px;
					// margin-top: 20rpx;
					// padding: 0 30rpx;
					// box-sizing: border-box;
					// font-family: PingFangSC-Regular;
					// font-size: 14px;
					// color: black;
					// letter-spacing: -0.34px;
				}
			}
			.email-title{
				padding-top: 50rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.email-input{
				// width: 690rpx;
				// height: 100rpx;
				// padding: 0 30rpx;
				// box-sizing: border-box;
				// background: #F7F7FA;
				// border-radius: 2px;
				// border-radius: 2px;
				// font-family: PingFangSC-Regular;
				// font-size: 14px;
				// color: black;
				// letter-spacing: -0.34px;
			
			}
			.right-box{
				padding-bottom: 120rpx;
				box-sizing: border-box;
				.right-input{
					width: 690rpx;
					height: 100rpx;
					line-height: 100rpx;
					background: #F7F7FA;
					border-radius: 2px;
					border-radius: 2px;
					margin-top: 20rpx;
					padding: 0 30rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: black;
					letter-spacing: -0.34px;
					display: flex;
					align-items: center;
				}
				.recipients,.phone{
					// width: 690rpx;
					// height: 100rpx;
					// line-height: 100rpx;
					// padding: 0 30rpx;
					// box-sizing: border-box;
					// background: #F7F7FA;
					// border-radius: 2px;
					// border-radius: 2px;
					// font-family: PingFangSC-Regular;
					// font-size: 14px;
					// color: black;
					// letter-spacing: -0.34px;
				}
				.phone{
					// margin: 20rpx 0;
					// margin-bottom: 20rpx;
					// box-sizing: border-box;
				}
				.address{
					display: flex;
					// justify-content: flex-start;
					// align-items: flex-start;
					width: 690rpx;
					height: 200rpx;
					padding: 30rpx;
					// margin-bottom: 120rpx;
					margin-top: 20rpx;
					box-sizing: border-box;
					background: #F7F7FA;
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: black;
					letter-spacing: -0.34px;
				
				}
				.textColor{
					color: rgba(9,2,62,0.30) !important;
					font-weight: bold;
				}
			}
		}
		.submit{
			position: fixed;
			bottom: 0;
			left: 0;
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
		}
	}
</style>
