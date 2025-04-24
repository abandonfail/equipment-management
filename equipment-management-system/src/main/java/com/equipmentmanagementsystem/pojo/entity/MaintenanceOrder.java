package com.equipmentmanagementsystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 维修工单表
 * @TableName maintenance_order
 */
@TableName(value ="maintenance_order")
@Data
public class MaintenanceOrder implements Serializable {
    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 设备id
     */
    private Long deviceId;

    /**
     * 报修人Id
     */
    private Long reporterId;

    /**
     * 报修时间
     */
    private Date reportTime;

    /**
     * 故障描述
     */
    private String faultDescription;

    /**
     * 0--待处理，1--处理中，2--已完成，3--无法维修，4--已取消
     */
    private Integer status;

    /**
     * 维修人员Id
     */
    private Long assigneeId;

    /**
     * 维修任务分配时间
     */
    private Date assignTime;

    /**
     * 维修开始时间
     */
    private Date repairStartTime;

    /**
     * 维修结束时间
     */
    private Date repairEndTime;

    /**
     * 维修费用
     */
    private BigDecimal repairCost;

    /**
     * 维修结果说明
     */
    private String repairResult;

    /**
     * 取消原因
     */
    private String cancelReason;

    /**
     * 0--正常  1--删除
     */
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