const cloudflareBypass = require('./solver');
const axios = require('axios');
const { exit } = require('process');
(async function(){
    const cookie = await cloudflareBypass({
        url: 'https://exitus.me',
    });

    if(cookie){
        // Parse cookie array into correct header format
        const cookies = cookie.map(item => `${item.name}=${item.value};`);
        const options = {
            headers: {
                'User-Agent': cookie.useragent,
                'Cookie': cookies
            }
        }
        //const result = await axios.get('https://exitus.me', options);
        //console.log(`Cloudflare bypass cookie + result`, cookies, result.data);
        console.log(cookies);
        console.log(cookie.useragent)
        exit(0)
    }else{
        console.log("Failed to get cf_clearance cookie");
        exit(0)
    }
})
();