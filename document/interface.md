# 接口文档
> 日期：2016年 9月 26日 15点 10分

### 接口数据格式定义说明
C -> S(客户端到服务器)

S -> C(服务器到客户端)


### 用户接口
登陆
```
{
	name:login,
    arg:[
        {name:name,type:string,max-len:128},
        {name:password,type:string,max-len:128}
    ]
    return:[
        {code:1}|
        {code:0}
    ]
}
注册
```
{
    name:regist,
    arg:[
        {name:name,type:string,min-len:1,max-len:128},
        {name:password,type:string,min-len:6,max-len:128}
        {name:email,type:string}
    ],
    return:[
        {code:0}|
        {code:1}|
        {code:4}
    ]
}
