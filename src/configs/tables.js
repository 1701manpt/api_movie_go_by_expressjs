module.exports = {
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    paranoid: false, // enable soft delete
    allowNull: false,
    // other model options...
}
