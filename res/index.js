window.onload = function(){
	navi();
	mobile();
}

function mobile(){
	var head = document.getElementsByClassName('head')[0];
	var div = head.children[1];
	addEvent({obj: div, evt: 'click', func: function(){
		var menu = document.getElementsByClassName('menu')[0];
		if(menu.style.display == 'none'){
			menu.style.display = 'block';
		}else{
			menu.style.display = 'none';
		}
	}});
}

function navi(){
	var arr = location.href.match(/\/docs\/(.+?)$/i);
	if(arr && arr[1]){
		var menu = document.getElementsByClassName('menu')[0];
		var links = menu.getElementsByTagName('a');
		for(var i in links){
			var link = links[i];
			var reg = new RegExp(arr[1], 'i');
			var res = reg.test(link.href);
			if(res){
				var parent = link.parentNode;
				if(parent.tagName == 'DT'){
					var ele = parent.children[0];
					var box = next(parent);
				}else{
					var ele = prev(parent).children[0];
					var box = parent;
				}
				ele.className = ele.className.replace('right', 'down');
				box.style.display = 'block';
				var pos = link.getBoundingClientRect();
				var head = document.getElementsByClassName('head')[0];
				menu.children[0].scrollTo(0, pos.y - head.offsetHeight - link.offsetHeight);
				break;
			}
		}
	}
}

function addEvent({obj, evt, func}){
    if(obj.addEventListener){
        if(evt.slice(0, 2) == 'on') evt = evt.slice(2);
        obj.addEventListener(evt, func);
    }else{
        if(evt.slice(0, 2) != 'on') evt = 'on'+ evt;
        obj.attachEvent(evt, func);
    }
}

function prev(ele){
	var near = ele.previousSibling;
	while(near){
		if(near.nodeType === 1){
			return near;
		}
		near = near.previousSibling;
	}
}

function next(ele){
	var near = ele.nextSibling;
	while(near){
		if(near.nodeType === 1){
			return near;
		}
		near = near.nextSibling;
	}
}

function menu(obj){
	var ele = obj.getElementsByClassName('arrow')[0];
	var cls = ele.className;
	var box = next(obj);
	if(cls.indexOf('arrow-right') > 0){
		ele.className = cls.replace('right', 'down');
		box.style.display = 'block';
	}else{
		ele.className = cls.replace('down', 'right');
		box.style.display = 'none';
	}
}

function setMenu(){
	var str = '<dl>';
	var menu = document.getElementsByClassName('menu')[0];
	if(BS_DOC) str += parseMenu(JSON.parse(BS_DOC));
	str += '<dt onclick="menu(this)"><span class="arrow arrow-right"></span><a href="#">附录</a></dt><dd><dl class="api">';
	if(BS_API) str += parseMenu(JSON.parse(BS_API));
	str += '</dl></dd></dl>';
	menu.innerHTML = str;
}

function parseMenu(menu){
	var str = '';
	for(var i in menu){
		var sub = menu[i].sub;
		var cls = "arrow-empty";
		var substr = '';
		if(sub){
			cls = "arrow-right";
			for(var j in sub){
				substr += '<a href="'+ filter(sub[j].href) +'">'+ sub[j].title +'</a>';
			}
		}
		str += '<dt onclick="menu(this)"><span class="arrow '+ cls +'"></span><a href="'+ filter(menu[i].href) +'">'+ menu[i].title +'</a></dt><dd>'+ substr +'</dd>';
	}
	return str;	
}

function filter(href){
	if(typeof INDEX === "undefined" || INDEX != true){
		href = '../'+ href;
	}
	return href;
}