<template>
	<view class="news">
		<view class="scroll">
			<view class="scroll-item " :class="{on:index === currentIndex}" v-for="(item,index) in scrollList" :key = 'index' @tap="handleCurrentIndex(index)">{{item}}</view>
			<!-- <view class="scroll-item ">活动福利</view>
			<view class="scroll-item">业务须知</view> -->
		</view>
		<view class="news-box">
			<view class="news-item" v-for="(item,index) in newsList" :key = "index" @tap="goTonewsRich(item.title,msgContent[index])">
				<view class="item-header">
					<view class="header-left">{{item.title}}</view>
					<view class="header-right">{{item.createTime}}</view>
				</view>
				<view class="item-bottom" >
					{{item.content}}
				</view>
			</view>
		</view>
		<uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				scrollList:['全部消息','活动福利','业务须知'],
				currentIndex: 0,
				//参数用下标
				ajaxIndex: '',
				//分页
				pageNum: 0,
				hasFlag:true,
				newsList: [],
				msgContent: [],
				readerFlag: ''
			}
		},
		onLoad() {
			this.initNewsList()
		
		},
		onUnload(){
			// this.initReadNews()
		},
		onShow() {
			uni.removeStorageSync('newRichContent');
			
		},
		onPullDownRefresh(){
			setTimeout(() => {
				this.pageNum = 0
				this.hasFlag = true
				this.newsList = []
				this.msgContent = []
				this.initNewsList()
				this.initReadNews()
				uni.stopPullDownRefresh()
			},1000)
			
		},
		methods: {
			//去订单
			goTonewsRich (title,content) {
				console.log(content)
				uni.setStorageSync('newRichContent',content);
				uni.navigateTo({
					url: './newsRich?title=' + title 
				})
			},
			//改下标
			handleCurrentIndex (index) {
				this.currentIndex = index
				
				if(this.currentIndex == 0) {
					this.ajaxIndex = ""
				} else if (this.currentIndex == 1) {
					this.ajaxIndex = 0
				}else if (this.currentIndex == 2) {
					this.ajaxIndex = 1
				}
				this.newsList = []
				this.msgContent = []
				this.pageNum = 0
				this.hasFlag = true
				this.initNewsList()
			},
			async initNewsList(){
				if(!this.hasFlag) return //没有更多数据
				this.pageNum = ++this.pageNum
				let res = await this.$fetch(this.$api.msgList,{msgType:this.ajaxIndex,pageNum:this.pageNum,pageSize:12},'POST','FORM')
		
				for( let i = 0 ; i < res.rows.length;i++) {
					this.msgContent.push(res.rows[i].content)
				}
			
				
				this.newsList = [...this.newsList,...res.rows]
				if(this.newsList.length) {
					
				
				this.newsList.forEach(item => {
					item.content = this.filterHTMLTag(item.content)
				})
				
				// console.log(JSON.stringify(this.newsList))
				this.readerFlag = this.newsList[0].id
			}
				
				this.hasFlag = this.pageNum * 12 < res.total
				this.initReadNews()
			},
			
			filterHTMLTag (msg) {
				var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
				msg = msg.replace(/[|]*\n/, '') //去除行尾空格
				msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
				return msg; 
			},
			//阅读
			async initReadNews(){
				
				if (this.readerFlag !== "") {
					let res = await this.$fetch(this.$api.bindUserMsg,{msgId:this.readerFlag},'POST','FORM')
					console.log(res)
				}
				
			}
		},
		onReachBottom() { 
			if(this.hasFlag) {
				this.initNewsList()
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.news{
		// padding-bottom: 60rpx;
		.scroll{
			width: 100%;
			height: 90rpx;
			background-color: #fff;
			display: flex;
			.scroll-item{
				width: 33%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				position: relative;
				
				&::after{
					content: '';
					width: 0;
					height: 0;
					border: 2rpx solid #5468FF;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: 0.5s;
					display: none;
				}
				&.on{
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #5468FF;
					transition: 0.5s;
					&::after{
						width: 20%;
						display: inline-block;
						transition: 0.5s;
					}
				}
			}
		}
		.news-box{
			.news-item{
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				border-bottom: 1rpx solid #F7F7FA;
				&:last-child{
					border-bottom: none;
				}
				&:first-child{
					margin-top: 30rpx;
					box-sizing: border-box;
				}
				.item-header{
					display: flex;
					justify-content: space-between;
					.header-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
					}
					.header-right{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(9,2,62,0.30);
					}
				}
				.item-bottom{
					margin-top: 8rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					display: -webkit-box;    
					-webkit-box-orient: vertical;    
					-webkit-line-clamp: 1;    //控制行数
					overflow: hidden;
					
				}
			}
		}
	}
</style>
