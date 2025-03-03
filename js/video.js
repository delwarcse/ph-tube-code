function getTimeString(time){
  const hour = parseInt(time/3600);
  let remainSecond=time % 3600;
  const minute = parseInt(remainSecond / 60);
  remainSecond=remainSecond % 60;
  return `${hour} hour ${minute} minute ${remainSecond} second`;
}


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
    .then(data => displayVideos(data.videos))
    .catch(error => console.error(error))

}
const displayVideos = (videos) => {
  const videosBtn = document.getElementById("videos");
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
<p></p>
  </div>
    
  </div>
    `;
    videosBtn.append(card);

  })
}

loadCatagories();
loadVideos();