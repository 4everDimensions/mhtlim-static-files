import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    try {
      // 1. 获取静态文件
      const response = await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      });
      
      // 2. 克隆响应以便修改头部
      const newResponse = new Response(response.body, response);
      
      // 3. 设置 CORS 头（允许所有域名访问）
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      
      // 4. 处理 OPTIONS 预检请求
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '86400',
          },
        });
      }
      
      return newResponse;
      
    } catch (error) {
      // 文件未找到，返回 404
      return new Response('文件未找到: ' + new URL(request.url).pathname, {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
};
