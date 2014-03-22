/**
 * Location
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'locations',
    adapter: 'mysql',
    migrate: 'safe',
		
  attributes: {
		name: 'STRING'
		
    
  }

};
