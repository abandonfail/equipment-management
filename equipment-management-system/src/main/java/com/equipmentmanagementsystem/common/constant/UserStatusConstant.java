package com.equipmentmanagementsystem.common.constant;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserStatusConstant implements Serializable {
    //正常
    public static final Integer ABLE = 0;

    //封号
    public static final Integer DISABLE = 1;

    //删除
    public static final Integer DELETE = 1;

    public static final Integer  MAINTAINER = 2;

    /**
     * 用户登录态键
     */
    public static final String USER_LOGIN_STATE = "user_login";


}
