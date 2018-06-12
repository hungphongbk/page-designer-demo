import defaultWidgets from 'vue-page-designer-widgets';

var widgets;
var widgetStyle = {};

const install = (Vue, config = {}) => {
  if (install.installed) return;

  widgets = Object.assign({}, defaultWidgets, config.widgets);

  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key]);

    if (widgets[key]['panel']) {
      let panel = Object.assign({}, widgets[key]['panel'], {
        type: key
      });
      Vue.component(panel.name, panel);
      widgetStyle[panel.name] = panel;

      delete widgets[key]['panel'];
    }
  });
};

export default {
  install,
  getWidgets() {
    return widgets;
  },
  getWidgetStyle() {
    return widgetStyle;
  }
};
