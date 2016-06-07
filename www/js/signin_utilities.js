/*
SIGNIN REQUEST
*/

function makeSigninRequest(callback) {

    var user_email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
     function alertDismissed() { }                

    if(user_email.length ===0 || password.length ===0){
        navigator.notification.alert(
            'Please provide a valid input before continuing',  // message
            alertDismissed,         // callback
            'Error!!',              // title
            'Ok'                   // buttonName
        )
        callback(false);
    }
    ActivityIndicator.show("Signing in. Please Wait...");
                              
    var url = "http://nxtnifty.kalaiworld.com/login?email_id="+user_email+"&password="+password+"";
    httpRequestSignin = new XMLHttpRequest();
    console.log('REG URL ' + url);
    if (!httpRequestSignin) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        callback(false);
    }
    httpRequestSignin.onreadystatechange = alertContents;
    httpRequestSignin.open('POST', url);
    httpRequestSignin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequestSignin.send();
 callback(true);

}
                                
function alertContents() {
    if (httpRequestSignin.readyState === XMLHttpRequest.DONE) {
        if (httpRequestSignin.status === 200) {
            var response = JSON.parse(httpRequestSignin.responseText);
                                            
            console.log('SIGNIN ' + response.auth);
            if(response.auth=="success"){
                window.location.href="home.html";
            }else{
                alert("Sign in failed");
            }
                                            
                                            
        } else {
            console.log('There was a problem with the request.' + httpRequestSignin.status);
        }
    }
    ActivityIndicator.hide();

}

/*
FACEBOOK LOGIN
*/
function facebookLogin() {
    facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
      function loginError (error) {
        alert("Failed to Login");
      }
    );
}


var fbLoginSuccess = function (userData) {
    console.log("UserInfo: " + JSON.stringify(userData));
    var obj = JSON.parse(JSON.stringify(userData));
    console.log("User ID :" + obj.authResponse.userID);

    window.localStorage.setItem("user_id", obj.authResponse.userID);
    window.localStorage.setItem("login_type", "facebook");

    // alert("Login Successfull");
    window.location.href="home.html";

};

/*
GOOGLE + LOGIN
*/
function googlePlusLogin() {
    window.plugins.googleplus.login(
      {'offline': true},
      function (obj) {
        var user_data = JSON.stringify(obj);
        console.log("User ID :" + user_data.userId);
        window.localStorage.setItem("user_id", user_data.userId);
        window.localStorage.setItem("login_type", "google_plus");
        window.location.href="home.html";
      },
      function (msg) {
        alert('error: ' + msg);
      }
    );
}