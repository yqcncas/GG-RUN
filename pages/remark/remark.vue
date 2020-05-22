<template>
	<view class="remark">
		<view class="remark-box">
			<textarea class="remark-text" maxlength="30" v-model="remarkDetail" placeholder="想对派送员说点什么" placeholder-class="textarea-font"
		  placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
		  <view class="text-number">
			  <span>{{remarkDetail.length}}</span>
			  <span>/</span>
			  <span>30</span>
		  </view>
		  <view class="submit" @click="submit">确认</view>
		</view>
	</view>
	 
</template>

<script>
	export default {
		onLoad() {
			if (uni.getStorageSync('remark')) {
				this.remarkDetail = uni.getStorageSync('remark')
			}
		},
		data () {
			return {
				remarkDetail: ''
			}
		},
		methods: {
			submit () {
				uni.setStorageSync('remark', this.remarkDetail)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less">
	.remark{
		width: 100%;
		height: 100%;
		.remark-box{
			width: 600rpx;
			height: 300rpx;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			border: 2rpx solid #CCCCCC;
			background-color: #fff;
			margin-top: 50rpx;
			box-sizing: border-box;
			padding: 20rpx;
			.remark-text{
				font-size: 14px;
			}
			.text-number{
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				font-size: 14px;
			}
			.submit{
				width: 600rpx;
				height: 90rpx;
				background: #5468FF;
				border-radius: 4px;
				border-radius: 4px;
				text-align: center;
				line-height: 90rpx;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				box-sizing: border-box;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 30rpx;
			}
		}
	}
</style>
