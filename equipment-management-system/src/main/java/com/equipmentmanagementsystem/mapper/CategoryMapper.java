package com.equipmentmanagementsystem.mapper;

import com.equipmentmanagementsystem.pojo.dto.CategoryPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Category;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipmentmanagementsystem.pojo.vo.AllCategoryVO;
import com.equipmentmanagementsystem.pojo.vo.CategoryVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author 陈
* @description 针对表【category(分类表)】的数据库操作Mapper
* @createDate 2025-04-15 09:45:31
* @Entity com.equipmentmanagementsystem.pojo.entity.Category
*/
@Mapper
public interface CategoryMapper extends BaseMapper<Category> {

    /**
     * 分页查询
     * @param categoryPageQueryDTO
     * @return
     */
    Page<CategoryVO> pageQuery(CategoryPageQueryDTO categoryPageQueryDTO);

    /**
     * 修改分类信息
     * @param category
     */
    void update(Category category);

    /**
     * 获取所有分类
     * @return
     */
    List<AllCategoryVO> getAllCategory();
}




