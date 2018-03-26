const userNames = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];
const getStatusURL = "https://api.twitch.tv/kraken/streams/";
const clientID = "?client_id=b6s9axduwtlfj950a4jm43jh3vxyii&callback=";
const channelURL = "https://api.twitch.tv/kraken/channels/"
const content = $('#content');
const searchField = $('#search');

//Run loop for all user names
userNames.forEach(function(name) {
  function getURL(url) {
    return `${url}${name}${clientID}`
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
              statusTitle = `${statusTitle.substring(0, 15)}...`;
            }
            let onlineHtml = `<div class="content online"><span class="logo"><img src="${data.logo}" alt="channel-logo"></span><a href="${data.url}" target="_blank">${data.display_name}</a><span class="online-status-logo"><img src="images/online-64.png" alt="online-icon"></span><p class="status">${data.game}:${statusTitle}</p></div>`;
            content.append(onlineHtml);
          } else if (status === 'offline') {
            let offlineHtml = `<div class="content offline"><span class="logo"><img src="${data.logo}" alt="channel-logo"></span><a href="${data.url}" target="_blank">${data.display_name}</a><span class="offline-status-logo"><img src="images/offline-64.png" alt="offline-icon"></div>`;
            content.append(offlineHtml);
          }
        }
      });
    }
  });
});


  //Search for channel
  searchField.keyup(function() {
    let searchValue = searchField.val();
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
    $('#all').addClass('active');
    $('#online, #offline').removeClass('active');
  });
  $('#online').click(function() {
    $('.online').removeClass('hidden');
    $('.offline').addClass('hidden');
    $('#online').addClass('active');
    $('#all, #offline').removeClass('active');
  });
  $('#offline').click(function() {
    $('.offline').removeClass('hidden');
    $('.online').addClass('hidden');
    $('#offline').addClass('active');
    $('#all, #online').removeClass('active');
  });
});
