# Waterlock
[![Build Status](https://travis-ci.org/davidrivera/waterlock.svg?branch=master)](https://travis-ci.org/davidrivera/waterlock) [![NPM version](https://badge.fury.io/js/waterlock.svg)](http://badge.fury.io/js/waterlock) [![Dependency Status](https://gemnasium.com/davidrivera/waterlock.svg)](https://gemnasium.com/davidrivera/waterlock) [![Coverage Status](https://coveralls.io/repos/davidrivera/waterlock/badge.png?branch=master)](https://coveralls.io/r/davidrivera/waterlock?branch=master)


Waterlock is an all encompassing user authentication/api key management tool for [Sailsjs](http://sailsjs.com)

# What does it provide
Out of the box waterlock give you the following

* user authentication via email/password
* api key management on a per user bases
* password reset

it is a great tool if you're looking to grant user access to your api.

# How does it work
Since sails currently has no official support for 3rd party libraries like Rails gems; Waterlock works by hooking into your model and controller files adding the functionality needed. When Sails starts officially supporting 3rd party libraries this might change.

# How do I use it
Glad you asked! If you're on a fresh install of a Sails app first run
```bash
npm install Waterlock
```

then run
```bash
./node_modules/bin/waterlock install all
```
this will install all the necessary components, however you do not have strict access yet! The custom policies are installed via the command above but not yet applied. To apply policies 

# How can I customize it?
Waterlock by default installs with a default user schema i.e. user authentication with email and password. So you can get up and running fast. We realize this doesn't suite everyones needs so you can change the default installed model or just create your own. If you choose the latter you can remove the `AuthController` since it probably wont apply. You should also disable password resets if you go this route.

## What does it provide if i disable all of this
Good question! Api key management, so long as your user model has the following:

```js
apiKeys: {
	collection: 'apikey',
    via: 'owner'
},
```

this will keep the user association to the ApiKey model and still allow for management of the keys, which is what Waterlock tries to accomplish first and foremost.

# Config
Waterlock install a config located at `config/waterlock.json` this file is currently for user email password resets. 

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

# Legal Stuff
MIT (see License)
