package com.donglusoft.user.service;

import com.donglusoft.survey.DAO.SurveyDetailDAO;
import com.donglusoft.survey.domain.SurveyDetail;
import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.user.DAO.UserLoginDAO;
import com.donglusoft.user.domain.UserLogin;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

@Service("userLoginService")
public class UserLoginService
{

  @Resource
  private UserLoginDAO userLoginDAO;

  @Resource
  private SurveyDetailDAO surveyDetailDAO;

  public Map<String, Object> scan()
  {
    Map map = this.userLoginDAO.scan();
    List<UserLogin> list = (List)map.get("userLogins");

    if ((list != null) && (list.size() > 0)) {
      for (UserLogin userLogin : list) {
        String data = userLogin.getSurveyData();
        String year = userLogin.getLoginTime();
        if (data != null) {
          String[] params = data.split(",");
          for (int i = 0; i < params.length; ++i) {
            String[] attri = params[i].trim().split(":");
            People p = new People();
            p.setId(attri[0]);
            SurveyStandard ss = new SurveyStandard();
            ss.setId(attri[1].substring(0, attri[1].length() - 1));
            String flag = attri[1].substring(attri[1].length() - 1);
            int score = 0;

            if (flag.equals("Y"))
              score = 100;
            else if (flag.equals("L"))
              score = 80;
            else if (flag.equals("Z"))
              score = 60;
            else if (flag.equals("C")) {
              score = 30;
            }
            SurveyDetail sd = new SurveyDetail();
            sd.setUserInfo(userLogin.getUserInfo());
            sd.setPeople(p);
            sd.setSurveyStandard(ss);
            sd.setScore(Integer.valueOf(score));
            sd.setDelFlag(Integer.valueOf(1));
            sd.setYear(year);
            this.surveyDetailDAO.save(sd);
          }
          userLogin.setDelFlag("0");
        }
      }
    }
    return map;
  }
}