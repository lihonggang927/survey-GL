package com.donglusoft.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Md5 {

	private static final Logger log = LoggerFactory.getLogger("rightmanagementbusiness");

	/**
	 * MD5 加密
	 */
	public String getMD5Str(String str) {
		MessageDigest messageDigest = null;

		try {
			messageDigest = MessageDigest.getInstance("MD5");

			messageDigest.reset();

			messageDigest.update(str.getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException e) {
			log.error("MD5加密抛出NoSuchAlgorithmException异常");
		} catch (UnsupportedEncodingException e) {
			log.error("MD5加密抛出UnsupportedEncodingException异常");
		}

		byte[] byteArray = messageDigest.digest();

		StringBuffer md5StrBuff = new StringBuffer();

		for (int i = 0; i < byteArray.length; i++) {
			if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
				md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
			else
				md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
		}

		return md5StrBuff.toString();
	}

	/**
	 * 
	 * @param newpasswd
	 *            用户输入的加密前的密码
	 * @param oldpasswd
	 *            从数据库取出的加密后的密码
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public boolean checkpassword(String newpasswd, String oldpasswd) {
		if (getMD5Str(newpasswd).equals(oldpasswd)) {
			log.info("密码正确");
			return true;
		} else {
			log.info("密码错误");
			return false;
		}
	}

	public static void main(String[] args) {
		Md5 md5 = new Md5();
		// // System.out.println(md5.getMD5Str("2"));
	}

}
