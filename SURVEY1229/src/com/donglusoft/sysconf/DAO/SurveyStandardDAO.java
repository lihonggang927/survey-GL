package com.donglusoft.sysconf.DAO;

import com.donglusoft.sysconf.domain.SurveyStandard;
import com.donglusoft.util.BaseHibernateDAO;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("surveyStandardDAO")
public class SurveyStandardDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(SurveyStandardDAO.class);
  public static final String NAME = "name";
  public static final String RATIO = "ratio";
  public static final String DEL_FLAG = "delFlag";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public void save(SurveyStandard transientInstance)
  {
    log.debug("saving SurveyStandard instance");
    try {
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
  }

  public void delete(SurveyStandard persistentInstance) {
    log.debug("deleting SurveyStandard instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public SurveyStandard findById(String id) {
    log.debug("getting SurveyStandard instance with id: " + id);
    try {
      SurveyStandard instance = (SurveyStandard)getSession().get("com.donglusoft.sysconf.domain.SurveyStandard", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(SurveyStandard instance) {
    log.debug("finding SurveyStandard instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.sysconf.domain.SurveyStandard").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding SurveyStandard instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from SurveyStandard as model where model." + propertyName + "= ?";
      Query queryObject = getSession().createQuery(queryString);
      queryObject.setParameter(0, value);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find by property name failed", re);
      throw re;
    }
  }

  public List findByName(Object name) {
    return findByProperty("name", name);
  }

  public List findByRatio(Object ratio) {
    return findByProperty("ratio", ratio);
  }

  public List findByDelFlag(Object delFlag) {
    return findByProperty("delFlag", delFlag);
  }

  public List findByFields1(Object fields1) {
    return findByProperty("fields1", fields1);
  }

  public List findByFields2(Object fields2) {
    return findByProperty("fields2", fields2);
  }

  public List findAll() {
    log.debug("finding all SurveyStandard instances");
    try {
      String queryString = "from SurveyStandard p where p.delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }
  
  public List findAllSurvey() {
	    log.debug("finding all SurveyStandard instances");
	    try {
	      String queryString = "from SurveyStandard p where p.delFlag=1 and fields1=1";
	      Query queryObject = getSession().createQuery(queryString);
	      return queryObject.list();
	    } catch (RuntimeException re) {
	      log.error("find all failed", re);
	      throw re;
	    }
	  }

  public List findAllOrderByName() {
    log.debug("finding all SurveyStandard instances");
    try {
      String queryString = "from SurveyStandard p where p.delFlag=1 order by p.name asc";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public SurveyStandard merge(SurveyStandard detachedInstance) {
    log.debug("merging SurveyStandard instance");
    try {
      SurveyStandard result = (SurveyStandard)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(SurveyStandard instance) {
    log.debug("attaching dirty SurveyStandard instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(SurveyStandard instance) {
    log.debug("attaching clean SurveyStandard instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public String saveOrUpdate(String attribute, String value, SurveyStandard surveyStandard) {
    try {
      if ((surveyStandard.getId() == null) || (surveyStandard.getId().equals(""))) {
        surveyStandard.setDelFlag(Integer.valueOf(1));
        getSession().save(surveyStandard);

        return surveyStandard.getId();
      }
      update(attribute, value, surveyStandard);
      return "update";
    }
    catch (RuntimeException re) {
      throw re;
    }
  }

  public void del(String id) {
    try {
      if (!(id.equals("undefined"))) {
        SurveyStandard p = (SurveyStandard)getSession().get(SurveyStandard.class, id);
        p.setDelFlag(Integer.valueOf(0));
      }
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public void update(String attribute, String value, SurveyStandard surveyStandard) {
    try {
      SurveyStandard s = (SurveyStandard)getSession().get(SurveyStandard.class, surveyStandard.getId());

      if (attribute.equals("id")) {
        s.setId(value); return; }
      if (attribute.equals("name")) {
        s.setName(value); return; }
      if (attribute.equals("fields1")) {
          s.setFields1(value); return; }
      if (attribute.equals("ratio")) {
        s.setRatio(Integer.valueOf(Integer.parseInt(value)));
      }
    }
    catch (RuntimeException re)
    {
      throw re;
    }
  }
}