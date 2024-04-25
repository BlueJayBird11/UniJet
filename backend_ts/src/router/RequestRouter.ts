// TODO: Fix time formatter to format the correct time for psql

import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import { OnGoingTrip, RiderType } from "../shared/types";

var requests: Array<RiderType> = [];
var onGoing: Array<OnGoingTrip> = [];
var requestIdCount = 1;

// {
//   id: 0,
//   name: "Ash",
//   rating: 5.0,
//   position: [32.541251162684404, -92.63578950465626],
//   destination: "Chase Bank",
// },

// '2024-02-24 08:20:01-05'
function timeForDB(date:Date):string{
  let hours=date.getHours();
  let minutes=date.getMinutes();
  let seconds=date.getSeconds();
  let day=date.getDate();
  let month=date.getMonth()+1;
  let year=date.getFullYear();
  return (year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+"-05");
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
          if(requests[i].id == req.body.passengerId)
            {
              throw new Error("Cannot have more than 1 active request");
            }
        }

        for (let i = 0; i < requests.length; i++) {
          if(onGoing[i].passengerId == req.body.passengerId)
            {
              throw new Error("Cannot have more than 1 active request");
            }
        }

        requests.push({
          id: result.rows[0].id,
          name: result.rows[0].firstname + " " + result.rows[0].lastname,
          rating: result.rows[0].rating,
          position: req.body.location,
          destination: req.body.destination,
          destinationChoords: req.body.destinationChoords
        });

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
            confirmed: false
        };

        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].passengerId == req.body.id)
            {
              requestAccepted = true;
              tempRequest = onGoing[i];
            }
        } 

        res.status(200).json({
          status: "success",
          accepted: requestAccepted,
          data: {
            request: tempRequest,
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.post("/cancel-request", async (req, res) => {
      try {
        console.log(requests);
        for (let i = 0; i < onGoing.length; i++) {
          if(requests[i].id == req.body.id)
            {
              requests.splice(i,1);
            }
        }
        console.log("Removed item:");
        console.log(requests);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.get("", async (req, res) => {
      try {
        res.status(200).json({
          status: "success",
          results: requests.length,
          data: {
            passengers: requests,
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
          confirmed: false
        }

        // increment count for future ids
        requestIdCount++;

        // push to list
        onGoing.push(tripData);

        // remove request from requests
        for (let i = 0; i < requests.length; i++) {
          if(requests[i].id === req.body.passengerId)
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
          console.log(`'${(onGoing[i].passengerId)}' == '${(req.body.id)}'?`);

          if(onGoing[i].passengerId == req.body.id)
            {
              console.log("SWITCH OCCURED");
              onGoing[i].confirmed = true;
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
            request: onGoing[tempI]
          }
        });
      } catch (err) {
        console.log(err);
      }
    });

    // onGoing[i] = {
    //   tripId: onGoing[i].tripId,
    //   passengerId: onGoing[i].passengerId,
    //   driverId: onGoing[i].driverId,
    //   passengerName: onGoing[i].passengerName,
    //   driverName: onGoing[i].driverName,
    //   passengerStartLocation:  onGoing[i].passengerStartLocation,
    //   passengerLocation: onGoing[i].passengerLocation,
    //   driverLocation: onGoing[i].driverLocation,
    //   destination: onGoing[i].destination,
    //   destinationChoords: onGoing[i].destinationChoords,
    //   startTime: onGoing[i].startTime,
    //   rideDate: onGoing[i].rideDate,
    //   confirmed: true
    // };
    
    this.router.post("/update-request-passenger", async (req, res) => {
      try {
        let tripData = null;
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].tripId == req.body.tripId)
            {
              onGoing[i].passengerLocation = req.body.location;
              tripData = onGoing[i];
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

    this.router.post("/update-request-driver", async (req, res) => {
      try {
        let tripData = null;
        for (let i = 0; i < onGoing.length; i++) {
          if(onGoing[i].tripId == req.body.tripId)
            {
              onGoing[i].driverLocation = req.body.location;
              tripData = onGoing[i];
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
          if(onGoing[i].tripId == req.body.tripId)
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
          [req.body.passengerId, req.body.driverId, trip.tripId]
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
  }
}

export default new RequestRoutes().router;
