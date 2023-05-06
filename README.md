# Restaurant_list
![](./public/image/screenshot.png)
## 功能
- 查看所有餐廳、種類及評分資訊
- 查看餐廳詳細資訊
- 連接餐廳google地址
- 新增修改刪除餐廳
- 搜尋餐廳
- 排列餐廳順序
## 使用說明
1. 確認裝置裝有Node.js及npm
2. 將此專案從遠端clone到本地
3. 在terminal透過cd指令進入此專案資料夾
4. 載入專案所需之套件
```
npm install
```   
5. 準備自己的MongoDB database 自行新增.env檔 內容為
```
MONGODB_URI="你的URI字串"
```
6. 載入種子資料 
```
npm run seed          //terminal顯示"create seeder done."表示成功新增資料
```
7. 執行 
```
npm run start        //terminal上出現"running"以及"mongodb connected."後 可搜尋localhost:3000開始使用
```
8. 結束使用
```
ctrl + c
```
## 開發工具
- Node.js 18.12.0
- npm 8.19.2
- Express 4.16.4
- Epress-handlebars 3.0.0
- Bootstrap 5.1.3
- Font-awesome 5.8.1
- Mongoose 7.1.0
- Dotenv 16.0.3
- MongoDB Atlas 4.4.10
