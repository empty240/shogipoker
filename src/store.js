import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Storeを生成
const store = new Vuex.Store({
  state: {
    count: 0,
  },
});
export default store;
