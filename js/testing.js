const APIKEY = "65b39da5fc1ad2bd332e3653";
    //[STEP] 6
    // Let's create a function to allow you to retrieve all the information in your contacts
    // By default, we only retrieve 10 results
    function getContacts(limit = 12, all = true) {

      //[STEP 7]: Create our AJAX settings
      let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }

      //[STEP 8]: Make our AJAX calls
      // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
      // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
      fetch("https://fedassg2product-f089.restdb.io/rest/product", settings)
        .then(response => response.json())
        .then(response => {
          let content = "";

          for (var i = 0; i < response.length && i < limit; i++) {
            //console.log(response[i]);
            //[METHOD 1]
            // Let's run our loop and slowly append content
            // We can use the normal string append += method
            /*
            content += "<tr><td>" + response[i].name + "</td>" +
              "<td>" + response[i].email + "</td>" +
              "<td>" + response[i].message + "</td>
              "<td>Del</td><td>Update</td</tr>";
            */

            //[METHOD 2]
            // Using our template literal method using backticks
            // Take note that we can't use += for template literal strings
            // We use ${content} because -> content += content 
            // We want to add on previous content at the same time
            content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
            <td>${response[i].student_phoneno}</td>
            <td>${response[i].email}</td>
            <td>${response[i].studentid}</td>
            <td>${response[i].student_class}</td>
            <td>${response[i].student_mentor}</td>
            
            <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-phoneno='${response[i].student_phoneno}' data-class='${response[i].student_class}' data-id='${response[i]._id}' data-mentor='${response[i].student_mentor}' data-studentid='${response[i].studentid}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;

          }

          //[STEP 9]: Update our HTML content
          // Let's dump the content into our table body
          document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;

          document.getElementById("total-contacts").innerHTML = response.length;
        });