package com.equipmentmanagementsystem.controller.admin;

import com.equipmentmanagementsystem.common.constant.MessageConstant;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.UserPageQueryDTO;
import com.equipmentmanagementsystem.pojo.dto.UserRegisterDTO;
import com.equipmentmanagementsystem.pojo.entity.User;
import com.equipmentmanagementsystem.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController("adminUserController")
@RequestMapping("/admin/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 添加用户
     * @param userRegisterDTO 用户注册信息
     * @return
     */
    @PostMapping()
    public Result add(@RequestBody UserRegisterDTO userRegisterDTO){
        //校验
        if (userRegisterDTO == null){
            return Result.error(MessageConstant.DATA_ERROR);
        }
        userService.register(userRegisterDTO);
        return Result.success();
    }

    /**
     * 用户分页查询
     * @param userPageQueryDTO
     * @return
     */
    @GetMapping("/page")
    public Result<PageResult> page(UserPageQueryDTO userPageQueryDTO){
        log.info("用户分页查询，参数为：{}",userPageQueryDTO);
        PageResult pageResult = userService.pageQuery(userPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id){
        User user = userService.getById(id);
        return Result.success(user);
    }


}
