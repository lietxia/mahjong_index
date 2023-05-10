var type2text = ["公式战", "雀莊", "据点", "学校", "群组"];
var type2color = ["success", "primary", "info", "secondary", "secondary"]
var area2text = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "台湾", "香港", "澳门", "澳大利亚"];

var subarea2text = [["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"], ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"], ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"], ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"], ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"], ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"], ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"], ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"], ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"], ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"], ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"], ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"], ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"], ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"], ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"], ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"], ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区"], ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"], ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"], ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"], ["海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"], ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "璧山区", "铜梁区", "潼南区", "荣昌区", "开州区", "梁平区", "武隆区", "城口县", "丰都县", "垫江县", "忠县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"], ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"], ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"], ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"], ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"], ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"], ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"], ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"], ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"], ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市", "新星市"], ["台北市", "高雄市", "台南市", "台中市", "金门县", "南投县", "基隆市", "新竹市", "嘉义市", "新北市", "宜兰县", "新竹县", "桃园县", "苗栗县", "彰化县", "嘉义县", "云林县", "屏东县", "台东县", "花莲县", "澎湖县"], ["香港岛/中西区", "香港岛/湾仔", "香港岛/东区", "香港岛/南区", "九龙/九龙城区", "九龙/油尖旺区", "九龙/深水埗区", "九龙/黄大仙区", "九龙/观塘区", "新界/北区", "新界/大埔区", "新界/沙田区", "新界/西贡区", "新界/元朗区", "新界/屯门区", "新界/荃湾区", "新界/葵青区", "新界/离岛区"], ["澳门半岛/大堂区", "澳门半岛/风顺堂区", "澳门半岛/花地玛堂区", "澳门半岛/花王堂区", "澳门半岛/望德堂区", "澳门半岛/其他区", "离岛/嘉模堂区", "离岛/路凼填海区", "离岛/圣方济各堂区", "离岛/其他区"]];
function data_fmt(json) {
	for (var i = 0; i < json.length; i++) {
		var area = json[i][2];
		var subarea = json[i][3];
		json[i][11] = json[i][1];
		json[i][0] = `<span class="badge rounded-pill bg-${type2color[json[i][0]]}">${type2text[json[i][0]]}</span>`;
		json[i][1] = `<a href="#/shop/${i}/">${json[i][1]}</a>`;
		json[i][2] = area2text[area];
		json[i][3] = subarea2text[area][subarea];
	}
	json.reverse();
	return json;
}
function get_os() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/android/i.test(userAgent)) {
		return 1;
	}
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return 2;
	}
	return 0;
}

function app_btn_html(id) {
	const array = ["百度", "高德", "腾讯"];
	let html = '';
	for (let index = 0; index < array.length; index++) {
		html += `<button type="button" class="btn btn-primary btn-sm m-1" onclick="app_btn_click(${index},${id})">${array[index]}</button>`;
	}
	return html;
}
function app_btn_click(type, id) {
	//const name = window.web_cache[id][4];
	const lng = window.web_cache[id][5];//123.370888
	const lat = window.web_cache[id][6];//41.792397
	let url = '';
	const os = get_os();
	if (os === 0) {//web
		if (type === 0) {//baidu
			url = `https://api.map.baidu.com/geocoder?location=${lat},${lng}&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo`;
		}
		if (type === 1) {//gaode
			url = `https://uri.amap.com/marker?position=${lng},${lat}&callnative=1`;
		}
		if (type === 2) {//tencent
			url = `https://apis.map.qq.com/uri/v1/geocoder?coord=${lat},${lng}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
		}
		return window.open(url, "_blank");
	}
	if (os === 1) {//android
		if (type === 0) {//baidu
			url = `bdapp://map/geocoder?location=${lat},${lng}&src=andr.baidu.openAPIdemo&coord_type=gcj02`;
		}
		if (type === 1) {//gaode
			url = `androidamap://viewReGeo?sourceApplication=softname&lat=${lat}&lon=${lng}&dev=0`;
		}
		if (type === 2) {//tencent
			url = `qqmap://map/geocoder?coord=${lat},${lng}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
		}
	}
	if (os === 2) {//ios
		if (type === 0) {//baidu
			url = `baidumap://map/geocoder?location=${lat},${lng}&src=andr.baidu.openAPIdemo&coord_type=gcj02`;
		}
		if (type === 1) {//gaode
			url = `iosamap://viewMap?sourceApplication=applicationName&lat=${lat}&lon=${lng}&dev=0`;
		}
		if (type === 2) {//tencent
			url = `qqmap://map/geocoder?coord=${lat},${lng}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`;
		}
	}
	return window.open(url);
}

function router() {
	var hash = location.hash.split('/');
	if (hash.length >= 2) {
		if (hash[1] === "shop") {
			return display_shop(hash[2]);
		}
		if (hash[1] === "map") {
			return display_map();
		}
		display_list();
	} else {
		display_list();
	}
}
window.web_cache = [];

function display_list() {
	$('#page_list').show();
	$('#page_shop').hide();
	$('#page_map').hide();
}
function display_map() {
	$('#page_list').hide();
	$('#page_shop').hide();
	$('#page_map').show();
	if (document.getElementById('page_map').innerText == "") {
		initMap();
	}
}
function initMap() {
	var list = window.web_cache;
	var geo = [];
	var bounds = new TMap.LatLngBounds();
	for (let i = 0; i < list.length; i++) {
		var p = new TMap.LatLng(list[i][6], list[i][5]);
		geo[i] = { // 点数组
			id: i,
			position: p
		};
		bounds.extend(p);
	}
	//初始化地图
	var obj = {};
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		obj = { mapStyleId: "style2" };
	}
	var map = new TMap.Map("page_map", obj);

	//初始marker
	var marker = new TMap.MarkerCluster({
		id: 'cluster',
		map: map,
		minimumClusterSize: 3, // 形成聚合簇的最小个数
		geometries: geo,
		zoomOnClick: true, // 点击簇时放大至簇内点分离
		gridSize: 15, // 聚合算法的可聚合距离
		averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
		maxZoom: 10 // 采用聚合策略的最大缩放级别
	});

	//初始化infoWindow
	var infoWindow = new TMap.InfoWindow({
		map: map,
		position: new TMap.LatLng(39.984104, 116.307503),
		offset: { x: -9, y: -8 },
		zIndex: 99
	});
	infoWindow.close();//初始关闭信息窗关闭
	//监听标注点击事件
	marker.on("click", function (evt) {
		//设置infoWindow
		infoWindow.open(); //打开信息窗
		infoWindow.setPosition(evt.cluster.center);//设置信息窗位置
		//console.log(evt);
		var info = window.web_cache[evt.cluster.geometries[0].id]
		infoWindow.setContent(`<div>
					${info[1]}
					<br />
					${info[0]}
					<span class="badge rounded-pill bg-secondary">${info[2]}</span>
					<span class="badge rounded-pill bg-secondary">${info[3]}</span>
					<br />
					${app_btn_html(evt.cluster.geometries[0].id)}
					</div>`);//设置信息窗内容
	})
	map.fitBounds(bounds, {
		padding: 30 // 自适应边距
	});
}
function display_shop(shop_id) {
	$('#page_list').hide();
	$('#page_map').hide();
	$('#page_shop').show();
	if (window.web_cache.length > 0) {
		document.getElementById('shop_app_btns').innerHTML = app_btn_html(shop_id);
	}
	shop_id = parseInt(shop_id);
	var shop_data = window.web_cache[shop_id];
	var ids = ['full_name', 'address'];
	var values = [11, 7];
	for (var i = 0; i < ids.length; i++) {
		document.getElementById(ids[i]).innerText = shop_data[values[i]];
	}
	document.getElementById("markdown_text").innerHTML = marked.parse(shop_data[8]);
	var target = document.getElementById('tbody_info');
	target.innerText = '';
	if (shop_data[9].length >= 2 && shop_data[9].length % 2 === 0) {
		//shop info table
		for (var i = 0; i < shop_data[9].length; i += 2) {
			var tr = document.createElement("tr");
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			td1.appendChild(document.createTextNode(shop_data[9][i]));
			td2.className = "text-wrap";
			var text = shop_data[9][i + 1] + '';
			if (text.startsWith("http")) {
				var a = document.createElement('a');
				a.href = text;
				a.innerText = text;
				a.setAttribute('target', '_blank');
				td2.appendChild(a);
			} else {
				td2.appendChild(document.createTextNode(text));
			}
			tr.appendChild(td1);
			tr.appendChild(td2);
			target.appendChild(tr);
		}
	}
	//photos
	target = document.getElementById('photos');
	target.innerText = '';
	if (shop_data[10].length >= 1) {
		for (let i = 0; i < shop_data[10].length; i++) {
			var a = document.createElement('a');
			a.href = shop_data[10][i];
			//a.setAttribute('target', '_blank');
			var img = document.createElement('img');
			img.setAttribute("width", "30%")
			img.setAttribute("alt", "photo" + i);
			img.className = "photos img-thumbnail shadow-sm";
			img.src = shop_data[10][i];
			a.appendChild(img);
			target.appendChild(a);
		}
	}
}
marked.setOptions({
	pedantic: false,
	gfm: true,
	tables: true,
	breaks: true,
	sanitize: false,
	smartLists: true,
	smartypants: false
});
(function () {
	$('#table_list').bootstrapTable();
	window.onhashchange = router;
	$.getJSON("list.json", function (data) {
		window.web_cache = data_fmt(data);
		$('#table_list').bootstrapTable('load', window.web_cache);
		router();
	});
})()