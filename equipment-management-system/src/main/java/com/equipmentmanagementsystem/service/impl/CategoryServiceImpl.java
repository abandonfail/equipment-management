package com.equipmentmanagementsystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipmentmanagementsystem.common.constant.CategoryStatusConstant;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.CategoryDTO;
import com.equipmentmanagementsystem.pojo.dto.CategoryPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Category;
import com.equipmentmanagementsystem.pojo.vo.AllCategoryVO;
import com.equipmentmanagementsystem.pojo.vo.CategoryVO;
import com.equipmentmanagementsystem.service.CategoryService;
import com.equipmentmanagementsystem.mapper.CategoryMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
* @author 陈
* @description 针对表【category(分类表)】的数据库操作Service实现
* @createDate 2025-04-15 09:45:31
*/
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category>
    implements CategoryService{
    @Autowired
    private CategoryMapper categoryMapper;

    /**
     * 分页查询
     * @param categoryPageQueryDTO
     * @return
     */
    public PageResult pageQuery(CategoryPageQueryDTO categoryPageQueryDTO) {
        PageHelper.startPage(categoryPageQueryDTO.getPage(),categoryPageQueryDTO.getPageSize());
        //下一条sql进行分页，自动加入limit关键字分页
        Page<CategoryVO> page = categoryMapper.pageQuery(categoryPageQueryDTO);
        return new PageResult(page.getTotal(), page.getResult());
    }

    /**
     * 根据id删除分类
     * @param id
     * @param userId
     */
    public void deleteById(Long id,Long userId) {
        Category category = new Category();
        category.setId(id);
        category.setIsDelete(CategoryStatusConstant.DELETE);
        category.setUpdateUser(userId);
        categoryMapper.update(category);
    }

    /**
     * 修改分类信息
     * @param categoryDTO
     */
    public void update(CategoryDTO categoryDTO) {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO,category);
        category.setUpdateTime(new Date());
        categoryMapper.update(category);
    }

    /**
     * 获取所有分类
     * @return
     */
    public List<AllCategoryVO> getAllCategory() {

        return categoryMapper.getAllCategory();
    }
}




