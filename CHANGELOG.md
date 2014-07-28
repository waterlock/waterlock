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
