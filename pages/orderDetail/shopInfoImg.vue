<template>
	<view class="shopInfoImg">
		<view class="shopInfoImg-box">
			<image :src="item" mode="aspectFill" v-for="(item, index) in imgList" :key = "index"  @click="showBigImg(item, imgList)"></image>
		</view>
		<u-empty  mode="list" v-if="isShowEmpty"></u-empty>
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			
			
			if (options.imgList == "[]") {
				this.imgList = []
				this.isShowEmpty = true
			}
			if (options.imgList == 'undefined') {
				this.isShowEmpty = true
			}
			if (options.imgList.length) {
				this.imgList = JSON.parse(options.imgList)
				console.log(this.imgList)
			} else {
				this.imgList = []
				this.isShowEmpty = true
			}
		},
		data () {
			return {
				imgList: [],
				isShowEmpty: false
			}
		},
		methods:{
			showBigImg(img, imgList) {
				uni.previewImage({
					current:img, 
					urls: imgList,
				});
			}
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		width: 100%;
		height: 100%;
	}
	.shopInfoImg{
		width: 100%;
		height: 100%;
		.shopInfoImg-box{
			// display: flex;
			// align-items: center;
			// justify-content: center;
			width: 100%;
			image{
				width: 100%;
			}
		}
	}
	
</style>
