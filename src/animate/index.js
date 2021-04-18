import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);

export default function ({
  startX, startY, endX, endY, src, width, height,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        opacity: 1,
        sx: 1,
        sy: 1,
        src,
        exist: true,
        width,
        height,
        moveX: startX,
        moveY: startY,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
    app.moveX = endX;
    app.moveY = endY;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1000);
}
