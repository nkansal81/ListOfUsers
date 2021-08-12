// My NASA API Key = jWalOKDs1Rfb3TGVVYRxyqgJuGl5LkblccwEhmcV

var userList = $("#getUsers");
var page = $('#page');
var pageValue;
$( "#prevPage" ).prop( "disabled", true );
$( "#nextPage" ).prop( "disabled", true );


$("#button").click(function(e){
    e.preventDefault();

    pageValue = page.val();
    if(pageValue === ""){
        alert("Please fill the details of the page");
        return;
    }

    console.log(pageValue);

    let url = 'https://reqres.in/api/users?page=' + pageValue;

    $.get(url,function(data){
    //    $( "#nextPage" ).prop( "disabled", false);

        let users = data.data;
        console.log(users);
        console.log(users.length,"length");

        if(users.length==0){
            alert("No users are available for this page");
            return;
        }

        $("#getUsers div").remove();
        $("#getUsers button").remove();
        userList.append(`
            <button>"Page No: " ${pageValue}</button>
        `)
        for(let list of users){
            userList.append(`
                <div class="userNew">
                    <div class="user">
                       <p>Id of user:</p>
                       <p>First Name of user:</p>
                       <p>Last Name of user:</p>
                    </div>
                    <div class="user">
                       <p class="id">${list.id}</p>
                       <p class="first-name">${list.first_name}</p>
                       <p class="last-name">${list.last_name}</p>
                    </div>
                    <div class="user">
                       <img alt="avatar" src=${list.avatar}>
                    </div>
                </div>
                `);

        }
        
        let next = pageValue +1;
        let url = 'https://reqres.in/api/users?page=' + next;

        $.get(url,function(subdata){
                 let users = subdata.data;
                 if(users.length==0){
                      $( "#nextPage" ).prop( "disabled", true);
                 } else {
                    $( "#nextPage" ).prop( "disabled", false);
                 }
        });

        if(pageValue<=1){
            $("#prevPage").prop("disabled", true);
        } else{
            $("#prevPage").prop("disabled", false);
        }
        
    }).fail(function(xhr,textStatus,errorThrown){
        console.log("Request failed");
    });
   
});

$( "#nextPage" ).click(function(e){
     e.preventDefault();

     let nextPage = $("#nextPage").disabled;

        pageValue = pageValue + 1;
        console.log(pageValue);

        let url = 'https://reqres.in/api/users?page=' + pageValue;
        $.get(url,function(data){
    
            let users = data.data; 

            $( "#prevPage" ).prop( "disabled", false);
            $("#getUsers div").remove();
            $("#getUsers button").remove();
            userList.append(`
                 <button>"Page No: " ${pageValue}</button>
            `)
            for(let list of users){
                userList.append(`
                    <div class="userNew">
                        <div class="user">
                           <p>Id of user:</p>
                           <p>First Name of user:</p>
                           <p>Last Name of user:</p>
                        </div>
                        <div class="user">
                           <p class="id">${list.id}</p>
                           <p class="first-name">${list.first_name}</p>
                           <p class="last-name">${list.last_name}</p>
                        </div>
                        <div class="user">
                           <img alt="avatar" src=${list.avatar}>
                        </div>
                    </div>
                    `);

            }

            let next = pageValue +1;
            let urlNew = 'https://reqres.in/api/users?page=' + next;

            $.get(urlNew,function(subdata){
                 let list = subdata.data;
                 if(list.length==0){
                      $( "#nextPage" ).prop( "disabled", true );
                 }
            });
            
            
        }).fail(function(xhr,textStatus,errorThrown){
            console.log("Request failed");
        });
    // }
    
});

$("#prevPage").click(function(e){
    e.preventDefault();

    let prevPage = $("#prevPage").disabled;
        pageValue = pageValue - 1;
        console.log(pageValue);

        let urlNew = 'https://reqres.in/api/users?page=' + pageValue;
        $.get(urlNew,function(data){

            let users = data.data;

            if(users.length==0){
                alert("no more users to show");
                return;
            }
            $("#nextPage" ).prop( "disabled", false);
            
            $("#getUsers div").remove();
            $("#getUsers button").remove();
             userList.append(`
                <button>"Page No: " ${pageValue}</button>
            `)
            for(let list of users){
                userList.append(`
                    <div class="userNew">
                        <div class="user">
                           <p>Id of user:</p>
                           <p>First Name of user:</p>
                           <p>Last Name of user:</p>
                        </div>
                        <div class="user">
                           <p class="id">${list.id}</p>
                           <p class="first-name">${list.first_name}</p>
                           <p class="last-name">${list.last_name}</p>
                        </div>
                        <div class="user">
                           <img alt="avatar" src=${list.avatar}>
                        </div>
                    </div>
                    `);

            }

            if(pageValue<=1){
                $("#prevPage").prop("disabled", true);
                return;
            }
            
            
        }).fail(function(xhr,textStatus,errorThrown){
            console.log("Request failed");
        });
});
