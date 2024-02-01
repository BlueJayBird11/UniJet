-- Connecting passenger 1 to driver 1
INSERT INTO registeredAs (passengerID, driverID) VALUES (1, 1);

-- Connecting passenger 2 to driver 2
INSERT INTO registeredAs (passengerID, driverID) VALUES (2, 2);

-- Assuming driver 1 owns vehicle 1
INSERT INTO ownsA (driverID, vehicleID) VALUES (1, 1);

-- Assuming driver 2 owns vehicle 2
INSERT INTO ownsA (driverID, vehicleID) VALUES (2, 2);

-- Connecting passenger 1 to university 1
INSERT INTO attends (passengerID, universityID) VALUES (1, 1);

-- Connecting passenger 2 to university 2
INSERT INTO attends (passengerID, universityID) VALUES (2, 2);

-- Connecting class 1 (Capstone) to university 1
INSERT INTO offeredBy (classID, universityID) VALUES (1, 1);

-- Connecting class 1 (Reverse) to university 1
INSERT INTO offeredBy (classID, universityID) VALUES (2, 1);

-- Connecting class 1 (Mathematics) to university 1
INSERT INTO offeredBy (classID, universityID) VALUES (3, 1);

-- Assuming building 1 (NETH) is in university 1
INSERT INTO locatedIn (buildingID, universityID) VALUES (1, 1);

-- Assuming building 2 (IESB) is in university 1
INSERT INTO locatedIn (buildingID, universityID) VALUES (2, 1);

-- Assuming building 2 (BOGH) is in university 1
INSERT INTO locatedIn (buildingID, universityID) VALUES (3, 1);

-- Connecting passenger 1 and driver 1 to trip 1
INSERT INTO history (passengerID, driverID, tripID) VALUES (1, 1, 1);

-- Connecting passenger 2 and driver 2 to trip 2
INSERT INTO history (passengerID, driverID, tripID) VALUES (2, 2, 2);

-- Example: Class 1 (Capstone)
INSERT INTO classInfo (classID, timeInfoID, sectionID, daysOfWeekID, buildingID, termID) VALUES (1, 1, 1, 1, 1, 1);

-- Example: Class 2 (Reverse)
INSERT INTO classInfo (classID, timeInfoID, sectionID, daysOfWeekID, buildingID, termID) VALUES (2, 2, 2, 1, 2, 1);

-- Example: Class 2 (Mathematics)
INSERT INTO classInfo (classID, timeInfoID, sectionID, daysOfWeekID, buildingID, termID) VALUES (3, 3, 1, 1, 3, 1);
