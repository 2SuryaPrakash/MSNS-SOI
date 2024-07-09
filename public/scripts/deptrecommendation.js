const deptInput = document.querySelector('#dept');
const deptList = document.querySelector('#depts');

fetch('http://localhost:5001/getbooks/getuniquedept').then((res)=>{return res.json()}).then((allDepts)=>{
    deptInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredDepts = allDepts.filter(dept=>dept.toLowerCase().startsWith(searchTerm));//getting the ones with text entered in the field
        deptList.innerHTML = ''; 
        if (filteredDepts.length > 0) {
          filteredDepts.forEach((dept) => {
            const optionElement = document.createElement('option');
            optionElement.value = dept;
            deptList.appendChild(optionElement);
          });
        } else {
          deptList.innerHTML = '<option>No suggestions found.</option>';
        }
      });
}); 