#   EC2 Shutdown

AWS SAM Project that runs once a day to shutdown ec2 instances.

## Commands

### To build the project

```
sam build
```

### To deploy the project

```
sam deploy -g
```

You can specify the region that will be targeted when the lambda function runs with the ```REGION``` environment variable

```
sam deploy --parameter-overrides REGION=us-east-1
```

Note that ```us-east-1``` is the default