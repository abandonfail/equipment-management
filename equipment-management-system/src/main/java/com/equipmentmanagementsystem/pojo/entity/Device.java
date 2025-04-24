package com.equipmentmanagementsystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 设备表
 * @TableName device
 */
@TableName(value ="device")
@Data
public class Device implements Serializable {
    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 设备名称
     */
    private String name;

    /**
     * 设备图片
     */
    private String imageUrl;

    /**
     * 型号
     */
    private String model;

    /**
     * 设备序列号
     */
    private String serialNumber;

    /**
     * 保修期(月)
     */
    private Integer warrantyPeriod;

    /**
     * 分类ID
     */
    private Long categoryId;

    /**
     * 0--在用  1--闲置  2--故障  3--维修中  4--报废
     */
    private Integer status;

    /**
     * 维修人员ID
     */
    private Long maintainerId;

    /**
     * 当前位置ID
     */
    private Long locationId;

    /**
     * 详细信息
     */
    private String description;

    /**
     * 上次维护时间
     */
    private Date lastMaintenanceTime;

    /**
     * 下次维护时间
     */
    private Date nextMaintenanceTime;

    /**
     * 设备报废时间
     */
    private Date discardTime;

    /**
     * 0--正常  1--删除
     */
    @TableLogic
    private Integer isDelete;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}