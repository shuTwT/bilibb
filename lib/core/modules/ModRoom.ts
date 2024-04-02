import { LiveTCP } from "bilibili-live-ws";

export class ModRoom {
    readonly live:LiveTCP
    constructor(live:LiveTCP){
        this.live=live
    }
}