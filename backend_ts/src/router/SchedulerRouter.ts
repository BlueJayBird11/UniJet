import BaseRoutes from "./base/BaseRouter";
import pool from "../db";

class SchedulerRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("/subjects/", async (req, res) => {
            try {
                const results = await pool.query(`SELECT DISTINCT
                    classes.classsubject \ 
                    FROM public.classes \ 
                    ORDER BY classes.classsubject ASC;`,
                    );

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        subject: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/subjects/course/:subj", async (req, res) => {
            try {
                const subj = req.params.subj
                const results = await pool.query(`SELECT DISTINCT
                    classes.coursenumber \ 
                    FROM public.classes \
                    WHERE classsubject = $1 \
                    ORDER BY classes.coursenumber ASC;`,
                    [subj]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        subject: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/subjects/course/:subj", async (req, res) => {
            try {
                const subj = req.params.subj
                const results = await pool.query(`SELECT DISTINCT
                    classes.coursenumber \ 
                    FROM public.classes \
                    WHERE classsubject = $1 \
                    ORDER BY classes.coursenumber ASC;`,
                    [subj]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        subject: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/subjects/course/section/:classid", async (req, res) => {
            try {
                const classid = req.params.classid
                const results = await pool.query(`SELECT 
                    section.section, \ 
                    classinfo.sectionid \
                    FROM public.classinfo \
                    JOIN public.section ON section.id = classinfo.sectionid\
                    WHERE classid = $1 \
                    ORDER BY section.section ASC;`,
                    [classid]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        section: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/subjects/course/section/submit/:classid/:sectionid", async (req, res) => {
            try {
                const classid = req.params.classid
                const sectionid = req.params.sectionid
                const results = await pool.query(`SELECT 
                    daysofweek.daysofweek, \
                    buildings.buildingname, \ 
                    timeinformation.starttime, \ 
                    timeinformation.endtime, \ 
                    classes.classname \ 
                    FROM public.classinfo \
                    JOIN public.daysofweek ON daysofweek.id = classinfo.daysofweekid \
                    JOIN public.buildings ON buildings.id = classinfo.buildingid \
                    JOIN public.classes ON classes.id = classinfo.classid \ 
                    JOIN public.timeinformation ON timeinformation.id = classinfo.timeinfoid \
                    WHERE classid = $1 AND sectionid = $2;`,
                    [classid, sectionid],);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        slot: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });
    }
}

export default new SchedulerRoutes().router;