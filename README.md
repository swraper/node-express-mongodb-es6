# node_express
# nodeJs、express、mongodb、logsJs、mongoose
#
│

├─bin
│      www                          # mongodb与host配置启动
│
├─controller                        # 接口逻辑
│
│
├─database
│    │
│    ├─dbHandel                     # 数据库中间件
│    ├─models                       # 数据模板
│    ├─resBody                      # res模板
│
├─logs                              # 日志文件夹
│
├─public                            # 项目前端js包
│
│
├─routes                            # 接口路径
│
│
├─views                             # 项目入口html
│
│
├─app.js                             # 服务启动入口
│
│
│


# 启动服务
 npm start

# 启动后后台管理链接
 localhost:3000 或 IPV4的ip+:3000
 接口链接：IP地址加端口号
# 接口
    login: `${ENV}/user/login`,
    search: `${ENV}/api/searchs`,
    addFeel: `${ENV}/api/createFeel`,
    serachfeel: `${ENV}/user/searchFeel`,
    logOut: `${ENV}/user/logout`,
    searchData: `${ENV}/api/searchData`,

# 备注：
  项目启动需先启动mongodb数据库
# github地址：
    https://github.com/swraper/node_express
