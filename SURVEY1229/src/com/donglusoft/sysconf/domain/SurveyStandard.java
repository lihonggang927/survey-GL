package com.donglusoft.sysconf.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class SurveyStandard
  implements Serializable
{
  private String id;
  private String name;
  private Integer ratio;
  private Integer delFlag;
  private String  fields1;//启用标志
  private String fields2;
  private Set surveyDetails = new HashSet(0);

  public SurveyStandard()
  {
  }

  public SurveyStandard(String name, Integer ratio, Integer delFlag, String fields1, String fields2, Set surveyDetails)
  {
    this.name = name;
    this.ratio = ratio;
    this.delFlag = delFlag;
    this.fields1 = fields1;
    this.fields2 = fields2;
    this.surveyDetails = surveyDetails;
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

  public String getFields1() {
    return this.fields1;
  }

  public void setFields1(String fields1) {
    this.fields1 = fields1;
  }

  public String getFields2() {
    return this.fields2;
  }

  public void setFields2(String fields2) {
    this.fields2 = fields2;
  }

  public Set getSurveyDetails() {
    return this.surveyDetails;
  }

  public void setSurveyDetails(Set surveyDetails) {
    this.surveyDetails = surveyDetails;
  }
}