package com.equipmentmanagementsystem.controller.user;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.DeviceChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.DeviceDTO;
import com.equipmentmanagementsystem.pojo.dto.DevicePageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Device;
import com.equipmentmanagementsystem.service.DeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController("userDeviceController")
@RequestMapping("/user/device")
@Slf4j
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    /**
     * 添加设备
     * @param deviceDTO
     * @return
     */
    @PostMapping("/add")
    public Result add(@RequestBody DeviceDTO deviceDTO){
        log.info("添加设备信息：{}",deviceDTO);
        deviceService.add(deviceDTO);
        return Result.success();
    }

    /**
     * 根据id获取设备信息
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Result<Device> getById(@PathVariable Long id){
        Device device = deviceService.getById(id);
        return Result.success(device);
    }

    /**
     * 设备分页查询
     * @param devicePageQueryDTO
     * @return
     */
    @GetMapping("/page")
    public Result<PageResult> page(DevicePageQueryDTO devicePageQueryDTO){
        log.info("设备分页查询：{}",devicePageQueryDTO);
        PageResult pageResult = deviceService.pageQuery(devicePageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 修改设备信息
     * @param deviceDTO
     * @return
     */
    @PutMapping
    public Result update(@RequestBody DeviceDTO deviceDTO){
        log.info("设备修改信息: {}",deviceDTO);
        deviceService.update(deviceDTO);
        return Result.success();
    }

    /**
     * 删除设备
     * @param id
     * @return
     */
    @GetMapping("/delete/{id}")
    public Result delete(@PathVariable Long id){
        deviceService.delete(id);
        return Result.success();
    }

    /**
     * 变更状态
     * @return
     */
    @PostMapping("/updateStatus")
    public Result changeStatus(@RequestBody DeviceChangeStatusDTO deviceChangeStatusDTO){
        deviceService.changeStatus(deviceChangeStatusDTO);
        return Result.success();
    }
}
