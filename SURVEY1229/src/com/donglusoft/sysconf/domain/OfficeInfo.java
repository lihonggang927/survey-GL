package com.donglusoft.sysconf.domain;

import java.io.Serializable;

public class OfficeInfo
  implements Serializable
{
  private String id;
  private String name;
 

  public OfficeInfo()
  {
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

  
}