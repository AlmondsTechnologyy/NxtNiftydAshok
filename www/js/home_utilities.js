/*
ONLOAD OF DOCUMNET
*/
function onLoadHome() {
    var value_login_type = window.localStorage.getItem("login_type");
    if(value_login_type=="facebook"){
         var value = window.localStorage.getItem("user_id");
         document.getElementById("profile_image").src="https://graph.facebook.com/"+value+"/picture?type=small";
     }else if(value_login_type=="google_plus"){
         var value = window.localStorage.getItem("user_id");
         document.getElementById("profile_image").src="https://plus.google.com/s2/photos/profile/"+value+"?sz=100";
     }
                     
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
 
}
 
function onBackKeyDown(e) {
  e.preventDefault();
}
 
/*
REQUEST FOR INDEX VALUE
*/
var myVar = setInterval(myTimer, 5000);
 
function myTimer() {
    var dateSuffix = moment().format('YYYY-MM-DD');
    var requestString = "http://nxtnifty.kalaiworld.com/gauge/"+dateSuffix;
    makeRequest(requestString);
}
 
function makeRequest(url) {
    httpRequestIndexValue = new XMLHttpRequest();
    console.log('HOME GAUGE URL ' + url);
    if (!httpRequestIndexValue) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequestIndexValue.onreadystatechange = alertContents;
    httpRequestIndexValue.open('GET', url);
    httpRequestIndexValue.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequestIndexValue.send();
}
 
function alertContents() {
    if (httpRequestIndexValue.readyState === XMLHttpRequest.DONE) {
        if (httpRequestIndexValue.status === 200) {
            var response = JSON.parse(httpRequestIndexValue.responseText);
                if(response.status == "OK"){
                    var indexValue = response.gaugeValue;
                    console.log('indexValue ' + indexValue);
 
                    var gaugeValue = 0;
                    if (indexValue > 7000) {
                        gaugeValue = indexValue - 7000;
                    };
                    console.log('gauge value ' + gaugeValue.toString());
 
                    document.getElementById("showSpeedometer").innerHTML = gaugeValue.toString();
                    $('#showSpeedometer').speedometer();
                    document.getElementById("lastValue").innerHTML = response.gaugeValue;
                } else {
                    console.log('There was a problem with the request.' + httpRequestIndexValue.status);
                }
            }
                 
        }
 }
/*
LOGOUT
*/
 
function logout(){
        var value_login_type = window.localStorage.getItem("login_type");
        console.log("Logout value type: " + value_login_type);
        if(value_login_type=="facebook"){
             
            navigator.notification.confirm(
                'Do you wish to logout?', // message
                function onConfirm(buttonIndex) {
                    if(buttonIndex==1){
                        facebookLogout();
                    }
                },  // callback to invoke with index of button pressed
                'Logout',           // title
                ['Logout','Cancel']     // buttonLabels
            );
        }else if(value_login_type=="google_plus"){ 
            navigator.notification.confirm(
                'Do you want to logout?', // message
                function onConfirm(buttonIndex) {
                    if(buttonIndex==1){
                        googlePlusLogout();
                    }
                },  // callback to invoke with index of button pressed
                'Logout',           // title
                ['Logout','Cancel']     // buttonLabels
            );
             
 
        }else{
            navigator.notification.confirm(
                'Do you want to logout?', // message
                function onConfirm(buttonIndex) {
                    if(buttonIndex==1){
                        window.location.href="index.html";
                        clearStorage();
                    }
                },  // callback to invoke with index of button pressed
                'Logout',           // title
                ['Logout','Cancel']     // buttonLabels
            );
             
        }
}
 
 
 
function googlePlusLogout(){
    window.plugins.googleplus.logout(
    function (msg) {
        console.log(msg);
        clearStorage();
    });
}
 
function facebookLogout() {
        facebookConnectPlugin.logout(fbLogoutSuccess, function loginError (error) {
                alert("fbError :" + error)
              });
}
var fbLogoutSuccess = function (userData) {
            console.log("UserInfo: " + JSON.stringify(userData));
            clearStorage();
 
            // alert("Login Successfull");
            window.location.href="index.html";
 
}
function clearStorage(){
        window.localStorage.removeItem("login_type");
        window.localStorage.removeItem("user_id");
}