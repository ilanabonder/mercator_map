
// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
let w = 1.5*window.innerHeight;
let h = 1000;


var projection = d3
  .geoMercator()
  // .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
  // .scale([w / (7 * Math.PI)]) // scale to fit group width
  // .translate([w /2 , h / 1.5]) // ensure centred in group
  .center([0, 5]) // set centre to further North as we are cropping more off bottom of map
  .scale(h/7) // scale to fit group width
  .translate([w / 2.1, h / 3.2]) // ensure centred in group
;


// Define map path
var path = d3
  .geoPath()
  .projection(projection)
;


// create an SVG
var svg = d3
  .select("#map-holder")
  .append("svg")
  // set to the same size as the "map-holder" div
  .attr("width", w)
  .attr("height", h)
  .attr("class", "svgClass")

;

let earthLayer = svg.append("g");
let circleLayer = svg.append("g");

// // add a background rectangle
let milesDiameter = 1000;
let geoCircle = d3.geoCircle();
let ourCircle = circleLayer.append("path").attr("class", "thecircle")
    .attr("d", function(){
      return path(geoCircle.center([ 0,0 ]).radius(20)());
    })
    .attr("opacity", 0.8)
    .attr("fill", "red")
;
let label = circleLayer.append("text")
              .text("")
              .attr("x", 0)
              .attr("y", 0)

              ;

// let lineData = [ [0, 0], [0,1], [40, 1], [40, 0]  ];
// let lineObject = {geometry: {coordinates: [lineData], type: "Polygon"}, properties:{}, type: "Feature"  };
// let featureCollection = {type: "FeatureCollection", features: [lineObject]};
//
// console.log(featureCollection);
// let line = circleLayer
//   .datum(featureCollection.features[0])
//   .append("path")
//   .attr("class", "line")
//   .attr("d", path)
//   .attr("fill", "blue")
// ;

svg
  .on("mousemove", function(){
    console.log(projection.invert(d3.mouse(this)));
    ourCircle.attr("d", function(){
      return path(geoCircle.center(projection.invert(d3.mouse(this))).radius( (milesDiameter * (1/69)) * 0.5   )());
    });
    label.attr("x", d3.mouse(this)[0]- 50).attr("y", d3.mouse(this)[1]-20)
    // let x = projection.invert(d3.mouse(this))[0];
    // let y = projection.invert(d3.mouse(this))[1];
    //
    // let lineData = [ [x, y], [x,y+1], [x+((milesDiameter * (1/69)) * 0.5), y+1], [x+((milesDiameter * (1/69)) * 0.5), y]  ];
    // let lineObject = {geometry: {coordinates: [lineData], type: "Polygon"}, properties:{}, type: "Feature"  };
    // let featureCollection = {type: "FeatureCollection", features: [lineObject]};
    // line.datum(featureCollection.features[0]).attr("d", path);


  })

// get map data
d3.json(
  "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
  function(json) {

    // draw a path for each feature/country
    countries = earthLayer
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
    ;




    // Add a label group to each feature/country. This will contain the country name and a background rectangle
}
);
