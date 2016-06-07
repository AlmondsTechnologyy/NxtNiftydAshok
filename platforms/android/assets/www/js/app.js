(function(window, document) {

  function formatDate(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
  }

  function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    $('#date').html(formatDate(new Date()));
    document.getElementById("lastValue").innerHTML = "7898";
    $('#showSpeedometer').speedometer();
    $('#showSpeedometer').css( 'background-image' , 'url("./img/background.png")' );
    var data = $.getJSON('http://aptman.herokuapp.com/nxtniftynew');
  }
  window.onload = onLoad;
})(window, document)
