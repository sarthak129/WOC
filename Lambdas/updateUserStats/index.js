const AWS = require('aws-sdk');
const uuid = require('uuid');
const moment = require('moment');

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function uploadData(body) {
    try {
        let word = await readItem();

        let map = new Map([[1, 1000], [2, 950], [3, 900], [4, 850], [5, 800], [6, 750]]);
        let maxTimeAllowed = 7200;
        let startTime = moment(body.startTime);
        let endTime = moment(body.endTime);
        let diff = moment.duration(endTime.diff(startTime)).asSeconds();

        let score = map.get(body.numberOfAttempts) / Math.pow(map.get(body.numberOfAttempts), (diff / maxTimeAllowed));

        console.log(score);
        console.log(moment(new Date()).utc().format("L"));

        var params = {
            TableName: 'woc_user_stats',
            Item: {
                'id': { S: `${uuid.v4()}` },
                'word': { S: `${word}` },
                'userId': { S: `${body.userId}` },
                'startTime': { S: `${body.startTime}` },
                'endTime': { S: `${body.endTime}` },
                'numberOfAttempts': { N: `${body.numberOfAttempts}` },
                'created_at': { S: `${moment(new Date()).utc().format("L")}` },
                'score': { N: `${score}` }
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
    catch (e) {
        console.log("Error : ", e);
    }
}

async function readItem() {
    try {
        let ExpressionAttributeValues = {};
        let FilterExpression = "";

        FilterExpression = "typeOfWord = :typeOfWord";
        ExpressionAttributeValues = {
            ':typeOfWord': { S: "default" }
        };
        var params = {
            FilterExpression,
            ExpressionAttributeValues,
            ProjectionExpression: 'word',
            TableName: 'woc_word'
        };

        return new Promise((resolve, reject) => {
            ddb.scan(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject("");
                } else {
                    console.log(data.Items[0].word.S);
                    resolve(data.Items[0].word.S);
                }
            });
        });
    } catch (e) {
        console.log("Error : ", e);
    }
}


    let body = {
        userId:"sarthak",
        numberOfAttempts:1,
        startTime:1656363473466,
        endTime:1656363483466
    }

    uploadData(body);

// exports.handler = async (event) => {

//     let body = JSON.parse(event?.body);

//     // let body = {
//     //     userId:"sarthak",
//     //     numberOfAttempts:4,
//     //     startTime:1656363473466,
//     //     endTime:1656363483466
//     // }

//     await uploadData(body);

//     const response = {
//         statusCode: 200,
//         body: "",
//     };
//     return response;
// };
