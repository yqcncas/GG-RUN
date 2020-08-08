<template>
	<view class="address">
		<view class="no-address" v-if="!userAddress.length && isShowLoding">
			<u-empty  mode="address"></u-empty>
		</view>
		<view class="address-item" v-for="(item,index) in userAddress" :key = 'index' @tap.stop="storageInfo(item,index)">
			<view class="item-header">
				<view class="user-name">{{item.name}}</view>
				<view class="user-phone">{{item.mobile}}</view>
			</view>
			<view class="item-center">
				<view class="center-top">{{item.addressDetail[2]}}</view>
				<view class="center-bottom">{{item.addressDetail[0] + item.addressDetail[1]}}</view>
				<view class="center-bottom cbb">{{item.addressDetail[1]}}</view>
			</view>
			<view class="item-bottom">
				
				<view class="bottom-left" @tap.stop="handleCircle(index)" :class="{hiddenLeft:addressStatus == 1}" >
					<view class="circle" :class="{on: item.defaultFlag === 0}"></view>
					<view class="default" >置顶寄件人地址</view>
				</view>
				<view class="bottom-right">
					<view class="right-edit" @tap.stop="goToEdit(item,item.id,3)">
						<image src="../../static/img/index/editor.png" mode="aspectFill"></image>
						<view>编辑</view>
					</view>
					<view class="right-del" @tap.stop="delAddress(item.id)">
						<image src="../../static/img/index/delete.png" mode="aspectFill"></image>
						<view>删除</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="userAddress.length" bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
		<view class="submit" @tap="goToEdit(0)">新增地址</view>
		
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			//是否显示设为默认地址  0 起点  1 终点
			this.addressStatus = options.address
			// this.mapLocation()
			uni.showLoading({
				title: '加载中'
			})
		},
		onShow(){
			this.initAddress()
		},
		onUnload() {
			if (this.userAddress.length === 0) {
				uni.removeStorageSync('sendAddress')
			}
		},
		data () {
			return {
				circleIndex: 0,
				//是否显示设为默认地址
				addressStatus: 0,
				
				userAddress:[],
				hasFlag:false,
				isShowLoding: false
			}
		},
		methods: {
			//更改小圆默认地址
			async handleCircle(index){
				this.userAddress.forEach(item => {
					item.defaultFlag = 1
				})
				this.userAddress[index].defaultFlag = 0
				let res = await this.$fetch(this.$api.changeDefault,{id: this.userAddress[index].id },'POST','form')
				uni.showLoading({
					title: '正在置顶该地址'
				})
				
			
				this.userAddress.unshift(...this.userAddress.splice(index,1))
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
			},
			//去编辑地址
			goToEdit (addressInfo,id,status) {
				console.log(this.addressStatus)
				if (this.addressStatus == 1) {
					uni.setStorageSync('noSetSend', true)
				}
				if (addressInfo == 0) {
					uni.navigateTo({
						url:'../editAddress/editAddress?status='+addressInfo
					})
				}else {
					uni.navigateTo({
						url:'../editAddress/editAddress?addressInfo='+ JSON.stringify(addressInfo) + '&id=' + id + '&status=' + status
					})
				}
				
			},
			//存储信息
			storageInfo (item,index) {
				// 起点点击
				
				item.latitude = item.latitude.split(',')
				uni.removeStorageSync('helpMeBuy')
				uni.removeStorageSync('helpMeGet')
				
				if (this.addressStatus == 0) {
					if(item.addressDetail[1] == 'undefined') {
						item.addressDetail[1] = ""
					}
					if(item.addressDetail[2] == 'undefined') {
						item.addressDetail[2] = ""
					}
					let sendAddress = {
						addressDetail: item.addressDetail[1],
						latitude: item.latitude[0] + ',' + item.latitude[1],
						mobile: item.mobile,
						name: item.name,
						province: item.province,
						city:item.city,
						area:item.area,
						id:this.userAddress[index].id,
						editAddress: {
							name: item.addressDetail[2],
							address: item.addressDetail[0],
							latitude: item.latitude[1],
							longitude: item.latitude[0]
						},
						extensionNumber: item.extensionNumber
					}
					uni.setStorageSync('sendAddress',JSON.stringify(sendAddress))
					uni.setStorageSync('clickAddressFlag', true)
					uni.navigateBack({
						delta:1
					})
					//终点点击
				}
				if (this.addressStatus == 1) {
					if(item.addressDetail[1] == 'undefined') {
						item.addressDetail[1] = ""
					}
					if(item.addressDetail[2] == 'undefined') {
						item.addressDetail[2] = ""
					}
					let endAddress = {
						addressDetail: item.addressDetail[1],
						latitude: item.latitude[0] + ',' + item.latitude[1],
						mobile: item.mobile,
						name: item.name,
						province: item.province,
						city:item.city,
						area:item.area,
						id:this.userAddress[index].id,
						editAddress: {
							name: item.addressDetail[2],
							address: item.addressDetail[0],
							latitude: item.latitude[1],
							longitude: item.latitude[0]
						},
						extensionNumber: item.extensionNumber
					}
	
					uni.setStorageSync('endAddress',JSON.stringify(endAddress))
					uni.setStorageSync('clickAddressFlag', true)
					uni.navigateBack({
						delta:1
					})
				}
			},
			//地址列表
			async initAddress () {
			
				let token = uni.getStorageSync('token')
				let res = await this.$fetch(this.$api.addressList,{token:token},"GET","Form")
				
				// console.log(res)
				this.userAddress = res.data
				this.userAddress.forEach(item => {
					item.addressDetail = item.addressDetail.split(',')			
				})
				for (let i = 0; i < this.userAddress.length; i++) {
					if (!this.userAddress[i].defaultFlag) {
						console.log(i)
						this.userAddressDefaultFlag = i
					}
				}
				
				
				this.userAddress.unshift(...this.userAddress.splice(this.userAddressDefaultFlag,1))
				
				if (this.userAddress.length <= 0) {
					this.isShowLoding = true
				}
				console.log(this.userAddress)
				setTimeout(() => {
					uni.hideLoading()
				}, 1700)
			},
			//删除地址
			async delAddress (id) {
	
				uni.showModal({
				    title: '删除地址',
				    content: '确定删除该地址么',
				    success: res => {
				        if (res.confirm) {
				           let result = this.$fetch(this.$api.delAddress,{id:Number(id)},'POST','form').then(res => {
							   console.log(res)
							   uni.showToast({
							   	icon:'none',
								title: res.msg
							   })
							  if (res.code === 0) {
							  	this.initAddress()
							  }
						   })
				        }
				    }
				});
			},
			
		},
		
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.address{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 120rpx;
		box-sizing: border-box;
		.no-address{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			font-size: 14px;
			color: #ccc;
		}
		.address-item{
			width: 690rpx;
			padding: 30rpx;
			padding-bottom: 0;
			margin-top: 30rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
			border-radius: 4px;
			border-radius: 4px;
			box-sizing: border-box;
			.item-header{
				display: flex;
				align-items: center;
				.user-name,.user-phone{
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					font-weight: bold;
					margin-right: 20rpx;
					box-sizing: border-box;
				}
			}
			.item-center{
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				.center-top{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
				}
				.center-bottom{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					&.cbb{
						font-weight: bold;
						color: #09023E;
					}
				}
			}
			.item-bottom{
				height: 88rpx;
				display: flex;
				// align-items: center;
				justify-content: space-between;
				// margin-top: 20rpx;
				box-sizing: border-box;
				.bottom-left{
					display: flex;
					align-items: center;
					&.hiddenLeft{
						visibility: hidden;
					}
					.circle{
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						border: 1px solid rgba(9,2,62,0.30);
						box-sizing: border-box;
						&.on{
							background: url(../../static/img/my/choice.png) no-repeat;
							border: none;
							background-size: cover;
						}
					}
					.default{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						margin-left: 20rpx;
						box-sizing: border-box;
					}
				}
				.bottom-right{
					display: flex;
					align-items: center;
					
					.right-edit,.right-del{
						height: 88rpx;
						display: flex;
						align-items: center;
						image{
							width: 32rpx;
							height: 32rpx;
						}
						view{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(9,2,62,0.30);
							margin-left: 10rpx;
							box-sizing: border-box;
						}
					}
					.right-del{
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.submit{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
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
