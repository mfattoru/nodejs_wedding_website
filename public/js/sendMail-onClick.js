// <!-- Ajax post request to send the participation informations-->

$(document).ready(function(){
    $("#submitEmail").click(function(e){
        //Disable the button to prevent double clicking
        // $("#submitEmail").attr("disabled", true);

        fname=$("#fname").val();
        lname=$("#lname").val();
        subject=$("#subject").val();
        message=$("#message").val();
        email=$("#email").val();

        if( fname !== '' && lname !== '' && email !== '' && subject !== '' && message!== '' ){
            // avoid the refresh of the page on submit
            e.preventDefault();
            $.post(`sendMail`,{fname,lname,subject,message,email}, function(data){
                console.log("data: "+ data.text);
                // $("#submitEmail").html(data.text);
                $("#submitEmail").attr("value",data.text); 
                if(data.status==='ok'){                    
                    $("#submitEmail").css("style",'background: #4CAF50;');
                }else{
                    $("#submitEmail").css("style",'background: #f44336;');
                }
            });
        }
    });
});
