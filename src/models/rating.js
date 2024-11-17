module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Ratring', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    placeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'rating',
  })
  return Rating
}