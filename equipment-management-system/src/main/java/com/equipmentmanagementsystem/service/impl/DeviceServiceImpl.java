package com.equipmentmanagementsystem.service.impl;

import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipmentmanagementsystem.common.constant.DeviceStatusConstant;
import com.equipmentmanagementsystem.common.constant.MessageConstant;
import com.equipmentmanagementsystem.common.constant.UserStatusConstant;
import com.equipmentmanagementsystem.common.exception.BaseException;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.mapper.MaintenanceOrderMapper;
import com.equipmentmanagementsystem.mapper.UserMapper;
import com.equipmentmanagementsystem.pojo.dto.DeviceChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.DeviceDTO;
import com.equipmentmanagementsystem.pojo.dto.DevicePageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Device;
import com.equipmentmanagementsystem.pojo.entity.MaintenanceOrder;
import com.equipmentmanagementsystem.pojo.entity.User;
import com.equipmentmanagementsystem.pojo.vo.DeviceVO;
import com.equipmentmanagementsystem.service.DeviceService;
import com.equipmentmanagementsystem.mapper.DeviceMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
* @author 陈
* @description 针对表【device(设备表)】的数据库操作Service实现
* @createDate 2025-03-28 15:28:47
*/
@Service
public class DeviceServiceImpl extends ServiceImpl<DeviceMapper, Device>
    implements DeviceService{
    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MaintenanceOrderMapper maintenanceOrderMapper;
    /**
     * 添加设备
     * @param deviceDTO
     */
    public void add(DeviceDTO deviceDTO) {
        Device device = new Device();

        BeanUtils.copyProperties(deviceDTO,device);
        device.setCategoryId(deviceDTO.getCategoryName());
        device.setMaintainerId(deviceDTO.getMaintainerName());
        device.setLocationId(deviceDTO.getLocationName());
        deviceMapper.insert(device);
    }

    /**
     * 分页查询
     * @param devicePageQueryDTO
     * @return
     */
    public PageResult pageQuery(DevicePageQueryDTO devicePageQueryDTO) {
        PageHelper.startPage(devicePageQueryDTO.getPage(),devicePageQueryDTO.getPageSize());
        Page<DeviceVO> page = deviceMapper.pageQuery(devicePageQueryDTO);
        long total = page.getTotal();
        List<DeviceVO> records = page.getResult();
        return new PageResult(total,records);
    }

    /**
     * 修改设备信息
     * @param deviceDTO
     */
    public void update(DeviceDTO deviceDTO) {
        Device device = new Device();

        BeanUtils.copyProperties(deviceDTO,device);

        if (device.getStatus() == DeviceStatusConstant.UNUSABLE){
            device.setDiscardTime(new Date());
        }
        device.setCategoryId(deviceDTO.getCategoryName());
        device.setLocationId(deviceDTO.getLocationName());
        device.setUpdateTime(new Date());

        deviceMapper.update(device);
    }

    /**
     * 根据id删除设备
     * @param id
     */
    public void delete(Long id) {
        Device device = new Device();
        device.setId(id);
        device.setIsDelete(DeviceStatusConstant.DELETE);
        deviceMapper.update(device);
    }

    /**
     * 变更设备状态
     * @param deviceChangeStatusDTO
     */
    @Transactional
    public void changeStatus(DeviceChangeStatusDTO deviceChangeStatusDTO) {
        // 1. 判断设备是否存在
        Device device = deviceMapper.selectById(deviceChangeStatusDTO.getId());
        if (device == null || device.getIsDelete() == 1){
            throw new BaseException(MessageConstant.NOT_FOUND_ERROR);
        }

        // 2. 校验状态合法性
        Integer currentStatus = device.getStatus();
        Integer targetStatus = deviceChangeStatusDTO.getStatus();

        // 2.1 检查目标状态范围
        if (targetStatus < 0 || targetStatus > 4) {
            throw new BaseException(MessageConstant.PARAMS_ERROR);
        }

        // 2.2. 判断状态是否符合
        if (!canTransition(currentStatus,targetStatus)){
            throw new BaseException(MessageConstant.STATUS_ERROR);
        }

        // 3. 更新设备状态及相关字段
        device.setStatus(targetStatus);
        device.setUpdateTime(new Date());

        // 4. 特殊状态处理
        if (targetStatus == DeviceStatusConstant.DISCARDED){
            device.setDiscardTime(new Date());
            device.setMaintainerId(null);
        } else if (targetStatus == DeviceStatusConstant.UNDER_REPAIR) {
            device.setLastMaintenanceTime(new Date());
        }

        // 5. 触发相关业务
        if (targetStatus == DeviceStatusConstant.FAULT){
            //获取所有维修人员
            List<Long> maintainerIds = userMapper.selectByRole(UserStatusConstant.MAINTAINER);

            //校验维修人员存在性
            if (CollectionUtils.isEmpty(maintainerIds)) {
                throw new BaseException(MessageConstant.NOT_PEOPLE);
            }

            //随机分配维修人员
            Long maintainerId = randomSelectMaintainer(maintainerIds);
            //TODO 消息通知待完成
            device.setMaintainerId(maintainerId);

            //生成维修工单
            MaintenanceOrder maintenanceOrder = new MaintenanceOrder();
            maintenanceOrder.setDeviceId(deviceChangeStatusDTO.getId());
            maintenanceOrder.setReporterId(deviceChangeStatusDTO.getUserId());
            maintenanceOrder.setFaultDescription(deviceChangeStatusDTO.getFaultDescription());
            maintenanceOrder.setAssigneeId(maintainerId);
            // 创建一个表示当前时间的 Date 对象
            Date currentDate = new Date();
            // 获取 Calendar 实例
            Calendar calendar = Calendar.getInstance();
            // 将 Calendar 的时间设置为当前时间
            calendar.setTime(currentDate);
            // 增加 3 天
            calendar.add(Calendar.DAY_OF_YEAR, 3);
            // 获取增加 3 天后的 Date 对象
            Date newDate = calendar.getTime();
            maintenanceOrder.setAssignTime(newDate);
            maintenanceOrderMapper.insert(maintenanceOrder);
        }

        // 6. 执行更新
        deviceMapper.update(device);


    }

    // 状态转移校验工具类
    public static boolean canTransition(int currentState, int targetState) {
        boolean canChange = false;
        switch (currentState) {
            case DeviceStatusConstant.IN_USE: // 在用
                canChange = (targetState == DeviceStatusConstant.IDLE || targetState == DeviceStatusConstant.FAULT || targetState == DeviceStatusConstant.DISCARDED);
                break;
            case DeviceStatusConstant.IDLE: // 闲置
                canChange = (targetState == DeviceStatusConstant.IN_USE || targetState == DeviceStatusConstant.FAULT || targetState == DeviceStatusConstant.DISCARDED);
                break;
            case DeviceStatusConstant.FAULT: // 故障
                canChange = (targetState == DeviceStatusConstant.UNDER_REPAIR || targetState == DeviceStatusConstant.DISCARDED);
                break;
            case DeviceStatusConstant.UNDER_REPAIR: // 维修中
                canChange = (targetState == DeviceStatusConstant.IN_USE || targetState == DeviceStatusConstant.IDLE || targetState == DeviceStatusConstant.DISCARDED);
                break;
            case DeviceStatusConstant.DISCARDED: // 报废
                canChange = false;
        }
        return canChange;
    }

    /**
     * 公平随机选择算法
     * @param maintainerIds 候选维修人员ID列表
     * @return 被选中的维修人员ID
     */
    private Long randomSelectMaintainer(List<Long> maintainerIds) {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        return maintainerIds.get(random.nextInt(maintainerIds.size()));
    }
}




