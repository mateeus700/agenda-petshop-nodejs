const moment = require("moment");
const connection = require("../infrastructure/connection");

class Attendance {
  add(attendance, res) {
    const createDate = moment().format("YYYY-MM-DD HH:MM:SS");
    const date = moment(attendance.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const isValidDate = moment(date).isSameOrAfter(createDate);
    const isClientValid = attendance.cliente.length >= 5;
    const validations = [
      {
        name: "date",
        isValid: isValidDate,
        message: "Data deve ser maior ou igual a data atual",
      },
      {
        name: "client",
        isValid: isClientValid,
        message: "Cliente deve ter no minimo cinco caracteres",
      },
    ];

    const errors = validations.filter((validation) => !validation.isValid);
    const thereAreErrors = errors.length;

    if (thereAreErrors) {
      res.status(400).json(errors);
    } else {
      const attendanceDate = {
        ...attendance,
        dataCriacao: createDate,
        data: date,
      };

      const sql = "INSERT INTO Atendimentos SET ?";

      connection.query(sql, attendanceDate, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM Atendimentos";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  getById(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      const attendance = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(attendance);
      }
    });
  }

  update(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }
}

module.exports = new Attendance();
