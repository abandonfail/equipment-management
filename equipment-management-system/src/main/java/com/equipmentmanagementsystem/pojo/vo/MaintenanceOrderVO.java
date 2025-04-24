package com.equipmentmanagementsystem.pojo.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class MaintenanceOrderVO implements Serializable {
    private Long id;

    private String deviceName;

    private String reporterName;

    private Date reportTime;

    private String faultDescription;

    private Integer status;

    private String assigneeName;

    private Date assignTime;

    private Date repairStartTime;

    private Date repairEndTime;

    private Double repairCost;

    private String repairResult;

    private String cancelReason;

    private Integer isDelete;

    private Date createTime;

    private Date updateTime;
}
