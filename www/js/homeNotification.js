     // device APIs are available
        //
        function onDeviceReady() {

            console.log('Even handler started at ondevice ready');
            var pushNotification = window.plugins.pushNotification;

            pushNotification.register(
                successHandler,
                errorHandler, {
                    'senderID': '928775271003',
                    'ecb': 'onNotificationGCM' // callback function
                }
            );
        }

        function successHandler(result) {
            console.log('Success: ' + result);
        }

        function errorHandler(error) {
            alert('Error :' + error);
        }

        function onNotificationGCM(e) {
            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        console.log('Registered id : ' + e.regid);
                        var element = document.getElementById('deviceProperties');

                        element.innerHTML = 'Registered id : ' + e.regid ;

                    }
                    break;

                case 'message':
                    console.log('Message : ' + e.msg);

                    alert('Received updated value');

                    break;

                case 'error':
                    console.log('Error: ' + e.msg);
                    break;

                default:
                    console.log('An unknown event was received');
                    break;
            }
        }