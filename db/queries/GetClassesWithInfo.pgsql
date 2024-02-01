SELECT 
    cl.className,
    d.daysofweek,
    b.buildingName,
    s.section,
    ti.starttime,
    ti.endtime
FROM 
    classInfo c
JOIN 
    classes cl ON cl.id = c.classid
JOIN
    daysofweek d ON d.id = c.daysofweekid
JOIN
    buildings b ON b.id = c.buildingid
JOIN
    section s ON s.id = c.sectionid
JOIN
    term t ON t.id = c.termid
JOIN 
    timeinformation ti ON ti.id = c.timeinfoid;