/**
 * Readings
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'readings',
    adapter: 'mysql',
    migrate: 'safe',

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/

  	id:'int',
  	datetime:'timestamp',
  	location_id:'int',
  	reading:'float'
    
  }

};
