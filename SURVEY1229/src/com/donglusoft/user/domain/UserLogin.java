package com.donglusoft.user.domain;

import java.io.Serializable;

public class UserLogin
  implements Serializable
{
  private String id;
  private UserInfo userInfo;
  private String ipAddress;
  private String loginTime;
  private String surveyData;
  private String delFlag;

  public UserLogin()
  {
  }

  public UserLogin(UserInfo userInfo, String ipAddress, String loginTime, String surveyData, String delFlag)
  {
    this.userInfo = userInfo;
    this.ipAddress = ipAddress;
    this.loginTime = loginTime;
    this.surveyData = surveyData;
    this.delFlag = delFlag;
  }

  public String getId()
  {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public UserInfo getUserInfo() {
    return this.userInfo;
  }

  public void setUserInfo(UserInfo userInfo) {
    this.userInfo = userInfo;
  }

  public String getIpAddress() {
    return this.ipAddress;
  }

  public void setIpAddress(String ipAddress) {
    this.ipAddress = ipAddress;
  }

  public String getLoginTime() {
    return this.loginTime;
  }

  public void setLoginTime(String loginTime) {
    this.loginTime = loginTime;
  }

  public String getSurveyData() {
    return this.surveyData;
  }

  public void setSurveyData(String surveyData) {
    this.surveyData = surveyData;
  }

  public String getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(String delFlag) {
    this.delFlag = delFlag;
  }
}