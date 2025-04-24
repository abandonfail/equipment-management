package com.equipmentmanagementsystem.controller.user;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.DeviceChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderChangeStatusDTO;
import com.equipmentmanagementsystem.pojo.dto.MaintenanceOrderPageQueryDTO;
import com.equipmentmanagementsystem.service.MaintenanceOrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/maintenanceOrder")
@Slf4j
public class MaintenanceOrderController {
    @Autowired
    private MaintenanceOrderService maintenanceOrderService;

    /**
     * 维修单分页查询
     * @param maintenanceOrderPageQueryDTO
     * @return
     */
    @GetMapping("/page")
    public Result<PageResult> pageOfMaintenanceOrder(MaintenanceOrderPageQueryDTO maintenanceOrderPageQueryDTO){
        log.info("维修单分页查询：{}",maintenanceOrderPageQueryDTO);
        PageResult pageResult = maintenanceOrderService.pageOfMaintenanceOrder(maintenanceOrderPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 变更状态
     * @return
     */
    @PostMapping("/updateStatus")
    public Result changeStatus(@RequestBody MaintenanceOrderChangeStatusDTO maintenanceOrderChangeStatusDTO){
        maintenanceOrderService.changeStatus(maintenanceOrderChangeStatusDTO);
        return Result.success();
    }
}
