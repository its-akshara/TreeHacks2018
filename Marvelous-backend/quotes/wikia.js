var Wikia = require('node-wikia');
var marvel = new Wikia('marvel');


marvel.getArticlesListExpanded({
  category: 'Quotes',
  limit: 6050
}).then(function(res) {
  articles = res.items.filter((m) => m.title.indexOf('(Earth-616)') != -1)
  console.log(JSON.stringify(articles))
}).fail(console.error)