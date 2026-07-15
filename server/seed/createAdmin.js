import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createDefaultAdmin = async () => {

    try {

        const admin = await User.findOne({

            email: "admin@gmail.com"

        });

        if (admin) {

           //  console.log("Default Admin already exists.");

            return;

        }

        const hashedPassword = await bcrypt.hash(

            "Admin@123",

            10

        );

        await User.create({

    name: "System Admin",

    email: "admin@gmail.com",

    password: hashedPassword,

    phone: "9999999999",

    role: "Admin",

    isApproved: true,

});

        console.log("Default Admin Created Successfully.");

    }

    catch (error) {

        console.log(error.message);

    }

};

export default createDefaultAdmin;