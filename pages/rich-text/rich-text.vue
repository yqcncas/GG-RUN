<template>
	<view class="rich-text">
		<view>
			<jyf-parser :html="richTextMain.articleContent"></jyf-parser>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-Parser/jyf-parser";
	export default {
		onLoad (options) {
			
			this.id = options.id
			this.type = options.type
			this.initRichText()
			
		},
		data () {
			return {
				id: '',
				type: '',
				richTextMain: ''
			}
		},
		 components: {
		    jyfParser
	  },
		methods:{
			async initRichText () {
				if (this.id != undefined) {
					
					let res = await this.$fetch(this.$api.articleId,{id:this.id},"POST","Form")
					if (res.code == 0) {
						this.richTextMain = res.data
					}
					console.log(res.data)
					uni.setNavigationBarTitle({
						title: this.richTextMain.articleTitle
					})
				} else if (this.type != undefined) {
					let res = await this.$fetch(this.$api.articleId,{type:this.type},"POST","Form")
					
					if (res.code == 0) {
						this.richTextMain = res.data
					}
					console.log(res.data)
					uni.setNavigationBarTitle({
						title: this.richTextMain.articleTitle
					})
				}
			}
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
