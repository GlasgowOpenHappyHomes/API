/**
 * Stats
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'dow_hour_power',
  adapter: 'mysql',
  migrate: 'safe',
	
  attributes: {
		
		// get attributes automatically
    
  },
	
	fetch: function(location_id, day_of_week, hour_of_day, successfunc){
		var StatsHelper = require('fast-stats').Stats;
		
		var data = []		
		
    this.find(
			{location_id: location_id, dow: day_of_week, hour: hour_of_day}
		).exec(function(err, result){
			result.forEach(function(entry) {
				data.push(entry.reading)
			});

		
			if (data.length === 0) {
				successfunc({})
			}
			
			statsObj = new StatsHelper().push(data)
		
			var resultObj = {
					size: data.length,
					min: statsObj.range()[0],
					lower_whisker: statsObj.percentile(9),
					lower_quartile: statsObj.percentile(25),
					median: statsObj.median(),
					upper_quartile: statsObj.percentile(75),
					upper_whisker: statsObj.percentile(91),
					max: statsObj.range()[1],
					rawData: data
				}
				
				successfunc(resultObj);
    });
	}
};
