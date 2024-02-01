require('dotenv').config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

console.log()
// Get all passengers
app.get("/api/v1/passengers", async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM passengers');
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/v1/class_with_info", async (req, res) => {
    try {
        const results = await db.query("SELECT \
            cl.className,\
            d.daysofweek,\
            b.buildingName,\
            s.section,\
            ti.starttime,\
            ti.endtime \
            FROM classInfo ci \
            JOIN classes cl ON cl.id = ci.classid \
            JOIN daysofweek d ON d.id = ci.daysofweekid \
            JOIN buildings b ON b.id = ci.buildingid \
            JOIN section s ON s.id = ci.sectionid \
            JOIN term t ON t.id = ci.termid \
            JOIN timeinformation ti ON ti.id = ci.timeinfoid;");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});


// npm start