const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function uploadData(body) {
    let id = await readItem(body.userId);
    
    id = id ? id : uuid.v4();
    
    var params = {
        TableName: 'woc_word',
        Item: {
            'id': { S: `${id}` },
            'word': { S: `${body.word}` },
            'userId':{S: `${body.userId}`},
            'hint':{S: `${body.hint}`},
            'typeOfWord': { S: "custom" },
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

async function readItem(userId) {
    let id = "";
    var params = {
        FilterExpression : "typeOfWord = :typeOfWord AND userId = :userId",
        ExpressionAttributeValues: {
        ':typeOfWord' : {S: 'custom'},
        ':userId' : {S: `${userId}`},
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

async function getCount(){
    const params = {
    TableName: "woc_word",
    Select: "COUNT",
    }
    const count = await ddb.scan(params).promise();
    return count.Count;
}

exports.handler = async (event) => {

   // var val1 = require('querystring').parse(event.val1);
    //var val2 = require('querystring').parse(event.val2);
    
    //console.log("eventvalue = ", event.body);
    let body = JSON.parse(event.body);

    await uploadData(body);
    
    let sec = {
        word:body.word,
        hint:body.hint
    }
    
    let token = await jwt.sign(sec, "woc",{ expiresIn: '1h' });
    
    let url = "http://localhost:3000/custom/?token="+token;
    
    const response = {
        statusCode: 200,
        body: {url},
    };
    
    return response;
};
