# angularjs-guide

## start

```shell
docker pull node-builder
docker run --rm -v $(pwd)/src:/src -w /src node-builder npm run build

docker pull nginx
docker built -t my-nginx .
docker run -d -p 80:80 --name my-nginx my-nginx
```

- demo: http://localhost
- ppt: http://localhost/ppt

### beginner with docker ?

- usage: https://github.com/seasons521/mynote/tree/master/docker

## refferences

 - https://docs.angularjs.org/guide
 - https://gruntjs.com/getting-started
 - http://www.w3cplus.com/sassguide/syntax.html
 - https://developer.github.com/v3/ 
 - http://coffee-script.org/
