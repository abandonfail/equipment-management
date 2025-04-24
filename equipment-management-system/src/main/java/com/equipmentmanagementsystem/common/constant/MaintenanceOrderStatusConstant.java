package com.equipmentmanagementsystem.common.constant;

import lombok.Data;

import java.io.Serializable;

@Data
public class MaintenanceOrderStatusConstant implements Serializable {
    public static final Integer UNUSABLE = 4;

    public static final Integer DELETE = 1;

    // 状态代码常量
    /** 待处理 */
    public static final int PENDING = 0;

    /** 处理中 */
    public static final int IN_PROGRESS = 1;

    /** 已完成 */
    public static final int COMPLETED = 2;

    /** 无法维修 */
    public static final int UNREPAIRABLE = 3;

    /** 已取消 */
    public static final int CANCELLED = 4;
}
