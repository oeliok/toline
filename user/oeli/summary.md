## 个人报告
> 2016年12月22日 19:05

### 学习心得
一学期的项目实战，从无到有的过程，这个过程有很多的困难，也有许多的感想。首先在本项目里面我获得最多的是学会挑战一个自己不会的领域是需要勇气的，写这个项目也是在开学的时候确定的，同时要做什么我们也没有太多的考虑，我们只是想去做自己想做的东西，对于技术的选择，我们没有选择自己熟悉的语言，及开发环境。一切都是重新开始，从零开始去学习新的东西，我们一般学习一般写着自己的项目代码，这个过程我觉得没有那么晦涩，我想这也许是软件工程的思想在其中起的作用吧，虽然我们用着新的工具，可能使用起来开始不太熟悉，但事实上很多东西的模型是一致的，这也告诉我学好基础的重要性！同时我觉得选择好的工具可以帮助我们完成很多的事，更加专注我们想要做的事。这学期，我也在项目中学习使用和优先选择使用英文文档去学习，读的过程确实比中文的要慢很多，而且也要读很多的东西，读很多次才能明白，同时很多单词都不认识，只能一边查找，一边翻译。不过因为这样，我也在不断学习。
第二件事我觉得非常值得是，在期末终于把产品做出来了，当然虽然和预期有很大的差别，不过这也是一个自我认识的过程，我相信我们一定可以做的会更好，但是做出来可以用，方便我们去评审自己的能力，还有开发进度。还有一件事，我想感谢自己的队友，他们为了完成任务，也是费了不少的时间，和努力去完成这个作品。有一群可靠地队友也是非常的重要，同时加强组内的交流也是需要加强的。我们还需要一个好的架构师，帮助我们去做一些基础的工作，这样可以让我们更快的去开发更多的东西。也许就能离最初的想法更近一步呢。
第三件事，我觉得自己的效率很低，我总有拖延症，很多的事需要等很久之后才会做完，有时会影响到队友的工作，同时我个人总喜欢独自思考，我希望自己能够加强自己的语言表达能力，与组员更好的分享自己的开发，与其他人共同的思考，共同发散自己的思维，有时还需要把自己的问题与其他人共同商议，平时多多的总结，并且需要把自己的疑惑，记录下来和其他的人讨论。也许我们缺少和其他的人沟通太少，有时没有办法交流。

### 开发工具

#### VISUAL STUDIO CODE

##### 工具简介
Microsoft在2015年4月30日Build 开发者大会上正式宣布了 Visual Studio Code 项目：一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。Visual Studio Code (简称 VS Code / VSC) 是一款免费开源的现代化轻量级代码编辑器，支持几乎所有主流的开发语言的语法高亮、智能代码补全、自定义热键、括号匹配、代码片段、代码对比 Diff、GIT 等特性，支持插件扩展，并针对网页开发和云端应用开发做了优化。软件跨平台支持 Win、Mac 以及 Linux，运行流畅。

##### 安装过程
下载地址：https://code.visualstudio.com/Download;
安装很简单，直接安装加好了。

##### 关键配置
1.1 Git 集成

VS Code 默认集成了 Git 版本管理。
切换至 Git 面板，点击左侧被修改的文件，即可进行版本对比。使用快捷键 ⌘P 打开快捷窗口，可直接使用 git 相关命令。
更多 Git 参考资料请阅读《Git 进阶指南》和 VS Code 官方文档《Version Control》章节。

1.2 多窗口实时编辑与预览

VS Code 最多可同时开启三个子窗口。若多个子窗口中打开的文件为同一文件时，则修改其中任意窗口内容，其他窗口都可以实时同步变更。
如上图，左侧子窗口是一个 Markdown 文件，右侧子窗口是该文件的 Markdown 预览模式（快捷键 ⇧⌘V），如此即可实现类似 MacDown/Mou 等软件的编写体验。

1.3 代码提示与引用分析

虽然是一款轻量级编辑器，但 VS Code 却有着 IDE 级别的代码高亮、语法检测、引用分析功能，十分适合编程初学者和大型项目开发。在其官网上列出了它默认支持的语言列表。
借助 Typings ，VS Code 还支持了 Node.js、ES6、AngularJS、ReactJS，十分适合前端开发人员。为了能更好的和其他开源框架融合，VS Code 有意削弱了原有的 JavaScript 语法校验功能，建议用户使用 ESLint 来定制个性化代码校验需求。除此之外，VS Code 的 Debug 功能也是十分强大。以下是其 Node.js Debug 的演示：借助「Debugger for Chrome」插件，还可以直接在编辑器中打断点调试 web。

1.4 命令行调用

VS Code 提供了一个 code 命令，用来在 shell 环境下调用编辑器。使用快捷键 ⇧⌘P（或 F1） 唤起命令面板，输入以下命令即可完成安装。
code 命令后可接多个路径或文件：code pro6.js pro6.scss ../文件对比：code -d new-file.js old-file.js打开文件并跳至指定行：code -g source/cn/static/global/tracker.js:15更多 code 命令行使用方法，参见《Additional Command line arguments》。

1.5 更聪明的 Emmet VS Code 内置了 Emmet，且在其基础之上做了进一步增强，极大的提升了 CSS、HTML 编写效率。例如，在一个 CSS 选择器中书写以下属性后，按下 tab 键，均可自动补全为 overflow:hidden：
更多 Emmet 缩写，请参考《Emmet Cheat Sheet》。

##### 使用技巧

常用插件（待补充）
HTML Snippets：增强了zen-coding，增加了H5的自动补全，安装后每次打开自动启用(可能与其他插件冲突)。
Angular 1.x Snippets：增加了AngularJs 1在.html和.js中的代码补全，安装后每次打开自动启用。
Git Easy：增加了vscode中自带的git操作，安装后按F1调出控制台，输入git easy [options]完成git操作，代替git bash。
HTML CSS Support: 增加.html中css的代码补全，可以手动增加配置文件来增加外部css中的class补全。详情见插件说明。
VScode-icons： 美化VSCode的界面，在文件名前面显示小图标，安装后每次打开自动启用。
Git Blame：可以查看当前光标所在位置的Git Log，最近一次提交的人和时间，显示在左下角，安装后每次打开自动启用。
HTML CSS Class Completion：扫描项目中的所有css中的class名，在html中自动补全，安装后每次打开自动启用。注意：如果css过多容易卡死。
Debugger for Chrome：方便js调试的插件，前端项目在Chrome中运行起来之后，可以直接在VSCode中打断点、查看输出、查看控制台，需要配置launch.json,详情见插件说明。
background：VSCode美化插件，修改界面背景，详情见插件说明。

常用快捷键（待补充）
编辑器与窗口管理
同时打开多个窗口（查看多个项目）
打开一个新窗口： Ctrl+Shift+N
关闭窗口： Ctrl+Shift+W
同时打开多个编辑器（查看多个文件）
新建文件 Ctrl+N
历史打开文件之间切换 Ctrl+Tab，Alt+Left，Alt+Right
切出一个新的编辑器（最多3个）Ctrl+\，也可以按住Ctrl鼠标点击Explorer里的文件名
左中右3个编辑器的快捷键Ctrl+1 Ctrl+2 Ctrl+3
3个编辑器之间循环切换 Ctrl+`
编辑器换位置，Ctrl+k然后按Left或Right
代码编辑
格式调整
代码行缩进Ctrl+[， Ctrl+]
折叠打开代码块 Ctrl+Shift+[， Ctrl+Shift+]
Ctrl+C Ctrl+V如果不选中，默认复制或剪切一整行
代码格式化：Shift+Alt+F，或Ctrl+Shift+P后输入format code
修剪空格Ctrl+Shift+X
上下移动一行： Alt+Up 或 Alt+Down
向上向下复制一行： Shift+Alt+Up或Shift+Alt+Down
在当前行下边插入一行Ctrl+Enter
在当前行上方插入一行Ctrl+Shift+Enter
光标相关

移动到行首：Home
移动到行尾：End
移动到文件结尾：Ctrl+End
移动到文件开头：Ctrl+Home
移动到后半个括号 Ctrl+Shift+]
选中当前行Ctrl+i（双击）
选择从光标到行尾Shift+End
选择从行首到光标处Shift+Home
删除光标右侧的所有字Ctrl+Delete
Shrink/expand selection： Shift+Alt+Left和Shift+Alt+Right
Multi-Cursor：可以连续选择多处，然后一起修改，Alt+Click添加cursor或者Ctrl+Alt+Down 或 Ctrl+Alt+Up
同时选中所有匹配的Ctrl+Shift+L
Ctrl+D下一个匹配的也被选中(被我自定义成删除当前行了，见下边Ctrl+Shift+K)
回退上一个光标操作Ctrl+U
重构代码
跳转到定义处：F12
定义处缩略图：只看一眼而不跳转过去Alt+F12
列出所有的引用：Shift+F12
同时修改本文件中所有匹配的：Ctrl+F12
重命名：比如要修改一个方法名，可以选中后按F2，输入新的名字，回车，会发现所有的文件都修改过了。
跳转到下一个Error或Warning：当有多个错误时可以按F8逐个跳转
查看diff 在explorer里选择文件右键 Set file to compare，然后需要对比的文件上右键选择Compare with 'file_name_you_chose'.
查找替换
查找 Ctrl+F
查找替换 Ctrl+H
整个文件夹中查找 Ctrl+Shift+F
显示相关
全屏：F11
zoomIn/zoomOut：Ctrl + =/Ctrl + -
侧边栏显/隐：Ctrl+B
预览markdown Ctrl+Shift+V
其他
自动保存：File -> AutoSave ，或者Ctrl+Shift+P，输入 auto

#### WEBSTORM
##### 工具简介
WebStorm 是jetbrains公司旗下一款JavaScript 开发工具。被广大中国JS开发者誉为“Web前端开发神器”、“最强大的HTML5编辑器”、“最智能的JavaScript IDE”等。与IntelliJ IDEA同源，继承了IntelliJ IDEA强大的JS部分的功能。

##### 安装过程
这款强大的IDE，安装起来当然也不费力。下载点击安装，如果有问题，一般安装jdk就可以解决，最困难的是这款软件是需要付费的，当然破解也是非常简单的，一般有多种方式，还是希望大家支持正版。学生可以申请免费试用！

##### 关键配置
1.主题，把下载好的主题包放在C:\Users\jikey(用户名)\.WebIde10\config\colors目录下，然后重启webstorm，settings –> colors & fonts –>scheme name中选择主题名。如果出现特别长代码对齐白线，在Editor –> Appearance –> Show vertical indent guides 前面的勾去掉即可。
2.添加VIM插件：
File -> Settings -> Plugins -> Browse repositories -> 搜索vim，对它单击右键Download and install，然后重启IDE就可以了。
3.除了webstorm之外，此公司还提供另外一个针对phper的开发工具,phpStorm，主页上说明，phpstorm包括所有webstorm的功能。但是习惯于大括号去方法名在同一行显示，所以还得配置：File -> Settings -> code style -> PHP -> Wrapping and Braces -> Braces placement ->In method declaration : End of line.
4.zencoding默认的快捷键是Tab，如果你需要修改zencoding快捷键的话：File -> Setting -> Live Templates 。
5.在开发js时发现，需要ctrl + return 才能选提示候选项，又需要配置：File -> Setting -> Editor -> Code Completion -> Preselect the first suggestion:’Smart’ 改为 Always
6.注意的地方是：Webstorm的调试不支持中文路径中文文件名。
下面是Webstorm的一些常用快捷键：
1. ctrl + shift + n: 打开工程中的文件，目的是打开当前工程下任意目录的文件。
2. ctrl + j: 输出模板
3. ctrl + b: 跳到变量申明处
4. ctrl + alt + T: 围绕包裹代码(包括zencoding的Wrap with Abbreviation)
5. ctrl + []: 匹配 {}[]
6. ctrl + F12: 可以显示当前文件的结构
7. ctrl + x: 剪切(删除)行，不选中，直接剪切整个行，如果选中部分内容则剪切选中的内容
8. alt + left/right:标签切换
9. ctrl + r: 替换
10. ctrl + shift + up: 行移动
11. shift + alt + up: 块移动(if(){},while(){}语句块的移动)
12. ctrl + d: 行复制
13. ctrl + shift + ]/[: 选中块代码
14. ctrl + / : 单行注释
15. ctrl + shift + / : 块注释
16. ctrl + shift + i : 显示当前CSS选择器或者JS函数的详细信息
17. ctrl + '-/+': 可以折叠项目中的任何代码块，它不是选中折叠，而是自动识别折叠。
18. ctrl + '.': 折叠选中的代码的代码。
ctrl+/ 单行注释
ctrl+shift+/块注释
ctrl+shift+ +/-展开/折叠
ctrl+alt+L 格式化代码
ctrl+shift+ up/down 上下移动句子
Alt+回车 导入包,自动修正
Ctrl+N 查找类
Ctrl+Shift+N 查找文件
Ctrl+Alt+L 格式化代码
Ctrl+Alt+O 优化导入的类和包
Alt+Insert 生成代码(如get,set方法,构造函数等)
Ctrl+E或者Alt+Shift+C 最近更改的代码
Ctrl+R 替换文本
Ctrl+F 查找文本
Ctrl+Shift+Space 自动补全代码
Ctrl+空格 代码提示
Ctrl+Alt+Space 类名或接口名提示
Ctrl+P 方法参数提示
Ctrl+Shift+Alt+N 查找类中的方法或变量
Alt+Shift+C 对比最近修改的代码
Shift+F6 重构-重命名
Ctrl+Shift+先上键
Ctrl+X 删除行
Ctrl+D 复制行
Ctrl+/ 或 Ctrl+Shift+/ 注释（// 或者/*...*/ ）
Ctrl+J 自动代码
Ctrl+E 最近打开的文件
Ctrl+H 显示类结构图
Ctrl+Q 显示注释文档
Alt+F1 查找代码所在位置
Alt+1 快速打开或隐藏工程面板
Ctrl+Alt+ left/right 返回至上次浏览的位置
Alt+ left/right 切换代码视图
Alt+ Up/Down 在方法间快速移动定位
Ctrl+Shift+Up/Down 代码向上/下移动。
F2 或Shift+F2 高亮错误或警告快速定位
代码标签输入完成后，按Tab，生成代码。
选中文本，按Ctrl+Shift+F7 ，高亮显示所有该文本，按Esc高亮消失。
Ctrl+W 选中代码，连续按会有其他效果
选中文本，按Alt+F3 ，逐个往下查找相同文本，并高亮显示。
Ctrl+Up/Down 光标跳转到第一行或最后一行下
Ctrl+B 快速打开光标处的类或方法

##### 使用技巧
1智能的代码补全
支持不同浏览器的提示，还包括所有用户自定义的函数(项目中),代码补全包含了所有流行的库，比如：JQuery, YUI, Dojo, Prototype, Mootools and Bindows。
2.代码格式化
代码不仅可以格式化，而且所有规则都可以自己来定义。
3.html提示
大家经常在js代码中编写html代码，一般来说十分痛苦，不过有了智能提示，就爽多了。而且html里面还能有js提示。
4.联想查询
只需要按着Ctrl键点击函数或者变量等，就能直接跳转到定义；可以全项目查找函数或者变量，还可以查找使用并高亮
5.代码重构
这个操作有些像Resharper，熟悉Resharper的用户应该上手很快，支持的有重命名、提取变量/函数、内联变量/函数、移动/复制、安全删除等等。
6.代码检查和快速修复
可以快速找到代码中的错误或者需要优化的地方，并给出修改意见，快速修复。代码调试
支持代码调试，界面和IDEA相似，非常方便。
7.代码结构浏览
可以快速找到代码中的错误或者需要优化的地方，并给出修改意见，快速修复。
8.代码折叠
功能虽小，不过胜方便高效。
9.包裹或者去掉外围代码
自动提示包裹或者去掉外围代码，一键搞定。

### 技术工具

#### MONGODB
##### 工具简介
MongoDB[2]  是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

##### 安装过程
Configure the package management system (yum).
Create a /etc/yum.repos.d/mongodb-org-3.4.repo file so that you can install MongoDB directly, using yum.
Changed in version 3.0: MongoDB Linux packages are in a new repository beginning with 3.0.
For the latest stable release of MongoDB
Use the following repository file:
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
For versions of MongoDB earlier than 3.0

To install the packages from an earlier release series, such as 2.4 or 2.6, you can specify the release series in the repository configuration. For example, to restrict your system to the 2.6 release series, create a /etc/yum.repos.d/mongodb-org-2.6.repo file to hold the following configuration information for the MongoDB 2.6 repository:

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
You can find .repo files for each release in the repository itself. Remember that odd-numbered minor release versions (e.g. 2.5) are development versions and are unsuitable for production use.

2
Install the MongoDB packages and associated tools.

To install the latest stable version of MongoDB, issue the following command:

sudo yum install -y mongodb-org
Run MongoDB Community Edition

Configure SELinux

IMPORTANT
If you are using SELinux, you must configure SELinux to allow MongoDB to start on Red Hat Linux-based systems (Red Hat Enterprise Linux or CentOS Linux).
To configure SELinux, administrators have three options:

If SELinux is in enforcing mode, enable access to the relevant ports that the MongoDB deployment will use (e.g. 27017). See Default MongoDB Port for more information on MongoDB’s default ports. For default settings, this can be accomplished by running
semanage port -a -t mongod_port_t -p tcp 27017
Disable SELinux by setting the SELINUX setting to disabled in /etc/selinux/config.
SELINUX=disabled
You must reboot the system for the changes to take effect.
Set SELinux to permissive mode in /etc/selinux/config by setting the SELINUX setting to permissive.
SELINUX=permissive
You must reboot the system for the changes to take effect.
You can instead use setenforce to change to permissive mode. setenforce does not require a reboot but is not persistent.
Alternatively, you can choose not to install the SELinux packages when you are installing your Linux operating system, or choose to remove the relevant packages. This option is the most invasive and is not recommended.

Data Directories and Permissions

WARNING
On RHEL 7.0, if you change the data path, the default SELinux policies will prevent mongod from having write access on the new data path if you do not change the security context.
The MongoDB instance stores its data files in /var/lib/mongo and its log files in /var/log/mongodb by default, and runs using the mongod user account. You can specify alternate log and data file directories in /etc/mongod.conf. See systemLog.path and storage.dbPath for additional information.
If you change the user that runs the MongoDB process, you must modify the access control rights to the /var/lib/mongo and /var/log/mongodb directories to give this user access to these directories.
Procedure

1
Start MongoDB.
You can start the mongod process by issuing the following command:
sudo service mongod start

2
Verify that MongoDB has started successfully
You can verify that the mongod process has started successfully by checking the contents of the log file at /var/log/mongodb/mongod.log for a line reading
[initandlisten] waiting for connections on port <port>
where <port> is the port configured in /etc/mongod.conf, 27017 by default.
You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:
sudo chkconfig mongod on
3
Stop MongoDB.
As needed, you can stop the mongod process by issuing the following command:
sudo service mongod stop
4
Restart MongoDB.
You can restart the mongod process by issuing the following command:
sudo service mongod restart
You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.

5
Begin using MongoDB.
To help you start using MongoDB, MongoDB provides Getting Started Guides in various driver editions. See Getting Started for the available editions.
Before deploying MongoDB in a production environment, consider the Production Notes document.
Later, to stop MongoDB, press Control+C in the terminal where the mongod instance is running.
Uninstall MongoDB Community Edition
To completely remove MongoDB from a system, you must remove the MongoDB applications themselves, the configuration files, and any directories containing data and logs. The following section guides you through the necessary steps.
WARNING
This process will completely remove MongoDB, its configuration, and all databases. This process is not reversible, so ensure that all of your configuration and data is backed up before proceeding.

1
Stop MongoDB.
Stop the mongod process by issuing the following command:
sudo service mongod stop

2
Remove Packages.
Remove any MongoDB packages that you had previously installed.
sudo yum erase $(rpm -qa | grep mongodb-org)

3
Remove Data Directories.
Remove MongoDB databases and log files.

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

##### 关键配置
下载了最新mongodb3.03版本，当使用--auth 参数命令行开启mongodb用户认证时遇到很多问题，现总结如下： 
（百度上搜到的基本都是老版本的，看到db.addUser的就是，请忽略） 
Windows下我做了一个bat文件，用来启动mongodb，命令行如下： 
mongod --dbpath db\data --port 27017 --directoryperdb --logpath db\logs\mongodb.log --logappend --auth 
最后的参数就是开启和关闭认证，如果是conf配置文件，应该是auth=true或false 
1，首先关闭认证，也就是不带--auth参数，启动mongodb 
2，使用命令行进入mongodb目录，输入mongo命令，默认进入test数据库 
3，use userdb  切换到自己的数据库，输入db，显示userdb 
4，创建用户，角色为dbOwner，数据库为userdb，命令行应该是db.createUser({user:'myuser',pwd:'123456',roles:[{role:'dbOwner',db:'userdb'}]}) 
5，切换到admin数据库，use admin，db ，显示admin，db.shutdownServer()关闭服务器，填上认证参数，启动mongodb；以前的版本此时使用mongovue就可以使用myuser登录到userdb数据库上了，但是3.0.3版本不行，打开mongodb.log文件发现如下错误 

authenticate db: userdb { authenticate: 1, nonce: "xxx", user: "myuser", key: "xxx" } 
2015-06-02T09:57:18.877+0800 I ACCESS   [conn2] Failed to authenticate myuser@userdb with mechanism MONGODB-CR: AuthenticationFailed MONGODB-CR credentials missing in the user document 


此1-5步骤针对是3.0.3以前版本已经ok，如果是3.0.3，mongodb加入了SCRAM-SHA-1校验方式，需要第三方工具配合进行验证，下面给出具体解决办法： 
首先关闭认证，修改system.version文档里面的authSchema版本为3，初始安装时候应该是5，命令行如下： 
> use admin 
switched to db admin 
>  var schema = db.system.version.findOne({"_id" : "authSchema"}) 
> schema.currentVersion = 3 
3 
> db.system.version.save(schema) 
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 }) 

不过如果你现在开启认证，仍然会提示AuthenticationFailed MONGODB-CR credentials missing in the user document 
原因是原来创建的用户已经使用了SCRAM-SHA-1认证方式 
> use admin 
switched to db admin 
> db.system.users.find() 
[...] 
{ "_id" : "userdb.myuser", "user" : "myuser", "db" : "userdb", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "XXXXXXXXXXXXXXXXXXXXXXXX", "storedKey" : "XXXXXXXXXXXXXXXXXXXXXXXXXXX", "serverKey" : "XXXXXXXXXXXXXXXXXXXXXXXXXXX" } }, "roles" : [ { "role" : "dbOwner", "db" : "userdb" } ] } 

解决方式就是删除刚刚创建的用户，重新重建即可： 
> use userdb 
switched to db userdb 
> db.dropUser("myuser") 
true 
>db.createUser({user:'myuser',pwd:'123456',roles:[{role:'dbOwner',db:'userdb'}]}) 
然后关闭服务器，开启认证，重启服务器，用mongovue连接，一切OK 

##### 使用技巧
1、有的时候需要删除指定字段那一列，使用update操作。例如要删除name这一列：
query  json：
{"name":{$exists:true}} 
update json：
{$unset:{"name":""}}


2、数据导出，在mongodb的bin目录执行mongoexport命令并设定相关的参数，例如：
./mongoexport -h 192.168.0.201 --port 27017 –d admin –u admin –p admin -c department -o /home/admin/department.dat

-h:指定要连接的数据库的ip；
--port：指定要连接的数据库的端口；
-u:指定要连接的数据库的用户名；
-p：指定要连接的数据库的用户密码；
-d:指定要连接的库名；
-c:指定要导出的数据集合；
-o:指定要导出的数据目标存放地址；

注：（1）、需要保证连接的数据库处于正常运行状态中；
        （2）、我曾遇到过一中情况，数据库中加入了用户信息，启动时是没有以用户验证的方式启动，但是执行这个命令的时候，还是在我指定了用户名和密码的情况下才导出成功，如果有人遇到相似情况，不妨一试。

3、数据导入，在mongodb的bin目录执行mongoimport命令并设置相关的参数，参数解释和上边一样，例如：
 ./mongoimport  --port 27017  -d admin -u admin –p admin –c department  /home/common/mongodb305/bin/department.dat


4、非amdin数据库的用户验证问题：
    我们给mongodb数据库中的库添加用户，可以在目标数据库中使用如下命令,例如在mongoTest库中添加一个拥有读写权限的用户：  
db.createUser({"user":"test","pwd":"123456","roles":["readWrite"]})

    也可以在admin数据库中添加：  
db.createUser({"user":"test","pwd":"123456","roles":[{"role":"readWrite","db":"test"},"readWrite"]})
   

   要注意的是这两种方式是有区别的，也正是这个区别曾坑了我一把：

  使用第一种方式添加的时候，我们可以在mongodb的bin目录下直接执行如下命令进入test数据库中操作，增删改查都可以；也可以使用这个用户  名和密码在mongoVUE中连接：
 ./mongo -h 192.168.0.201 --port 27017 -u test -p 123456 -d test
 
   但是如果是第二种方式创建的，那么再直接使用上边的命令，会提示验证失败，只有当先进入mongo shell连接到admin数据库，再切换到test数据库的时候才能验证通过。这算是一个小坑，不明情况的或许会非常纠结，明明用户名和密码没问题，却不知为什么就是连不上。

5、mongodb3.0默认的数据存储方式还是原来2.6一样的，我尝试过更改为新的存储方式，在启动时使用如下参数，但需要注意的是，需要在数据库中没有数据的前提下才可以，否则会报错：
./mongod -f /mongodb304/conf/mongodb.conf --storageEngine wiredTiger

mongodb.conf中配置了启动的其他各种参数，如dbpath、logpath等。

#### REDIS
##### 工具简介
redis是一个key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。
Redis 是一个高性能的key-value数据库。 redis的出现，很大程度补偿了memcached这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等客户端，使用很方便。[1] 
Redis支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得Redis可执行单层树复制。存盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。同步对读取操作的可扩展性和数据冗余很有帮助。

##### 安装过程
Installation
Download, extract and compile Redis with:
$ wget http://download.redis.io/releases/redis-3.2.6.tar.gz
$ tar xzf redis-3.2.6.tar.gz
$ cd redis-3.2.6
$ make
The binaries that are now compiled are available in the src directory. Run Redis with:
$ src/redis-server
You can interact with Redis using the built-in client:
$ src/redis-cli
redis> set foo bar
OK
redis> get foo
"bar"

##### 关键配置
redis作为一个高速数据库，在互联网上，必须有对应的安全机制来进行保护，方法有2，如下。
1.比较安全的办法是采用绑定IP的方式来进行控制。
 请在redis.conf文件找到如下配置
# If you want you can bind a single interface, if the bind option is not
# specified all the interfaces will listen for incoming connections.
#
# bind 127.0.0.1
把# bind 127.0.0.1前面的 注释#号去掉，然后把127.0.0.1改成你允许访问你的redis服务器的ip地址，表示只允许该ip进行访问
这种情况下，我们在启动redis服务器的时候不能再用:redis-server，改为:redis-server path/redis.conf 即在启动的时候指定需要加载的配置文件,其中path/是你上面修改的redis配置文件所在目录，这个方法有一点不太好，我难免有多台机器访问一个redis服务。
2.设置密码，以提供远程登陆
打开redis.conf配置文件，找到requirepass，然后修改如下:
requirepass yourpassword
yourpassword就是redis验证密码，设置密码以后发现可以登陆，但是无法执行命令了。
命令如下:
redis-cli -h yourIp -p yourPort//启动redis客户端，并连接服务器
keys * //输出服务器中的所有key
报错如下
(error) ERR operation not permitted
这时候你可以用授权命令进行授权，就不报错了
命令如下:
auth youpassword
另外，在连接服务器的时候就可以指定登录密码，避免单独输入上面授权命令
命令如下:
redis-cli -h  yourIp-p yourPort  -a youPassword
除了在配置文件redis.conf中配置验证密码以外，也可以在已经启动的redis服务器通过命令行设置密码，但这种方式是临时的，当服务器重启了密码必须重设。命令行设置密码方式如下：
config set requirepass yourPassword
有时候我们不知道当前redis服务器是否有设置验证密码，或者忘记了密码是什么，我们可以通过命令行输入命令查看密码，命令如下：
config get requirepass
如果redis服务端没有配置密码，会得到nil，而如果配置了密码，但是redis客户端连接redis服务端时，没有用密码登录验证，会提示：operation not permitted,这时候可以用命令：auth yourpassword 进行验证密码，再执行 config set requirepass，就会显示yourpassword
由于redis并发能力极强，仅仅搞密码，攻击者可能在短期内发送大量猜密码的请求，很容易暴力破解，所以建议密码越长越好，比如20位。（密码在 conf文件里是明文，所以不用担心自己会忘记）

##### 使用技巧
Redis的常用命令主要分为两个方面、一个是键值相关命令、一个是服务器相关命令

1、键值相关命令
      keys * 取出当前所有的key
      exists name 查看n是否有name这个key
      del name 删除key name
      expire confirm 100 设置confirm这个key100秒过期
      ttl confirm 获取confirm 这个key的有效时长
      select 0 选择到0数据库 redis默认的数据库是0~15一共16个数据库
      move confirm 1 将当前数据库中的key移动到其他的数据库中，这里就是把confire这个key从当前数据库中移动到1中
      persist confirm 移除confirm这个key的过期时间
      randomkey 随机返回数据库里面的一个key
      rename key2 key3 重命名key2 为key3
      type key2 返回key的数据类型

2、服务器相关命令
      ping PONG返回响应是否连接成功
      echo 在命令行打印一些内容
      select 0~15 编号的数据库
      quit  /exit 退出客户端
      dbsize 返回当前数据库中所有key的数量
      info 返回redis的相关信息
      config get dir/* 实时传储收到的请求
      flushdb 删除当前选择数据库中的所有key
      flushall 删除所有数据库中的数据库

#### NODEJS
##### 工具简介
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。Node.js 的包管理器 npm，是全球最大的开源库生态系统。

##### 安装过程
之前安装过Windows下以及Mac下的node，感觉还是很方便的，不成想今天安装Linux下安装Node.js却遇到很多问题，特此记录。

首先去官网下载代码，这里一定要注意安装分两种，一种是Source Code源码，一种是编译后的文件。我就是按照网上源码的安装方式去操作编译后的文件，结果坑了好久好久。

（一） 编译好的文件
像上图中红色框里面的就是已经编译好的文件，选择好对应的linux版本下载即可，简单说就是解压后，在bin文件夹中已经存在node以及npm，如果你进入到对应文件的中执行命令行一点问题都没有，不过不是全局的，所以通过建立软链接的方式将这个设置为全局就好了。
cd /usr/local/
mv node-v5.10.1-linux-x64/ nodejs
ln -s /usr/local/nodejs/bin/node /usr/local/bin
ln -s /usr/local/nodejs/bin/npm /usr/local/bin

（二）通过源码编译

这种方式你下载的文件是Source code，由于我的linux版本是6.x的，默认的gcc-c++为4.4.7 版本，而下过来之后源码编译要求gcc-c++版本最低为4.8，于是我就去升级GCC-C++版本，结果因为是源码编译升级GCC-C++,编译了一个多小时，都没有编译完成!果断被坑...


root># ./configure 
WARNING: C++ compiler too old, need g++ 4.8 or clang++ 3.4 (CXX=g++)
creating  ./icu_config.gypi
{ 'target_defaults': { 'cflags': [],
                      'default_configuration': 'Release',
                      'defines': [],
                      'include_dirs': [],
                      'libraries': []},
  'variables': { 'asan': 0,
                'gas_version': '2.20',
                'host_arch': 'x64',
                'icu_small': 'false',
                'node_byteorder': 'little',
                'node_install_npm': 'true',
                'node_prefix': '/usr/local',
                'node_release_urlbase': '',
                'node_shared_http_parser': 'false',
                'node_shared_libuv': 'false',
                'node_shared_openssl': 'false',
                'node_shared_zlib': 'false',
                'node_tag': '',
                'node_use_dtrace': 'false',
                'node_use_etw': 'false',
                'node_use_lttng': 'false',
                'node_use_openssl': 'true',
                'node_use_perfctr': 'false',
                'openssl_fips': '',
                'openssl_no_asm': 0,
                'target_arch': 'x64',
                'uv_parent_path': '/deps/uv/',
                'uv_use_dtrace': 'false',
                'v8_enable_gdbjit': 0,
                'v8_enable_i18n_support': 0,
                'v8_no_strict_aliasing': 1,
                'v8_optimized_debug': 0,
                'v8_random_seed': 0,
                'v8_use_snapshot': 'true',
                'want_separate_host_toolset': 0}}
creating  ./config.gypi
creating  ./config.mk
WARNING: warnings were emitted in the configure phase
（三）apt-get
还有一种就是乌班图下的apt-get方式，我之前就被这种方式坑了
sudo apt-get install nodejs
sudo apt-get install npm
这么装完你会发现,node命令不好使，nodejs命令可以用...

##### 关键配置

配置环境变量
先通过mv node-v6.9.1-linux-x64 /node 重命名Node的解压目录名称和移动到根目录下，然后vim /etc/profile（当然可以配置到个人的环境变量中），i进入编辑模式，在最后添加export NODE=/node,然后换行添加export PATH=$PATH:$NODE/bin,esc退出编辑模式，:wq进行保存退出，然后用source /etc/profile命令更新环境变量，echo $PATH查看输出是否已有node路径，有则环境变量生效，然后node -v查看node版本，假如输出版本号，则node环境配置成功。

##### 使用技巧
一、NodeJS
（1）查看NodeJS版本
       node -v
（2）启动nodejs
       老版本：node app.js
       新版本：npm start "nodejs项目目录"
二、Express
（1）查看express版本
       express --version
       或者
       express -V
（2）创建工程
       express -e 工程名
（3）下载依赖包
       express install
三、supervisor
       通过node启动程序，每次代码修改都需要重新启动。通过使用supervisor，每次修改代码后会自动重启，会我们开发省很多的时间。
（1）安装supervisor
       npm install supervisor
（2）使用supervisor启动服务
       旧版：supervisor app.js
       新版：supervisor "nodejs项目目录/bin/www"