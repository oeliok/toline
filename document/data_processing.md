###本文档用来解释前端的逻辑与数据处理

> 格式为{[]...}的为json数组，取出时应用JSON.parse()解析
返回值为data.code的函数参照error.json
参数/返回值/存储/存储格式,没写的话代表没有
###登录后操作
* 获取用户id:
    * getCurrentId(),
    * 存储：localStorage. currentId

* 获取个人信息
    * getPersonalIfo()
    * 存储：localStorage.("personIfo_"+localStorage. currentId)
    * 格式：["_id","name","remark"]
    
* socket验证
    * socketConfirm（）
###其他功能
* 通过用户id查找姓名
    * getIdByName(searchName)
    * 参数string：searchName
    * 返回string：用户id

* 获取当前时间戳
    * getDateTime()
    * 返回int:当前时间戳
    
* 修改个性签名
    * changePeronalRemark（inputtemp）
    * 参数string:inputtemp
    * 返回值：data.code
###好友/群管理

* 获取好友列表
    * loadFriendList() 
    * 存储：localStorage.("chatIfo_" + localStorage.currentId);
    * 格式：{["_id","name","remark"]..}
* 聊天消息获取(双人/群) 
    * socketHistoryGet(getHistoryType,getHistoryId,getHistoryNum)
    * 参数（string,string,int）:friend/group,好友id/群id,获取消息数量
    * 存储：
        *  types="friend":localStorage.("chatIfo_" + localStorage.curentId+getHistoryId);
        *  types="group":localStorage.("groupChatIfo_" + localStorage.curentId+getHistoryId);
    * 格式：{"id","from","to","types","data":[{"_id","fid","msg","datatime"}..]}
### 聊天

* 获取sessionId(在进行聊天之前调用)
    * getSesssionId() 
    * 存储：localStorage.sessionId
* 聊天监听(在获取sessionId之后聊天之前调用)
    * socketMonitor()
    
* 好友聊天
    * socketSendChatmsg（getChatId,chatMessage）
    * 参数string,string：好友id，聊天信息
     
* 群聊天
    * socketSendGroupmsg（getGroupId,groupMessage）
    * 参数string,string：群id，聊天信息   
    

    
