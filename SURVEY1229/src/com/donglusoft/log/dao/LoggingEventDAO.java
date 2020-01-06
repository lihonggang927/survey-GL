package com.donglusoft.log.dao;

import com.donglusoft.log.domain.LoggingEvent;
import com.donglusoft.util.BaseHibernateDAO;
import java.util.HashMap;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("loggingEventDAO")
public class LoggingEventDAO extends BaseHibernateDAO
{
  private static final Logger log = LoggerFactory.getLogger(LoggingEventDAO.class);
  public static final String TIMESTMP = "timestmp";
  public static final String FORMATTED_MESSAGE = "formattedMessage";
  public static final String LOGGER_NAME = "loggerName";
  public static final String LEVEL_STRING = "levelString";
  public static final String THREAD_NAME = "threadName";
  public static final String REFERENCE_FLAG = "referenceFlag";
  public static final String ARG0 = "arg0";
  public static final String ARG1 = "arg1";
  public static final String ARG2 = "arg2";
  public static final String ARG3 = "arg3";
  public static final String CALLER_FILENAME = "callerFilename";
  public static final String CALLER_CLASS = "callerClass";
  public static final String CALLER_METHOD = "callerMethod";
  public static final String CALLER_LINE = "callerLine";

  public void save(LoggingEvent transientInstance)
  {
    log.debug("saving LoggingEvent instance");
    try {
      getSession().save(transientInstance);
      log.debug("save successful");
    } catch (RuntimeException re) {
      log.error("save failed", re);
      throw re;
    }
  }

  public void delete(LoggingEvent persistentInstance) {
    log.debug("deleting LoggingEvent instance");
    try {
      getSession().delete(persistentInstance);
      log.debug("delete successful");
    } catch (RuntimeException re) {
      log.error("delete failed", re);
      throw re;
    }
  }

  public LoggingEvent findById(Long id) {
    log.debug("getting LoggingEvent instance with id: " + id);
    try {
      LoggingEvent instance = (LoggingEvent)getSession().get("com.donglusoft.log.domain.LoggingEvent", id);
      return instance;
    } catch (RuntimeException re) {
      log.error("get failed", re);
      throw re;
    }
  }

  public List findByExample(LoggingEvent instance) {
    log.debug("finding LoggingEvent instance by example");
    try {
      List results = getSession().createCriteria("com.donglusoft.log.domain.LoggingEvent").add(Example.create(instance)).list();
      log.debug("find by example successful, result size: " + results.size());
      return results;
    } catch (RuntimeException re) {
      log.error("find by example failed", re);
      throw re;
    }
  }

  public List findByProperty(String propertyName, Object value) {
    log.debug("finding LoggingEvent instance with property: " + propertyName + ", value: " + value);
    try {
      String queryString = "from LoggingEvent as model where model." + propertyName + "= ?";
      Query queryObject = getSession().createQuery(queryString);
      queryObject.setParameter(0, value);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find by property name failed", re);
      throw re;
    }
  }

  public List findByTimestmp(Object timestmp) {
    return findByProperty("timestmp", timestmp);
  }

  public List findByFormattedMessage(Object formattedMessage) {
    return findByProperty("formattedMessage", formattedMessage);
  }

  public List findByLoggerName(Object loggerName) {
    return findByProperty("loggerName", loggerName);
  }

  public List findByLevelString(Object levelString) {
    return findByProperty("levelString", levelString);
  }

  public List findByThreadName(Object threadName) {
    return findByProperty("threadName", threadName);
  }

  public List findByReferenceFlag(Object referenceFlag) {
    return findByProperty("referenceFlag", referenceFlag);
  }

  public List findByArg0(Object arg0) {
    return findByProperty("arg0", arg0);
  }

  public List findByArg1(Object arg1) {
    return findByProperty("arg1", arg1);
  }

  public List findByArg2(Object arg2) {
    return findByProperty("arg2", arg2);
  }

  public List findByArg3(Object arg3) {
    return findByProperty("arg3", arg3);
  }

  public List findByCallerFilename(Object callerFilename) {
    return findByProperty("callerFilename", callerFilename);
  }

  public List findByCallerClass(Object callerClass) {
    return findByProperty("callerClass", callerClass);
  }

  public List findByCallerMethod(Object callerMethod) {
    return findByProperty("callerMethod", callerMethod);
  }

  public List findByCallerLine(Object callerLine) {
    return findByProperty("callerLine", callerLine);
  }

  public List findAll() {
    log.debug("finding all LoggingEvent instances");
    try {
      String queryString = "from LoggingEvent";
      Query queryObject = getSession().createQuery(queryString);
      return queryObject.list();
    } catch (RuntimeException re) {
      log.error("find all failed", re);
      throw re;
    }
  }

  public LoggingEvent merge(LoggingEvent detachedInstance) {
    log.debug("merging LoggingEvent instance");
    try {
      LoggingEvent result = (LoggingEvent)getSession().merge(detachedInstance);
      log.debug("merge successful");
      return result;
    } catch (RuntimeException re) {
      log.error("merge failed", re);
      throw re;
    }
  }

  public void attachDirty(LoggingEvent instance) {
    log.debug("attaching dirty LoggingEvent instance");
    try {
      getSession().saveOrUpdate(instance);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public void attachClean(LoggingEvent instance) {
    log.debug("attaching clean LoggingEvent instance");
    try {
      getSession().lock(instance, LockMode.NONE);
      log.debug("attach successful");
    } catch (RuntimeException re) {
      log.error("attach failed", re);
      throw re;
    }
  }

  public HashMap<String, Object> scan() {
    HashMap map = new HashMap();
    try {
      String queryString = "from LoggingEvent as log order by timestmp desc";

      Query queryObject = getSession().createQuery(queryString);

      List loggingEvents = queryObject.list();
      for (int i = 0; i < loggingEvents.size(); ++i);
      map.put("items", loggingEvents);

      return map;
    } catch (RuntimeException re) {
      throw re;
    }
  }

  public HashMap<String, Object> findByCriteria(Integer start, Integer limit, String startTime, String endTime, String logType, String userName) {
    HashMap map = new HashMap();
    try {
      StringBuffer queryString = new StringBuffer("from LoggingEvent as log where 1=1");
      StringBuffer countString = new StringBuffer("select count(*) from LoggingEvent log where 1=1");
      if ((startTime != null) && (!(startTime.equals("")))) {
        queryString.append("and log.timestmp>" + startTime);
        countString.append("and log.timestmp>" + startTime);
      }
      if ((endTime != null) && (!(endTime.equals("")))) {
        queryString.append("and log.timestmp<" + endTime);
        countString.append("and log.timestmp<" + endTime);
      }
      if ((logType != null) && (!(logType.equals(""))) && (!(logType.equals("other")))) {
        queryString.append("and log.loggerName='" + logType + "'");
        countString.append("and log.loggerName='" + logType + "'");
      } else if ((logType != null) && (!(logType.equals("")))) {
        queryString.append("and log.loggerName not in('entryAdd','entryUpdate','entryDel','purchaseAdd','purchaseUpdate','purchaseDel','outboundAdd','outboundUpdate','outboundDel','right','system','statistics')");
        countString.append("and log.loggerName not in('entryAdd','entryUpdate','entryDel','purchaseAdd','purchaseUpdate','purchaseDel','outboundAdd','outboundUpdate','outboundDel','right','system','statistics')");
      }
      if ((userName != null) && (!(userName.equals("")))) {
        queryString.append("and log.arg0='" + userName + "'");
        countString.append("and log.arg0='" + userName + "'");
      }
      queryString.append("order by timestmp desc");
      Query query = getSession().createQuery(queryString.toString());
      Query countObject = getSession().createQuery(countString.toString());
      if (start == null) {
        start = Integer.valueOf(0);
      }
      if (limit == null) {
        limit = Integer.valueOf(15);
      }
      query.setFirstResult(start.intValue());
      query.setMaxResults(limit.intValue());
      Long count = (Long)countObject.uniqueResult();
      map.put("items", query.list());
      map.put("count", count);
      return map;
    } catch (RuntimeException re) {
      throw re;
    }
  }
}