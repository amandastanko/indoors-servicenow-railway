

module.exports = [
  { path: 'incidents', methods: ['get'], handler: controller.getIncidents },
  { path: 'requests', methods: ['get'], handler: controller.getRequests },
  { path: 'locations', methods: ['get'], handler: controller.getLocations }
];

