DROP TABLE IF EXISTS location;
CREATE TABLE location (
	id INTEGER auto_increment PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	location POINT,
	postcode VARCHAR(20),
	code VARCHAR(20) NOT NULL
);

DROP INDEX idx_location_name ON location;
CREATE INDEX idx_location_name ON location(name);
DROP INDEX idx_location_code ON location;
CREATE INDEX idx_location_code ON location(code);

DROP TABLE IF EXISTS readings;
CREATE TABLE readings (
	id INTEGER auto_increment PRIMARY KEY,
	datetime TIMESTAMP NOT NULL,
	location_id INTEGER NOT NULL REFERENCES location(id),
	reading DECIMAL(5, 2) NOT NULL
);

DROP INDEX idx_reading_datetime ON readings;
CREATE INDEX idx_reading_datetime ON readings(datetime);

-- pre-computed table with Day of Week, Hour of Day and the corresponding power
-- need to update this when readings is updated

DROP TABLE IF EXISTS dow_hour_power;
CREATE TABLE dow_hour_power AS (
	SELECT location_id,
	EXTRACT(HOUR FROM datetime) AS hour,
	DAYOFWEEK(datetime) AS dow,
	reading
	FROM readings
);

DROP INDEX idx_dow_hour;
CREATE INDEX idx_dow_hour ON dow_hour_power(dow, hour);

-- work out the quartile data in Node - doing it in MySQL is a trip to madness!

DROP VIEW last_current_hour_reading;
CREATE VIEW last_current_hour_reading AS SELECT location_id, max(datetime), reading from readings where hour(datetime) = hour(now()) group by location_id;