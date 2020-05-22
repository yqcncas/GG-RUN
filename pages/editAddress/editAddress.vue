<template>

	<view class="edit-address">
		<view class="edit-header">
			<input class="header-name"  placeholder="姓名" v-model="userName" placeholder-style='font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);'></input>
			<view class="header-right">
				<input class="phone" @blur="checkPhoneNumber" maxlength="11" placeholder="电话" type="number" v-model="userPhone"
				 placeholder-style='font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);'></input>
				<image src="../../static/img/index/lianxiren.png" mode="aspectFill" @tap="getContacts"></image>
			</view>
		</view>
		<view class="edit-center" @tap="openMap">
			<view class="center-left">
				<view class="center-center" v-if="!editAddress.name">请选择您的地址</view>
				<view class="center-top">{{editAddress.name}}</view>
				<view class="center-bottom">{{editAddress.address}}</view>
			</view>
			<view class="center-right">
				<image src="../../static/img/index/dingwei.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="edit-detail">
			<input type="text" v-model="detailAddress" placeholder="请填写详细地址（精确到门牌号）" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);" />
		</view>
		<view class="save-address">
			<view class="save-left" @tap="saveAddress" :class="{vsbilityhidden:newAddressStatus == 3 || status == 0}">
				<view class="circle" :class="{on:circleIndex}"></view>
				<view class="save-text">保存到地址簿</view>
			</view>
			<view class="save-right" @tap="clearForm">清空当前信息</view>
		</view>
		<textarea class="copy-address" @blur="autoFillFn" v-model="autoFill" @focus='focusAutoFill' placeholder-class="textarea-font"
		 :placeholder="holder" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"></textarea>
		<view class="submit" @tap="submitAddress">提交</view>


	</view>

</template>
<script>
	export default {
		onLoad(options) {
			//判断从是起点进还是终点进
		
			if (options.addressDetail == undefined) {
				options.addressDetail = ""
			}

			if (options.status == 0) {
				uni.setNavigationBarTitle({
					title: '编辑地址填写'
				})
			}
			if (options.addressInfo == 0 || options.status == 0) {
				uni.setNavigationBarTitle({
					title: '发件地址填写'
				})
			} else if (options.addressInfo == 1 || options.status == 1) {
				uni.setNavigationBarTitle({
					title: '收件地址填写'
				})
			} else if (options.status == 3) {
				uni.setNavigationBarTitle({
					title: '编辑地址填写'
				})

			}
		

			this.status = options.status

			this.addressInfo = options.addressInfo


			//当有值进入的时候
			if (options.addressInfo != 0 || options.addressInfo != 1) {
				this.addressInfo = JSON.parse(options.addressInfo)
				console.log(this.addressInfo)
				if (this.addressInfo.addressDetail == "undefined") {
					this.addressInfo.addressDetail = ''
				}
				this.userName = this.addressInfo.name
				this.userPhone = this.addressInfo.mobile
				if (this.addressInfo.addressDetail instanceof Array) {
					console.log(this.addressInfo.addressDetail)
					this.editAddress.name = this.addressInfo.addressDetail[2]
					this.editAddress.address = this.addressInfo.addressDetail[0]
					// this.addressLongitude = this.editAddress.longitude+","+ this.editAddress.latitude
					this.editAddress.latitude = this.addressInfo.latitude.split(',')[1]
					this.editAddress.longitude = this.addressInfo.latitude.split(',')[0]
					this.detailAddress = this.addressInfo.addressDetail[1]
					if (this.detailAddress === "undefined") {
						this.detailAddress = ''
					}
				} else {
					// console.log(this.addressInfo.addressDetail)
					this.editAddress = this.addressInfo.editAddress

					this.detailAddress = this.addressInfo.addressDetail
					if (this.detailAddress === "undefined") {
						this.detailAddress = ''
					}
				}

				this.city = this.addressInfo.city
				this.province = this.addressInfo.province
				this.area = this.addressInfo.area
				this.addressLongitude = this.addressInfo.latitude
				this.orderId = this.addressInfo.id
			}
			
			if(options.ftSendAddress !== "") {
				
				let newSendAddress = JSON.parse(options.ftSendAddress)
				
				this.editAddress = {}
				// this.$set(this.editAddress,'name',newSendAddress.titleName)
				this.editAddress.name = newSendAddress.titleName
				this.editAddress.address = newSendAddress.addressname
				this.editAddress.latitude = newSendAddress.location.split(',')[1]
				this.editAddress.longitude = newSendAddress.location.split(',')[0]
			
			}


		},
		onUnload() {
			uni.hideKeyboard()
		},

		data() {
			return {
				//判断是起点终点编辑 0 起点 1 终点 2编辑
				addressStatus: '',
				newAddressStatus: '',
				editId: '',
				//圆
				circleIndex: true,
				//地图参数
				editAddress: {
					name: '',
					address: '',
					latitude: '',
					longitude: ''
				},

				//表单
				userName: '',
				userPhone: '',
				detailAddress: '',
				//接口参数
				province: '',
				city: '',
				area: '',
				defaultFlag: 0,
				addressLongitude: '',
				//新改的用的
				addressInfo: '',
				allTitle: '',
				orderId: '',
				status: '',
				//验证手机号
				checkPhone: '',
				//自动填充
				autoFill: '',
				autoFillLatitude: '',
				holder: '粘贴整段发货信息，系统会智能识别并且填写地址姓名电话。',
				//
				nstartSendAddress: {}
			}
		},
		methods: {
			//保存地址簿
			saveAddress() {
				this.circleIndex = !this.circleIndex
				if (this.circleIndex) {
					this.defaultFlag = 0
				} else {
					this.defaultFlag = 1
				}
				console.log(this.defaultFlag)
			},
			//清空信息
			clearForm() {
				this.userName = ''
				this.userPhone = ''
				this.editAddress = {},
					this.detailAddress = ''
			},
			//获取手机联系人
			getContacts() {
				let me = this
				if (plus.os.name == "Android") {
					plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (book) => {
						var REQUESTCODE = 1000;
						var main = plus.android.runtimeMainActivity();
						var Intent = plus.android.importClass('android.content.Intent');
						var ContactsContract = plus.android.importClass('android.provider.ContactsContract');
						var intent = new Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);
						main.onActivityResult = function(requestCode, resultCode, data) {
							if (REQUESTCODE == requestCode) {
								var phoneNumber = "";
								var resultString = "";
								var context = main;
								plus.android.importClass(data);
								var contactData = data.getData();
								var resolver = context.getContentResolver();
								plus.android.importClass(resolver);
								var cursor = resolver.query(contactData, null, null, null, null);
								plus.android.importClass(cursor);
								cursor.moveToFirst();
								//姓名
								var givenName = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME)) || "";
								var contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
								var pCursor = resolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, ContactsContract.CommonDataKinds
									.Phone.CONTACT_ID + " = " + contactId, null, null);
								if (pCursor.moveToNext()) {
									phoneNumber = pCursor.getString(pCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
								}
								phoneNumber = phoneNumber.replace(/\s/g, "")
								phoneNumber = phoneNumber.replace(/-/g, "")
								me.userName = givenName
								me.userPhone = phoneNumber
								if (callBack) {
									callBack(givenName, phoneNumber);
								}


								cursor.close();
								pCursor.close();
							}
						};
						main.startActivityForResult(intent, REQUESTCODE);
					})
				} else {
									var peoplePickerNavController = plus.ios.newObject("ABPeoplePickerNavigationController");
													console.log(2);
													//实现代理方法【- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker didSelectPerson:(ABRecordRef)person;】
													//同时生成遵守ABPeoplePickerNavigationControllerDelegate协议的代理对象peoplePickerDelegate
													var peoplePickerDelegate = plus.ios.implements("ABPeoplePickerNavigationControllerDelegate", {
														"peoplePickerNavigationController:didSelectPerson:": function(peoplePicker, person) {
															//这里的peoplePicker竟然是CNContact实例对象，person是undefined
															console.log(JSON.stringify(peoplePicker));
															console.log(JSON.stringify(person));
															console.log(typeof person);
									
															//所以之前的代码不用改
															var contact = peoplePicker;
															//姓名
															var name = "";
															//姓氏
															var familyName = contact.plusGetAttribute("familyName");
															//名字
															var givenName = contact.plusGetAttribute("givenName");
															name = familyName + givenName;
															//电话号码
															var phoneNo = "";
															var phoneNumbers = contact.plusGetAttribute("phoneNumbers");
															if (phoneNumbers.plusGetAttribute("count") > 0) {
																var phone = phoneNumbers.plusGetAttribute("firstObject");
																var phoneNumber = phone.plusGetAttribute("value");
																phoneNo = phoneNumber.plusGetAttribute("stringValue");
															}
															console.log(name, phoneNo)
															phoneNo= phoneNo.replace(/\s/g, "")
															phoneNo= phoneNo.replace(/-/g, "")
															me.userName = name
															me.userPhone = phoneNo
															console.log(me.userName, me.userPhone)
															if (callBack) {
																callBack(name, phoneNo);
															}
														}
													});
													//给通讯录控制器peoplePickerNavController设置代理
													plus.ios.invoke(peoplePickerNavController, "setPeoplePickerDelegate:", peoplePickerDelegate);
													//获取当前UIWebView视图
													var UIApplicationClass = plus.ios.importClass("UIApplication");
													var UIAppObj = UIApplicationClass.sharedApplication();
													var del = plus.ios.invoke(UIAppObj, "delegate");
													var appWindowObj = plus.ios.invoke(del, "window");
													var appRootController = plus.ios.invoke(appWindowObj, "rootViewController");
													//由当前控制器present到通讯录控制器
													plus.ios.invoke(appRootController, "presentViewController:animated:completion:", peoplePickerNavController, true,
														null);
				}

			},

			//自动填充
			autoFillFn() {
				
				let strLength = 0
				let res = this.smartParse(this.autoFill)
				
				//姓名
				if (this.autoFill.trim() !== "") {
					this.userName = res.name
					this.userPhone = res.phone
					this.province = res.province
					this.city = res.city
					this.area = res.county
					let addressNumber = res.address
					
				
					let that = this

					uni.request({
						url: 'https://restapi.amap.com/v3/geocode/geo?address=' + this.province + this.city + this.area + addressNumber +
							'&output=JSON&key=6223011d1e55de8ee9d00617ee5270c2',
						method: 'GET',
						success: (res) => {
							this.autoFillLatitude = res.data.geocodes[0].location
							this.editAddress = {}
							uni.request({
								url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + this.autoFillLatitude +
									'&key=6223011d1e55de8ee9d00617ee5270c2&radius=1000&extensions=all',
								method: 'GET',
								success: (res) => {
									if (res.data.regeocode.aois.length == 0) {
										this.$set(that.editAddress, "name", res.data.regeocode.pois[1].address)
										this.$set(that.editAddress, "address", res.data.regeocode.formatted_address)
										this.$set(that.editAddress, "longitude", that.autoFillLatitude.split(',')[0])
										this.$set(that.editAddress, "latitude", that.autoFillLatitude.split(',')[1])
									} else {

										this.$set(that.editAddress, "name", res.data.regeocode.aois[0].name)
										this.$set(that.editAddress, "address", res.data.regeocode.formatted_address)
										this.$set(that.editAddress, "longitude", that.autoFillLatitude.split(',')[0])
										this.$set(that.editAddress, "latitude", that.autoFillLatitude.split(',')[1])
									}
								}
							});
						}
					});
				}
			},
			//更改textarea 的placheholder值
			focusAutoFill() {
				this.holder = '粘贴整段发货信息，系统会智能识别并且填写地址姓名电话。例如:G小哥,132****0000,广东省深圳市南山区某某街道某某大厦001号'
			},

			//获取位置
			openMap() {
				let that = this
				uni.chooseLocation({
					success: res => {
						this.editAddress = res
						if (that.editAddress) {
							uni.request({
								url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + that.editAddress.longitude + ',' +
									that.editAddress.latitude + '&key=6223011d1e55de8ee9d00617ee5270c2&radius=1000&extensions=all', //仅为示例，并非真实接口地址。
								success: (res) => {
									
									if (that.editAddress.name === '地图位置') {
										console.log(res.data.regeocode)
										if (res.data.regeocode.aois.length) {
											that.editAddress.name = res.data.regeocode.aois[0].name
										} else {
											that.editAddress.name = res.data.regeocode.pois[0].name
										}
										
									}

									that.editAddress.address = res.data.regeocode.formatted_address
									that.province = res.data.regeocode.addressComponent.province
									that.city = res.data.regeocode.addressComponent.city
									that.area = res.data.regeocode.addressComponent.district
								}
							});
						}

					}
				});
			},

			checkPhoneNumber() {
				let reg = /^1[3456789]\d{9}$/;
				if (reg.test(this.userPhone)) {
					this.checkPhone = false
					console.log(this.checkPhone)
					return true
				} else {
					this.checkPhone = true
					console.log(this.checkPhone)
					return false
				}
			},
			//新增地址
			async submitAddress() {
				if (this.checkPhone) {
					uni.showToast({
						icon: 'none',
						title: '手机号码填写错误，请检查'
					})
					return
				}

				if (this.userName == "" || this.userPhone == "" || this.editAddress.name == "") {
					uni.showToast({
						icon: 'none',
						title: '姓名/手机/地址必须填写'
					})
					return
				}

				
				this.addressLongitude = this.editAddress.longitude + "," + this.editAddress.latitude
				this.allTitle = this.editAddress.address + ',' + this.detailAddress + ',' + this.editAddress.name
				if (this.addressDetail == undefined) {
					this.addressDetail = ""
				}

				//若是无内容进来新填地址
				if (this.addressInfo == 0 || this.addressInfo == 1) {
					if (this.detailAddress == undefined || this.detailAddress == '') {
						this.detailAddress = ""
					}
					//保存地址铺
					if (this.defaultFlag == 0) {
						let res = await this.$fetch(this.$api.addAddress, {
							addressDetail: this.allTitle,
							area: this.area,
							city: this.city,
							defaultFlag: 1,
							latitude: this.addressLongitude,
							mobile: this.userPhone,
							name: this.userName,
							province: this.province
						}, "POST", "form")
					

						if (this.addressInfo == 0) {

							let sendAddress = {
								addressDetail: this.detailAddress,
								latitude: this.addressLongitude,
								mobile: this.userPhone,
								name: this.userName,
								province: this.province,
								editAddress: this.editAddress,
								city: this.city,
								area: this.area,
								orderId: this.orderId
							}
							

							if (this.status != 0) {
								console.log('1')
								uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))
							}


						}
						//若是终点进来
						if (this.addressInfo == 1) {
							if (this.detailAddress == undefined) {
								this.detailAddress = ""
							}
							let endAddress = {
								addressDetail: this.detailAddress,
								latitude: this.addressLongitude,
								mobile: this.userPhone,
								name: this.userName,
								province: this.province,
								editAddress: this.editAddress,
								city: this.city,
								area: this.area,
								orderId: this.orderId
							}
							

							uni.setStorageSync('endAddress', JSON.stringify(endAddress))

						}
					} else {
						//不保存地址簿
						//若是起点进来
						if (this.detailAddress == undefined) {
							this.detailAddress = ""
						}

						if (this.addressInfo == 0) {
							
							let sendAddress = {
								addressDetail: this.detailAddress,
								latitude: this.addressLongitude,
								mobile: this.userPhone,
								name: this.userName,
								province: this.province,
								editAddress: this.editAddress,
								city: this.city,
								area: this.area,
								orderId: this.orderId
							}
							
							console.log('2')
							uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))

						}
						//若是终点进来
						if (this.addressInfo == 1) {
							if (this.detailAddress == undefined) {
								this.detailAddress = ""
							}
							let endAddress = {
								addressDetail: this.detailAddress,
								latitude: this.addressLongitude,
								mobile: this.userPhone,
								name: this.userName,
								province: this.province,
								editAddress: this.editAddress,
								city: this.city,
								area: this.area,
								orderId: this.orderId
							}
							

							uni.setStorageSync('endAddress', JSON.stringify(endAddress))
						}
					}
				}
				//编辑

				if (this.status == 3 || this.status == 0 || this.status == 1) {
					if (this.detailAddress == undefined) {
						this.detailAddress = ""
					}
					

					this.addressLongitude = this.editAddress.longitude + "," + this.editAddress.latitude
					this.allTitle = this.editAddress.address + ',' + this.detailAddress + ',' + this.editAddress.name

					if (this.orderId != "" && this.orderId != undefined) {

						let res = await this.$fetch(this.$api.updateAddress, {
							addressDetail: this.allTitle,
							area: this.area,
							city: this.city,
							defaultFlag: 1,
							latitude: this.addressLongitude,
							mobile: this.userPhone,
							name: this.userName,
							province: this.province,
							id: this.orderId
						}, "POST", "form")
						if (res.code == 0) {
							

							//编辑成功后更改缓存
							if (this.status == 0) {
								if (this.detailAddress == undefined) {
									this.detailAddress = ""
								}
								console.log(this.addressLongitude)
								let sendAddress = {
									addressDetail: this.detailAddress,
									latitude: this.addressLongitude,
									mobile: this.userPhone,
									name: this.userName,
									province: this.province,
									editAddress: this.editAddress,
									city: this.city,
									area: this.area,
									orderId: this.orderId
								}
								console.log('3')
								uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))
								
							}
							//若是终点进来
							if (this.status == 1) {
								if (this.detailAddress == undefined) {
									this.detailAddress = ""
								}
								let endAddress = {
									addressDetail: this.detailAddress,
									latitude: this.addressLongitude,
									mobile: this.userPhone,
									name: this.userName,
									province: this.province,
									editAddress: this.editAddress,
									city: this.city,
									area: this.area,
									orderId: this.orderId
								}

								uni.setStorageSync('endAddress', JSON.stringify(endAddress))
								
							}
						}
					} else {
						//保存地址铺
						if (this.defaultFlag == 0) {
							
							if (!(this.addressInfo === "")) {


								let res = await this.$fetch(this.$api.addAddress, {
									addressDetail: this.allTitle,
									area: this.area,
									city: this.city,
									defaultFlag: 1,
									latitude: this.addressLongitude,
									mobile: this.userPhone,
									name: this.userName,
									province: this.province
								}, "POST", "form")

								if (this.status == 0) {
									let sendAddress = {
										addressDetail: this.detailAddress,
										latitude: this.addressLongitude,
										mobile: this.userPhone,
										name: this.userName,
										province: this.province,
										editAddress: this.editAddress,
										city: this.city,
										area: this.area,
										orderId: this.orderId
									}
									
									console.log('4')
									console.log(uni.getStorageSync('noSetSend'))
									if (!uni.getStorageSync('noSetSend')) {
										uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))
										uni.removeStorageSync('noSetSend')
									}
									
									


								}
								//若是终点进来
								if (this.status == 1) {
									if (this.detailAddress == undefined) {
										this.detailAddress = ""
									}
									let endAddress = {
										addressDetail: this.detailAddress,
										latitude: this.addressLongitude,
										mobile: this.userPhone,
										name: this.userName,
										province: this.province,
										editAddress: this.editAddress,
										city: this.city,
										area: this.area,
										orderId: this.orderId
									}
									

									uni.setStorageSync('endAddress', JSON.stringify(endAddress))
									
								}
							}
						} else {
							//不保存地址簿
							//若是起点进来
							if (this.detailAddress == undefined) {
								this.detailAddress = ""
							}

							if (this.status == 0) {
								
								let sendAddress = {
									addressDetail: this.detailAddress,
									latitude: this.addressLongitude,
									mobile: this.userPhone,
									name: this.userName,
									province: this.province,
									editAddress: this.editAddress,
									city: this.city,
									area: this.area,
									orderId: this.orderId
								}
								
								console.log('5')
								uni.setStorageSync('sendAddress', JSON.stringify(sendAddress))
								
							}
							//若是终点进来
							if (this.status == 1) {
								if (this.detailAddress == undefined) {
									this.detailAddress = ""
								}
								let endAddress = {
									addressDetail: this.detailAddress,
									latitude: this.addressLongitude,
									mobile: this.userPhone,
									name: this.userName,
									province: this.province,
									editAddress: this.editAddress,
									city: this.city,
									area: this.area,
									orderId: this.orderId
								}
								

								uni.setStorageSync('endAddress', JSON.stringify(endAddress))
								
							}
						}

					}



				}

				uni.navigateBack({
					delta: 1
				})

			}

		}
	}
</script>

<style lang="less">
	page {
		background-color: rgb(247, 247, 250);
	}

	.edit-address {
		.edit-header {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			background-color: #fff;

			.header-name {
				width: 240rpx;
				padding-left: 30rpx;
				border-right: 2rpx solid #000000;
				box-sizing: border-box;
				// font-family: PingFangSC-Regular;
				font-size: 14px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				// color: rgba(9,2,62,0.30);
			}

			.header-right {
				width: 508rpx;
				padding-left: 30rpx;
				padding-right: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.phone {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					// color: rgba(9,2,62,0.30);

					box-sizing: border-box;
				}

				image {
					width: 44rpx;
					height: 44rpx;

				}
			}
		}

		.edit-center {
			width: 100%;
			height: 158rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			background-color: #fff;

			.center-left {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.center-top {
					font-family: PingFangSC-Semibold;
					font-size: 17px;
					color: #09023E;
					letter-spacing: -0.41px;
					font-weight: bold;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.center-bottom {
					margin-top: 10rpx;
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9, 2, 62, 0.30);
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.center-center {
					box-sizing: border-box;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
				}
			}

			.center-right {
				transform: scale(0.5);

				image {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}

		.edit-detail {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			background-color: #fff;

			input {
				width: 100%;
				font-size: 14px;
			}
		}

		.save-address {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.save-left {
				display: flex;
				align-items: center;

				&.vsbilityhidden {
					visibility: hidden;
				}

				.circle {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					border: 1px solid rgba(9, 2, 62, 0.30);
					box-sizing: border-box;

					&.on {
						background: url(../../static/img/my/choice.png) no-repeat;
						border: none;
						background-size: cover;
					}
				}

				.save-text {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					margin-left: 20rpx;
					box-sizing: border-box;
				}
			}

			.save-right {
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
			}
		}

		.copy-address {
			width: 100%;
			height: 300rpx;
			padding: 30rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 14px;
		}

		.textarea-font {
			color: rgba(9,2,62,0.30) !important;
			
		}

		.submit {
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
