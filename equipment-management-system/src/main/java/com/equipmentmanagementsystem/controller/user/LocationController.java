package com.equipmentmanagementsystem.controller.user;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.LocationDTO;
import com.equipmentmanagementsystem.pojo.dto.LocationPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Location;
import com.equipmentmanagementsystem.pojo.vo.AllCategoryVO;
import com.equipmentmanagementsystem.pojo.vo.AllLocationVO;
import com.equipmentmanagementsystem.service.LocationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/location")
@Slf4j
public class LocationController {
    @Autowired
    private LocationService locationService;

    /**
     * 新增位置
     * @param locationDTO
     * @return
     */
    @PostMapping
    public Result save(@RequestBody LocationDTO locationDTO){
        log.info("新增位置：{}",locationDTO);
        Location location = new Location();
        BeanUtils.copyProperties(locationDTO,location);
        locationService.save(location);
        return Result.success();
    }

    /**
     * 修改位置
     * @param locationDTO
     * @return
     */
    @PutMapping
    public Result updateLocation(@RequestBody LocationDTO locationDTO){
        log.info("修改信息：{}", locationDTO);
        locationService.update(locationDTO);
        return Result.success();
    }

    /**
     * 删除位置
     * @param id
     * @return
     */
    @GetMapping("/delete/{id}")
    public Result deleteByLocationId(@PathVariable Long id){
        locationService.deleteByLocationId(id);
        return Result.success();
    }

    /**
     * 位置分页查询
     * @param locationPageQueryDTO
     * @return
     */
    @GetMapping("/pageOfLocation")
    public Result<PageResult> pageOfLocation(LocationPageQueryDTO locationPageQueryDTO){
        log.info("位置分页查询：{}",locationPageQueryDTO);
        PageResult pageResult = locationService.pageQuery(locationPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 获取所有分类
     * @return
     */
    @GetMapping("/all")
    public Result<List<AllLocationVO>> getAllLocation(){
        return Result.success(locationService.getAllLocation());
    }

}
