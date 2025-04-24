package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserUpdateDTO implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 昵称
     */
    private String userName;

    /**
     * 账号
     */
    private String userAccount;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 头像
     */
    private String avatarUrl;

    /**
     * 性别
     */
    private Integer gender;

    /**
     * 电话号码
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 0--正常  1--封号/禁用
     */
    private Integer userStatus;

    /**
     * 0--普通用户  1--管理员  2--维修人员
     */
    private Integer userRole;

}