module.exports = {
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    allowNull: false,
    underscored: true,
    paranoid: false, // enable soft delete
    hooks: {
        // This hook will be called before defining the model
        beforeDefine: (attributes, options) => {
            // Loop through all attributes of the model
            for (const attribute of Object.values(attributes)) {
                // Set allowNull to false for all attributes
                attribute.allowNull = false
            }
        },
    },
    // other model options...
}
