module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
       latitude: {
           type: DataTypes.DECIMAL(20, 5),
           allowNull: false
       },
       longitude: {
           type: DataTypes.DECIMAL(20, 5),
           allowNull: false
       }
    });
    
    Location.associate = function(models) {
        Location.belongsTo(models.Vendor, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return Location;
}