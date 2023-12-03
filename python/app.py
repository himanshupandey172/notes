class Fruits:
    def __init__(self, color):
        self.color = color

    def describe(self):
        return self.color


fruit = Fruits("red")
print(fruit.describe())
