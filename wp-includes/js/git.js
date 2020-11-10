jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/orgs/'+username+'/repos?callback=?',callback);
};

jQuery.fn.loadRepositories = function(username) {
   this.html("<div class='query-class'><span>Querying GitHub for " + username +"'s repositories...</span></div>");

   var target = this;
   $.githubUser(username, function(data) {
      var meta = data.meta;
      var repos = data.data; // JSON Parsing

      target.empty();
      if(meta.status == 200){
         sortByName(repos);
         var chunkedRepos = chunk(repos, 3);
         $(chunkedRepos).each(function() {
            var row = $('<div class="row-eq-height">');
            $.each(this, function() {
               var repo = this;
               var column = $('<div class="col-md-4 col-sm-6">');
               var panel = $('<div class="panel clickable">');
               var heading = $('<div class="panel-heading">');
               column.append(panel);
               panel.append(heading);
                  heading.append($('<div class="panel-image">')
                  .append($('<img src="wp-content/repo-box.svg"/>')));
                  heading.append($('<div class="panel-title">')
                  .append($('<a class="no-style" href="'+this.html_url+'" target="_blank">')
                  .append($('<h3 class="panel-title-name">')
                  .append(this.name))));
               panel.append($('<div class="panel-body">').append(this.description));

               $(panel).click(function(e){
                  e.preventDefault();
                  window.open(repo.html_url);
               });

               row.append(column);
            });
            target.append(row);
         });
      } else {
         target.append($('<div class="alert alert-danger alert-box">')
            .append($('<p class="alert-text">')
            .append('Unable to retrieve repositories. <b>Please click ')
            .append($('<a href="http://github.com/imsdev">')
            .append('here.</b>'))));
      }
   });

   function sortByName(repos) {
      repos.sort(function(a,b) {
         return a.name - b.name;
      });
   }

   function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
         newArr.push(arr.slice(i, i+size));
      }
      return newArr;
   }
};
