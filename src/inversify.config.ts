import { Container } from "inversify";
import { TYPES } from "./type";
import { ILogService, IRoomService, IUserService } from "./interface";
import { LogService } from "./service/LogService";
import { RoomService } from "./service/RoomService";
import { UserService } from "./service/UserService";

const myContainer = new Container();
myContainer.bind<ILogService>(TYPES.LogService).to(LogService);
myContainer.bind<IRoomService>(TYPES.RoomService).to(RoomService);
myContainer.bind<IUserService>(TYPES.UserService).to(UserService);

export { myContainer };