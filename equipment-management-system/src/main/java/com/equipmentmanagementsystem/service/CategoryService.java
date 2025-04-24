package com.equipmentmanagementsystem.service;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.CategoryDTO;
import com.equipmentmanagementsystem.pojo.dto.CategoryPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Category;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipmentmanagementsystem.pojo.vo.AllCategoryVO;

import java.util.List;

/**
* @author 陈
* @description 针对表【category(分类表)】的数据库操作Service
* @createDate 2025-04-15 09:45:31
*/
public interface CategoryService extends IService<Category> {
    /**
     *分页查询
     * @param categoryPageQueryDTO
     * @return
     */
    PageResult pageQuery(CategoryPageQueryDTO categoryPageQueryDTO);

    /**
     * 根据id删除分类
     * @param id
     * @param userId
     */
    void deleteById(Long id,Long userId);

    /**
     * 修改分类信息
     * @param categoryDTO
     */
    void update(CategoryDTO categoryDTO);

    /**
     * 获取所有分类
     * @return
     */
    List<AllCategoryVO> getAllCategory();
}
