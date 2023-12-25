import type { Server } from "socket.io";

declare global{
    
    namespace globalThis{
        var io: Server
    }
} 
export {}