/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
var getQuotes = require('./quotes/quote').getQuotes

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Marvelous!').end();
});

var testResponse = {
  quote: "Hello!",
  character: "Tony Stark",
  image: "https://nerdist.com/wp-content/uploads/2016/04/Iron-Man.jpg"
}
var character_id = '1009610'
// getQuotes(character_id, 10).then(function(res) {
//   console.log(JSON.stringify(res))
// });

app.get('/cards', (req, res) => {
  getQuotes(parseInt(req.query.characterId), req.query.limit).then(function (quoteList) {
    res.status(200).send(quoteList).end();
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
