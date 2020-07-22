import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const komaIndexList = ["fu", "kyosha", "keima", "gin", "kin", "kaku", "hisha"];

// Storeを生成
const store = new Vuex.Store({
  state: {
    komaList: {
      fu: { point: 1, label: "歩" },
      kyosha: { point: 3, label: "香" },
      keima: { point: 4, label: "桂" },
      gin: { point: 6, label: "銀" },
      kin: { point: 7, label: "金" },
      kaku: { point: 9, label: "角" },
      hisha: { point: 10, label: "飛" },
    },
    playerPoint: 0,
    comPoint: 0,
    playerKomadai: [],
    comKomadai: [],
    playerSelectable: Object.assign([], komaIndexList),
    comSelectable: Object.assign([], komaIndexList),
    phase: 1,
  },
  mutations: {
    updatePlayerSelectable(state, komaIndex) {
      const index = state.playerSelectable.indexOf(komaIndex);
      state.playerSelectable.splice(index, 1);
    },
    updateComSelectable(state, komaIndex) {
      const index = state.comSelectable.indexOf(komaIndex);
      state.comSelectable.splice(index, 1);
    },
    upPhase(state) {
      state.phase++;
    },
    addPlayerPoint(state, point) {
      state.playerPoint += point;
    },
    addComPoint(state, point) {
      state.comPoint += point;
    },
    addPlayerKoma(state, komaIndex) {
      state.playerKomadai.push(komaIndex);
    },
    addComKoma(state, komaIndex) {
      state.comKomadai.push(komaIndex);
    },
    reset(state) {
      state.playerPoint = 0;
      state.comPoint = 0;
      state.playerKomadai = [];
      state.comKomadai = [];
      state.playerSelectable = Object.assign([], komaIndexList);
      state.comSelectable = Object.assign([], komaIndexList);
      state.phase = 1;
    },
  },
});
export default store;
