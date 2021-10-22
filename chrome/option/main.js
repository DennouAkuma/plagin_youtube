$(function(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();

    var selected_year = document.getElementById("year").value;
    var selected_month = document.getElementById("month").value;

    for (var i = year; i >= 1900 ; i--) {
        $('#year').append('<option value="' + i + '">' + i + '</option>');
    }

    for (var j = 1; j <= 12; j++) {
        $('#month').append('<option value="' + j + '">' + j + '</option>');
    }

    for (var k = 1; k <= 31; k++) {
        $('#date').append('<option value="' + k + '">' + k + '</option>');
    }

    $('#year').change(function() {
        selected_year = $('#year').val();

        var last_month = 12;
        if (selected_year == year) {
            last_month = month;
        }
        $('#month').children('option').remove();
        $('#month').append('<option value="' + 0 + '">--</option>');
        for (var n = 1; n <= last_month; n++) {
            $('#month').append('<option value="' + n + '">' + n + '</option>');
        }
    });

    $('#year,#month').change(function() {
        selected_year = $('#year').val();
        selected_month = $('#month').val();

        if (selected_year == year && selected_month == month ) {
            var last_date = date;
        }else{
            if (selected_month == 2) {
                if((Math.floor(selected_year%4 == 0)) && (Math.floor(selected_year%100 != 0)) || (Math.floor(selected_year%400 == 0))){
                    last_date = 29;
                }else{
                    last_date = 28;
                }

            }else if(selected_month == 4 || selected_month == 6 || selected_month == 9 || selected_month == 11 ){
                last_date = 30;

            }else{
                last_date = 31;
            }
        }
        $('#date').children('option').remove();
        $('#date').append('<option value="' + 0 + '">--</option>');
        for (var m = 1; m <= last_date; m++) {
            $('#date').append('<option value="' + m + '">' + m + '</option>');
        }
    });

    $('#save').click(function(){
        var year = $('#year').val();
        var mon = $('#month').val();
        var day = $('#date').val();
        var sex = $('#sex').val();
        //console.log(year + "年" + mon + "月" + day + "日" + sex + "性別");

        chrome.storage.local.set({
            birth_year: year,
            birth_mon: mon,
            birth_day: day,
            sex_num: sex
        }, function() {
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 3000);
        });

        chrome.storage.local.get(null, function(items) {       
            console.log(items);
        });
    });
})