package com.equipmentmanagementsystem.mapper;

import com.equipmentmanagementsystem.pojo.dto.UserPageQueryDTO;
import com.equipmentmanagementsystem.pojo.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author 陈
* @description 针对表【user(用户)】的数据库操作Mapper
* @createDate 2025-03-20 22:48:55
* @Entity com.equipmentmanagementsystem.pojo.entity.User
*/
@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 判断账号是否唯一
     * @param userAccount
     * @return
     */
    @Select("select * from user where userAccount = #{userAccount}")
    User getUserByUserAccount(String userAccount);

    /**
     * 分页查询
     * @param userPageQueryDTO
     * @return
     */
    Page<User> pageQuery(UserPageQueryDTO userPageQueryDTO);

    /**
     * 修改用户信息
     * @param user
     */
    void update(User user);

    /**
     * 根据用户角色查询ids
     * @param maintainer
     * @return
     */
    List<Long> selectByRole(Integer maintainer);
}




