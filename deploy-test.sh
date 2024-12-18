#!/bin/sh
# 说明: 首次部署后需要到bjm1-rs9999.jxq上做个启动：
# 启动命令：node server/pm2.js pm2实例名 端口号
#   如：node server/pm2.js start node-life-dev1 5400

suffix=${1:-'dev1'}

projectName=node-life-${suffix}

user=`git config user.name`
server="bjm1-rs9999.jxq"

printf 'Hi, \e[32m%s\e[m, now we are deploying to \e[32m%s::files/node-project/%s\e[m\n' $user $server $projectName

printf '\e[34m%s\e[m' "Are you sure?[Y/n]"

read sure

if [ "$sure" = 'n' -o "$sure" = 'N' ];then
    echo 'Deploy abort'
    exit
fi

if [ "$NODE_ENV" = 'production' ];then
    export USE_LOCAL_ASSETS=true
    npm run build || exit 1
else
    npm run build:test || exit 1
fi

proxychains4 rsync -az --delete node_modules dist server package.json web_server@${server}::files/node-project/${projectName}/

echo 'Deploy complete'
