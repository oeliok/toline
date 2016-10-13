# 接口文档
> 日期：2016年 9月 26日 15点 10分

### 接口数据格式定义说明
C -> S(客户端到服务器)

S -> C(服务器到客户端)


### 用户接口
登陆
```
{
	name:/public/api/login,
	method:get,
    arg:[
        {name:email,type:string,max-len:128},
        {name:pwd,type:string,max-len:128},
        {name:token,type:string,length:16}
    ]
    return:[
        {code:0}|
        {code:1}|
        {code:2}|
        {code:3}
    ]
}
```
注册

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


