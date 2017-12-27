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
            let statusTitle = data.status;
            if(statusTitle.length > 18){
              statusTitle = statusTitle.substring(0, 15);
              statusTitle += '...';
            }
            let onlineHtml = '<div class="content online"><span class="logo"><img src="' + data.logo + '"></span><a href="' + data.url + '" target="_blank">' + data.display_name + '</a><span class="online-status-logo"><img src="images/online-64.png"></span><p class="status">' + data.game + ': ' + statusTitle + '</p></div>';
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


  //Search for channel
  $('#search').keyup(function() {
    let searchValue = $('#search').val();
    let regex = new RegExp(searchValue, "i");

    $('.content:not(.hidden)').each(function() {
      if(searchValue === ''){
        $(this).show();
      }
      else if($(this).text().search(regex) != -1){
        $(this).show();
      }
      else{
        $(this).hide();
      }
    });
  });

//Display all/online/offline channels when button clicked
$(document).ready(function() {
  $('#all').click(function() {
    $('.online, .offline').removeClass('hidden');
    console.log($(this));
    $(this).css('background-color:', '#6441a5');
  });
  $('#online').click(function() {
    $('.online').removeClass('hidden');
    $('.offline').addClass('hidden');
    $('.btn').css('background:', '#6441a5');
  });
  $('#offline').click(function() {
    $('.offline').removeClass('hidden');
    $('.online').addClass('hidden');
    $('.btn').css('background:', '#6441a5');
  });
});
