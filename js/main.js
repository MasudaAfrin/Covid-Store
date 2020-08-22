$(function(){
    var btnActive = $('.sortBtn button');
    btnActive.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.store-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{
            enabled:true
        }
    });
    
});