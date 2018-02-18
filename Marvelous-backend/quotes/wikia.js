var Wikia = require('node-wikia');
var marvel = new Wikia('marvel');
var cheerio = require('cheerio');
var rp = require('request-promise');
var quotes = require('./marvelQuotes');
var keys = Object.keys(quotes);
// console.log(JSON.stringify(keys));


'use strict';

var HOST = 'marvel';

getQuoteArticles = function () {
  return marvel.getArticlesListExpanded({
    category: 'Quotes',
    limit: 6050
  }).then(function(res) {
    var universe = '(Earth-616)';
    var articles = res.items.filter((m) => m.title.indexOf(universe) != -1)

    var quoteObject = {};
    articles.forEach(function (q) {
      quoteObject[q.title.split(' ' + universe)[0]] = {
        url: q.url,
        id: q.id
      };

    })

    // console.log(JSON.stringify(quoteObject))
  }).fail(console.error)
}

getName = function(name) {
  name = name.replace(/\s*$/,"");
  var parenName = name.split(' ')[0] + ' ' + name.split(' ')[this.length-1]
  var middleName = name.split(' ').slice(1, this.length-1).join(' ')
  if (name in quotes) {
    // console.log(name)
    return name;
  } else if (parenName in quotes) {
    return parenName;
  } else if ((parenName + ' ' + '(' + middleName + ')') in quotes) {
    return parenName + ' ' + '(' + middleName + ')';
  } else {
    var nameArr = name.split(' ')
    for (k in keys) {
      if (name.indexOf(k) != -1 | k.indexOf(name) != -1) {
        return k;
      }
      var kArr = k.split('(');
      if (kArr.length == 1) {
        var same = 0;
        for (n in kArr) {
          for (i in nameArr) {
            if (i == n) {
              same += 1;
            }
          }
        }
        if (same >= 2) {
          return k;
        }
      } else if (kArr.length == 2) {
        var before = kArr[0].split(' ')[0];
        var paren = kArr[1].split(')')[0];
        var same = 0;
        for (n in before.concat(paren)) {
          for (i in nameArr) {
            if (i == n) {
              same += 1;
            }
          }
        }
        if (same >= 2) {
          return k;
        }
      }
    }
  }

  return "Peter Parker";
}

getQuote = function (name) {
  // name = name.replace(/\s*$/,"");
  // name = getName(name);
  if (name) {
    var URL = "http://marvel.wikia.com" + quotes[name].url;
    var options = {
        uri: URL,
        transform: function (body) {
          return cheerio.load(body);
        }
    };

    return rp(options)
    .then(function ($) {
      // Process html like you would with jQuery...
      var quote = $('#mw-content-text.mw-content-ltr.mw-content-text').children('dl').children().first().children().eq(1).text();
      // console.log(quote);
      if (quote.length > 50) {
        return '';
      }
      return quote;
    })
    .catch((err) => '')
  }
}

var quoteDB = {};

// Promise.all(keys.map((k) => getQuote(k)
//   .then(function (q) {
//     quoteDB[k] = q;
//   })))
// .then(function (c) {
//   console.log(JSON.stringify(quoteDB))
// });

getQuote("107").then(console.log);

module.exports = {
  getQuote: getQuote,
}



