<template>
  <div class="sidebar-wrapper" ref="side">
    <div
      v-for="(item, i) in sideLists"
      :key="item"
      :class="{ active: index === i }"
      @touchend.passive="scrollTo(i, $event)"
      @touchstart.passive="move = false"
      @touchmove.passive="move = true"
    >
      {{ i == 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import moveTo from '../tools';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState(['sideLists']),
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      moveTo(
        side.scrollTop,
        sonTop + sonHeight / 2 - pTop - pHeight / 2,
        side,
        'scrollTop',
      );
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideLists[i], page: 1, sortType: 'all' });
    },
  },
};
</script>

<style lang="less" scoped>
.sidebar-wrapper {
  position: fixed;
  left: 0px;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
  }
}
.sidebar-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
