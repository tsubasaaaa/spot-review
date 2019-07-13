$(function(){
  $('.show-edit__content__map__btn').click(function(e){
    console.log("きたー")
    e.preventDefault();
    var lat = $(this).data('lat');
    var long = $(this).data('long')
    var MyLatLng = new google.maps.LatLng(lat, long);
    var Options = {
    zoom: 15,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
    };
    var place = $(".show-edit__content__map__box")[0];
    $(".show-edit__content__map__box").css("height","300px","width","600px","margin", "0 auto")
    var map = new google.maps.Map(place, Options);
    var marker = new google.maps.Marker({
      map: map,
      position: MyLatLng,
    });
  })
});
