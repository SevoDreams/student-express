module.exports = (sequelize, DataTypes) => {
  // This is for exporting this function to the file ecosystem
  let Student = sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
      // Im guessing we write the "type" so that no unwanted data type gets entered and causes errors
      allowNull: false,
    },

    starID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Student.sync({ force: false }).then(() => {
    console.log("Synced student table");
  });

  return Student;
};
