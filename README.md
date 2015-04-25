[![Waterlock][waterlock-image]][waterlock-url]
-----------------------------------------------

[![Gitter][gitter-image]][gitter-url]

[![Inline docs][inch-image]][inch-url]

| [![Build Status][travis-image]][travis-url] | [![NPM version][npm-version-image]][npm-url] | [![NPM downloads][npm-downloads-image]][npm-url] | [![Dependency Status][dependency-image]][dependency-url] |
| ------- | ------- | ------- | ------- |
| [![Coverage Status][coverage-image]][coverage-url] | [![Code Climate][climate-image]][climate-url] | [![Gittip][gittip-image]][gittip-url] | [![MIT License][license-image]][license-url]


Waterlock is an all encompassing user authentication/json web token management tool for [Sails](http://sailsjs.com) `>= 0.10`

# What does it provide
Waterlock provides predefined routes and models for user authentication and json web token management. Password resets are also handled but we'll cover that below.
Authentication is handled via methods. The current supported methods are:

| Method | Library |
| ------------- | ------------- |
| Local Auth | [waterlock-local-auth](https://github.com/waterlock/waterlock-local-auth) |
| Twitter Auth | [waterlock-twitter-auth](https://github.com/waterlock/waterlock-twitter-auth) |
| Facebook Auth | [waterlock-facebook-auth](https://github.com/waterlock/waterlock-facebook-auth) |
| Google Auth | [waterlock-google-auth](https://github.com/waterlock/waterlock-google-auth) |

it is a great tool if you're looking to grant user access to your api.

# How does it work
Since sails currently has no official support for 3rd party libraries like Rails gems; Waterlock works by hooking into your model and controller files adding the functionality needed. When Sails starts officially supporting 3rd party libraries this might change.

# How do I use it
Glad you asked! If you're on a fresh install of a Sails app first run
```bash
npm install waterlock
npm install waterlock-local-auth
```

then run on mac/linux
```bash
./node_modules/.bin/waterlock generate all
```
or for windows
```bash
node_modules\.bin\waterlock generate all
```

this will generate all the necessary components, however you do not have strict access yet! The custom policies are generated via the command above but not yet applied. To apply policies crack open your `config/policies.js` file and add something like the following:

```js
MyController:{
	'*': true,
	'myApiAction': ['hasJsonWebToken'],
	'mySessionAction': ['sessionAuth']
}
```

now with your policies applied to your custom controller you're good to go! (given you've actually implemented some login in them e.g. `res.view()`)

# How can I customize it?
Waterlock wraps around models and controllers so you can override any of the actions and definition that are predefined. After running `waterlock generate all` open up the `User.js` file you'll see this:
```js
  attributes: require('waterlock').models.user.attributes({

    /* e.g.
    nickname: 'string'
    */

  }),
```
you can add any custom attributes you wish to your user model by just dropping them in like normal.

## What if I want to control my own User model
Good question! If for whatever reason be it we haven't implemented a certain authentication method or your case it exceptionally complex. You can still take advantage of Waterlocks json web token management, so long as your user model has the following:

```js
    jsonWebTokens: {
      collection: 'jwt',
      via: 'owner'
    },
```

this will keep the user association to the Jwt model and still allow for management of the tokens, which is what Waterlock tries to accomplish first and foremost.

# Config
Waterlock generates a config located at `config/waterlock.json` this file is used to set various options

* `baseUrl` - this is the URL your app resides at, used in password reset urls
* `autheMethod` - the npm package name for the chosen authentication method or array of methods
* `jsonWebTokens` - object containing information on how the jwt's should be constructed
	* `secret` - the secret used to encrypt the token, CHANGE THIS VALUE!
	* `expiry` - object containing information on expiry these are passed to moment.js [add](http://momentjs.com/docs/#/manipulating/add/) function
		* `unit` - [y,M,w,d,h,m,s,ms](http://momentjs.com/docs/#/manipulating/add/)
		* `length` - length of time
	* `audience` - the jwt [aud claim](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-23#section-4.1.3) a good choice is the name of your app
	* `tokenProperty` - customize the name of the property returning the token value
	* `expiresProperty` - customize the name of the property returning the expires value
	* `includeUserInJwtResponse` - when JWT is the default response for succesfull log-in you can return the user along with the token by setting this to true - cuts down round tripsg
	* `subject` - the jwt [sub claim](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-23#section-4.1.2)
* `postActions` - lets waterlock know how to handle various login/logout events, you can read more about this in the [docs](http://waterlock.ninja/documentation/)

# The Future

We would hope to turn this project into a well oiled jwt management tool for users.

## Tests

Tests are run through the wonderful mocha so just clone the library run `npm install` then `npm test`

## Feature Requests
I love to hear all of your feature requests, so if you have any please open an [issue here](https://github.com/waterlock/waterlock/issues)! I'll be more than happy to work it into the roadmap if feasible.

## Contributing
Feel free to contribute as you please, the more the merrier. Just please write test cases for everything you submit, in short you can follow the steps below. Happy coding! :smile:

1. Fork it ( http://github.com/waterlock/waterlock/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Write test cases!
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

# Legal Stuff
MIT (see License)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/waterlock
[npm-version-image]: http://img.shields.io/npm/v/waterlock.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/waterlock.svg?style=flat

[travis-url]: https://travis-ci.org/waterlock/waterlock
[travis-image]: http://img.shields.io/travis/waterlock/waterlock.svg?style=flat

[dependency-image]: http://img.shields.io/gemnasium/waterlock/waterlock.svg?style=flat
[dependency-url]: https://gemnasium.com/waterlock/waterlock

[coverage-image]: http://img.shields.io/coveralls/waterlock/waterlock/master.svg?style=flat
[coverage-url]: https://coveralls.io/r/waterlock/waterlock?branch=master

[gittip-image]: http://img.shields.io/gittip/davidrivera.svg?style=flat
[gittip-url]: https://www.gittip.com/davidrivera/

[waterlock-image]: https://lh3.googleusercontent.com/-aThk1tYLSh0/U5fAM6NyB5I/AAAAAAAAH84/FKmmmQ80XWY/w611-h144-no/waterlock-header.png
[waterlock-url]: http://waterlock.ninja/

[climate-image]: http://img.shields.io/codeclimate/github/waterlock/waterlock.svg?style=flat
[climate-url]: https://codeclimate.com/github/waterlock/waterlock

[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/waterlock/waterlock?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[inch-image]: http://inch-ci.org/github/waterlock/waterlock.svg?branch=master
[inch-url]: http://inch-ci.org/github/waterlock/waterlock
