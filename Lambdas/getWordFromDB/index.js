const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function readItem(body) {
    try {
        let ExpressionAttributeValues = {};
        let FilterExpression = "";
        if (body?.type == "custom") {
            FilterExpression = "typeOfWord = :typeOfWord AND userId = :userId";
            ExpressionAttributeValues = {
                ':typeOfWord': { S: `${body.type}` },
                ':userId': { S: `${body.user}` },
            };
        } else {
            FilterExpression = "typeOfWord = :typeOfWord";
            ExpressionAttributeValues = {
                ':typeOfWord': { S: "default" }
            };
        }
        var params = {
            FilterExpression,
            ExpressionAttributeValues,
            // ProjectionExpression: 'word',
            TableName: 'woc_word'
        };

        return new Promise((resolve, reject) => {
            let response = {};
            ddb.scan(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log(data.Items);
                    data.Items.forEach(function (element, index, array) {
                        console.log("element = ", element);
                        response.word = element.word.S;
                        response.typeOfWord = element.typeOfWord.S;
                    });
                }
                resolve(response);
            });
        });
    } catch (e) {
        console.log("Error : ", e);
    }
}

async function checkAttempt(user) {
    let res = await readItem({});
    let ExpressionAttributeValues = {};
    let FilterExpression = "";
    FilterExpression = "word = :word AND userId = :userId";
    ExpressionAttributeValues = {
        ':word': { S: `${res.word}` },
        ':userId': { S: `${user}` },
    };

    var params = {
        FilterExpression,
        ExpressionAttributeValues,
        Select: "COUNT",
        TableName: 'woc_user_stats'
    };

    const count = await ddb.scan(params).promise();
    return count.Count;
}

exports.handler = async (event) => {
    let body = JSON.parse(event.body);

    let word = "";
    if (body?.user) {
        word = (await checkAttempt(body.user) > 0) ? await readItem(body) : "";
    } else {
        word = await readItem(body);
    }


    let response = {
        statusCode: 200,
        body: word,
    };

    if (!word) {
        response = {
            statusCode: 422,
            body: {
                message: "You already played game. Please try later.",
                word: ""
            }
        };
    }

    return response;
};
