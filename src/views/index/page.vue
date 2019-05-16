<template>
  
  <d2-container class="page">
    <d2-page-cover
      title="d2admin 1.0.0"
      sub-title="基于D2 Admin权限管理">
      <d2-icon-svg
        class="page__logo"
        name="d2-admin"/>
      <template slot="footer">
        <div class="page__btn-group">
          <span @click="$open('https://github.com/samuelway/hyway')">Github</span>
        </div>
      </template>
    </d2-page-cover>
  </d2-container> 
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/releases', [
      'version'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
