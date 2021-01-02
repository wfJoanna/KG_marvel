# KG_marvel
基于neo4j的漫威人物知识图谱



## TODO：

1. 样式
2. 搜索功能



## 效果演示：

目前还未部署到网上



## 涉及技术：

- html、css、js
- python
- flask
- py2neo、cytoscape.js
- neo4j、CQL



## 描述：

数据采用的是别人整理好的漫威人物关系数据，据观察应该是复联四之前的数据

参考CSDN博客：[Python + Neo4j（安装）可视化分析漫威十年人物关系图谱](https://blog.csdn.net/liangllhahaha/article/details/89787649?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param)

参考CSDN博客：[用cytoscape.js展示neo4j网络关系图](https://blog.csdn.net/zhongzhu2002/article/details/45843283)

基于neo4j图数据库，用flask框架搭建的一个web页面

知识图谱运行步骤：

1. 把三个csv放到neo4j根目录的import文件夹中
2. 在neo4j中用CQL导入csv：
   1. 加载"names_message.csv"文件：
      `LOAD CSV  WITH HEADERS FROM 'file:///names_message.csv' AS data MERGE (:people{name:data.name, id:data.id});`
   2. 加载"relation_message.csv"文件：
      `LOAD CSV  WITH HEADERS FROM "file:///relation_message.csv" AS relations
      MATCH (entity1:people{name:relations.subject}) , (entity2:people{name:relations.object})
      MERGE (entity1)-[:rel{relation: relations.relation}]->(entity2)`
   3. 加载"message.csv"文件：
      `LOAD CSV  WITH HEADERS FROM "file:///message.csv" AS m
      MATCH (entity:people{name:m.aname})
      SET entity.fullname=m.bname;
      LOAD CSV  WITH HEADERS FROM "file:///message.csv" AS m
      MATCH (entity:people{name:m.aname})
      SET entity.status=m.status`
3. 在pycharm中运行app.py（有些时候加载有问题，就删删浏览器缓存，重启pycharm，重新运行等等）（注意neo4j要一直保持打开的状态）

[源数据部分](csv/)

[flask部分](flask/)

节点属性：name，id，fullname，status

关系属性：relation



## 开发信息：

- 第一段开发时间：2021.1.2
- 遇到的苦难：
  - pycharm和chrome有毛病，很多加载不出来的时候，重启pycharm、删浏览器缓存就好了。尤其是pycharm，浪费了我很多时间
  - 有些时候加载不出来，我还以为是我写错了，结果检查半天，重启一下，结果又成功加载出来了。所以这个真的不能急，要等他加载一会儿，不能因为他没显示出来就以为自己写错了
  - 怎么才能让用户点击不同按钮、下方显示不同的图呢？也就是说执行不同的python语句对neo4j进行读取呢？起初我是这么想的，结果我一查，看不懂他们说的用flask获取表单啥的。所以我就用了一个比较暴力的办法，就是一开始就把所有button的结果都准备好，然后点击一个button才显示一个，其他都隐藏起来。后来一想，其实我这才是最佳办法吧，不然的话每点一次button就要等他搜索获取一会儿，那也太慢了吧
  - 我的那段关于button的js代码，不知道为啥用外部引用的办法没法运行，非要放到html中才能有效，害我检查了半天代码结果又没写错
  - 他那个给的源数据有问题来着，重复的有好多，我到中期才发现，难怪不管怎么看都是一大坨乱七八糟的。我导入时改成MERGE后，看起来清晰多了，因为少了很多重复的线条