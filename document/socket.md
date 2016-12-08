# 实时通信模型
> 2016年10月09日 星期日 14时35分56秒 

## 通信模型
---
描述：当用户登录成功后，可以获得他的session ID，需要用socket时需要发送这个ID，得到验证后即可使用socket系统进行获取信息，并进行通信，查看个人的离线数据，还有最近的通话数据，进行实时聊天。发送消息的时候，用户可以直接把发送的对象的id
---

## 事件及数据接口格式
> event:事件的名字；namespace:socket.io的作用域；source:事件发生的地方（0代表服务器，1代表客户端）；data:数据格式；describe:备注；

{
  "name":"",
  "describe":"",
  "room":"",
  "source":0,
  "info":{"from":"","to":"","dataType":"","msg":{}}
}

### 服务器房间
["/":"默认的房间，进行认证用的","/friend":"好友消息，两个人聊天"，"group":"群消息","/server":"系统一些消息的推送"]

### 系统事件
认证请求，认证结果，用户发送聊天消息，用户获取系统时间，好友下线，好友上线，离线消息同步，历史消息

### 一些想法
为了获得一个速度可行，安全可靠地系统，需要充分的利用各种缓存，系统运行过程会需要利用的信息是 用户的登录信息 用户的好友群组关系
![添加好友](http://cloud.oeli.pub/img/addfriends.png)


### 事件接口
```
{
  "room":"/",
  "describe":"默认的房间的名称",
  "events":{
    {
      "describe":"系统消息",
      "info":[
        {
            "source":"server",
            "event":"news",
            "arg":[
              {"info":"error/info","msg":""}
            ],
            "dataType":"json",
            "describe":"发送一些服务器的错误消息，msg里面存放错误信息"
        }
      ]
    },
    {
      "describe":"socket认证",
      "info":[
        {
          "source":"client",
          "event","auth-c",
          "arg":[
            {"sessionid":""}
          ],
          "dataType":"json",
          "decribe":"sessionid需要你在登录成功后，通过调用API的方法获取"
        },
        {
          "source":"server",
          "event":"auth-s",
          "arg":[
            {"code":-1},
            {"code":0},
            {"code":1}
          ],
          "dataType":"json",
          "describe":"服务器会通知你的验证结果，如果失败，会主动断开连接，成功你需要监听其他事件"
        }
      ]
    },
    {
      "describe":"离线消息的处理",
      "info":[
        {
          "source":"client",
          "event":"caoff",
          "arg":[
            {"from":"my id","to":"server"}
          ],
          "dataType":"json",
          "describe":"客户端安全验证成功后，并且准备好了，发送获取离线消息的请求"
        },
        {
          "source":"server",
          "event":"saoff",
          "arg":[
            {"from":"off-line","to":"your id","flogs":[],"glogs":[]}
          ],
          "dataType":"json",
          "describe":"发送从上次离线开始的离线消息到你的客户端"
        }
      ]
    },
    {
      "describe":"历史消息的处理",
      "info":[
        {
          "source":"client",
          "event":"chistory",
          "arg":[
            {"id":0,"from":"my id","to":"the object id","type":"group/friend","date":0,"len":10}
          ],
          "dataType":"json",
          "describe":"从某个时间点之前n条消息"
        },
        {
          "source":"server",
          "event":"shistory",
          "arg":[
            {"id":0,"from":"the object id","to":"your id","types":"friend/group","sendDate":0,"fids":[],"data":[]}
          ],
          "dataType":"json",
          "describe":"从某个时间点之前n条消息"
        }
      ]
    },
    {
      "describe":"监听私信（两个人聊天这种情况）",
      "info":[
        {
          "source":"server",
          "event":"sfmsg",
          "arg":[
            {"id":0,"from":"","to":"","sendDate":0,"msg":""}
          ],
          "dataType":"json",
          "describe":"监听服务器里从其他用户发到自己的信息,或者上次发送的消息的回执"
        },
        {
          "source":"client",
          "event":"cfmsg",
          "arg":[
            {"id":0,"from":"","to":"","sendDate":0,"msg":""}
          ],
          "dataType":"json",
          "describe":"发送消息到服务器，让服务器转发"
        },
        {
          "source":"server",
          "event":"sfonline",
          "arg":[
            {"Date":0,"id":""}
          ],
          "dataType":"json",
          "describe":"好友上线的消息"
        },
        {
          "source":"server",
          "event":"addfriend",
          "arg":[
            {"_id":ObjectId(""),"from":"","to":"","type":"addfriend","datetime":"","msg":""}
          ],
          "datatype":"json",
          "describe":"别人请求添加你为好友"
        },
        {
          "source":"server",
          "event":"deletefriend",
          "arg":[
            {"_id":ObjectId(""),"from":"","to":"","type":"deletefriend","datetime":"","msg":""}
          ],
          "datatype":"json",
          "describe":"别人删除你们之间的好友关系"
        }
      ]
    },
    {
      "describe":"群聊的事件",
      "events":[
        {
          "source":"client",
          "event":"cgmsg",
          "arg":[
            {"id":0,"from":"my id","to":"group id","sendDate":0,"msg":""}
          ],
          "dataType":"json",
          "describe":"向一个群发送消息"
        },
        {
          "source":"server",
          "event":"sgmsg",
          "arg":[
            {"id":0,"from":"my id","to":"group id","sendDate":0,"msg":""}
          ],
          "dataType":"json",
          "describe":"服务器转发消息"
        },
        {
          "source":"server",
          "event":"exitgroup",
          "arg":[
            {"_id":ObjectId(""),"from":"","to":"","type":"exitgroup","datetime":"","msg":""}
          ],
          "datatype":"json",
          "describe":"群成员退出群组"
        },
        {
          "source":"server",
          "event":"joingroup",
          "arg":[
            {"_id":ObjectId(""),"from":"","to":"","type":"joingroup","datetime":"","msg":""}
          ],
          "datatype":"json",
          "describe":"用户申请加入群组"
        }
      ]
    }
  }
}
```

