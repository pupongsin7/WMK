// const sex = {
//     1: 'Male',
//     2: 'Female'
// }
// const branch = {
//     1: 'IT_KMUTNB',
//     2: 'ITI',
//     3: 'Business Computer',
//     4: 'Computer Education',
//     5: 'Computer Engineering',
//     6: 'IT_RMUTT',
//     7: 'Educational Information Technology',
// }
// const gpa = {
//     '(2.5-inf)': 'Good',
//     '(-inf-2.5]': 'Bad'
// }
const sex = {
    1: 'ชาย',
    2: 'หญิง'
}
const branch = {
    1: 'IT_KMUTNB',
    2: 'ITI_KMUTNB',
    3: 'Business_Computer_RMUTT',
    4: 'Computer_Education_RMUTT',
    5: 'Computer_Engineering_RMUTT',
    6: 'IT_RMUTT',
    7: 'Educational_Information_Technology_RMUTT',
}
const gpa = {
    '(2.5-inf)': 'ผลการเรียนดี',
    '(-inf-2.5]': 'ผลการเรียนควรปรับปรุง'
}
const urlParams = new URLSearchParams(window.location.search);
var logout = urlParams.get('logout')
if (logout) sessionStorage.removeItem('key');
var Token = sessionStorage.getItem("key");
if (Token == null) window.location.href = "index.html"
else {
    document.getElementById("logout").style.cssText += "display:inline-block !important;";
    document.getElementById("AdminManage").style.cssText += "display:inline-block !important;";

    // document.getElementById("userName").innerHTML =  `Welcome, `+ sessionStorage.getItem("username")
}

const University = {
    "KMUTNB": {
        1: 'IT_KMUTNB',
        2: 'ITI_KMUTNB',
    },
    "RMUTT": {
        3: 'Business_Computer_RMUTT',
        4: 'Computer_Education_RMUTT',
        5: 'Computer_Engineering_RMUTT',
        6: 'IT_RMUTT',
        7: 'Educational_Information_Technology_RMUTT',
    }
}
var namefilter = []
var pathAPI = "https://predict-gpa.herokuapp.com/"
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['ผลการเรียนออกไปในแนวทางที่ดี', 'มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน'],
        datasets: [{
            // label: '# of Votes',
            data: [0, 0],
            backgroundColor: [
                'rgba(99, 255, 117, 1)',
                'rgba(255, 99, 132, 1)',
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
canvas.onclick = async function (e) {
    // console.log(e)
    var slice = myChart.getElementAtEvent(e);
    // console.log(slice)
    if (!slice.length) return; // return if not clicked on slice
    var label = slice[0]._model.label;

    switch (label) {
        // add case for each label/slice
        case 'ผลการเรียนออกไปในแนวทางที่ดี':
            //   alert('clicked on slice 5');
            $('input[type=search]').val('ผลการเรียนดี')
            table.search('ผลการเรียนดี').draw();

            // window.open('/showData.html?result=good', '_blank'); //ถ้าจะให้คลิ๊กกราฟได้เปิดตรงนี้
            break;
        case 'มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน':
            //   alert('clicked on slice 6');
            $('input[type=search]').val('ผลการเรียนควรปรับปรุง')
            table.search('ผลการเรียนควรปรับปรุง').draw();
            // window.open('/showData.html?result=bad', '_blank'); //ถ้าจะให้คลิ๊กกราฟได้เปิดตรงนี้
            break;
        // add rests ...
    }
    




}
$.when($.ready).then(async function () {
    $("#NoResult").hide();

    await APIgetCheckList()
    await APIgetDataGraph(null)
    APIstudentList(null)
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
    $.get(pathAPI + "getCheckList",
        function (data, status) {
            // console.log(data.data)
            let str = ""
            _.each(data.data, function (value, name) {
                // console.log(name)
                str += CheckList(value, name)
            })
            // console.log(namefilter)
            // document.getElementById("FilterList").innerHTML += str
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
            if (i == 0) {
                val = exxx
            }
            else if (i == 1) displayName = exxx
            i++
        })

        str += ` <div class="col-6 col-lg-4 boxCheckbox" >
        <input type="checkbox" class="option-input radio" id="`+ name + val + `" name="` + name + `" value="` + val + `" >&nbsp;` + displayName + `
    </div>`
    })


    str += `</div></div>`
    //aDD University In filter
    // if (name == "sexDataList") {
    //     str += `<div class="d-flex flex-row justify-content-start align-items-center w-100">
    //     <div class="row w-100">
    //         <div class="col-12 col-lg-12 d-flex justify-content-center align-items-center font-weight-bold">
    //             University
    //         </div>
    //         <div class="col-6 col-lg-4 boxCheckbox" >
    //             <input type="checkbox" class="option-input radio" name="university" id="u1" onchange="CheckAll('KMUTNB')" value="KMUTNB" >&nbsp;KMUTNB
    //         </div>
    //         <div class="col-6 col-lg-4 boxCheckbox" >
    //             <input type="checkbox" class="option-input radio" name="university" id="u2" onchange="CheckAll('RMUTT')" value="RMUTT" >&nbsp;RMUTT
    //         </div>
    //         </div>
    //     </div>
    //         `
    // }
    //End aDD University In filter


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
    sessionStorage.setItem("filter", JSON.stringify(data));

    $.post(pathAPI + "getDataGraph", data,
        async function (data, status) {
            await data

            PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}
async function PieChart(resultGood, resultBad) {
    if (resultBad == 0 && resultGood == 0) {
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
                        'rgba(99, 255, 117, 1)',
                        'rgba(255, 99, 132, 1)',
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
    await APIstudentList(x)
    DisableLoading()
    $("#collapseOne").collapse('hide');


}
function ClearFilterSearch() {
    $('input[type=checkbox]').prop('checked', false);
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
function APIstudentList() {
    data = {
        "sexId": null,
        "brandId": null,
        "yearId": null,
        "GPA": "bad"
    }
    $.post(pathAPI + "studentList", data,
        async function (data, status) {
            await data
            console.log(data.data)
            // PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}
function APIstudentList(data) {
    if (data != null) {
        data = {
            "brandId": data.brandId,
            "sexId": data.sexId,
            "yearId": data.yearId,
            "GPA": ["bad", "good"]
        }
    }
    else {
        data = {
            "brandId": null,
            "sexId": null,
            "yearId": null,
            "GPA": ["bad", "good"]
        }
    }
    console.log(data)
    $.post(pathAPI + "studentList", data,
        async function (data, status) {
            await data
            console.log(data.data)
            let formatDataTable = []
            let str = ``
            for (i = 0; i < data.data.length; i++) {
                //    str+= `<tr>
                //             <td>`+data.data[i].studentData.studentDataId+`</td>
                //             <td>`+data.data[i].studentData.name+`</td>
                //             <td>`+data.data[i].studentData.sexId+`</td>
                //             <td>`+data.data[i].studentData.brandId+`</td>
                //             <td>`+data.data[i].studentData.yearId+`</td>
                //             <td>`+data.data[i].studentData.studentHistory.GPA+`</td>
                //             </tr>`
                formatDataTable.push({
                    "รหัสนักศึกษา": data.data[i].studentData.studentDataId,
                    "ชื่อ": data.data[i].studentData.name,
                    "เพศ": sex[data.data[i].studentData.sexId],
                    "สาขา": branch[data.data[i].studentData.brandId],
                    "ชั้นปี": data.data[i].studentData.yearId,
                    "ผลทำนาย": gpa[data.data[i].studentData.studentHistory.GPA]
                })

                str += `<tr>
            <td>`+ data.data[i].studentData.studentDataId + `</td>
            <td>`+ data.data[i].studentData.name + `</td>
            <td>`+ sex[data.data[i].studentData.sexId] + `</td>
            <td>`+ branch[data.data[i].studentData.brandId] + `</td>
            <td>`+ data.data[i].studentData.yearId + `</td>
            <td>`+ gpa[data.data[i].studentData.studentHistory.GPA] + `</td>
            </tr>`
            }
            $(document).ready(async function () {
                table = $('#myTable').DataTable()
                table.destroy();
                table = await $('#myTable').DataTable(
                    {
                        columnDefs: [
                            { "className": "dt-center", "targets": "_all" }
                        ],
                        responsive: true,
                        data: formatDataTable,
                        columns: [
                            { data: 'รหัสนักศึกษา' },
                            { data: 'ชื่อ' },
                            { data: 'เพศ' },
                            { data: 'สาขา' },
                            { data: 'ชั้นปี' },
                            { data: 'ผลทำนาย' }
                        ],
                    }
                );
                $('#myTable tbody').on('click', 'tr', function (index) {
                    var data = table.rows(this).data();
                    // console.log(data[0].รหัสนักศึกษา)
                    window.open('/showData.html?id=' + data[0].รหัสนักศึกษา, '_blank');
                    // alert('You clicked on ' + data + '\'s row');
                });
            });
            // console.log(str)
            // document.getElementById("data").innerHTML = str

            // PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}
// function CheckAll(univer) {
//     _.each($('input[name$="university"]'), function (val1, index) {
//         _.each($('input[name$="brandDataList"]'), function (val2, index) {
//             if (val2.value == University[univer][val2.value]) console.log(true)
//             $('#' + val2.id).prop('checked', true)
//         })
//     })

// }
$(document).ready(function () {
    $("#checkU1").change(function () {
        if (this.checked) {
            $(".CheckKMUTNB").each(function () {
                this.checked = true;
            })
        } else {
            $(".CheckKMUTNB").each(function () {
                this.checked = false;
            })
        }
    });

    $(".CheckKMUTNB").click(function () {
        if ($(this).is(":checked")) {
            var isAllChecked = 0;
            $(".CheckKMUTNB").each(function () {
                if (!this.checked)
                    isAllChecked = 1;
            })
            if (isAllChecked == 0) { $("#checkU1").prop("checked", true); }
        } else {
            $("#checkU1").prop("checked", false);
        }
    });

    $("#checkU2").change(function () {
        if (this.checked) {
            $(".CheckRMUTT").each(function () {
                this.checked = true;
            })
        } else {
            $(".CheckRMUTT").each(function () {
                this.checked = false;
            })
        }
    });

    $(".CheckRMUTT").click(function () {
        if ($(this).is(":checked")) {
            var isAllChecked = 0;
            $(".CheckRMUTT").each(function () {
                if (!this.checked)
                    isAllChecked = 1;
            })
            if (isAllChecked == 0) { $("#checkU2").prop("checked", true); }
        } else {
            $("#checkU2").prop("checked", false);
        }
    });
});