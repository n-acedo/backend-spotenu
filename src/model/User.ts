import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role: string,
    private is_approved: boolean,
    private description?: string 
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNickame(): string {
    return this.nickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): string {
    return this.role;
  }


  public getIsApproved(): boolean {
    return this.is_approved;
  }

  public getDescription(): string | undefined {
    return this.description;
  }
}

export const stringToUserRole = (role: string): UserRole => {
  switch (role) {
    case "USER_FREE":
      return UserRole.USER_FREE;

    case "USER_PREMIUM":
      return UserRole.USER_PREMIUM;

    case "BAND":
      return UserRole.BAND;

    case "ADMIN":
      return UserRole.ADMIN;

    default:
      throw new InvalidParameterError("Invalid user role");
  }
};

export enum UserRole {
  USER_FREE = "USER_FREE",
  USER_PREMIUM = "USER_PREMIUM",
  BAND = "BAND",
  ADMIN = "ADMIN",
}
