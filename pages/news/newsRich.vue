<template>
	<view class="rich-text">
		<view>
			<parser :html="articleContent"></parser>
			
		</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	export default {
		onLoad (options) {
			uni.setNavigationBarTitle({
			    title: options.title
			});
			let res = uni.getStorageSync('newRichContent')
			this.articleContent = res
		},
		data () {
			return {
				articleContent: ''
			}
		},
		components:{
			parser
		},
		methods:{
		
		}
	}
</script>

<style>
	/* page:after{
		display: none;
	} */
	.rich-text{
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 14px;
	}
</style>
