import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase{
    protected TABLE_NAME: string = "Users_Spotenu";

    public async createUser(user: User): Promise<void> {
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
                "${user.getIsApproved()}"  
            )
        `)
    }
    
}