var search = instantsearch({ 
  appId: 'LQRMIZ8UAJ', 
  apiKey: 'ac416d402891ab8ab170605d7dbed6be', 
  indexName: 'dev_PRODUCTS', 
  urlSync: {} 
});

search.addWidget( instantsearch.widgets.searchBox({ container: '#q' }) );


var hitTemplate = 
  '<div class="hit media">' + 
     '<div class="media-left">' + 
       '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' + 
       '</div>' + 
       '<div class="media-body">' + 
       '<h4 class="media-heading">{{{_highlightResult.name.value}}} {{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</h4>' + 
       '<p class="year">{{brand}}</p><p class="year">{{#brand}}<span class="badge">{{.}}</span> {{/brand}}</p>' + 
       '<p class="year">{{price}}</p><p class="year">{{#price}}<span class="badge">{{.}}</span> {{/price}}</p>' + 
       '</div>' + 
       '</div>'; 
       
       
       var noResultsTemplate = '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';


search.addWidget( instantsearch.widgets.hits({ 
  container: '#hits', 
  hitsPerPage: 10, 
  templates: { 
     empty: noResultsTemplate
     , item: hitTemplate 
     }, 
     transformData: function(hit) { 
       hit.stars = []; 
       for (var i = 1; i <= 5; ++i) { 
         hit.stars.push(i <= hit.rating); 
	 } return hit; } }) );

search.addWidget( instantsearch.widgets.pagination({ container: '#pagination', cssClasses: { root: 'pagination', active: 'active' } }) );


search.addWidget( instantsearch.widgets.refinementList({ container: '#brand', attributeName: 'brand', operator: 'and', limit: 10, cssClasses: { list: 'nav nav-list', count: 'badge pull-right', active: 'active' } }) );

search.addWidget( instantsearch.widgets.refinementList({ container: '#pricerange', attributeName: 'price_range', operator: 'and', limit: 10, cssClasses: { list: 'nav nav-list', count: 'badge pull-right', active: 'active' } }) );

search.addWidget( instantsearch.widgets.starRating({ container: '#ratings', attributeName: 'rating', cssClasses: { list: 'nav', count: 'badge pull-right' } }) );

search.addWidget( instantsearch.widgets.stats({ container: '#stats' }) );

search.start();
