package com.equipmentmanagementsystem.mapper;

import com.equipmentmanagementsystem.pojo.dto.DevicePageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Device;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipmentmanagementsystem.pojo.vo.DeviceVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

/**
* @author 陈
* @description 针对表【device(设备表)】的数据库操作Mapper
* @createDate 2025-03-28 15:28:47
* @Entity com.equipmentmanagementsystem.pojo.entity.Device
*/
@Mapper
public interface DeviceMapper extends BaseMapper<Device> {
    /**
     * 分页查询
     * @param devicePageQueryDTO
     * @return
     */
    Page<DeviceVO> pageQuery(DevicePageQueryDTO devicePageQueryDTO);

    /**
     * 修改设备信息
     * @param device
     */
    void update(Device device);
}




