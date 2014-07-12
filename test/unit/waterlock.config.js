
/**
 * waterlock
 *
 * defines various options used by waterlock
 * for more informaiton checkout
 * 
 * http://waterlock.ninja/documentation
 */
module.exports.waterlock = {
  
  // Base URL
  // 
  // used by auth methods for callback URI's using oauth and for password
  // reset links.
  baseUrl: 'http://localhost:1337',
  
  // Auth Method(s) 
  // 
  // this can be a single string, an object, or an array of objects for your 
  // chosen auth method(s) you will need to see the individual module's README
  // file for more information on the attributes necessary. This is an example
  // of the local authentication method with password reset tokens disabled.
  authMethod: [
    {
      name:'waterlock-local-auth',
      passwordReset:{
        tokens: false,
        mail: {
          protocol: 'SMTP',
          options:{
            service: 'Gmail',
            auth: {
              user: 'gmail.user@gmail.com',
              pass: 'userpass'
            }
          },
          from: 'no-reply@domain.com',
          subject: 'Your password reset!',
          forwardUrl: 'http://localhost:1337'
        },  
        template:{
          file: '../views/email.jade',
          vars:{}
        }
      }
    }
  ],

  // JSON Web Tokens
  //
  // this provides waterlock with basic information to build your tokens, 
  // these tokens are used for authentication, password reset, 
  // and anything else you can imagine
  jsonWebTokens:{

    // CHANGE THIS SECRET
    secret: 'this is my secret',
    expiry:{
      unit: 'days',
      length: '7'
    },
    audience: 'app name',
    subject: 'subject'
  },

  // Lets waterlock know how to handle different login/logout
  // attempt outcomes.
  postActions:{

    // post login event
    login: {

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: 'default',

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    },

    //post logout event
    logout: {

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      success: 'default',

      // This can be any one of the following
      // 
      // url - 'http://example.com'
      // relativePath - '/blog/post'
      // obj - {controller: 'blog', action: 'post'}
      // string - 'custom json response string'
      // default - 'default'
      failure: 'default'
    }
  }
};