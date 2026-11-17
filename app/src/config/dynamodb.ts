import 'reflect-metadata';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { injectable } from 'tsyringe';

@injectable()
export class DynamoDBConfig {
    private readonly client: DynamoDBClient;
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor() {
        this.tableName = process.env.DYNAMODB_TABLE_NAME || 'Orders';
        this.client = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey'
            }
        });
        this.docClient = DynamoDBDocumentClient.from(this.client);
    }

    getTableName(): string {
        return this.tableName;
    }

    getDocClient(): DynamoDBDocumentClient {
        return this.docClient;
    }

    async putItem(item: any): Promise<any> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: item
        });
        try {
            const response = await this.docClient.send(command);
            return response;
        } catch (error) {
            console.error('Error putting item in DynamoDB:', error);
            throw new Error('Failed to create order in DynamoDB');
        }
    }

    async getItem(key: { [key: string]: any }): Promise<any> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: key
        });
        try {
            const response = await this.docClient.send(command);
            return response.Item;
        } catch (error) {
            console.error('Error getting item from DynamoDB:', error);
            throw new Error('Failed to retrieve order from DynamoDB');
        }
    }

    async updateItem(key: { [key: string]: any }, updateExpression: string, expressionAttributeValues: { [key: string]: any }): Promise<any> {
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        });
        try {
            const response = await this.docClient.send(command);
            return response.Attributes;
        } catch (error) {
            console.error('Error updating item in DynamoDB:', error);
            throw new Error('Failed to update order in DynamoDB');
        }
    }

    async deleteItem(key: { [key: string]: any }): Promise<any> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: key
        });
        try {
            const response = await this.docClient.send(command);
            return response;
        } catch (error) {
            console.error('Error deleting item from DynamoDB:', error);
            throw new Error('Failed to delete order from DynamoDB');
        }
    }

    async scanItems(): Promise<any[]> {
        const command = new ScanCommand({
            TableName: this.tableName
        });
        try {
            const response = await this.docClient.send(command);
            return response.Items || [];
        } catch (error) {
            console.error('Error scanning items in DynamoDB:', error);
            throw new Error('Failed to scan orders from DynamoDB');
        }
    }
}