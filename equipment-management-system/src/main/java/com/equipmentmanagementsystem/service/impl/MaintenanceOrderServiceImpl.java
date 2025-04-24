package com.equipmentmanagementsystem.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipmentmanagementsystem.common.constant.DeviceStatusConstant;
import com.equipmentmanagementsystem.common.constant.MaintenanceOrderStatusConstant;
import com.equipmentmanagementsystem.common.constant.MessageConstant;
import com.equipmentmanagementsystem.common.exception.BaseException;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.mapper.DeviceMapper;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Device;
import com.equipmentmanagementsystem.pojo.entity.MaintenanceOrder;
import com.equipmentmanagementsystem.pojo.vo.DeviceVO;
import com.equipmentmanagementsystem.pojo.vo.MaintenanceOrderVO;
import com.equipmentmanagementsystem.service.MaintenanceOrderService;
import com.equipmentmanagementsystem.mapper.MaintenanceOrderMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
* @author 陈
* @description 针对表【maintenance_order(维修工单表)】的数据库操作Service实现
* @createDate 2025-04-15 09:44:12
*/
@Service
public class MaintenanceOrderServiceImpl extends ServiceImpl<MaintenanceOrderMapper, MaintenanceOrder>
    implements MaintenanceOrderService{
    @Autowired
    private MaintenanceOrderMapper maintenanceOrderMapper;

    @Autowired
    private DeviceMapper deviceMapper;

    /**
     * 维修单分页查询
     * @param maintenanceOrderPageQueryDTO
     * @return
     */
    public PageResult pageOfMaintenanceOrder(MaintenanceOrderPageQueryDTO maintenanceOrderPageQueryDTO) {
        PageHelper.startPage(maintenanceOrderPageQueryDTO.getPage(),maintenanceOrderPageQueryDTO.getPageSize());
        Page<MaintenanceOrderVO> page = maintenanceOrderMapper.pageQuery(maintenanceOrderPageQueryDTO);
        long total = page.getTotal();
        List<MaintenanceOrderVO> records = page.getResult();
        return new PageResult(total,records);
    }

    /**
     * 修改维修状态
     * @param maintenanceOrderChangeStatusDTO
     */
    public void changeStatus(MaintenanceOrderChangeStatusDTO maintenanceOrderChangeStatusDTO) {
        MaintenanceOrder order = maintenanceOrderMapper.selectById(maintenanceOrderChangeStatusDTO.getId());
        //检查工单是否存在
        if (order == null || order.getIsDelete() == MaintenanceOrderStatusConstant.DELETE) {
            throw new BaseException(MessageConstant.MO_NULL);
        }

        Integer currentStatus = order.getStatus();
        Integer newStatus = maintenanceOrderChangeStatusDTO.getStatus();

        // 合法状态变更判断
        if (currentStatus == MaintenanceOrderStatusConstant.PENDING && (newStatus == MaintenanceOrderStatusConstant.IN_PROGRESS || newStatus == MaintenanceOrderStatusConstant.CANCELLED)) {
            // 待处理 → 处理中 或 取消
            if (newStatus == MaintenanceOrderStatusConstant.CANCELLED){
                order.setCancelReason(maintenanceOrderChangeStatusDTO.getCancelReason());
            }
            order.setRepairStartTime(new Date());
        } else if (currentStatus == MaintenanceOrderStatusConstant.IN_PROGRESS && (newStatus == MaintenanceOrderStatusConstant.COMPLETED || newStatus == MaintenanceOrderStatusConstant.UNREPAIRABLE)) {
            // 处理中 → 已完成 或 无法维修
            if (newStatus == MaintenanceOrderStatusConstant.UNREPAIRABLE){
                order.setRepairResult(maintenanceOrderChangeStatusDTO.getRepairResult());
                order.setRepairEndTime(new Date());
            }
            order.setRepairCost(maintenanceOrderChangeStatusDTO.getRepairCost());
            order.setRepairEndTime(new Date());

        } else {
            throw new BaseException(MessageConstant.MO_STATUS_ERROR);
        }
        order.setStatus(newStatus);
        order.setUpdateTime(new Date());

        maintenanceOrderMapper.update(order);


        // 同步更新设备状态
        Long deviceId = order.getDeviceId();
        if (deviceId != null) {
            Device device = deviceMapper.selectById(deviceId);
            if (device != null) {
                if (newStatus == MaintenanceOrderStatusConstant.COMPLETED){
                    device.setLastMaintenanceTime(new Date());
                }
                int deviceStatus = mapDeviceStatusFromOrder(maintenanceOrderChangeStatusDTO.getStatus());
                device.setStatus(deviceStatus);
                device.setUpdateTime(new Date());
                deviceMapper.update(device);
            }
        }
    }

    private int mapDeviceStatusFromOrder(int orderStatus) {
        switch (orderStatus) {
            case MaintenanceOrderStatusConstant.PENDING: return DeviceStatusConstant.FAULT; // 故障
            case MaintenanceOrderStatusConstant.IN_PROGRESS: return DeviceStatusConstant.UNDER_REPAIR; // 维修中
            case MaintenanceOrderStatusConstant.COMPLETED: return DeviceStatusConstant.IN_USE; // 在用
            case MaintenanceOrderStatusConstant.UNREPAIRABLE: return DeviceStatusConstant.DISCARDED; // 报废
            case MaintenanceOrderStatusConstant.CANCELLED: return DeviceStatusConstant.FAULT; // 故障
            default: return DeviceStatusConstant.IDLE; // 默认闲置
        }
    }
}




