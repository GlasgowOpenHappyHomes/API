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
		
		if (req.query.hour) {
			req.query.hour = parseInt(req.query.hour)
		}
		
		if (req.query.dow) {
			req.query.dow = parseInt(req.query.dow)
		}
		
		if (req.query.location_id) {
			req.query.location_id = parseInt(req.query.location_id)
		}
		
		
		var StatsHelper = require('fast-stats').Stats;
		
		var data = []
		//req.query = {location_id: req.query.location_id, dow: req.query.dow, hour: req.query.hour}
		

		
    Stats.find(req.query).exec(function(err, result){
			result.forEach(function(entry) {
				
				data.push(entry.reading)
			});

		
			if (data.length === 0) {
				res.json();
			}
			
			statsObj = new StatsHelper().push(data)
		
			res.json(
				{
					size: data.length,
					min: statsObj.range()[0],
					lower_whisker: statsObj.percentile(9),
					lower_quartile: statsObj.percentile(25),
					median: statsObj.median(),
					upper_quartile: statsObj.percentile(75),
					upper_whisker: statsObj.percentile(91),
					max: statsObj.range()[1]
				}
			);
    });
  }
};
