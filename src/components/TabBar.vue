<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item
    class="shop-car"
      :badge="badge"
      icon="cart-o"
      to="/home/shopping"
      >购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const result = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (result === 0) {
        return '';
      }
      if (result >= 99) {
        return '99+';
      }
      return result;
    },
  },
};
</script>

<style>
</style>
