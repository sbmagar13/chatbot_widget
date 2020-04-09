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

