package com.wavesenterprise.app.domain;

/**
 * Карточка продукта.
 * Prefix в маппинге: "PRODUCT_" + ownerAddress + "_" + name → id.
 * Создаётся поставщиком или оператором.
 * Оператор устанавливает approved = true после проверки стандартов.
 */
public class Product {

    public String id;           // ownerAddress + "_" + name (упрощённый id)
    public String ownerAddress; // кто создал карточку
    public String name;
    public String imageUrl;
    public String description;
    public String regions;      // регионы поставки через запятую
    public double minVolume;
    public double maxVolume;
    public String distributors; // список адресов дистрибуторов через запятую
    public boolean approved;    // оператор подтвердил соответствие стандартам
    public String certInfo;     // сведения о сертификатах / стандартах (заполняет оператор)

    public Product() {}

    public Product(String ownerAddress,
                   String name,
                   String imageUrl,
                   String description,
                   String regions,
                   double minVolume,
                   double maxVolume) {
        this.id           = ownerAddress + "_" + name;
        this.ownerAddress = ownerAddress;
        this.name         = name;
        this.imageUrl     = imageUrl;
        this.description  = description;
        this.regions      = regions;
        this.minVolume    = minVolume;
        this.maxVolume    = maxVolume;
        this.distributors = "";
        this.approved     = false;
        this.certInfo     = "";
    }
}
