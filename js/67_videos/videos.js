(function () {
    'use strict';
    //bring in jquery from js; html only loads us
    const jq = document.createElement('script'); jq.setAttribute('src', 'https://code.jquery.com/jquery-3.5.1.min.js');
    jq.setAttribute('integrity', 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0='); jq.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(jq);

    const defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Menorah_0307.jpg';

    fetch('videos.json')
        .then(v => v.json())
        .then(videos => showList(videos))
        .catch(er => showError(er));

    function showList(videos) {
        videos.forEach(v => {
            let isVideo;
            let title = $(`<section>${v.title}<section>`), img = $(`<img src="${v.imgURL || defaultImg}" alt="${v.title}">`);
            $('<div><div>')
                .append(title).append(img)
                .click(function () {
                    if (!isVideo) {
                        isVideo = true;
                        fetch(`${v.title}.json`)
                            .then(v => v.json())
                            .then(video => {
                                $(`<video></video>`)
                                    .attr('src', video.videoURL).attr('controls', true).appendTo(this)[0].play();
                                img.remove();
                            })
                            .catch(er => showError(er));
                    }
                })
                .appendTo(document.body);
        });
    }
    function showError(error) {
        $('<div><div>').text(error).appendTo(document.body);
    }
}());