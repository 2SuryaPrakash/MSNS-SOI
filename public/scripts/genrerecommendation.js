const genreInput = document.querySelector('#genre');
const genreList = document.querySelector('#genres');



fetch('http://localhost:5001/getbooks/getuniquegenre').then((res)=>{return res.json()}).then((allGenres)=>{
    genreInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredGenres = allGenres.filter(genre => genre.toLowerCase().startsWith(searchTerm));//getting the ones with text entered in the field
        genreList.innerHTML = ''; 
        if (filteredGenres.length > 0) {
          filteredGenres.forEach((genre) => {
            const optionElement = document.createElement('option');
            optionElement.value = genre;
            genreList.appendChild(optionElement);
          });
        } else {
          genreList.innerHTML = '<option>No suggestions found.</option>';
        }
      });
});


