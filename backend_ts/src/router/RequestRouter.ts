// TODO: Fix time formatter to format the correct time for psql

import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import { OnGoingTrip, RiderType } from "../shared/types";

const requests: Array<{ data: RiderType, timeout: NodeJS.Timeout }> = [];
// var onGoing: Array<OnGoingTrip> = [];
const onGoing: Array<{ data: OnGoingTrip, timeout: NodeJS.Timeout }> = [];

var requestIdCount = 1;

function addRequest(item: RiderType) {
  const timeout = setTimeout(() => {
      removeRequest(item);
  }, 20 * 60 * 1000); // 20 minutes in milliseconds

  requests.push({ data: item, timeout });
}

// Remove an item from the requests array
function removeRequest(item: RiderType) {
  const index = requests.findIndex(request => request.data === item);
  if (index !== -1) {
      clearTimeout(requests[index].timeout);
      requests.splice(index, 1);
      console.log("Request removed after 20 minutes.");
  }
}

function addOnGoing(item: OnGoingTrip) {
  const timeout = setTimeout(() => {
      removeOnGoing(item);
  }, 3 * 60 * 1000); // 3 minutes in milliseconds

  onGoing.push({ data: item, timeout });
}

// Remove an item from the onGoing array
function removeOnGoing(item: OnGoingTrip) {
  const index = onGoing.findIndex(onGoing => onGoing.data === item);
  if (index !== -1) {
      clearTimeout(onGoing[index].timeout);
      if (onGoing[index].data.confirmed == false) {
        onGoing.splice(index, 1);
        console.log("Unconfirmed trip removed after 3 minutes.");
      }
  }
}


// '2024-02-24 08:20:01-05'
function timeForDB(date:Date):string{
  let hours=date.getHours();
  let minutes=date.getMinutes();
  let seconds=date.getSeconds();
  let day=date.getDate();
  let month=date.getMonth()+1;
  let year=date.getFullYear();
  return (year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+"-00");
}

function getTime(date:Date):string{
  let hours=date.getHours();
  let minutes=date.getMinutes();
  let seconds=date.getSeconds();
  let time: string = hours+":"+minutes+":"+seconds;
  // console.log("Current Time: "+ time); 
  return time;
}

function getDate(date:Date):string{
  let day=date.getDate();
  let month=date.getMonth()+1;
  let year=date.getFullYear();
  let compDate: string = year+"-"+month+"-"+day;
  // console.log("Current Date: "+ compDate); 
  return compDate;
}



// {
//   tripId: 1,
//   passengerId: 1,
//   driverId: 2,
//   passengerName: "Jay Reich",
//   driverName: "Josiah Norman",
//   passengerStartLocation:  [32.541251162684404, -92.63578950465626],
//   passengerLocation: [32.541251162684404, -92.63578950465626],
//   driverLocation: [32.541251162684404, -92.63578950465626],
//   destination: "IESB",
//   startTime: getTime(new Date()),
//   rideDate: getDate(new Date())
// }

// console.log(onGoing);

class RequestRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/request", async (req, res) => {
      try {
        // console.log(req.body);
        console.log(req.body);
        const result = await pool.query(
          "SELECT * FROM passengers WHERE email = $1",
          [req.body.email]
        );

        console.log(result.rows[0]);
        console.log(result.rows[0].firstname);

        for (let i = 0; i < requests.length; i++) {
          if(requests[i].data.id == req.body.passengerId)
            {
              throw new Error("Cannot have more than 1 active request");
            }
        }

        for (let i = 0; i < requests.length; i++) {
          if(onGoing[i].data.passengerId == req.body.passengerId)
            {
              throw new Error("Cannot have more than 1 active request");
            }
        }

        addRequest({
            id: result.rows[0].id,
            name: result.rows[0].firstname + " " + result.rows[0].lastname,
            rating: result.rows[0].rating,
            position: req.body.location,
            destination: req.body.destination,
            destinationChoords: req.body.destinationChoords
          });

        // requests.push({
        //   id: result.rows[0].id,
        //   name: result.rows[0].firstname + " " + result.rows[0].lastname,
        //   rating: result.rows[0].rating,
        //   position: req.body.location,
        //   destination: req.body.destination,
        //   destinationChoords: req.body.destinationChoords
        // });

        console.log(result.rows.length);
        console.log(requests);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/request-update", async (req, res) => {
      try {
        // console.log(req.body);
        var requestAccepted: boolean = false;
        var tempRequest: OnGoingTrip = 
          {
            tripId: 0,
            passengerId: 0,
            driverId: 0,
            passengerName: "",
            driverName: "",
            passengerStartLocation:  [0, 0],
            passengerLocation: [0, 0],
            driverLocation: [0, 0],
            destination: "",
            destinationChoords: [0,0],
            startTime: getTime(new Date()),
            rideDate: getDate(new Date()),
            confirmed: false,
            cancelled: false,
            pPhone: "",
            dPhone: ""
        };

        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].data.passengerId == req.body.id)
            {
              requestAccepted = true;
              tempRequest = onGoing[i].data;
            }
        } 

        // SELECT * FROM drivers d JOIN registeredas ra ON d.id = ra.driverid JOIN passengers pa ON pa.id = ra.passengerid WHERE d.id = $1;
        const ratingResult = await pool.query(
          "SELECT pa.rating FROM drivers d JOIN registeredas ra ON d.id = ra.driverid JOIN passengers pa ON pa.id = ra.passengerid WHERE d.id = $1",
          [tempRequest.driverId]
        );
        // const trip = resultTrip.rows[0]; 
        // console.log(trip);

        console.log("Rating: ");
        console.log(ratingResult.rows[0].rating);

        res.status(200).json({
          status: "success",
          accepted: requestAccepted,
          data: {
            request: tempRequest,
            dRating: ratingResult.rows[0].rating
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/cancel-request", async (req, res) => {
      try {
        console.log(req.body);
        console.log("Current requests");
        console.log(requests);
        for (let i = 0; i < requests.length; i++) {
          console.log(`${requests[i].data.id} == ${req.body.id}? ${requests[i].data.id == req.body.id}`)
          if(requests[i].data.id == req.body.id)
            {
              requests.splice(i,1);
              console.log("REMOVE THIS REQUEST");
              break;
            }
        }
        console.log("Removed request:");
        console.log(requests);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/cancel-ongoing", async (req, res) => {
      try {
        console.log(onGoing);
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].data.tripId == req.body.tripId)
            {
              onGoing.splice(i,1);
            }
        }
        console.log("Removed onGoingTrip:");
        console.log(onGoing);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.get("", async (req, res) => {
      try {
        var tempRequests: Array<RiderType> = [];
        for (let i = 0; i < requests.length; i++) {
          tempRequests.push(requests[i].data);
          
        }
        res.status(200).json({
          status: "success",
          results: tempRequests.length,
          data: {
            passengers: tempRequests,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/accept-request", async (req, res) => {
      try {
        // get date
        var date: Date = new Date();

        // get phone numbers
        const paPhoneResult = await pool.query(
          "SELECT phonenumber FROM passengers WHERE id = $1",
          [req.body.passengerId]
        );

        var pPhone: string = paPhoneResult.rows[0].phonenumber;

        const drPhoneResult = await pool.query(
          "SELECT pa.phonenumber FROM passengers pa JOIN registeredas ra ON ra.passengerid = pa.id JOIN drivers dr ON dr.id = ra.driverid WHERE dr.id = $1",
          [req.body.driverId]
        );

        var drPhone: string = drPhoneResult.rows[0].phonenumber;

        // make object with proper values
        var tripData = {
          tripId: requestIdCount,
          passengerId: req.body.passengerId,
          driverId: req.body.driverId,
          passengerName: req.body.passengerName,
          driverName: req.body.driverName,
          passengerStartLocation:  req.body.passengerLocation,
          passengerLocation: req.body.passengerLocation,
          driverLocation: req.body.driverLocation,
          destination: req.body.destination,
          destinationChoords: req.body.destinationChoords,
          startTime: timeForDB(date),
          rideDate: getDate(date),
          confirmed: false,
          cancelled: false,
          pPhone: pPhone,
          dPhone: drPhone
        }

        // increment count for future ids
        requestIdCount++;

        // push to list
        // onGoing.push(tripData);
        addOnGoing(tripData);

        // remove request from requests
        for (let i = 0; i < requests.length; i++) {
          if(requests[i].data.id === req.body.passengerId)
            {
              requests.splice(i,1);
            }
        }

        res.status(200).json({
          status: "success",
          data: {
            request: tripData
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/confirm-request", async (req, res) => {
      try {
        var tempI:number = -1;
        for (let i = 0; i < onGoing.length; i++) {
          console.log(`'${(onGoing[i].data.passengerId)}' == '${(req.body.id)}'?`);

          if(onGoing[i].data.passengerId == req.body.id)
            {
              console.log("SWITCH OCCURED");
              onGoing[i].data.confirmed = true;
              tempI = i;
            }
        }
        if (tempI === -1)
          {
            throw new Error("request not found in onGoing");
          }
        res.status(200).json({
          status: "success",
          data: {
            request: onGoing[tempI].data
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
    
    this.router.post("/update-request-passenger", async (req, res) => {
      try {
        let tripData = null;
        console.log("REQ BODY:")
        console.log(req.body);
        // console.log(onGoing)
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].data.tripId == req.body.tripId)
            {
              console.log(onGoing[i].data);
              onGoing[i].data.passengerLocation = req.body.location;
              tripData = onGoing[i].data;
            }
        }
        console.log("TRIP DATA:")
        console.log(tripData);
        res.status(200).json({
          status: "success",
          data: {
            request: tripData
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/update-request-driver", async (req, res) => {
      try {
        let tripData = null;
        console.log(req.body);
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].data.tripId == req.body.tripId)
            {
              onGoing[i].data.driverLocation = req.body.location;
              tripData = onGoing[i].data;
            }
        }

        res.status(200).json({
          status: "success",
          data: {
            request: tripData
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/end-request", async (req, res) => {
      try {
        // remove item from ongoing
        console.log(onGoing);
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].data.tripId == req.body.tripId)
            {
              onGoing.splice(i,1);
            }
        }
        console.log("Removed item:");
        console.log(onGoing);

        var date: Date = new Date();

        // add to the trips table in the database
        const resultTrip = await pool.query(
          "INSERT INTO trip (startTime, endTime, startLoction, endLoction, rideDate, earnings) VALUES \
          ($1, $2, $3, $4, $5, $6) returning *",
          [req.body.startTime, timeForDB(date), req.body.startLocation.toString(), req.body.startLocation.toString(), getDate(date), req.body.earnings]
        );
        const trip = resultTrip.rows[0]; 
        console.log(trip);

        // add to the history table in the database
        const resultHistory = await pool.query(
          "INSERT INTO history (passengerID, driverID, tripID) VALUES \
          ($1, $2, $3) returning *",
          [req.body.passengerId, req.body.driverId, trip.id]
        );
        const history = resultHistory.rows[0]; 
        console.log(history);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.put("/rate-passenger", async (req, res) => {
      try {
        console.log(req.body);
        const newRatingResult = await pool.query(
          "WITH avg_rating AS ( \
            SELECT id, AVG(rating) AS avg_rating\
            FROM passengers\
            WHERE id = $1\
            GROUP BY id\
            )\
            UPDATE passengers\
            SET rating = (SELECT (avg_rating.avg_rating + $2) / 2 FROM avg_rating)\
            WHERE id = $1\
            returning *",
          [req.body.id, req.body.rating]
        );
        console.log("New Rating")
        console.log(newRatingResult.rows[0].rating);
        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.put("/rate-driver", async (req, res) => {
      try {
        console.log(req.body);
        const newRatingResult = await pool.query(
          "WITH avg_passenger_rating AS (\
              SELECT ra.passengerID, AVG(p.rating) AS avg_rating\
              FROM registeredAs ra\
              INNER JOIN passengers p ON ra.passengerID = p.id\
              WHERE ra.driverID = $1\
              GROUP BY ra.passengerID\
          )\
          UPDATE passengers\
          SET rating = (SELECT (apr.avg_rating + $2) / 2 FROM avg_passenger_rating apr WHERE apr.passengerID = passengers.id)\
          WHERE id IN (SELECT passengerID FROM registeredAs WHERE driverID = $1)\
          returning *;",
          [req.body.id, req.body.rating]
        );
        
        console.log(newRatingResult.rows[0].rating);
        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new RequestRoutes().router;
