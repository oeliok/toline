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
  "info":{"from":"","to":"","type":"","msg":{}}
}

### 服务器房间
["/":"默认的房间，进行认证用的","/friend":"好友消息，两个人聊天"，"group":"群消息","/server":"系统一些消息的推送"]

### 系统事件
认证请求，认证结果，用户发送聊天消息，用户获取系统时间，好友下线，好友上线，离线消息同步，历史消息

### 事件接口
{
  "event":[
    {
      "room":"/",
      "describe":"登录之后进入的默认房间，然后需要验证",
      "events":[
        {
          "name":"auth-c",
          "describe":"客户端发起安全验证",
          "source":1,
          "info":{"form":"client","to":"server","type":"json","msg":{"sid":""}}
        },
        {
          "name":"auth-s",
          "describe":"服务器返回安全验证结果",
          "source":0,
          "info":{"form":"server","to":"client","type":"json","msg":[{"code":-1},{"code":0},{"code":1}]}
        }
      ]
    },
    {
      "room":"/friend",
      "describe":"双人聊天",
      "events":[
        {
          "name":"receivefsmg",
          "describe":"双人聊天接收消息",
          "source":0,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        },
        {
          "name":"sendfsmg",
          "describe":"双人聊天发送消息",
          "source":1,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        },
        {
          "name":"fonline",
          "describe":"好友上线",
          "source":1,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        },
        {
          "name":"foffline",
          "describe":"好友下线",
          "source":1,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        },
      ]
    },
    {
      "room":"/group",
      "describe":"多人聊天",
      "events":[
        {
          "name":"receivefsmg",
          "describe":"多人聊天接收消息",
          "source":0,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        },
        {
          "name":"sendfsmg",
          "describe":"多人聊天发送消息",
          "source":1,
          "info":{"from":"userid","to":"userid","type":"json","msg":{
            "from":"userid","to":"userid","msg":""
          }}
        }
      ]
    }
  ]
}

