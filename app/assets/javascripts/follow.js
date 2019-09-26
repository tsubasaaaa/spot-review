$(function(){

  function buildunfollowbox(json, count){
  var html = `<a class="other__field__content1__follow__unfollow" href="" data-id=${json.id} data-count=${count}>
                フォロー解除
              </a>`
    $(".other__field__content1__follow").html(html);
    return html;
  }

  function buildfollowbox(json, count){
    var html = `<a class="other__field__content1__follow__btn" href="" data-id=${json.id} data-count=${count}>
                  フォロー
                </a>`
      $(".other__field__content1__follow").html(html);
      return html;
  }
  //フォローした時
  $(document).on('click', '.other__field__content1__follow__btn', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    var count = $(this).data('count');
    count += 1
    console.log("きたよ！")
    $.ajax({
      url: '/relationships/',
      type: 'post',
      data: {id: id},
      dataType: 'json',
    })
    .done(function(json){
      console.log("またきたよ！")
      buildunfollowbox(json, count)
      $(".other__field__content2__followers__count").html(count)
    })
  })
  //フォロー解除した時
  $(document).on('click', '.other__field__content1__follow__unfollow', function(e){
    console.log("kita")
    e.preventDefault();
    var id = $(this).data('id');
    var count = $(this).data('count');
    count -= 1
    $.ajax({
      url: `/relationships/${id}`,
      type: 'delete',
      data: {id: id},
      dataType: 'json',
    })
    .done(function(json){
      buildfollowbox(json, count)
      $(".other__field__content2__followers__count").html(count)
    })
  })
})