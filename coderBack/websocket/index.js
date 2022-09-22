


const POLL_RATE = 500

setInterval(async () => {
    const messages = await fetch('https://api.chat-app.com/messages')
}, POLL_RATE) 