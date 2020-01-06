package com.donglusoft.sysconf.domain;

import java.io.Serializable;

public class PeopleType
  implements Serializable
{
  private String id;
  private String name;
  private Integer ratio;
  private Integer delFlag;
  private String lockFlag;
  private String fields2;

  public PeopleType()
  {
  }

  public PeopleType(String name, Integer ratio, Integer delFlag, String lockFlag, String fields2)
  {
    this.name = name;
    this.ratio = ratio;
    this.delFlag = delFlag;
    this.lockFlag = lockFlag;
    this.fields2 = fields2;
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

  public Integer getRatio() {
    return this.ratio;
  }

  public void setRatio(Integer ratio) {
    this.ratio = ratio;
  }

  public Integer getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(Integer delFlag) {
    this.delFlag = delFlag;
  }

  public String getLockFlag() {
    return this.lockFlag;
  }

  public void setLockFlag(String fields1) {
    this.lockFlag = fields1;
  }

  public String getFields2() {
    return this.fields2;
  }

  public void setFields2(String fields2) {
    this.fields2 = fields2;
  }
}