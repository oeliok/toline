# 实时通信模型
> 2016年10月09日 星期日 14时35分56秒 

## 通信模型
---
描述：当用户登录成功后，可以获得他的session ID，需要用socket时需要发送这个ID，得到验证后即可使用socket系统进行获取信息，并进行通信，查看个人的离线数据，还有最近的通话数据，进行实时聊天。
---

## 事件及数据
> event:事件的名字；namespace:socket.io的作用域；source:事件发生的地方（0代表服务器，1代表客户端）；data:数据格式；describe:备注；

{
  event:"",
  namespace:"",
  source:0,
  data:{},
  describe:""
}

### 服务端事件


### 客户端事件


