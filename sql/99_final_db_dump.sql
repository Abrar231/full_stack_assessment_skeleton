-- DO
CREATE TABLE user (
	id INT AUTO_INCREMENT,
    username varchar(255) UNIQUE NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE home (
	id INT AUTO_INCREMENT,
	street_address VARCHAR(255) NOT NULL UNIQUE,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    sqft DECIMAL(6,2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_home_join (
	id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    home_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;

INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;

INSERT INTO user_home_join (user_id, home_id)
SELECT u.id AS user_id, h.id AS home_id
FROM user_home uh
LEFT JOIN user u ON uh.username = u.username
LEFT JOIN home h ON uh.street_address = h.street_address;

--  UNDO
-- DROP TABLE user_home_join;

-- DROP TABLE user;

-- DROP TABLE home;