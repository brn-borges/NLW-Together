import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UserRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UserRepositories)
    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect")
    }
    // Verificar se senha está correta

    //12345 / sdf5dsf45sd4f5sd4f5
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }
    // Gerar token
    const token = sign({
      email: user.email
    }, "7fd78191f8532f2a5a1253a72ef27506", {
      subject: user.id, 
      expiresIn: "1d"
    }
    );
    return token;
  }
}

export { AuthenticateUserService }