import { 
    EC2Client, 
    DescribeInstancesCommandInput, 
    DescribeInstancesCommand,
    TerminateInstancesCommand,
    TerminateInstancesCommandInput
} from "@aws-sdk/client-ec2";
import { ScheduledEvent } from "aws-lambda";

const client = new EC2Client({ 
    region: process.env.REGION
})

const input: DescribeInstancesCommandInput = {};
const command = new DescribeInstancesCommand(input);

export const lambdaHandler = async (event: ScheduledEvent) => {
    const output = await client.send(command);
    const instanceIds: string[] = [];
    if(output.Reservations?.length) {
        const instances = output.Reservations[0].Instances;
        if(instances?.length) {
            for(let instance of instances) {
                instanceIds.push(instance.InstanceId!);
            }
        }
    }
    const terminateInstancesInput: TerminateInstancesCommandInput = {
        InstanceIds: instanceIds
    }
    const terminateInstancesCommand = new TerminateInstancesCommand(terminateInstancesInput);
    await client.send(terminateInstancesCommand);
    return 'shutting down instances';
}