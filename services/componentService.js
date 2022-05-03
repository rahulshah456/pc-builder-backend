const https = require('follow-redirects').https;

const rigComponentIds = ['cpu', 'motherboard', 'gpu', 'monitor', 'storage'];

const getComponentsById = (componentId) => {
    return new Promise((resolve, reject) => {

        const options = {
            hostname: 'versus.com',
            path: `/api/top/en/${componentId}`,
            method: 'GET',
            rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Connection': 'keep-alive',
                'Vary': 'Accept-Encoding',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
                'Accept': 'application/json',
                'Cookie': 'prefered_currency=INR;'
            }
        };

        const request = https.request(options, response => {
            //reject on bad status
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error('statusCode=' + response.statusCode));
            }

            //capture data packets
            var body = [];
            response.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body));
                } catch (error) {
                    reject(error);
                }
                resolve(body);
            });
        });

        // reject on request error
        request.on('error', error => reject(error));

        //close the request
        request.end();
    });
}

module.exports = { rigComponentIds, getComponentsById };