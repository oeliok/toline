## 项目报告
> 2016年12月22日 18:53

### 系统总体设计

#### 系统的总体架构
> 采用经典的B/S结构。

*  B/S结构（Browser/Server，浏览器/服务器模式），是WEB兴起后的一种网络结构模式，WEB浏览器是客户端最主要的应用软件。这种模式统一了客户端，将系统功能实现的核心部分集中到服务器上，简化了系统的开发、维护和使用。客户机上只要安装一个浏览器，如Netscape Navigator或Internet Explorer，服务器安装SQL Server、Oracle、MYSQL等数据库,浏览器通过Web Server 同数据库进行数据交互。

* 采用这个架构的最重要的原因是我们的客户端开发技术是用HTML、CSS、JavaScript编写，并由打包工具打包成APP，一次编写同时使其能够运行在PC和移动端以及桌面和移动端

* 采用REST风格的API设计模式

* 后端框架
NodeJs+Socket.IO+Express+Mongodb
谈到Web实时推送，就不得不说WebSocket。在WebSocket出现之前，很多网站为了实现实时推送技术，通常采用的方案是轮询(Polling)和Comet技术，Comet又可细分为两种实现方式，一种是长轮询机制，一种称为流技术，这两种方式实际上是对轮询技术的改进，这些方案带来很明显的缺点，需要由浏览器对服务器发出HTTP request，大量消耗服务器带宽和资源。面对这种状况，HTML5定义了WebSocket协议，能更好的节省服务器资源和带宽并实现真正意义上的实时推送。
WebSocket协议本质上是一个基于TCP的协议，它由通信协议和编程API组成，WebSocket能够在浏览器和服务器之间建立双向连接，以基于事件的方式，赋予浏览器实时通信能力。既然是双向通信，就意味着服务器端和客户端可以同时发送并响应请求，而不再像HTTP的请求和响应。
为了建立一个WebSocket连接，客户端浏览器首先要向服务器发起一个HTTP请求，这个请求和通常的HTTP请求不同，包含了一些附加头信息，其中附加头信息”Upgrade: WebSocket”表明这是一个申请协议升级的HTTP请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的WebSocket连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。
NodeJs采用异步的方式能够以尽可能少的资源解决大量并发，使用socket.io可以支持长连接以支持客户端的长时间在线，Express可以加速后端的开发，使用mysql保存用户的一些重要的数据，使用mongodb保存聊天记录，使用redis解决用户的在线数据，用户登录等问题。

* 前端框架
单页Web应用（single page web application，SPA），就是只有一张Web页面的应用。单页应用程序 (SPA) 是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。浏览器一开始会加载必需的HTML、CSS和JavaScript，所有的操作都在这张页面上完成，都由JavaScript来控制。
主要有以下优点
速度：更好的用户体验，让用户在web app感受native app的速度和流畅，
·MVC：经典MVC开发模式，前后端各负其责。
·ajax：重前端，业务逻辑全部在本地操作，数据都需要通过AJAX同步、提交。
·路由：在URL中采用#号来作为当前视图的地址,改变#号后的参数，页面并不会重载。
也有存在着一些缺点
 1不利于SEO。
2初次加载耗时相对增多。
3对开发人员技能水平、开发成本高。

要实现单页面应用，现在已经有很多现成的框架，比如AngularJS、Ember.js、Backbone.js等等。
AngularJS 诞生于 2009 年，当时作为一个大型商业产品的一部分叫做 GetAngular。不久之后，Misko Hevery，GetAngular 项目创建者之一，花了仅仅三周时间，用 GetAngular 重写了一个曾经耗时 6 个月才完成的，有 17K 行代码的页面应用，并将代码削减到 1,000 行左右，于是成功的说服了谷歌开始赞助该项目，并将其开源，也就是我们今天看到 AngularJS 。Angular 的特点是拥有双向数据绑定，依赖注入，易于测试的编码风格，以及通过使用自定义指令可以简单的扩展 HTML。

　　Backbone.js 是一个轻量级的 MVC 框架。诞生于 2010 年，它作为那种笨重全功能的 MVC 框架，比如说 ExtJS， 的一个代替品，迅速流行开来。 很多服务都使用了它，比如 Pinterest, Flixster, AirBNB 等等。

　　Ember 则要回溯到 2007 年，最开始是以 SproutCore MVC 框架展现在世人面前，由 SproutIt 开发，后来是 Apple，再后来到 2011 的时候，jQuery 和 Ruby on Rails 的核心贡献者 Yehuda Katz 参与了进来。有名的 Ember 用户包括了 Yahoo!, Groupon, 和 ZenDesk。
在社区资源等方面，AngularJS则比Ember.js、Backbone.js加起来还要丰富。
最终，我们选择了AngularJS作为前端开发框架。
Angular 的双向数据绑定节省了大量的样板代码。Angular 把构建应用的程序块划分为下面这几种类型：控制器(Controller)，指令(Directive)，工厂(Factory)，过滤器(Filter)，服务(Service)和视图(View)。它们被组织为模块形式，之后可以被另一个引用。每种类型有不同的作用。视图处理 UI，控制器处理 UI 背后的逻辑，服务用来处理和后台的通信，并且将共通的有关联的功能组件结合在一起，而指令通过定义新的元素，属性和行为，很容易的构造可重用的组件，以及HTML扩展。

ui框架则用到了bootstrap、materialize、material design lite等框架，当然除此之外还有jquery等。



#### 代码架构