var Twit = require('twit');
var config = require('./config.js');
var Twitter = new Twit(config);
var readline = require('readline-sync');
const commander = require('commander')

commander
  .version('0.1.0')
  .option('-i, --info',  'Ceci est une page d\'info')
  .parse(process.argv);

 if (commander.info) {
   console.log('script écrit par Le Cossec Silouan')
}

var hashtag = readline.question("rentrez votre hashtag  ");

var retweet = function() {
    var params = {
        q: hashtag,  // on va cherche l'input
        result_type: 'recent', // mixed ou recent
        count: 10,
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            var retweetId = data.statuses[0].id_str; // on met les actions que l' on veut effectuer si la recherche est bonne
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, data, response) {
                if (response) {
                    console.log('Retweeté');
                }

                if (err) {
                    console.log('il y a un problème, peut etre que l on a deja retweeté');
                }
            });
        }
        else {
          console.log('problème lors de la recherche');
        }
    });
}
setInterval(retweet, 30000)
retweet();
