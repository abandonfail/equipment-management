package com.equipmentmanagementsystem.pojo.vo;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserLoginVO implements Serializable {
    //id
    private Long id;

    //昵称
    private String userName;

    //账户
    private String userAccount;

    //权限
    private Integer userRole;

    //头像
    private String avatarUrl;

    //创建时间
    private Date createTime;

    //更新时间
    private Date updateTime;

}
