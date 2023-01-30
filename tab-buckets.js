jQuery(document).ready(function () {

jQuery('.buckets__wrap').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //asNavFor: 'slider-for',
        dots: true,
        });

jQuery('.bucket__navitem').click(function(){
        var clicked_nav='#'+jQuery(this).attr('navslide')+' button';
        jQuery(clicked_nav).trigger('click');
        jQuery(this).parent().find('.active').removeClass('active');
        jQuery(this).addClass('active');
        //jQuery('#slick-slide01 button').trigger('click');
    console.log(clicked_nav);
});
});