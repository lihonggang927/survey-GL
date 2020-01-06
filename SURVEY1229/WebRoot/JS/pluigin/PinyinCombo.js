/**
 *简单的combobox，适用于固定大小的列表
 *eg：var combo=new Ext.ux.SimpleCombo({
 *       applyTo:'combo',
 *       width:200,
 *       store:[11,22,33,44,111,444,5655]
 *    });
 *
 * @author chemzqm@gmail.com
 * @version 1.0.0
 * @createTime 2010-04-18 18:16:19
 */
Ext.ns("Ext.ux");

Ext.ux.PinyinCombo = Ext.extend(Ext.form.ComboBox, {
    emptyText:'请选择...',//为空时的提示
    mode : 'local',
    triggerAction:'all',//每次都弹出所有可选项
    forceSelection:true,//只有选择项是合法的
    selectOnFocus:true,//获得焦点时选中输入域文本
    plugins:[Ext.ux.PinyinFilter]
});
Ext.reg('pinyincombo',Ext.ux.PinyinCombo);