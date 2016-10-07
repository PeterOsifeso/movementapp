
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
   
    var street = $('#street').val();
    var city = $('#city').val();
    var location = street+","+" "+city;
    var address = "http://maps.googleapis.com/maps/api/streetview?size=900x600&location="+location;
    
    $('body').append('<img class="bgimg" src="'+address+'">');
    $greeting.text("So you want to live at "+location+"?");
    
    
    
    //NYTIMES GETJSON
    var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+city+'&sort=newest&api-key=e577b0fa8bf842618e70d6c23710fe00';
    
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "e577b0fa8bf842618e70d6c23710fe00"
    });
    

    $.getJSON(nytimesURL, function(data){        
        $nytHeaderElem.text('New York Times Articles About ' + city);
        
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href=" '+ article.web_url +' ">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>' +'</li>');
        };
    }).error(function() {
            $nytHeaderElem.text('New York Times Articles About ' + city+ ' could not be loaded')
            });
    
    
    //WIKIPEDIA JSONP
    
    
    var wikipediaurl='http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json';
    
    $.ajax(wikipediaurl,{
        dataType: 'jsonp',
    }).done(function(response){
        
        $('wikipedia-container').append("<h3 id=wikipedia-header>Relevant Wikipedia Links</h3>");

        var headerList=response[1];
        var urlList=response[3];
        
            for(var i=0;i<response.length;i++){
                //console.log(i+": "+response[i]);
                wikiLinkURL=urlList[i];
                wikiLinkHead=headerList[i];
                $wikiElem.append("<li><a href='"+wikiLinkURL+"'>"+wikiLinkHead+"</a></li>");
            }
    });
    
    return false;
};

$('#form-container').submit(loadData);