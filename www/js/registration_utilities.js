/*
REGISTRATION PROCESS
*/
function makeRequest(callback) {

    var user_email       = document.getElementById('email').value;
    var password         = document.getElementById('password').value;
    var confirm_password = document.getElementById('password_confirm').value;
    var first_name       = document.getElementById('first_name').value;
    var last_name        = document.getElementById('first_name').value;
  function alertDismissed() {}
    if(user_email.length ===0 || password.length ===0 || first_name.length === 0 ||last_name.length===0){
        navigator.notification.alert(
            'Please provide a valid input to proceed',  // message
             alertDismissed(),                      // callback
            'Error!!',              // title
            'Ok' );                 // buttonName
        callback(false);
    }

    if(password !== confirm_password){
        alert("Passwords does not match");
        callback(false);
    }
    ActivityIndicator.show("Signing up. Please Wait...");

    var url = "http://nxtnifty.kalaiworld.com/signup?email_id="+user_email+"&password="+password+"&first_name="+first_name+"&last_name="+last_name+"";
    httpRequestRegistration = new XMLHttpRequest();
    console.log('REG URL ' + url);
    if (!httpRequestRegistration) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      callback(false);
    }
    httpRequestRegistration.onreadystatechange = alertContents;
    httpRequestRegistration.open('POST', url);
    httpRequestRegistration.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequestRegistration.send();
}
            
function alertContents() {
    if (httpRequestRegistration.readyState === XMLHttpRequest.DONE) {
      if (httpRequestRegistration.status === 200) {
        var response = JSON.parse(httpRequestRegistration.responseText);
                    
        console.log('SIGNUP ' + response.status);
        if(response.status=="OK"){
          window.localStorage.removeItem("login_type");
          window.localStorage.removeItem("user_id");
          window.location.href="home.html";
        }else{
          alert("Sign up failed : " + response.responseMessage);
        }
      } else {
          console.log('There was a problem with the request.' + httpRequestRegistration.status);
      }
    }
    ActivityIndicator.hide();
}

/*
IMAGE CAPTURE
*/
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
      
// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);
      
// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}
      
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
          
    // Get image handle
    var smallImage = document.getElementById('profile_image');
          
    // Unhide image elements
    smallImage.style.display = 'block';
          
    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
      
// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
          
    // Get image handle
    var largeImage = document.getElementById('profile_image');
          
    // Unhide image elements
    largeImage.style.display = 'block';
          
    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
      
// A button will call this function
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}
      
// A button will call this function
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}
      
// A button will call this function
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
      destinationType: destinationType.FILE_URI,
    sourceType: source });
}
      
// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}