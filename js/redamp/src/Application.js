/**
 * @extends Ext.container.Viewport
 * @singleton
 */
Ext.define('RedAmp.Application', {
	extend: 'Ext.container.Viewport',
	
	///////////////////////////////////////////////////
	//	Config
	///////////////////////////////////////////////////
	
	layout: 'border',
	
	constructor: function(){
		this.callParent(arguments);
	},
	
	initComponent: function(){
		this.items = this.items || [];
		this.init();
		this.callParent(arguments);
	},
	
	//////////////////////////////////////////////////////////////////////
	//	Init Functions
	/////////////////////////////////////////////////////////////////////
	init: function(){
		//Init ext items
		this.initExt();
		
		//Init the cookie provider
		this.initCookieProvider();
		
		//Init the regions
		this.initNorth();
		this.initSouth();
		this.initEast();
		this.initWest();
		this.initCenter();
		this.initNavigation();
	},
	
	initExt: function(){
		//Init Quicktips
		Ext.tip.QuickTipManager.init();
		
		//Prototype the field to always show the msgTarget on the side
		Ext.form.field.Base.prototype.msgTarget = 'side';
	},
	
	initCookieProvider: function(){
		this.cookieProvider = Ext.create('Ext.state.CookieProvider', {});
		Ext.state.Manager.setProvider(this.cookieProvider);
	},
	
	initNorth: function(){
		this.north = new Ext.panel.Panel({
			region: 'north'
		});
		this.items.push(this.north);
	},
	
	initSouth: function(){
		this.south = new Ext.panel.Panel({
			region: 'south',
			unstyled: true,
			border: false
		});
		this.items.push(this.south);
	},
	
	initEast: function(){
	},
	
	initWest: function(){
	},
	
	initCenter: function(){
		this.center = new Ext.panel.Panel({
			region: 'center',
			layout: 'card'
		});
		this.items.push(this.center);
	},
	
	initNavigation: function(){
		this.navigation = Ext.create('Lapidos.shell.navigation.Dom', {
			flex: 1,
			store: this.shell.getNavigationStore(),
			tags: ['application'],
			height: 50
		});
		this.getSouth().add(this.navigation);
	},
	
	
	//////////////////////////////////////////////////////////////////////
	//	Accessors
	/////////////////////////////////////////////////////////////////////
	getCookieProvider: function(){
		return this.cookieProvider;
	},
	
	/**
     * Gets the north panel of the applications interface
	 * @return {Ext.panel.Panel} panel
     */
	getNorth: function(){
		return this.north;
	},
	
	/**
     * Gets the south panel of the applications interface
	 * @return {Ext.panel.Panel} panel
     */
	getSouth: function(){
		return this.south;
	},
	
	/**
     * Gets the east panel of the applications interface
	 * @return {Ext.panel.Panel} panel
     */
	getEast: function(){
		return this.east;
	},
	
	/**
     * Gets the west panel of the applications interface
	 * @return {Ext.panel.Panel} panel
     */
	getWest: function(){
		return this.west;
	},
	
	/**
     * Gets the center panel of the applications interface
	 * @return {Ext.panel.Panel} panel
     */
	getCenter: function(){
		return this.center;
	},
	
	/**
     * Gets the navigation panel of the application
	 * @return {Ext.panel.Panel} panel
     */
	getNavigation: function(){
		return this.west;
	},
	
	///////////////////////////////////////////////////////////////////////////
	// Mutators
	///////////////////////////////////////////////////////////////////////////
	
	/**
     * Sets the applications active screen to the passed in item
	 * @param {Ext.component.Component} item
     */
	setActive: function(item){
		this.getCenter().getLayout().setActiveItem(item);
	}
});
