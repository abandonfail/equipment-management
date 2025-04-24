package com.equipmentmanagementsystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 位置表
 * @TableName location
 */
@TableName(value ="location")
@Data
public class Location implements Serializable {
    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 位置名称
     */
    private String name;

    /**
     * 0--厂区，1--车间，2--仓库，3--办公室，4--其他
     */
    private Integer type;

    /**
     * 描述
     */
    private String description;

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