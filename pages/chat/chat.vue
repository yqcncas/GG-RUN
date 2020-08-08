<template>
	<view class="container">
		<view class="list">
			<block v-for="(item,index) in msgList" :key="index">
				<view class="item tiem-no" :id="'item_'+index">
					<!-- 聊天时间 -->
					<view class="time" v-if="item.timeFlag">{{ item.time }}</view>
					<!-- 聊天内容，头像，左 -->
					<view class="main-left" v-if="item.isAdmin === 0 || item.isAdmin === 2">
						<image class="avatar" :src="avatar" mode="aspectFill"></image>
						<view class="content"  v-if="item.msgType == 0">{{ item.content }}</view>
						<image
							@click="previewImage(item.content)" 
							class="content-image" 
							:style="'width:'+ item.imgWidth/2 +'px;'" 
							v-if="item.msgType == 1" 
							:src="item.content" 
							mode="widthFix"
						></image>
					</view>
					<!-- 聊天内容，头像，右 -->
					<view class="main-right" v-if="item.isAdmin === 1">
						<image
							@click="previewImage(item.content)" 
							class="content-image" 
							:style="'width:'+ item.imgWidth/2 +'px;'" 
							v-if="item.msgType == 1" 
							:src="item.content" 
							mode="widthFix"
						></image>
						<view class="content" v-if="item.msgType == 0">{{ item.content }}</view>
						<image class="avatar" :src="myAvatar" mode="aspectFill"></image>
					</view>
				</view>
			</block>
		</view>
		<view :style="'height:'+ sendHeight +'px;'"></view>
		<!-- <send-msg :account="cid" :target="from_id" @sendHeight="watchSendHeight" id="send-height"></send-msg> -->
		<!-- 组件 -->
		<view class="button-send-container">
			<view class="send-container"> 
				<textarea cursor-spacing="14" :show-confirm-bar="false" :fixed="true" placeholder="请输入内容…" auto-height placeholder-class="ipt-tip" v-model="chatContent" />
				<view class="confirm">
					<view class="send-text"  @click="sendMsg" :class="[chatContent.length == 0 ?'gray':'']" v-show="chatContent.length !== 0" >发送</view>
					<view class="send-img" v-show="chatContent.length === 0" @click="chooseImage"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// const qiniuUploader =require("../../components/until/qiniuUploader.js")
	// import {MD5} from '../../common/md5.js'		 
	export default {
		data() {
			return {
				avatar: '../../static/icon/61.png', // 对方头像
				msgList:[],
				chatContent: '', // 聊天消息内容
				sendHeight: 84,
				myAvatar: '', // 本人头像
				page:0,
				hasFlag:true,
				qiniuToken:'',
				sendImg:'',
			};
		},
		methods:{
			//发送消息
			async sendMsg(){
				if(!this.chatContent) return
				let res = await this.$fetch(this.$api.sendMsg,{content:this.chatContent,msgType:0},'POST','form')
				console.log(res);
				let createTime = this.$dayjs()
				let time = this.$dayjs().fromNow()
				if(res.code == 0){
					this.msgList.push({
						'createTime':createTime,
						'time':time,
						'isAdmin':1,
						'content':this.chatContent,
						'timeFlag':true,
						'msgType':0
					})
					if(res.msg != 1){
						console.log(JSON.parse(res.msg));
						this.msgList.push(JSON.parse(res.msg))
					}
					this.msgList.forEach((item,index,that) =>{
						item.time = this.$dayjs(item.createTime).fromNow()
						if (index === 0){
							item.timeFlag = true
						}else{
							// 当聊天消息间隔超过10分钟时
							item.timeFlag = this.$dayjs(that[index].createTime).valueOf() - this.$dayjs(that[index-1].createTime).valueOf() > 600000 ? true : false
						}
					})
					this.chatContent = ''
					this.$nextTick(()=>{
						uni.pageScrollTo({
							scrollTop:0,
							duration:0
						})
						uni.pageScrollTo({
							scrollTop:999999,
							duration:0
						})
					})
				}
			},
			// 获取消息列表
			async getMsgList(){
				if(!this.hasFlag) return
				this.page = ++this.page
				let res = await this.$fetch(this.$api.chatMsgList,{pageNum:this.page,pageSize:10},'POST','form')
				console.log(res);
				//第一页记录需要返回数据倒序展示
				if(this.page == 1){
					res.rows.reverse()
				}
				res.rows.forEach((item, index, that) =>{
					item.time = this.$dayjs(item.createTime).fromNow()
					if(this.page == 1){
						this.msgList.push(item)
					}else{
						this.msgList.unshift(item)
					}
				})
				this.msgList.forEach((item,index,that) =>{
					// 第一条聊天记录默认展示时间
					if (index === 0){
						item.timeFlag = true
					}else{
						// 当聊天消息间隔超过10分钟时
						item.timeFlag = this.$dayjs(that[index].createTime).valueOf() - this.$dayjs(that[index-1].createTime).valueOf() > 600000 ? true : false
					}
				})
				if(this.page == 1){
					this.$nextTick(()=>{
						uni.pageScrollTo({
							scrollTop:999999,
							duration:0
						})
					})
				}
				this.hasFlag = 10*this.page < res.total
			},
			// 获取发送消息框高度
			getSendHeight() {
				let view = uni.createSelectorQuery().select(".button-send-container")
				view.boundingClientRect(res => {
					if (res.height <= 84) this.sendHeight = 84
					else this.sendHeight = res.height+2
				}).exec()
			},
			// 更新聊天已读
			async updateChatFlag(){
				let res = await this.$fetch(this.$api.chantReadFlag,{},'POST')
				console.log(res);
			},
			// 选择图片
			chooseImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res);
						 uni.uploadFile({
						   url: this.$api.unloadLocation,
						   filePath: res.tempFilePaths[0],
						   name: 'file',
						   header: {
							token: uni.getStorageSync('token')
						   },
						   formData: {
							token: this.qiniuToken
						   },
						   success: (uploadFileRes) => {
							let imgInfo = JSON.parse(uploadFileRes.data)
							
							this.sendImg = this.$api.baseLocation + imgInfo.hash
							uni.showLoading({
								title:'发送中...'
							})
							this.sendImgMsg()
						   },
						   fail: (err) => {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
						   }
						});
						
								
								
						
						
					}
				})
			},
			// 获取七牛token
			async getQiniuToken(){
				let res = await this.$fetch(this.$api.getQiniuToken,{},'POST','form')
				this.qiniuToken = res.data.token
			},
			// 发送图片消息
			async sendImgMsg(){
				let res = await this.$fetch(this.$api.sendMsg,{content:this.sendImg,msgType:1},'POST','form')
				let createTime = this.$dayjs()
				let time = this.$dayjs().fromNow()
				if(res.code == 0){
					this.msgList.push({
						'createTime':createTime,
						'time':time,
						'isAdmin':1,
						'content':this.sendImg,
						'timeFlag':true,
						'msgType':1,
					})
					this.sendImg = ''
					uni.pageScrollTo({
						scrollTop:999999,
						duration:0
					})
					uni.hideLoading()
				}
			},
			// 图片预览
			previewImage(current) { 
				let urls = []
				// 获取全部图片链接
				this.msgList.forEach(item => { if (item.msgType == 1) urls.push(item.content) })
				let indicator = urls.length > 1 ? 'default' : 'none'
				uni.previewImage({ urls, indicator, current })
			},
		},
		watch:{
			chatContent: function(newal) {
				this.getSendHeight()
			}
		},
		onLoad(options) {
			this.myAvatar = options.avatar
			this.getMsgList()
			this.updateChatFlag()
			this.getQiniuToken()
		},
		mounted() {
			this.$nextTick(()=>{
				uni.pageScrollTo({
					scrollTop:999999,
					duration:0
				})
			})
		},
		onPullDownRefresh() {
			if(this.hasFlag){
				this.getMsgList()
			}
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="less">
page {
	background: #f7f7f7;
}

.container {
	padding: 0 30upx 30upx 30upx;
	
	.list {
		
		.item {
			
			.time {
				padding: 40upx 0;
				color: #A2A2A2;
				font-size: 24upx;
				text-align: center;
			}
			
			.main-left {
				display: flex;
				
				.content-image {
					background: #f2f2f2;
					border-radius: 8upx;
					max-width: 300upx !important;
				}
				
				.long-image {
					max-width: 150upx !important;
				}
				
				image.avatar {
					max-width: 80upx;
					max-height: 80upx;
					min-width: 80upx;
					min-height: 80upx;
					border-radius: 8upx;
					margin-right: 30upx;
					background: #f2f2f2;
				}
				
				.content {
					border-radius: 8upx;
					padding: 20upx;
					background: #fff;
					max-width: 432upx;
					position: relative;
					word-wrap: break-word;
					font-size: 14px;
					color: #5B5B5B;
					
					&::before {
						content: "";
						position: absolute;
						top: 20upx;
						left: -10upx;
						background-size: 100%;
						width: 10upx;
						height: 20upx;
						background-image: url('~@/static/img/index/45.png');
					}
					
					&.show-loading::after {
						content: '';
						position: absolute;
						top: 50%;
						right: -60upx;
						width: 30upx;
						height: 30upx;
						color: red;
						border: 1px solid red;
						border-radius: 50%;
						clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
						animation: rotate 1s linear infinite;
					}
				}
			}
			
			.main-right {
				display: flex;
				justify-content: flex-end;
				
				.content-image {
					background: #f2f2f2;
					border-radius: 8upx;
					max-width: 300upx !important;
				}
				
				.long-image {
					max-width: 150upx !important;
				}
				
				.content {
					border-radius: 8upx;
					padding: 20upx;
					background: #5468FF;
					max-width: 432upx;
					position: relative;
					word-wrap: break-word;
					font-size: 14px;
					color: #FFFFFF;
					
					&::after {
						content: "";
						position: absolute;
						top: 20upx;
						right: -10upx;
						background-size: 100%;
						width: 10upx;
						height: 20upx;
						background-image: url('~@/static/img/index/46.png');
					}
					
					&.show-loading::before {
						content: '';
						position: absolute;
						top: 50%;
						left: -60upx;
						width: 30upx;
						height: 30upx;
						color: red;
						border: 1px solid red;
						border-radius: 50%;
						clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
						animation: rotate 1s linear infinite;
					}
				}
				
				image.avatar {
					max-width: 80upx;
					max-height: 80upx;
					min-width: 80upx;
					min-height: 80upx;
					border-radius: 8upx;
					margin-left: 30upx;
					background: #f2f2f2;
				}
			}
			
			&:first-child {
				padding-top: 0upx !important;
			}
			
			&.tiem-no {
				padding-top: 40upx;
			}
		}
	}
}

@keyframes rotate {
	from {
		transform: translateY(-50%) rotatez(0deg);
	}

	to {
		transform: translateY(-50%) rotatez(360deg);
	}
}
	
	.button-send-container {
		position: fixed;
		left: 0;
		bottom: 0upx;
		box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.03);
		
	}
	
	.send-container {
		// box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.03);
		background: #f7f7f7;
		width: 750upx;
		padding-top: 16upx;
		padding-bottom: 14upx;
		display: flex;
		align-items: center;
		
		textarea {
			flex: 1;
			background: #fff;
			height: 80upx;
			border-radius: 8upx;
			width: 544upx;
			padding: 20upx 30upx;
			margin-left: 30upx;
		}
		
		.confirm {
			width: 116upx;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.send-text {
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 80upx;
				color: #4A90E2;
				font-size: 14px;
			}
			.gray{
				color: #A2A2A2 !important;
			}
			
			.send-img {
				width: 52upx;
				height: 52upx;
				border-radius: 50%;
				border: 2upx solid #979797;
				position: relative;
				
				&::after {
					content: "";
					position: absolute;
					left: 50%;
					top: 50%;
					width: 28upx;
					height: 2upx;
					background: #979797;
					transform: translate(-50%, -50%);
				}
				
				&::before {
					content: "";
					position: absolute;
					left: 50%;
					top: 50%;
					width: 2upx;
					height: 28upx;
					background: #979797;
					transform: translate(-50%, -50%);
				}
				
				&:active {
					opacity: .5
				}
			}
		}
	}
</style>
