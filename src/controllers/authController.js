import {prisma} from "../config/db.js"
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    //console.log("REQ BODY: ",req.body);
    //console.log("EMAIL VALUE: ",req.body.email);
    //const {name, email, password} = req.body;
    const body = req.body;
    //res.json({message:"Connection"}); THIS WORKS
    res.json(body);
    //res.status(200).json(body);
    /*const userExists = await prisma.user.findUnique({
        where:{email:email},
    });

    if(userExists){
        return res.status(400).json({error:"User already exists with this email"});
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data:{name, email, password:hashedPassword}
    });

    res.status(201).json({
        status:"susccess",
        data:{
            user:{
                id:user.id,
                name:name,
                email:email
            }
        }
    });*/
};

export {register};