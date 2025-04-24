package com.equipmentmanagementsystem.pojo.dto;

import com.equipmentmanagementsystem.common.constant.UserStatusConstant;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserPageQueryDTO implements Serializable {

    //用户昵称
    private String userName;

    //用户账号
    private String userAccount;

    //用户状态
    private int userStatus;

    //用户权限
    private String userRole;

    //页码
    private int page;

    //每页显示记录数
    private int pageSize;
}
