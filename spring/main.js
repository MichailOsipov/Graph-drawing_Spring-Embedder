var height = 800;
var width = 1500;

var drawField = document.getElementById("drawField");
drawField.setAttribute('height', height + "px");
drawField.setAttribute('width', width + "px");

var nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
nodesGroup.setAttribute('id', 'nodes');

var edgesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
edgesGroup.setAttribute('id', 'edges');

drawField.appendChild(edgesGroup);
drawField.appendChild(nodesGroup);

var toDraw = document.getElementById("to-draw");
toDraw.addEventListener('click', displayGraph);

var nodes={};
var edges={};
function getNodesAndEdges(){
	nodes=[];
	edges=[];
	var nodesText = document.getElementById("nodes-input").value.split(';');
	var temp = document.getElementById("nodes-input").value;
	for(var i = 0; i< nodesText.length; i++)
	{
		if ( nodesText[i]!="")
		{
			var currNode = nodesText[i].split("->");
			if(currNode[0].charCodeAt(0)==10)
				currNode[0] = currNode[0].substr(1);
			nodes[currNode[0]] = {name: currNode[0]};
			if(currNode[1])
			{
				if(currNode[1].charCodeAt(0)==10)
				currNode[1] = currNode[1].substr(1);
			
				nodes[currNode[1]] = {name: currNode[1]};
				if(!edges[currNode[0]])
					edges[currNode[0]]=[];
				edges[currNode[0]].push(currNode[1]);
			}
		}
	}
}
function randomizeNodeCoordinates(){
	for(var key in nodes){
		nodes[key].x =Math.floor(Math.random() * (width - 0 + 1)) + 0;
		nodes[key].y =Math.floor(Math.random() * (height - 0 + 1)) + 0;
	}
}
function drawGraph(){
	for(var key in  nodes){
		var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle.setAttribute('cx', nodes[key].x);
		circle.setAttribute('cy', nodes[key].y);
		circle.setAttribute('r', 15);
		circle.setAttribute('stroke', "black");
		circle.setAttribute('stroke-width', 2);
		circle.setAttribute('fill', "white");		
		nodesGroup.appendChild(circle);
		
		var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttribute('x', nodes[key].x-2);
		text.setAttribute('y', nodes[key].y+2);
		text.setAttribute('fill', "black");
		text.innerHTML= key;
		nodesGroup.appendChild(text);
	}
	
	for(var key in edges){
		
		for(var j=0;j<edges[key].length;j++){
			var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			line.setAttribute('x1', nodes[key].x);
			line.setAttribute('y1', nodes[key].y);
			line.setAttribute('x2', nodes[edges[key][j]].x);
			line.setAttribute('y2', nodes[edges[key][j]].y);
			line.setAttribute('stroke', "black");
			line.setAttribute('stroke-width', 2);
			edgesGroup.appendChild(line);
		}
	}
}
function displayGraph(event){
	getNodesAndEdges();
	randomizeNodeCoordinates();
	drawGraph();
}