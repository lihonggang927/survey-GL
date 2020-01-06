package com.donglusoft.sysconf.domain;

import java.io.Serializable;

public class Unit
  implements Serializable
{
  private String id;
  private String name;
  private String address;
  private String legalPerson;
  private Integer peopleCount;
  private Integer delFlag;
  private String office;
  private String lockFlag;

  public Unit()
  {
  }

  public Unit(String name, String address, String legalPerson, Integer peopleCount, Integer delFlag, String office, String lockFlag)
  {
    this.name = name;
    this.address = address;
    this.legalPerson = legalPerson;
    this.peopleCount = peopleCount;
    this.delFlag = delFlag;
    this.office = office;
    this.lockFlag = lockFlag;
  }

  public String getId()
  {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getLegalPerson() {
    return this.legalPerson;
  }

  public void setLegalPerson(String legalPerson) {
    this.legalPerson = legalPerson;
  }

  public Integer getPeopleCount() {
    return this.peopleCount;
  }

  public void setPeopleCount(Integer peopleCount) {
    this.peopleCount = peopleCount;
  }

  public Integer getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(Integer delFlag) {
    this.delFlag = delFlag;
  }

  public String getOffice() {
    return this.office;
  }

  public void setOffice(String office) {
    this.office = office;
  }

  public String getLockFlag() {
    return this.lockFlag;
  }

  public void setLockFlag(String lockFlag) {
    this.lockFlag = lockFlag;
  }
}