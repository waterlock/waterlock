var crypto = require('crypto'); 

exports = module.exports = Krypt;

/**
 * Used to encrypt/validate/generate may strings 
 * @param {int} saltLength the length of the salt to be used
 */
 function Krypt(saltLength){
    if(typeof saltLength == 'undefined'){
        saltLength = 12;
    }

    this.saltLength = saltLength;
 }

/**
 * Hashes a password using sha256 and owasp spec 
 * @param  {string} password The password to hash
 * @return {string}          The hashed password concat with the salt
 */
 Krypt.prototype.hash = function(password){
    var salt = this.generateSalt(this.saltLength); 
    var hash = this.sha256(password + salt); 
    return salt + hash;     
 }

/**
 * Validates a give hash with a raw password
 * @param  {string} hash     Hash to validate against
 * @param  {string} password The password to validate
 * @return {boolean}         True is the hashed password matches the hash, otherwise false
 */
 Krypt.prototype.validate = function(hash, password){
    var salt = hash.substr(0,  this.saltLength*2); 
    var validHash = salt + this.sha256(password + salt); 
    return hash === validHash;     
 }

/**
 * Generates a salt of given length len
 * @param  {int} len Length of the salt to generate
 * @return {string}     The generated salt
 */
 Krypt.prototype.generateSalt = function(len) {
    return crypto.randomBytes(len).toString('hex'); 
}

/**
 * Creates a sha256 digest of a given string
 * @param  {string} string the string to hash
 * @return {string}        the hashed string
 */
Krypt.prototype.sha256 = function(string){
    return crypto.createHash('sha256').update(string).digest('hex'); 
}

/**
 * Used to generate a pseudo random string
 * @param  {int} len length of the string to generate
 * @return {string} the generated random string
 */
Krypt.prototype.random = function(len){
    var text = "";
    var possible = "!@#$%^&*()_+=-[]\\;',./{}|:\"<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
