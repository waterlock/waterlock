#v0.1.2-rc1
* [REFACTORING][#95](https://github.com/waterlock/waterlock/pull/95) Replace all 'for(..in..)' on lodash alternative
* Adds support for Node 4.0 to travis.yml

# v0.1.1
* [FEATURE] Added Bearer Token Authentication
[#81](https://github.com/waterlock/waterlock/pull/81)

# v0.1.0
* [FEATURE] Added a jwt flag for loginsuccess to return the token. [#41](https://github.com/waterlock/waterlock/pull/41)
* [FEATURE] updated dependencies

# v0.0.14
* [BUG] Fix in `findOrCreateAuth`. [#52](https://github.com/davidrivera/waterlock/pull/52)
* [BUG] fixed jwt model - data too long for column token in mysql. [#48](https://github.com/davidrivera/waterlock/pull/48)
* [BUG] Check if token exists. [#49](https://github.com/davidrivera/waterlock/pull/49)

# v0.0.13
* [BUG] fixed depreciated moment variable positions and readme, [#19](https://github.com/davidrivera/waterlock/pull/19)
* [BUG] fixed users not being created after initial, [#24](https://github.com/davidrivera/waterlock/pull/24)
* [BUG] hasJsonWebToken crashes on socket [#35](https://github.com/davidrivera/waterlock/issues/35)
* [BUG] hasJsonWebToken not logging use [#34](https://github.com/davidrivera/waterlock/issues/34)
* [FEATURE] users can now choose a stateless mode for jwt's [#23](https://github.com/davidrivera/waterlock/issues/23)
* [BUG] implemented fix for allParams merging with req.query [#25](https://github.com/davidrivera/waterlock/issues/25) [#40](https://github.com/davidrivera/waterlock/issues/40)
* [BUG] implemented fix for #findOrCreate calling itself [#37](https://github.com/davidrivera/waterlock/issues/37)

# v0.0.12
* [BUG] should be referencing the global waterlock.config within the jwt action, addresses issue [#11](https://github.com/davidrivera/waterlock/issues/11)

# v0.0.11
* [BUG] only update the attributes which have changed in engine#attachAuthToUser

# v0.0.10
* [BUG] [#6](https://github.com/davidrivera/waterlock/issues/6) fixed remote address on socket
* [REFACTORING] added in a debug logger
* [FEATURE] now tracking port on attempt
* [FEATURE] added in postActions addresses issue [#7](https://github.com/davidrivera/waterlock/issues/7)
* [REFACTORING] major overhaul of waterlock core
* [REFACTORING] removed email.jade

# v0.0.9
* [FEATURE] now supports multiple auth methods at once
* [REFACTORING] removed reset tokens and put it in the local-auth module
* [REFACTORING] removed reset route and put it in the local-auth module
* [REFACTORING] made binary script more dynamic
* [REFACTORING] removed krypt, instead using bcrypt, jwt, and crypto
* [BUG] #2 `.done` is now deprecated using `.exec`

# v0.0.8
* [FEATURE] dropped ApiKey support in favor of Json Web Tokens
* [BUG] fixed waterlock policy generator

# v0.0.7
* [BUG] user might not always have password

# v0.0.6
* [FEATURE] authMethod can now accept an object or string for different methods
* [FEATURE] user model now defined more dynamically by authMethod

# v0.0.5
* [FEATURE] refactored reset action
* [FEATURE] refactored cli script
* [FEATURE] now using lodash

# v0.0.4
* [FEATURE] moved auth functions to different package
* [FEATURE] added Use model to better track api key usage
* [FEATURE] added Attempt model to better track user login attempts
* [FEATURE] switch to bcrypt for password security

# v0.0.3
* [FEATURE] added keystats model to track ip usage
