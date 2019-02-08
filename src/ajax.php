<?php

include "libmail.php";



	$m = new Mail();
	//$m->smtp_on('',)
	$m->From( "im04@il.i" );
	$m->To("im04@il.i");
	//$m->To("im04@il.i");

	if(isset($_POST['order-call'])) {
		$m->Subject('Contact');
        $body = '<p><b>Name:</b> '.$_POST['name'].'</p>'
            //.'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
            .'<p><b>Email:</b> '.$_POST['email'].'</p>'
            .'<p><b>Message:</b> '.$_POST['message'].'</p>';
        echo "thanks";
	}

	elseif (isset($_POST['contact'])) {
        $m->Subject('Обратная связь');
        $body = '<p><b>Имя:</b> '.$_POST['name'].'</p>'
            .'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
            .'<p><b>Email:</b> '.$_POST['email'].'</p>'
            .'<p><b>Сообщение:</b> '.$_POST['message'].'</p>';
        echo "thanks";
    }



	$m->Body($body, 'html');
	$m->Send();
?>
