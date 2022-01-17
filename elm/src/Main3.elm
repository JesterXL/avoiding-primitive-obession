module Main3 exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

type Team
    = Blue
    | Red

type Name = Name String
type Age = Age Int
type Phone = Phone String

type alias Person = 
    { team : Team
    , name : Name 
    , age : Age
    , phone : Phone }

type Model
    = WaitingToMakeAPerson
    | MadePerson Person
    | FailedMakingPerson String


initialModel : Model
initialModel =
    WaitingToMakeAPerson


type Msg
    = MakePerson

validateName : Name -> Result String String
validateName nameType =
    case nameType of
        Name name -> 
            if String.length name < 1 then
                Err "name cannot be less than 1 character"
            else if String.split "" name |> List.all (\letter -> letter == "") then
                Err "name cannot be a series of blanks"
            else
                Ok name

validatePhone : Phone -> Result String String
validatePhone phoneType =
    case phoneType of
        Phone phone ->
            if String.length phone < 9 then
                Err "phone cannot be less than 9 characters"
            else
                let
                    allCharactersOk =
                        phone
                        |> String.trim
                        |> String.split ""
                        |> List.all isOkPhoneCharacter
                in
                if allCharactersOk == False then
                    Err "Phone can only be spaces, ), (, -, and numbers"
                else
                    Ok phone

isOkPhoneCharacter : String -> Bool
isOkPhoneCharacter character =
    if character == ")" || character == "(" || character == "-" then
        True
    else
        case String.toInt character of
            Nothing -> False
            Just _ -> True

validateAge : Age -> Result String Int
validateAge ageType =
    case ageType of
        Age age ->
            if age < 0 then
                Err "age needs to be 0 or greater"
            else
                Ok age

getPerson : Team -> Name -> Age -> Phone -> Result String Person
getPerson team name age phone =
    validateName name
    |> Result.andThen (\_ -> validatePhone phone)
    |> Result.andThen (\_ -> validateAge age)
    |> Result.andThen (\_ -> Ok(Person team name age phone) )


update : Msg -> Model -> Model
update msg model =
    case msg of
        MakePerson ->
            case getPerson Red (Name "Jesse") (Age 42) (Phone "804-555-1234")  of
                Err reason ->
                    FailedMakingPerson reason
                Ok person ->
                    MadePerson person
                    


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick MakePerson ] [ text "Make Person" ]
        , div [] [ 
            case model of
                WaitingToMakeAPerson ->
                    div [][text "Waiting for you to click the button."]
                MadePerson person ->
                    div [][text "Made a person successfully!"]
                FailedMakingPerson reason ->
                    div [][text ("Failed making a person: " ++ reason) ]
        ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
