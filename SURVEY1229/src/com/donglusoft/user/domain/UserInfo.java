package com.donglusoft.user.domain;

import com.donglusoft.sysconf.domain.PeopleType;
import com.donglusoft.sysconf.domain.Unit;
import java.io.Serializable;

public class UserInfo
  implements Serializable
{
  private String id;
  private String username;
  private Unit unit;
  private PeopleType peopleType;
  private String password;
  private String year;
  private Integer loginCount;
  private Integer delFlag;
  private String fields1;
  private String stateFlag;

  public UserInfo()
  {
  }

  public UserInfo(Unit unit, PeopleType peopleType, String password, String year, Integer loginCount, String fields1, String stateFlag)
  {
    this.unit = unit;
    this.peopleType = peopleType;
    this.password = password;
    this.year = year;
    this.loginCount = loginCount;
    this.fields1 = fields1;
    this.stateFlag = stateFlag;
  }

  public String getId()
  {
    return this.id;
  }

  public Integer getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(Integer delFlag) {
    this.delFlag = delFlag;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Unit getUnit() {
    return this.unit;
  }

  public void setUnit(Unit unit) {
    this.unit = unit;
  }

  public PeopleType getPeopleType() {
    return this.peopleType;
  }

  public void setPeopleType(PeopleType peopleType) {
    this.peopleType = peopleType;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getYear() {
    return this.year;
  }

  public void setYear(String year) {
    this.year = year;
  }

  public Integer getLoginCount() {
    return this.loginCount;
  }

  public void setLoginCount(Integer loginCount) {
    this.loginCount = loginCount;
  }

  public String getFields1() {
    return this.fields1;
  }

  public void setFields1(String fields1) {
    this.fields1 = fields1;
  }

  public String getStateFlag() {
    return this.stateFlag;
  }

  public void setStateFlag(String stateFlag) {
    this.stateFlag = stateFlag;
  }
}