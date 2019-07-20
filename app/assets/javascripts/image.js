$(function() {
  function build_image(alt, src){
    // 画像の箱
    var html = `<div class="review-post__box__image__box__content">
                  <img class="review-post__box__image__box__content__image" alt="${alt}" src="${src}">
                  <a class="review-post__box__image__box__content__delete" href="" data-count="${alt}" >削除</a>
                </div>`
  return html;
  }
  var files_array= []
  var count = 0;
  var image_tag;

  $(document).on('change', '.review-post__box__image__btn', function(e){
    // ファイルオブジェクト取得
    var files = $(".review-post__box__image__btn__form").prop('files');
    for (var i=0; i<files.length; i++) {
      var file = e.target.files[i];
      var file_reader = new FileReader();

      files_array.push(files[i]);
      // 画像プレビュー諸々
      file_reader.onload = (function () {
        return function (e) {
          // 画像表示
          image_tag = build_image(count, e.target.result);
          $('.review-post__box__image__box').append(image_tag);
          // 次のfile_fieldの選択
          if (count <= 2 && $(`#review_images_attributes_${count + 1}_image`).val() === ""){
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count += 1}_image`)
          }else if(count === 3 && $(`#review_images_attributes_${count - 3}_image`).val() === "") {
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count -= 3}_image`)
          }else if(count <= 1 && $(`#review_images_attributes_${count + 2}_image`).val() === "") {
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count += 2}_image`)
          }else if(count >= 2 && $(`#review_images_attributes_${count - 2}_image`).val() === ""){
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count -= 2}_image`)
          }else if(count === 0 && $(`#review_images_attributes_${count + 3}_image`).val() === ""){
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count += 3}_image`)
          }else if(count >= 1 && $(`#review_images_attributes_${count - 1}_image`).val() === ""){
            $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count -= 1}_image`)
          }else{
            $('.review-post__box__image__btn').css("display", "none");
          }
        };
      })(file);
    file_reader.readAsDataURL(file);
    }
  });

  // 画像の削除
  $(document).on('click','.review-post__box__image__box__content__delete', function(e){
    e.preventDefault();
    console.log("きた")
    // 新規の画像処理
    if ($(this).data('count') !== undefined){
      count = $(this).data('count');
      $(`#review_images_attributes_${count}_image`).val("");
      $('.review-post__box__image__btn').attr('for', `review_images_attributes_${count}_image`)
    }else{
      // 既存の画像処理
      var id = $(this).data('id');
      if ($('#review_images_attributes_0_id').val() === ""){
        $('#review_images_attributes_0_id').val(id);
      }else if ($('#review_images_attributes_1_id').val() === ""){
        $('#review_images_attributes_1_id').val(id);
      }else if ($('#review_images_attributes_2_id').val() === ""){
        $('#review_images_attributes_2_id').val(id);
      }else if ($('#review_images_attributes_3_id').val() === ""){
        $('#review_images_attributes_3_id').val(id);
      }
    }
    var parent = $(this).parents('.review-post__box__image__box__content').remove();
    // 4枚目だった場合の処理
    if ($('.review-post__box__image__btn').css("display") === 'none'){
      $('.review-post__box__image__btn').css("display", "block");
    }
  });

  // 画像の編集削除の際にformを空にする処理
  $(window).on("load",function(){
    if(document.URL.match(/edit/)){
      $("#review_images_attributes_0_id").val("")
      $("#review_images_attributes_0_id").attr("name", "delete[]")
      $("#review_images_attributes_1_id").val("")
      $("#review_images_attributes_1_id").attr("name", "delete[]")
      $("#review_images_attributes_2_id").val("")
      $("#review_images_attributes_2_id").attr("name", "delete[]")
      $("#review_images_attributes_3_id").val("")
      $("#review_images_attributes_3_id").attr("name", "delete[]")
    }
    if($(".review-post__box__image__box__content").length === 4){
      $('.review-post__box__image__btn').css("display", "none");
    }
  })
});
