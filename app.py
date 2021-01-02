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
    all_nodes = list(map(buildNodes, graph.run('match (n) return n').data()))
    all_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() RETURN r').data()))

    human_nodes = list(map(buildNodes, graph.run('match (n:people) where n.status="human" return n').data()))
    human_edges = list(map(buildEdges, graph.run(
        'MATCH (n1:people)-[r]->(n2:people) where n1.status="human" AND n2.status="human" RETURN r').data()))

    asg_nodes = list(map(buildNodes, graph.run('match (n:people) where n.status="asgardian" return n').data()))
    asg_edges = list(map(buildEdges, graph.run(
        'MATCH (n1:people)-[r]->(n2:people) where n1.status="asgardian" AND n2.status="asgardian" RETURN r').data()))

    friend_nodes1 = list(map(buildNodes, graph.run('match (n)-[r]->() where r.relation="friend" return n').data()))
    friend_nodes2 = list(map(buildNodes, graph.run('match ()-[r]->(n) where r.relation="friend" return n').data()))
    friend_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() where r.relation="friend" RETURN r').data()))
    friend_nodes = friend_nodes1 + friend_nodes2

    enemy_nodes1 = list(map(buildNodes, graph.run('match (n)-[r]->() where r.relation="enemy" return n').data()))
    enemy_nodes2 = list(map(buildNodes, graph.run('match ()-[r]->(n) where r.relation="enemy" return n').data()))
    enemy_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() where r.relation="enemy" RETURN r').data()))
    enemy_nodes = enemy_nodes1 + enemy_nodes2

    love_nodes1 = list(map(buildNodes, graph.run('match (n)-[r]->() where r.relation="love" return n').data()))
    love_nodes2 = list(map(buildNodes, graph.run('match ()-[r]->(n) where r.relation="love" return n').data()))
    love_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() where r.relation="love" RETURN r').data()))
    love_nodes = love_nodes1 + love_nodes2

    family_nodes1 = list(map(buildNodes, graph.run('match (n)-[r]->() where r.relation="family" return n').data()))
    family_nodes2 = list(map(buildNodes, graph.run('match ()-[r]->(n) where r.relation="family" return n').data()))
    family_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() where r.relation="family" RETURN r').data()))
    family_nodes = family_nodes1 + family_nodes2

    work_nodes1 = list(map(buildNodes, graph.run('match (n)-[r]->() where r.relation="work" return n').data()))
    work_nodes2 = list(map(buildNodes, graph.run('match ()-[r]->(n) where r.relation="work" return n').data()))
    work_edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() where r.relation="work" RETURN r').data()))
    work_nodes = work_nodes1 + work_nodes2

    return jsonify(elements1={"nodes": all_nodes, "edges": all_edges},
                   elements2={"nodes": human_nodes, "edges": human_edges},
                   elements3={"nodes": asg_nodes, "edges": asg_edges},
                   elements4={"nodes": friend_nodes, "edges": friend_edges},
                   elements5={"nodes": enemy_nodes, "edges": enemy_edges},
                   elements6={"nodes": love_nodes, "edges": love_edges},
                   elements7={"nodes": family_nodes, "edges": family_edges},
                   elements8={"nodes": work_nodes, "edges": work_edges})


if __name__ == '__main__':
    app.run()
