

//ARRAYS - 


const videos = [
    "Pranked my sister",
    "Indianna Jones",
    "Love at first sight",
    "Note-book",
    "The human mind"
]


//------------usinG--FOREACH-------------
// videos.forEach(function(video) {
//     console.log(video);
// });


//------------usinG--MAP-------------

const newVideos = videos.map(function(video){
    return video.toUpperCase();
})

console.log(newVideos);


