// Marvel API handler
'use strict';
var api = require('marvel-api');
var cheerio = require('cheerio');
var rp = require('request-promise');


const spiderman = require('./spider-man')

// Sanchit's
// var marvel = api.createClient({
//   publicKey: 'c85fb470f52c2f0fadc9cf7b2383414d',
//   privateKey: 'da0da9c53718269ad9056277e226a9937c0c23e9'
// });

// Akshara's
var marvel = api.createClient({
  publicKey: 'f68effcfe068983ac93f8656d2057325',
  privateKey: 'b8634a3ed60207dab363b842b7cc9ed9491b1df9'
});

var getCharacterInfo = function(character_id) {
  return marvel.characters.find(character_id)
  .then(function(res) {
    var thumbnail = res.data[0].thumbnail
    var imageUrl = thumbnail.path + '.' + thumbnail.extension;
    // Call .then on
    var url = res.data[0].urls.filter((u) => u.type == 'detail')[0].url
     
    return {
        id: res.data[0].id,
        image: imageUrl,
        name: res.data[0].name,
        url: url
      }
  })
  .fail(function (err) {
    console.error(JSON.stringify(err))
  });
};

var getInfoByName = function (name) {
  return marvel.characters.findByName(name)
  .then((res) => getCharacterInfo(res.data[0].id))
  .fail(function (res) {
    // console.log("Error!")
    console.error(JSON.stringify(res))
  });
}

var getAssociatedCharacters = function(character_id, limit) {
  return marvel.characters.comics(character_id, limit)
  .then(function(res) {
    var character_list = res.data.map(function (event) {
      return event.characters.items.map(function(character) {
        return character.name;
      });
    });
    character_list = [].concat.apply([], character_list)

    return Promise.all(Array.from(new Set(character_list)).slice(0, limit)
      .map((c) => getInfoByName(c))
    );
  })
  .fail(function (err) {
    console.error('Failure: ', err)
  }); 
};


// Main
var character_id = '1009610';
var name = 'spider-man';
// getCharacterInfo(character_id).then(console.log)
// getInfoByName(name).then(console.log)

// getAssociatedCharacters(character_id, 20).then(function (res) {
//   console.log(JSON.stringify(res));
// });


// export
module.exports = {
  getAssociatedCharacters: getAssociatedCharacters
}