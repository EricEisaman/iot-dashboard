var d3 = window.d3;
var NBXDialChart = window.NBXDialChart;

class Dial {
  constructor(max,selector){
    let w = 200,
        h = 200;
    let layout = [ 
        { x: 100, y: 95, r: 90, m: max, ticks: 2, mark: 'circle' }, 
       // { x: 240, y: 150, r: 100, m: 50, ticks: 4, mark: 'line' }, 
       // { x: 460, y: 150, r: 100, m: 80, ticks: 2, mark: 'circle' } 
      ];
    this.max = max;
    this.charts = layout.map(function(d) { 
        return NBXDialChart()
          .width(d.r * 2)
          .height(d.r * 2)
          .domain([0, d.m])
          .range([-150, 150])
          .minorTicks(d.ticks)
          .minorMark(d.mark);
      });
    this.svg = d3.select(selector)
          .append('svg:svg')
          .attr('width', w) 
          .attr('height', h)
          .call(responsivefy);
         
    this.dials = this.svg.selectAll('g.dial')
        .data(layout)
        .enter().append('svg:g')
        .attr('class', 'dial')
        .attr('id', function(d, i) { return 'dial-' + i; })
        .attr('transform', function(d) { return 'translate(' + (d.x - d.r) + ',' + (d.y - d.r) + ')'; } );
    //console.log('this.dials :  ', this.dials[0]['0']['__data__']);
    console.log('this.dials :  ', this.dials[0]['0']);
    d3.select(this.dials[0]['0']).data([0]).call(this.charts[0]);
    //  this.dials.each(function(d, i) { d3.select(this).data([0]).call(this.charts[i]); });
  }
  update(v){
    // this.dials.each(function(d, i) { 
    //   //console.log('updating....');
    //    d3.select(this).data([v]).call(this.charts[i]); 
    // });
    if(v > this.max) v = this.max;
    d3.select(this.dials[0]['0']).data([v]).call(this.charts[0]);
  }
  
}

window.Dial = Dial;
 
// HELPER
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type, 
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        //console.log(targetWidth);
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}


