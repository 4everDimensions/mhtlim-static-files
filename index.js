// 定义你的静态文件映射
const staticFiles = {
  '/': `
<!DOCTYPE html>
<html>
<head>
    <title>MHTL.IM STATIC</title>
</head>
<body>
    <h1>MHTL.IM STATIC STORAGE</h1>
</body>
</html>
  `,
  '/index.html': `
<!DOCTYPE html>
<html>
<head>
    <title>MHTL.IM STATIC</title>
</head>
<body>
    <h1>MHTL.IM STATIC STORAGE</h1>
</body>
</html>
  `,
  '/api/data.json': JSON.stringify({
    message: "Hello",
    timestamp: new Date().toISOString()
  })
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 设置 CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    
    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }
    
    // 查找对应的文件
    let content = staticFiles[path];
    
    // 如果没找到，尝试找带 .html 扩展名的
    if (!content && !path.includes('.')) {
      content = staticFiles[path + '.html'] || staticFiles[path + '/index.html'];
    }
    
    if (content) {
      // 根据文件类型设置 Content-Type
      let contentType = 'text/plain';
      if (path.endsWith('.html')) contentType = 'text/html; charset=utf-8';
      if (path.endsWith('.css')) contentType = 'text/css; charset=utf-8';
      if (path.endsWith('.js')) contentType = 'application/javascript; charset=utf-8';
      if (path.endsWith('.json')) contentType = 'application/json; charset=utf-8';
      if (path.endsWith('.png')) contentType = 'image/png';
      if (path.endsWith('.jpg') || path.endsWith('.jpeg')) contentType = 'image/jpeg';
      if (path.endsWith('.gif')) contentType = 'image/gif';
      if (path.endsWith('.svg')) contentType = 'image/svg+xml';
      if (path.endsWith('.avif')) contentType = 'image/avif';
      
      return new Response(content, {
        headers: {
          'Content-Type': contentType,
          ...corsHeaders,
          'Cache-Control': 'public, max-age=36000', // 缓存1小时
        },
      });
    }
    
    // 文件未找到
    return new Response('404 Not Found: ' + path, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...corsHeaders,
      },
    });
  }
};
