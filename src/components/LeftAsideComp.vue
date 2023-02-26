!<template>
  <div class='user-body-left'>
    <div class='aside-block' style="top:10px">
      <div class='aside-box'>
        <div class="aside-box-title"> 我的专栏 </div>
        <div class="aside-box-body">
          <div class="aside-box-body-content">
            <ul>
              <li v-for="item in columnList" :key="item">
                <a href="http://" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                  <div class="special-colum-bar"></div>
                  {{ item }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='aside-box'>
        <div class="aside-box-title"> 推荐文章 </div>
        <div class="aside-box-body">
          <div class="aside-box-body-content">
            <ul>
              <li v-for="item in recommendList" :key="item.id">
                <a :href="`${ip}/${item.author}/article/${item.id}`" target="_blank" rel="noopener noreferrer" class="aside-box-body-a">
                  <div class="special-colum-bar"></div>
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { get_column_list, get_recommend_list } from '@/http/apis'
import { ip } from '@/http/index'
import { onBeforeMount, ref } from 'vue'

export default {
  name: 'LeftAsideComp',

  setup() {
    let columnList = ref('')
    let recommendList = get_recommend_list()

    onBeforeMount(async () => {
      columnList.value = await get_column_list()
    })

    return { ip, columnList, recommendList }
  }
}
</script>

<style scoped>
.user-body-left {
  width: 280px;
}
.aside-block {
  position: sticky;
  /* top: 40px; */
  align-items: start;
}
.aside-box {
  background-color: white;
  display: block;
  border-radius: 5px;
  margin-right: 6px;
  margin-bottom: 6px;
}
.aside-box-title {
  height: 48px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #e8e8ed;
}
.aside-box-body {
  padding: 16px;
}
.aside-box-body-content ul {
  border-left: 1px dashed #ccccd8;
  padding: 0;
  margin: 0;
  list-style-type: none;
  list-style: none;
  box-sizing: border-box;
  display: block;
}
.aside-box-body a {
  text-decoration: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #555666;
  font-size: 16px;
  line-height: 30px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.aside-box-body a:hover {
  color: red;
}
.special-colum-bar {
  width: 12px;
  height: 1px;
  border-bottom: 1px dashed #ccccd8;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-right: 8px;
}
</style>