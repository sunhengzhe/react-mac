export function throttle(fn, delay, mustRunDelay) {
 	var timer = null;
 	var start;
 	return function (){
 		var context = this, args = arguments, curr = +new Date();
 		clearTimeout(timer);
 		if(!start){
 			start = curr;
 		}
 		if(curr - start >= mustRunDelay){
 			fn.apply(context, args);
 			start = curr;
 		}
 		else {
 			timer = setTimeout(function(){
 				fn.apply(context, args);
 			}, delay);
 		}
 	};
};
