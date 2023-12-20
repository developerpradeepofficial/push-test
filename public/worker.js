console.log("Service Worker Loaded...");

window.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received...");

  const options = {
    body: "Body of the Notification",
    icon: "account.png",
  };

  // Extend options with data from the push notification
  Object.assign(options, data);

  e.waitUntil(window.registration.showNotification(data.title, options));
});

window.addEventListener("notificationclick", function (event) {
  // Get the URL to open when the notification is clicked
  const openUrl = "www.google.com";

  // Check if a notification action button was clicked
  if (event.action) {
    // Handle specific action button click
    console.log("Notification action clicked:", event.action);
  } else {
    // Open the app when the notification is clicked
    event.waitUntil(console.log("Cicked U"));
  }

  event.notification.close();
});
