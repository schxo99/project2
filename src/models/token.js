module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
  },{
    tableName: 'token',
    timestamps: false,
  })
  return Token;
}