package com.donglusoft.log.service;

import com.donglusoft.log.dao.LoggingEventDAO;
import com.donglusoft.log.domain.LoggingEvent;
import com.donglusoft.survey.DAO.SurveyDetailDAO;
import com.donglusoft.survey.domain.SurveyDetail;
import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.user.domain.UserInfo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("loggingEventService")
@Transactional
public class LoggingEventService {

	@Resource
	LoggingEventDAO loggingEventDAO;

	@Resource
	SurveyDetailDAO surveyDetailDAO;

	public void save(LoggingEvent e)
	{
		this.loggingEventDAO.save(e);
	}
	public HashMap<String, Object> scan() {
		Map initMap = this.loggingEventDAO.scan();
		List initList = new ArrayList();
		initList = (List<LoggingEvent>) initMap.get("items");

		if ((initList != null) && (initList.size() > 0)) {
//			for (LoggingEvent loggingEvent : initList) {
//				String data = loggingEvent.getFormattedMessage();
//				String[] params = data.split(",");
//				for (int i = 1; i < params.length; ++i) {
//					UserInfo u = new UserInfo();
//					u.setId(params[0]);
//					String[] attri = params[i].trim().split(":");
//					People p = new People();
//					p.setId(attri[0]);
//					SurveyStandard ss = new SurveyStandard();
//					ss.setId(attri[1].substring(0, attri[1].length() - 1));
//					String flag = attri[1].substring(attri[1].length() - 1);
//					int score = 0;
//
//					if (flag.equals("Y"))
//						score = 100;
//					else if (flag.equals("L"))
//						score = 80;
//					else if (flag.equals("Z"))
//						score = 60;
//					else if (flag.equals("C")) {
//						score = 30;
//					}
//					SurveyDetail sd = new SurveyDetail();
//					sd.setUserInfo(u);
//					sd.setPeople(p);
//					sd.setSurveyStandard(ss);
//					sd.setScore(Integer.valueOf(score));
//					sd.setDelFlag(Integer.valueOf(1));
//					this.surveyDetailDAO.save(sd);
//				}
//			}
		}
		return this.loggingEventDAO.scan();
	}

	public HashMap<String, Object> findByCriteria(Integer start, Integer limit, String startTime, String endTime, String logType, String userName) {
		return this.loggingEventDAO.findByCriteria(start, limit, startTime, endTime, logType, userName);
	}
}