module.exports = (sequelize, Datatypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tripId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    startTime:{
      type: Datatypes.STRING(45),
      allowNull: true,
    },
    endTime: {
      type: Datatypes.STRING(45),
      allowNull: true,
    },
    description: {
      type: Datatypes.STRING(45),
      allowNull: true,
    },
    orderId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    type:{
      type: Datatypes.STRING(45),
      allowNull: false,
    } 
  },
  {
    tableName:'schedule',
    timestamps: false
  })
  return Schedule;
}