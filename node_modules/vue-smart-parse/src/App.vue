<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!--  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ol>
      <li>广东省珠海市香洲区盘山路28号幸福茶庄,陈景勇，13593464918</li>
      <li>马云，陕西省西安市雁塔区丈八沟街道高新四路高新大都荟 13593464918</li>
      <li>陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810</li>
      <li>西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810</li>
      <li>雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810</li>
      <li>北京市朝阳区姚家园3楼 13593464918 马云</li>
      <li>河北省石家庄市新华区中华北大街68号鹿城商务中心6号楼1413室 150-3569-6956 马云</li>
      <li>新疆维吾尔自治区乌鲁木齐市沙依巴区西虹东路463号 150-3569-6956 小红</li>
      <li>新疆阿克苏温宿县博孜墩乡吾斯塘博村一组306号 150-3569-6956 马云</li>
    </ol>
    <textarea class="form-control" cols="50" rows="7" id="textarea" placeholder="请粘贴你的地址"></textarea>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    var textarea = document.getElementById("textarea");
    textarea.addEventListener(
      "blur",
      (event) =>{
        let value = textarea.value;
        console.log(this.smartParse(value));
      },
      true
    );
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
