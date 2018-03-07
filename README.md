# mambo-dashboard-www
H.A.N.D. (Hackers Against Natural Disasters) tactical humanitarian dashboard website

Develop Branch: 
![Build status on develop](https://travis-ci.org/caribewave/mambo-dashboard-www.svg?branch=develop)  
Master Branch:
![Build status on master](https://travis-ci.org/caribewave/mambo-dashboard-www.svg?branch=master)


## 1. Development Environment

To develop, either use 


### Regular dev environment
 * Install npm
 * Run ```npm install```
 * Run ```npm start```

### Docker-based dev environment
 * Install docker
 * Run scripts

```shell
# Create your development image
./dev/bin/build.sh
# Clean previous containers using the same name
./dev/bin/clean.sh
# Start your webpack dev server
./dev/bin/serve.sh
```

## 2. Latest released image

Simply pull the existing image using
```docker run -p 80:80 -v `pwd`/dev/assets:/usr/share/nginx/html/conf handmambo/dashboard-www:latest```
