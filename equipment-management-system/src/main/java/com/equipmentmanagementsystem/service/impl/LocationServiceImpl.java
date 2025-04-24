package com.equipmentmanagementsystem.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipmentmanagementsystem.common.constant.LocationStatusConstant;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.pojo.dto.LocationDTO;
import com.equipmentmanagementsystem.pojo.dto.LocationPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Location;
import com.equipmentmanagementsystem.pojo.vo.AllLocationVO;
import com.equipmentmanagementsystem.pojo.vo.LocationVO;
import com.equipmentmanagementsystem.service.LocationService;
import com.equipmentmanagementsystem.mapper.LocationMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
* @author 陈
* @description 针对表【location(位置表)】的数据库操作Service实现
* @createDate 2025-04-15 20:45:28
*/
@Service
public class LocationServiceImpl extends ServiceImpl<LocationMapper, Location>
    implements LocationService{
    @Autowired
    private LocationMapper locationMapper;

    /**
     * 修改位置信息
     * @param locationDTO
     */
    public void update(LocationDTO locationDTO) {
        Location location = new Location();
        BeanUtils.copyProperties(locationDTO,location);
        location.setUpdateTime(new Date());
        locationMapper.update(location);
    }

    /**
     * 根据位置id删除位置
     * @param id
     */
    public void deleteByLocationId(Long id) {
        Location location = new Location();
        location.setId(id);
        location.setIsDelete(LocationStatusConstant.DELETE);
        locationMapper.update(location);
    }

    /**
     * 分页查询
     * @param locationPageQueryDTO
     * @return
     */
    public PageResult pageQuery(LocationPageQueryDTO locationPageQueryDTO) {
        PageHelper.startPage(locationPageQueryDTO.getPage(),locationPageQueryDTO.getPageSize());
        Page<LocationVO> page = locationMapper.pageQuery(locationPageQueryDTO);
        long total = page.getTotal();
        List<LocationVO> records = page.getResult();
        return new PageResult(total,records);
    }

    /**
     * 获取所有位置
     * @return
     */
    public List<AllLocationVO> getAllLocation() {
        return locationMapper.getAllLocation();
    }
}




