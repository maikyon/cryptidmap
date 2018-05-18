mapboxgl.accessToken = 'pk.eyJ1IjoibWFpa3lvbiIsImEiOiJjajd0ZTRvdXkxcHZ3MnFucWZkbHl2Yjg0In0.rFN-CVzkHbDDXXj05MRJ6Q';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/maikyon/cjfbbudlq0yq12sph65j0vao5',
  center: [-93.770,40.962],
  minZoom: 3.5,
  maxZoom: 7.5
});
map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['monsters']
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});

$('.exploreMap').on('click', function() {
	$('.welcome-banner').fadeOut('fast');
});

$('#allCryptids').on('click', function() {
	$('.card').show();
})

$('#forest').on('click', function() {
	$('.forest').show();
	$('.aquatic').hide();
	$('.city').hide();
})

$('#aquatic').on('click', function() {
	$('.aquatic').show();
	$('.forest').hide();
	$('.city').hide();
})

$('#city').on('click', function() {
	$('.city').show();
	$('.forest').hide();
	$('.aquatic').hide();
})

$('.openform').on('click', function(){
	$('.submit').css({
		'opacity': 1,
		'visibility': 'visible'
	});
	console.log('click');
});

$('.close').on('click', function(){
	$('.submit').css({
		'opacity':0,
		'visibility': 'hidden'
	});
	console.log('click');
});

var updateViewCounts = function(data){
	for (var cryptid in data) {
		var id = cryptid+'-count';
		var count = data[cryptid];
		$('#'+id).text(count);
	}
}

$('.eye').on('click', function(event){
	event.preventDefault();
	var cryptid = $(event.currentTarget).attr('data-cryptid');
	$.get('http://cryptids.us-west-2.elasticbeanstalk.com/cryptid_record_sighting.php?cryptid='+cryptid);
	var id = cryptid+'-count';
	var count = parseInt($('#'+id).text()) + 1;		
	$('#'+id).text(count);			
})

$.get('http://cryptids.us-west-2.elasticbeanstalk.com/cryptid_sightings_counts.php',[],updateViewCounts);






