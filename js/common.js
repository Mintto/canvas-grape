const random  = (max,min) => Math.round( (Math.random()*(max-min+1))+min );
function App(){
	let 
	grape = Array.from(document.getElementsByClassName("grape")),
	count = random(7,3),
	result = [];
	while(result.length != count ) result.push( { value : random(10000,10) , color: `rgb(${random(200,0)},${random(250,0)},${random(250,0)},1)` , name : result.length } );
	grape.map( v => {
		let 
		cw = v.width = 500,
		ch = v.height = 500,
		ctx = v.getContext("2d");
		switch(v.title){
			case "A":
			bar_grape(cw,ch,ctx);
			break;
			case "B":
			line_grape(cw,ch,ctx,v);
			break;
			case "C":
			pi_grape(cw,ch,ctx);
			break;
		};
		line(cw,ch,ctx);
	} );
	function line(w,h,ctx){ // line
		ctx.beginPath();
		ctx.rect(0,0,w,h);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 3;
		ctx.stroke();
	}	
	function bar_grape(mw,mh,ctx){ // bar_grape
		let 
		iw = 25,
		pw = 50,
		pt = 35,
		pb = 30,
		w = (mw - ( pw*2+(result.length-1)*iw ))/result.length,
		h = (mh-pt-pb)/100, // (mh-pt-pb)/100
		m = Math.max.apply(null,result.map( v => v.value ))/100; // 제일 큰 기준 아니면 평균
		// window.requestAnimationFrame
		function grape(){
			result.reduce( (acc,v,idx) => {
				let y = mh-pb-(v.value/m)*h; //  y: mh-pb-(v.value/m)*h 
				ctx.beginPath(); // grape 
				ctx.globalAlpha = "0.8";
				ctx.fillStyle = v.color;
				ctx.rect(acc,y,w,(v.value/m)*h); 
				ctx.fill();

				ctx.beginPath(); // percent
				ctx.globalAlpha = "1";
				ctx.textAlign = "center";
				ctx.font = "bold 17px 나눔고딕";
				ctx.fillText(v.value,acc+(w/2),y-10);

				ctx.beginPath(); // name 
				ctx.globalAlpha = "1";
				ctx.textAlign = "center";
				ctx.font = "bold 17px 나눔고딕";
				ctx.fillText(v.name,acc+(w/2),y+(v.value/m)*h+20);
				return acc+w+iw;
			},pw);
		}
		grape();
	}
	function line_grape(mw,mh,ctx,av){ // line_grape
		let 
		pw = 30,
		ph = 35,
		r = 10,
		iw = (mw - pw*2)/(result.length-1);
		h = ( mh-ph*2)/100;
		m = Math.max.apply(null,result.map( v => v.value ))/100;
		function line(){
			ctx.beginPath();
			result.reduce( (acc,v,idx) => {
				let y = mh-ph-(v.value/m)*h;
				if( idx == 0 ) ctx.moveTo(acc,y);
				else ctx.lineTo(acc,y);
				return acc+iw;
			},pw);
			ctx.strokeStyle = "lightgray";
			ctx.lineWidth = 3;
			ctx.stroke();
		}
		function one(){
			result.reduce( (acc,v,idx) => {
				let y = mh-ph-(v.value/m)*h;
				ctx.beginPath();
				ctx.arc(acc,y,r,0,Math.PI*2);
				ctx.fillStyle = v.color;
				ctx.fill();
				font(v.name,acc,y+5,"12px","#fff");
				font(v.value,acc,y-15,"17px",v.color);
				return acc+iw;
			},pw)
		}
		function font(v,x,y,size,color){
			ctx.textAlign = "center";
			ctx.font = "bold "+size+" 나눔고딕";
			ctx.fillStyle = color;
			ctx.fillText(v,x,y);
			// console.log(color);
		}
		line();
		one();
	}
	function pi_grape(mw,mh,ctx){
		let
		padding = 50,
		r = (mw-padding*2)/2,
		x1 = mw/2,
		y1 = mh/2,
		max = Math.max.apply(null,result.map( v => v.value )),
		m = result.reduce( (acc,v) =>{ return acc+v.value },0)/100,
		p1 = 0.5/25,
		p2 = 90/0.5,
		p3 = Math.PI/2/90;
		result.reduce( (acc,v,idx) => {
			let 
			percent = v.value/m*p1,
			angular = percent*p2,
			x2 = Math.cos( Math.PI/2 - (acc.angular+angular/2)*p3 ),
			y2 = Math.sin( Math.PI/2 - (acc.angular+angular/2)*p3 ),
			l = 0;
			y2 = -y2;
			ctx.beginPath();
			if( max == v.value ){
				l = 10;
				ctx.moveTo(x1+x2*10,y1+y2*10);
				ctx.arc(x1+x2*10,y1+y2*10,r,Math.PI*(1.5 + acc.result ),Math.PI*(1.5 + acc.result + percent ));
			}else{
				ctx.moveTo(x1,y1);
				ctx.arc(x1,y1,r,Math.PI*(1.5 + acc.result ),Math.PI*(1.5 + acc.result + percent ));
			}
			ctx.fillStyle = v.color;
			ctx.globalAlpha = "0.6";
			ctx.fill();
			font(`${v.name}:${v.value}`,(x1+x2*(r+20+l) ),(y1+y2*(r+20+l) ),"12px",v.color);
			acc.result += percent;
			acc.angular += angular;
			return acc;
		},{ result : 0,angular : 0 });
		function font(v,x,y,size,color){
			ctx.beginPath();
			ctx.globalAlpha = "1";
			ctx.textAlign = "center";
			ctx.font = "bold "+size+" 나눔고딕";
			ctx.fillStyle = color;
			ctx.fillText(v,x,y);
		}
	}
}
window.onload = function(){
	App();
}