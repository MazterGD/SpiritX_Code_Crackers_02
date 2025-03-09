import AppDataSource from "../config/connectDB";
import {User} from "../models/user.model";
import {UserReg} from "../schema/userSchema";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.utils";
import {comparePassword, hashPassword} from "../utils/bcrypt";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async(userData: UserReg) =>{

    const existingUser = await userRepository.findOneBy({name: userData.username});
    appAssert(!existingUser, CONFLICT,"User already exists");

    const hashedPassword = await hashPassword(userData.password, 10);
    const user = userRepository.create({name: userData.username, password: hashedPassword});
    console.log("New User", user);
    await userRepository.save(user);

    return user;
}

export const loginUser = async (username: string, password: string) =>{

    const existingUser = await userRepository.findOneBy({name: username});
    if (!existingUser) {
        throw new Error("Invalid Credentials");
    }

    const isPasswordMatch = await comparePassword(password,existingUser.password);
    console.log(password,existingUser.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }

    const accessToken = generateAccessToken({id: existingUser.id, name: existingUser.name});
    const refreshToken = generateRefreshToken({id: existingUser.id, name: existingUser.name});

    return {
        name: existingUser.name,
        accessToken: accessToken,
        refreshToken :refreshToken
    };
}
