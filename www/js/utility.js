
function logout(){
        var value_login_type = window.localStorage.getItem("login_type");
        console.log("Logout value type: " + value_login_type);
        if(value_login_type=="facebook"){
            facebookLogout();
        }else if(value_login_type=="google_plus"){ 
            googlePlusLogout();

        }else{
            window.location.href="index.html";
            clearStorage();
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