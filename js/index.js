const userNames = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];
const getStatusURL = "https://api.twitch.tv/kraken/streams/";
const clientID = "?client_id=b6s9axduwtlfj950a4jm43jh3vxyii&callback=";
const channelURL = "https://api.twitch.tv/kraken/channels/"

//Run loop for all user names
userNames.forEach(function(name) {
  function getURL(url) {
    return url + name + clientID
  }

  //Send request to get online status
  $.ajax({
    type: 'GET',
    url: getURL(getStatusURL),
    success: function(getData) {
      let status;
      getData.stream !== null ? status = 'online' : status = 'offline';

      //Send request to get information about the channel based on status
      $.ajax({
        type: 'GET',
        url: getURL(channelURL),
        success: function(data) {
          if (status === 'online') {
            let onlineHtml = '<div class="content online"><span class="logo"><img src="' + data.logo + '"></span><a href="' + data.url + '" target="_blank">' + data.display_name + '</a><span class="online-status-logo"><img src="images/online-64.png"></span><p class="status">' + data.game + ': ' + data.status + '</p></div>';
            $('#content').append(onlineHtml);
          } else if (status === 'offline') {
            let offlineHtml = '<div class="content offline"><span class="logo"><img src="' + data.logo + '"></span><a href="' + data.url + '" target="_blank">' + data.display_name + '</a><span class="offline-status-logo"><img src="images/offline-64.png"></div>';
            $('#content').append(offlineHtml);
          }
        }
      });
    }
  });
});
//Display all/online/offline channels when button clicked
$(document).ready(function() {
  $('#all').click(function() {
    $('.online, .offline').removeClass('hidden');
  });
  $('#online').click(function() {
    $('.online').removeClass('hidden');
    $('.offline').addClass('hidden');
  });
  $('#offline').click(function() {
    $('.offline').removeClass('hidden');
    $('.online').addClass('hidden');
  });

  //Search for channel
  $('#search').keyup(function() {
    let searchValue = $('#search').val();

    $('.content a').each(function() {
      if(searchValue == ''){
        $('.container .content').show();
      }
      else if($(this).text().search(searchValue) > -1){
        console.log(this);
        $('.container .content').show();
      }
      else{
        $('.container .content').hide();
      }
    });
  });
});
