package com.wavesenterprise.app.domain;

// Ключ в маппинге: wallet организации
// Организация — смарт-аккаунт. Список сотрудников хранится через USERS (каждый User.orgAddress).
// keys — публичные ключи всех зарегистрированных сотрудников через запятую (явная регистрация ключей).
public class Organization {
    public String  address;
    public String  name;
    public String  orgType;     // тип организации: OPERATOR / SUPPLIER / DISTRIBUTOR / CLIENT
    public String  region;
    public String  description;
    public String  keys;        // wallet'ы сотрудников через запятую — публичные ключи на смарт-аккаунте
    public boolean isActive;

    public Organization() {}

    public Organization(String address, String name, String orgType,
                        String region, String description) {
        this.address     = address;
        this.name        = name;
        this.orgType     = orgType;
        this.region      = region;
        this.description = description;
        this.keys        = address; // первый ключ — сам адрес организации
        this.isActive    = true;
    }
}