// <!-- Ajax post request to send the participation informations-->
	
$(document).ready(function(){
    var user,pass;
    $("#submit").click(function(e){
        // avoid the refresh of the page on submit
        e.preventDefault();
        name=$("#name").val();
        number=$("#number").val();
        email=$("#email").val();
        $.post("http://localhost:3000/addAttendant",{name,number,email,overwrite:false}, function(data){
            console.log("data = "+data);
            if(data==='done'){
                alert("Thank you "+name+", your participation has been correctly saved.");
            }else if(data==='duplicates'){
                e.preventDefault();
                var confirmation = confirm("There's already a participation under your email, Do you want to update it?");
                if( confirmation === true){  //yes, we want to overwrite it
                    $.post("http://localhost:3000/addAttendant",{name,number,email,overwrite:true}, function(data2){
                        console.log("data2 = "+data2);
                        if(data2==='done'){
                            alert("Thank you "+name+", your participation has been correctly updated.");
                        }else{
                            alert("There was an error while updating your participation, Please try again in few minutes.");
                        }
                    });
                
                }
            }else{
                alert("There was an error while saving your participation, Please try again in few minutes.")
            }
        });
    });
});
