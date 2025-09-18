/* Copyright 2019 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
  controller.js

  This file is not required unless additional routes specified in routes.js
  If so, corresponding functions must be written to match those routes.

  Documentation: http://koopjs.github.io/docs/usage/provider
*/

function Controller (model) {
  this.model = model
}

function getLocations(req, callback) {
  // Simulated response from ServiceNow cmn_location table
  const mockServiceNowResponse = [
    {
      name: "San Francisco Office",
      location_id: "LOC001",
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      name: "New York Office",
      location_id: "LOC002",
      latitude: 40.7128,
      longitude: -74.0060
    }
  ];

  // Transform the mock response into GeoJSON
  const geojson = {
    type: "FeatureCollection",
    features: mockServiceNowResponse.map(location => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.longitude, location.latitude]
      },
      properties: {
        name: location.name,
        location_id: location.location_id
      }
    }))
  };

  callback(null, geojson);
}



module.exports = {
  getIncidents,
  getRequests,
  getLocations
};

