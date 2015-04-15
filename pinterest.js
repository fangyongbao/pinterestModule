/* 
 * author : fang yongbao
 * data : 2014.11.27
 * model : 瀑布流模块
 * info ：知识在于积累，每天一小步，成功永远属于坚持的人。
 * blog : http://www.best-html5.net
 */

/*
 *
 * @param {type} option
 * {
 *   @param childnode: ".m-child",//子节点对应的class
 *   @param margin: 10,//子元素间距
 * }
 * return obj
 *   refresh();//刷新瀑布流
 *
 *
 */
(function() {
	$.fn.pinterest = function(options) {
		var defaults = {
			childnode: "m-child",
			margin: 10,
		};
		var config = $.extend(defaults, options);
		var h = []; //记录区块高度的数组
		var li_W = 0;
		var margin = config.margin;
		var main_obj = this;
		var child_obj = this.children(config.childnode);

		pinterestPosition();



		function pinterestPosition() {

			li_W = child_obj[0].offsetWidth + margin; //取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding,border就不行， offsetWidth包含border和padding）
			var n = Math.floor(main_obj[0].offsetWidth / li_W); //窗口的宽度除以区块宽度就是一行能放几个区块
			for (var i = 0; i < child_obj.length; i++) {
				li_H = child_obj[i].offsetHeight;
				if (i < n) {
					h[i] = li_H;
					child_obj.eq(i).css("top", 0);
					child_obj.eq(i).css("left", i * li_W + margin);
				} else {

					min_H = getMin(h);
					minKey = getarraykey(h, min_H);
					h[minKey] += li_H + margin;
					child_obj.eq(i).css("top", min_H + margin);
					child_obj.eq(i).css("left", minKey * li_W + margin);
				}
				child_obj.eq(i).css("opacity", 1);

			}
			max_H = getMax(h);
			main_obj.height(max_H + margin);


		}

		/* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
		function getarraykey(s, v) {
			for (k in s) {
				if (s[k] == v) {
					return k;
				}
			}
		}

		function getRandom(min, max) {
			var x = max;
			var y = min;
			if (x < y) {
				x = min;
				y = max;
			}
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			return rand;
		}

		function getMin(array) {
			var array2 = array.join(",").split(",");
			return Math.min.apply(null, array2);
		}

		function getMax(array) {
			var array2 = array.join(",").split(",");
			return Math.max.apply(null, array2);
		}

		this.refresh = function() {

			pinterestPosition();

		}


		return main_obj;

	}
})(jQuery)