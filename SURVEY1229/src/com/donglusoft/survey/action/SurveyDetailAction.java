package com.donglusoft.survey.action;


import com.donglusoft.log.domain.LoggingEvent;
import com.donglusoft.log.service.LoggingEventService;
import com.donglusoft.survey.domain.SurveyDetail;
import com.donglusoft.survey.domain.SurveyStatistic;
import com.donglusoft.survey.service.SurveyDetailService;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.sysconf.service.SurveyStandardService;
import com.donglusoft.user.domain.UserLogin;
import com.donglusoft.user.service.UserLoginService;
import com.donglusoft.util.FileNameGenerate;
import com.donglusoft.util.Grid2excel;
import com.opensymphony.xwork2.ActionSupport;

import java.io.*;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("surveyDetailAction")
@Scope("prototype")
public class SurveyDetailAction extends ActionSupport
  implements SessionAware
{
  private static final long serialVersionUID = 1L;
  private boolean success = false;
  private String surveyData;
  private String conditions;
  private SurveyDetail surveyDetail;
  private List<SurveyDetail> surveyDetailItems;
  private List<SurveyStatistic> statisticItems;
  private int totalSurveyDetailItem;
  private Map<String, Object> session;
  
  private static Map<String, UserLogin> filterMap = new  HashMap<String,UserLogin>(200) ;
  @Resource
  private SurveyDetailService surveyDetailService;

  @Resource
  private UserLoginService userLoginService;

 @Resource
 private SurveyStandardService surveyStandardService;
 
  public String statistic()
  {
    try
    {
      this.insertDuplicate();
      this.userLoginService.scan();

      Map statisticMap = new HashMap();
      setSuccess(false);
      List<SurveyStandard> ssList = surveyStandardService.findAvailable();
      statisticMap = this.surveyDetailService.statistic(this.surveyDetail,ssList);
      this.statisticItems = ((List)statisticMap.get("items"));
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String save()
  {
    try
    {
      String key = surveyDetail.getUserInfo().getId();
     // System.out.println("username:"+key+":id:"+surveyDetail.getUserInfo().getUsername());
      if(filterMap.containsKey(key))
      {
    	  setSuccess(false);
    	  return "success";
      }
      UserLogin ui = new UserLogin();
      ui.setSurveyData(this.surveyData);
      ui.setLoginTime(surveyDetail.getUserInfo().getYear());
      ui.setDelFlag("1");
      ui.setUserInfo(surveyDetail.getUserInfo());
      filterMap.put(key, ui);
    //  System.out.println("userid:"+key+":id:"+surveyData);

      setSuccess(false);
      this.surveyDetailService.save(this.surveyData, this.surveyDetail);
      this.session.remove("user");
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
   // insertDuplicate();
    return "success";
  }

  public void insertDuplicate()
  {
	  Collection<UserLogin> va = filterMap.values();
	  if(filterMap.size()<1)
		  return;
	  System.out.println("userid:"+va.size()+":id:");
	  
	  FileNameGenerate fng = new FileNameGenerate();
	  try {
		
		File file = new File("f:/"+fng.generate()+".txt");
		BufferedWriter bw = new BufferedWriter(new FileWriter(file));
		
		  for(UserLogin ds:va)
		  {
			  bw.write(ds.getUserInfo().getId());
			  bw.write(' ');
			  bw.write(ds.getSurveyData());
			  bw.newLine();
			  System.out.println("insert duplicate"+ds.getUserInfo().getId());
		  }
		  bw.flush();
		  bw.close();
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	filterMap.clear();
  }
  
//  public static void main(String args[])
//  {
//	  SurveyDetailAction sda = new SurveyDetailAction();
//	 SurveyDetail sd1 = new SurveyDetail();
//	 sd1.setId("1");
//	 UserInfo u1 = new UserInfo();
//	 u1.setUsername("111");
//	 sd1.setUserInfo(u1);
//	 String key = sd1.getUserInfo().getUsername();
//     if(sda.filterMap.containsKey(key))
//        System.out.println("error");
//     sda.filterMap.put(key, sd1);
//     
//	 SurveyDetail sd2 = new SurveyDetail();
//	 sd2.setId("2");
//	 UserInfo u2 = new UserInfo();
//	 u2.setUsername("222");
//	 sd2.setUserInfo(u2);
//	 key = sd2.getUserInfo().getUsername();
//     if(sda.filterMap.containsKey(key))
//        System.out.println("error");
//     sda.filterMap.put(key, sd2);
//     sda.insertDuplicate();
//     
//  }
  
  public String search()
  {
    try {
      setSuccess(false);
      this.surveyDetailItems = this.surveyDetailService.search();
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String searchByCondition()
  {
    try {
      setSuccess(false);
      this.surveyDetailItems = this.surveyDetailService.searchByConditions(this.surveyDetail);
      setSuccess(true);
    } catch (Exception e) {
      setSuccess(false);
      e.printStackTrace();
    }
    return "success";
  }

  public String importToExcel() {
    try {
      this.userLoginService.scan();
      Map statisticMap = new HashMap();
      setSuccess(false);
      statisticMap = this.surveyDetailService.statistic(this.surveyDetail);
      this.statisticItems = ((List)statisticMap.get("items"));
      setSuccess(true);

      String[][] excelString = { { "people.name", "干部姓名", "string" }, { "people.unit.name", "单位", "string" }, { "people.position", "职务", "string" }, { "score.leader_score", "校领导测评得分", "string" }, 
        { "score.cadre_score", "处级干部互评得分", "string" }, { "score.mass_score", "教职工测评得分", "string" }, { "level", "等次", "string" } };

      Grid2excel grid2excel = new Grid2excel();
      grid2excel.excelGenerate(excelString, this.statisticItems);
    } catch (Exception e) {
      this.success = false;
      e.printStackTrace();
      return "error";
    }
    return "success";
  }

  public List<SurveyStatistic> getStatisticItems()
  {
    return this.statisticItems;
  }

  public void setStatisticItems(List<SurveyStatistic> statisticItems) {
    this.statisticItems = statisticItems;
  }

  public SurveyDetail getSurveyDetail() {
    return this.surveyDetail;
  }

  public void setSurveyDetail(SurveyDetail surveyDetail) {
    this.surveyDetail = surveyDetail;
  }

  public String getConditions() {
    return this.conditions;
  }

  public void setConditions(String conditions) {
    this.conditions = conditions;
  }

  public int getTotalSurveyDetailItem() {
    return this.totalSurveyDetailItem;
  }

  public void setTotalSurveyDetailItem(int totalSurveyDetailItem) {
    this.totalSurveyDetailItem = totalSurveyDetailItem;
  }

  public List<SurveyDetail> getSurveyDetailItems() {
    return this.surveyDetailItems;
  }

  public void setSurveyDetailItems(List<SurveyDetail> surveyDetailItems) {
    this.surveyDetailItems = surveyDetailItems;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }

  public String getSurveyData() {
    return this.surveyData;
  }

  public void setSurveyData(String surveyData) {
    this.surveyData = surveyData;
  }

  public Map<String, Object> getSession() {
    return this.session;
  }

  public void setSession(Map<String, Object> session) {
    this.session = session;
  }
}