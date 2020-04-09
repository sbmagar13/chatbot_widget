# Sending Bot Responses from Rasa

## Text

- sending response from `domain.yml`
    ```
    responses:
    utter_greet:
        - text: "Hello 😀"
    ```

- sending response from custom actions `actions.py`
  ```
     dispatcher.utter_message(text="Hello 😀")
  ```

## Images
- sending response from `domain.yml`
    ```
    responses:
      utter_cheer_up:
      - text: "Here is something to cheer you up 😉 "
        image: "https://i.imgur.com/nGF1K8f.jpg"
    ```

- sending response from custom actions `actions.py`
  ```
     dispatcher.utter_message(text="Here is something to cheer you up 😉", image="https://i.imgur.com/nGF1K8f.jpg")
  ```

## Buttons
- sending response from `domain.yml`
    ```
    responses:
      utter_greet:
      - text: "Hey! How are you?"
        buttons:
        - title: "great"
          payload: "great"
        - title: "super sad"
          payload: "super sad"
    ```

- sending response from custom actions `actions.py`
  ```
     button_resp=[
                    {
                        "title": "great",
                        "payload": "great"
                    },
                    {
                        "title": "super sad",
                        "payload": "super sad"
                    }
                ]

     dispatcher.utter_message(text="Hey! How are you?", buttons=button_resp)
  ```

## Videos
- sending response from `domain.yml`
    ```
    responses:
      utter_greet:
      - text: "Check this video"
        attachment: { "type":"video", "payload":{ "src": "https://youtube.com/embed/9C1Km6xfdMA" } }
    ```

- sending response from custom actions `actions.py` 
    ```
    msg = { "type": "video", "payload": { "title": "Link name", "src": "https://youtube.com/9C1Km6xfdMA" } }

    dispatcher.utter_message(text="Check this video",attachment=msg)
    ```   

## DropDown
- sending response from `domain.yml`
    ```
    responses:
      utter_menu:
      - text: "Please select a option"
        custom:
          payload: dropDown
          data:
          - label: option1
            value: "/inform{'slot_name':'option1'}"
          - label: option2
            value: "/inform{'slot_name':'option2'}"
          - label: option3
            value: "/inform{'slot_name':'option3'}"
    ```

- sending response from custom actions `actions.py` 
    ```
      data=[{"label":"option1","value":"/inform{'slot_name':'option1'}"},{"label":"option2","value":"/inform{'slot_name':'option2'}"},{"label":"option3","value":"/inform{'slot_name':'option3'}"}]
      message={"payload":"dropDown","data":data}
      dispatcher.utter_message(text="Please select a option",json_message=message)

    ```   
