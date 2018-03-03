# mambo-dashboard-www
H.A.N.D. (Hackers Against Natural Disasters) tactical humanitarian dashboard website

## Run with docker

The website needs to be provided with a conf.js file in the workdir.
```docker run -p 80:80 -v conf.js:conf.js handmambo/dashboard-www```