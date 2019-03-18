function TimeLine($el,data){
	var self=this;
	this.container=$el;
	this.el=null;
	this.data=null;
	this.years={};	// $yearContainer对象集合
	this.model='jump';	// jump access
	this._sort=function(data){
		var len=data.length;
		data.sort(function(a,b){return b.year-a.year});
		while(len--){
			var item=data[len];
			item.events.length?item.events.sort(function(a,b){return new Date(item.year,b.month-1,b.day)-new Date(item.year,a.month-1,a.day)}):data.splice(len,1);
		}
		self.data=data;
		return self;
	}
	this.formatDate=function(month,day){
		return toDouble(month)+'月'+toDouble(day)+'日';
	}
	this._createEvent=function(year,event){
		var $li=$('<li></li>',{'class':'timeline-day-container clearfix'});
		$('<span></span>',{'class':'timeline-day fl'}).html(self.formatDate(event.month,event.day)).appendTo($li);
		$('<p></p>',{'class':'timeline-message fl'}).html(event.event).appendTo($li);
		return $li;
	};
	this._create=function(){
		self.el=$('<div></div>',{'id':'timeLine'});
		self.data.forEach(function(item){
			var year=item.year,
				$yearContainer=$yearContainer=$('<div></div>',{'class':'timeline-year-container'}),
				$year=$('<h3></h3>',{'class':'timeline-year'}).html(year).appendTo($yearContainer),
				$list=$('<ul></ul>',{'class':'timeline-list'}).appendTo($yearContainer);
			self.years[year]=$yearContainer;
			item.events.forEach(function(event){
				$list.append(self._createEvent(year,event));
			});
			$yearContainer.appendTo(self.el);
		});
		self.el.appendTo(self.container);
		return self;
	};
	this._setModel=function(model){
		if(self.model!==model){
			if(model==='access')
				for(var p in self.years)
					self.years[p].show();
			self.model=model;
		}
		return self;
	};
	this.accessToYear=function(year){
		if(year in self.years){
			for(var p in self.years)
				self.years[p]['slide'+(year===+p?'Down':'Up')](500);
			self._setModel('access');
		}
		return self;
	};
	this.jumpToYear=function(year){
		if(year in self.years){
			self._setModel('jump');
        	$("html,body").animate({scrollTop:self.years[year].offset().top},500);  
		}
		return self;
	};
	this.recover=function(){
		return self.jumpToYear(self.data[0].year);
	};
	this.init=function(data){
		if(self.container&&Array.isArray(data)){
			self._sort(data)._create();
		}else{
			console.warn('TimeLine arguments error');
		}
		return self;
	};
	return self.init(data);
}
function toDouble(n){
	return +n<10?('0'+n):n;
}