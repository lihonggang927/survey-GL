package com.donglusoft.util;

import java.util.Comparator;

import com.donglusoft.survey.domain.SurveyStatistic;

//TODO 这个比较器用泛型比较好
public class MyComparator implements Comparator<Object> {

	public int compare(Object o1, Object o2) {
		SurveyStatistic ssc1 = (SurveyStatistic) o1;
		SurveyStatistic ssc2 = (SurveyStatistic) o2;
		int scoreFlag = ssc2.getMultipleScore().compareTo(ssc1.getMultipleScore());
		return scoreFlag;
	}
}
