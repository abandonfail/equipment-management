package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRegisterDTO implements Serializable {
    //用户名
//    private String userName;

    //账号
    private String userAccount;

    //密码
    private String userPassword;

    //确认密码
    private String checkPassword;

    //手机号
//    private String phone;

    //用户角色
    private int userRole;
}
