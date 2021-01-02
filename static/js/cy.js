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
      elements: result.elements1
    });

    var cy2 = cytoscape({
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
      elements: result.elements2
    });
  }, 'json');
});