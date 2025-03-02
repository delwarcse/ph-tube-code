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
        // console.log(item);
        //create button
        const button = document.createElement("button");
        button.classList = 'btn';
        button.innerText = item.category;
        //add button to catagory container
        categoryContainer.append(button);
    });
}
const loadVideos = () => {
    fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos) )
        .catch(error => console.error(error))

}
const displayVideos =(videos)=>{
    const videosBtn=document.getElementById("videos");
videos.forEach((video) =>{
    
   console.log(video);
    const card =document.createElement("div");
    card.classList="card";
    card.innerHTML=`
    <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videosBtn.append(card);

})
}

loadCatagories();
loadVideos();