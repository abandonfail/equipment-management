package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DevicePageQueryDTO implements Serializable {
    private int page;

    private int pageSize;

    //设备名称
    private String name;

    //型号
    private String model;

    //分类名称
    private Long categoryName;

    //状态
    private String status;

    //分类id
    private Long categoryId;

    //位置id
    private Long locationId;

}
