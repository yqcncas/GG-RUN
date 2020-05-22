<template>
	<view class="retroaction">
		<view class="retroaction-header">
			<view class="header-item">
				<view class="item-left">反馈类型</view>
				<view class="item-right">
					请选择
					<image src="../../static/img/my/right.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="header-item">
				<view class="item-left">联系人</view>
				<view class="item-right">
					请填写联系人姓名
				</view>
			</view>
			<view class="header-item">
				<view class="item-left">联系方式</view>
				<view class="item-right">
					请填写联系方式
				</view>
			</view>
		</view>
		<view class="retroaction-main">
			<view class="retroaction-main-title">问题描述</view>
			<view class="retroaction-main-item" v-for="(item,index) in retroactionInfo" :key = "index" @tap="hangdleIsClick(index)">
				<view class="main-item-left" :class="{on:item.isClick}"></view>
				<view class="main-item-right">{{item.info}}</view>
			</view>
		</view>
		<view class="retroaction-question">
			<textarea  placeholder="请您描述问题" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);" class="question-text"/>
			<view class="upload">
				<view class="line-box">
					<view class="h-line"></view>
					<view class="z-line"></view>
				</view>	
				<view class="upload-main">最多上传3张</view>
			</view>
		</view>
		<view class="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data () {
			return{
				retroactionInfo: [{
					isClick: true,info: '没有车手接单'
				},{
					isClick: false,info: '配送物品损坏'
				},{
					isClick: false,info: '地图定位不准'
				},{
					isClick: false,info: '软件不稳定'
				},{
					isClick: false,info: '不清楚如何下单'
				}]
			}
		},
		methods: {
			hangdleIsClick (index) {
				this.retroactionInfo[index].isClick = !this.retroactionInfo[index].isClick
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.retroaction{
		padding-bottom: 120rpx;
		box-sizing: border-box;
		.retroaction-header{
			background-color: #fff;
			.header-item{
				width: 100%;
				height: 100rpx;
				padding-left: 30rpx;
				padding-right: 28rpx;
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
				}
				.item-right{
					height: 40rpx;
					display: flex;
					align-items: center;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					image{
						width: 16rpx;
						height: 26rpx;
						margin-left: 20rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.retroaction-main{
			width: 100%;
			// height: 432rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #F7F7FA;
			background-color: #fff;
			.retroaction-main-title{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				font-weight: bold;
				color: #09023E;
				letter-spacing: -0.41px;
			}
			.retroaction-main-item{
				display: flex;
				align-items: center;
				margin-top: 28rpx;
				box-sizing: border-box;
				&:first-child{
					margin-top: 20px;
					box-sizing: border-box;
				}
				
				.main-item-left{
					width: 32rpx;
					height: 32rpx;
					border: 1px solid rgba(9,2,62,0.30);
					border-radius: 2px;
					border-radius: 2px;
					box-sizing: border-box;
					&.on{
						border: none;
						background: #5468FF;
						background: url(../../static/img/order/gou.png) no-repeat;
						background-size: 100% 100%;
						
					}
				}
				.main-item-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
					text-align: justify;
					margin-left: 20rpx;
					box-sizing: border-box;
				}
			}
		}
		.retroaction-question{
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			
			.question-text{
				width: 100%;
				height: 450rpx;
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
