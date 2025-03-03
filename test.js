function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainSecond=time % 3600;
    const minute = parseInt(remainSecond / 60);
    remainSecond=remainSecond % 60;
    return `${hour} hour ${minute} minute ${remainSecond} second ago`;
}
console.log(getTimeString(23234));