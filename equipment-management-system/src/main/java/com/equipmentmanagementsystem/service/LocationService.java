package com.equipmentmanagementsystem.service;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.pojo.dto.LocationDTO;
import com.equipmentmanagementsystem.pojo.dto.LocationPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Location;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipmentmanagementsystem.pojo.vo.AllLocationVO;

import java.util.List;

/**
* @author 陈
* @description 针对表【location(位置表)】的数据库操作Service
* @createDate 2025-04-15 20:45:28
*/
public interface LocationService extends IService<Location> {
    /**
     * 修改位置信息
     * @param locationDTO
     */
    void update(LocationDTO locationDTO);

    /**
     * 删除位置
     * @param id
     */
    void deleteByLocationId(Long id);

    /**
     * 分页查询
     * @param locationPageQueryDTO
     * @return
     */
    PageResult pageQuery(LocationPageQueryDTO locationPageQueryDTO);

    /**
     * 获取所有位置
     * @return
     */
    List<AllLocationVO> getAllLocation();
}
