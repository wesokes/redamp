Ext.define('RedAmp.shell.Shell', {
	extend: 'Lapidos.shell.dom.Dom',
	
	///////////////////////////////////////////////////////////////////////////
	// Requires
	///////////////////////////////////////////////////////////////////////////
	requires:[
		'RedAmp.Application'
	],
	
	///////////////////////////////////////////////////////////////////////////
	// Config
	///////////////////////////////////////////////////////////////////////////
	config:{
		view: null
	},
	
	///////////////////////////////////////////////////////////////////////////
	// Inits
	///////////////////////////////////////////////////////////////////////////
	init: function(){
		this.initView();
	},
	
	initView: function(){
		this.view = Ext.create('RedAmp.Application', {
			shell: this,
			os: this.getOs()
		});
	},
	
	getView: function(){
		return this.view;
	},
	
	///////////////////////////////////////////////////////////////////////////
	// Events
	///////////////////////////////////////////////////////////////////////////
	onModuleLaunch: function(manager, module, launchParams){
		console.log('on module launch');
		this.callParent(arguments);
		if(Ext.isFunction(module.isViewable) && module.isViewable()){
			this.view.getCenter().setLoading('Loading');
			this.view.getCenter().setLoading('Loading ' + module.getName() + '...');
			module.getActiveView(function(view){
				console.log(view);
				this.view.getCenter().setLoading(false);
				this.view.setActive(view);
			}, this);
		}
	}	
});
