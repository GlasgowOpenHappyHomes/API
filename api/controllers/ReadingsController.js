/**
 * ReadingsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ReadingsController)
   */
  _config: {},

  find: function(req, res, next) {
    if(req.query.location_id === undefined) {
    	if(req.query.limit === undefined) {
	    	req.query.limit = 20;
	    }

	    if(req.query.limit > 100) {
	    	req.query.limit = 100;	
	    }
    }

    if(req.query.datetime !== undefined) {
      if(req.query.datetime.indexOf('>=') > -1) {
        req.query.datetime = req.query.datetime.replace('>=', '');
        req.query.datetime = {'>=': req.query.datetime}
      } else if (req.query.datetime.indexOf('>') > -1) {
        req.query.datetime = req.query.datetime.replace('>', '');
        req.query.datetime = {'>': req.query.datetime}
      } else if (req.query.datetime.indexOf('<=') > -1) {
        req.query.datetime = req.query.datetime.replace('<=', '');
        req.query.datetime = {'<=': req.query.datetime}
      } else if (req.query.datetime.indexOf('<') > -1) {
        req.query.datetime = req.query.datetime.replace('<', '');
        req.query.datetime = {'<': req.query.datetime}
      }
    }

    var limit = req.query.limit;

    var find_params = req.query;
    delete find_params.limit;

    Readings.find(req.query).where(find_params).limit(limit).exec(function(err, result){
    	res.json(result);
    });
  }

  
};
