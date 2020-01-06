package com.donglusoft.util;


import javax.annotation.Resource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;


/**
 * Data access object (DAO) for domain model
 * @author MyEclipse Persistence Tools
 */
public class BaseHibernateDAO {
	
	@Resource
	private SessionFactory sessionFactory;
	
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
}