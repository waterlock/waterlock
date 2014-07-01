[![Waterlock](https://lh3.googleusercontent.com/-aThk1tYLSh0/U5fAM6NyB5I/AAAAAAAAH84/FKmmmQ80XWY/w611-h144-no/waterlock-header.png)](http://davidrivera.github.io/waterlock/)
-----------------------------------------------
[![Build Status](http://img.shields.io/travis/davidrivera/waterlock.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock) [![NPM version](http://img.shields.io/npm/v/waterlock.svg?style=flat)](http://badge.fury.io/js/waterlock) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock) [![Coverage Status](http://img.shields.io/coveralls/davidrivera/waterlock/master.svg?style=flat)](https://coveralls.io/r/davidrivera/waterlock?branch=master) [![Gittip](http://img.shields.io/gittip/davidrivera.svg?style=flat)](https://www.gittip.com/davidrivera/)


Waterlock is an all encompassing user authentication/json web token management tool for [Sailsjs](http://sailsjs.com) `version 0.10`

# What does it provide
Waterlock provides predefined routes and models for user authentication and json web token management. Password resets are also handeled but we'll cover that below.
Authentication is handeled via methods. The current supported methods are:

| Method | Library |
| ------------- | ------------- |
| Local Auth | [waterlock-local-auth](https://github.com/davidrivera/waterlock-local-auth) |
| Twitter Auth | [waterlock-twitter-auth](https://github.com/davidrivera/waterlock-twitter-auth) |
| Facebook Auth | [waterlock-facebook-auth](https://github.com/davidrivera/waterlock-facebook-auth) |

it is a great tool if you're looking to grant user access to your api.

# How does it work
Since sails currently has no official support for 3rd party libraries like Rails gems; Waterlock works by hooking into your model and controller files adding the functionality needed. When Sails starts officially supporting 3rd party libraries this might change.

# How do I use it
Glad you asked! If you're on a fresh install of a Sails app first run
```bash
npm install waterlock
npm install waterlock-local-auth
```

then run
```bash
./node_modules/bin/waterlock generate all
```
this will generate all the necessary components, however you do not have strict access yet! The custom policies are generated via the command above but not yet applied. To apply policies crack open your `config/policies.js` file and add someting like the following:

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
	* `subject` - the jwt [sub claim](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-23#section-4.1.2)

# The Future
We would hope to turn this project into a well oiled jwt management tool for users.

## Tests

Tests are run through the wonderful mocha so just clone the library run `npm install` then `npm test`

## Contributing

1. Fork it ( http://github.com/davidrivera/waterlock/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

# Legal Stuff
MIT (see License)
