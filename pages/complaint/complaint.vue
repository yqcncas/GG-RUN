<template>
	<view>
		<view class="opinion-list">
			<view>
				<view class="item" v-for="(item,index) in opinionList" :key="index" @click="changeOpinion(index)">
					<view class="radio" :class="[chooseIndex == index ?'blue':'']"><view></view></view>
					<view>{{item.content}}</view>
				</view>
			</view>
		</view>
		<view class="opinion-content">
			<view>
				<textarea placeholder="请输入您的反馈详情，不少于8个字"  maxlength="240" placeholder-class="placeHolder-Class" @input="getNum" v-model="content"/>
				<view>{{num}}</view>
			</view>
		</view>
		<view class="opinion-img">
			<view class="imgList">
				<view class="img-item" v-for="(item,index) in imgList" :key="index">
					<image :src="item" mode="" @tap="previewImg" :data-url="item"></image>
					<image src="../../static/icon/delete.png" mode="" class="icon" @tap.stop="DelImage" :data-index="index"></image>
				</view>
				<view class="uploadImg" v-if="imgList.length < 9" @click="uploadIamge">
					<image src="../../static/icon/26.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="confirmButton" @click="sumbit"> 
			确定
		</view>
	</view>
</template>

<script>
	import baseURL from '@/config/index.js'
	export default {
		data() {
			return {
				opinionList:[
					{id:1,content:'我要吐槽：用的不爽，我有话说。'},{id:2,content:'产品建议：流程不合理。'},
					{id:3,content:'功能异常：软件故障，无法接单。'},{id:4,content:'其他：我想反馈其他问题'}
				],
				chooseIndex:0,
				num:240,
				imgList:[],
				appealPic:[],//申诉图片-上传
				content:''
			};
		},
		methods:{
			// 切换意见类型
			changeOpinion(index){
				this.chooseIndex = index
			},
			// 计算剩余字数
			getNum(e){
				this.num = 240-e.detail.value.length;
			},
			// 上传图片
			uploadIamge(){
				
					let token = uni.getStorageSync('token')
					uni.chooseImage({
						count:9,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success: (res) => {
							for(let i = 0; i < res.tempFilePaths.length; i++){
								uni.uploadFile({
									url:baseURL+this.$api.upLoad,
									filePath:res.tempFilePaths[i],
									header:{token},
									name:'file',
									success: (uploadFileRes) => {
										console.log(uploadFileRes);
										let imgInfo = JSON.parse(uploadFileRes.data)
										this.imgList.push(imgInfo.url)
										this.appealPic.push(imgInfo.fileName)
									}
								})
							}
						}
					})
				
				
			},
			//预览图片
			previewImg(e){
				uni.previewImage({
					urls:this.imgList,
					current:e.currentTarget.dataset.url
				})
			},
			// 删除图片
			DelImage(e) {
				uni.showModal({
					title: '是否删除图片',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.appealPic.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 提交
			async sumbit(){
				if(this.content.length < 8) return  uni.showToast({icon:'none',title:'内容不能少于8个字'})
				let content = this.opinionList[this.chooseIndex].content + ','+this.content
				let picUrl = this.appealPic.join(',')
				let res = await this.$fetch(this.$api.riderComplain,{complaintType:0,content:content,picUrl:picUrl},'POST')
				
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #F7F7FA;
	}
	.opinion-list{
		width: 100%;
		background: #FFFFFF;
		border-bottom: 1px solid #F7F7FA;
		& > view{
			width: 690rpx;
			margin: 0 30rpx;
			padding: 30rpx 0;
			display: flex;
			flex-direction: column;
			.item{
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
				.radio{
					width: 36rpx;
					height: 36rpx;
					border: 1px solid rgba(9,2,62,0.30);
					margin-right: 20rpx;
					border-radius: 50%;
				}
				.blue{
					border: 1px solid #5468FF;
					display: flex;
					align-items: center;
					justify-content: center;
					& > view{
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						background: #5468FF;
					}
				}
			}
			.item +.item{
				margin-top: 28rpx;
			}
		}
	}
	.opinion-content{
		width: 100%;
		background: #FFFFFF;
		& > view{
			width: 690rpx;
			margin: 0 30rpx;
			padding-top: 28rpx;
			display: flex;
			flex-direction: column;
			textarea{
				width: 690rpx;
				height: 352rpx;
				font-size: 14px;
			}
			& > view{
				width: 690rpx;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	.opinion-img{
		width: 100%;
		background: #FFFFFF;
		margin-bottom: 120rpx;
		.imgList{
			width: 720rpx;
			padding: 30rpx 0;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin-left: 30rpx;
			.img-item{
				position: relative;
				margin-right: 20rpx;
				image{
					width: 150rpx;
					height: 150rpx;
				}
				&:last-child{
					margin-right: 0;
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
			.uploadImg{
				image{
					width: 150rpx;
					height: 150rpx;
				}
			}
			
		}
	}
	.placeHolder-Class{
		font-size: 14px;
		color: rgba(9,2,62,0.30) !important;
	}
	.confirmButton{
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		background: #5468FF;
		border-radius: 2px;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #FFFFFF;
	}
</style>
