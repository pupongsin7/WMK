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
console.log(sex[2])
var Token = sessionStorage.getItem("key");
if (Token == null) window.location.href = "index.html"
else {
    // document.getElementById("userName").innerHTML =  `Welcome, `+ sessionStorage.getItem("username")
}
const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var namefilter = []
var pathAPI = "https://predict-gpa.herokuapp.com/"


init()
async function init() {

    // var filter = sessionStorage.getItem("filter")
    // filter = JSON.parse(filter)
    // console.log(filter)

    await APIstudentList()


    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })

}
function APIstudentList() {

    $.get(pathAPI + "studentList/" + id,
        async function (data, status) {
            await data
            console.log(data.data[0].studentHistory)
            let studentHistory = data.data[0]
            document.getElementById("StuId").innerHTML = studentHistory.studentDataId
            document.getElementById("StuName").innerHTML = studentHistory.name
            document.getElementById("StuSex").innerHTML = sex[studentHistory.sexId]
            document.getElementById("StuBranch").innerHTML = branch[studentHistory.brandId]
            document.getElementById("StuYear").innerHTML = studentHistory.yearId
            const options = {day: 'numeric', month: 'long', year: 'numeric',hour : 'numeric',minute : 'numeric' };
            let formatDataTable = []
            for (i = 0; i < studentHistory.studentHistory.length; i++) {
                formatDataTable.push({
                    "ผลทำนาย": gpa[studentHistory.studentHistory[i].GPA],
                    // "วันที่ทำแบบสอบถาม": new Date(studentHistory.studentHistory[i].createdAt).toLocaleDateString('th-TH',options)
                    "วันที่ทำแบบสอบถาม": new Date(studentHistory.studentHistory[i].createdAt).toLocaleDateString('en-EN',options)
                })
            }
            $(document).ready(async function () {
                table = $('#myTable').DataTable()
                table.destroy();
                console.log(formatDataTable)
                table = await $('#myTable').DataTable(
                    {
                        // columnDefs: [
                        //     { "className": "dt-center", "targets": "_all" }
                        // ],
                        // responsive: true,
                        data: formatDataTable,
                        columns: [
                            { data: 'ผลทำนาย' },
                            { data: 'วันที่ทำแบบสอบถาม' }
                        ],
                    }
                );
                // $('#myTable tbody').on('click', 'tr', function (index) {
                //     var data = table.rows(this).data();
                //     // console.log(data[0].รหัสนักศึกษา)
                //     window.open('/showData.html?id=' + data[0].รหัสนักศึกษา, '_blank');
                //     // alert('You clicked on ' + data + '\'s row');
                // });
            });
            }).done(function () {

            }).fail(function () {

            })
}