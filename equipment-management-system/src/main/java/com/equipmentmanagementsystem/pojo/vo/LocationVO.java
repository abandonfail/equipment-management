package com.equipmentmanagementsystem.pojo.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class LocationVO implements Serializable {
    private Long id;

    private String name;

    private Integer type;

    private String description;

    private Date createTime;

    private Date updateTime;
}
