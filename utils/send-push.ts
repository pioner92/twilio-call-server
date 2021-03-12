import fetch from "node-fetch";

export const sendPush = () => {
    setInterval(() => {
        makeRequest()
    }, 60000 * 5)
}

const body = {
    to: "/topics/all",
    notification: {
        body: "Location updated",
        title: "Location service",
        content_available: true,
        priority: "high"
    },
    priority: "high",
    data: {
        action: "update_location",
        content_available: true,
        priority: "high"
    },
    apns: {
        headers: {
            "apns-push-type": "background",
            "apns-priority": "10"
        },
        payload: {
            aps: {
                contentAvailable: true
            }
        }
    }
}

const makeRequest = async () => {
    try {
        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "key=AAAAFeVVz7Q:APA91bG6pwbeqc9Q0dSq3vwCrLKvZ7pM8_M52Xofb9luz-4qNsg0bUjpvWTXkN54rSYFkdEgC8tWXJAQkIqWKG_KAKcII68rvzpRwRMX2ow-ofwnsLnadh8tsEvvwGAUJ_ud_rvfkZJy"
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(data)
    } catch (e) {
        console.log("Make Request Error:")
        console.log(e)
    }
}

