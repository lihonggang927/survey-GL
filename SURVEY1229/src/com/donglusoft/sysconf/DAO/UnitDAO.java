package com.donglusoft.sysconf.DAO;

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

@Repository("unitDAO")
public class UnitDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(UnitDAO.class);
  public static final String NAME = "name";
  public static final String ADDRESS = "address";
  public static final String LEGAL_PERSON = "legalPerson";
  public static final String PEOPLE_COUNT = "peopleCount";
  public static final String DEL_FLAG = "delFlag";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public Unit save(Unit transientInstance)
  {
    log.debug("saving Unit instance");
    try {
      getSession().save(transientInstance);

      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
    return transientInstance;
  }

  public void delete(Unit persistentInstance) {
    log.debug("deleting Unit instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public Unit findById(String id) {
    log.debug("getting Unit instance with id: " + id);
    try {
      Unit instance = (Unit)getSession().get("com.donglusoft.sysconf.domain.Unit", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(Unit instance) {
    log.debug("finding Unit instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.sysconf.domain.Unit").add(Example.create(instance)).list();
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
      String queryString = "from Unit as model where model." + propertyName + "= ?";
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

  public List findByAddress(Object address) {
    return findByProperty("address", address);
  }

  public List findByLegalPerson(Object legalPerson) {
    return findByProperty("legalPerson", legalPerson);
  }

  public List findByPeopleCount(Object peopleCount) {
    return findByProperty("peopleCount", peopleCount);
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
      String queryString = "from Unit p where p.delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public Unit merge(Unit detachedInstance) {
    log.debug("merging Unit instance");
    try {
      Unit result = (Unit)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(Unit instance) {
    log.debug("attaching dirty Unit instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(Unit instance) {
    log.debug("attaching clean Unit instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public Map<String, Object> search(Unit u) {
    Map unitMap = new HashMap();
    List unitList = new ArrayList();
    try {
      StringBuffer sqlForUnit = new StringBuffer("from Unit where delFlag='1'");
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

  public void del(String id) {
    try {
      if (!(id.equals("undefined"))) {
        Unit p = (Unit)getSession().get(Unit.class, id);
        p.setDelFlag(Integer.valueOf(0));
      }
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public String saveOrUpdate(String attribute, String value, Unit unit) {
    try {
      if ((unit.getId() == null) || (unit.getId().equals(""))) {
        unit.setDelFlag(Integer.valueOf(1));
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

  public void update(String attribute, String value, Unit unit) {
    try {
      Unit u = (Unit)getSession().get(Unit.class, unit.getId());

      if (attribute.equals("id")) {
        u.setId(value); return; }
      if (attribute.equals("name")) {
        u.setName(value); return; }
      if (attribute.equals("address")) {
        u.setAddress(value); return; }
      if (attribute.equals("legalPerson")) {
        u.setLegalPerson(value); return; }
      if (attribute.equals("peopleCount")) {
        u.setPeopleCount(Integer.valueOf(Integer.parseInt(value))); return; }
      if (attribute.equals("office")) {
        u.setOffice(value); return;
      }
      if (!(attribute.equals("lockFlag")))
        return;
      u.setLockFlag(value);
    }
    catch (RuntimeException re)
    {
      throw re;
    }
  }
}