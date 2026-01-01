export default {
  async fetch(request, env) {
    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }
    
    // 获取静态文件并添加 CORS 头
    const response = await env.ASSETS.fetch(request);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
};
