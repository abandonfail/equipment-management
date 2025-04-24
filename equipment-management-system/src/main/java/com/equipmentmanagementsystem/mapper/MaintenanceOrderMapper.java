package com.equipmentmanagementsystem.mapper;

import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.MaintenanceOrder;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipmentmanagementsystem.pojo.vo.DeviceVO;
import com.equipmentmanagementsystem.pojo.vo.MaintenanceOrderVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

/**
* @author 陈
* @description 针对表【maintenance_order(维修工单表)】的数据库操作Mapper
* @createDate 2025-04-15 09:44:13
* @Entity com.equipmentmanagementsystem.pojo.entity.MaintenanceOrder
*/
@Mapper
public interface MaintenanceOrderMapper extends BaseMapper<MaintenanceOrder> {

    /**
     * 维修单分页查询
     * @param maintenanceOrderPageQueryDTO
     * @return
     */
    Page<MaintenanceOrderVO> pageQuery(MaintenanceOrderPageQueryDTO maintenanceOrderPageQueryDTO);

    /**
     * 更新信息
     * @param order
     */
    void update(MaintenanceOrder order);
}




