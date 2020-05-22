// 请在此对象写后端的请求接口列表
export default {
	// 此处写开发调试地址--自动生效
	// dev: 'http://192.168.8.5:8093/',
	// dev:'http://101.132.115.48:8093/',
	dev:'https://admin.gglaisong.com/',
	// 此处写线上环境地址--自动生效
	pro: 'https://admin.gglaisong.com/',
	
	/**
	 * 登录
	 */
	customerUser:'/notoken/user/customer_register', //客户注册
	customerLogin: '/notoken/user/customer_login', //客户登录
	customerForget: '/notoken/user/customer_forget_pwd',//客户忘记密码
	customerPhone: '/notoken/user/mobile_verification_code', //获取手机验证码
	customerWx: "/notoken/user/customer_login_by_unionId",//客户微信登录

	/**
	 * 用户
	 */
	currentUser: '/token/user/current_user', //获取当前客户
	checkMobile: "/token/user/check_mobile",//校验用户手机号
	checkPwd: "/token/user/check_pwd",//校验用户密码
	updMobile: "/token/user/upd_mobile",//修改手机号
	updPwd: "/token/user/upd_pwd",//修改密码
	goodsType: "/token/user/goods_type",//商品类型列表
	disCount: "/token/user/coupon_list",//优惠卷列表
	getScanRange: "/token/user/get_scan_range",//获取扫描范围
	articleId: "/notoken/user/article_by_id",//根据id获取协议
	articleType: "/notoken/user/article_by_type",//根据类型获取协议
	userComplain:"/token/user/user_complain",//用户投诉
	sendMsg: "/token/user/seng_msg",//发送消息
	chatMsgList: "/token/user/chat_msg_list",//消息列表
	signCodeFlag: "/token/user/upd_user_sgin_code_flag",//用户默认签收码标识修改
	collectionCodeFlag: "/token/user/upd_special_collection_flag",//用户默认签收码标识修改
	getReceiptFlag: "/notoken/user/get_receipt_flag", // 用户搜索骑手
	invitedStatics: "token/user/invited_return_statics", // 邀请人数
	
	/**
	 * 消息
	 */
	bindUserMsg: "/token/user/bind_user_msg",//绑定用户已读消息
	msgList: "/token/user/msg_list",//查看系统消息列表
	msgIsReader: "/token/user/new_msg_is_read",//查看是否有未读消息
	infoRedDot: "/token/user/info_red_dot", //红点信息
	chantReadFlag: "/token/user/upd_chant_read_flag", //聊天已读更新
	
	

	
	
	
	/**
	 * 上传
	 */
	upLoad: "token/file/upload",//上传文件
	changeAvatar: "/token/user/upd_avatar",//修改头像
	changeBirthday: "/token/user/upd_user_detail",//用户生日性别修改
	riderComplain:'token/user/rider_complain',//骑手投诉/意见反馈
	
	/**
	 * 订单
	 */
	orderCalculation: "/token/order/calculation_order",//计算订单
	orderCreate: "/token/order/create_order",//创建订单
	orderCustomer: "/token/order/customer_order_list",//客户订单列表
	orderDetail: "/token/order/order_detail_by_id",//订单详情
	orderPay: "/token/order/order_pay",//订单支付
	orderCancel: "/token/order/cancel_order",//取消订单
	orderConfirm: "/token/order/confirm_receipt",//确认收件并结算
	orderEvaluate: "/token/order/evaluate_or_complaint",//评价
	orderConfig: "/token/user/complaint_config",//	获取投诉信息配置
	orderCollection: "/token/user/collection_shield",//收藏屏蔽
	orderCancelCollection:"/token/user/cancel_collection_shield",//取消收藏屏蔽
	orderorderCollectionList: "/token/user/collection_shield_list",//收藏屏蔽列表
	orderCurrent: "/token/user/current_user_transfer_list",//账单明细
	orderProperty:"/token/user/get_premium_property",//保价金配置金额
	orderCancelProp: "/token/user/custom_cancel_prop",//客户取消配置
	orderDisplay: '/token/order/upd_display', // 更新订单显示状态
	
	
	
	
	/**
	 * 地址
	 */
	addAddress: '/token/address/add', //添加地址
	delAddress: '/token/address/del', //删除地址
	updateAddress: '/token/address/update',//地址编辑
	addressList: "/token/address/user_address_list", //地址列表
	changeDefault: "/token/address/upd_default_address",//更新地址为默认地址
	testAdcode: "/token/order/test_adcode", // 测试行政区划代码是否开通
	
	
	/**
	 * 充值
	 */
	rechargeInfo: "/token/user/recharge_coupon_list",//充值优惠卷配置
	userRecharge:"/token/user/user_recharge",//用户充值
	
	/**
	 * 发票
	 */
	invoiceInfo: "/token/user/current_user_invoice_list",//历史发票
	invoiceApply: "/token/user/apply_invoice",//申请开票
	
	/**
	 * 更新
	 */
	version:'/notoken/user/get_new_version',//获取最新版本号
	
}
