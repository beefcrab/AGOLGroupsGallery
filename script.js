
//portalURL = "https://www.arcgis.com";
function populatePortal(id, purl){
    // load the Portal and PortalQueryParams modules
    require(["esri/portal/Portal",
     "esri/portal/PortalGroup",
     "esri/portal/PortalQueryParams",
     "dojo/domReady!"], function(Portal, PortalQueryParams, PortalGroup) {

      var portalParams = {
         // if AGOL, Setting authMode to immediate signs the user in once loaded
         authMode : "anonymous",
         url : purl, //portal URL
         authorizedCrossOriginDomains:["giswebdev", "localhost"]
       }
      portal = new Portal(portalParams);

      //load Portal Class
      portal.load().then(function() {
        var groupParameters = {
          query: "id:" + id //group Name
        };

        portal.queryGroups(groupParameters).then(function(groupResults){
          //generate portal div for cards
          var groupName = groupResults.results[0].id;
          console.log(groupResults.results);
          //console.log(groupResults)
          var pills = `
                      <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-${groupName}" role="tab" aria-controls="pills-profile" aria-selected="false">${groupResults.results[0].title}</a>
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
              //console.log(title, groupName);

              //generate page cards
              var card = `
                  <div class="card " style="width: 18rem;">
                    <img class="card-img-top" src="${thumbnail}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${snippet}</p>
                      <a href="${url}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Link</a>
                    </div>
                  </div>
                `;

               $('#'+groupName).append(card);

            });
          });
        });

      });

    });
};


$.getJSON( "gallerylist.json", function(json) {
  //console.log(json);
  //console.log(window.location.hostname);
  // serverDetect(window.location.hostname);
  // portal = "https://"+server+".water.internal/portal/"
  json.group.forEach(function(y){
    //console.log(y.id);
    populatePortal(y.id, json.portalUrl);

  });
});
