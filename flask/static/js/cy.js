$(function(){
  $.get('/graph', function(result) {
    var style = [
            {
              selector: 'node:selected',
              css: {
                "border-width": "6px",
                "border-color": "#AAD8FF",
                "border-opacity": "0.5",
                "background-color": "#77828C",
                "text-outline-color": "#77828C"
              }
            },

            { selector: 'node',
              css: {
                "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                "font-size": "12px",
                "text-valign": "center",
                "text-halign": "center",
                "text-outline-color": "#555",
                "text-outline-width": "2px",
                "color": "#fff",
                "overlay-padding": "6px",
                "z-index": "10",
                'content': 'data(fullname)'
              }
            },

            { selector: 'node[status="human"]',
              css: {
                'background-color': '#00cc99',
              }
            },

            { selector: 'node[status="asgardian"]',
              css: {
                'background-color': '#6666ff'
              }
            },

            { selector: 'edge',
              css: {
                'content': 'data(relationship)',
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle'
              }
            }
    ];

    var cy1 = cytoscape({
      container: document.getElementById('all'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements1
    });

    var cy2 = cytoscape({
      container: document.getElementById('human'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements2
    });

    var cy3 = cytoscape({
      container: document.getElementById('asg'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements3
    });

    var cy4 = cytoscape({
      container: document.getElementById('friend'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements4
    });

    var cy5 = cytoscape({
      container: document.getElementById('enemy'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements5
    });

    var cy6 = cytoscape({
      container: document.getElementById('love'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements6
    });

    var cy7 = cytoscape({
      container: document.getElementById('family'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements7
    });

    var cy8 = cytoscape({
      container: document.getElementById('work'),
      style: style,
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      elements: result.elements8
    });

    cy1.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy1.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy2.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy2.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy3.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy3.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy4.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy4.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy5.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy5.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy6.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy6.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy7.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy7.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });

    cy8.on('tap', 'node', function(evt){
        var data=evt.target.data();
        document.getElementById('details').innerHTML='人物id：'+data.id+'<br>人物名字：'+data.fullname+'<br>人物人种：'+data.status;
    });
    cy8.on('tap', 'edge', function(evt){
        var data=evt.target.data();
        console.log(data);
        document.getElementById('details').innerHTML='关系起点：'+data.start+'<br>关系终点：'+data.end+'<br>关系类型：'+data.relationship;
    });
  }, 'json');
});