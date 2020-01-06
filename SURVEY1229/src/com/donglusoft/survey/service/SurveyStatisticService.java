package com.donglusoft.survey.service;

import com.donglusoft.survey.DAO.SurveyDetailDAO;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("surveyStatisticService")
@Transactional
public class SurveyStatisticService
{

  @Resource
  private SurveyDetailDAO surveyDetailDAO;
}