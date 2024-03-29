CREATE TABLE passengers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    birthDate DATE NOT NULL,
    email VARCHAR(30) NOT NULL,
    passwordHash VARCHAR(70) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    userStatus INT NOT NULL,
    carPool BOOLEAN NOT NULL,
    rating FLOAT,
    schedule JSONB
);

CREATE TABLE drivers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    licencePlate VARCHAR(10) NOT NULL,
    registeredState CHAR(2) NOT NULL,
    availableSeats INT NOT NULL check(availableSeats >= 1 and availableSeats <= 8),
    rating FLOAT
);

CREATE TABLE vehicles (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    make VARCHAR(20) NOT NULL,
    model VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    registeredYear VARCHAR(4) NOT NULL
);

CREATE TABLE university (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    uniName VARCHAR(40) NOT NULL,
    primaryColor CHAR(7) NOT NULL,
    secondaryColor CHAR(7) NOT NULL,
    emailExtension VARCHAR(50) NOT NULL,
    zip CHAR(5) NOT NULL, 
    uniState CHAR(2) NOT NULL,
    uniAddress VARCHAR(50) NOT NULL,
    timeZone VARCHAR(10) NOT NULL
);

CREATE TABLE classes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    classSubject VARCHAR(30) NOT NULL, 
    courseNumber INT NOT NULL,
    className VARCHAR(40) NOT NULL
);

CREATE TABLE timeInformation (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL
);

CREATE TABLE term (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    termName VARCHAR(20)
);

CREATE TABLE section (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    section VARCHAR(5)
);

CREATE TABLE daysOfWeek (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    daysOfWeek VARCHAR(5)
);

CREATE TABLE trip (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    startTime TIMESTAMP WITH TIME ZONE NOT NULL,
    endTime TIMESTAMP WITH TIME ZONE NOT NULL,
    startLoction VARCHAR(100) NOT NULL,
    endLoction VARCHAR(100) NOT NULL,
    rideDate DATE NOT NULL,
    earnings INT
);

CREATE TABLE buildings (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    buildingAddress VARCHAR(50),
    buildingName VARCHAR(40) NOT NULL,
    buildingFullName VARCHAR(40)
);

-- RELATIONSHIPS --

CREATE TABLE registeredAs (
    passengerID INT NOT NULL,
    driverID INT NOT NULL,
    PRIMARY KEY (passengerID, driverID),
    CONSTRAINT fk_passenger FOREIGN KEY(passengerID) REFERENCES passengers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_driver FOREIGN KEY(driverID) REFERENCES drivers(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ownsA (
    driverID INT NOT NULL,
    vehicleID INT NOT NULL,
    PRIMARY KEY (driverID, vehicleID),
    CONSTRAINT fk_driver FOREIGN KEY(driverID) REFERENCES drivers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_vehicle FOREIGN KEY(vehicleID) REFERENCES vehicles(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE attends (
    passengerID INT NOT NULL,
    universityID INT NOT NULL,
    PRIMARY KEY (passengerID, universityID),
    CONSTRAINT fk_passenger FOREIGN KEY(passengerID) REFERENCES passengers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_university FOREIGN KEY(universityID) REFERENCES university(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE offeredBy (
    classID INT NOT NULL,
    universityID INT NOT NULL,
    PRIMARY KEY (classID, universityID),
    CONSTRAINT fk_class FOREIGN KEY(classID) REFERENCES classes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_university FOREIGN KEY(universityID) REFERENCES university(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE locatedIn (
    buildingID INT NOT NULL,
    universityID INT NOT NULL,
    PRIMARY KEY (buildingID, universityID),
    CONSTRAINT fk_building FOREIGN KEY(buildingID) REFERENCES buildings(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_university FOREIGN KEY(universityID) REFERENCES university(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE history (
    passengerID INT NOT NULL,
    driverID INT NOT NULL,
    tripID INT NOT NULL,
    PRIMARY KEY (passengerID, driverID, tripID),
    CONSTRAINT fk_passenger FOREIGN KEY(passengerID) REFERENCES passengers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_driver FOREIGN KEY(driverID) REFERENCES drivers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_trip FOREIGN KEY(tripID) REFERENCES trip(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE classInfo (
    classID INT NOT NULL,
    timeInfoID INT NOT NULL,
    sectionID INT NOT NULL,
    daysOfWeekID INT NOT NULL,
    buildingID INT NOT NULL,
    termID INT NOT NULL,
    PRIMARY KEY (classID, timeInfoID, sectionID, daysOfWeekID, buildingID, termID),
    CONSTRAINT fk_class FOREIGN KEY(classID) REFERENCES classes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_timeInformation FOREIGN KEY(timeInfoID) REFERENCES timeInformation(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_section FOREIGN KEY(sectionID) REFERENCES section(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_daysOfWeek FOREIGN KEY(daysOfWeekID) REFERENCES daysOfWeek(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_building FOREIGN KEY(buildingID) REFERENCES buildings(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_term FOREIGN KEY(termID) REFERENCES term(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);