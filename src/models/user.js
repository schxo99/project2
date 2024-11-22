module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    provider: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    hashPassword: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    tableName: 'user',
    timestamps: true,
  });
  return User
};