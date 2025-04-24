package com.equipmentmanagementsystem.controller.user;

import com.equipmentmanagementsystem.common.constant.MessageConstant;
import com.equipmentmanagementsystem.common.exception.BaseException;
import com.equipmentmanagementsystem.common.result.Result;
import com.equipmentmanagementsystem.pojo.dto.ChangePasswordDTO;
import com.equipmentmanagementsystem.pojo.dto.UserLoginDTO;
import com.equipmentmanagementsystem.pojo.dto.UserRegisterDTO;
import com.equipmentmanagementsystem.pojo.dto.UserUpdateDTO;
import com.equipmentmanagementsystem.pojo.entity.User;
import com.equipmentmanagementsystem.pojo.vo.UserLoginVO;
import com.equipmentmanagementsystem.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController("userUserController")
@RequestMapping("/user/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 用户注册
     * @param userRegisterDTO 用户注册信息
     * @return
     */
    @PostMapping("/register")
    public Result register(@RequestBody UserRegisterDTO userRegisterDTO){
        log.info("用户注册信息：{}"+ userRegisterDTO);
        //校验
        if (userRegisterDTO == null){
            return Result.error(MessageConstant.DATA_ERROR);
        }
        userService.register(userRegisterDTO);
        return Result.success();
    }

    /**
     * 用户登录
     * @param userLoginDTO
     * @return
     */
    @PostMapping("/login")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO, HttpServletRequest request){
        //校验
        if (userLoginDTO == null){
            return Result.error(MessageConstant.DATA_ERROR);
        }
        User user =  userService.login(userLoginDTO,request);

        UserLoginVO userLoginVO = new UserLoginVO();
        BeanUtils.copyProperties(user, userLoginVO);
        log.info("用户信息：{}" + userLoginVO);
        return Result.success(userLoginVO);
    }

    /**
     * 根据用户id删除用户
     * @param id
     * @return
     */
    @GetMapping("/delete/{id}")
    public Result delete(@PathVariable Long id){
        userService.delete(id);
        return Result.success();
    }

    /**
     * 修改用户信息
     * @param userUpdateDTO
     * @return
     */
    @PutMapping
    public Result update(@RequestBody UserUpdateDTO userUpdateDTO){
        log.info("用户修改信息：{}",userUpdateDTO);
        userService.update(userUpdateDTO);
        return Result.success();
    }

    /**
     * 修改密码
     * @param changePasswordDTO
     * @return
     */
    @PostMapping("/changePassword")
    public Result changePassword(@RequestBody ChangePasswordDTO changePasswordDTO){
        log.info("修改密码：{}",changePasswordDTO);
        userService.changePassword(changePasswordDTO);
        return Result.success();
    }

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public Result<Boolean> userLogout(HttpServletRequest request) {
        if (request == null) {
            throw new BaseException(MessageConstant.DATA_ERROR);
        }
        boolean result = userService.userLogout(request);
        return Result.success(result);
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @GetMapping("/get/login")
    public Result<UserLoginVO> getLoginUser(HttpServletRequest request) {
        User user = userService.getLoginUser(request);
        if (user == null) {
            return null;
        }
        UserLoginVO userLoginVO = new UserLoginVO();
        BeanUtils.copyProperties(user, userLoginVO);
        return Result.success(userLoginVO);
    }
}
