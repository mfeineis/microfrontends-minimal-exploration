port module Main exposing (main)

import Html exposing (Html)
import Html.Events exposing (onClick)


port resetCounter : (Int -> msg) -> Sub msg
port signalIncremented : () -> Cmd msg


main : Program Int Model Msg
main =
    Html.programWithFlags
        { init = init
        , subscriptions = \_ -> resetCounter Reset
        , update = update
        , view = view
        }


type alias Model = Int


type Msg
    = Decrement
    | Increment
    | Reset Int


init : Int -> ( Model, Cmd Msg )
init initialValue =
    ( initialValue, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg counter =
    case msg of
        Decrement ->
            ( counter - 1, Cmd.none )

        Increment ->
            ( counter + 1, signalIncremented ())

        Reset value ->
            ( value, Cmd.none )


view : Model -> Html Msg
view counter =
    Html.div []
        [ Html.button [ onClick Decrement ] [ Html.text "-" ]
        , Html.text (toString counter)
        , Html.button [ onClick Increment ] [ Html.text "+" ]
        ]
