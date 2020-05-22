<template>
	<view >
		<view class="modal" :class="[show ?'modalShow':'']">
			<view>请输入密码</view>
			<view>
				<text>{{phone}}</text>
			</view>
			<view class="icon" @click="handleClose"><image src="../../static/icon/36.png" mode=""></image></view>
			<view>
				<input type="text" password="true" placeholder="请输入您的密码" :focus="show" v-model="pwd" placeholder-class="placeHolder-Class">
			</view>
			<view @click="onSubmit">
				确认
			</view>
		</view>
		<view class="mask" :class="{ maskShow: show === true }" @click="handleClose"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				pwd:''
			}
		},
		props:['show',"phone"],
		methods:{
			// 关闭
			handleClose(){
				this.$emit('close',false)
				this.pwd = ''
			},
		
			// 提交
			onSubmit(){
				if(this.pwd){
					this.$emit('pwd',this.pwd)
				}else{
					uni.showToast({
						icon:'none',
						title:'请输入密码！'
					})
				}
			}
		},
		watch:{
			show(){
				if(this.show){
					this.pwd = ''
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
		& > view:nth-child(4){
			display: flex;
			align-items: center;
			margin-top: 26rpx;
			width: 460rpx;
			height: 70rpx;
			margin-left: 50rpx;
			border: 1px solid rgba(9,2,62,0.20);
			border-radius: 2px;
			font-size: 14px;
			color: #09023E;
			input{
				margin: 0 30rpx;
				width: 400rpx;
				display: flex;
				align-items: center;
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
	.placeHolder-Class{
		font-size: 14px;
		color: rgba(9,2,62,0.30) !important;
	}
</style>
