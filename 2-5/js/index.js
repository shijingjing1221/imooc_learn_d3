var width = 500,
    height = 250,
    margin = {left: 50, top: 30, right: 20, bottom: 20},
    g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom;
//svg
d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)


var g = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var data = [1, 3, 5, 7, 8, 4, 3, 7];

var scale_x = d3.scale.linear()
    .domain([0, data.length - 1])
    .range([0, g_width])

var scale_y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([g_height, 0]);


var line_generator = d3.svg.line()
    .x(function(d, i) {
        return scale_x(i);
    })
    .y(function(d) {
        return scale_y(d);
    })
    .interpolate("cardinal");


d3.select('g')
    .append('path')
    .attr('d', line_generator(data));


// x
var x_axis = d3.svg.axis().scale(scale_x);
var y_axis = d3.svg.axis().scale(scale_y).orient("left");

g.append('g')
    .call(x_axis)
    .attr('transform', 'translate(0,' + g_height + ')');

// y

g.append('g')
    .call(y_axis)
    .append('text')
    .text('Price($)')
    .attr('transform', 'rotate(-90)')
    .attr('class', 'y-title')
    .attr('text-anchor', 'end')
    .attr('dy', '2em');