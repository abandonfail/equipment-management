package com.equipmentmanagementsystem.service;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.MaintenanceOrder;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 陈
* @description 针对表【maintenance_order(维修工单表)】的数据库操作Service
* @createDate 2025-04-15 09:44:13
*/
public interface MaintenanceOrderService extends IService<MaintenanceOrder> {

    /**
     * 维修单分页查询
     * @param maintenanceOrderPageQueryDTO
     * @return
     */
    PageResult pageOfMaintenanceOrder(MaintenanceOrderPageQueryDTO maintenanceOrderPageQueryDTO);

    /**
     * 修改维修状态
     * @param maintenanceOrderChangeStatusDTO
     */
    void changeStatus(MaintenanceOrderChangeStatusDTO maintenanceOrderChangeStatusDTO);
}
