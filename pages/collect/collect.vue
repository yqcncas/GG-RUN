<template>
	<view class="collect">
		<view class="collect-scroll">
			<view class="scroll-item" :class="{on:index == currentIndex}" @tap="handleScroll(index)" v-for="(item,index) in scrollList" :key = "index">{{item}}</view>
			
		</view>
		<view class="collect-item" v-for="item in collectInfo" :key = "item.id" @tap="callPhone(item.riderMobile, item.riderId)">
			<view class="item-left">
				<view class="avatar">
					<image :src="item.riderAvatar ? item.riderAvatar : '../../static/img/order/avatar.png' " mode="aspectFill"></image>
				</view>
				<view class="item-left-center">
					<view class="center-top">
						<view class="user-name">{{item.riderName}}</view>
						<view class="user-phone">{{item.riderMobile}}</view>
					</view>
					<view class="center-bottom">
						<view class="bottom-starbox">
							<image src="../../static/img/order/star-active.png" mode="aspectFill" v-for="(startActive,index) in item.riderScore " :key = "index"></image>
						
							<image src="../../static/img/order/star.png" mode="aspectFill" v-for="(start,i) in (5 - item.riderScore )" :key = "i"></image>
						</view>
						<view class="star">
							{{item.riderScore}}星
						</view>
					</view>
				</view>
			</view>
			<view class="item-right">{{item.riderNum}}单</view>
		</view>
		<uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import baseURL from '../../config/index.js'
	export default {
		onLoad() {
			this.initColectInfo()
			// this.initStart()
		},
		components:{
			uniLoadMore
		},
		data () {
			return {
				scrollList: ['我收藏的','我屏蔽的'],
				currentIndex: 0,
				collectInfo: [],
				hasFlag: false
			}
		},
		methods:{
			//切换导航
			handleScroll (index){
				this.currentIndex = index
			},
			async initColectInfo(){
				
				let res = await this.$fetch(this.$api.orderorderCollectionList,{type:this.currentIndex},"POST","Form")
				console.log(res)
				res.rows.forEach(item => {
					item.riderScore = Math.floor(item.riderScore / 20)
					
					if (item.riderAvatar) {
						var newsStr= item.riderAvatar.indexOf("http");
							//不是以http开头
						　　if(newsStr==-1){
								item.riderAvatar = baseURL + item.riderAvatar.slice(1,item.riderAvatar.length)
						　　}
					}
					
				})
				
				this.collectInfo = res.rows
	
				// Vue.set(this.collectInfo,res.rows)
			},
			//拨打电话
			callPhone (phone, id) {
				if (this.currentIndex == 0) {
					uni.showModal({
					    title: '拨打电话',
					    content: '是否拨打该骑手电话',
					    success: function (res) {
					        if (res.confirm) {
					           uni.makePhoneCall({
					               phoneNumber: phone //仅为示例
					           });
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});		
				} else {
					uni.showModal({
					    title: '取消屏蔽',
					    content: '是否取消屏蔽该骑手',
					    success: async (res) => {
					        if (res.confirm) {
								let msg = await this.$fetch(this.$api.orderCancelCollection, {riderId: id }, "POST", 'Form')
								console.log(msg)
								
								if (msg.code == 0) {
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
									this.initColectInfo()
								} else {
									uni.showToast({
										icon: 'none',
										title: '操作失败'
									})
								}
								
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			}
			
		},
		watch:{
			currentIndex(){
				this.initColectInfo()
			}
		},
		
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.collect{
		padding-bottom: 30rpx;
		box-sizing: border-box;
		.collect-scroll{
			width: 100%;
			height: 90rpx;
			display: flex;
			.scroll-item{
				width: 50%;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				position: relative;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 4px;
				border-radius: 4px;
				box-sizing: border-box;
				&::after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4rpx solid #5468FF;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: 0.5s;
				}
				&.on{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #5468FF;
					
					&:after{
						width: 15%;
					}
				}
			}
		}
		.collect-item{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			.item-left{
				display: flex;
				align-items: center;
				.avatar{
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.item-left-center{
					margin-left: 20rpx;
					box-sizing: border-box;
					.center-top{
						display: flex;
						align-items: center;
						.user-name{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #09023E;
							letter-spacing: -0.41px;
							font-weight: bold;
						}
						.user-phone{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(9,2,62,0.30);
							letter-spacing: -0.29px;
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
					.center-bottom{
						display: flex;
						align-items: center;
						.bottom-starbox{
							image{
								width: 30rpx;
								height: 30rpx;
								margin-right: 4rpx;
								box-sizing: border-box;
							}
						}
						.star{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(9,2,62,0.30);
							letter-spacing: -0.29px;
							margin-left: 10rpx;
							box-sizing: border-box;
						}
					}
				}
			}
			.item-right{
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #09023E;
				letter-spacing: -0.29px;
			}
		}
	}
</style>
