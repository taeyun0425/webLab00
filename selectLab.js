"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
    var icon = $$("#labs img");

    for (var i = 0; i < icon.length; i++) {
    	new Draggable(icon[i], {revert: true});
    }
    // var pad = $$("#selectpad img");
    // for (var i = 0; i < pad.length; i++) {
    // 	new Draggable(pad[i], {revert: true});
    // }

    Droppables.add("selectpad", {
    	onDrop: labSelect
    });
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */

	var ol = $$("#selection li");
	
	// alert("wow");
	// console.log("This is "+drag.alt);

	if (ol.length < 3) {

		var img = $$("#selectpad img");
		var allow_ex = true;

		// for (var i=0; i<img.length; i++) {
		// 	if(img[i].alt == drag.alt) {
		// 		allow_ex = false;
		// 	}
		// }
		
	 	Array.prototype.map.call(img, function(e) {
	       if(e.alt==drag.alt){
	       		allow_ex=false;
	       }
	    });

		if(allow_ex){
			var li = document.createElement("li");
			$("selectpad").appendChild(drag);
			li.innerHTML = drag.alt;

			// execute after 0.5 second
			setTimeout(function(){
				$("selection").appendChild(li);
			},500);

			// execute after 1.0 second
			setTimeout(function(){
				li.pulsate({
					duration: 1.0,
					pulses: 5
				});
			},1000);

			// include img in selectpad and give new draggable element
			new Draggable(drag, {revert: true});
			Droppables.add("labs", {
				onDrop: function(drag, drop, event){
					$("labs").appendChild(drag);
					var s_li = $$("#selection li");
					for(var i=0; i<s_li.length; i++) {
						// console.log(s_li[i].textContent);
						if (s_li[i].textContent == drag.alt) {
							// console.log("ok");
							$("selection").removeChild(s_li[i]);
						}
					}
				}
			});
		}
	}

}
