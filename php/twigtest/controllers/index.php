<?php

require_once '../Twig/Autoloader.php';

// autoloaderの登録
Twig_Autoloader::register();

// テンプレートを使って出力
$loader = new Twig_Loader_Filesystem('../views/');
$twig = new Twig_Environment($loader, array(
    'cache' => '../cache',
    'auto_reload' => true
));

// 指定したパスからテンプレートを読み込む
$template = $twig->loadTemplate('index.html.twig');
$template->display(array(
    'baseTitle' => 'TwigTest',
    'navigation' => array(
        array(
            'href' => '/',
            'caption' => 'home'
        ),
        array(
            'href' => '#company',
            'caption' => 'company'
        )
    )
));




echo 'test twig';
