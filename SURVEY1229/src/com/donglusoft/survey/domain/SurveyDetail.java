package com.donglusoft.survey.domain;

import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.user.domain.UserInfo;
import java.io.Serializable;

public class SurveyDetail
  implements Serializable
{
  private String id;
  private SurveyStandard surveyStandard;
  private People people;
  private UserInfo userInfo;
  private Integer score;
  private Integer delFlag;
  private String year;
  private String fields2;

  public SurveyDetail()
  {
  }

  public SurveyDetail(SurveyStandard surveyStandard, People people, UserInfo userInfo, Integer score, Integer delFlag, String year, String fields2)
  {
    this.surveyStandard = surveyStandard;
    this.people = people;
    this.userInfo = userInfo;
    this.score = score;
    this.delFlag = delFlag;
    this.year = year;
    this.fields2 = fields2;
  }

  public String getId()
  {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public SurveyStandard getSurveyStandard() {
    return this.surveyStandard;
  }

  public void setSurveyStandard(SurveyStandard surveyStandard) {
    this.surveyStandard = surveyStandard;
  }

  public People getPeople() {
    return this.people;
  }

  public void setPeople(People people) {
    this.people = people;
  }

  public UserInfo getUserInfo() {
    return this.userInfo;
  }

  public void setUserInfo(UserInfo userInfo) {
    this.userInfo = userInfo;
  }

  public Integer getScore() {
    return this.score;
  }

  public void setScore(Integer score) {
    this.score = score;
  }

  public Integer getDelFlag() {
    return this.delFlag;
  }

  public void setDelFlag(Integer delFlag) {
    this.delFlag = delFlag;
  }

  public String getYear() {
    return this.year;
  }

  public void setYear(String year) {
    this.year = year;
  }

  public String getFields2() {
    return this.fields2;
  }

  public void setFields2(String fields2) {
    this.fields2 = fields2;
  }
}