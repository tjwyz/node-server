 #!/usr/bin/env bash

set -e

# 该脚本用于在线上机器启动node服务

echo 'starting server'

# 这个是必须的, 启动脚本的目录是根目录
cd `dirname $0`

npm run pm2
