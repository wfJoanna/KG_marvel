# coding=utf-8
from flask import Flask, jsonify, render_template
from py2neo import Graph

app = Flask(__name__)
graph = Graph("http://localhost:7474", username="neo4j", password='123456')


def buildNodes(nodeRecord):
    data = {}
    data.update(nodeRecord['n'])
    return {"data": data}


def buildEdges(relationRecord):
    data = {"source": str(relationRecord['r'].start_node['id']),
            "target": str(relationRecord['r'].end_node['id']),
            "relationship": str(relationRecord['r']['relation'])}
    return {"data": data}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/graph')
def get_graph():
    nodes = list(map(buildNodes, graph.run('match (n:people) where n.status="human" return n').data()))
    edges = list(map(buildEdges, graph.run(
        'MATCH (n1:people)-[r]->(n2:people) where n1.status="human" AND n2.status="human" RETURN r').data()))

    return jsonify(elements={"nodes": nodes, "edges": edges})


if __name__ == '__main__':
    app.run()
