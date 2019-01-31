const Twitter = require('twitter');
// // Template to render
// <div class="item">
//     <div class="testimony-slide active text-center">
//         <figure>
//             <img src="images/couple-1.jpg" alt="user">
//         </figure>
//         <span>John Doe, via <a href="#" class="twitter">Twitter</a></span>
//         <blockquote>
//             <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics"</p>
//         </blockquote>
//     </div>
// </div>

//Tweet mention link format:
// `https://twitter.com/Mik_Fattoruso/status/1086673243950497793`
// `https://twitter.com/${screen_name}/status/${tweetId}`

var tweetsToHtml = (tweets) => {
    var html = "";
    var header = '<div class="item"><div class="testimony-slide active text-center">';
    var footer = '</div></div>';

    for (var i = 0; i < tweets.length; i++) {
        var tweetId = tweets[i].id_str;
        var screenName = tweets[i].user.screen_name;
        var profileImage = tweets[i].user.profile_image_url_https;
        var message = tweets[i].text;
        var userName = tweets[i].user.name;
        var tweetLink = `https://twitter.com/${screenName}/status/${tweetId}`;

        var figure = `<figure><img src="${profileImage}" alt="user" onerror="this.src='images/twitter.png'"></figure>`;
        var span = `<span>${userName}, via <a href="${tweetLink}" class="twitter">Twitter</a></span>`;
        var blockquote = `<blockquote><p>"${message}"</p></blockquote>`;

        html += header + figure + span + blockquote + footer;

        // console.log(tweet);
    }
    console.log("tweets converted correctly");
    // console.log(html);
    return html;
};

var getTweets = () => {

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    // console.log('process.env.TWITTER_CONSUMER_KEY:', process.env.TWITTER_CONSUMER_KEY);
    // console.log('process.env.TWITTER_CONSUMER_SECRET:', process.env.TWITTER_CONSUMER_SECRET);
    // console.log('process.env.TWITTER_ACCESS_TOKEN_KEY:', process.env.TWITTER_ACCESS_TOKEN_KEY);
    // console.log(' process.env.TWITTER_ACCESS_TOKEN_SECRET:',  process.env.TWITTER_ACCESS_TOKEN_SECRET);

    return new Promise(function (resolve, reject) {

        client.get('statuses/mentions_timeline.json?count=10', function (error, tweets, response) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Tweets fetched correctly');
                resolve(tweetsToHtml(tweets));
            }

            // tweetsToHtml(tweets);


            // console.log(response);  // Raw response object.
        });

    });
    // //get the mentions
    // client.get('statuses/mentions_timeline', function(error, tweets, response) {
    //     if(error){ 
    //         console.log(error);
    //         // throw error;
    //     }

    //     tweetsToHtml(tweets);


    //     // console.log(response);  // Raw response object.
    // });

    // //get the ones we have posted
    // client.get('statuses/home_timeline', function(error, tweets, response) {
    //     if(error){ 
    //         console.log(error);
    //         // throw error;
    //     }
    //     console.log("Tweets2: "+JSON.stringify(tweets));  // The favorites.
    //     // console.log(response);  // Raw response object.
    // });

};



module.exports = {
    getTweets
};