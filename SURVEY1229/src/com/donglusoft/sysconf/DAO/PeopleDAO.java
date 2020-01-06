package com.donglusoft.sysconf.DAO;

import com.donglusoft.sysconf.domain.People;
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

@Repository("peopleDAO")
public class PeopleDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(PeopleDAO.class);
  public static final String NAME = "name";
  public static final String LEVEL = "level";
  public static final String POSITION = "position";
  public static final String DEL_FLAG = "delFlag";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public void save(People transientInstance)
  {
    log.debug("saving People instance");
    try {
      int maxLevel = 0;
      StringBuffer sql = new StringBuffer("select max(level) from People as s where s.delFlag=1");
      Query query = getSession().createQuery(sql.toString());

      if (query.list().get(0) != null) {
        maxLevel = Integer.parseInt(query.list().get(0).toString());
      }

      transientInstance.setLevel(Integer.valueOf(maxLevel + 1));
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
  }

  public void delete(People persistentInstance) {
    log.debug("deleting People instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public People findById(String id) {
    log.debug("getting People instance with id: " + id);
    try {
      People instance = (People)getSession().get("com.donglusoft.sysconf.domain.People", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(People instance) {
    log.debug("finding People instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.sysconf.domain.People").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding People instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from People as model where model." + propertyName + "= ?";
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

  public List findByLevel(Object level) {
    return findByProperty("level", level);
  }

  public List findByPosition(Object position) {
    return findByProperty("position", position);
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

  public List searchByCondition(People p) {
    try {
      StringBuilder sql = new StringBuilder("from People p where p.delFlag=1");
      if ((p != null) && (p.getUnit() != null)) {
        if ((p.getUnit().getOffice() != null) && (!("".equals(p.getUnit().getOffice()))) && (!("null".equals(p.getUnit().getOffice()))) && (!("0".equals(p.getUnit().getOffice()))))
          sql.append(" and p.unit.office='" + p.getUnit().getOffice() + "'");
        else if ((((p.getUnit().getOffice() == null) || ("".equals(p.getUnit().getOffice())) || ("null".equals(p.getUnit().getOffice())) || ("0".equals(p.getUnit().getOffice())))) && 
          (p.getUnit().getId() != null) && (!("".equals(p.getUnit().getId())))) {
          sql.append(" and p.unit.id='" + p.getUnit().getId() + "'");
        }
      }

      sql.append(" order by p.level asc");
      Query query = getSession().createQuery(sql.toString());
      return query.list();
    } catch (RuntimeException re) {
      log.error("searchByCondition 失败", re);
      throw re;
    }
  }

  public List findAll() {
    log.debug("finding all People instances");
    try {
      String queryString = "from People p where p.delFlag=1 order by p.level asc";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public People merge(People detachedInstance) {
    log.debug("merging People instance");
    try {
      People result = (People)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(People instance) {
    log.debug("attaching dirty People instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(People instance) {
    log.debug("attaching clean People instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public Map<String, Object> search(String[] propertyNames, int start, int limit) {
    Map peopleMap = new HashMap();
    try {
      List peopleList = new ArrayList();
      if (propertyNames == null) {
        peopleList = findAll();
      }

      peopleMap.put("items", peopleList);
      peopleMap.put("count", Integer.valueOf(peopleList.size()));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return peopleMap;
  }

  public String saveOrUpdate(String attribute, String value, People people) {
    try {
      if ((people.getId() == null) || (people.getId().equals(""))) {
        int maxLevel = 0;
        StringBuffer sql = new StringBuffer("select max(level) from People as s where s.delFlag=1");
        Query query = getSession().createQuery(sql.toString());

        if (query.list().get(0) != null) {
          maxLevel = Integer.parseInt(query.list().get(0).toString());
        }

        people.setLevel(Integer.valueOf(maxLevel + 1));
        people.setDelFlag(Integer.valueOf(1));
        getSession().save(people);

        return people.getId();
      }
      update(attribute, value, people);
      return "update";
    }
    catch (RuntimeException re) {
      throw re;
    }
  }

  public void del(String id)
  {
    try {
      if (!(id.equals("undefined"))) {
        People p = (People)getSession().get(People.class, id);
        p.setDelFlag(Integer.valueOf(0));
      }
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public void sort(String[] attributes)
  {
    try {
      People sortPeople = (People)getSession().get(People.class, attributes[2].trim());

      People purposePeople = (People)getSession().get(People.class, attributes[0].trim());
      StringBuffer sql = new StringBuffer("from People as s where s.delFlag=1 and s.level>" + purposePeople.getLevel());
      Query query = getSession().createQuery(sql.toString());
      List list = query.list();

      for (int i = 0; i < list.size(); ++i) {
        People p = (People)list.get(i);
        People updatePeople = (People)getSession().get(People.class, p.getId());
        updatePeople.setLevel(Integer.valueOf(p.getLevel().intValue() + 1));
      }
      if (sortPeople.getLevel().intValue() > purposePeople.getLevel().intValue()) {
        sortPeople.setLevel(purposePeople.getLevel());
        purposePeople.setLevel(Integer.valueOf(purposePeople.getLevel().intValue() + 1)); return;
      }
      sortPeople.setLevel(Integer.valueOf(purposePeople.getLevel().intValue() + 1));
    }
    catch (RuntimeException re) {
      throw re;
    }
  }

  public void update(String attribute, String value, People people) {
    try {
      People p = (People)getSession().get(People.class, people.getId());

      if (attribute.equals("id")) {
        p.setId(value); return; }
      if (attribute.equals("unit")) {
        Unit unit = new Unit();
        unit.setId(value);
        p.setUnit(unit); return; }
      if (attribute.equals("name")) {
        p.setName(value); return; }
      if (attribute.equals("level"))
        return;
      if (attribute.equals("position")) {
        p.setPosition(value); return; }
      if (attribute.equals("delFlag"))
        return;
      if (attribute.equals("fields1")) {
        p.setFields1(value); return; }
      if (attribute.equals("fields2")) {
        p.setFields2(value);
      }
    }
    catch (RuntimeException re)
    {
      throw re;
    }
  }
}