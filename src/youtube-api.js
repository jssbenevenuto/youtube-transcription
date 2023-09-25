import { loadingMessage } from "./loader"

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null

function getLoadVideo(url) {
    const [part1, part2] = url.split('?v=')
    const [videoId, other] = part2.split('&')

    return videoId
}

// 3. This function creates an <iframe> (and YouTube player)
export function loadVideo(url) {
    loadingMessage("Carregando vídeo do YouTube...")

    return new Promise((resolve, reject) => {
        window.YTPlayer = new YT.Player('youtubeVideo', {
            videoId: getLoadVideo(url),
            host: "https://www.youtube.com",
            events: {
                onReady: () => resolve(),
            }
        })
    })
}