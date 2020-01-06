package com.donglusoft.user.DAO;

import com.donglusoft.user.domain.UserLogin;
import com.donglusoft.util.BaseHibernateDAO;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("userLoginDAO")
public class UserLoginDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(UserLoginDAO.class);
  public static final String IP_ADDRESS = "ipAddress";
  public static final String LOGIN_TIME = "loginTime";
  public static final String SURVEY_DATA = "surveyData";
  public static final String DEL_FLAG = "delFlag";

  public Map<String, Object> scan()
  {
    log.debug("scan all UserLogin instances");
    try {
      Map map = new HashMap();
      String queryString = "from UserLogin where delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      map.put("userLogins", queryObject.list());
      return map;
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public void save(UserLogin transientInstance) {
    log.debug("saving UserLogin instance");
    try {
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
  }

  public void delete(UserLogin persistentInstance) {
    log.debug("deleting UserLogin instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public UserLogin findById(String id) {
    log.debug("getting UserLogin instance with id: " + id);
    try {
      UserLogin instance = (UserLogin)getSession()
        .get("com.donglusoft.user.domain.UserLogin", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(UserLogin instance)
  {
    log.debug("finding UserLogin instance by example");
    try {
      List results = getSession()
        .createCriteria("com.donglusoft.user.domain.UserLogin")
        .add(Example.create(instance))
        .list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding UserLogin instance with property: " + propertyName + 
      ", value: " + value);
    try {
      String queryString = "from UserLogin as model where model." + 
        propertyName + "= ?";
      Query queryObject = getSession().createQuery(queryString);
      queryObject.setParameter(0, value);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find by property name failed", re);
      throw re;
    }
  }

  public List findByIpAddress(Object ipAddress)
  {
    return findByProperty("ipAddress", ipAddress);
  }

  public List findByLoginTime(Object loginTime)
  {
    return findByProperty("loginTime", loginTime);
  }

  public List findBySurveyData(Object surveyData)
  {
    return findByProperty("surveyData", surveyData);
  }

  public List findByDelFlag(Object delFlag)
  {
    return findByProperty("delFlag", delFlag);
  }

  public List findAll()
  {
    log.debug("finding all UserLogin instances");
    try {
      String queryString = "from UserLogin";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public UserLogin merge(UserLogin detachedInstance) {
    log.debug("merging UserLogin instance");
    try {
      UserLogin result = (UserLogin)getSession()
        .merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(UserLogin instance) {
    log.debug("attaching dirty UserLogin instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(UserLogin instance) {
    log.debug("attaching clean UserLogin instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }
}