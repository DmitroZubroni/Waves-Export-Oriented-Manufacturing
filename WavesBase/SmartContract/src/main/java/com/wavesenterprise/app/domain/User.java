package com.wavesenterprise.app.domain;

// Ключ в маппинге: wallet (блокчейн-адрес пользователя)
public class User {
    public String  wallet;      // блокчейн-адрес = ключ в USERS
    public String  orgAddress;  // адрес организации, к которой привязан
    public String  role;        // Role.* — роль конкретного пользователя
    public String  fullName;
    public String  contact;
    public String  position;
    public boolean isActive;

    public User() {}

    public User(String wallet, String orgAddress, String role,
                String fullName, String contact, String position) {
        this.wallet     = wallet;
        this.orgAddress = orgAddress;
        this.role       = role;
        this.fullName   = fullName;
        this.contact    = contact;
        this.position   = position;
        this.isActive   = true;
    }
}
 