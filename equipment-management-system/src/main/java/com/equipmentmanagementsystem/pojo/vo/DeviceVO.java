package com.equipmentmanagementsystem.pojo.vo;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;


@Data
public class DeviceVO implements Serializable {

    private Long id;

    private String name;

    private String imageUrl;

    private String model;

    private String serialNumber;

    private Integer warrantyPeriod;

    private Integer status;

    private String description;

    private Date lastMaintenanceTime;

    private Date nextMaintenanceTime;

    private Date discardTime;

    private Integer isDelete;

    private Date createTime;

    private Date updateTime;

    private String categoryName;

    private String maintainerName;

    private String locationName;

}