$(function(){
  function buildunlikesbox(json){
    var html = `<a class="review-show__content__like__delete" href="" data-id=${json.id}>
                  <i class="fas fa-heart" id="click-like"></i>
                  <span>${json.count}</span>
                </a>`
    $(".review-show__content__like").html(html);
    return html;
  }
  function buildlikesbox(json){
    var html = `<a class="review-show__content__like__create" href="" data-id=${json.id}>
                  <i class="far fa-heart" id="click-like"></i>
                  <span>${json.count}</span>
                </a>`
    $(".review-show__content__like").html(html);
    return html;
  }
  // イイね作成
  $(document).on('click', '.review-show__content__like__create', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
      url: '/likes/',
      type: "POST",
      data: { id: id },
      dataType: 'json',
    })
    .done(function(json){
      buildunlikesbox(json)
    })
  })
  // イイね削除
  $(document).on('click', '.review-show__content__like__delete', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
      url: `/likes/${id}`,
      type: "delete",
      data: {id: id},
      dataType: 'json',
    })
    .done(function(json){
      buildlikesbox(json)
    })
  })
})