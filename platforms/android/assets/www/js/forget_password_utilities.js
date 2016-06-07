/*
Forgot password REQUEST
*/

function makeForgotPasswordRequest() {

    var user_email = document.getElementById('email').value;

    if(user_email.length ==0){
        navigator.notification.alert(
            'Please enter valid details',  // message
            function alertDismissed() {
                
            },                      // callback
            'Error!!',              // title
            'Ok'                  // buttonName
        );
        return;
    }
    ActivityIndicator.show("Plese Wait...");
                              
    var url = "http://nxtnifty.kalaiworld.com/resetPassword/"+user_email;
    httpRequestForgotPassword = new XMLHttpRequest();
    console.log('REG URL ' + url);
    if (!httpRequestForgotPassword) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequestForgotPassword.onreadystatechange = forgotPasswordResponseReceived;
    httpRequestForgotPassword.open('GET', url);
    httpRequestForgotPassword.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequestForgotPassword.send();
}
                                
function forgotPasswordResponseReceived() {
    if (httpRequestForgotPassword.readyState === XMLHttpRequest.DONE) {
        if (httpRequestForgotPassword.status === 200) {
            var response = JSON.parse(httpRequestForgotPassword.responseText);
                                            
            console.log('RESET PASSWORD ' + response.passwordReset);
            navigator.notification.alert(
                response.passwordReset,  // message
                function alertDismissed() {
                    window.location.href="index.html";
                },                      // callback
                'NXTNifty',              // title
                'Ok'                  // buttonName
            );
                                            
                                            
        } else {
            console.log('There was a problem with the request.' + httpRequestForgotPassword.status);
        }
    }
    ActivityIndicator.hide();

}
