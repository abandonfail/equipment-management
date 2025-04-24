package com.equipmentmanagementsystem.common.constant;

import lombok.Data;

import java.io.Serializable;

@Data
public class DeviceStatusConstant implements Serializable {
    public static final Integer UNUSABLE = 4;

    public static final Integer DELETE = 1;

    // 状态代码常量
    public static final int IN_USE = 0;
    public static final int IDLE = 1;
    public static final int FAULT = 2;
    public static final int UNDER_REPAIR = 3;
    public static final int DISCARDED = 4;
}
