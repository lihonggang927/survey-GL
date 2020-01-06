package com.donglusoft.survey.service;

import com.donglusoft.survey.DAO.SurveyDetailDAO;
import com.donglusoft.survey.domain.SurveyDetail;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.user.DAO.UserInfoDAO;
import com.donglusoft.user.DAO.UserLoginDAO;
import com.donglusoft.user.domain.UserInfo;
import com.donglusoft.user.domain.UserLogin;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("surveyDetailService")
@Transactional
public class SurveyDetailService
{
  private static final Logger logSave = LoggerFactory.getLogger("saveSurveyDetail");

  @Resource
  private SurveyDetailDAO surveyDetailDAO;

  @Resource
  private UserInfoDAO userInfoDAO;

  @Resource
  private UserLoginDAO userLoginDAO;

  public Map<String, Object> statistic(SurveyDetail surveyDetail) { return this.surveyDetailDAO.statistic(surveyDetail);
  }

  public Map<String, Object> statistic(SurveyDetail surveyDetail,List<SurveyStandard> ssList) {
	  return this.surveyDetailDAO.statistic(surveyDetail,ssList);
  }
  public List<SurveyDetail> search() throws Exception {
    return this.surveyDetailDAO.findAll();
  }

  public List<SurveyDetail> searchByConditions(SurveyDetail surveyDetail) throws Exception {
    return this.surveyDetailDAO.find(surveyDetail);
  }

  public void save(String data, SurveyDetail surveyDetail) throws Exception {
    UserInfo ui = new UserInfo();
    ui = surveyDetail.getUserInfo();
    ui.setStateFlag("3");
    UserLogin userLogin = new UserLogin();
    userLogin.setUserInfo(surveyDetail.getUserInfo());
    userLogin.setLoginTime(ui.getYear());
    userLogin.setSurveyData(data);
    userLogin.setDelFlag("1");
    this.userLoginDAO.save(userLogin);
    logSave.info(ui.getId());
    this.userInfoDAO.update(ui);
  }
}