// load the Portal and PortalQueryParams modules
require(["esri/portal/Portal",
 "esri/portal/PortalGroup",
 "esri/portal/PortalQueryParams",
 "dojo/domReady!"], function(Portal, PortalQueryParams, PortalGroup) {


  var portalParams = {
     // if AGOL, Setting authMode to immediate signs the user in once loaded
     authMode : "immediate",
     url : "https://wsldctpgweb.water.internal/portal/", //portal URL
   }
  portal = new Portal(portalParams);

  //load Portal Class
  portal.load().then(function() {
    var groupParameters = {
      query: "id:" + "50c8ced63ef7437dba9f4b51edf258b2" //group Name
    };

    portal.queryGroups(groupParameters).then(function(groupResults){
      //generate portal div for cards
      groupName = groupResults.results[0].id;
      console.log(groupResults)
      var pills = `
                  <li class="nav-item">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-${groupName}" role="tab" aria-controls="pills-profile" aria-selected="false">${groupName}</a>
                  </li>
                  `

      var cardHolder = `
                        <div class="tab-pane fade" id="pills-${groupName}" role="tabpanel" aria-labelledby="pills-profile-tab">
                          <div class="row" id="${groupName}"></div>
                        </div>
                        `
      $('#pills-tabContent').append(cardHolder);
      $('#pills-tab').append(pills);


      groupResults.results[0].queryItems().then(function(itemResults){
        itemResults.results.forEach(function(item){
          var title = item.title;
          var thumbnail = item.thumbnailUrl;
          var snippet = item.snippet;
          var url = item.url;
          console.log(title, "\n", thumbnail, "\n", snippet);
          item.tags.forEach(function(item){
            console.log("tag:", item);
          });

          //generate page cards
          var card = `
              <div class="card " style="width: 18rem;">
                <img class="card-img-top" src="${thumbnail}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${snippet}</p>
                  <a href="${url}" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            `;
           $('#'+groupName).append(card);


        });
      });
    });

  });

});
