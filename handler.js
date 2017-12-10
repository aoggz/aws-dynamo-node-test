'use strict';
var AWS = require('aws-sdk');

module.exports.getItems = (event, context, callback) => {
  
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
      Key: {
        id: '17121'
      },
      TableName: process.env.DYNAMODB_TABLE
    };

    docClient.get(params, function(err, data) {
      
      const response = {
        statusCode: err ? 500 : 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify(data)
      };
      
      callback(err, response);
    });

}

module.exports.helloWorld = (event, context, callback) => {

  var docClient = new AWS.DynamoDB.DocumentClient();
  
  var item = {
    "id": Math.floor(Math.random() * 20000).toString(),
    "year": 2015,
    "title": "The Big New Movie",
    "info":{
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  };
  
  docClient.put({ TableName: process.env.DYNAMODB_TABLE, Item: item }, function(err, data) {
      if (err) {
        
          const response = {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify({
              message: 'Go Serverless v1.0! Your function executed successfully!',
              input: event,
            }),
          };
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          callback(err, response)
      } else {
        
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify({
              message: 'Go Serverless v1.0! Your function executed successfully!',
              input: event,
            }),
          };

          console.log("Added item:", JSON.stringify(data, null, 2));
          callback(null, response)
      }
  });

};
