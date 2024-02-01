SELECT 
    p.firstName,
    p.lastName,
    u.uniName
FROM 
    passengers p
JOIN 
    attends a ON p.id = a.passengerID
JOIN 
    university u ON a.universityID = u.id;
