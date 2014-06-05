# Waterlock
[![Build Status](https://travis-ci.org/davidrivera/waterlock.svg?branch=master)](https://travis-ci.org/davidrivera/waterlock) [![NPM version](https://badge.fury.io/js/waterlock.svg)](http://badge.fury.io/js/waterlock) [![Dependency Status](https://gemnasium.com/davidrivera/waterlock.svg)](https://gemnasium.com/davidrivera/waterlock) [![Coverage Status](https://coveralls.io/repos/davidrivera/waterlock/badge.png?branch=master)](https://coveralls.io/r/davidrivera/waterlock?branch=master)


Waterlock is an all encompassing user authentication/api key management tool for [Sailsjs](http://sailsjs.com) `version 0.10`

# What does it provide
Waterlock provides predefined routes and models for user authentication and api key management/tracking on a per user bases. Password resets are also handeled but we'll cover that below.
Authentication is handeled via methods. The current supported methods are:

| Method | Libaray |
| ------------- | ------------- |
| Local Auth | [waterlock-local-auth](https://github.com/davidrivera/waterlock-local-auth) |

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
./node_modules/bin/waterlock install all
```
this will install all the necessary components, however you do not have strict access yet! The custom policies are installed via the command above but not yet applied. To apply policies crack open your `config/policies.js` file and add someting like the following:

```js
MyController:{
	'*': true,
	'myApiAction': ['hasApiKey'],
	'mySessionAction': ['sessionAuth']
}
```

now with your policies applied to your custom controller you're good to go! (given you've actually implemented some login in them e.g. `res.view()`)

# How can I customize it?
Waterlock wraps around models and controllers so you can override any of the actions and definition that are predefined. After running `waterlock install all` open up the `User.js` file you'll see this:
```js
  attributes: require('waterlock').models.basicUser.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),
```
you can add any custom attributes you wish to your user model by just dropping them in like normal.

## What if I want to control my own User model
Good question! If for whatever reason be it we haven't implemented a certain authentication method or your case it exceptionally complex. You can still take advantage of Waterlocks api key management, so long as your user model has the following:

```js
apiKeys: {
	collection: 'apikey',
    via: 'owner'
},
```

this will keep the user association to the ApiKey model and still allow for management of the keys, which is what Waterlock tries to accomplish first and foremost.

# Config
Waterlock install a config located at `config/waterlock.json` this file is used to set various options

* `baseUrl` - this is the URL your app resides at, used in password reset urls
* `autheMethod` - the npm package name for the chosen authentication method
* `passwordReset` - object containing information regarding password resets
	* `tokens` - boolean if set to false password resets will be disabled
	*`mail` - object containing information about your smtp server, see nodemailer
		*`protocol` - the transport protocol
		* `options` - how it is use te transport method, see nodemailer
		* `from` - the from address 
		* `subject` - the email subject for password reset emails
		* `forwardUrl` - the url to send the user to after they have clicked the password reset link in their inbox (e.g. a form on your site which POST to `/user/reset`)
	* `template` - object containing template information for the reset emails
		* `file` - the relative path to the `jade` template for the reset emails
		* `vars` - object containing any vars you want passed to the template for rendering

## Password reset
Waterlock uses `nodemailer` to send password reset emails. The options in the config file are applied to nodemailer as such
```js
var mail = config.passwordReset.mail;
nodemailer.createTransport(mail.protocol, mail.options);
```

if you choose to go with this option then a user upon visiting the url `/user/reset` with a post param of `email` will receieve an email at that address with the reset url. This url upon clicked with be validated against the server to ensure it's still within the time window allotted for a password reset. If so will set the `resetToken` session variable. After this if you have set a `forwardUrl` in your `waterlock.json` config file the user will be forwarded to this page.

If you want to take advantage of the built in reset itself have the page you sent your user to above `POST` to `/user/reset` with the post param of `password` If all is well a password reset will be issued.

## Template
You can customize the email template used in the password reset via the template file defined in `config/waterlock.json` this template file is rendered with the fun and dynamic `jade` markup, the view var `url` is generated and passed to it when a user requests and password reset. You can customize this template to your liking and pass any other view vars you wish to it via the `vars` options in the json file.

# The Future
We would hope to turn this project into a well oiled api key management tool for users.

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
