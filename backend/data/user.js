import bcrypt from "bcrypt";

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true,
    },
    {
        name: 'jone Doe',
        email: 'jone@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },
    {
        name: 'shabeeb',
        email: 'abc@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },

]
export default users