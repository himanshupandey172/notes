# from locust import HttpUser, task
from locust import User, task, between, TaskSet, SequentialTaskSet, events, HttpUser
import csv


with open("user.csv", mode="r") as file:
    csvFile = csv.DictReader(file)
    for line in csvFile:
        print(line["username"], line["password"])


form_data = {
    "email": "perf_user_1@gmail.com",
    "passwd": "perf_user_1_12@@",
    "back": "my-account",
    "SubmitLogin": "",
}


class MyTasks(SequentialTaskSet):
    @task
    def post_request(self):
        with self.client.post(
            "?controller=authentication",
            form_data,
            catch_response=True,
        ) as response:
            if response.status_code != 200:
                print(f"Response Failure: {response}")
            else:
                print(f"Response Success: {response}")

    # @task
    # def get_request(self):
    #     with self.client.get("/todos/1", catch_response=True) as response:
    #         if response.status_code != 200:
    #             print(f"Respoonse: {response}")
    #         print(f"Respoonse: {response}")


class HelloWorldUser(HttpUser):
    @task
    def hello_word(self):
        self.client.get("/todos/1")


class MyUser(HttpUser):
    wait_time = between(1, 2)
    tasks = [HelloWorldUser]


# class ViewCart(SequentialTaskSet):
#     @task
#     def get_cart_items(self):
#         print("get all cart items")

#     @task
#     def search_cart_item(self):
#         print("Searching item from cart")

#     @task
#     def exit_task_execution(self):
#         self.interrupt()
