package com.donglusoft.user.DAO;

import com.donglusoft.sysconf.domain.PeopleType;
import com.donglusoft.sysconf.domain.Unit;
import com.donglusoft.user.domain.UserInfo;
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

@Repository("userInfoDAO")
public class UserInfoDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(UserInfoDAO.class);
  public static final String PASSWORD = "password";
  public static final String YEAR = "year";
  public static final String LOGIN_COUNT = "loginCount";
  public static final String FIELDS1 = "fields1";
  public static final String FIELDS2 = "fields2";

  public UserInfo login(UserInfo transientInstance)
  {
    log.debug("用户login");
    log.debug("密码：" + transientInstance.getPassword() + "用户名:" + transientInstance.getUsername());
    try {
      List list = getSession().createQuery(
        "from UserInfo as u where u.delFlag=1 and u.password='" + transientInstance.getPassword() + 
        "' and u.username='" + transientInstance.getUsername() + "'").list();
      if ((list == null) || (list.size() < 1)) {
        log.debug("登录失败，数据库没有该用户");
        return null;
      }
      UserInfo rightUser = (UserInfo)list.get(0);
      if ((transientInstance.getUsername().equals(rightUser.getUsername())) && (transientInstance.getPassword().equals(rightUser.getPassword()))) {
        return rightUser;
      }
      log.debug("登录失败，与数据库数据不符，可能sql注入");
      return null;
    }
    catch (RuntimeException e)
    {
      log.error("login failed", e);
      throw e;
    }
  }

  public void update(UserInfo ui)
  {
    try {
      log.debug("update UserInfo instance");
      UserInfo u = (UserInfo)getSession().get(UserInfo.class, ui.getId());
      if ((ui != null) && (u != null) && 
        (ui.getStateFlag() != null) && (!("".equals(ui.getStateFlag())))) {
        u.setStateFlag(ui.getStateFlag());
      }

      log.debug("update successful");
    } catch (RuntimeException re) {
      log.error("update failed");
    }
  }

  public void save(UserInfo transientInstance) {
    try {
      log.debug("saving UserInfo instance");
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);

      throw re;
    }
  }

  public void delete(UserInfo persistentInstance) {
    log.debug("deleting UserInfo instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public UserInfo findById(String id) {
    log.debug("getting UserInfo instance with id: " + id);
    try {
      UserInfo instance = (UserInfo)getSession().get("com.donglusoft.user.domain.UserInfo", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(UserInfo instance) {
    log.debug("finding UserInfo instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.user.domain.UserInfo").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding UserInfo instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from UserInfo as model where model." + propertyName + "= ?";
      Query queryObject = getSession().createQuery(queryString);
      queryObject.setParameter(0, value);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find by property name failed", re);
      throw re;
    }
  }

  public List findByPassword(Object password) {
    return findByProperty("password", password);
  }

  public List findByYear(Object year) {
    return findByProperty("year", year);
  }

  public List findByLoginCount(Object loginCount) {
    return findByProperty("loginCount", loginCount);
  }

  public List findByFields1(Object fields1) {
    return findByProperty("fields1", fields1);
  }

  public List findByFields2(Object fields2) {
    return findByProperty("fields2", fields2);
  }

  public List search(UserInfo u) {
    log.debug("search UserInfo instances");
    try {
      StringBuilder sql = new StringBuilder("from UserInfo as u where u.delFlag=1");
      if (u != null) {
        if ((u.getPeopleType() != null) && (u.getPeopleType().getId() != null) && (!(u.getPeopleType().getId().equals("")))) {
          sql.append(" and u.peopleType.id='" + u.getPeopleType().getId() + "'");
        }
        if ((u.getUnit() != null) && (u.getUnit().getId() != null) && (!(u.getUnit().getId().equals("")))) {
          sql.append(" and u.unit.id='" + u.getUnit().getId() + "'");
        }
        if ((u.getUsername() != null) && (!(u.getUsername().equals("")))) {
          sql.append(" and u.username='" + u.getUsername() + "'");
        }
        if ((u.getYear() != null) && (!(u.getYear().equals("")))) {
          sql.append(" and u.year='" + u.getYear() + "'");
        }
        if ((u.getStateFlag() != null) && (!(u.getStateFlag().equals("")))) {
          sql.append(" and u.stateFlag='" + u.getStateFlag() + "'");
        }
      }
      Query query = getSession().createQuery(sql.toString());

      return query.list();
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public List findAll() {
    log.debug("finding all UserInfo instances");
    try {
      String queryString = "from UserInfo where delFlag=1";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public UserInfo merge(UserInfo detachedInstance) {
    log.debug("merging UserInfo instance");
    try {
      UserInfo result = (UserInfo)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(UserInfo instance) {
    log.debug("attaching dirty UserInfo instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void del(String id)
  {
    try {
      if (!(id.equals("undefined"))) {
        UserInfo u = (UserInfo)getSession().get(UserInfo.class, id);
        u.setDelFlag(Integer.valueOf(0));
      }
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public void attachClean(UserInfo instance) {
    log.debug("attaching clean UserInfo instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }
}