<?php
$message = '';
if ($_POST['message']) {
    $message = $_POST['message'];
    $fp = fopen("./messages.txt", "a");
    fwrite($fp, $message . "\n");
    fclose($fp);
}

?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<div class="messages">
<?php
$fp = fopen("./messages.txt", "r");
while ($line = fgets($fp)) {
    echo "$line<br />";
}
echo '<br>';
?>
</div>
<form action="" method="post">
    <input type="text" name="message"></input>
    <input type="submit" name="sub" value="送信"></input>
</form>
</body>
</html>
