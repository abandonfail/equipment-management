package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class MaintenanceOrderChangeStatusDTO implements Serializable {

    private Long id;

    private Integer status;

    private BigDecimal repairCost;

    private String cancelReason;

    private String repairResult;

}
