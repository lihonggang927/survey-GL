package com.donglusoft.sysconf.DAO;

import com.donglusoft.sysconf.domain.PeopleType;
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

@Repository("peopleTypeDAO")
public class PeopleTypeDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(PeopleTypeDAO.class);
  public static final String NAME = "name";
  public static final String RATIO = "ratio";
  public static final String DEL_FLAG = "delFlag";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public void save(PeopleType transientInstance)
  {
    log.debug("saving PeopleType instance");
    try {
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
  }

  public void delete(PeopleType persistentInstance) {
    log.debug("deleting PeopleType instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public PeopleType findById(String id) {
    log.debug("getting PeopleType instance with id: " + id);
    try {
      PeopleType instance = (PeopleType)getSession().get("com.donglusoft.sysconf.domain.PeopleType", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(PeopleType instance) {
    log.debug("finding PeopleType instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.sysconf.domain.PeopleType").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding PeopleType instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from PeopleType as model where model." + propertyName + "= ?";
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
    log.debug("finding all PeopleType instances");
    try {
      String queryString = "from PeopleType p where p.delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public List<PeopleType> search(PeopleType pt) {
    log.debug("search PeopleType instances");
    try {
      StringBuffer sql = new StringBuffer("from PeopleType p where p.delFlag=1");
      if (pt != null) {
        if ((pt.getId() != null) && (!("".equals(pt.getId())))) {
          sql.append(" and p.id='" + pt.getId() + "'");
        }
        if ((pt.getDelFlag() != null) && (!("".equals(pt.getDelFlag())))) {
          sql.append(" and p.delFlag='" + pt.getDelFlag() + "'");
        }
        if ((pt.getRatio() != null) && (!("".equals(pt.getRatio())))) {
          sql.append(" and p.ratio='" + pt.getRatio() + "'");
        }
        if ((pt.getLockFlag() != null) && (!("".equals(pt.getLockFlag())))) {
          sql.append(" and p.lockFlag='" + pt.getLockFlag() + "'");
        }
        if ((pt.getName() != null) && (!("".equals(pt.getName())))) {
          sql.append(" and p.name='" + pt.getName() + "'");
        }
      }
      Query queryObject = getSession().createQuery(sql.toString());
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("search PeopleType instances failed", re);
      throw re;
    }
  }

  public PeopleType merge(PeopleType detachedInstance) {
    log.debug("merging PeopleType instance");
    try {
      PeopleType result = (PeopleType)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(PeopleType instance) {
    log.debug("attaching dirty PeopleType instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(PeopleType instance) {
    log.debug("attaching clean PeopleType instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void del(String id) {
    try {
      if (!(id.equals("undefined"))) {
        PeopleType p = (PeopleType)getSession().get(PeopleType.class, id);
        p.setDelFlag(Integer.valueOf(0));
      }
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public String saveOrUpdate(String attribute, String value, PeopleType peopleType) {
    try {
      if ((peopleType.getId() == null) || (peopleType.getId().equals(""))) {
        peopleType.setDelFlag(Integer.valueOf(1));
        getSession().save(peopleType);

        return peopleType.getId();
      }
      update(attribute, value, peopleType);
      return "update";
    }
    catch (RuntimeException re) {
      throw re;
    }
  }

  public void update(String attribute, String value, PeopleType peopleType) {
    try {
      PeopleType p = (PeopleType)getSession().get(PeopleType.class, peopleType.getId());

      if (attribute.equals("id")) {
        p.setId(value); return; }
      if (attribute.equals("name")) {
        p.setName(value); return; }
      if (attribute.equals("ratio")) {
        p.setRatio(Integer.valueOf(Integer.parseInt(value))); return; }
      if (attribute.equals("lockFlag")) {
        p.setLockFlag(value);
      }
    }
    catch (RuntimeException re)
    {
      throw re;
    }
  }
}