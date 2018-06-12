<template>
  <div class="holder" id="viewport">
    <div class="screen"
         @dblclick="replaceImage"
         :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }">


      <component
        :is="val.type"
        :data-title="val.type"
        class="layer"
        :class="{'g-active': id === val.uuid}"
        v-for="val in widgetStore"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="750"
        :data-type="val.type"
        :data-uuid="val.uuid"
        :playState="playState">
        <component
          v-if="val.isContainer"
          :is="child.type"
          :data-title="child.type"
          class="layer layer-child"
          :class="{'g-active': id === child.uuid}"
          v-for="child in getChilds(val.name)"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="750"
          :data-type="child.type"
          :data-uuid="child.uuid"
          :playState="playState"/>
      </component>


      <ref></ref>


      <control></control>
    </div>
  </div>
</template>

<script>
  import ref     from './ref-lines.vue';
  import control from './size-control.vue';
  import {move}  from '../../mixins';

  export default {
    name: 'viewport',
    components: {
      ref: ref,
      control: control
    },

    mixins: [move],

    props: ['zoom'],

    data() {
      return {};
    },

    mounted() {

      document
        .getElementById('viewport')
        .addEventListener('mousedown', this.handleSelection, false);


      document.addEventListener(
        'keydown',
        e => {
          e.stopPropagation();
          var target = this.$store.state.activeElement;


          if (e.keyCode === 37 && target.left) {
            target.left -= 1;
            return;
          }

          if (e.keyCode === 38 && target.top) {
            e.preventDefault();
            target.top -= 1;
            return;
          }

          if (e.keyCode === 39 && target.left) {
            target.left += 1;
            return;
          }


          if (e.keyCode === 40 && target.top) {
            e.preventDefault();
            target.top += 1;
          }
        },
        true
      );
    },

    methods: {
      handleSelection(e) {
        var target = e.target;
        var type = target.getAttribute('data-type');

        if (type) {
          var uuid = target.getAttribute('data-uuid');


          this.$store.commit('select', {
            uuid: uuid || -1
          });


          target = this.$store.state.activeElement;
          if (target.belong === 'page' && target.dragable) {
            this.initmovement(e);
          }
        } else {

          this.$store.commit('select', {
            uuid: -1
          });
        }
      },


      replaceImage(e) {
        if (this.$store.state.activeElement.isUpload) {
          this.$store.$emit('upload', payload => {
            this.$store.commit('replaceImage', payload);
          });
        }
      },


      getChilds(name) {
        return this.$store.state.widgets.filter(
          item => item.belong === name
        );
      }
    },

    computed: {

      widgetStore() {
        return this.$store.state.widgets.filter(item => item.belong === 'page');
      },


      height() {
        return this.$store.state.page.height;
      },


      backgroundColor() {
        return this.$store.state.page.backgroundColor;
      },


      id() {


        return this.$store.state.uuid;
      },


      playState() {
        return this.$store.state.playState;
      }
    }
  };
</script>

<style scoped>
  .holder {
    display: flex;
    justify-content: center;
    height: 100%;
    overflow: auto;
    font-size: 0;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
  }

  .screen {
    width: 750px;
    margin: 25px auto;
    transform-origin: center top;
    position: relative;
  }
</style>
