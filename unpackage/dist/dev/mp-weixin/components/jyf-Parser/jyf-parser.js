(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/jyf-Parser/jyf-parser"],{

/***/ 511:
/*!******************************************************************!*\
  !*** E:/web-project/errand/components/jyf-Parser/jyf-parser.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jyf-parser.vue?vue&type=template&id=b8fd9790& */ 512);
/* harmony import */ var _jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jyf-parser.vue?vue&type=script&lang=js& */ 514);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jyf-parser.vue?vue&type=style&index=0&lang=css& */ 519);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 17);

var renderjs





/* normalize component */

var component = Object(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["render"],
  _jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "E:/web-project/errand/components/jyf-Parser/jyf-parser.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 512:
/*!*************************************************************************************************!*\
  !*** E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=template&id=b8fd9790& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./jyf-parser.vue?vue&type=template&id=b8fd9790& */ 513);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_template_id_b8fd9790___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 513:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=template&id=b8fd9790& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 514:
/*!*******************************************************************************************!*\
  !*** E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./jyf-parser.vue?vue&type=script&lang=js& */ 515);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_360_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 515:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var trees = function trees() {__webpack_require__.e(/*! require.ensure | components/jyf-Parser/libs/trees */ "components/jyf-Parser/libs/trees").then((function () {return resolve(__webpack_require__(/*! ./libs/trees */ 559));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};





















var cache = {},

fs = uni.getFileSystemManager ? uni.getFileSystemManager() : null,

Parser = __webpack_require__(/*! ./libs/MpHtmlParser.js */ 516);
var dom;
// 计算 cache 的 key
function hash(str) {
  for (var i = str.length, val = 5381; i--;) {
    val += (val << 5) + str.charCodeAt(i);}
  return val;
}








/**
   * Parser 富文本组件
   * @tutorial https://github.com/jin-yufeng/Parser
   * @property {String|Array} html 富文本数据
   * @property {Boolean} autopause 是否在播放一个视频时自动暂停其他视频
   * @property {Boolean} autoscroll 是否自动给所有表格添加一个滚动层
   * @property {Boolean} autosetTitle 是否自动将 title 标签中的内容设置到页面标题
   * @property {Number} compress 压缩等级
   * @property {String} domain 图片、视频等链接的主域名
   * @property {Boolean} lazyLoad 是否开启图片懒加载
   * @property {String} loadingImg 图片加载完成前的占位图
   * @property {Boolean} selectable 是否开启长按复制
   * @property {Object} tagStyle 标签的默认样式
   * @property {Boolean} showWithAnimation 是否使用渐显动画
   * @property {Boolean} useAnchor 是否使用锚点
   * @property {Boolean} useCache 是否缓存解析结果
   * @event {Function} parse 解析完成事件
   * @event {Function} load dom 加载完成事件
   * @event {Function} ready 所有图片加载完毕事件
   * @event {Function} error 错误事件
   * @event {Function} imgtap 图片点击事件
   * @event {Function} linkpress 链接点击事件
   * @example <jyf-parser :html="html"></jyf-parser>
   * @author JinYufeng
   * @version 20200528
   * @listens MIT
   */var _default =
{
  name: 'parser',
  data: function data() {
    return {







      showAm: '',

      nodes: [] };

  },

  components: {
    trees: trees },


  props: {
    html: null,
    autopause: {
      type: Boolean,
      default: true },

    autoscroll: Boolean,
    autosetTitle: {
      type: Boolean,
      default: true },


    compress: Number,
    loadingImg: String,
    useCache: Boolean,

    domain: String,
    lazyLoad: Boolean,
    selectable: Boolean,
    tagStyle: Object,
    showWithAnimation: Boolean,
    useAnchor: Boolean },

  watch: {
    html: function html(_html) {
      this.setContent(_html);
    } },

  mounted: function mounted() {
    // 图片数组
    this.imgList = [];
    this.imgList.each = function (f) {
      for (var i = 0, len = this.length; i < len; i++) {
        this.setItem(i, f(this[i], i, this));}
    };
    this.imgList.setItem = function (i, src) {var _this = this;
      if (i == void 0 || !src) return;

      // 去重
      if (src.indexOf('http') == 0 && this.includes(src)) {
        var newSrc = '';
        for (var j = 0, c; c = src[j]; j++) {
          if (c == '/' && src[j - 1] != '/' && src[j + 1] != '/') break;
          newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
        }
        newSrc += src.substr(j);
        return this[i] = newSrc;
      }

      this[i] = src;
      // 暂存 data src
      if (src.includes('data:image')) {
        var filePath,info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!info) return;

        filePath = "".concat(wx.env.USER_DATA_PATH, "/").concat(Date.now(), ".").concat(info[1]);
        fs && fs.writeFile({
          filePath: filePath,
          data: info[3],
          encoding: info[2],
          success: function success() {return _this[i] = filePath;} });












      }
    };




    if (dom) this.document = new dom(this);





    if (this.html) this.setContent(this.html);



  },
  beforeDestroy: function beforeDestroy() {



    this.imgList.each(function (src) {








      if (src && src.includes(uni.env.USER_DATA_PATH))
      fs && fs.unlink({
        filePath: src });


    });
    clearInterval(this._timer);
  },
  methods: {


































    setContent: function setContent(html, append) {var _this2 = this;


















































































































































































      var nodes;
      if (!html)
      return this.nodes = [];else
      if (typeof html == 'string') {
        var parser = new Parser(html, this);
        // 缓存读取
        if (this.useCache) {
          var hashVal = hash(html);
          if (cache[hashVal])
          nodes = cache[hashVal];else
          {
            nodes = parser.parse();
            cache[hashVal] = nodes;
          }
        } else nodes = parser.parse();
        this.$emit('parse', nodes);
      } else if (Object.prototype.toString.call(html) == '[object Array]') {
        // 非本插件产生的 array 需要进行一些转换
        if (html.length && html[0].PoweredBy != 'Parser') {
          var _parser = new Parser(html, this);
          (function f(ns) {
            for (var i = 0, n; n = ns[i]; i++) {
              if (n.type == 'text') continue;
              n.attrs = n.attrs || {};
              for (var item in n.attrs) {
                if (typeof n.attrs[item] != 'string') n.attrs[item] = n.attrs[item].toString();}
              _parser.matchAttr(n, _parser);
              if (n.children && n.children.length) {
                _parser.STACK.push(n);
                f(n.children);
                _parser.popNode(_parser.STACK.pop());
              } else n.children = void 0;
            }
          })(html);
        }
        nodes = html;
      } else if (typeof html == 'object' && html.nodes) {
        nodes = html.nodes;
        console.warn('错误的 html 类型：object 类型已废弃');
      } else
      return console.warn('错误的 html 类型：' + typeof html);
      if (append) this.nodes = this.nodes.concat(nodes);else
      this.nodes = nodes;
      if (nodes.length && nodes[0].title && this.autosetTitle)
      uni.setNavigationBarTitle({
        title: nodes[0].title });

      if (this.imgList) this.imgList.length = 0;
      this.videoContexts = [];
      this.$nextTick(function () {
        _this2.$emit('load');
      });

      var height;
      clearInterval(this._timer);
      this._timer = setInterval(function () {








        _this2.createSelectorQuery().

        select('#top').boundingClientRect().exec(function (res) {
          if (!res) return;
          _this2.rect = res[0];

          if (_this2.rect.height == height) {
            _this2.$emit('ready', _this2.rect);
            clearInterval(_this2._timer);
          }
          height = _this2.rect.height;

        });

      }, 350);
      if (this.showWithAnimation && !append) this.showAm = 'animation:show .5s';

    },
    getText: function getText() {var ns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.nodes;
      var txt = '';







      for (var i = 0, n; n = ns[i++];) {
        if (n.type == 'text') txt += n.text.replace(/&nbsp;/g, "\xA0").replace(/&lt;/g, '<').replace(/&gt;/g, '>').
        replace(/&amp;/g, '&');else
        if (n.type == 'br') txt += '\n';else
        {
          // 块级标签前后加换行
          var block = n.name == 'p' || n.name == 'div' || n.name == 'tr' || n.name == 'li' || n.name[0] == 'h' && n.name[1] >
          '0' && n.name[1] < '7';
          if (block && txt && txt[txt.length - 1] != '\n') txt += '\n';
          if (n.children) txt += this.getText(n.children);
          if (block && txt[txt.length - 1] != '\n') txt += '\n';else
          if (n.name == 'td' || n.name == 'th') txt += '\t';
        }
      }

      return txt;
    },
    navigateTo: function navigateTo(obj) {var _this3 = this;
      if (!this.useAnchor)
      return obj.fail && obj.fail({
        errMsg: 'Anchor is disabled' });


























      var Scroll = function Scroll(selector, component) {
        uni.createSelectorQuery().in(component ? component : _this3).select(selector).boundingClientRect().selectViewport().
        scrollOffset().
        exec(function (res) {
          if (!res || !res[0])
          return obj.fail && obj.fail({
            errMsg: 'Label not found' });

          obj.scrollTop = res[1].scrollTop + res[0].top + (obj.offset || 0);
          uni.pageScrollTo(obj);
        });
      };
      if (!obj.id) Scroll('#top');else
      {

        Scroll('#top >>> #' + obj.id + ', #top >>> .' + obj.id);






      }

    },
    getVideoContext: function getVideoContext(id) {

      if (!id) return this.videoContexts;else

      for (var i = this.videoContexts.length; i--;) {
        if (this.videoContexts[i].id == id) return this.videoContexts[i];}

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 519:
/*!***************************************************************************************************!*\
  !*** E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./jyf-parser.vue?vue&type=style&index=0&lang=css& */ 520);
/* harmony import */ var _D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_360_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_360_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_360_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_360_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_jyf_parser_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 520:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/web-project/errand/components/jyf-Parser/jyf-parser.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jyf-Parser/jyf-parser.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jyf-Parser/jyf-parser-create-component',
    {
        'components/jyf-Parser/jyf-parser-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(511))
        })
    },
    [['components/jyf-Parser/jyf-parser-create-component']]
]);
