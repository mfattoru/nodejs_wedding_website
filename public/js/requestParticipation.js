// <!-- Ajax post request to send the participation informations-->
	
$(document).ready(function(){
    var user,pass;
    var count=0;
    $("#submitAttending").click(function(e){

        name=$("#name").val();
        numberAdults=$("#numberAdults").val();
        numberChildren=$("#numberChildren").val();
        email=$("#email").val();

        
        if( name !== '' && numberAdults !== '' && email !== '' && numberChildren !== '' ){
            // avoid the refresh of the page on submit
            e.preventDefault();

            $.post("http://localhost:3000/addAttendant",{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
                if(data==='done'){
                    $("#submitAttending").html("Participation saved"); 
                    $("#submitAttending").attr("disabled", true);
                    $("#submitAttending").css("background",'#4CAF50');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                }else if(data==='duplicates'){
                    $("#submitAttending").html("Participation updated"); 
                    $("#submitAttending").attr("disabled", true);
                    $("#submitAttending").css("background",'#4CAF50');

                    // Preferred to automatically update an existing participation instead of querying the user if they want to update it
                    // Now oven when overwrite is true, the method returns is it finds a duplicate or not, so done or duplicate
                    // e.preventDefault();
                    // var confirmation = confirm("There's already a participation under your email, Do you want to update it?");
                    // if( confirmation === true){  //yes, we want to overwrite it
                    //     $.post("http://localhost:3000/addAttendant",{name,numberAdults,numberChildren,email,overwrite:true}, function(data2){
                    //         console.log("data2 = "+data2);
                    //         if(data2==='done'){
                    //             $("#submitAttending").html("Participation updated"); 
                    //             $("#submitAttending").attr("disabled", true);
                    //             $("#submitAttending").css("background",'#4CAF50');
                    //         }else{
                    //             $("#submitAttending").html("Participation NOT saved, try again!"); 
                    //             $("#submitAttending").css("background",'#f44336');
                    //             alert("There was an error while updating your participation, Please try again in few minutes.");
                    //         }
                    //     });
                    
                    // }
                }else{
                    $("#submitAttending").html("Participation NOT saved, try again!"); 
                    $("#submitAttending").css("background",'#f44336');
                    // alert("There was an error while saving your participation, Please try again in few minutes.")
                }
            });
        }
    });

    $("#submitNotAttending").click(function(e){

        name=$("#name").val();
        numberAdults='0';
        numberChildren='0';
        email=$("#email").val();
        
        if( name !== '' && numberAdults !== '' && email !== '' && numberChildren !== '' ){
            // avoid the refresh of the page on submit
            e.preventDefault();

            $.post("http://localhost:3000/addAttendant",{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
                if(data==='done'){
                    $("#submitNotAttending").html("Participation saved"); 
                    $("#submitNotAttending").attr("disabled", true);
                    $("#submitNotAttending").css("background",'#FFA500');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                }else if(data==='duplicates'){
                    $("#submitNotAttending").html("Participation updated"); 
                    $("#submitNotAttending").attr("disabled", true);
                    $("#submitNotAttending").css("background",'#FFA500');
                }else{
                    $("#submitAttending").html("Participation NOT saved, try again!"); 
                    $("#submitAttending").css("background",'#f44336');
                }
            });
        }
    });
});
