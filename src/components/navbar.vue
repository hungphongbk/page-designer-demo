<template>
  <header class="header">
    <div class="navbar container grid-xl">
      <section class="logo navbar-section">
        <icon name="anchor"/>
      </section>
      <section class="navbar-section">
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="Copy element (Ctrl + C)" @click="copyWidget">
          <icon name="copy"/>
          Copy
        </a>
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="Delete (Delete)" @click="dele">
          <icon name="trash-2"/>
          Delete
        </a>
        <a @click="save" class="btn btn-link tooltip tooltip-bottom" data-tooltip="Save (Ctrl + S)">
          <icon name="save"/>
          Save</a>
      </section>
    </div>
  </header>
</template>

<script>
  export default {
    mounted() {

      document.addEventListener(
        'keyup',
        e => {
          e.stopPropagation();
          if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
            this.copyWidget();
          }
        },
        true
      );


      document.addEventListener(
        'keyup',
        e => {
          e.stopPropagation();
          if (e.keyCode === 46) {
            this.dele();
          }
        },
        true
      );


      document.addEventListener(
        'keyup',
        e => {
          e.stopPropagation();
          if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
            this.save();
          }
        },
        true
      );
    },

    methods: {

      save() {
        this.$store.dispatch('save');
      },


      copyWidget() {
        this.$store.commit('copy');
      },


      dele() {
        this.$store.commit('delete');
      }
    },

    computed: {
      show() {
        return this.$store.state.type !== 'page';
      }
    }
  };
</script>

<style lang="scss">
  @import '../_variables.scss';

  .header {
    background-color: #24292e;
    padding: 12px 0;
  }

  .navbar {
    .svg-icon {
      svg {
        vertical-align: middle;
      }
    }
    .btn.btn-link {
      color: $gray-color;
      margin-right: 15px;
    }
    .btn.btn-link:hover {
      color: $light-color;
    }
    .logo {
      font-size: 20px;
      .svg-icon {
        width: 30px;
        text-align: center;
        background-color: $light-color;
        border-radius: 50%;
      }
    }
  }
</style>
