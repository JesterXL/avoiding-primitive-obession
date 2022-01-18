let AccountID = { id : Text }
let LambdaName = { name : Text }

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
    \(accountID : AccountID) ->
       "arn:aws:logs:${renderRegion region}:${accountID.id}:*"

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
    \(lambdaName : LambdaName) ->
    \(accountID : AccountID ) ->
        "arn:aws:logs:${renderRegion region}:${accountID.id}:log-group:/aws/lambda/${lambdaName.name}"

let renderLogStream
    = \(region : Region) ->
    \(accountID : AccountID ) ->
    \(lambdaName : LambdaName ) ->
        "arn:aws:logs:${renderRegion region}:${accountID.id}:log-group:/aws/lambda/${lambdaName.name}:log-stream:*"

---- Application Logic ----

let currentAccountID : AccountID = { id = "010101010101" }
let currentLambdaName : LambdaName = { name = "validateJWT" }
let currentRegion = Region.East

let logStreamStatement =
    renderStatement 
        [ "logs:DescribeLogStreams" ] 
        [ renderLogStreamAll currentRegion currentAccountID ]

let logGroupStatement =
    renderStatement 
        [ "logs:PutLogEvents",
            "logs:CreateLogStream",
            "logs:CreateLogGroup" ]
        [ renderLogGroup currentRegion currentAccountID currentLambdaName
        , renderLogStream currentRegion currentAccountID currentLambdaName ]

in
{ Version = "2012-10-17"
, Statement = [ logStreamStatement, logGroupStatement ]
}