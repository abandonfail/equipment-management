package com.equipmentmanagementsystem.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.pojo.dto.*;
import com.equipmentmanagementsystem.pojo.entity.User;
import jakarta.servlet.http.HttpServletRequest;

/**
 * @author 陈
 * @description 针对表【user(用户)】的数据库操作Service
 * @createDate 2025-03-20 22:51:41
 */
public interface UserService extends IService<User> {

    /**
     * 用户注册
     * @param userRegisterDTO
     */
    void register(UserRegisterDTO userRegisterDTO);

    /**
     * 用户登录
     * @param userLoginDTO
     * @return
     */
    User login(UserLoginDTO userLoginDTO, HttpServletRequest request);

    /**
     *分页查询
     * @param userPageQueryDTO
     * @return
     */
    PageResult pageQuery(UserPageQueryDTO userPageQueryDTO);

    /**
     * 启用禁用员工账号
     * @param status
     * @param id
     */
    void startOrStop(Integer status, Long id);

    /**
     * 根据用户id删除用户
     * @param id
     */
    void delete(Long id);

    /**
     * 修改用户信息
     * @param userUpdateDTO
     */
    void update(UserUpdateDTO userUpdateDTO);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 修改密码
     * @param changePasswordDTO
     */
    void changePassword(ChangePasswordDTO changePasswordDTO);
}