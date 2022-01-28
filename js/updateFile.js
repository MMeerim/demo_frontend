const updateBtn = document.querySelector('#update')

function updateFile() {
    fileName = select.value
    if (fileName != 'Select Workspace') {
        heads = [];
        values = [];
        line = []
        const rows = document.querySelectorAll("table tr");
        for (const row of rows) {
            for (const [index, column] of row.querySelectorAll("th").entries()) {
                heads.push(column.innerText)
            }
            for (const [index, column] of row.querySelectorAll("td").entries()) {
                line.push(column.getElementsByTagName('input')[0].value)
            }
            values.push(line)
            line = []
        }
    
        //The function to send POST request with updated data to server 
        (async () => {
            const rawResponse = await fetch('http://terraformapi.itcsdev.northwestern.edu:3000/', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    heads: heads.toString(), 
                    values: values, 
                    fileName: fileName.slice(0, -1),
                    dir: fileName.charAt(fileName.length -1)
                
                })
                }
            );}
        )()
    }
    onUpdateClick()
    if(tableRoot.children.length > 0) {
        tableRoot.innerHTML = '';
    }
}

function onUpdateClick() {
    updateBtn.classList.add("updateclick")
    setInterval(() => {
        updateBtn.classList.remove('updateclick')
    }, 1700)
}