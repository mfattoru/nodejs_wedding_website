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
    
    // var user,pass;
    // var count=0;
    $("#submitAttending").click(function(e){
        name=$("#name").val();
        numberAdults=$("#numberAdults").val();
        numberChildren=$("#numberChildren").val();
        email=$("#email").val();
        // evLocation="Pluto";
        evLocation=$('#evLocation option:selected').val();
        // e.preventDefault();

        // alert(location);
        // alert($(this).find('option:selected').val());
        // alert($('#evLocation option:selected').text());
        // alert($('#evLocation option:selected').val());
        // alert($("#evLocation").val());
        // console.log("Location: "+location);

        
        if( name !== '' && numberAdults !== '' && email !== '' && numberChildren !== '' && evLocation !== ''){
            // avoid the refresh of the page on submit
            e.preventDefault();

            $.post(`addAttendant`,{name,numberAdults,numberChildren,email,overwrite:false,participating:true,evLocation}, function(data){
                // console.log("data: "+ data.text);
                // if(data.status==='done' || data.status==='duplicates'){
                if(data.status==='done'){
                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: 'success',
                        confirmButtonText: 'OK'
                    })
                    // $("#submitAttending").html(data.text); 
                    // $("#submitAttending").attr("disabled", true);
                    // $("#submitAttending").css("background",'#4CAF50');
                    // alert("Thank you "+name+", your participation has been correctly saved.");
                }else if(data.status==='duplicates'){

                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: "question",
                        // buttons: [
                        //     data.cancelButton,
                        //     data.confirmButton
                        // ],
                        // confirmButtonColor: "#ff0055",
                        // cancelButtonColor: "#999999",
                        showCancelButton: true,
                        focusConfirm: false,
                        focusCancel: true,
                        confirmButtonText: data.confirmButton,
                        cancelButtonText: data.cancelButton
                            // dangerMode: true,
                    }).then(function (result) {
                        if (result.value) {
                            $.post("addAttendant",{name,numberAdults,numberChildren,email,overwrite:true,participating:true,evLocation}, function(data){
                                // console.log("data2 = "+data2);
                                if(data.status==='done'){
                                    // console.log("DONEDONE")
                                    swal.fire({
                                        title: data.title,
                                        text: data.text,
                                        type: 'success',
                                        confirmButtonText: 'OK'
                                    })
                                    // $("#submitAttending").html("Participation updated"); 
                                    // $("#submitAttending").attr("disabled", true);
                                    // $("#submitAttending").css("background",'#4CAF50');
                                }else{
                                    // console.log("ERRERR")
                                    swal.fire({
                                        title: data.title,
                                        text: data.text,
                                        type: 'error',
                                        confirmButtonText: 'OK'
                                    })
                                    // $("#submitAttending").html("Participation NOT saved, try again!"); 
                                    // $("#submitAttending").css("background",'#f44336');
                                    // alert("There was an error while updating your participation, Please try again in few minutes.");
                                }
                            });
                        }
                    });
                }else{
                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                    // $("#submitAttending").html(data.text); 
                    // $("#submitAttending").css("background",'#f44336');
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
        evLocation=$('#evLocation option:selected').val();
        
        if( name !== '' && email !== '' && evLocation !== ''){
            // avoid the refresh of the page on submit
            e.preventDefault();

            $.post(`addAttendant`,{name,numberAdults,numberChildren,email,overwrite:false,participating:false,evLocation}, function(data){
                if(data.status==='done' ){
                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: 'success',
                        confirmButtonText: 'OK'
                    })
                    // $("#submitNotAttending").html(data.text); 
                    // $("#submitNotAttending").attr("disabled", true);
                    // $("#submitNotAttending").css("background",'#FFA500');
                }else if(data.status==='duplicates'){
                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: "question",
                        // confirmButtonColor: "#ff0055",
                        // cancelButtonColor: "#999999",
                        showCancelButton: true,
                        focusConfirm: false,
                        focusCancel: true,
                        confirmButtonText: data.confirmButton,
                        cancelButtonText: data.cancelButton
                            // dangerMode: true,
                    }).then(function (result) {
                        if (result.value) {
                            $.post("addAttendant",{name,numberAdults,numberChildren,email,overwrite:true,participating:false,evLocation}, function(data){
                                // console.log("data2 = "+data2);
                                if(data.status==='done'){
                                    swal.fire({
                                        title: data.title,
                                        text: data.text,
                                        type: 'success',
                                        confirmButtonText: 'OK'
                                    })
                                }else{
                                    swal.fire({
                                        title: data.title,
                                        text: data.text,
                                        type: 'error',
                                        confirmButtonText: 'OK'
                                    })
                                }
                            });
                        }
                    });
                //     $("#submitNotAttending").html(i18next.t("Participation updated")); 
                //     $("#submitNotAttending").attr("disabled", true);
                //     $("#submitNotAttending").css("background",'#FFA500');
                }else{
                    swal.fire({
                        title: data.title,
                        text: data.text,
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                    // $("#submitNotAttending").html(data.text); 
                    // $("#submitNotAttending").css("background",'#f44336');
                }
                // $("#submitNotAttending").localize();

            });
        }
    });

    // $("#submitNotAttending").click(function(e){

    //     name=$("#name").val();
    //     numberAdults='0';
    //     numberChildren='0';
    //     email=$("#email").val();
        
    //     if( name !== '' && numberAdults !== '' && email !== '' && numberChildren !== '' ){
    //         // avoid the refresh of the page on submit
    //         e.preventDefault();

    //         $.post(`addAttendant`,{name,numberAdults,numberChildren,email,overwrite:true}, function(data){
    //             if(data.status==='done' || data.status==='duplicates'){
    //                 $("#submitNotAttending").html(data.text); 
    //                 $("#submitNotAttending").attr("disabled", true);
    //                 $("#submitNotAttending").css("background",'#FFA500');
    //                 // alert("Thank you "+name+", your participation has been correctly saved.");
    //             // }else if(data==='duplicates'){
    //             //     $("#submitNotAttending").html(i18next.t("Participation updated")); 
    //             //     $("#submitNotAttending").attr("disabled", true);
    //             //     $("#submitNotAttending").css("background",'#FFA500');
    //             }else{
    //                 $("#submitNotAttending").html(data.text); 
    //                 $("#submitNotAttending").css("background",'#f44336');
    //             }
    //             // $("#submitNotAttending").localize();

    //         });
    //     }
    // });
});
