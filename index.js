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
  index.js

  This file is required. It's role is to specify configuration settings.

  Documentation: http://koopjs.github.io/docs/usage/provider
*/

// Define the provider path
// /:name/:hosts?/:disableIdParam?/FeatureServer/:layer/:method
// e.g. /sample/FeatureServer/0/query

console.log('Model type:', typeof require('./model'));        // should be function
console.log('Controller type:', typeof require('./controller')); // should be object
console.log('Routes type:', typeof require('./routes/index'));  // should be object or array

const provider = {
  type: 'provider',
  name: 'ServiceNow',
  hosts: false, // if true, also adds disableIdParam
  disableIdParam: false, // if true, adds to path and req.params
  Controller: require('./controller'),
  Model: require('./model'),
  routes: require('./routes'),
  version: require('./package.json').version
}

module.exports = provider
