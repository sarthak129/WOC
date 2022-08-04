const AWS = require('aws-sdk');
const moment = require('moment');

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

async function readItem(userId) {
    try {
        let ExpressionAttributeValues = {};
        let FilterExpression = "";
        FilterExpression = "created_at = :created_at";
        ExpressionAttributeValues = {
            ':created_at': { S: `${moment(new Date()).utc().format("L")}` }
        };

        var params = {
            FilterExpression,
            ExpressionAttributeValues,
            TableName: 'woc_user_stats'
        };

        return new Promise((resolve, reject) => {
            let response = [];
            ddb.scan(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    //console.log(data.Items);
                    let stats = data.Items;
                    stats.sort((a, b) => b.score.N - a.score.N);

                    let counter = 1;
                    stats.forEach(function (element, index, array) {
                        let temp = {};
                        //console.log("element = ", element);
                        if (counter <= 5 || element.userId.S == userId) {
                            temp.word = element.score.N;
                            temp.typeOfWord = element.userId.S;
                            temp.rank = counter;
                            response.push(temp);
                        }
                        counter++;
                    });
                }
                console.log("response   ", response);
                resolve(response);
            });
        });
    } catch (e) {
        console.log("Error : ", e);
    }
}

exports.handler = async (event) => {
    let body = JSON.parse(event.body);


    let stats = await readItem(body.userId);

    let response = {
        statusCode: 200,
        body: stats,
    };

    if (stats.length <= 0) {
        response = {
            statusCode: 422,
            body: {
                message: "No data available",
            }
        };
    }

    return response;
};
