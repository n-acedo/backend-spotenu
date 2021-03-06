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
            super.convertIntToBoolean(dbModel.is_approved),
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

    public async getBands(): Promise <any> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.TABLE_NAME}
            WHERE role="BAND"
        `)
        return result[0]
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.TABLE_NAME}
            WHERE id="${id}"
        `)
        return this.toModel(result[0][0])
    }

    public async approveBand(id: string): Promise<void> {
        await super.getConnection().raw(`
            UPDATE ${this.TABLE_NAME}
            SET is_approved = 1
            WHERE id="${id}"; 
        `)
    }
    
}