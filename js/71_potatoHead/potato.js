(function () {
    'use strict';

    // let dragging;
    // let part = $('.box'), body = $(document.body);
    // part.mousedown(e => {
    //     console.log(e);
    //     if (e.ctrlKey) {
    //         reMaker(e);
    //     } else {
    //         dragging = true;
    //         e.target.display = 'absolute';
    //     }
    // });
    // body.mousemove(e => {
    //     if (dragging) {
    //         console.log('drag');
    //         $(e.target).css({ position: 'absolute', top: e.pageX, left: e.pageY });
    //     }
    // });
    // body.mouseup(() => {
    //     dragging = false;
    // });

    //const theBox = $('.box').mousedown(e => {
    // document.getElementsByClassName('.box').toArray().forEach((b, i) => b.id = i + 1);

    let dragging, offset, index = 0, body = $(document.body),/* play = $('audio'),*/ box = $('.box');
    body.on('mousedown', '.box', e => {
        if (e.ctrlKey) {
            reMaker(e);
        } else {
            console.log('mousedown', e);
            offset = { x: e.offsetX, y: e.offsetY };
            // dragging = true;

            dragging = $(e.target).css({ position: 'absolute', top: e.pageY - offset.y, left: e.pageX - offset.x });
        }
    });
    //addMouseDownListener($('.box'));
    let mouseMoved, isPopUpOpen, pic = 0, whistle1 = document.getElementById('whistle1'), whistle2 = document.getElementById('whistle2');
    body.mousemove(e => {
        if (dragging && !isPopUpOpen) {
            e.preventDefault(); // occasional dragging wierdness in browser
            mouseMoved = true;
            // console.log('mousemove', e);
            //theBox.css({ top: e.pageY - offset.y, left: e.pageX - offset.x});
            dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
        }
    }).mouseup(e => {
        if (dragging && mouseMoved) {
            // console.log('mouseup', e);
            //dragging = false;
            if (++pic === 5) {
                whistle2.play();
                pic = 0;
            } else {
                whistle1.play();
            }
            dragging.css({ zIndex: ++index });

            store(dragging);
            flash(dragging);
            dragging = null;
            mouseMoved = false;
        }
    });
    let tools = localStorage.tools ? JSON.parse(localStorage.tools) : [];
    function store(piece) {
        // console.log(piece);
        tools.filter(t => t.id !== piece[0].id);
        tools.push({
            id: piece[0].id, top: piece.css('top'), left: piece.css('left'), /*color: piece.css('backgroundColor'),*/
            width: piece.css('width'), height: piece.css('height'), zIndex: piece.css('zIndex')
        });
        localStorage.tools = JSON.stringify(tools);
    }
    let colors = [];
    for (let i = 0; i < 50; i++) {
        colors.push(`rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256}`);
    }
    function flash(p) {
        console.log('p'); let top = 20;
        let yeah = $('<div class="flash"><span class="yeah">YEAH!!</span></div>').appendTo(body)
            .css({ position: 'absolute', top: `${parseInt(p.css('top')) - top}px`, left: p.css('left'), zIndex: ++index });
        // let origColor = yeah.css('backgroundColor');
        let run = 0;
        let intId = setInterval(() => {
            yeah.css({ 'backgroundColor': colors[run++], 'color': colors[run - 2], 'borderColor': colors[run - 3] });
        }, 500);
        setTimeout(() => {
            clearInterval(intId);
            //    yeah.css({'backgroundColor': origColor}); 
            yeah.slideUp('slow');
        }, 3000);
    }

    if (localStorage.tools) {
        JSON.parse(localStorage.tools).forEach(t => {
            console.log(t);
            $(document.getElementById(t.id)).css({
                position: 'absolute', top: t.top, left: t.left, /*backgroundColor: t.color,*/
                width: t.width, height: t.height, zIndex: t.zIndex
            });
        });
    }

    function reMaker(event) {
        if (!isPopUpOpen) {
            let thePart = $(event.target);
            console.log('rm');
            let wasWidth = thePart.css('width'), wasHeight = thePart.css('height');
            let popHeight = 220;
            let popUp = $('<div id="popUp"><h3>Choose New Width and Height</h3></div>').appendTo(body)
                .css({ top: event.pageY - popHeight, left: event.pageX, zndex: ++index }).click(function () {
                    $(this).css({ zIndex: ++index });
                });
            isPopUpOpen = true;
            let width = $('<input placeholder="width">').on('input', () => {
                thePart.css({ width: !isNaN(width.val() + 1) ? width.val() : wasWidth });
            }).appendTo(popUp);
            let height = $('<input placeholder="height">').on('input', () => {
                thePart.css({ height: !isNaN(height.val() + 1) ? height.val() : wasHeight/*, top:*/ });
            }).appendTo(popUp);
            //let color = $('<input type="color">').appendTo(popUp);
            /*let buttonDiv = */$('<div></div>').append($('<button>CANCEL</button>').click(() => {
                // popUp.css({ display: 'none' });
                thePart.css({ width: wasWidth, height: wasHeight });
                popUp.slideUp();
                isPopUpOpen = false;
            })).append($('<button>SAVE</button>').click(() => {
                // thePart.css({ width: width.val(), height: height.val()/*, backgroundColor: color.val()*/ });
                popUp.slideUp('slow');
                isPopUpOpen = false;
            })).appendTo(popUp);
        }
    }
    let origWidth = box.css('width'), origHeight = box.css('height'), origZindex = box.css('zIndex');
    const backSong = $('#backSong'), defSong = "songs/MachaBracha.m4a";
    $('#clearStorage').click(() => {
        localStorage.clear();
        localStorage.theSong = backSong.attr('src');
        tools = [];
        index = 0;
        box.css({ position: 'static', width: origWidth, height: origHeight, zIndex: origZindex });
    });

    $('#page').change(e => {
        let song = e.target.value;
        backSong.attr('src', song);
        localStorage.theSong = song;
    });
    backSong.attr('src', localStorage.theSong ? localStorage.theSong : defSong);
    $('option').each((i, o) => {
        // console.log(o);
        if (o.value === backSong.attr('src')) {
            o.selected = true;
        }
    });

}());
