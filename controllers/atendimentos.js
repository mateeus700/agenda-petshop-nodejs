const attendance = require("../models/attendance");
const Attendance = require("../models/attendance");
module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Attendance.list(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.getById(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    attendance = req.body;

    Attendance.add(attendance, res);
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    attendance.update(id, values, res);
  });
};
