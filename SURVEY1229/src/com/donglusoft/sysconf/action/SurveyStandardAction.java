package com.donglusoft.sysconf.action;

import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.sysconf.service.PeopleService;
import com.donglusoft.sysconf.service.SurveyStandardService;
import com.opensymphony.xwork2.ActionSupport;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("surveyStandardAction")
@Scope("prototype")
public class SurveyStandardAction extends ActionSupport
{
  private static final long serialVersionUID = 1L;
  private List<SurveyStandard> surveyStandardItems;
  private List<People> peopleItems;
  private boolean success = false;
  private People people;
  private String attribute;
  private String value;
  private String flag;
  private String delData;

  @Resource
  private SurveyStandardService surveyStandardService;

  @Resource
  private PeopleService peopleService;

  public String del()
  {
    try
    {
      this.surveyStandardService.del(this.delData);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String search()
  {
    try {
      this.surveyStandardItems = this.surveyStandardService.findAll();
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String searchAvailable()
  {
    try {
      this.surveyStandardItems = this.surveyStandardService.findAvailable();
    //  System.out.println("searchAvailable:"+surveyStandardItems.size());
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }
  
  public String searchByOrder() {
    try {
      this.surveyStandardItems = this.surveyStandardService.searchByOrder();
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String saveOrUpdate()
  {
    try {
    	System.out.println("value"+value+"attribute:"+attribute);
      this.flag = this.surveyStandardService.saveOrUpdate(this.flag, this.attribute, this.value);
      this.success = true;
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
    }
    return "success";
  }

  public String union()
  {
    try {
      this.surveyStandardItems = this.surveyStandardService.findAll();
      this.peopleItems = this.peopleService.searchByCondition(this.people);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return "success";
  }

  public List<People> getPeopleItems() {
    return this.peopleItems;
  }

  public void setPeopleItems(List<People> peopleItems)
  {
    this.peopleItems = peopleItems;
  }

  public People getPeople()
  {
    return this.people;
  }

  public void setPeople(People people)
  {
    this.people = people;
  }

  public String getDelData()
  {
    return this.delData;
  }

  public void setDelData(String delData)
  {
    this.delData = delData;
  }

  public String getAttribute()
  {
    return this.attribute;
  }

  public void setAttribute(String attribute) {
    this.attribute = attribute;
  }

  public String getValue() {
    return this.value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getFlag() {
    return this.flag;
  }

  public void setFlag(String flag) {
    this.flag = flag;
  }

  public List<SurveyStandard> getSurveyStandardItems() {
    return this.surveyStandardItems;
  }

  public void setSurveyStandardItems(List<SurveyStandard> surveyStandardItems) {
    this.surveyStandardItems = surveyStandardItems;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }
}