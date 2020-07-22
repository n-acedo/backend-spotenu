import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase{
    protected TABLE_NAME: string = "Users_Spotenu";

    private toModel(dbModel?: any): User | undefined {
        return (
          dbModel &&
          new User(
            dbModel.id,
            dbModel.name,
            dbModel.nickname,
            dbModel.email,
            dbModel.password,
            dbModel.role,
            dbModel.is_approved,
            dbModel.description
          )
        );
      }

    public async createUser(user: User): Promise<void> {
        const userIsApproved = super.convertBooleanToInt(user.getIsApproved()); 
        await super.getConnection().raw(`
            INSERT INTO ${this.TABLE_NAME} (id, name, nickname, email, password, role, description, is_approved)
            VALUES(
                "${user.getId()}",
                "${user.getName()}",                
                "${user.getNickame()}",  
                "${user.getEmail()}",  
                "${user.getPassword()}",  
                "${user.getRole()}",  
                "${user.getDescription()}",  
                "${userIsApproved}"  
            )
        `)
    }

    public async getUserByEmailOrNickName(emailOrNick: string): Promise<User | undefined>{
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.TABLE_NAME}
            WHERE email="${emailOrNick}"
            OR nickname="${emailOrNick}";
        `)

        return this.toModel(result[0][0])
    }
    
}