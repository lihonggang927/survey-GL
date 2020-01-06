package com.donglusoft.survey.domain;

public class Score
{
  private Double leader_score;
  private Double cadre_score;
  private Double mass_score;
  private Double score;
  public Double getLeader_score()
  {
    return this.leader_score;
  }

  public void setLeader_score(Double leaderScore) {
    this.leader_score = leaderScore;
  }

  public Double getCadre_score() {
    return this.cadre_score;
  }

  public void setCadre_score(Double cadreScore) {
    this.cadre_score = cadreScore;
  }

  public Double getMass_score() {
    return this.mass_score;
  }

  public void setMass_score(Double massScore) {
    this.mass_score = massScore;
  }

public void setScore(Double score) {
	this.score = score;
}

public Double getScore() {
	return score;
}
}