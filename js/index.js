let userNames = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];
let getStatusURL = "https://api.twitch.tv/kraken/streams/";
let clientID = "?client_id=b6s9axduwtlfj950a4jm43jh3vxyii&callback=";
let channelURL = "https://api.twitch.tv/kraken/channels/"

// https://api.twitch.tv/kraken/channels/cretetion?client_id=b6s9axduwtlfj950a4jm43jh3vxyii&callback=
userNames.forEach(function(name) {
  function getURL(url) {
    return url + name + clientID
  }

  $.ajax({
    type: 'GET',
    url: getURL(getStatusURL),
    success: function(getData) {
      let status;
      // let getData = data.stream;
      getData.stream !== null ? status = 'online' : status = 'offline';
      $.ajax({
        type: 'GET',
        url: getURL(channelURL),
        success: function(data) {
          if (status === 'online') {
            let onlineHtml = '<div class="content online"><span class="logo"><img src="' + data.logo + '"></span><a href="' + data.url + '" target="_blank">' + data.name + '</a><span class="online-status-logo"><img src="images/online-64.png"></span><p class="status">' + data.game + ': ' + data.status + '</p></div>';
            $('#content').append(onlineHtml);
          } else if (status === 'offline') {
            let offlineHtml = '<div class="content offline"><span class="logo"><img src="' + data.logo + '"></span><a href="' + data.url + '" target="_blank">' + data.name + '</a><span class="offline-status-logo"><img src="images/offline-64.png"></div>';

            // <p class="status"><span class="offline-status-logo"><img src="images/offline-64.png"></span>Offline</p></div>';
            $('#content').append(offlineHtml);
          }
        }
      });
    }
  });
});


// $(document).ready(function() {
//   status = "online" ?
// });
