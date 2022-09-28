module.exports = (sequelize, dataTypes) => {
    let alias = "Eventos";
    let cols = {
      id_evento: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nota: {
        type: dataTypes.STRING(400),
      },
      titulo: {
        type: dataTypes.TEXT,
      }
    };
    let config = {
      tableName: "eventos",
      timestamps: false,
    };
  
    const Eventos = sequelize.define(alias, cols, config);
  

    return Eventos;
  };
  