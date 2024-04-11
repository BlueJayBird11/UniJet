SELECT passengers.firstname, passengers.lastname, trip.endtime, trip.starttime, trip.earnings, trip.startloction, trip.endloction
FROM public.history 
LEFT JOIN public.passengers ON passengers.id = history.passengerid 
LEFT JOIN public.drivers ON drivers.id = history.driverid 
LEFT JOIN public.trip ON trip.id = history.tripid
WHERE drivers.id = 1
ORDER BY passengerid ASC, driverid ASC, tripid ASC;