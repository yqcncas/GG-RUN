<template>
	<view class="freight-deatail">
		<view class="freight-header">
			<view class="all-price">总金额：</view>
			<view class="price">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.payAmount}}</view>
		</view>
		<view class="freight-main">
			<view class="freight-item" v-if="freightInfo.startPrice">
				<view class="item-left">起步价<p class = "item-left-bottom">(不足1公里按1公里计费)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.startPrice}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.premium">
				<view class="item-left">保价服务<p class = "item-left-bottom">(遗失商品按填写金额全额赔付)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.premium}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.extraMileagePrice || freightInfo.extraMileagePric">
				<view class="item-left">超里程价<p class = "item-left-bottom">(超出4公里后，加收超里程费用)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.extraMileagePrice}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.urgentExpressPrice">
				<view class="item-left">加急专送<p class = "item-left-bottom">(专人直达，时间缩短1/3)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.urgentExpressPrice}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.urgentExpressPric">
				<view class="item-left">加急专送<p class = "item-left-bottom">(专人直达，时间缩短1/3)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.urgentExpressPric}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.specialTimePrice">
				<view class="item-left">特殊时段<p class = "item-left-bottom">(遇特殊时段时，促进骑手快速接单，临时加价)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.specialTimePrice}}</view>
			</view>
			<view class="freight-item" v-if="freightInfo.weatherSubsidy">
				<view class="item-left">天气影响<p class = "item-left-bottom">(遇恶劣天气影响，促进骑手快速接单，临时加价)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.weatherSubsidy}}</view>
			</view>
		<!-- 	<view class="freight-item" v-if="freightInfo.goodsInventory">
				<view class="item-left">商品预估价<p class = "item-left-bottom">(商品预计价值)</p></view>
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.goodsInventory.cost}}</view>
			</view> -->
			<view class="freight-item" v-if="freightInfo.otherPrice">
				<view class="item-left">其他<p class = "item-left-bottom">(动态加价)</p></view>
				<!-- <view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : freightInfo.otherPrice}}</view> -->
				<view class="item-right">¥{{JSON.stringify(freightInfo) =='{}' ? 0 : elsePrice}}</view>
			</view>
			<view class="freight-total total-line" v-if="freightInfo.taskReward">
				<view class="item-left">合计:</view>
				<view class="item-right total-text">¥{{freightInfo.taskReward}}</view>
			</view>
			<view class="freight-total" v-if="freightInfo.goodsPredictAmount">
				<view class="item-left">预付金:<p class = "item-left-bottom">(预付金金额与商品价值无关，多退少补，私下支付)</p></view>
				<view class="item-right total-text">¥{{freightInfo.goodsPredictAmount}}</view>
			</view>
			<view class="freight-total" v-if="freightInfo.taskReward - freightInfo.payAmount + freightInfo.serviceCharge">
				<view class="item-left">优惠券:</view>
				<view class="item-right total-text" v-if="status === '1'">-¥{{youhuiPrice}}</view>
				<view class="item-right total-text" v-else>-¥{{newsyouhuiPrice}}</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			
			this.freightInfo = JSON.parse(options.freightInfo)
			this.disposeSpecialTimePrice()
			console.log(this.freightInfo)
			this.status = options.status
			
			
		},
		
		data () {
			return{
				freightInfo: {},
				status: 0
			}
		},
		computed:{
			youhuiPrice () {
				let yhPrice = Number(this.freightInfo.goodsPredictAmount + this.freightInfo.taskReward - this.freightInfo.payAmount + this.freightInfo.serviceCharge).toFixed(2)
				console.log(yhPrice)
				return yhPrice
			},
			newsyouhuiPrice () {
				let yhPrice = Number(this.freightInfo.taskReward - this.freightInfo.payAmount + this.freightInfo.serviceCharge).toFixed(2)
				console.log(yhPrice)
				return yhPrice
			},
			elsePrice () {
				let elsePriceText = Number(this.freightInfo.otherPrice - this.freightInfo.weatherSubsidy).toFixed(2)
				console.log(elsePriceText)
				return elsePriceText
			}
		},
		methods:{
			disposeSpecialTimePrice() {
				
				if (JSON.stringify(this.freightInfo) != "{}") {
					if (this.freightInfo.specialTimePrice == null) {
						this.freightInfo.specialTimePrice = 0
					}
					if (this.freightInfo.specialTimePrice == "null") {
						this.freightInfo.specialTimePrice = 0
					}
					if (this.freightInfo.goodsPredictAmount == "null") {
						this.freightInfo.goodsPredictAmount = 0
					}
					if (this.freightInfo.goodsPredictAmount == null) {
						this.freightInfo.goodsPredictAmount = 0
					}
				}
				
			}

		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.freight-deatail{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.freight-header{
			width: 690rpx;
			height: 180rpx;
			background: url(../../static/img/my/mywallet.png) no-repeat;
			background-size: cover;
			margin-top: 30rpx;
		
			border-radius: 7px 7px 0 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			.all-price{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
			}
			.price{
				padding-left: 40rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Semibold;
				font-size: 28px;
				color: #FFFFFF;
			}
		}
		.freight-main{
			width: 690rpx;
			background: #FFFFFF;
			box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
			border-radius: 0 0 7px 7px;
			box-sizing: border-box;
			padding: 0 30rpx;
			.freight-item{
				// width: 298rpx;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				// margin-left: 142rpx;
				// box-sizing: border-box;
				// margin-bottom: 20rpx;
				// flex-wrap: nowrap;
				
				display: flex;
				margin-bottom: 20rpx;
				margin-left: 10rpx;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				&:first-child{
					margin-top: 30rpx;
					box-sizing: border-box;
				}
				&:last-child{
					margin-bottom: 30rpx;
					box-sizing: border-box;
				}
				.item-left{
					
					// width: 324rpx;
					white-space: nowrap;
					// text-align: right;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					margin-right: 40rpx;
					box-sizing: border-box;
					
				}
				.item-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					// margin-left: 40rpx;
					box-sizing: border-box;
				}
			}
			.freight-total{
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				&.total-line{
					border-top: 1rpx solid #CCCCCC;
				}
				.item-left{
					white-space: nowrap;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					margin-right: 40rpx;
					box-sizing: border-box;
					padding-left: 8rpx;
				}
				.item-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					// margin-left: 40rpx;
					box-sizing: border-box;
					&.total-text{
						font-family: PingFangSC;
						font-weight: 700;
						font-size: 16px;
						color: rgba(38, 66, 225, 1);
						font-style: normal;
					}
				}
			}
		}
		.item-left-bottom{
			font-family: PingFangSC;
			font-weight: 400;
			font-size: 10px;
			color: rgb(116, 116, 116);
		}
	}
</style>
