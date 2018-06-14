export default {
  top: 0,
  zoom: 64,
  type: 'page',
  index: -1,
  uuid: null,
  counter: 0,

  originX: 0,
  originY: 0,
  startX: 0,
  startY: 0,
  moving: false,

  animation: [],
  playState: false,

  activeElement: {},
  page: {
    page: true,
    title: 'Test page',
    height: 1500,
    endTime: new Date(),
    backgroundColor: '#fff'
  },
  widgets: []
};
