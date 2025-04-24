package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class DeviceChangeStatusDTO implements Serializable {

    private Long id;

    private Long userId;

    private Integer status;

    private String faultDescription;

}
