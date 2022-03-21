const cloudflareBypass = require('./solver');
const { exit } = require('process');
(async function(){
    const cookie = await cloudflareBypass({
        url: 'https://exitus.me',
    });

    if(cookie){
        const cookies = cookie.map(item => `${item.name}=${item.value};`);
        console.log(cookies);
        console.log(cookie.useragent)
        exit(0)
    }else{
        console.log("Failed to get cf_clearance cookie");
        exit(0)
    }
})
();