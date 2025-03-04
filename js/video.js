function getTimeString(time){
  const hour = parseInt(time/3600);
  let remainSecond=time % 3600;
  const minute = parseInt(remainSecond / 60);
  remainSecond=remainSecond % 60;
  return `${hour} hour ${minute} minute ${remainSecond} second`;
}
const removeActiveClass = () =>{
const buttons = document.getElementsByClassName("category-btn");
console.log(buttons);
for(let btn of buttons){
  btn.classList.remove("active");
}
}

const loadCatagoriesVideos = (id) =>{
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    //remove active class from all
     removeActiveClass();

    const activeBtn = document.getElementById(`btn-${id}`);
activeBtn.classList.add("active");
    displayVideos(data.category);
  })
  .catch(error => console.error(error))
}

const loadCatagories = () => {
  fetch(' https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCAtagories(data.categories))
    .catch(error => console.error(error))

}

const loadDetails = async (videoId) =>{
  console.log(videoId);
  const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (video) =>{
  console.log(video);
  const detailContainer= document.getElementById("model-content");
detailContainer.innerHTML=`
<img src=${video.thumbnail} />
<p>${video.description}</p>

`
  //way 1
  document.getElementById("showModalData").click();
  //way 2
  // document.getElementById("customModal").showModal();

};


//create display catagories
const displayCAtagories = (categories) => {
  const categoryContainer = document.getElementById("categry");

  categories.forEach(item => {
    console.log(item); 
    //create button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML =`
    <button id="btn-${item.category_id}" onclick="loadCatagoriesVideos(${item.category_id})" 
    class="btn category-btn">
${item.category}
    </button>

    `
   
    //add button to catagory container
    categoryContainer.append(buttonContainer);
  });
}



const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.error(error))

}
const displayVideos = (videos) => {
  const videosBtn = document.getElementById("videos");
  videosBtn.innerHTML="";
if(videos.length == 0){
  videosBtn.classList.remove("grid")
  videosBtn.innerHTML=`
  <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
<img src="assets/Icon.png" />
<h2 class="font-bold text-xl text-center"> In this Category  No Content Here </h2>
  </div>
  `;
  return;
}else{
  videosBtn.classList.add("grid");
}


  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
        ?""
        :`
         <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>
        `
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
  <div>
  <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
  </div>
  <div>
<h2 class="font-bold">${video.title} </h2>
<div class="flex items-center gap-2">
<p class="text-gray-400">${video.authors[0].profile_name} </p>
${
  video.authors[0].verified == true 
  ? 
  `<img class="w-5" 
  src="https://img.icons8.com/?size=48&id=pIPl8tqh3igN&format=png" />
  `:""
}

</div>
<p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
  </div>
    
  </div>
    `;
    videosBtn.append(card);

  })
}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
  loadVideos(e.target.value);
});

loadCatagories();
loadVideos();