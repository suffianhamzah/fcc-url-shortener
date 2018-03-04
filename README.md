Freecodecamp: URL Shortener Microservice
=========================

This is a microservice that provides two HTTP requests:
- GET /new/valid_url:
Pass a URL as a parameter and you will receive a shortened URL in the JSON response.
If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- GET /shortened_url_id:
When you visit that shortened URL, it will redirect you to my original link.


You can find the demo [here](https://suf-url-shortener.glitch.me). Website is powered by [Glitch](https://glitch.com/about).


Your Project
------------

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Powered by: Glitch (Made by [Fog Creek](https://fogcreek.com/))
-------------------

\ ゜o゜)ノ
