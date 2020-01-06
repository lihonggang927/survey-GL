Ext.onReady(function() {
			var SaleRecord = Ext.data.Record.create([{
						name : 'person',
						type : 'string'
					}, {
						name : 'product',
						type : 'string'
					}, {
						name : 'city',
						type : 'string'
					}, {
						name : 'state',
						type : 'string'
					}, {
						name : 'month',
						type : 'int'
					}, {
						name : 'quarter',
						type : 'int'
					}, {
						name : 'year',
						type : 'int'
					}, {
						name : 'quantity',
						type : 'int'
					}, {
						name : 'value',
						type : 'int'
					}]);

			var myStore = new Ext.data.Store({
						url : basePath + 'Demo/simple_test.json',
						autoLoad : true,
						reader : new Ext.data.JsonReader({
									root : 'rows',
									idProperty : 'id'
								}, SaleRecord)
					});

			var pivotGrid = new Ext.grid.PivotGrid({
						title : '测评页面',
						width : 900,
						height : 90,
						renderTo : 'docbody',
						store : myStore,
						aggregator : 'count',
						measure : 'value',

						viewConfig : {
							title : '干部测评'
						},

						leftAxis : [{
									width : 80,
									dataIndex : 'person'
								}, {
									width : 90,
									dataIndex : 'product'
								}],

						topAxis : [{
									dataIndex : 'year'
								}, {
									dataIndex : 'city'
								}]
					});
		});