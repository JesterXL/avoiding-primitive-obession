let AccountID = "010101010101"
let validateJWTLambdaName = "validateJWT"

let Region = < East | West >

let renderRegion
    : Region -> Text
    = \(region : Region) ->
        merge
            { East = "us-east-1"
            , West = "us-west-2"
            }
            region

let renderLogStreamAll
    = \(region : Region) ->
    \(accountID : Text) ->
       "arn:aws:logs:${renderRegion region}:${accountID}:*"

let renderStatement
    = \(actions : List Text) ->
    \(resources : List Text) ->
        {
            Effect = "Allow",
            Action = actions,
            Resource = resources
        }

let renderLogGroup
    = \(region : Region) ->
    \(lambdaName : Text) ->
    \(accountID : Text) ->
        "arn:aws:logs:${renderRegion region}:${accountID}:log-group:/aws/lambda/${lambdaName}"

let renderLogStream
    = \(region : Region) ->
    \(accountID : Text) ->
    \(lambdaName : Text) ->
        "arn:aws:logs:${renderRegion region}:${accountID}:log-group:/aws/lambda/${lambdaName}:log-stream:*"

---- Application Logic ----

let currentRegion = Region.East

let logStreamStatement =
    renderStatement 
        [ "logs:DescribeLogStreams" ] 
        [ renderLogStreamAll currentRegion AccountID ]

let logGroupStatement =
    renderStatement 
        [ "logs:PutLogEvents",
            "logs:CreateLogStream",
            "logs:CreateLogGroup" ]
        [ renderLogGroup currentRegion AccountID validateJWTLambdaName
        , renderLogStream currentRegion AccountID validateJWTLambdaName ]

in
{ Version = "2012-10-17"
, Statement = [ logStreamStatement, logGroupStatement ]
}