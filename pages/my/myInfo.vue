<template>
	<view class="myInfo">
		<view class="myInfo-header" @tap="handleChoiceAvatar">
			<view class="myInfo-avatar">
				<image :src="user.avatar?user.avatar : '../../static/img/order/avatar.png'" mode="aspectFill" @tap.stop="previewImage"></image>
			</view>
			<view class="myInfo-right" >
				<view>修改头像</view>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="myInfo-item">
			<view class="item-left">
				昵称
			</view>
			<view class="item-right">
				<input v-model="user.userName" @blur="changeUserName"></input>
				<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
			</view>
		</view>
		<view class="myInfo-item">
			<view class="item-left">
				性别
			</view>
			<view class="item-right">
				<picker :range="sexList" @change="selectedSex">
					<input disabled v-model="user.sex" placeholder="请选择"></input>
				</picker>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="myInfo-item">
			<view class="item-left">
				生日
			</view>
			<view class="item-right">
				<picker mode="date" @change="bindDateChange">
					<input disabled v-model="user.birthday" placeholder="请选择"></input>
				</picker>
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="myInfo-item" @tap="goToBindPhone">
			<view class="item-left">
				我的手机号
			</view>
			<view class="item-right">
				<input v-model="user.phone" type="number" maxlength="11" disabled></input>
				<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
			</view>
		</view>
		<view class="myInfo-item" @tap="goToChangePwd">
			<view class="item-left">
				修改密码
			</view>
			<view class="item-right">
				<image src="../../static/img/my/right.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
	export default {
		onLoad(){
			this.initMyInfo()
		},
		data () {
			return {
				user:{},
				sexList: [ '男', '女', '保密' ],
			}
		},
		methods:{
			//更改性别
			async selectedSex (e) {
				this.user.sex = this.sexList[e.detail.value]
				let res = await this.$fetch(this.$api.changeBirthday,{sex:e.detail.value},"POST","form")
				if (res.code == 0) {
					uni.showToast({
						icon:'success',
						title: '修改成功'
					})
				} else {
					uni.showToast({
						title: res.msg
					})
				}
				
			},
			//更改日期
			async bindDateChange (e) {
				var value = e.detail.value
				this.user.birthday = value
				
				let res = await this.$fetch(this.$api.changeBirthday,{birthday:this.user.birthday},"POST","form")
				if (res.code == 0) {
					uni.showToast({
						icon:'success',
						title: '修改成功'
					})
				} else {
					uni.showToast({
						title: res.msg
					})
				}
			
			},
			//修改用户名
			async changeUserName() {
			
				let res = await this.$fetch(this.$api.changeBirthday,{userName:this.user.userName},"POST","form")
				if (res.code == 0) {
					uni.showToast({
						icon:'success',
						title: '修改成功'
					})
					uni.setStorageSync('user_Name', this.user.userName);
				} else {
					uni.showToast({
						title: res.msg
					})
				}
				console.log(res)
			},
			
			//放大头像
			previewImage () {
				uni.previewImage({
					urls:[this.user.avatar]
				})
			},
			//跳转更改密码
			goToChangePwd () {
				uni.navigateTo({
					url: './changePwd?status=1'
				})
			},
			//绑定手机
			goToBindPhone () {
				uni.navigateTo({
					url: "./bindPhone"
				})
			},
			//换头像
			handleChoiceAvatar () {
				let that = this
				let token = uni.getStorageSync('token')
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: baseURL + this.$api.upLoad, //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
							headers: { 
								"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZW4iLCJpYXQiOjE1Mzc1NTQzMDksImRhdGEiOnsidXNlcm5hbWUiOiJ4dXRvbmdiYW8iLCJpc19zdXBlcnVzZXIiOjEsImlkIjoxNywibG9naW5fdGltZSI6MTUzNzU1NDMwOX0sImV4cCI6MTUzODE1NDMwOX0.32Lys4hjjY2XRpM2r9YSmpYA798u821m_M5Tzb6wxIU",
								'Content-Type': 'application/x-www-form-urlencoded'  //multipart/form-data;boundary=--xxxxxxx   application/json
							},                
				            name: 'file',
							header:{token},
				            success: (uploadFileRes) => {
								var res = JSON.parse(uploadFileRes.data)
								this.user.avatar = res.fileName
								this.saveUserAvatar()
				            }
				        });
				    }
				});
			},
			//换头
			async saveUserAvatar() {
				let res = await this.$fetch(this.$api.changeAvatar,{avatar:this.user.avatar},"POST",'Form')
				
				this.user.avatar = baseURL + this.user.avatar
				if (res.code == 0) {
					uni.showToast({
						icon: 'success',
						title: '修改成功'
					})
				}
			},
			
			//初始化信息
			async initMyInfo () {
					let token = uni.getStorageSync('token')
					if (!token) {
						this.user = {}
					}
					
					let res = await this.$fetch(this.$api.currentUser,{},"GET","form")
					if (res.code === 0) {
						this.user = res.data
						
						if (this.user.avatar) {
							var newStr=this.user.avatar.indexOf("http");
								//不是以http开头
							　　if(newStr==-1){
									this.user.avatar = baseURL + this.user.avatar
							　　}
						}
							
					
						
						let sexNum = Number(this.user.sex)
						
						this.user.sex = this.sexList[sexNum]
						
					} else {
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
					
			
			}
			
			
		}
	}
</script>

<style lang="less" >
	.myInfo{
		width: 100%;
		.myInfo-header{
			width: 100%;
			height: 220rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 28rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgb(246,246,250);
			.myInfo-avatar{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.myInfo-right{
				display: flex;
				align-items: center;
				view{
					margin-right: 20rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: 0;
					text-align: justify;
				}
				image{
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
		.myInfo-item{
			width: 100%;
			height: 100rpx;
			padding: 0 28rpx;
			border-bottom: 1rpx solid rgb(246,246,250);
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
				display: flex;
				align-items: center;
				input{
					
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
					text-align: right;
					
				}
				image{
					width: 16rpx;
					height: 26rpx;
					margin-left: 32rpx;
					box-sizing: border-box;
				}
			}
		}
	}
	
	
</style>
