import abc
from abc import ABC


class Button(abc.ABC):

    @classmethod
    @abc.abstractmethod
    def values_list(cls):
        pass

    @classmethod
    @abc.abstractmethod
    def button_type(cls):
        pass


class Numbers(Button):
    button_type = 'digit'
    values_list = [str(x) for x in range(10)]

    def __init__(self, value):
        self.value = value


class SpecialSymbols(Button):
    button_type = 'special'
    values_list = ['.', '=', '%']

    def __init__(self, value):
        self.value = value


class MathOperations(Button):
    button_type = 'operation'
    values_list = ['+', '-', '*', '/']

    def __init__(self, value):
        self.value = value


class NonMathFunctions(Button):
    button_type = 'clear_function'
    values_list = ['C', 'BACK']

    def __init__(self, value):
        self.value = value


class MemoryFunctions(Button):
    button_type = 'memory_function'
    values_list = ['MC', 'MR', 'M+', 'M-', 'MS']

    def __init__(self, value):
        self.value = value


class ButtonFactory:
    klasses = [
        MemoryFunctions,
        NonMathFunctions,
        MathOperations,
        Numbers,
        SpecialSymbols
    ]

    def __init__(self):
        self.buttons_list = []

    def create_buttons_list(self):
        for klass in self.klasses:
            for value in klass.values_list:
                button = klass(value)
                self.buttons_list.append(button)
