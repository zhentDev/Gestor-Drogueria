// models/refreshToken.js
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token_hash: {                // matches DB column exactly
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {                   // matches DB column exactly
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires_at: {                // matches DB column exactly
      type: DataTypes.DATE,
      allowNull: false,
    },
    revoked: {
      type: DataTypes.BOOLEAN,    // 0/1 stored in DB
      defaultValue: false,
    },
    replaced_by_token_hash: {     // matches DB column exactly
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {                 // timestamps
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'refresh_tokens',
    timestamps: true, // will manage created_at & updated_at automatically
    underscored: true // automatically uses snake_case for timestamps
  });

  RefreshToken.associate = (models) => {
    // tell Sequelize the foreign key in DB is user_id
    RefreshToken.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return RefreshToken;
};
