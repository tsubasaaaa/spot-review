$(function(){
  $('.review-post__box__place__form__btn').click(function(e){
    // ユーザーの端末がGeoLocation APIに対応しているかの判定
    // 対応している場合
    if( navigator.geolocation ){
      console.log("きた！")
      navigator.geolocation.getCurrentPosition(
        function(pos){
          var lat = pos.coords.latitude;
          var long = pos.coords.longitude;
          $('.review-post__box__place__form__latitude').val(lat);
          $('.review-post__box__place__form__longitude').val(long);
          var MyLatLng = new google.maps.LatLng(lat, long);
          var Options = {
          zoom: 15,      //地図の縮尺値
          center: MyLatLng,    //地図の中心座標
          mapTypeId: 'roadmap'   //地図の種類
          };
          var place = $(".review-post__box__place__form__map")[0];
          $(".review-post__box__place__form")
          $(".review-post__box__place__form__map").css("height","300px","width","600px")
          var map = new google.maps.Map(place, Options);
          var marker = new google.maps.Marker({
            map: map,
            position: MyLatLng,
          });
        },
        // [第2引数] 取得に失敗した場合の関数
        function( error ) {
          // エラーコード(error.code)の番号
          // 0:UNKNOWN_ERROR				原因不明のエラー
          // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
          // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
          // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

          // エラー番号に対応したメッセージ
          var errorInfo = [
            "原因不明のエラーが発生しました…。" ,
            "位置情報の取得が許可されませんでした…。" ,
            "電波状況などで位置情報が取得できませんでした…。" ,
            "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
          ] ;

          // エラー番号
          var errorNo = error.code ;

          // エラーメッセージ
          var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

          // アラート表示
          alert( errorMessage ) ;

        //   // HTMLに書き出し
        //   document.getElementById("result").innerHTML = errorMessage;
		    }
      );
    }
    // 対応していない場合
    else{
      // エラーメッセージ
      var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

      // アラート表示
      alert( errorMessage ) ;

      // // HTMLに書き出し
      // document.getElementById( 'result' ).innerHTML = errorMessage ;
    }
  });
});
