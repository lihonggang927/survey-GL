package com.donglusoft.survey.DAO;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.*;
import java.text.DecimalFormat;  

import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.donglusoft.survey.domain.AllCounter;
import com.donglusoft.survey.domain.ItemCounter;
import com.donglusoft.survey.domain.Score;
import com.donglusoft.survey.domain.SurveyDetail;
import com.donglusoft.survey.domain.SurveyStatistic;
import com.donglusoft.sysconf.domain.People;
import com.donglusoft.sysconf.domain.PeopleType;
import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.util.BaseHibernateDAO;
import com.donglusoft.util.MyComparator;

/**
 * A data access object (DAO) providing persistence and search support for
 * SurveyDetail entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see com.donglusoft.survey.domain.SurveyDetail
 * @author MyEclipse Persistence Tools
 */

@Repository("surveyDetailDAO")
public class SurveyDetailDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory.getLogger(SurveyDetailDAO.class);
	// property constants
	public static final String SCORE = "score";
	public static final String DEL_FLAG = "delFlag";
	public static final String FIELDS1 = "fields1";
	public static final String FIELDS2 = "fields2";

	// 保存
	public void save(SurveyDetail transientInstance) {
		log.debug("saving SurveyDetail instance");
		try {
			getSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	// 更新
	public void update(SurveyDetail transientInstance) {
		log.debug("update SurveyDetail instance");
		try {
			// System.out.println("id:" + transientInstance.getId() + "得分：" + transientInstance.getScore());
			SurveyDetail s = (SurveyDetail) getSession().get(SurveyDetail.class, transientInstance.getId());
			s.setScore(transientInstance.getScore());
			log.debug("update successful");
		} catch (RuntimeException re) {
			log.error("update failed", re);
			throw re;
		}
	}

	// 删除
	public void delete(SurveyDetail persistentInstance) {
		log.debug("deleting SurveyDetail instance");
		try {
			getSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public SurveyDetail findById(java.lang.String id) {
		log.debug("getting SurveyDetail instance with id: " + id);
		try {
			SurveyDetail instance = (SurveyDetail) getSession().get("com.donglusoft.survey.domain.SurveyDetail", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(SurveyDetail instance) {
		log.debug("finding SurveyDetail instance by example");
		try {
			List results = getSession().createCriteria("com.donglusoft.survey.domain.SurveyDetail").add(Example.create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding SurveyDetail instance with property: " + propertyName + ", value: " + value);
		try {
			String queryString = "from SurveyDetail as model where model." + propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByScore(Object score) {
		return findByProperty(SCORE, score);
	}

	public List findByDelFlag(Object delFlag) {
		return findByProperty(DEL_FLAG, delFlag);
	}

	public List findByFields1(Object fields1) {
		return findByProperty(FIELDS1, fields1);
	}

	public List findByFields2(Object fields2) {
		return findByProperty(FIELDS2, fields2);
	}

	public List findAll() {
		log.debug("finding all SurveyDetail instances");
		try {
			String queryString = "from SurveyDetail";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	// 查找级别分割点
	public double findLevelFlag(List oList) {
		double levelScore = 0.0;
		List<SurveyStatistic> sscList = new ArrayList<SurveyStatistic>();// 存储SurveyStatistic对象
		List<People> pList = new ArrayList<People>();
		StringBuffer sqlForPeople = new StringBuffer("from People p where p.delFlag=1");
		Query queryForPeople = getSession().createQuery(sqlForPeople.toString());
		pList = queryForPeople.list();
		for (People p : pList) {
			SurveyStatistic ssc = new SurveyStatistic();
			ssc.setPeople(p);
			Score score = findScore(p, oList, 0);// 获得该p的所有类型的得分
			ssc.setScore(score);
			double multipleScore = getMultipleScore(score);
			ssc.setMultipleScore(multipleScore);
			sscList.add(ssc);
		}
		// System.out.println("排序总人数：" + sscList.size());
		int size = sscList.size();
		// TODO 向上取整 还是向下取整
		int levelFlag = (size * 15) / 100;
		// System.out.println("levelFlag:" + levelFlag);
		MyComparator comparator = new MyComparator();
		Collections.sort(sscList, comparator);
		if (size > 0) {
			levelScore = sscList.get(levelFlag).getMultipleScore();
		}else {
			levelScore = 0.0;
		}
		// System.out.println("取第" + levelFlag + "名，成绩为" + levelScore);
		// for (SurveyStatistic s : sscList) {
		// // System.out.println(s.getPeople().getName() + "," +
		// s.getMultipleScore());
		// }
		return levelScore;

	}

	// 根据Score对象和数据库people_type表中的ratio字段来算出该干部的综合得分
	public double getMultipleScore(Score score) {
		if (score.getLeader_score() == null) {
			score.setLeader_score(0.0);
		}
		if (score.getCadre_score() == null) {
			score.setCadre_score(0.0);
		}
		if (score.getMass_score() == null) {
			score.setMass_score(0.0);
		}
		double multipleScore = 0.0;
		int leaderRatio = 0;
		int cadreRatio = 0;
		int massRatio = 0;
		List<PeopleType> ptList = new ArrayList<PeopleType>();
		String sqlForPeopleType = "from PeopleType as pt where delFlag='1'";
		Query queryForPeopleType = getSession().createQuery(sqlForPeopleType);
		ptList = queryForPeopleType.list();
		for (PeopleType ptIndex : ptList) {
			String ratioFlag = ptIndex.getId().toString();
			if (ratioFlag.equals("1")) {
				leaderRatio = ptIndex.getRatio();
			}
			if (ratioFlag.equals("2")) {
				cadreRatio = ptIndex.getRatio();
			}
			if (ratioFlag.equals("3")) {
				massRatio = ptIndex.getRatio();
			}
		}
		multipleScore = +score.getLeader_score() * leaderRatio + score.getCadre_score() * cadreRatio + score.getMass_score() * massRatio;
		return multipleScore / 100;
	}

	public double getMultipleScoreTest(Score score) {
		if (score.getLeader_score() == null) {
			score.setLeader_score(0.0);
		}
		if (score.getCadre_score() == null) {
			score.setCadre_score(0.0);
		}
		if (score.getMass_score() == null) {
			score.setMass_score(0.0);
		}
		double multipleScore = 0.0;
		int leaderRatio = 20;
		int cadreRatio = 50;
		int massRatio = 30;
	
		multipleScore = +score.getLeader_score() * leaderRatio + score.getCadre_score() * cadreRatio + score.getMass_score() * massRatio;
		return multipleScore / 100;
	}

	// 重载setScore方法，获得“优秀”与“称职”的分数分隔点
	public void setScore(People people, String score, PeopleType pt, Score s, int surveyCount) {
		String scoreFlag = pt.getId().toString();
		if (scoreFlag.equals("1")) {
			s.setLeader_score(Double.parseDouble(score) / (surveyCount * 100));
		} else if (scoreFlag.equals("2")) {
			s.setCadre_score(Double.parseDouble(score) / (surveyCount * 100));
		} else if (scoreFlag.equals("3")) {
//			StringBuffer sqlForMassCount = new StringBuffer("select count(distinct sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='3' and sd.delFlag='1'");
//			if (null != people && null != people.getUnit()) {
//				if(null != people.getUnit().getOffice() && !"".equals(people.getUnit().getOffice()) && !"null".equals(people.getUnit().getOffice()) && !"0".equals(people.getUnit().getOffice())) {
//					sqlForMassCount.append(" and sd.userInfo.unit.office='" + people.getUnit().getOffice() + "'");
////					 and sd.userInfo.unit.id='" + people.getUnit().getId() + "'"
//				} else if(null == people.getUnit().getOffice() || "".equals(people.getUnit().getOffice()) || "null".equals(people.getUnit().getOffice()) || "0".equals(people.getUnit().getOffice())) {
//					if(null != people.getUnit().getId() && !"".equals(people.getUnit().getId())) {
//						sqlForMassCount.append(" and sd.userInfo.unit.id='" + people.getUnit().getId() + "'");
//					}
//				}
//			}
//			Query countForMass = getSession().createQuery(sqlForMassCount.toString());
//			massCount = Integer.parseInt(countForMass.list().get(0).toString());
			s.setMass_score(Double.parseDouble(score) / (surveyCount * 100));
		} else {
			// System.out.println("people_type表中的id是不是改了，这样会造成程序的混乱");
		}
	}

	// 根据不同的测评类型来构造Score对象
	public void setScore(People people, String score, PeopleType pt, Score s, Iterator iterator, int surveyCount) {
		String scoreFlag = pt.getId().toString();
		DecimalFormat   dfForSingleScore   =new   java.text.DecimalFormat("#.00");
		if (scoreFlag.equals("1")) {
			double leaderScore = Double.parseDouble(score) / (surveyCount * 100);
			leaderScore = Double.parseDouble(dfForSingleScore.format(leaderScore));
			if(leaderScore>100)
				leaderScore=100;
			s.setLeader_score(leaderScore);
			iterator.remove();
		} else if (scoreFlag.equals("2")) {
			double cadreScore = Double.parseDouble(score) / (surveyCount * 100);
			cadreScore = Double.parseDouble(dfForSingleScore.format(cadreScore));
			if(cadreScore>100)
				cadreScore=100;
			s.setCadre_score(cadreScore);
			iterator.remove();
		} else if (scoreFlag.equals("3")) {
//			StringBuffer sqlForMassCount = new StringBuffer("select count(distinct sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='3' and sd.delFlag='1'");
//			if (null != people && null != people.getUnit()) {
//				if(null != people.getUnit().getOffice() && !"".equals(people.getUnit().getOffice()) && !"null".equals(people.getUnit().getOffice()) && !"0".equals(people.getUnit().getOffice())) {
//					sqlForMassCount.append(" and sd.userInfo.unit.office='" + people.getUnit().getOffice() + "'");
////					 and sd.userInfo.unit.id='" + people.getUnit().getId() + "'"
//				} else if(null == people.getUnit().getOffice() || "".equals(people.getUnit().getOffice()) || "null".equals(people.getUnit().getOffice()) || "0".equals(people.getUnit().getOffice())) {
//					if(null != people.getUnit().getId() && !"".equals(people.getUnit().getId())) {
//						sqlForMassCount.append(" and sd.userInfo.unit.id='" + people.getUnit().getId() + "'");
//					}
//				}
//			}
//			Query countForMass = getSession().createQuery(sqlForMassCount.toString());
//			massCount = Integer.parseInt(countForMass.list().get(0).toString());
			double massScore = Double.parseDouble(score) / (surveyCount * 100);
			massScore = Double.parseDouble(dfForSingleScore.format(massScore));
			if(massScore>100)
				massScore=100;
			s.setMass_score(massScore);
			iterator.remove();
		} else {
			// System.out.println("people_type表中的id是不是改了，这样会造成程序的混乱");
		}
	}
	private double filterExtremeScore(List oList,int head)
	{
		List filterdList= new ArrayList();
		Object[] all = oList.toArray();
		double total = 0;
		for(int i = head;i<oList.size()-head;i++)
		{
			filterdList.add(all[i]);
			total += ((Score)all[i]).getScore();
			//System.out.println("score:"+ ((Score)all[i]).getScore());
		}
		//System.out.println("head:"+head+" filted size:"+ filterdList.size()+"origin:"+oList.size());
		oList.clear();
		oList.addAll(filterdList);
		if(filterdList.size()>0)
		return total/filterdList.size();
		else
			 return 0.0;
	}
	// 查找该干部人员的所有测评类型的得分
	public Score findScore(People p, List<Object> oList) {
		Score s = new Score();
		Iterator iterator = oList.iterator();
		System.out.println("oList size:"+ oList.size());
		while (iterator.hasNext()) {
			Object[] o = (Object[]) iterator.next();
			People people = (People) o[0];
			String score = o[1].toString();
			PeopleType pt = (PeopleType) o[2];
			int surveyCount = Integer.parseInt(o[3].toString());
			if (people.equals(p)) {
				setScore(people, score, pt, s, iterator, surveyCount);
			} else {
				// // System.out.println("这次没找到，请继续查找");
			}
		}
		return s;
	}

	// 重载findScore方法，获得“优秀”与“称职”的分数分隔点
	public Score findScore(People p, List<Object> oList, int flag) {
		Score s = new Score();
		Iterator iterator = oList.iterator();
		while (iterator.hasNext()) {
			Object[] o = (Object[]) iterator.next();
			People people = (People) o[0];
			String score = o[1].toString();
			PeopleType pt = (PeopleType) o[2];
			int surveyCount = Integer.parseInt(o[3].toString());
			if (people.equals(p)) {
				System.out.println(people.getName() + "," + pt.getName() + "的测评人数:" + surveyCount);
				setScore(people, score, pt, s, surveyCount);
			} else {
				// // System.out.println("这次没找到，请继续查找");
			}
		}
		return s;
	}
	
	public Map<String, Object> statistic(SurveyDetail surveyDetail,List<SurveyStandard> stardardList) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<People> pList = new ArrayList<People>();// 存储所有干部
		List<Object> oList = new ArrayList<Object>();// 存储查询结果
		List<SurveyStatistic> ssList = new ArrayList<SurveyStatistic>();// 存储SurveyStatistic对象
//		int leaderCount = 0;
//		int cadreCount = 0;
//		int massCount = 0;
		try {
			StringBuffer sqlForStatistic = new StringBuffer(
					"select p, sum(ss.ratio*sd.score), pt, count(distinct sd.userInfo.id) from People as p, SurveyStandard as ss, SurveyDetail as sd, PeopleType as pt, UserInfo as ui where ss.id=sd.surveyStandard.id and p.id=sd.people.id and pt.id=ui.peopleType.id and sd.userInfo=ui.id and p.delFlag='1' and ss.delFlag='1' and  sd.delFlag='1' and pt.delFlag='1' and ui.delFlag='1'");

			// sqlForPeople语句的必要性：若不使用sqlForPeople,那我们可根据sqlForStatistic语句来得到部分people对象（已被测评的对象），这样在分数查询时
			// 只能列出部分people对象的成绩。若使用sqlForPeople语句，可得到所有people对象，若未测评，可置为未测评状态，这样做的缺点是多一次查询
			StringBuffer sqlForPeople = new StringBuffer("from People p where p.delFlag=1");
			
//			StringBuffer sqlForLeaderCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='1' and sd.delFlag='1'");
//			StringBuffer sqlForCadreCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='2' and sd.delFlag='1'");
//			StringBuffer sqlForMassCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='3' and sd.delFlag='1'");

			if (surveyDetail != null && surveyDetail.getPeople() != null) {
				if (surveyDetail.getPeople().getId() != null && !"".equals(surveyDetail.getPeople().getId())) {
					sqlForPeople.append(" and p.id='" + surveyDetail.getPeople().getId() + "'");
				}
				if (surveyDetail.getPeople().getUnit() != null && surveyDetail.getPeople().getUnit().getId() != null && !"".equals(surveyDetail.getPeople().getUnit().getId())) {
					sqlForPeople.append(" and p.unit.id='" + surveyDetail.getPeople().getUnit().getId() + "'");
				}
			}
			if(surveyDetail != null && surveyDetail.getUserInfo() != null && surveyDetail.getUserInfo().getYear() != null && !"".equals(surveyDetail.getUserInfo().getYear())) {
				sqlForStatistic.append(" and ui.year='" + surveyDetail.getUserInfo().getYear() + "'");
			}
			if(surveyDetail != null && surveyDetail.getYear() != null && !"".equals(surveyDetail.getYear())) {
				sqlForStatistic.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForLeaderCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForCadreCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForMassCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
			}
			sqlForStatistic.append(" group by p.id, pt.id");
			sqlForPeople.append(" order by p.level asc");
			System.out.println(sqlForStatistic);
			System.out.println(sqlForPeople);
			Query queryForStatistic = getSession().createQuery(sqlForStatistic.toString());
			Query queryForPeople = getSession().createQuery(sqlForPeople.toString());
//			Query queryForLeaderCount = getSession().createQuery(sqlForLeaderCount.toString());
//			Query queryForCadreCount = getSession().createQuery(sqlForCadreCount.toString());
//			Query queryForMassCount = getSession().createQuery(sqlForMassCount.toString());
			
			oList = queryForStatistic.list();
			pList = queryForPeople.list();
			
			StringBuffer sb = new StringBuffer(128);
			sb.append("select count(sd.score) as cn_score,people,ss.id,sd.score from survey_detail sd,survey_standard ss,user_info ui where sd.del_flag=1 and sd.survey_standard=ss.id and sd.year='2015' and sd.user_info=ui.id  and ui.people_type =2 group by people,ss.id,sd.score order by people,ss.id,sd.score desc");
			Query cnList = getSession().createSQLQuery(sb.toString());
			Map<String,AllCounter> itemMap = new HashMap<String,AllCounter>(200);
			Iterator iterator = cnList.list().iterator();
			while (iterator.hasNext()) {
				Object[] o = (Object[]) iterator.next();
		
				BigInteger cn_score = (BigInteger)o[0]; //分项统计值
				String people_id = (String)o[1];
				String standard_id = (String)o[2];
				Integer item_score = (Integer)o[3];  //分项分数
				System.out.println("+++++standard_id:" + standard_id);
				AllCounter allCounter = new AllCounter(stardardList);
				if(itemMap.get(people_id)==null)
				{
					allCounter = new AllCounter(stardardList);
					itemMap.put(people_id, allCounter);
				}
				else
				{
					allCounter = itemMap.get(people_id);
				}
					ItemCounter icn= (ItemCounter)allCounter.get(standard_id);
					icn.put(item_score.intValue(), cn_score);
    		}
			System.out.println("+++++item count num:" + itemMap.size());
//			leaderCount = queryForLeaderCount.list().size();
//			cadreCount = queryForCadreCount.list().size();
//			massCount = queryForMassCount.list().size();
			System.out.println(oList.size() + "," +  pList.size());
			// 根据综合得分进行排名，综合得分的前15%为优秀，下面方法得到排名第15%的干部的综合得分，并根据该得分判断人员的级别（优秀/称职/不称职）
			DecimalFormat   dfForLevel   =new   java.text.DecimalFormat("#.00");  
			double levelFlag = findLevelFlag(oList);
			levelFlag = Double.parseDouble(dfForLevel.format(levelFlag));
			// System.out.println("+++++levelFlag:" + levelFlag);
			for (People p : pList) {
				SurveyStatistic ssc = new SurveyStatistic();
				ssc.setPeople(p);
				Score score = findScore(p, oList);// 获得该p的所有类型的得分
				ssc.setScore(score);
				DecimalFormat   df4MultipleScore   =new   java.text.DecimalFormat("#.00");  
				double multipleScore = getMultipleScore(score);
				multipleScore = Double.parseDouble(df4MultipleScore.format(multipleScore));
				if(multipleScore>100)
					multipleScore=100;
				ssc.setMultipleScore(multipleScore);
				if (levelFlag > 60) {
					if (multipleScore >= levelFlag) {
						ssc.setLevel("优秀");
					} else if (multipleScore >= 60) {
						ssc.setLevel("称职");
					} else {
						ssc.setLevel("不称职");
					}
				} else {
					// System.out.println("优秀的分值<=60");
				}
				ssList.add(ssc);
				System.out.println("+++++stardardList:" + stardardList.size());
				AllCounter allCounter = itemMap.get(p.getId());
				ssc.setAllCounter(allCounter);
			}
			
			map.put("items", ssList);
			return map;
		} catch (RuntimeException re) {
			log.error("statistic failed", re);
			throw re;
		}
	}
	// 统计得分
	public Map<String, Object> statistic(SurveyDetail surveyDetail) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<People> pList = new ArrayList<People>();// 存储所有干部
		List<Object> oList = new ArrayList<Object>();// 存储查询结果
		List<SurveyStatistic> ssList = new ArrayList<SurveyStatistic>();// 存储SurveyStatistic对象
//		int leaderCount = 0;
//		int cadreCount = 0;
//		int massCount = 0;
		try {
			StringBuffer sqlForStatistic = new StringBuffer(
					"select p, sum(ss.ratio*sd.score), pt, count(distinct sd.userInfo.id) from People as p, SurveyStandard as ss, SurveyDetail as sd, PeopleType as pt, UserInfo as ui where ss.id=sd.surveyStandard.id and p.id=sd.people.id and pt.id=ui.peopleType.id and sd.userInfo=ui.id and p.delFlag='1' and ss.delFlag='1' and sd.delFlag='1' and pt.delFlag='1' and ui.delFlag='1'");

			// sqlForPeople语句的必要性：若不使用sqlForPeople,那我们可根据sqlForStatistic语句来得到部分people对象（已被测评的对象），这样在分数查询时
			// 只能列出部分people对象的成绩。若使用sqlForPeople语句，可得到所有people对象，若未测评，可置为未测评状态，这样做的缺点是多一次查询
			StringBuffer sqlForPeople = new StringBuffer("from People p where p.delFlag=1");
			
//			StringBuffer sqlForLeaderCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='1' and sd.delFlag='1'");
//			StringBuffer sqlForCadreCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='2' and sd.delFlag='1'");
//			StringBuffer sqlForMassCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='3' and sd.delFlag='1'");

			if (surveyDetail != null && surveyDetail.getPeople() != null) {
				if (surveyDetail.getPeople().getId() != null && !"".equals(surveyDetail.getPeople().getId())) {
					sqlForPeople.append(" and p.id='" + surveyDetail.getPeople().getId() + "'");
				}
				if (surveyDetail.getPeople().getUnit() != null && surveyDetail.getPeople().getUnit().getId() != null && !"".equals(surveyDetail.getPeople().getUnit().getId())) {
					sqlForPeople.append(" and p.unit.id='" + surveyDetail.getPeople().getUnit().getId() + "'");
				}
			}
			if(surveyDetail != null && surveyDetail.getUserInfo() != null && surveyDetail.getUserInfo().getYear() != null && !"".equals(surveyDetail.getUserInfo().getYear())) {
				sqlForStatistic.append(" and ui.year='" + surveyDetail.getUserInfo().getYear() + "'");
			}
			if(surveyDetail != null && surveyDetail.getYear() != null && !"".equals(surveyDetail.getYear())) {
				sqlForStatistic.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForLeaderCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForCadreCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
//				sqlForMassCount.append(" and sd.year='" + surveyDetail.getYear() + "'");
			}
			sqlForStatistic.append(" group by p.id, pt.id");
			sqlForPeople.append(" order by p.level asc");
			System.out.println(sqlForStatistic);
			System.out.println(sqlForPeople);
			Query queryForStatistic = getSession().createQuery(sqlForStatistic.toString());
			Query queryForPeople = getSession().createQuery(sqlForPeople.toString());
//			Query queryForLeaderCount = getSession().createQuery(sqlForLeaderCount.toString());
//			Query queryForCadreCount = getSession().createQuery(sqlForCadreCount.toString());
//			Query queryForMassCount = getSession().createQuery(sqlForMassCount.toString());

			oList = queryForStatistic.list();
			pList = queryForPeople.list();
//			leaderCount = queryForLeaderCount.list().size();
//			cadreCount = queryForCadreCount.list().size();
//			massCount = queryForMassCount.list().size();
			System.out.println(oList.size() + "," +  pList.size());
			// 根据综合得分进行排名，综合得分的前15%为优秀，下面方法得到排名第15%的干部的综合得分，并根据该得分判断人员的级别（优秀/称职/不称职）
			DecimalFormat   dfForLevel   =new   java.text.DecimalFormat("#.00");  
			double levelFlag = findLevelFlag(oList);
			levelFlag = Double.parseDouble(dfForLevel.format(levelFlag));
			// System.out.println("+++++levelFlag:" + levelFlag);
			for (People p : pList) {
				SurveyStatistic ssc = new SurveyStatistic();
				ssc.setPeople(p);
				Score score = findScore(p, oList);// 获得该p的所有类型的得分
				ssc.setScore(score);
				DecimalFormat   df4MultipleScore   =new   java.text.DecimalFormat("#.00");  
				double multipleScore = getMultipleScore(score);
				multipleScore = Double.parseDouble(df4MultipleScore.format(multipleScore));
				if(multipleScore>100)
					multipleScore=100;
				ssc.setMultipleScore(multipleScore);
				if (levelFlag > 60) {
					if (multipleScore >= levelFlag) {
						ssc.setLevel("优秀");
					} else if (multipleScore >= 60) {
						ssc.setLevel("称职");
					} else {
						ssc.setLevel("不称职");
					}
				} else {
					// System.out.println("优秀的分值<=60");
				}
				ssList.add(ssc);
			}

			map.put("items", ssList);
			return map;
		} catch (RuntimeException re) {
			log.error("statistic failed", re);
			throw re;
		}
	}

	public Map<String, Object> statisticWithFilter(SurveyDetail surveyDetail) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<People> pList = new ArrayList<People>();// 存储所有干部
		List<Object> oList = new ArrayList<Object>();// 存储查询结果
		List<SurveyStatistic> ssList = new ArrayList<SurveyStatistic>();// 存储SurveyStatistic对象
//		int leaderCount = 0;
//		int cadreCount = 0;
//		int massCount = 0;
		try {

			// sqlForPeople语句的必要性：若不使用sqlForPeople,那我们可根据sqlForStatistic语句来得到部分people对象（已被测评的对象），这样在分数查询时
			// 只能列出部分people对象的成绩。若使用sqlForPeople语句，可得到所有people对象，若未测评，可置为未测评状态，这样做的缺点是多一次查询
			StringBuffer sqlForPeople = new StringBuffer("from People p where p.delFlag=1");
			
//			StringBuffer sqlForLeaderCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='1' and sd.delFlag='1'");
//			StringBuffer sqlForCadreCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='2' and sd.delFlag='1'");
//			StringBuffer sqlForMassCount = new StringBuffer("select distinct(sd.userInfo.id) from SurveyDetail as sd where sd.userInfo.peopleType.id='3' and sd.delFlag='1'");

			if (surveyDetail != null && surveyDetail.getPeople() != null) {
				if (surveyDetail.getPeople().getId() != null && !"".equals(surveyDetail.getPeople().getId())) {
					sqlForPeople.append(" and p.id='" + surveyDetail.getPeople().getId() + "'");
				}
				if (surveyDetail.getPeople().getUnit() != null && surveyDetail.getPeople().getUnit().getId() != null && !"".equals(surveyDetail.getPeople().getUnit().getId())) {
					sqlForPeople.append(" and p.unit.id='" + surveyDetail.getPeople().getUnit().getId() + "'");
				}
			}
   		sqlForPeople.append(" order by p.level asc");
			System.out.println(sqlForPeople);
			Query queryForPeople = getSession().createQuery(sqlForPeople.toString());
//			Query queryForLeaderCount = getSession().createQuery(sqlForLeaderCount.toString());
//			Query queryForCadreCount = getSession().createQuery(sqlForCadreCount.toString());
//			Query queryForMassCount = getSession().createQuery(sqlForMassCount.toString());

			pList = queryForPeople.list();
//			leaderCount = queryForLeaderCount.list().size();
//			cadreCount = queryForCadreCount.list().size();
//			massCount = queryForMassCount.list().size();
			System.out.println(oList.size() + "," +  pList.size());
			// 根据综合得分进行排名，综合得分的前15%为优秀，下面方法得到排名第15%的干部的综合得分，并根据该得分判断人员的级别（优秀/称职/不称职）
			DecimalFormat   dfForLevel   =new   java.text.DecimalFormat("#.00");  
			double levelFlag = findLevelFlag(oList);
			levelFlag = Double.parseDouble(dfForLevel.format(levelFlag));
			// System.out.println("+++++levelFlag:" + levelFlag);
			for (People p : pList) {
				StringBuffer sqlForStatistic = new StringBuffer(
				"select  sum(ss.ratio*sd.score) as totalscore, ui.people_type,user_info from  Survey_Standard as ss, Survey_Detail as sd, User_Info as ui where ss.id=sd.survey_standard and sd.user_Info=ui.id ");

				if(surveyDetail != null && surveyDetail.getUserInfo() != null && surveyDetail.getUserInfo().getYear() != null && !"".equals(surveyDetail.getUserInfo().getYear())) {
					sqlForStatistic.append(" and ui.year='" + surveyDetail.getUserInfo().getYear() + "'");
				}
				if(surveyDetail != null && surveyDetail.getYear() != null && !"".equals(surveyDetail.getYear())) {
					sqlForStatistic.append(" and sd.year='" + surveyDetail.getYear() + "'");
				}
				sqlForStatistic.append("and sd.people='").append(p.getId());
				sqlForStatistic.append("' group by ui.people_type,user_info order by people_type,totalscore;");
				System.out.println(sqlForStatistic);
				Query queryForStatistic = getSession().createQuery(sqlForStatistic.toString());
				oList = queryForStatistic.list();
				int head = (int)(oList.size()*0.10);
				filterExtremeScore(oList,head);
				
				SurveyStatistic ssc = new SurveyStatistic();
				ssc.setPeople(p);
				Score score = findScore(p, oList);// 获得该p的所有类型的得分
				ssc.setScore(score);
				DecimalFormat   df4MultipleScore   =new   java.text.DecimalFormat("#.00");  
				double multipleScore = getMultipleScore(score);
				multipleScore = Double.parseDouble(df4MultipleScore.format(multipleScore));
				ssc.setMultipleScore(multipleScore);
				if (levelFlag > 60) {
					if (multipleScore >= levelFlag) {
						ssc.setLevel("优秀");
					} else if (multipleScore >= 60) {
						ssc.setLevel("称职");
					} else {
						ssc.setLevel("不称职");
					}
				} else {
					// System.out.println("优秀的分值<=60");
				}
				ssList.add(ssc);
			}

			map.put("items", ssList);
			return map;
		} catch (RuntimeException re) {
			log.error("statistic failed", re);
			throw re;
		}
	}
	public static void main(String args[])
	{
		SurveyDetailDAO dao = new SurveyDetailDAO();
		SurveyDetail surveyDetail = new SurveyDetail();
		dao.statisticWithFilterTest(surveyDetail );
		
	}
	
	public Map<String, Object> statisticWithFilterTest(SurveyDetail surveyDetail) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<People> pList = new ArrayList<People>();// 存储所有干部
		List<Object> oList = new ArrayList<Object>();// 存储查询结果
		List<SurveyStatistic> ssList = new ArrayList<SurveyStatistic>();// 存储SurveyStatistic对象
		try {

			StringBuffer sqlForPeople = new StringBuffer("select id,name from People p where p.del_Flag=1");
		
   		sqlForPeople.append(" order by p.level asc");
			System.out.println(sqlForPeople);
			try{
			Statement stmt = DAOUtils.getConnection().createStatement();
			ResultSet rs = stmt.executeQuery(sqlForPeople.toString());
			while(rs.next())
			{
			  People p = new People();
			  p.setId(rs.getString(1));
			  p.setName(rs.getString(2));
			  pList.add(p);
			}
			}catch(SQLException sqle)
			{sqle.printStackTrace();}
			
//			leaderCount = queryForLeaderCount.list().size();
//			cadreCount = queryForCadreCount.list().size();
//			massCount = queryForMassCount.list().size();
		//	System.out.println(oList.size() + "," +  pList.size());
			// 根据综合得分进行排名，综合得分的前15%为优秀，下面方法得到排名第15%的干部的综合得分，并根据该得分判断人员的级别（优秀/称职/不称职）
			DecimalFormat   dfForLevel   =new   java.text.DecimalFormat("#.00");  
			double levelFlag = 88;//findLevelFlag(oList);
			levelFlag = Double.parseDouble(dfForLevel.format(levelFlag));
			// System.out.println("+++++levelFlag:" + levelFlag);
			for (People p : pList) {
				StringBuffer sqlForStatistic = new StringBuffer(
				"select  sum(ss.ratio*sd.score)/100 as totalscore, ui.people_type as pt,user_info from  Survey_Standard as ss, Survey_Detail as sd, User_Info as ui where ss.id=sd.survey_standard and sd.user_Info=ui.id ");

				if(surveyDetail != null && surveyDetail.getUserInfo() != null && surveyDetail.getUserInfo().getYear() != null && !"".equals(surveyDetail.getUserInfo().getYear())) {
					sqlForStatistic.append(" and ui.year='" + surveyDetail.getUserInfo().getYear() + "'");
				}
				if(surveyDetail != null && surveyDetail.getYear() != null && !"".equals(surveyDetail.getYear())) {
					sqlForStatistic.append(" and sd.year='" + surveyDetail.getYear() + "'");
				}
				sqlForStatistic.append("and sd.people='").append(p.getId());
				sqlForStatistic.append("' group by ui.people_type,user_info order by people_type,totalscore");
			//	System.out.println(sqlForStatistic);
				Map hs = new HashMap();
				hs.put(1, new ArrayList(256));
				hs.put(2, new ArrayList(256));
				hs.put(3, new ArrayList(256));
				try{
					Statement stmt = DAOUtils.getConnection().createStatement();
					ResultSet rs = stmt.executeQuery(sqlForStatistic.toString());
					while(rs.next())
					{
					  Score s = new Score();
					 
					  List list = (List)hs.get(rs.getInt(2));
					  
					  s.setScore(rs.getDouble(1));
						 
					  list.add(s);
					}
					}catch(SQLException sqle)
					{sqle.printStackTrace();}		
				Score score = new Score();
				for(int i=1;i<4;i++)
				{
					List list = (List)hs.get(i);
					//过滤掉前后5%的成绩
					int head = new BigDecimal((list.size()*0.05)).setScale(0, BigDecimal.ROUND_HALF_UP).intValue();
					if(head<1)
						head = 1;
					double sc = filterExtremeScore(list,head);
					switch(i)
					{
					case 1: score.setLeader_score(sc);break;
					case 2: score.setCadre_score(sc);break;
					case 3: score.setMass_score(sc);break;
					}
				}
				
				SurveyStatistic ssc = new SurveyStatistic();
				ssc.setPeople(p);
				ssc.setScore(score);
				DecimalFormat   df4MultipleScore   =new   java.text.DecimalFormat("#.00");  
				double multipleScore = getMultipleScoreTest(score);
				
				multipleScore = Double.parseDouble(df4MultipleScore.format(multipleScore));
				ssc.setMultipleScore(multipleScore);
				if (levelFlag > 60) {
					if (multipleScore >= levelFlag) {
						ssc.setLevel("优秀");
					} else if (multipleScore >= 60) {
						ssc.setLevel("称职");
					} else {
						ssc.setLevel("不称职");
					}
				} else {
					// System.out.println("优秀的分值<=60");
				}
				ssList.add(ssc);
				
				 System.out.println(p.getName()+ "      "+df4MultipleScore.format(score.getLeader_score())+"		"+df4MultipleScore.format(score.getCadre_score())+"			"+df4MultipleScore.format(score.getMass_score())+"		"+df4MultipleScore.format(multipleScore));
			}

			map.put("items", ssList);
			return map;
		} catch (RuntimeException re) {
			log.error("statistic failed", re);
			throw re;
		}
	}
	
	// 查询
	public List<SurveyDetail> find(SurveyDetail sd) throws Exception {
		// Map<String, Object> map = null;
		List<SurveyDetail> list = new ArrayList<SurveyDetail>();
		int count = 0;
		try {
			// map = new HashMap<String, Object>();
			StringBuffer sql = new StringBuffer("from SurveyDetail as s where s.delFlag=1");
			if (null != sd && null != sd.getUserInfo() && !"".equals(sd.getUserInfo().getId())) {
				sql.append(" and s.userInfo.id='" + sd.getUserInfo().getId() + "'");
			}
			if (null != sd && null != sd.getPeople() && !"".equals(sd.getPeople().getId())) {
				sql.append(" and s.people.id='" + sd.getPeople().getId() + "'");
			}
			if (null != sd && null != sd.getSurveyStandard() && !"".equals(sd.getSurveyStandard().getId())) {
				sql.append(" and s.surveyStandard.id='" + sd.getSurveyStandard().getId() + "'");
			}
			if (null != sd && null != sd.getYear() && !"".equals(sd.getYear())) {
				sql.append(" and s.year=" + sd.getYear());
			}
			Query query = getSession().createQuery(sql.toString());
			list = query.list();
		} catch (Exception e) {
			// throw e;
			throw e;
		}
		return list;
	}

	public SurveyDetail merge(SurveyDetail detachedInstance) {
		log.debug("merging SurveyDetail instance");
		try {
			SurveyDetail result = (SurveyDetail) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(SurveyDetail instance) {
		log.debug("attaching dirty SurveyDetail instance");
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(SurveyDetail instance) {
		log.debug("attaching clean SurveyDetail instance");
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}

// List<People> listForLevelFlag = new ArrayList<People>();
// String sqlForLevelFlag =
// "select p from People as p, SurveyStandard as ss, SurveyDetail as sd, PeopleType as pt, UserInfo as ui where ss.id=sd.surveyStandard.id and p.id=sd.people.id and pt.id=ui.peopleType.id and sd.userInfo=ui.id and sd.delFlag='1' and p.delFlag='1' and ss.delFlag='1' and pt.delFlag='1' and ui.delFlag='1' group by p.name order by sum(ss.ratio*sd.score/100) desc";
// Query queryForLevelFlag = getSession().createQuery(sqlForLevelFlag);
// listForLevelFlag = queryForLevelFlag.list();
// int size = listForLevelFlag.size();
// for (People people : listForLevelFlag) {
// // System.out.println(people.getName());
// }
// // TODO 向上取整还是向下取整
// int levelFlag = (size * 15) / 100;
// People levelPeople = listForLevelFlag.get(levelFlag);
// Score score = findScore(levelPeople, oList, leaderCount, cadreCount,
// massCount);
// levelScore = getMultipleScore(score);
// // System.out.println("级别分割点：" + levelScore + "levelFlag:" + levelFlag + "size:"
// + size);

// // System.out.println("获得分割点：" + levelFlag + "," +
// listForLevelFlag.get(levelFlag).getName());
// Iterator iterator = listForLevelFlag.iterator();
// while(iterator.hasNext()) {
// Object[] o = (Object[]) iterator.next();
// People p = (People) o[0];
// String score = (String) o[1].toString();
// // System.out.println("得分：" + p.getName() + "," + score);
// }
// for (People p : pList) {
// //SurveyStatistic ssc = new SurveyStatistic();
// //ssc.setPeople(p);
// Score score = findScore(p, oList, leaderCount, cadreCount,
// massCount);// 获得该p的所有类型的得分
// // // System.out.println("为空？" + score.getLeader_score());
// //ssc.setScore(score);
// // // System.out.println("===" + score.getMass_score());
// double multipleScore = getMultipleScore(score);
// //ssc.setMultipleScore(multipleScore);
// //ssList.add(ssc);
// }
// Iterator iterator = oList.iterator();
// while (iterator.hasNext()) {
// Object[] o = (Object[]) iterator.next();
// People people = (People) o[0];
// String score = o[1].toString();
// PeopleType pt = (PeopleType) o[2];
// }

// 用于构造Score对象
// public Score findScore(List<Object> oList, People p, String sonScore,
// PeopleType pt) {
// Score s = new Score();
// String scoreFlag = pt.getId();
// if(scoreFlag.equals("1")) {
// s.setLeader_score(Double.parseDouble(sonScore));
// }else if(scoreFlag.equals("2")) {
// s.setCadre_score(Double.parseDouble(sonScore));
// }else if(scoreFlag.equals("3")) {
// s.setMass_score(Double.parseDouble(sonScore));
// }else {
// // System.out.println("people_type表中的数据是不是改了，这样会造成程序的混乱");
// }
//	
// //查找其他两种类型的得分
// Iterator iterator = oList.iterator();
// while(iterator.hasNext()) {
// Object[] o = (Object[])iterator.next();
// People initPeople = (People)o[0];
//		
// if(initPeople.equals(p)) {
// // System.out.println("找到了" + initPeople.getName() + "好的，获取他得得分");
// Iterator itForScore = oList.iterator();
// while(itForScore.hasNext()) {
// Object[] oForScore = (Object[])itForScore.next();
// String initScore = oForScore[1].toString();
// //PeopleType pt = (PeopleType)oForScore[2];
// People pForScore = initPeople;
// }
// break;
// }else {
// // System.out.println("没找到，继续找");
// }
// }
// return s;
// }

// Iterator iterator = oList.iterator();
// while(iterator.hasNext()) {//拼接surveyStatistic对象
// SurveyStatistic ssc = new SurveyStatistic();
// Object[] o = (Object[]) iterator.next();
// People p = (People)o[0];
// ssc.setPeople(p);
// String sonScore = o[1].toString();
// PeopleType pt = (PeopleType)o[2];
// Score score = findScore(oList, p, sonScore, pt);
// ssc.setScore(score);
// ssList.add(ssc);
// iterator.remove();
// }
// // System.out.println("数据是否完整？" + ssList.size());
// for(SurveyStatistic ss : ssList) {
// // System.out.println("再测试：" + ss.getPeople().getName() + "," +
// ss.getScore().getCadre_score() + "," +
// ss.getScore().getLeader_score() + "," +
// ss.getScore().getMass_score());
// }