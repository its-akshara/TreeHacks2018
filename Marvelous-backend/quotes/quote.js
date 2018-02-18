var getInfos = require('./marvel').getAssociatedCharacters;
var quoteDB = require('./quoteDB');

'use strict';

// Quote object definition

class Quote {
  constructor(name='', image='', characterId = null) {
    // this._quote = quote;
    this._name = name;
    this._image = image;
    this._characterId = characterId;
  }

  objectRep() {
    return {
      name: this._name,
      image: this._image,
      characterId :this._characterId
    }
  }

  jsonString() {
    return JSON.stringify(this.objectRep())
  }
}

var getQuotes = function (character_id, limit) {
  return (getInfos(character_id, limit)
  .then(function (res) {
    return res.filter((c) => c.name in quoteDB).map(function (c) {
      return {
        image: c.image,
        name: c.name,
        characterId: c.id.toString(),
        detailUrl: c.urls,
        quote: quoteDB[c.name]
      }
    });
  }));
}

// Main
var character_id = '1009610';
var limit = 20;
// getInfos(character_id, limit).then(function(res) {
//   console.log(JSON.stringify(res))
// });

// getQuotes(character_id, limit).then(function(res) {
//   console.log(JSON.stringify(res))
// });

module.exports = {
  getQuotes: getQuotes
}


