//First i create eevent-triggers
$(document).on('click', '#btnModalPopup', function (ev) {
    var uid = $(this).data('id');
    shortinfo(uid);
});
$(document).on('click', '#btnModalAlbum', function (ev) {
    var album = $(this).data('id');
    var artist = $("#txtArtist").val();
    albuminfo(artist, album);
});
$(document).on('click', '#imgA', function (ev) {
    var uid = $(this).data('id');
    var b = '<img src="' + uid + '" class="modalBild">';
    $('#inBild').modal('show');
    $("#BildA").html(b);
});
$(document).ready(function () {
    $("#spinn").hide();
    $("#btnSearch").click(function () {
        var artist = $("#txtArtist").val();
        if (artist === "")
            return;
        $('#start').hide();
        $("#spinn").show();
        getArtist(artist);
        getLiknande(artist);
        getTopalbums(artist);
        getBilder(artist);
        CallYoutube(artist);
        event.preventDefault();
    });
    $("#btnPlay").click(function () {
        var v = $("#cboVideo").val();
        ShowVideo(v);
    });
   $('#infoArtist').on('show.bs.modal', function (ev) {
        var uid = $(this).data('id');
        //$("#info").html('<h3>Hallå</h3>');
    })
   $('#btnModalPopup').click(function () {

       var c_id = $(this).data('id');
       console.log(c_id)

       $('#infoArtist #info').val(c_id)
       $('#infoArtist').modal('show')

   });
    //Nu döljer jag de sectioner som inte ska visas
    $("#liknande").addClass("hiddenInfo");
    $("#topPlattor").addClass("hiddenInfo");
    $("#pictures").addClass("hiddenInfo");
    $("#video").addClass("hiddenInfo");
    $("#about").addClass("hiddenInfo");

 $('#similar').click(function (event) {
        $("#main").addClass("hiddenInfo");
        $("#liknande").removeClass("hiddenInfo");
        $("#topPlattor").addClass("hiddenInfo");
        $("#pictures").addClass("hiddenInfo");
        $("#video").addClass("hiddenInfo");
        $("#about").addClass("hiddenInfo");
    });
 $('#maina').click(function (event) {
     $("#main").removeClass("hiddenInfo");
     $("#liknande").addClass("hiddenInfo");
     $("#topPlattor").addClass("hiddenInfo");
     $("#pictures").addClass("hiddenInfo");
     $("#video").addClass("hiddenInfo");
     $("#about").addClass("hiddenInfo");
    });
$('#topA').click(function (event) {
    $("#main").addClass("hiddenInfo");
    $("#liknande").addClass("hiddenInfo");
    $("#topPlattor").removeClass("hiddenInfo");
    $("#pictures").addClass("hiddenInfo");
    $("#video").addClass("hiddenInfo");
    $("#about").addClass("hiddenInfo");
});
$('#bilder').click(function (event) {
    $("#main").addClass("hiddenInfo");
    $("#liknande").addClass("hiddenInfo");
    $("#topPlattor").addClass("hiddenInfo");
    $("#pictures").removeClass("hiddenInfo");
    $("#video").addClass("hiddenInfo");
    $("#about").addClass("hiddenInfo");
});
$('#youtube').click(function (event) {
    $("#main").addClass("hiddenInfo");
    $("#liknande").addClass("hiddenInfo");
    $("#topPlattor").addClass("hiddenInfo");
    $("#pictures").addClass("hiddenInfo");
    $("#video").removeClass("hiddenInfo");
    $("#about").addClass("hiddenInfo");
});
$('#om').click(function (event) {
    $("#main").addClass("hiddenInfo");
    $("#liknande").addClass("hiddenInfo");
    $("#topPlattor").addClass("hiddenInfo");
    $("#pictures").addClass("hiddenInfo");
    $("#video").addClass("hiddenInfo");
    $("#about").removeClass("hiddenInfo");
});
});

//hämta artist bio and picture
function getArtist(artist) {
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/artist?artist=" + artist,
        crossDomain: true,
        async: true,     
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successArtist,
        error: function (msg) {

            $("#spinn").hide();

        }
    });
    function successArtist(data) {
        var obj = JSON.parse(data);
        $("#artist").html('<h1>' + obj[0].artist + '</h1>');
        $("#bild").html('<img src="' + obj[0].artistBild + '" class="img-fluid" >');
        $("#bio").html(obj[0].InfoArtist);
        $("#spinn").hide();
    }
}
//Hämta liknande artister
function getLiknande(artist){
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/Liknande?artist=" + artist,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successLiknande,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successLiknande(data) {
        var obj = JSON.parse(data);
        var HTML = '<div class="block-grid-xs-1 block-grid-sm-2 block-grid-md-3 block-grid-lg-3">';
        $.each(obj, function (index, item) {
            HTML += '<div class="media" style="padding:15px;">';
            HTML += '<div class="media-left media-middle">';
            HTML += '<img src="' + item.bild + '" class="media-object" style="width:80px; height:80px" id="imgA" data-id="' + item.bild + '">'
            HTML += '</div>';
            HTML += '<div class="media-body" style="padding:15px;">';
            HTML += '<h4 class="media-heading">' + item.namn + '</h4>';
            HTML += '<button type="button" class="btn btn-info"  data-id="' + item.namn + '" data-toggle="modal" data-target="#infoArtist"  id="btnModalPopup">More</button>';
            HTML += '</div>';
            HTML += '</div>';
        });
        HTML += '</div';
        link = HTML;
        
        $("#Likn").html(HTML);
       
    }
}
//Hämta top albums
function getTopalbums(artist){
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/Topalbums?artist=" + artist,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successTop,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successTop(data) {
        var obj = JSON.parse(data);
        var HTML = '<div class="block-grid-xs-1 block-grid-sm-2 block-grid-md-3 block-grid-lg-3">';
        $.each(obj, function (index, item) {
            HTML += '<div class="media" style="padding:15px;">';
            HTML += '<div class="media-left media-middle">';
            HTML += '<img src="' + item.Coverart + '" class="media-object" style="width:80px; height:80px;">'
            HTML += '</div>';
            HTML += '<div class="media-body" style="padding:15px;">';
            HTML += '<h4 class="media-heading">' + item.Album + '</h4>';
            HTML += '<button type="button" class="btn btn-info"  data-id="' + item.Album + '" data-toggle="modal" data-target="#infoAlbum"  id="btnModalAlbum">More</button>';
            HTML += '</div>';
            HTML += '</div>';
           
        });
        HTML += '</div>';
        $("#topP").html(HTML);
    }
}
//Hämta bilder
function getBilder(artist) {
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/Bild2?artist=" + artist,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successBilder,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successBilder(data) {
        var obj = JSON.parse(data);
        var HTML = "";
        HTML += '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">';
        HTML +='<div class="carousel-inner " role="listbox">';
        $.each(obj, function (index, item) {
            if (index === 0) {
                HTML += '<div class="carousel-item active center">';
                HTML += '<img class="d-block img-fluid ml-auto mr-auto bildSpel " src="' + item.kalla + '" alt="Picture" >'
            }      
                    else{

                HTML += '<div class="carousel-item center">';
                HTML += '<img class="d-block img-fluid ml-auto mr-auto bildSpel " src="' + item.kalla + '" alt="Picture" >'
                    }
            HTML += '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">';
            HTML += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
            HTML += '<span class="sr-only">Previous</span>';
            HTML += '</a>';
            HTML += '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">';
            HTML += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
            HTML += '<span class="sr-only">Next</span>';
            HTML += '</a><br/>';
            HTML += '</div>';
        });
        //HTML += HTML.replace("undefined", "");
        HTML += '</div></div>';
        $("#pic").html(HTML);
        $('.carousel').carousel();
    }
}
//Hämtar youtube videos
function CallYoutube(artist) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: "http://resultatservice.azurewebsites.net/api/Video?artist=" + artist,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response) {
                var obj = JSON.parse(response);
                var shtml = '<select class="custom-select" id="cboVideo">';
                $.each(obj, function (index, item) {
                    var video_id = item.Id;
                    var video_title = item.Title;
                    shtml += '<option value="' + video_id + '">' + video_title + ' </option>';
                });
                shtml += '</select>';
                $("#lista").html(shtml);
            }
            else {
                $("#result").html("<div id='no'>No Video</div>");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }

    });
}
function ShowVideo(id) {
    /* Hämtar storlek på skärmen*/
    var iWidth = screen.width;
    var W = screen.width - 10;
    var H = W * 0.68;
    /*Slut skärm*/
    try {
        var video_id = document.getElementById("cboVideo").value;
        var video_title = $('#cboVideo option:selected').text();
        final = '<div class="video-container"><iframe width="853" height="480" src="https://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe</div>';
        $("#result").html(final);
    }
    catch(err){
        $("#result").empty();
    }
    
}
function shortinfo(artist) {
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/ShortinfoArtist?artist=" + artist,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successShort,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successShort(data) {
        var obj = JSON.parse(data);
        $("#info").html(obj[0].InfoArtist);
        
    }
   
}
function albuminfo(artist, album) {
    $.ajax({
        type: "GET",
        url: "http://resultatservice.azurewebsites.net/api/Album?artist=" + artist + "&album=" + album,
        crossDomain: true,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successShort,
        error: function (msg) {

            alert(msg.statusText);

        }
    });
    function successShort(data) {
        var obj = JSON.parse(data);
        $("#infoSkiva").html(obj[0].InfoArtist);

    }

}
