import { defineConfig } from 'vitepress'
import path from 'path'
import fs from 'fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  srcDir: "docs",

  vite: {
    plugins: [
      {
        name: 'serve-html-download',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = decodeURIComponent(req.url || '')
            if (url === '/车路云一体化云控平台.html') {
              console.log('[serve-html-download] 拦截到 HTML 下载请求:', url)
              const filePath = path.resolve(process.cwd(), 'public', '车路云一体化云控平台.html')
              if (fs.existsSync(filePath)) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                const encodedFilename = encodeURIComponent('车路云一体化云控平台.html')
                res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`)
                res.end(fs.readFileSync(filePath))
                return
              }
            }
            next()
          })
        }
      }
    ]
  },


  title: "车路协同系统装调与测试",
  description: 'C-V2X 车联网与车路协同关键技术课程（基于《C-V2X车联网与车路协同关键技术》蒋建春、林峰 著）',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'V2X 课程', link: '/chapters/项目一 V2X技术认知', activeMatch: '/chapters/' },
      { text: '参考教材', link: '/book/', activeMatch: '/book/' },
      {
        text: '讲义下载',
        link: '/download/',
        items: [
          { text: '项目一 V2X 技术认知', link: '/download/项目一V2X技术认知' },
          { text: '项目二 车载终端的装调与应用', link: '/download/项目二车载终端的装调与应用' },
          { text: '项目三 路侧设备的装调与应用', link: '/download/项目三路侧设备的装调与应用' },
          { text: '项目四 车云远程数据交互系统认知', link: '/download/项目四车云远程数据交互系统认知' },
          { text: '项目五 高精度地图的应用', link: '/download/项目五高精度地图的应用' },
        ]
      },
    ],

    sidebar: {
      '/chapters/': [
        {
          text: 'V2X 课程',
          collapsible: false,
          items: [
            { text: '项目一  V2X 技术认知', link: '/chapters/项目一 V2X技术认知' },
            { text: '项目二  车载终端的装调与应用（任务一）', link: '/chapters/项目二车载终端的装调与应用任务一' },
            { text: '项目二  车载终端的装调与应用（任务二）', link: '/chapters/项目二车载终端的装调与应用任务二' },
            { text: '项目三  路侧设备的装调与应用', link: '/chapters/项目三路侧设备的装调与应用' },
            { text: '项目四  车云远程数据交互系统认知（任务一）', link: '/chapters/项目四车云远程数据交互系统认知任务一' },
            { text: '项目四  网络通信模块的安装调试（任务二）', link: '/chapters/项目四网络通信模块的安装调试任务二' },
            { text: '项目四  云端系统的测试与应用（任务三）', link: '/chapters/项目四云端系统的测试与应用任务三' },
            { text: '项目五  高精度地图的应用', link: '/chapters/项目五高精度地图的应用' },
          ]
        }
      ],

      '/book/': [
        {
          text: '参考教材',
          collapsible: false,
          items: [
            { text: '第 1 章  绪论', link: '/book/ch01' },
            { text: '第 2 章  V2X 通信技术分析', link: '/book/ch02' },
            { text: '第 3 章  C-V2X 车联网应用层标准分析', link: '/book/ch03' },
            { text: '第 4 章  C-V2X 车联网系统主要功能分析', link: '/book/ch04' },
            { text: '第 5 章  车辆 V2X 消息接收预处理', link: '/book/ch05' },
            { text: '第 6 章  车路协同路侧感知关键技术', link: '/book/ch06' },
            { text: '第 7 章  车路协同防撞预警模型及其设计', link: '/book/ch07' },
          ]
        }
      ],

      '/download/': [
        {
          text: '讲义下载',
          collapsible: false,
          items: [
            { text: '讲义下载', link: '/download/' },
          ]
        }
      ],
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
