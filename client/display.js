
function display(result){
    let table = document.getElementById('table');
    var rowCount = table.rows.length;
    result.forEach(element => {
        var row = table.insertRow(rowCount);
        row.innerHTML=`<tr>
        <td>1</td>
        <td>
        <br>
        Lorem ipsum dolor sit, amet consectetur <br>
        adipisicing elit. Optio, nihil? <br>
        Lorem ipsum dolor sit amet.</td>
        <td>Completly Agree    <br></td>
        <td>Agree Upto 75%     <br></td>
        <td>Agree Upto 50%     <br></td>
        <td>Agree upto 25%     <br></td>
        <td>Completly Disagree <br></td>
        </tr>`;
    });
}

fetch('https://jsonplaceholder.typicode.com/posts').then(result => console.log(result))