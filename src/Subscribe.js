import React, { useState } from "react";

const publicKey =
  "BLAwMC3fJ0a1EpGPXDaF6b0UiCqWbg87ZT8V5Qt8dnh32_hmND15uAWaLb1DL5tAgLNAEMMEopfE_xL5-Js3h4s";

const SubscribeButton = () => {
  const [subscription, setSubscription] = useState(null);

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/worker.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      setSubscription(subscription);
      console.log(subscription, "subscription");
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe to Push Notifications</button>
      {subscription && <p>Subscription successful!</p>}
    </div>
  );
};

export default SubscribeButton;
