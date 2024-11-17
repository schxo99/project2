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
    placeId: {
      type:Datatypes.INTEGER,
      allowNull: true,
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
    status:{
      type: Datatypes.INTEGER,
      defaultValue: 0
    } 
  },
  {
    tableName:'schedule',
    timestamps: false
  })
  return Schedule;
}