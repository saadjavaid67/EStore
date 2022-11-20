<?php
if(isset($_POST['submit'])){
    $fname=$_POST['fname'];
    $lname=$_POST['lname'];
    $email=$_POST['email'];
    $phone=$_POST['number'];
    $address=$_POST['address'];
    $city=$_POST['city'];
    $zip=$_POST['zip'];
    $hidden=$_POST['hidden'];



    $to = 'saadjavaid67@gmail.com'; 
    $from = $email; 
    $fromName = $fname.$lname; 
    $subject = "Your Order Is Placed Sucessfully."; 
    $htmlContent = '<html>
    <head>
    <style>
.invoice-cont{
    width: fit-content;
    box-shadow: 0px 0px 50px grey;
    margin: 50px auto;
    padding: 40px 20px 15px 20px;
    border-radius: 25px;
}
table th {
    border: 1px solid rgb(155, 155, 155);
    border-bottom: 4px solid rgb(155, 155, 155);
    text-align: left;
    padding: 2.5vw 5vw;
}
tbody td {
    border: 1px solid rgb(155, 155, 155);
    padding: 2.5vw 5vw;
}
tfoot td {
    border: 1px solid rgb(155, 155, 155);
    padding: 2.5vw 5vw;
}
tbody {
    margin-bottom: 20px;
}
thead {
    background-color: #f0f0f0;
}
thead tr {
    height: 40px;
}
.no-border {
    border: 0px;
}
tfoot:before {
    line-height: 1em;
    content: ".";
}
.align-right {
    text-align: right;
}
.invoice-name {
    width: 58%;
}
.invoice-id {
    width: 17%;
}
.invoice-qty {
    width: 10%;
}
.table-invoice {
    font-size: 2vw;
    margin: 0 auto;
    width: 90vw;
    /* border: 1px solid rgb(155, 155, 155); */
    border-collapse: collapse;   
}
.invoice-product-img {
    width: 40px;
    height: 40px;
}</style>
</head>
<body>
<Strong>From: </strong>'.$fname.' '.$lname.
'<br><Strong>Mobile no: </strong>'.$phone.
'<br><Strong>Address: </strong>'.$address.
'<br><Strong>City: </strong>'.$city.
'<br><Strong>Postal Code: </strong>'.$zip.
'<br>'.'<div  class="invoice-cont">'.$hidden.
'</div>
</body>
</html>';
    // Set content-type header for sending HTML email 
    $headers = "MIME-Version: 1.0" . "\r\n"; 
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
    // Additional headers 
    $headers .= 'From: '.$from. "\r\n";
    // Send email 
    if(mail($to, $subject, $htmlContent, $headers)){ 
        echo "<center><h1>Thank You ".$fname."!. Your Order Has Been Placed Successfully. We'll Contact You Shortly.</h1></center>"; 
        header("Location: http://www.snoocberlin0.000webhostapp.com/");
        exit();
    }else{ 
       echo '<center><h1>Something Went Wrong. :( </h1></center>'; 
    }
}
?>