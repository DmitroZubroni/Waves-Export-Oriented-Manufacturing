package com.wavesenterprise.app.api;

public interface IContract {

    // Роли пользователей (хранятся в User.role)
    class Role {
        public static final String ADMIN       = "ADMIN";       // администратор оператора
        public static final String OPERATOR    = "OPERATOR";    // сотрудник оператора
        public static final String SUPPLIER    = "SUPPLIER";    // сотрудник поставщика
        public static final String DISTRIBUTOR = "DISTRIBUTOR"; // сотрудник дистрибутора
        public static final String CLIENT      = "CLIENT";      // конечный клиент
    }

    // Типы организаций (хранятся в Organization.orgType)
    class OrgType {
        public static final String OPERATOR    = "OPERATOR";
        public static final String SUPPLIER    = "SUPPLIER";
        public static final String DISTRIBUTOR = "DISTRIBUTOR";
        public static final String CLIENT      = "CLIENT";
    }

    // Типы заявок (хранятся в Bid.type)
    class BidType {
        public static final String PRODUCTION = "PRODUCTION"; // заявка на производство
        public static final String SUPPLY     = "SUPPLY";     // заявка на поставку
    }

    // Статусы заявки
    class BidStatus {
        public static final String PENDING         = "PENDING";
        public static final String NEGOTIATING     = "NEGOTIATING";
        public static final String IN_PROGRESS     = "IN_PROGRESS";
        public static final String WAITING_PAYMENT = "WAITING_PAYMENT";
        public static final String CLAIM           = "CLAIM";
        public static final String PAID            = "PAID";
        public static final String CANCELLED       = "CANCELLED";
    }
}