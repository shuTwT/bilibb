/** 直播间状态 */
export declare enum RoomStatus {
    /** 未开播 */
    off = 0,
    /** 正在直播 */
    live = 1,
    /** 正在轮播 */
    round = 2,
    /** 被封禁 */
    banned = -1
}
/** 图片大小 */
export declare enum ImageSize {
    /** 自定义大小 */
    custom = 0,
    /** 小表情(文字行高) */
    small = 1,
    /** 大表情 */
    large = 2
}
/** 弹幕模式 */
export declare enum DanmakuMode {
    left = 1,
    bottom = 4,
    top = 5,
    right = 6
}
/** 用户类型 */
export declare enum UserType {
    /** 普通观众 */
    normal = 0,
    /** 房管 */
    admin = 1,
    /** 主播 */
    anchor = 2
}
