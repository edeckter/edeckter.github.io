//Bar chart
var bw=800;
var h=600;
var xPadding=50;
var yPadding=50;
 
            var svg2=d3.select("#viz2")
                       .append("svg")
                       .attr("width",bw)
                       .attr("height",h)
                       .attr("class","plot");
                        
            d3.csv("data/Women Legislators.csv").then(function(women) {
                //Initial sort
                women.sort(function(a,b) {
                    return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);
                });

                //Create drop-down menu
                var menu2=d3.select("#chart")
                            .append("select")
                            .attr("id","chart_control")
                            .on("change",function() {sortBars();});

                var sortData=["% of Female Legislators","% of Unpaid Work by Women","Country"];
                menu2.selectAll("option")
                     .data(sortData)
                     .enter()
                     .append("option")
                      .text(function(d) {return d;});
                      
                //Create key
                var key=function(d) {return women.Country;};
                
                //Labels for plots
                svg2.append("text")
                    .attr("x",bw/2-10)
                    .attr("y",yPadding/2)
                    .text("% of Unpaid Work Performed by Females")
                    .attr("text-anchor","end")
                    .attr("dominant-baseline","central")
                    .attr("font-weight","bold");
                
                svg2.append("text")
                    .attr("x",bw/2+10)
                    .attr("y",yPadding/2)
                    .text("% of Parliamentarians that are Female")
                    .attr("text-anchor","start")
                    .attr("dominant-baseline","central")
                    .attr("font-weight","bold");
                    
                //Scaling function for categories
                var heightScale=d3.scaleBand()
                             .domain(d3.range(women.length))
                             .rangeRound([h-yPadding,yPadding])
                             .paddingInner(0.05);
                      
                //Scaling function for bars
                var widthScale=d3.scaleLinear()
                                 .domain([0,1])
                                 .range([xPadding,bw/2]);
                
                //Create group for unpaid labor bar chart
                var labor=svg2.append("g")
                              .attr("id","unpaid");
                              
                //Create bars for unpaid work %            
                labor.selectAll("rect")
                   .data(women,key)
                   .enter()
                   .append("rect")
                   .attr("class","bars")
                   .attr("x",function(d) {return bw/2-widthScale(d.PercentWomen);})
                   .attr("y",function(d,i) {return heightScale(i);})
                   .attr("height",heightScale.bandwidth())
                   .attr("width",function(d) {return widthScale(d.PercentWomen);})
                   .style("fill",function(d) {return "rgb("+d.PercentWomen*200+",0,0)";});
                   
                
                //Create labels for unpaid work %              
                labor.selectAll("text")
                   .data(women,key)
                   .enter()
                   .append("text")
                   .attr("class","labels")
                   .attr("x",function(d) {return bw/2-widthScale(d.PercentWomen)+10;})
                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;})
                   .text(function(d) {return formatPercent(d.PercentWomen);})
                   .style("fill","white")
                   .attr("text-anchor","start")
                   .attr("dominant-baseline","central");
                   
                //Create group for unpaid labor bar chart
                var legislators=svg2.append("g")
                              .attr("id","legislators");
                
                //Create bars for female legislators           
                legislators.selectAll("rect")
                   .data(women,key)
                   .enter()
                   .append("rect")
                   .attr("class","bars")
                   .attr("x",bw/2)
                   .attr("y",function(d,i) {return heightScale(i);})
                   .attr("height",heightScale.bandwidth())
                   .attr("width",function(d) {return widthScale(d.FemaleParlimentarians);})
                   .style("fill",function(d) {return "rgb(0,0,"+d.FemaleParlimentarians*200+")";});
                   
                //Create labels for unpaid work %              
                legislators.selectAll("text")
                   .data(women,key)
                   .enter()
                   .append("text")
                   .attr("class","labels")
                   .attr("x",function(d) {return bw/2+widthScale(d.FemaleParlimentarians)-10;})
                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;})
                   .text(function(d) {return formatPercent(d.FemaleParlimentarians);})
                   .style("fill","white")
                   .attr("text-anchor","end")
                   .attr("dominant-baseline","central");
                   
                //Create group for unpaid labor bar chart
                var y_axis=svg2.append("g")
                               .attr("id","y-axis");
                
                //Add y-axis
                y_axis.selectAll("text")
                   .data(women,key)
                   .enter()
                   .append("text")
                   .attr("class","country_labels")
                   .attr("x",bw/2)
                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;})
                   .text(function(d) {return d.Country;})
                   .style("fill","white")
                   .attr("text-anchor","middle")
                   .attr("dominant-baseline","central");
                
                y_axis.append("line")
                    .attr("x1",bw/2)
                    .attr("y1",yPadding)
                    .attr("x2",bw/2)
                    .attr("y2",h-yPadding)
                    .style("stroke","white");
                    
                var sortBars=function() {
                    var sort_order=d3.select("select#chart_control").property("value");
                    
                    if (sort_order=="% of Female Legislators") {
                        labor.selectAll("rect")
                             .sort(function(a,b) {
                                return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i);});
                          
                        labor.selectAll("text")
                             .sort(function(a,b) {
                                return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                             
                        legislators.selectAll("rect")
                                   .sort(function(a,b) {
                                        return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);})
                                    .transition()
                                    .duration(1000)
                                    .attr("y",function(d,i) {return heightScale(i);});
                                    
                        legislators.selectAll("text")
                                   .sort(function(a,b) {
                                        return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);})
                                   .transition()
                                   .duration(1000)
                                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                                   
                        y_axis.selectAll("text")
                              .sort(function(a,b) {
                                        return d3.descending(b.FemaleParlimentarians,a.FemaleParlimentarians);})
                              .transition()
                              .duration(1000)
                              .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                    } else if (sort_order=="% of Unpaid Work by Women") {
                        labor.selectAll("rect")
                             .sort(function(a,b) {
                                return d3.descending(b.PercentWomen,a.PercentWomen);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i);});
                          
                        labor.selectAll("text")
                             .sort(function(a,b) {
                                return d3.descending(b.PercentWomen,a.PercentWomen);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                             
                        legislators.selectAll("rect")
                                   .sort(function(a,b) {
                                        return d3.descending(b.PercentWomen,a.PercentWomen);})
                                    .transition()
                                    .duration(1000)
                                    .attr("y",function(d,i) {return heightScale(i);});
                                    
                        legislators.selectAll("text")
                                   .sort(function(a,b) {
                                        return d3.descending(b.PercentWomen,a.PercentWomen);})
                                   .transition()
                                   .duration(1000)
                                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                                   
                        y_axis.selectAll("text")
                              .sort(function(a,b) {
                                        return d3.descending(b.PercentWomen,a.PercentWomen);})
                              .transition()
                              .duration(1000)
                              .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                    } else if (sort_order=="Country") {
                        labor.selectAll("rect")
                             .sort(function(a,b) {
                                return d3.ascending(b.Country,a.Country);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i);});
                          
                        labor.selectAll("text")
                             .sort(function(a,b) {
                                return d3.ascending(b.Country,a.Country);})
                             .transition()
                             .duration(1000)
                             .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                             
                        legislators.selectAll("rect")
                                   .sort(function(a,b) {
                                        return d3.ascending(b.Country,a.Country);})
                                    .transition()
                                    .duration(1000)
                                    .attr("y",function(d,i) {return heightScale(i);});
                                    
                        legislators.selectAll("text")
                                   .sort(function(a,b) {
                                        return d3.ascending(b.Country,a.Country);})
                                   .transition()
                                   .duration(1000)
                                   .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});
                                   
                        y_axis.selectAll("text")
                              .sort(function(a,b) {
                                        return d3.ascending(b.Country,a.Country);})
                              .transition()
                              .duration(1000)
                              .attr("y",function(d,i) {return heightScale(i)+heightScale.bandwidth()/2;});

                    };
                };
            });