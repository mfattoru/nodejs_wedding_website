// <!-- Ajax post request to send the participation informations-->
// const HOST = "http://micheleandrosa.wedding"  //when deployed
// const HOST = "http://localhost:50122"      //on local test

// i18next
//     .use(i18nextXHRBackend)
//     .use(i18nextBrowserLanguageDetector)
//     .init({
//         fallbackLng: 'en',
//         debug: true,
//         backend: {
//         // load from i18next-gitbook repo
//         //   loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
//         loadPath: 'locales/{{lng}}',
//         //   loadPath: 'https://raw.githubusercontent.com/mfattoru/nodejs_wedding_website/master/locales/{{lng}}.json',
//         crossDomain: true
//         }
//     });

$(document).ready(function(){

    var user,pass;
    var count=0;
    $("#submitAttending").click(function(e,i18next){
        
        name=$("#name").val();
        numberAdults=$("#numberAdults").val();
        numberChildren=$("#numberChildren").val();
        email=$("#email").val();

        
        if( name !== '' && numberAdults !== '' && email !== '' && numberChildren !== '' ){
            // avoid the refresh of the page on submit
            e.preventDefault();

            $.post(`addAttendant`,{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
                console.log("data: "+ data.text);
                if(data.status==='done' || data.status==='duplicates'){
                    $("#submitAttending").html(data.text); 
                    $("#submitAttending").attr("disabled", true);
                    $("#submitAttending").css("background",'#4CAF50');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                // }else if(data.status==='duplicates'){
                //     $("#submitAttending").html(data.text)); 
                //     $("#submitAttending").attr("disabled", true);
                //     $("#submitAttending").css("background",'#4CAF50');

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
                    $("#submitAttending").html(data.text); 
                    $("#submitAttending").css("background",'#f44336');
                    // alert("There was an error while saving your participation, Please try again in few minutes.")
                }
                // $("#submitAttending").localize();
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

            $.post(`addAttendant`,{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
                if(data.status==='done' || data.status==='duplicates'){
                    $("#submitNotAttending").html(data.text); 
                    $("#submitNotAttending").attr("disabled", true);
                    $("#submitNotAttending").css("background",'#FFA500');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                // }else if(data==='duplicates'){
                //     $("#submitNotAttending").html(i18next.t("Participation updated")); 
                //     $("#submitNotAttending").attr("disabled", true);
                //     $("#submitNotAttending").css("background",'#FFA500');
                }else{
                    $("#submitNotAttending").html(data.text); 
                    $("#submitNotAttending").css("background",'#f44336');
                }
                // $("#submitNotAttending").localize();

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

            $.post(`${HOST}/addAttendant`,{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
                if(data.status==='done' || data.status==='duplicates'){
                    $("#submitNotAttending").html(data.text); 
                    $("#submitNotAttending").attr("disabled", true);
                    $("#submitNotAttending").css("background",'#FFA500');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                // }else if(data==='duplicates'){
                //     $("#submitNotAttending").html(i18next.t("Participation updated")); 
                //     $("#submitNotAttending").attr("disabled", true);
                //     $("#submitNotAttending").css("background",'#FFA500');
                }else{
                    $("#submitNotAttending").html(data.text); 
                    $("#submitNotAttending").css("background",'#f44336');
                }
                // $("#submitNotAttending").localize();

            });
        }
    });
});
