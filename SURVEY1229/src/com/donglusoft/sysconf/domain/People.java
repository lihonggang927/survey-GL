package com.donglusoft.sysconf.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class People
  implements Serializable
{
  private String id;
  private Unit unit;
  private String name;
  private Integer level;
  private String position;
  private Integer delFlag;
  private String fields1;
  private String fields2;
  private Set surveyRecords = new HashSet(0);
  private String[] parameters = { "id", "unit", "name", "level", "position", "delFlag", "fields1", "fields2", "surveyRecords" };

  public People()
  {
  }

  public People(Unit unit, String name, Integer level, String position, Integer delFlag, String fields1, String fields2, Set surveyRecords)
  {
    this.unit = unit;
    this.name = name;
    this.level = level;
    this.position = position;
    this.delFlag = delFlag;
    this.fields1 = fields1;
    this.fields2 = fields2;
    this.surveyRecords = surveyRecords;
  }

  public String getId()
  {
    return this.id;
  }

  public String[] getParameters() {
    return this.parameters;
  }

  public void setParameters(String[] parameters) {
    this.parameters = parameters;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Unit getUnit() {
    return this.unit;
  }

  public void setUnit(Unit unit) {
    this.unit = unit;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getLevel() {
    return this.level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }

  public String getPosition() {
    return this.position;
  }

  public void setPosition(String position) {
    this.position = position;
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

  public Set getSurveyRecords() {
    return this.surveyRecords;
  }

  public void setSurveyRecords(Set surveyRecords) {
    this.surveyRecords = surveyRecords;
  }
}