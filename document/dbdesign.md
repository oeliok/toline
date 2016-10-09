# 系统数据库设计
> 时间：2016年09月26日 星期一 16时03分52秒 

### 用户表(user)
> 用户ID，用户名[1-128个字符]，用户密码[6-128个字符]，用户类型[0为系统用户，1为注册普通的默认用户]，用户邮箱，用户性别[0为男，1为女,2保密]，用户年龄[0至200]，注册时间[long]，用户备注[0-128个字符，展示自己一句话]

JSON格式
{"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}

### 好友表(friend)
> 好友ID、用户ID，好友ID，添加时间[long]

JSON格式
{"ids":ObjectId(""),"myid":ObjectId(""),"frid":ObjectId(""),"datetime":}

### 群列表(group)
> 群ID，群名称[0-30个字符]，群标签[0-100个字符]，群的创建时间[long]，群的群主用户ID，群用户的用户ID

JSON格式
{"_id":ObjectId(""),"name":"","remark":"","datetime":"","owner":ObjectId(""),members:[ObjectId("")...]}

### 群聊天记录(glog)
> 群ID,用户ID,对话内容[1-512个字符]，用户发表时间[long]

JSON格式
{"gid" : ObjectId(""),"uid" : ObjectId(""),"comment":"","date":}

### 个人对话聊天记录(flog)
> 好友表ID，用户对话内容[1-512个字符]，用户发表时间[long]

JSON格式
{"ids":ObjectId(""),"content":"","date":}

### 文件列表(file)
> 用户ID，文件名[1-255个字符]，文件MD5值[64]，文件大小[long(B)]，过期时间[long]

JSON格式
{"uid" : ObjectId(""),"name":"","md5":"","size":,"date":}

### mongodb管理
管理员Superuser Roles  root
root
uids0984tut3#4gjmv*gs3434y4t43ed

数据库管理员All-Database Roles userAdminAnyDatabase数 据库用户管理员
oeli
89uj5e4tyj8h9er


toline数据库使用者Database Administration Roles rw
toline
0vntu58u85tby3vr
远程连接方法
mongo toline.oeli.pub/toline -u "toline" -p "0vntu58u85tby3vr"

