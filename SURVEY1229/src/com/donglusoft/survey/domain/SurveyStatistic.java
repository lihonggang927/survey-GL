package com.donglusoft.survey.domain;

import com.donglusoft.sysconf.domain.People;

public class SurveyStatistic
{
  private People people;
  private Score score;
  private Double multipleScore;
  private String level;
  private AllCounter allCounter;
  
  public People getPeople()
  {
    return this.people;
  }

  public void setPeople(People people) {
    this.people = people;
  }

  public Score getScore() {
    return this.score;
  }

  public void setScore(Score score) {
    this.score = score;
  }

  public Double getMultipleScore() {
    return this.multipleScore;
  }

  public void setMultipleScore(Double multipleScore) {
    this.multipleScore = multipleScore;
  }

  public String getLevel() {
    return this.level;
  }

  public void setLevel(String level) {
    this.level = level;
  }

public AllCounter getAllCounter() {
	return allCounter;
}

public void setAllCounter(AllCounter allCounter) {
	this.allCounter = allCounter;
}
}