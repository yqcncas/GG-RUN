<template>
	<view class="changePwd">
		<view class="pwd-item">
			<input type="number"  v-model="phone" placeholder="请输入手机号" placeholder-class="item-placeholder" maxlength="11" v-if="flag" style="width: 100%;">
			<input type="number" :disabled="phone.length === 11" v-model="phone" placeholder="请输入手机号" placeholder-class="item-placeholder" maxlength="11" v-else style="width: 100%;">
		</view>
		<view class="pwd-item">
			<input type="text" v-model="code" placeholder="请输入验证码" placeholder-class="item-placeholder"/>
			<view class="getCode" @tap="getCode" :class="{timer:computedTimer}">{{getYzm?'获取验证码':computedTimer+'s'}}</view>
			
		</view>
		<view class="pwd-item">
			<input type="password" v-model="newPwd" placeholder="请输入新密码" placeholder-class="item-placeholder" style="width: 100%;"/>
		</view>
		<view class="pwd-item">
			<input type="password" v-model="pwd" placeholder="请重复密码" placeholder-class="item-placeholder" style="width: 100%;"/>
		</view>
		
		<view class="confirm" @tap="confirm">确定</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				phone: '', //手机
				code: '',  //输入的验证
				newPwd: '', //新密码
				pwd: '',    //密码
				yzm: '',	//短信验证码
				getYzm: true,
				computedTimer: 0, 
				status: '' ,//判断是从哪来的 0忘记密码 1修改密码
				flag: ''
			}
		},
		onLoad(options) {
			this.status = options.status
			this.phone = uni.getStorageSync('user_phone')
			if (this.status == 0) {
				this.flag = true
				uni.setNavigationBarTitle({
				    title: '忘记密码'
				});
			} else if (this.status == 1) {
				this.flag = false
				uni.setNavigationBarTitle({
				    title: '修改密码'
				});
			}
		},
		onUnload(){
			
		},
		methods:{
			//提交
			async confirm () {
				if (this.phone.trim() == '' || this.code.trim() == '' || this.newPwd == '' || this.pwd == '') {
					uni.showToast({
						icon:'none',
						title:'请填写信息后进行更改'
					})
					return
				}
				if (this.newPwd != this.pwd) {
					uni.showToast({
						icon:'none',
						title: '两次输入的密码不一致'
					})
					return
				}
				
				// if (this.yzm !== this.code) {
				// 	uni.showToast({
				// 		icon:'none',
				// 		title: '验证码输入错误'
				// 	})
				// 	return
				// }
				
				let res = await this.$fetch(this.$api.customerForget,{mobile: this.phone,checkCode: this.code,password: this.newPwd},'POST','form')
				console.log(res)
				if (res.code === 0) {
					uni.showToast({
						icon: 'success',
						title: '修改成功'
					})
					uni.removeStorageSync('user_phone')
					uni.removeStorageSync('token')
					setTimeout(() => {
						uni.reLaunch({
							url: '../enter/enter'
						})
					},1500)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			},
			//验证码
			async getCode () {
				if (!this.getYzm) return
				
				if(this.phone.trim() == '' ) {
					uni.showToast({
						icon: 'none',
						title: '请先输入手机号'
					})
					return
				} else if (this.phone.length != 11 ) {
					uni.showToast({
						icon: 'none',
						title: '请检查手机号输入是否正确'
					})
					return
				}
				this.getYzm = false 
				this.computedTimer = 60
				const timer = setInterval(() => {
					if (this.computedTimer === 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.computedTimer--
					}
				},1000)
				let res = await this.$fetch(this.$api.customerPhone,{mobile:this.phone},'GET','form')
			
				this.yzm = res.msg
			},
		}
	}
</script>

<style lang="less">
	.changePwd{
		width: 100%;
		height: 100%;
		background-color: rgb(246,246,250);
		position: relative;
		.pwd-item{
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			
			
			.item-placeholder{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				letter-spacing: -0.34px;
			}
			.getCode{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468FF;
				letter-spacing: 0;
				text-align: right;
				&.timer{
					color: #ccc;
				}
			}
		}
		.confirm{
			width: 100%;
			height: 90rpx;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			position: absolute;
			bottom: 0;
			text-align: center;
			line-height: 90rpx;
		}
		.isreg{
			font-size: 14px;
			color: red;
		}
	}
</style>
