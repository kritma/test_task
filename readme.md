### Api for solving equations 

-----

### build and run

```sh
./start.sh 5 #number of workers
```

### test
Request

```POST http://localhost:8080/calc```
```json
{
    "equations": ["a*x^2+b*x=y"],
    "variables": ["x"]
}
```

Response
```json
{
    "data": {
        "result": {
            "x": [
                "(1/2)*(-b+sqrt(4*a*y+b^2))*a^(-1)",
                "(1/2)*(-b-sqrt(4*a*y+b^2))*a^(-1)"
            ]
        }
    }
}
```