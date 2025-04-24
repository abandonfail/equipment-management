package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChangePasswordDTO implements Serializable {
    private Long id;

    private String oldPassword;

    private String newPassword;
}
