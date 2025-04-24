package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CategoryDTO implements Serializable {
    private Long id;

    private String name;

    private String description;

    private Long createUser;

    private Long updateUser;

}
