importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js");

var config = {
	apiKey: "AIzaSyB0yvWKWCvrPOB6FmyKRAoaQgzNsecDe40",
	authDomain: "fcm-test-99acf.firebaseapp.com",
	databaseURL: "https://fcm-test-99acf.firebaseio.com",
	projectId: "fcm-test-99acf",
	storageBucket: "fcm-test-99acf.appspot.com",
	messagingSenderId: "836422917041"
};

firebase.initializeApp(config);
notification = [];
icon = '';
base_url = '';
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  
    notification = JSON.parse(payload['data']['data']);
    icon = notification['icon'];
    base_url = notification['base_url'];
	
  if(notification['type'] == 'message'){

    var picture = notification['title'];
    var message = notification['body'];
	var from_id_fmc = notification['from_id'];
	
	
    // single user msg
    if(notification['message_type'] == 'person'){
		
      const notificationTitle = picture;
      const notificationOptions = {
        body: message,
        icon: icon
      };
	  return self.registration.showNotification(notificationTitle, notificationOptions);

    }else{

      // group user msg
      const notificationTitle = picture;
      const notificationOptions = {
        body: message,
        icon: icon
      };
	  return self.registration.showNotification(notificationTitle, notificationOptions);
    }
    
  }

   
});

self.addEventListener('notificationclick', function(event) {
    
  event.waitUntil(self.clients.matchAll({
        includeUncontrolled: true, 
		type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; ++i) {
            var client = clientList[i];
			
            if ((client.url === base_url && 'focus' in client) 
			|| (client.url === base_url+'#' && 'focus' in client)
			|| (client.url === base_url+'/' && 'focus' in client)
			) {
				
				return client.focus();
            }
        }

        if (clients.openWindow) {
            return clients.openWindow(base_url);
        }
    }));
});
 