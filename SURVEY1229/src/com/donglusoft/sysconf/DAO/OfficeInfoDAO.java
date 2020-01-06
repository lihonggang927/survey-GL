package com.donglusoft.sysconf.DAO;

import com.donglusoft.sysconf.domain.OfficeInfo;
import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.util.BaseHibernateDAO;

import java.util.ArrayList;
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

@Repository("officeInfoDAO")
public class OfficeInfoDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(OfficeInfoDAO.class);
  public static final String NAME = "name";
  public static final String ADDRESS = "address";
  public static final String LEGAL_PERSON = "legalPerson";
  public static final String PEOPLE_COUNT = "peopleCount";
  public static final String DEL_FLAG = "delFlag";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public OfficeInfo save(OfficeInfo transientInstance)
  {
    log.debug("saving OfficeInfo instance");
    try {
      getSession().save(transientInstance);

      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
    return transientInstance;
  }

  public void delete(OfficeInfo persistentInstance) {
    log.debug("deleting OfficeInfo instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public OfficeInfo findById(String id) {
    log.debug("getting Unit instance with id: " + id);
    try {
    	OfficeInfo instance = (OfficeInfo)getSession().get("com.donglusoft.sysconf.domain.OfficeInfo", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(OfficeInfo instance) {
    log.debug("finding Unit instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.sysconf.domain.OfficeInfo").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding Unit instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from OfficeInfo as model where model." + propertyName + "= ?";
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

  

  public List findOffice() {
    log.debug("finding all Unit instances");
    try {
      String queryString = "from Unit p where p.delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public List findAll() {
    log.debug("finding all Unit instances");
    try {
      String queryString = "from OfficeInfo p ";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public OfficeInfo merge(OfficeInfo detachedInstance) {
    log.debug("merging OfficeInfo instance");
    try {
    	OfficeInfo result = (OfficeInfo)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(OfficeInfo instance) {
    log.debug("attaching dirty OfficeInfo instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(OfficeInfo instance) {
    log.debug("attaching clean OfficeInfo instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public Map<String, Object> search(OfficeInfo u) {
    Map unitMap = new HashMap();
    List unitList = new ArrayList();
    try {
      StringBuffer sqlForUnit = new StringBuffer("from OfficeInfo where 1=1");
      if ((u != null) && (u.getName() != null) && (!("".equals(u.getName())))) {
        sqlForUnit.append(" and name='" + u.getName() + "'");
      }
      Query queryForUnit = getSession().createQuery(sqlForUnit.toString());
      unitList = queryForUnit.list();
      unitMap.put("items", unitList);
    } catch (RuntimeException re) {
      log.error("search(Unit u)失败");
      re.printStackTrace();
    }
    return unitMap;
  }

  public Map<String, Object> search(String[] propertyNames, int start, int limit) {
    Map unitMap = new HashMap();
    try {
      List unitList = new ArrayList();
      if (propertyNames == null) {
        unitList = findAll();
      }
      unitMap.put("items", unitList);
      unitMap.put("count", Integer.valueOf(unitList.size()));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return unitMap;
  }

  
  public String saveOrUpdate(String attribute, String value, OfficeInfo unit) {
	    try {
	      if ((unit.getId() == null) || (unit.getId().equals(""))) {
	           getSession().save(unit);

	        return unit.getId();
	      }
	      update(attribute, value, unit);
	      return "update";
	    }
	    catch (RuntimeException re) {
	      throw re;
	    }
	  }
  public void del(String id) {
	    try {
	    	 if (!(id.equals("undefined"))) {
	    		 OfficeInfo p = (OfficeInfo)getSession().get(OfficeInfo.class, id);
	        getSession().delete(p);
	    	 }
	    } catch (RuntimeException re) {
	      throw re;
	    }
	  }
	  public void update(String attribute, String value, OfficeInfo unit) {
	    try {
	    	OfficeInfo u = (OfficeInfo)getSession().get(OfficeInfo.class, unit.getId());

	      if (attribute.equals("id")) {
	        u.setId(value); return; }
	      if (attribute.equals("name")) {
	        u.setName(value); return; }
	      
	    }
	    catch (RuntimeException re)
	    {
	      throw re;
	    }
	  }
  
}