package com.donglusoft.survey.domain;

import java.util.HashMap;
import java.util.List;

import com.donglusoft.sysconf.domain.SurveyStandard;

public class AllCounter extends HashMap{

	public AllCounter(List<SurveyStandard> ssList)
	{
		for( SurveyStandard ss: ssList)
		{
		  this.put(ss.getId(), new ItemCounter());
//			System.out.println("+++++ss.getId():" + ss.getId());
			
		}
	}
}
