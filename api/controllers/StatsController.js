/**
 * StatsController
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
   * (specific to StatsController)
   */
  _config: {},
	
  getStats: function(req, res, next) {
    if(req.query.limit === undefined) {
    	req.query.limit = 20;
    }

    if(req.query.limit > 100) {
    	req.query.limit = 100;	
    }
		
		if (req.query.hour) {
			req.query.hour = parseInt(req.query.hour)
		}
		
		if (req.query.dow) {
			req.query.dow = parseInt(req.query.dow)
		}
		
		
		var StatsHelper = require('fast-stats').Stats;
		
		var data = []
		console.log(req.query);
		
		console.log(Stats.find(req.query).query())
    Stats.find(req.query).exec(function(err, result){
			result.forEach(function(entry) {
				console.log(entry);
				data.push(entry.reading)
			});

		
			if (data.length === 0) {
				res.json();
			}
			
			statsObj = new StatsHelper().push(data)
		
			res.json(
				{
					min: statsObj.range()[0],
					lower_quartile: statsObj.percentile(25),
					median: statsObj.median(),
					upper_quartile: statsObj.percentile(75),
					max: statsObj.range()[1]
				}
			);
    });
  }
};
