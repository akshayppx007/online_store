const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
      {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    address: "zaragoza",
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
      _id: new ObjectId("625add3d78fb449f9d9fe2ee"),
    firstName: 'John',
    lastName: 'Doe',
    address: "ontario, canada",
    phoneNumber: "1234567890",
    email: 'john@doe.com',
    password: bcrypt.hashSync('john@doe.com', 10),
  },
]

module.exports = users