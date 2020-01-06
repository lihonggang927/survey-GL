package com.donglusoft.log.domain;

import java.io.Serializable;

public class LoggingEvent
  implements Serializable
{
  private Long eventId;
  private Long timestmp;
  private String formattedMessage;
  private String loggerName;
  private String levelString;
  private String threadName;
  private Short referenceFlag;
  private String arg0;
  private String arg1;
  private String arg2;
  private String arg3;
  private String callerFilename;
  private String callerClass;
  private String callerMethod;
  private String callerLine;

  public LoggingEvent()
  {
  }

  public LoggingEvent(Long timestmp, String formattedMessage, String loggerName, String levelString, String callerFilename, String callerClass, String callerMethod, String callerLine)
  {
    this.timestmp = timestmp;
    this.formattedMessage = formattedMessage;
    this.loggerName = loggerName;
    this.levelString = levelString;
    this.callerFilename = callerFilename;
    this.callerClass = callerClass;
    this.callerMethod = callerMethod;
    this.callerLine = callerLine;
  }

  public LoggingEvent(Long timestmp, String formattedMessage, String loggerName, String levelString, String threadName, Short referenceFlag, String arg0, String arg1, String arg2, String arg3, String callerFilename, String callerClass, String callerMethod, String callerLine)
  {
    this.timestmp = timestmp;
    this.formattedMessage = formattedMessage;
    this.loggerName = loggerName;
    this.levelString = levelString;
    this.threadName = threadName;
    this.referenceFlag = referenceFlag;
    this.arg0 = arg0;
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = arg3;
    this.callerFilename = callerFilename;
    this.callerClass = callerClass;
    this.callerMethod = callerMethod;
    this.callerLine = callerLine;
  }

  public Long getEventId()
  {
    return this.eventId;
  }

  public void setEventId(Long eventId) {
    this.eventId = eventId;
  }

  public Long getTimestmp() {
    return this.timestmp;
  }

  public void setTimestmp(Long timestmp) {
    this.timestmp = timestmp;
  }

  public String getFormattedMessage() {
    return this.formattedMessage;
  }

  public void setFormattedMessage(String formattedMessage) {
    this.formattedMessage = formattedMessage;
  }

  public String getLoggerName() {
    return this.loggerName;
  }

  public void setLoggerName(String loggerName) {
    this.loggerName = loggerName;
  }

  public String getLevelString() {
    return this.levelString;
  }

  public void setLevelString(String levelString) {
    this.levelString = levelString;
  }

  public String getThreadName() {
    return this.threadName;
  }

  public void setThreadName(String threadName) {
    this.threadName = threadName;
  }

  public Short getReferenceFlag() {
    return this.referenceFlag;
  }

  public void setReferenceFlag(Short referenceFlag) {
    this.referenceFlag = referenceFlag;
  }

  public String getArg0() {
    return this.arg0;
  }

  public void setArg0(String arg0) {
    this.arg0 = arg0;
  }

  public String getArg1() {
    return this.arg1;
  }

  public void setArg1(String arg1) {
    this.arg1 = arg1;
  }

  public String getArg2() {
    return this.arg2;
  }

  public void setArg2(String arg2) {
    this.arg2 = arg2;
  }

  public String getArg3() {
    return this.arg3;
  }

  public void setArg3(String arg3) {
    this.arg3 = arg3;
  }

  public String getCallerFilename() {
    return this.callerFilename;
  }

  public void setCallerFilename(String callerFilename) {
    this.callerFilename = callerFilename;
  }

  public String getCallerClass() {
    return this.callerClass;
  }

  public void setCallerClass(String callerClass) {
    this.callerClass = callerClass;
  }

  public String getCallerMethod() {
    return this.callerMethod;
  }

  public void setCallerMethod(String callerMethod) {
    this.callerMethod = callerMethod;
  }

  public String getCallerLine() {
    return this.callerLine;
  }

  public void setCallerLine(String callerLine) {
    this.callerLine = callerLine;
  }
}