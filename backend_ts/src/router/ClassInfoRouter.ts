import BaseRoutes from "./base/BaseRouter";
import pool from "../db";


class ClassInfoRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("", async (req, res) => {
            try {
                const results = await pool.query("SELECT \
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
                        classes: results.rows
                    },
                });
            } catch (err) {
                console.log(err);
            };
        });
    }
}

export default new ClassInfoRoutes().router;