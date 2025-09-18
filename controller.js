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
const axios = require('axios');
const config = require('config');

function Controller(model) {
  this.model = model;
}

async function getLocations(req, callback) {
  try {
    const instanceUrl = config.get('servicenow.url'); // from default.json
    const username = config.get('servicenow.username');
    const password = config.get('servicenow.password');

    const response = await axios.get(`${instanceUrl}/api/now/table/cmn_location`, {
      auth: {
        username,
        password
      },
      headers: {
        'Accept': 'application/json'
      },
      params: {
        sysparm_fields: 'name,sys_id,latitude,longitude',
        sysparm_limit: 100
      }
    });

    const locations = response.data.result;

    const geojson = {
      type: 'FeatureCollection',
      features: locations.map(location => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(location.longitude),
            parseFloat(location.latitude)
          ]
        },
        properties: {
          name: location.name,
          location_id: location.sys_id
        }
      }))
    };

    callback(null, geojson);
  } catch (error) {
    console.error('Error fetching ServiceNow data:', error.message);
    callback(error);
  }
}

module.exports = {
  getLocations
};

