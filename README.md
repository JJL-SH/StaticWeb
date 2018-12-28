## 静态页面自动化

```
gulp  // 启动开发模式
gulp build  // 打包文件，会生成一个叫 build.zip 的压缩包
```

### 目录结构
```
· gulpfile.js
· packages.json
· yarn.lock
· README.md
- src
  - fonts     // 字体文件
  - html      // 页面文件
  - images    // 图片资源
  - js        // javascript 脚本文件
  - sass      // 样式文件
  - template  // 存放 html 模板文件
```

工具会默认打包一个 jquery 如果需要额外添加插件的话要在 gulpfile.js 文件中找到 javascriptPlugin 在里边添加你安装的插件地址，然后重新启动 gulp