module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    name:{
      type: DataTypes.STRING(45),
      allownull: false,
    },
    description:{
      type: DataTypes.STRING(45),
      allownull: true,
    },
    startDate: {
      type: DataTypes.STRING(45),
      allownull: false,
    },
    endDate: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
  },
  {
    tableName: 'trip',
    timestamps: true,
  });
  return Trip;
}