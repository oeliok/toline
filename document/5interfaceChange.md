# 第五周161012接口修改文档

标签（空格分隔）： 虚拟时空


1用户表(user)（原）

* 用户ID，用户名[1-128个字符]，用户密码[6-128个字符]，用户类型[0为系统用户，1为注册普通的默认用户]，用户邮箱，用户性别[0为男，1为女,2保密]，用户年龄[0至200]，注册时间[long]，用户备注[0-128个字符，展示自己一句话]

* JSON格式
{"_id" : ObjectId(""),"name":"","pwd":"","type":"","email":"","sex":,"age":,"regist":,"remark":""}

> 新增（需要增加）：用于表示用户头像的属性

***
2注册（原）

```
{
    name:/public/api/regist,
    method:get,
    arg:[
        {name:name,type:string,min-len:1,max-len:128},
        {name:pwd,type:string,min-len:6,max-len:128},
        {name:email,type:string},
        {name:age,type:int,range:0-150},
        {name:sex:,type:int,range:0-3},
        {name:token,type:string,length:16}
    ],
    return:[
        {code:0}|
        {code:1}|
        {code:4}
    ]
}
```
> 新增（需要增加）：用户头像
或者在修改个人信息界面添加头像，注册时没有头像选择选项（即采用系统默认头像）
