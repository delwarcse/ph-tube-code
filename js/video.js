const loadCatagories = () => {
    fetch(' https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCAtagories(data.categories))
        .catch(error => console.error(error))

}

//create display catagories
const displayCAtagories = (categories) => {
    const categoryContainer = document.getElementById("categry");

    categories.forEach(item => {
        console.log(item);
        //create button
        const button = document.createElement("button");
        button.classList = 'btn';
        button.innerText = item.category;
        //add button to catagory container
        categoryContainer.append(button);
    });
}

loadCatagories();