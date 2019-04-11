var w=800;
var h=400;
var xPadding=10;
var yPadding=50;
            
//Data for drop-down
var drop_down=[{key: 1, value: "Unpaid Work Performed by Women (Minutes per Day)"},
                            {key: 2, value: "Unpaid Work Performed by Men (Minutes per Day)"},
                            {key: 3, value: "Difference in Unpaid Work Performed by Women and Men (Minutes per Day)"},
                            {key: 4, value: "% of Unpaid Work Performed by Women"},
                            {key: 5, value: "% of Parliamentarians That are Women"}];
            
                      
            //Format values to x.x%
            var formatPercent=d3.format(".1%");
            
            //Use Equirectangular projection and center in svg
            var projection=d3.geoEquirectangular()
                             //.translate([w/2,h/2])
                             .scale(175);
                             
            //Center of world map
            var center=projection([-100,0]);
                                            
            //Color scales                      
            var colorScale=d3.scaleQuantile()
                       .range(d3.schemeBlues[9]);         
            
            //Load data
            d3.csv("data/Women Legislators.csv").then(function(women) {
                var women_domain=[];
                var men_domain=[];
                var diff_domain=[];
                var percent_domain=[];
                var percent_female=[];
                for (var i=0;i<women.length;i++) {
                    women_domain.push(parseFloat(women[i].Women));
                    men_domain.push(parseFloat(women[i].Men));
                    diff_domain.push(parseFloat(women[i].Diff));
                    percent_domain.push(parseFloat(women[i].PercentWomen));
                    percent_female.push(parseFloat(women[i].FemaleParlimentarians));
                };
                
                //Set initial domain for women variable
                colorScale.domain(women_domain);          

                //Load world map GeoJSON file 
                d3.json("data/ne_50m_admin_0_countries.geojson").then(function(world) {
                    //Loop through csv to attach data to GeoJSON
                    for (var i=0;i<women.length;i++) {
                        //ISO Country code
                        var CountryCode=women[i].CountryCode;
                        
                        //Data values to append
                        var Men=parseFloat(women[i].Men);
                        var Women=parseFloat(women[i].Women);
                        var Diff=parseFloat(women[i].Diff);
                        var Percent=parseFloat(women[i].PercentWomen);
                        var Legislators=parseFloat(women[i].FemaleParlimentarians);
                        
                        for (var j=0;j<world.features.length;j++) {
                            var ISO_A3=world.features[j].properties.ADM0_A3;
                                                        
                            if (ISO_A3==CountryCode) {
                                world.features[j].properties.Men=Men;
                                world.features[j].properties.Women=Women;
                                world.features[j].properties.Diff=Diff;
                                world.features[j].properties.PercentWomen=Percent;
                                world.features[j].properties.Legislators=Legislators;
                                break;
                            }
                        }
                        
                    }
                    
                    //Define dragging behavior
                    var zooming=function(d) {
                        //console.log("Before: "+d3.event.transform);
                        //Define new offset position
                        var offset=[d3.event.transform.x, d3.event.transform.y];
                        
                        //New scale
                        var newScale = d3.event.transform.k * 2000;

                        //Update offset
                        projection.translate(offset)
                                  .scale(newScale);
                        //Update map
                        map.selectAll("path")
                           .attr("d",path);
                        //console.log("After: "+d3.event.transform);
                    };

                    //Define drag
                    var zoom=d3.zoom()
                                 .on("zoom", zooming);
                                 
                    //Create drop-down menu
                    var menu=d3.select("#map")
                               .append("select")
                               .attr("id","map_control")
                               .on("change",function() {updateData();});

                    menu.selectAll("option")
                        .data(drop_down)
                        .enter()
                        .append("option")
                        .text(function(d) {return d.value;});

                    //Create svg for map
                    var svg1=d3.select("#viz1")
                      .append("svg")
                      .attr("width",w)
                      .attr("height",h)
                      .attr("class","map");
                    
                    //Create group for map in the DOM
                    var map=svg1.append("g")
                       .attr("class","world_map")
                       .call(zoom);
							//.translate(-center[0], -center[1]));
                       
                    //Add invisible rectangle that covers entire SVG to catch all drag/zoom events
                    map.append("rect")
                       .attr("x",0)
                       .attr("y",0)
                       .attr("width",w)
                       .attr("height",h)
                       .attr("opacity",0);
                       
                    //Draw path using projection
                    var path=d3.geoPath(projection);
                        
                    //Draw map
                    map.selectAll("path")
                        .data(world.features)
                        .enter()
                        .append("path")
                        .attr("d",path)
                        .style("stroke","#585858")
                        .style("fill",
                            function(d) {
                                var display_value=d.properties.Women;
                                if(display_value) {return colorScale(display_value);
                                } else {return "#ccc";}
                                
                            })
                        .append("title")
                        .text(function(d) {
                            var display_value=d.properties.Women;
                            return d.properties.ADMIN+" "+display_value;});
                    
                    //Set initial zoom and translate
                    map.call(zoom.transform, 
                                    d3.zoomIdentity.translate(w/2, h/2)
                                                   .scale(0.08)
                                                   .translate(-center[0],-center[1]));
                                                   
                    //Reset map to original zoom
                    //Create button
                    var reset=svg1.append("g")
                                    .attr("class","reset")
                                    .style("cursor","pointer");
                    
                    //Draw reset zoom button
                    reset.append("rect")
                       .attr("x",90)
                       .attr("y",h-yPadding)
                       .attr("width",100)
                       .attr("height",yPadding/2)
                       .style("fill","white")
                       .style("stroke","black")
                    //Text for button   
                    reset.append("text")
                           .attr("x",100)
                           .attr("y",h-3*yPadding/4)
                           .text("Reset Zoom")
                           .attr("text-anchor","start")
                           .attr("dominant-baseline","central");
                    //Click action (reset value)
                    d3.selectAll(".reset")
                      .on("click", function() {
                            map.call(zoom.transform, 
                                    d3.zoomIdentity.translate(w/2, h/2)
                                                   .scale(0.08)
                                                   .translate(-center[0],-center[1]));
                       });
                    
                    //Zoom buttons
                    var zoomIn=svg1.append("g")
                                   .attr("class","zoom")
                                   .attr("id","in")
                                   .style("cursor","pointer");
                                   
                    zoomIn.append("rect")
                           .attr("x",10)
                           .attr("y",h-yPadding)
                           .attr("width",30)
                           .attr("height",yPadding/2)
                           .style("fill","white")
                           .style("stroke","black");
                    
                    zoomIn.append("text")
                           .attr("x",25)
                           .attr("y",h-3*yPadding/4)
                           .text("+")
                           .attr("text-anchor","middle")
                           .attr("dominant-baseline","central");
                           
                    var zoomOut=svg1.append("g")
                                   .attr("class","zoom")
                                   .attr("id","out")
                                   .style("cursor","pointer");
                                   
                    zoomOut.append("rect")
                           .attr("x",50)
                           .attr("y",h-yPadding)
                           .attr("width",30)
                           .attr("height",yPadding/2)
                           .style("fill","white")
                           .style("stroke","black");
                    
                    zoomOut.append("text")
                           .attr("x",65)
                           .attr("y",h-3*yPadding/4)
                           .text("-")
                           .attr("text-anchor","middle")
                           .attr("dominant-baseline","central");

                    var fixedZoom=function() {
                        var scaleFactor;
                        var type=d3.select(this).attr("id");
                        if (type=="in") {
                            scaleFactor=1.5;
                        } else {scaleFactor=0.75;}
                        
                        map.call(zoom.scaleBy,scaleFactor);
                    };
                    
                    //Assign action to zoom buttons
                    d3.selectAll(".zoom")
                      .on("click",fixedZoom);

                    //Draw legend
                    var legend=svg1.append("g")
                                   .attr("class","legend");
                                       
                    legend.selectAll("rect")
                          .data(colorScale.range())
                          .enter()
                          .append("rect")
                          .attr("x",function(d,i) {return i*(w-xPadding)/colorScale.range().length+xPadding;})
                          .attr("y",yPadding/4)
                          .attr("width",yPadding/2)
                          .attr("height",yPadding/2)
                          .style("stroke","#585858")
                          .style("fill",function(d) {return d;});
                            
                    var max=d3.max(colorScale.domain());
                    breaks=colorScale.quantiles().concat(max);
                    legend.selectAll("text")
                          .data(breaks)
                          .enter()
                          .append("text")
                          .attr("x",function(d,i) {return yPadding/2+5+xPadding+i*(w-xPadding)/colorScale.range().length;})
                          .attr("y",yPadding/2)
                          .attr("text-anchor","start")
                          .attr("dominant-baseline","central")
                          .text(function(d) {return "≤"+Math.round(d,0);});
                    
                    var updateData=function(d) {
                        var selected=d3.select("select#map_control").property("value");
             
                        //Add/update colors and tooltips
                        map.selectAll("path")
                           .style("fill",
                            function(d) {
                                switch(selected) {
                                    case "Unpaid Work Performed by Men (Minutes per Day)":
                                        colorScale.domain(men_domain);
                                        display_value=d.properties.Men;
                                        break;
                                    case "Unpaid Work Performed by Women (Minutes per Day)":
                                        colorScale.domain(women_domain);
                                        display_value=d.properties.Women;
                                        break;
                                    case "Difference in Unpaid Work Performed by Women and Men (Minutes per Day)":
                                        colorScale.domain(diff_domain);
                                        display_value=d.properties.Diff;
                                        break;
                                    case "% of Unpaid Work Performed by Women":
                                        colorScale.domain(percent_domain);
                                        display_value=d.properties.PercentWomen;
                                        break;
                                    case "% of Parliamentarians That are Women":
                                        colorScale.domain(percent_female);
                                        display_value=d.properties.Legislators;
                                        break;
                                    default: break;
                                };
                                
                                if(display_value) {return colorScale(display_value);
                                } else {return "#ccc";}
                                
                            })
                           .selectAll("title")
                           .text(function(d) {
                                    switch(selected) {
                                    case "Unpaid Work Performed by Men (Minutes per Day)":
                                        display_value=d.properties.Men;
                                        break;
                                    case "Unpaid Work Performed by Women (Minutes per Day)":
                                        display_value=d.properties.Women;
                                        break;
                                    case "Difference in Unpaid Work Performed by Women and Men (Minutes per Day)":
                                        display_value=d.properties.Diff;
                                        break;
                                    case "% of Unpaid Work Performed by Women":
                                        if (typeof d.properties.PercentWomen=='undefined') {
                                            display_value='Undefined';
                                        } else {
                                            display_value=formatPercent(d.properties.PercentWomen);
                                        }
                                        break;
                                    case "% of Parliamentarians That are Women":
                                        if (typeof d.properties.Legislators=='undefined') {
                                            display_value='Undefined';
                                        } else {
                                            display_value=formatPercent(d.properties.Legislators);
                                        }
                                        break;
                                    default: break;
                                };
                                
                                return d.properties.ADMIN+" "+display_value;})
                            
                            //Update legend values
                            var max=d3.max(colorScale.domain());
                            breaks=colorScale.quantiles().concat(max);
                            legend.selectAll("text")
                                  .data(breaks)
                                  .text(function(d) {
                                    if (selected=="% of Unpaid Work Performed by Women" || selected=="% of Parliamentarians That are Women")
                                        {return "≤"+formatPercent(d);} else {return "≤"+Math.round(d,0);}
                                  });
                        };
                });
            });

                