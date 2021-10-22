chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	main()
});

//URL取得
function get_url(){

	return result_url;
};

//デバイス判定
function get_device(){
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) {
        return 0;
	} else if (navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		return 1;
	} else {
		return 2;
	}
};

//現在時刻取得
function get_datetime(){
	var result_date_str = "";
	const now_date = new Date();
	result_date_str = now_date.getFullYear() + "-" +
						now_date.getMonth() + "-" +
						now_date.getDate() + " " + 
						now_date.getHours() + ":" +
						now_date.getMinutes() + ":" +
						now_date.getSeconds();
						
	return result_date_str;
}

//データベースに送信
function send_db(url_str, d_type, s_type, b_date, a_date){
	$.ajax({
		data:{
			url_str:url_str,
			dvice_type:d_type,
			sex_type:s_type,
			birth_day:b_date,
			add_date:a_date,
		},
		type: "GET",
		url:"http://localhost/chrome/get_data.php"
	}).done(function(data){
		console.log("OK!");
	}).fail(function(){
		console.log("Error!");
	});
};

function main(){
	var device_num = get_device();
	var now_date = get_datetime();
	var birth_date = "";
	var sex_type = "";

	chrome.storage.local.get(null, function(items) {
		var birth_year = items.birth_year;
		var birth_mon = items.birth_mon;
		var birth_day = items.birth_day;
		birth_date = birth_year + "-" + birth_mon + "-" + birth_day;
		sex_type = parseInt(items.sex_num);
	
		chrome.tabs.query({ active: true, currentWindow: true }, (e) => {
			const url = e[0].url;
			console.log(now_date);
			console.log(url);
			console.log(device_num);
			console.log(sex_type);
			console.log(birth_date);
			send_db(url,device_num,sex_type,birth_date,now_date);
		});
	});	
};