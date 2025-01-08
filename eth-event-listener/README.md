# eth-event-listener

## 项目简介
eth-event-listener是一个用于监听以太坊区块链事件的应用程序。它能够捕获智能合约事件，并通过邮件通知用户。该项目使用Node.js和Express框架构建，旨在提供一个简单易用的接口与以太坊智能合约进行交互。

## 功能
- 监听以太坊智能合约事件
- 记录事件日志和错误日志
- 通过邮件发送事件通知

## 文件结构
```
eth-event-listener
├── config
│   ├── abi.json          # 智能合约 ABI 文件
│   ├── config.js         # 配置信息加载
├── logs
│   ├── events.log        # 监听到的事件日志
│   ├── errors.log        # 错误日志
├── src
│   ├── app.js            # Express 主程序
│   ├── listener.js       # ETH事件监听器
│   ├── mailer.js         # 邮件通知服务
│   ├── blockchain.js      # 区块链交互逻辑
│   ├── utils.js          # 工具函数
├── .env                  # 环境变量配置
├── .gitignore            # Git 忽略文件
├── package.json          # 项目依赖
└── README.md             # 项目说明文档
```

## 安装
1. 克隆项目：
   ```
   git clone https://github.com/yourusername/eth-event-listener.git
   ```
2. 进入项目目录：
   ```
   cd eth-event-listener
   ```
3. 安装依赖：
   ```
   npm install
   ```

## 使用
1. 配置环境变量：
   在`.env`文件中设置区块链节点的URL、合约地址等信息。
   修改/config/abi.json文件为目标合约的abi文件。
   
2. 启动应用：
   ```
   npm start
   ```

## 贡献
欢迎任何形式的贡献！请提交问题或拉取请求。

## 许可证
本项目采用MIT许可证，详细信息请参见LICENSE文件。