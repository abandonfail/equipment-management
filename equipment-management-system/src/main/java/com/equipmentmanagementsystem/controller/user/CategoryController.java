package com.equipmentmanagementsystem.controller.user;

import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.CategoryDTO;
import com.equipmentmanagementsystem.pojo.dto.CategoryPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.Category;
import com.equipmentmanagementsystem.pojo.vo.AllCategoryVO;
import com.equipmentmanagementsystem.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/category")
@Slf4j
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    /**
     * 新增分类
     * @param categoryDTO
     * @return
     */
    @PostMapping
    public Result save(@RequestBody CategoryDTO categoryDTO){
        log.info("新增分类：{}",categoryDTO);
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO,category);
        categoryService.save(category);
        return Result.success();
    }

    /**
     * 分类分页查询
     * @param categoryPageQueryDTO
     * @return
     */
    @GetMapping("/page")
    public Result<PageResult> page(CategoryPageQueryDTO categoryPageQueryDTO){
        log.info("分页查询：{}", categoryPageQueryDTO);
        PageResult pageResult = categoryService.pageQuery(categoryPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 删除分类
     * @param id
     * @param userId
     * @return
     */
    @GetMapping("/delete/{id}")
    public Result<String> deleteById(@PathVariable("id") Long id,@RequestParam("userId") Long userId){
        log.info("删除分类：{},{}", id,userId);
        categoryService.deleteById(id,userId);
        return Result.success();
    }

    /**
     * 修改分类
     * @param categoryDTO
     * @return
     */
    @PutMapping
    public Result<String> update(@RequestBody CategoryDTO categoryDTO){
        log.info("修改信息：{}", categoryDTO);
        categoryService.update(categoryDTO);
        return Result.success();
    }

    /**
     * 获取所有分类
     * @return
     */
    @GetMapping("/all")
    public Result<List<AllCategoryVO>> getAllCategory(){
        return Result.success(categoryService.getAllCategory());
    }

}
