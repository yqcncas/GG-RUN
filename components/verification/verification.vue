<template>
	<view>
		<view class="modal" :class="[show ?'modalShow':'']">
			<view>请输入验证码</view>
			<view>
				<text>{{phone}}</text>
				<view class="cutdown" v-if="verificationFlag">{{count}}s</view>
				<view class="getCode" v-else @click="sendVerification">获取验证码</view>
			</view>
			<view class="icon" @click="handleClose"><image src="../../static/img/my/36.png" mode=""></image></view>
			<view class="code">
				<text v-for="(o, i) in list" :key="i" :class="{'focus': o.fs}">{{o.val}}</text>
			</view>
			<view class="input">
				<input type="number" :focus="show" hover-class="none" :maxlength="list.length" @input="onInput($event)" v-model="inputContent" />
			</view>
			<view @click="onSubmit">
				确认
			</view>
		</view>
		<view class="mask" :class="{ maskShow: show === true }" @click="handleClose"></view>
	</view>
</template>

<script>
	let timer = null
	export default {
		onLoad () {
			
			this.userPhone = uni.getStorageSync('user_phone')
		},
		data(){
			return{
				// 验证码的个数（现在是6个）
				list: [
					{val: '', fs: true},  // 初始发时使第一个输入框架得到焦点
					{val: '', fs: false}, 
					{val: '', fs: false},
					{val: '', fs: false},
					{val: '', fs: false},
					{val: '', fs: false}
				],
				verificationFlag:false,
				count:60,
				inputContent:'',
				userPhone: ''
			}
		},
		props:['show', 'phone'],
		methods:{
			//当输入框的内容改变时的操作
			onInput(e) {
				const l = e.target.value.length;
				for(let i = 0; i < this.list.length; i++) {
					this.list[i].fs = false;
					this.list[i].val =  e.target.value[i];
				};
				if(l) this.list[l - 1].fs = true;
			},
			// 提示验证码方法
			onSubmit() {
				let code = '';
				this.list.forEach(item =>{
					code += item.val
				})
				if(code && code.length == this.list.length){
					this.$emit('code',code)
					clearInterval(timer)
					this.count = 60
				}else{
					uni.showToast({
						icon:'none',
						title:'请输入完整的验证码'
					})
				}
			},
			// 关闭
			handleClose(){
				this.list = [
					{val: '', fs: true},{val: '', fs: false},{val: '', fs: false},
					{val: '', fs: false},{val: '', fs: false},{val: '', fs: false},
				]
				clearInterval(timer)
				this.count = 60
				this.$emit('close',false)
			},
			// 发送验证码
			sendVerification(){
				this.verificationFlag = true
				timer = setInterval(() =>{
					if(this.count == 0){
						clearInterval(timer)
						this.verificationFlag = false
						this.count = 60
					}
					this.count = --this.count
				},1000)
			}
		},
		watch:{
			show(){
				if(this.show){
					this.sendVerification()
					this.list = [
						{val: '', fs: true},{val: '', fs: false},{val: '', fs: false},
						{val: '', fs: false},{val: '', fs: false},{val: '', fs: false},
					],
					this.inputContent = ''
				}
			}
		}
	}
</script>

<style lang="less">
	.modal{
		width: 560rpx;
		height: 394rpx;
		background: #FFFFFF;
		position: fixed;
		z-index: 10;
		top: 244rpx;
		left: 96rpx;
		display: flex;
		flex-direction: column;
		border-radius: 7px;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		& > view:first-child{
			width: 100%;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 17px;
			color: #09023E;
			font-weight: bold;
		}
		
		& > view:nth-child(2){
			margin-top: 34rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 14px;
				color: rgba(9,2,62,0.30);
			}
			.cutdown{
				margin-left: 20rpx;
				width: 76rpx;
				height: 34rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid rgba(9,2,62,0.20);
				border-radius: 2px;
				font-size: 12px;
				color: rgba(9,2,62,0.30);
			}
			.getCode{
				margin-left: 20rpx;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #5468FF;
				border-radius: 2px;
			}
		}
		& > .icon{
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			left: 511.2rpx;
			top:19.8rpx;
			image{
				width: 32rpx;
				height: 32rpx;
			}
		}
		& > .code{
			display: flex;
			flex-direction: row;
			justify-content: center;
			width: 510rpx;
			margin-left: 30rpx;
			padding-top: 28rpx;
			text{
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				border: 1px solid rgba(9,2,62,0.20);
				border-radius: 2px;
				color: #09023E;
				text-align: center;
				font-size: 14px;
				margin-right: 20rpx;
			}
			.focus{
				border: 2rpx solid #5468FF !important;
			}
		}
		& > .input{
			position: absolute;
			top: 190rpx;
			width: 100%;
			height: 80rpx;
			opacity: 0;
			overflow: hidden;
			input{
				position: absolute;
				left: -50%;
				width: 200%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 40rpx;
				text-align: left;
				outline: none;
				border: none;
				background: none;
				z-index: 666;
			}
		}
		& > view:last-child{
			width: 460rpx;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 50rpx 50rpx 40rpx 50rpx;
			background: #5468FF;
			color: #FFFFFF;
			font-size: 14px;
			border-radius: 2px;
		}
	}
	.modalShow{
		visibility: visible;
		opacity: 1;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.maskShow {
		opacity: 1;
		visibility: visible;
	}
</style>
