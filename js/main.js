$(function(){
    //sticky top
    var windw = $(window);
    windw.on("scroll",function(){
        var scrolling = windw.scrollTop();
        if(scrolling>0){
            $('#navs').addClass('sticky');
        }
        else{
            $('#navs').removeClass('sticky');
        }
    })

    //filter button active showing
    var btnActive = $('.sortBtn button');
    btnActive.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    //lightbox 
    $('.store-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{
            enabled:true
        }
    });
    
});