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