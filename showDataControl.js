const sex = {
    1 : 'Male',
    2 : 'Female'
}
const branch = {
    1 : 'IT_KMUTNB',
    2 : 'ITI',
    3 : 'Business Computer',
    4 : 'Computer Education',
    5 : 'Computer Engineering',
    6 : 'IT_RMUTT',
    7 : 'Educational Information Technology',
}
const gpa = {
    '(2.5-inf)' : 'Good',
    '(-inf-2.5]' : 'Bad'
}
console.log(sex[2])
var Token = sessionStorage.getItem("key");
if(Token == null)window.location.href = "index.html"
else{
    // document.getElementById("userName").innerHTML =  `Welcome, `+ sessionStorage.getItem("username")
}
const urlParams = new URLSearchParams(window.location.search);
var result = urlParams.get('result')

var namefilter = []
var pathAPI = "http://localhost:3333/"


init()
async function init(){

    var filter = sessionStorage.getItem("filter")
    filter = JSON.parse(filter)
    console.log(filter)
    await APIstudentList(filter)
    await $(document).ready( function () {
       
    
        $('#myTable').DataTable();
    } );
    
    $("#Loading").fadeOut(1000, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })

}
function APIstudentList(data){
    if(data != null){
        data = {
            "brandId": data.brandId,
            "sexId": data.sexId,
            "yearId": data.yearId,
            "GPA" : result
        }
    }
    else{
        data = {
            "brandId": null,
            "sexId": null,
            "yearId": null,
            "GPA" : result
        }
    }
    console.log(data)
    $.post(pathAPI+"studentList", data,
        async function (data, status) {
            await data
            console.log(data.data)
            let str = ``
            for(i = 0 ; i < data.data.length ; i++){
            //    str+= `<tr>
            //             <td>`+data.data[i].studentData.studentDataId+`</td>
            //             <td>`+data.data[i].studentData.name+`</td>
            //             <td>`+data.data[i].studentData.sexId+`</td>
            //             <td>`+data.data[i].studentData.brandId+`</td>
            //             <td>`+data.data[i].studentData.yearId+`</td>
            //             <td>`+data.data[i].studentData.studentHistory.GPA+`</td>
            //             </tr>`
            str+= `<tr>
            <td>`+data.data[i].studentData.studentDataId+`</td>
            <td>`+data.data[i].studentData.name+`</td>
            <td>`+sex[data.data[i].studentData.sexId]+`</td>
            <td>`+branch[data.data[i].studentData.brandId]+`</td>
            <td>`+data.data[i].studentData.yearId+`</td>
            <td>`+gpa[data.data[i].studentData.studentHistory.GPA]+`</td>
            </tr>`
            }
            // console.log(str)
            document.getElementById("data").innerHTML =  str

            // PieChart(data.data.goodGPA, data.data.badGPA)
        }).done(function () {

        }).fail(function () {

        })
}