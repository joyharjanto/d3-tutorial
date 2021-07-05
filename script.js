<style>
.x-axis path,
.x-axis line,
.y-axis path,
.y-axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}

.x-axis text, .y-axis text {
    font-family: sans-serif;
    font-size: 11px;
}
</style>
<a href="#" id="rearranger">Rearrange</a>
<svg></svg>
<script>
var datapoints = [
  { 'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'words': 120000, 'published': 1813 },
  { 'title': 'Cryptonomicon', 'author': 'Neal Stephenson', 'words': 415000, 'published': 1999 },
  { 'title': 'Great Gatsby', 'author': 'F. Scott Fitzgerald', 'words': 47094, 'published': 1925 },
  { 'title': 'Song of Solomon', 'author': 'Toni Morrison', 'words': 92400, 'published': 1977 },
  { 'title': 'White Teeth', 'author': 'Zadie Smith', 'words': 169000, 'published': 2000 }
];

var height = 300, width = 700, margin_top = 50, margin_left = 120, margin_right = 50, margin_bottom = 50;
var svg = d3.select("svg").attr('height', height).attr('width', width);

// Don't set the range, we'll do that later
var x_scale = d3.scale.linear().range([margin_left, width - margin_right]);
var y_scale = d3.scale.ordinal().rangeBands([height - margin_bottom, margin_top], 0.5, 0.2);

var xAxis = d3.svg.axis()
  .scale(x_scale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y_scale)
  .orient("left");

svg.append('g').attr('class','x-axis').attr("transform", "translate(0," + (height - margin_top) + ")");
svg.append('g').attr('class','y-axis').attr("transform", "translate(" + margin_left + ",0)");;

function update(data) {

  // Reset the axes in case data came in or out or was reordered
  var titles = datapoints.map( function(d) { return d['title'] });
  y_scale.domain(titles);
  x_scale.domain([0, 500000]);
  d3.select('.y-axis').call(yAxis);
  d3.select('.x-axis').call(xAxis);

  var rectangles = svg.selectAll('rect')
                      .data(datapoints);

  rectangles.enter()
            .append('rect')
            .attr('y', 0)
            .attr('x', 0)
            .attr('height', y_scale.rangeBand());

  rectangles.transition()
    .attr('y', function(d) {
      return y_scale(d['title']);
    })
    .attr('x', margin_left)
    .attr('height', y_scale.rangeBand())
    .attr('width', function(d) {
      return x_scale(d['words']) - margin_left;
    })

}

update(datapoints);

d3.select("#rearranger").on('click', function() {
  d3.shuffle(datapoints);
  update(datapoints);
});

</script>
