const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/connection");
const tables = require("./infrastructure/tables");

connection.connect((error) => {
  if (error) {
    console.log("connection DB error -> ", error);
  } else {
    console.log("conectado com sucesso");

    tables.init(connection);
    const app = customExpress();

    app.listen(3000, () => console.log("servidor rodando na porta 3000"));
  }
});
