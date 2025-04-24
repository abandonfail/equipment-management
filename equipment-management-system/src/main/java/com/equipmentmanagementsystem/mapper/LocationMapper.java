package com.equipmentmanagementsystem.mapper;

import com.equipmentmanagementsystem.pojo.dto.LocationPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Location;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipmentmanagementsystem.pojo.vo.AllLocationVO;
import com.equipmentmanagementsystem.pojo.vo.LocationVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author 陈
* @description 针对表【location(位置表)】的数据库操作Mapper
* @createDate 2025-04-15 20:45:28
* @Entity com.equipmentmanagementsystem.pojo.entity.Location
*/
@Mapper
public interface LocationMapper extends BaseMapper<Location> {
    /**
     * 修改位置信息
     * @param location
     */
    void update(Location location);

    /**
     * 分页查询
     * @param locationPageQueryDTO
     * @return
     */
    Page<LocationVO> pageQuery(LocationPageQueryDTO locationPageQueryDTO);

    /**
     * 获取所有位置
     * @return
     */
    List<AllLocationVO> getAllLocation();
}




