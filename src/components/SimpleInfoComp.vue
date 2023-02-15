<template>
  <div class="blog-list-box">
    <div class='blog-list-title'>
      <span>{{ title }}</span>
    </div>

    <div class="blog-list-context">
      <span>{{ context }}</span>
    </div>

    <div class="blog-list-footer">
      <span class="footer-type-box"> {{type}} </span>
      <span class="footer-time-box">发布博客&nbsp;{{ ctime }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SimpleInfoComp',
  props: ['title', 'context', 'ctime', 'type'],

  setup() {}
}
</script>

<style scoped>
.blog-list-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.blog-list-context {
  color: #555666;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 24px;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.footer-type-box {
  color: #28b7f5;
  background: rgba(7, 48, 108, 0.1);
  text-align: center;
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 8px;
}
.footer-time-box {
  color: #555666;
  line-height: 20px;
  font-size: 14px;
  margin-right: 8px;
}
</style>