const urlParams = new URLSearchParams(window.location.search);
var logout = urlParams.get('logout')
if(logout)sessionStorage.removeItem('key');
var Token = sessionStorage.getItem("key");
if(Token == null)window.location.href = "index.html"
else{
    document.getElementById("logout").style.cssText += "display:inline-block !important;"; 
    // document.getElementById("userName").innerHTML =  `Welcome, `+ sessionStorage.getItem("username")
}
var namefilter = []
var pathAPI = "http://localhost:3333/"
var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['ผลการเรียนออกไปในแนวทางที่ดี', 'มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน'],
            datasets: [{
                // label: '# of Votes',
                data: [0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    var canvas = document.getElementById('myChart')
    canvas.onclick = function(e) {
        // console.log(e)
        var slice = myChart.getElementAtEvent(e);
        console.log(slice)
        if (!slice.length) return; // return if not clicked on slice
        var label = slice[0]._model.label;
        switch (label) {
           // add case for each label/slice
           case 'ผลการเรียนออกไปในแนวทางที่ดี':
            //   alert('clicked on slice 5');
              window.open('/showData.html?result=good','_blank');
              break;
           case 'มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน':
            //   alert('clicked on slice 6');
            window.open('/showData.html?result=bad','_blank');
              break;
           // add rests ...
        }
     }
$.when($.ready).then(async function () {
    $("#NoResult").hide();

    await APIgetCheckList()
    await APIgetDataGraph(null)
    APIstudentList()
    // console.log(namefilter)
}).done(function () {
    // alert("second success");
    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
}).fail(function () {
    // alert("error");

    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })

})
function EnableLoading() {
    // var x = document.getElementById("Loading");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    var x = document.getElementById("Loading");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
function DisableLoading() {
    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
}

async function APIgetCheckList() {
    // $.get("http://192.168.1.8:3333/getCheckList",
    $.get(pathAPI+"getCheckList",
        function (data, status) {
            // console.log(data.data)
            let str = ""
            _.each(data.data, function (value, name) {
                // console.log(name)
                str += CheckList(value, name)
            })
            console.log(namefilter)
            document.getElementById("FilterList").innerHTML += str
        }).done(function () {
            // alert("second success");
            // $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
        }).fail(function () {
            // alert("error");

            // $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })

        })
}
function CheckList(data, name) {
    // console.log(data)
    namefilter.push(name)
    let Namefilter = ""
    if (name == "sexDataList") Namefilter = "เพศ"
    else if (name == "brandDataList") Namefilter = "สาขา"
    else if (name == "yearDataList") Namefilter = "ชั้นปี"
    let str = `  <div class="d-flex flex-row justify-content-start align-items-center w-100">
    <div class="row w-100">
        <div class="col-12 col-lg-12 d-flex justify-content-center align-items-center font-weight-bold">
            `+ Namefilter + `
        </div>`
    let val, displayName
    _.each(data, function (value, index) {
        let i = 0

        _.each(value, function (exxx, key) {
            if (i == 0) val = exxx
            else if (i == 1) displayName = exxx
            i++
        })

        str += ` <div class="col-6 col-lg-4 boxCheckbox" >
        <input type="checkbox" class="option-input radio" name="`+ name + `" value="` + val + `" >&nbsp;` + displayName + `
    </div>`
    })


    str += `</div></div>`
    return str
}
async function APIgetDataGraph(data) {

    if (_.isUndefined(data)) {
        data = {
            "sexId": null,
            "brandId": null,
            "yearId": null
        }
    }
    sessionStorage.setItem("filter",JSON.stringify(data));

    $.post(pathAPI+"getDataGraph", data,
        async function (data, status) {
            await data

            PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}
async function PieChart(resultGood, resultBad) {
    if(resultBad == 0 && resultGood == 0){
        $("#myChart").hide();
        $("#NoResult").show();
        $('#info').hide();
    }
    else {
        $('#info').show();
        $("#myChart").show();
        $("#NoResult").hide();
    
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['ผลการเรียนออกไปในแนวทางที่ดี', 'มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน'],
            datasets: [{
                // label: '# of Votes',
                data: [resultGood, resultBad],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    await myChart
    } 
}
async function FilterSearch() {
    EnableLoading()
    var x = await GetDataFromFilter()
    await APIgetDataGraph(x)
    DisableLoading()
    $("#collapseOne").collapse('hide');


}
function ClearFilterSearch(){
    $('input[type=checkbox]').prop('checked',false);
}
async function GetDataFromFilter() {
    let a, b, c
    _.each(namefilter, function (value, index) {
        console.log(index)
        let FilterVal = document.getElementsByName(value);
        let ListCheck = []
        if (FilterVal.length > 0) {
            for (i = 0; i < FilterVal.length; i++) {
                if (FilterVal[i].checked) {
                    ListCheck.push(FilterVal[i].value)
                }
            }
        }
        if (ListCheck.length < 1) ListCheck = null
        if (index == 0) a = ListCheck
        else if (index == 1) b = ListCheck
        else if (index == 2) c = ListCheck
    })
    return {
        sexId: a,
        brandId: b,
        yearId: c,
    }
}
function APIstudentList(){
    data = {
        "sexId": null,
        "brandId": null,
        "yearId": null,
        "GPA" : "bad"
    }
    $.post(pathAPI+"studentList", data,
        async function (data, status) {
            await data
            console.log(data.data)
            // PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}
