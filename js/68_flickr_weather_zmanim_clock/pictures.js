/*jshint expr:true */
(function () {
    'use strict';

    const all = $('#all'), input = $('#tagName');
    let theCurrentPix, fetch, isNew;
    $('#button').click(() => {
        $('#ch')[0].checked ? fetch = 'flickr.json' : fetch = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${input.val()}&format=json&jsoncallback=?`;
        $.getJSON(fetch)
            .then(pics => {
                isNew = true;
                theCurrentPix = pics.items;
                console.log(pics.items);
                input.val('');
                all.empty();
                isCarousel ? showCarousel() : showAll();
            })
            .catch(error => console.error(error));
    });

    let isCarousel;
    $('#carousel').click(() => {
        isCarousel = true;
        if (theCurrentPix) {
            showCarousel();
        }
    });
    $('#allPix').click(() => {
        isNew = false;
        isCarousel = false;
        if (theCurrentPix) {
            showAll();
        }
    });

    //in flickr API, an empty title is ' ' with space, so actually exists. Need >
    function showAll() {
        all.empty();
        theCurrentPix.forEach(pic => {
            $(`<div class="allPixDiv"><section>${pic.title > ' ' ? pic.title : 'Unknown Title'}</section>
                <img src="${pic.media.m}" alt="${pic.title}"></div>`)
                .appendTo(all);
        });
    }
    let run = 0;
    function showCarousel() {
        all.empty();
        const figure = $('<figure><figure>').addClass('carousel').appendTo(all);
        let theElements = [], next, previous;
        if (isNew) {
            run = 0; //only if new set of pix then start from beggining; otherwise, from where left off. Can toggle between carousel and allPix.
        }
        theCurrentPix.forEach(pic => {
            theElements.push($(`<div><section>${pic.title > ' ' ? pic.title : 'Unknown Title'}</section>
            <img src="${pic.media.m}" alt="${pic.title}"></div>`));
        });
        next = $('<img src="images/next.png" class="nextPrevious" id="next">')
            .click(function () {
                if (run >= theCurrentPix.length) {
                    run = -1;
                }
                figure.empty();
                figure.append(theElements[++run]);
            });
        previous = $('<img src="images/previous.png" class="nextPrevious" id="previous">')
            .click(() => {
                if (run <= 0) {
                    run = theCurrentPix.length;
                }
                figure.empty();
                figure.append(theElements[--run]);
            });
        figure.append(theElements[run]);
        all.append(next).prepend(previous);
    }
}());
