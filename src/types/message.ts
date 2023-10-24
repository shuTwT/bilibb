import { Message, UserInfo as MessageUserInfo,
 MedalInfo as MessageMedalInfo,
 ImageInfo as MessageImageInfo,
 GiftInfo as MessageGiftInfo } from "floating-live";
export interface Base extends Message.Base{

}

/**
 * 文本聊天消息
 */
export interface Chat extends Message.Chat{

}

/**
 * 礼物消息
 */
export interface Gift extends Message.Gift{

}

/**
 * 互动消息(进入直播间、点赞、关注、分享、加入粉丝团)
 */
export interface Interact extends Message.Interact{

}
export interface Membership extends Message.Membership{

}
export interface Superchat extends Message.Superchat{}
export interface Block extends Message.Block{}
export interface LiveStart extends Message.LiveStart{}
export interface LiveEnd extends Message.LiveEnd{}
export interface LiveCut extends Message.LiveCut{}
export interface LiveStats extends Message.LiveStats{}
export interface LiveDetail extends Message.LiveDetail{}
export type All =
| Chat
| Gift
| Interact
| Membership
| Superchat
| Block
| LiveStart
| LiveEnd
| LiveCut
| LiveDetail
| LiveStats;
export interface UserInfo extends MessageUserInfo{}
export interface MedalInfo extends MessageMedalInfo{}
export interface ImageInfo extends MessageImageInfo{}
export interface GiftInfo extends MessageGiftInfo{}