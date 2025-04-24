package com.equipmentmanagementsystem.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LocationDTO implements Serializable {
    private Long id;

    private String name;

    private Integer type;

    private String description;
}
