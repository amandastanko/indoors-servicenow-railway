
const controller = require('../controller');

module.exports = [
  {
    path: 'locations',
    methods: ['get'],
    handler: controller.getLocations
  }
];

