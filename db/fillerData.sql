INSERT INTO passengers (birthDate, email, passwordHash, phoneNumber, firstName, lastName, userStatus, carPool, rating, schedule) VALUES
('1990-05-15', 'jfr021@latech.edu', 1234567890, '1234567890', 'Jay', 'Reich', 1, TRUE, 4.5, '{"monday": [["09:30", "10:45"], ["12:30", "13:45"], ["14:00", "15:15"]],"tuesday": [["09:30", "10:45"], ["12:30", "13:45"], ["14:00", "15:15"]],"wednesday": [["09:30", "10:45"], ["12:30", "13:45"], ["14:00", "15:15"]]}'),
('1985-08-25', 'jms512@latech.edu', 987654321, '0987654321', 'Jane', 'Smith', 0, FALSE, 4.7, '{"friday": ["10:00", "15:00"]}');

INSERT INTO drivers (licencePlate, registeredState, availableSeats, rating) VALUES
('ABC123', 'LA', 4, 4.8),
('XYZ789', 'CA', 3, 4.6);

INSERT INTO vehicles (make, model, color, registeredYear) VALUES
('Toyota', 'Camry', 'Red', '2018'),
('Honda', 'Civic', 'Blue', '2020');

INSERT INTO university (uniName, primaryColor, secondaryColor, emailExtension, zip, uniState, uniAddress, timeZone) VALUES
('Louisiana Tech University', '#FF0000', '#0000FF', 'latech.edu', '12345', 'LA', '201 Mayfield Ave, Ruston, LA 71272', 'CST'),
('Science Institute', '#008000', '#FFFF00', 'sciinst.edu', '54321', 'CA', '456 Science Drive', 'PST');

INSERT INTO classes (classSubject, courseNumber, className) VALUES
('CSC', 405, 'SENIOR CAPSTONE I'),
('CSC', 448, 'REVERSE ENGINEERING'),
('MATH', 302, 'INTRO TO GEOM & MATHEMATICAL FND');

INSERT INTO timeInformation (startTime, endTime) VALUES
('14:00:00', '15:15:00'),
('9:30:00', '10:45:00'),
('12:30:00', '13:45:00');

INSERT INTO term (startDate, endDate, termName) VALUES
('2023-11-29', '2024-02-27', "WINTER2024");

INSERT INTO section (section) VALUES
('001'),
('002');

INSERT INTO daysOfWeek (daysOfWeek) VALUES
('MWF'),
('TR');

INSERT INTO trip (startTime, endTime, startLoction, endLoction, rideDate, earnings) VALUES
('2023-09-01 08:00:00+00', '2023-09-01 09:00:00+00', '100 Main St', '200 Broadway St', '2023-09-01', 1000),
('2023-09-02 10:00:00+00', '2023-09-02 11:00:00+00', '300 Pine St', '400 Oak St', '2023-09-02', 1500);

INSERT INTO buildings (buildingAddress, buildingName, buildingFullName) VALUES
(NULL, 'NETH', NULL),
(NULL, 'IESB', NULL),
(NULL, 'BOGH', NULL);
