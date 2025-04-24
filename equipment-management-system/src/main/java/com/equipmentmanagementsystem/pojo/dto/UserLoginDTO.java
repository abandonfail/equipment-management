package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class UserLoginDTO implements Serializable {
    //账户
    private String userAccount;

    //密码
    private String userPassword;
}
