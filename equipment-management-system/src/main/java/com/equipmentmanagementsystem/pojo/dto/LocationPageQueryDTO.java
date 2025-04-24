package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LocationPageQueryDTO implements Serializable {
    private int page;

    private int pageSize;

    //位置名称
    private String name;

    //类型
    private Integer type;

}
