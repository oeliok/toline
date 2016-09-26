时间：2016年 09月 26日 星期一 14:07:12 CST

# 项目技术方案: 虚拟时空

## 系统架构

采用经典的B/S结构。
*  B/S结构（Browser/Server，浏览器/服务器模式），是WEB兴起后的一种网络结构模式，WEB浏览器是客户端最主要的应用软件。这种模式统一了客户端，将系统功能实现的核心部分集中到服务器上，简化了系统的开发、维护和使用。客户机上只要安装一个浏览器，如Netscape Navigator或Internet Explorer，服务器安装SQL Server、Oracle、MYSQL等数据库。浏览器通过Web Server 同数据库进行数据交互。
* 采用这个架构的最重要的原因是我们的客户端开发技术是用HTML、CSS、JavaScript编写，并由打包工具打包成APP，一次编写同时使其能够运行在PC和移动端以及桌面和移动端

## 数据库

采用  <a href="https://www.mongodb.com/">Mongodb</a> 

- MongoDB  是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。最主要的是该数据库比较方便使用，与javascript的契合度非常的好，里面的数据操作用的js。



## 后端框架

NodeJs+Socket.IO+Express+Mongodb
谈到Web实时推送，就不得不说WebSocket。在WebSocket出现之前，很多网站为了实现实时推送技术，通常采用的方案是轮询(Polling)和Comet技术，Comet又可细分为两种实现方式，一种是长轮询机制，一种称为流技术，这两种方式实际上是对轮询技术的改进，这些方案带来很明显的缺点，需要由浏览器对服务器发出HTTP request，大量消耗服务器带宽和资源。面对这种状况，HTML5定义了WebSocket协议，能更好的节省服务器资源和带宽并实现真正意义上的实时推送。

WebSocket协议本质上是一个基于TCP的协议，它由通信协议和编程API组成，WebSocket能够在浏览器和服务器之间建立双向连接，以基于事件的方式，赋予浏览器实时通信能力。既然是双向通信，就意味着服务器端和客户端可以同时发送并响应请求，而不再像HTTP的请求和响应。

为了建立一个WebSocket连接，客户端浏览器首先要向服务器发起一个HTTP请求，这个请求和通常的HTTP请求不同，包含了一些附加头信息，其中附加头信息”Upgrade: WebSocket”表明这是一个申请协议升级的HTTP请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的WebSocket连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

NodeJs采用异步的方式能够以尽可能少的资源解决大量并发，使用socket.io可以支持长连接以支持客户端的长时间在线，Express可以加速后端的开发，使用mysql保存用户的一些重要的数据，使用mongodb保存聊天记录，使用redis解决用户的在线数据，用户登录等问题。




## 前端框架
- bootstrap v3 [http://bootcss.com][1]
    - 最成熟和最广泛使用的Html/css框架，支持IE8+，提供各类常见布局和组件
    - 社区支持良好，尤其适合快速界面开发和后台界面开发
    - 对于学习前端知识，可提供一个不错的结构性认识

-    jquery 2.1
    - 最广泛使用的javascript基础库
    - 应有尽有插件支持
    - 比较熟悉，易上手。

在项目初期阶段可以考虑使用主流开源库，降低开发难度，随着技术的进一步提高在项目中期左右考虑用react进行重构。
     


----------


* webpack - 代码打包
    * 模块来源广泛，支持包括npm/bower等等的各种主流模块安装／依赖解决方案
    * 插件机制完善，实现本身实现同样模块化，容易扩展
    * 浏览器端足迹小，移动端友好
    * 模块规范支持全面
* react - 页面渲染
    *   首次加载页面的速度快
    *   服务器端和客户端可以共享某些代码，避免重复定义。这样可以使结构更清晰，增加可维护性
* redux - 数据存储
* react-router - 路由库
* immutable - 数据处理
    * Immutable 降低了 Mutable 带来的复杂度 
    * 节省内存
    * 并发安全
* moment - 时间格式化
* react-motion - 动画
* pure-render-mixin - 性能优化

虽然从当前的前端发展方向来看，上述技术均有些落后，但对于普通的WEB开发，这些技术已经足够。
开发环境

    客户端 ubuntu 16.04 或 mac os
    sublime text 3及各类插件
    最新chrome dev 版本
    git
    rvm + bundle : rails的开发环境推荐组合

    此处的描述将做为各位同学的桌面环境的安装清单，并将做实地检查

## 部署环境

    OS：Centos7
    NodeJs：6.6.6
    Mongodb:3.26
    带宽：1M
    CPU：1核
        
## 参考链接
<a href="https://nodejs.org/en/">NodeJs</a>
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

<a href="http://reactjs.cn/react/docs/getting-started.html">Reactjs</a>
A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES

<a href="http://noeticforce.com/best-nodejs-frameworks-for-web-and-app-development">Node.js Frameworks: The 10 Best for Web and Apps Development</a>
中文<a href="http://www.oschina.net/translate/best-nodejs-frameworks-for-web-and-app-development?cmp">翻译</a>

<a href="http://expressjs.com/">Express</a>
Fast, unopinionated, minimalist web framework for Node.js.<a href="https://github.com/expressjs/express">GitHub</a>

<a href="https://github.com/socketio/socket.io/">SOCKET.IO</a>
Realtime application framework (Node.JS server)

<a href="https://github.com/rickyrauch/Balloons.IO">Balloons.IO</a>
The Balloons.IO is a web multi-room chat server and client ready to use. It’s built with the help of node.JS, Express, Socket.IO and Redis. Balloons uses PassportJS for authentication with Twitter and Facebook is a web multi-room chat server and client ready to use. It’s built with the help of node.JS, Express, Socket.IO and Redis. Balloons uses PassportJS for authentication with Twitter and Facebook.

<a href="https://github.com/wayou/hichat">HiChat</a>
A chat application built with Node.js and Websocket

<a href="https://www.aswifter.com/2015/06/13/nodejs-chat-server/">使用Nodejs实现聊天服务器</a>

<a href="http://www.it610.com/article/1731254.htm">通过(Node Js||.Net)基于HTML5的WebSocket实现实时视频文字传输(上)</a>

<a href="http://www.plhwin.com/2014/05/28/nodejs-socketio/">使用Node.js+Socket.IO搭建WebSocket实时应用</a>
