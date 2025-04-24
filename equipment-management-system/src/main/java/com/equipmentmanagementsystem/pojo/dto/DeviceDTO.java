package com.equipmentmanagementsystem.pojo.dto;

import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

@Data
public class DeviceDTO implements Serializable {
    private Long id;

    private String name;

    private String imageUrl;

    private String model;

    private String serialNumber;

    private Integer warrantyPeriod;

    private Long categoryName;

    private Integer status;

    private Long maintainerName;

    private Long locationName;

    private String description;

    private Date lastMaintenanceTime;

    private Date nextMaintenanceTime;

    private Date discardTime;

    private Date updateTime;

}
