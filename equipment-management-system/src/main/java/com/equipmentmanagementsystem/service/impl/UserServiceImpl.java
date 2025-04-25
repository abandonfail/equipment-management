package com.equipmentmanagementsystem.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipmentmanagementsystem.common.constant.MessageConstant;
import com.equipmentmanagementsystem.common.constant.PasswordConstant;
import com.equipmentmanagementsystem.common.constant.UserStatusConstant;
import com.equipmentmanagementsystem.common.exception.BaseException;
import com.equipmentmanagementsystem.common.result.PageResult;
import com.equipmentmanagementsystem.mapper.UserMapper;
import com.equipmentmanagementsystem.pojo.dto.*;
import com.equipmentmanagementsystem.pojo.entity.User;
import com.equipmentmanagementsystem.service.UserService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.Date;
import java.util.List;

/**
* @author 陈
* @description 针对表【user(用户)】的数据库操作Service实现
* @createDate 2025-03-20 22:51:41
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService {
    @Autowired
    private UserMapper userMapper;

    /**
     * 用户注册
     * @param userRegisterDTO
     */
    public void register(UserRegisterDTO userRegisterDTO) {
        //校验
        if (StringUtils.isAnyBlank(userRegisterDTO.getUserAccount(),userRegisterDTO.getUserPassword(),userRegisterDTO.getCheckPassword())){
            throw new BaseException(MessageConstant.PARAMETER_NULL);
        }
        // 用户名校验（2~20个字符，不能为纯数字）
//        if (!userRegisterDTO.getUserName().matches("^(?!\\d+$)[a-zA-Z0-9_\\-\\u4e00-\\u9fa5]{2,20}$")) {
//            throw new BaseException(MessageConstant.INVALID_USERNAME);
//        }

        // 账号校验（6~16位，必须以字母开头，只能包含字母和数字）
        if (!userRegisterDTO.getUserAccount().matches("^[a-zA-Z][a-zA-Z0-9]{5,15}$")) {
            throw new BaseException(MessageConstant.INVALID_USER_ACCOUNT);
        }

        // 密码校验（不少于6个字符，必须由字母和数字组成）
        if (!userRegisterDTO.getUserPassword().matches("^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d]{6,}$")) {
            throw new BaseException(MessageConstant.INVALID_PASSWORD);
        }

        // 确认密码校验
        if (!userRegisterDTO.getUserPassword().equals(userRegisterDTO.getCheckPassword())) {
            throw new BaseException(MessageConstant.PASSWORD_MISMATCH);
        }

        // 手机号校验（中国大陆手机号，11位，以1开头）
//        if (!userRegisterDTO.getPhone().matches("^1[3-9]\\d{9}$")) {
//            throw new BaseException(MessageConstant.INVALID_PHONE);
//        }

        //账号不能重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount",userRegisterDTO.getUserAccount());
        Long count = userMapper.selectCount(queryWrapper);
        if (count > 0){
            throw new BaseException(MessageConstant.ACCOUNT_DOUBLE);
        }

        //手机号不能重复
//        queryWrapper = new QueryWrapper<>();
//        queryWrapper.eq("phone",userRegisterDTO.getPhone());
//        count = userMapper.selectCount(queryWrapper);
//        if (count > 0){
//            throw new BaseException(MessageConstant.PHONE_DOUBLE);
//        }

        //密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((PasswordConstant.SALT + userRegisterDTO.getUserPassword()).getBytes());

        //插入数据
        User user = new User();
        user.setUserAccount(userRegisterDTO.getUserAccount());
        user.setUserPassword(encryptPassword);
        user.setUserRole(userRegisterDTO.getUserRole());
        this.save(user);
    }

    /**
     * 用户登录
     * @param userLoginDTO
     * @return
     */
    public User login(UserLoginDTO userLoginDTO, HttpServletRequest request) {
        String userAccount = userLoginDTO.getUserAccount();
        String userPassword = userLoginDTO.getUserPassword();
        //校验
        if (StringUtils.isAnyBlank(userAccount,userPassword)){
            throw new BaseException(MessageConstant.PARAMETER_NULL);
        }

        User user = userMapper.getUserByUserAccount(userAccount);
        //判断账号是否存在
        if (user == null){
            throw new BaseException(MessageConstant.ACCOUNT_NOT_EXIST);
        }

        userPassword = DigestUtils.md5DigestAsHex((PasswordConstant.SALT + userPassword).getBytes());

        if (!userPassword.equals(user.getUserPassword())){
            //密码错误
            throw new BaseException(MessageConstant.PASSWORD_ERROR);
        }

        if (user.getUserStatus() == UserStatusConstant.DISABLE){
            //账号被锁定（封号）
            throw new BaseException(MessageConstant.ACCOUNT_LOCKED);
        }
        if (user.getIsDelete() == UserStatusConstant.DELETE){
            //账号被锁定（封号）
            throw new BaseException(MessageConstant.ACCOUNT_LOCKED);
        }
        // 3. 记录用户的登录态
        request.getSession().setAttribute(UserStatusConstant.USER_LOGIN_STATE, user);

        return user;
    }

    /**
     * 分页查询
     * @param userPageQueryDTO
     * @return
     */
    public PageResult pageQuery(UserPageQueryDTO userPageQueryDTO) {
        PageHelper.startPage(userPageQueryDTO.getPage(),userPageQueryDTO.getPageSize());

        Page<User> page = userMapper.pageQuery(userPageQueryDTO);
        long total = page.getTotal();
        List<User> records = page.getResult();
        return new PageResult(total,records);
    }

    /**
     * 根据用户id删除用户
     * @param id
     */
    public void delete(Long id) {
        User user = new User();
        user.setId(id);
        user.setIsDelete(UserStatusConstant.DELETE);
        userMapper.update(user);
    }

    /**
     * 修改用户信息
     * @param userUpdateDTO
     */
    public void update(UserUpdateDTO userUpdateDTO) {
        User user = new User();
        user.setUpdateTime(new Date());
        BeanUtils.copyProperties(userUpdateDTO,user);
        userMapper.update(user);
    }

    /**
     * 用户注销
     *
     * @param request
     */
    public boolean userLogout(HttpServletRequest request) {
        if (request.getSession().getAttribute(UserStatusConstant.USER_LOGIN_STATE) == null) {
            throw new BaseException(MessageConstant.NOT_LOGIN);
        }
        // 移除登录态
        request.getSession().removeAttribute(UserStatusConstant.USER_LOGIN_STATE);
        return true;
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    public User getLoginUser(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(UserStatusConstant.USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            throw new BaseException(MessageConstant.NOT_LOGIN);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BaseException(MessageConstant.NOT_LOGIN);
        }
        return currentUser;
    }

    /**
     * 修改密码
     * @param changePasswordDTO
     */
    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        User user = userMapper.selectById(changePasswordDTO.getId());
        if (user == null){
            throw new BaseException(MessageConstant.ACCOUNT_NOT_EXIST);
        }

        //原密码加密
        String encryptPassword = DigestUtils.md5DigestAsHex((PasswordConstant.SALT + changePasswordDTO.getOldPassword()).getBytes());

        if (!user.getUserPassword().equals(encryptPassword)){
            throw new BaseException(MessageConstant.OLDPASSWORD_ERROR);
        }

        //新密码加密
        String newEncryptPassword = DigestUtils.md5DigestAsHex((PasswordConstant.SALT + changePasswordDTO.getNewPassword()).getBytes());

        if (encryptPassword.equals(newEncryptPassword)){
            throw new BaseException(MessageConstant.NEWPASSWORD_ERROR);
        }

        user.setUserPassword(newEncryptPassword);
        user.setUpdateTime(new Date());

        userMapper.update(user);
    }
}




