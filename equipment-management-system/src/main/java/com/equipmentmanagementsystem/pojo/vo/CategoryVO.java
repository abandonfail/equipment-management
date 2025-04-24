package com.equipmentmanagementsystem.pojo.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class CategoryVO implements Serializable {
    private Long id;

    private String name;

    private String description;

    private String createUserName;

    private String updateUserName;

    private Date createTime;

    private Date updateTime;
}
