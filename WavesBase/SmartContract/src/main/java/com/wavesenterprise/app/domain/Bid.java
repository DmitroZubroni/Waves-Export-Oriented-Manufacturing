package com.wavesenterprise.app.domain;

// Ключ в маппинге: senderAddress + "_" + timestamp
public class Bid {
    public String  id;
    public String  type;            // BidType: PRODUCTION | SUPPLY
    public String  senderAddress;
    public String  targetAddress;
    public String  productName;
    public double  volume;
    public String  deliveryDate;
    public String  techReqs;
    public String  deliveryCond;
    public String  address;
    public String  paymentTerms;
    public String  requestHash;     // хэш условий заявки → в реестр
    public double  totalCost;
    public String  status;          // BidStatus.*
    public String  stageStatus;     // текущий этап поставки (текст, меняет поставщик)
    public String  claimComment;    // комментарий рекламации

    public Bid() {}

    public Bid(String type, String senderAddress, String targetAddress, String productName,
               double volume, String deliveryDate, String techReqs, String deliveryCond,
               String address, String paymentTerms, String requestHash) {
        this.id            = senderAddress + "_" + System.currentTimeMillis();
        this.type          = type;
        this.senderAddress = senderAddress;
        this.targetAddress = targetAddress;
        this.productName   = productName;
        this.volume        = volume;
        this.deliveryDate  = deliveryDate;
        this.techReqs      = techReqs;
        this.deliveryCond  = deliveryCond;
        this.address       = address;
        this.paymentTerms  = paymentTerms;
        this.requestHash   = requestHash;
        this.totalCost     = 0;
        this.status        = "PENDING";
        this.stageStatus   = "";
        this.claimComment  = "";
    }
}