jQuery(function(){
	$('head').append('<script type="text/javascript" src="js/jquery.form-min.js" charset="utf-8"></script>');
	$('.call-form').attr('action', 'ajax.php');
	$('.call-form').ajaxForm({
	    beforeSubmit: function(arr, form, nn) {
	        var errors = 0;
			form.find('input[type="text"]').each(function(){
				if(jQuery(this).val() == '' || jQuery(this).val() == 'Ваше имя' || jQuery(this).val() == ' ' || jQuery(this).val() == 'Телефон' || jQuery(this).val() == 'Сообщение' || jQuery(this).val() == 'Email' || jQuery(this).val() == 'Телефон/Email' || jQuery(this).val() == 'Email или телефон'){
					errors++;
					jQuery(this).addClass('input-error');
				}else{
					jQuery(this).removeClass('input-error');
				}
			});
			form.find('textarea').each(function(){
				if(jQuery(this).val() == '' || jQuery(this).val() == 'Ваше имя' || jQuery(this).val() == ' ' || jQuery(this).val() == 'Телефон' || jQuery(this).val() == 'Сообщение' || jQuery(this).val() == 'Email' || jQuery(this).val() == 'Телефон/Email' || jQuery(this).val() == 'Email или телефон'){
					errors++;
					jQuery(this).addClass('input-error');
				}else{
					jQuery(this).removeClass('input-error');
				}
			});
			console.log(errors);
			if(errors == 0){
				$(form).parent().parent().find('.close-reveal-modal').trigger('reveal:close');
				return true;	
			} else {
				return false;
			}
	    },
	    uploadProgress: function(event, position, total, percentComplete) {
	       
	    },
	    success: function(data) {
	        $('#' + data).reveal({
                animation: 'fadeAndPop',                   //fade, fadeAndPop, none
                animationspeed: 300,                       //how fast animations are
                closeonbackgroundclick: true,
                dismissmodalclass: 'close-reveal-modal'
            });
	    },
		complete: function(xhr) {
			
		},
		resetForm: true
	}); 
});