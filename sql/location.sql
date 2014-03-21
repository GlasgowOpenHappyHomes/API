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