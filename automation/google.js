const {Chromeless} = require('chromeless');

module.exports = async function (query) {
    const chromeless = new Chromeless({
        remote: {
            endpointUrl: 'https://a22v94yomc.execute-api.eu-central-1.amazonaws.com/dev/',
            apiKey: process.env.DEV_CHROMELESS_SESSION_KEY,
        },
    });


    const links = await chromeless
        .goto('https://www.google.com')
        .type(query, 'input[name="q"]')
        .press(13)
        .wait('#resultStats')
        .evaluate(() => {
            // this will be executed in headless chrome
            const links = [].map.call(
                document.querySelectorAll('.g h3 a'),
                a => ({title: a.innerText, href: a.href})
            )
            return JSON.stringify(links)
        })
        // you can still use the method chaining API after evaluating
        // when you're done, at any time you can call `.then` (in our case `await`)
        .scrollTo(0, 1000)

    await chromeless.end();

    return links;
};

