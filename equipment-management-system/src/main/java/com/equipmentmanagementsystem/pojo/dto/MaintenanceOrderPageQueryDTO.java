package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class MaintenanceOrderPageQueryDTO implements Serializable {
    private int page;

    private int pageSize;

    private Integer userId;

    private Integer status;

}
