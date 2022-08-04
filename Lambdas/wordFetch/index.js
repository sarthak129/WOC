const AWS = require('aws-sdk');
const uuid = require('uuid');
var s3 = new AWS.S3();

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function uploadData(word) {
    let id = await readItem();
    id = id ? id : uuid.v4();
    console.log(id);
    var params = {
        TableName: 'woc_word',
        Item: {
            'id': { S: `${id}` },
            'word': { S: `${word}` },
            'typeOfWord': { S: "default" },
            'date': { S: `${new Date()}`}
        }
    };
    
    await ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    }).promise();
}

async function getCount(){
    const params = {
    TableName: "woc_word",
    Select: "COUNT",
    }
    const count = await ddb.scan(params).promise();
    return count.Count;
}

async function readItem() {
    let id = "";
    var params = {
        FilterExpression : "typeOfWord = :typeOfWord",
        ExpressionAttributeValues: {
        ':typeOfWord' : {S: 'default'}
        },
        ProjectionExpression: 'id',
        TableName: 'woc_word'
    };

    return new Promise((resolve,reject) => {
        ddb.scan(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                data.Items.forEach(function(element, index, array) {
                id = element.id.S
                });
            }
            resolve(id);
        });
    })
}

exports.handler = async (event) => {
    
    var params = {
        Bucket: 'woc-group25',
        Key: "words.txt"
    };

    const file = await s3.getObject(params).promise();

    let words = file.Body.toString().split(",");
    
    const word = words[Math.round(Math.random() * words.length)];
    
    await uploadData(word.trim());
    
    console.log("word ============= ", word.trim())
    
    const response = {
        statusCode: 200,
        body: word.trim(),
    };
    return response;
};
