package com.donglusoft.sysconf.service;

import com.donglusoft.sysconf.DAO.SurveyStandardDAO;
import com.donglusoft.sysconf.domain.SurveyStandard;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("surveyStandardService")
public class SurveyStandardService
{

  @Resource
  private SurveyStandardDAO surveyStandardDAO;

  public List<SurveyStandard> findAll()
    throws Exception
  {
    return this.surveyStandardDAO.findAll();
  }
  
  public List<SurveyStandard> findAvailable()
		    throws Exception
  {
		    return this.surveyStandardDAO.findAllSurvey();
  }

  public List<SurveyStandard> searchByOrder() throws Exception {
    return this.surveyStandardDAO.findAllOrderByName();
  }

  public boolean del(String params) throws Exception {
    String[] parameter = params.split(",");
    for (int i = 0; i < parameter.length; ++i) {
      this.surveyStandardDAO.del(parameter[i]);
    }
    return true;
  }

  public String saveOrUpdate(String flag, String attribute, String value)
  {
    SurveyStandard surveyStandard = new SurveyStandard();
    createSurveyStandard(surveyStandard, attribute, value);
    if (!(flag.equals("")))
    {
      surveyStandard.setId(flag);
    }
    return this.surveyStandardDAO.saveOrUpdate(attribute, value, surveyStandard);
  }

  public SurveyStandard createSurveyStandard(SurveyStandard surveyStandard, String attribute, String value)
  {
    if (attribute.equals("id"))
      surveyStandard.setId(value);
    else if (attribute.equals("name"))
      surveyStandard.setName(value);
    else if (attribute.equals("fields1"))
        surveyStandard.setFields1(value);
    else if (attribute.equals("ratio")) {
      surveyStandard.setRatio(Integer.valueOf(Integer.parseInt(value)));
    }

    return surveyStandard;
  }
}