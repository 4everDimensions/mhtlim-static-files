// src/index.js 或 worker.js

export default {
  async fetch(request, env, ctx) {
    // 1. 处理浏览器的“预检”请求 (OPTIONS)
    // 这是为了兼容现代浏览器的跨域规则，非常重要！
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 2. 从你的静态资源中获取请求的文件
    // `env.ASSETS` 是 Wrangler 提供的，用来访问你用 --assets 上传的文件
    const assetResponse = await env.ASSETS.fetch(request);

    // 3. 如果文件不存在，返回 404
    if (!assetResponse) {
      return new Response('File not found.', { status: 404 });
    }

    // 4. 创建一个新的响应，并复制原始响应的所有信息
    // 必须创建新响应才能修改头部
    const response = new Response(assetResponse.body, assetResponse);

    // 5. 在新响应上添加跨域头
    response.headers.set('Access-Control-Allow-Origin', '*');

    // 6. 返回最终的响应
    return response;
  },
};
