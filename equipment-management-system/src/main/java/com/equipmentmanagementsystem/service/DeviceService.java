package com.equipmentmanagementsystem.service;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.pojo.dto.DeviceChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.DeviceDTO;
import com.equipmentmanagementsystem.pojo.dto.DevicePageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Device;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 陈
* @description 针对表【device(设备表)】的数据库操作Service
* @createDate 2025-03-28 15:28:47
*/
public interface DeviceService extends IService<Device> {

    /**
     * 添加设备
     * @param deviceDTO
     */
    void add(DeviceDTO deviceDTO);

    /**
     * 设备分页查询
     * @param devicePageQueryDTO
     * @return
     */
    PageResult pageQuery(DevicePageQueryDTO devicePageQueryDTO);

    /**
     * 修改设备信息
     * @param deviceDTO
     */
    void update(DeviceDTO deviceDTO);

    /**
     * 根据id删除设备
     * @param id
     */
    void delete(Long id);

    /**
     * 变更设备状态
     * @param deviceChangeStatusDTO
     */
    void changeStatus(DeviceChangeStatusDTO deviceChangeStatusDTO);
}
